import pandas as pd
import numpy as np
import io
import base64
import matplotlib.pyplot as plt
import seaborn as sns
import json
import os
from openai import AsyncOpenAI

# Set matplotlib to use non-interactive backend
plt.switch_backend('Agg')

client = AsyncOpenAI(api_key=os.environ.get("OPENAI_API_KEY", "dummy"))

def get_base64_image(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches='tight', dpi=100)
    plt.close(fig)
    buf.seek(0)
    img_bytes = buf.read()
    return base64.b64encode(img_bytes).decode('utf-8')

def detect_target(df):
    for col in df.columns:
        if df[col].nunique() == 2:
            return col
    # Fallback to the last categorical column or just the last column
    return df.columns[-1]

def analyze_csv(file_stream):
    try:
        df = pd.read_csv(file_stream)
    except Exception as e:
        raise ValueError(f"Failed to read CSV: {e}")

    rows, cols = df.shape
    col_types = {col: str(dtype) for col, dtype in df.dtypes.items()}
    missing_values = df.isnull().sum().to_dict()

    summary = {
        "rows": rows,
        "columns": cols,
        "columnTypes": {k: "numeric" if "int" in v or "float" in v else "categorical" for k, v in col_types.items()},
        "missingValues": missing_values
    }

    numeric_cols = df.select_dtypes(include=['int64', 'float64']).columns.tolist()
    categorical_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()

    target = detect_target(df)
    
    eda = {
        "target": target,
        "numericColumns": numeric_cols,
        "categoricalColumns": categorical_cols
    }

    charts = []

    # 1. Target Distribution
    fig, ax = plt.subplots(figsize=(6, 4))
    sns.countplot(data=df, x=target, ax=ax, palette="viridis")
    ax.set_title("타겟(Target) 분포")
    charts.append({
        "type": "bar",
        "title": "타겟(Target) 분포",
        "image": get_base64_image(fig)
    })

    # 2. Numeric Distribution (Top 2 numeric cols)
    if numeric_cols:
        cols_to_plot = numeric_cols[:2]
        for col in cols_to_plot:
            fig, ax = plt.subplots(figsize=(6, 4))
            sns.histplot(data=df, x=col, kde=True, ax=ax, color='teal')
            ax.set_title(f"'{col}' 변수 분포")
            charts.append({
                "type": "histogram",
                "title": f"'{col}' 변수 분포",
                "image": get_base64_image(fig)
            })

    # 3. Correlation Heatmap
    if len(numeric_cols) > 1:
        fig, ax = plt.subplots(figsize=(8, 6))
        corr = df[numeric_cols].corr()
        sns.heatmap(corr, annot=False, cmap='coolwarm', ax=ax)
        ax.set_title("상관관계 히트맵")
        charts.append({
            "type": "heatmap",
            "title": "상관관계 히트맵",
            "image": get_base64_image(fig)
        })

    return summary, eda, charts

async def generate_insights(summary, eda):
    prompt = f"""
    Based on the following data summary and EDA results, provide 5 key actionable insights.
    All your answers must be written in Korean.
    
    Summary: {json.dumps(summary)}
    EDA: {json.dumps(eda)}
    
    Output strictly as a JSON array of strings in Korean.
    Example: ["첫 번째 인사이트", "두 번째 인사이트"]
    """
    try:
        if os.environ.get("OPENAI_API_KEY") and os.environ.get("OPENAI_API_KEY") != "dummy":
            response = await client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}]
            )
            content = response.choices[0].message.content
            # Try to parse JSON
            insights = json.loads(content)
            if isinstance(insights, list):
                return insights
    except Exception as e:
        print(f"LLM Insight generation failed: {e}")
        
    # Rule-based fallback
    insights = [
        f"이 데이터셋은 총 {summary['rows']:,}개의 행과 {summary['columns']}개의 열로 구성되어 있습니다.",
        f"분석을 위한 주요 타겟(Target) 변수로 '{eda['target']}' 컬럼이 자동 식별되었습니다.",
        f"수치형(Numeric) 데이터는 {len(eda['numericColumns'])}개, 범주형(Categorical) 데이터는 {len(eda['categoricalColumns'])}개 존재합니다.",
        "결측치(Missing Values)가 존재하는 항목이 있는지 '데이터 개요' 패널을 확인하여 전처리를 고려해 보세요.",
        "주요 수치형 변수들 간의 연관성을 파악하기 위해 상관관계 히트맵이 시각화되었습니다."
    ]
    return insights
