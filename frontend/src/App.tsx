import { FileUploader } from './features/analysis/components/FileUploader';
import { DataSummary } from './features/analysis/components/DataSummary';
import { EdaPanel } from './features/analysis/components/EdaPanel';
import { ChartViewer } from './features/analysis/components/ChartViewer';
import { InsightPanel } from './features/analysis/components/InsightPanel';
import { useAnalysis } from './features/analysis/hooks/useAnalysis';
import { Activity, AlertCircle } from 'lucide-react';

function App() {
  const { data, loading, error, analyzeFile } = useAnalysis();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-2">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200 text-white">
              <Activity size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">자동 데이터 분석 AI</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            CSV 데이터를 업로드하면 AI가 수 초 만에 자동으로 데이터를 분석하고 시각화하여 핵심 인사이트를 도출합니다.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FileUploader onUpload={analyzeFile} isLoading={loading} />
        </div>

        {error && (
          <div className="max-w-3xl mx-auto bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-center gap-3">
            <AlertCircle className="text-red-500" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {data && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <DataSummary summary={data.summary} />
            <EdaPanel eda={data.eda} />
            <ChartViewer charts={data.charts} />
            <InsightPanel insights={data.insights} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
