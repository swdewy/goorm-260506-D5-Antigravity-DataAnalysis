from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import io
try:
    from analysis import analyze_csv, generate_insights
except ImportError:
    from .analysis import analyze_csv, generate_insights

app = FastAPI(title="Data Analysis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze")
async def analyze(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")
        
    try:
        content = await file.read()
        file_stream = io.BytesIO(content)
        
        summary, eda, charts = analyze_csv(file_stream)
        insights = await generate_insights(summary, eda)
        
        return {
            "summary": summary,
            "eda": eda,
            "charts": charts,
            "insights": insights
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
