import React from 'react';
import type { AnalysisSummary } from '../types';
import { Database, FileDigit, ListTodo, AlertTriangle } from 'lucide-react';

interface DataSummaryProps {
  summary: AnalysisSummary;
}

export const DataSummary: React.FC<DataSummaryProps> = ({ summary }) => {
  const missingCount = Object.values(summary.missingValues).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Database className="text-blue-500" />
        데이터 개요
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <ListTodo size={20} />
            <span className="font-semibold">데이터 행(Rows)</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{summary.rows.toLocaleString()}</p>
        </div>
        
        <div className="bg-emerald-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <FileDigit size={20} />
            <span className="font-semibold">컬럼 수(Columns)</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{summary.columns}</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <Database size={20} />
            <span className="font-semibold">수치형 변수</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {Object.values(summary.columnTypes).filter(t => t === 'numeric').length}
          </p>
        </div>

        <div className="bg-amber-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <AlertTriangle size={20} />
            <span className="font-semibold">결측치(Missing)</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{missingCount}</p>
        </div>
      </div>
    </div>
  );
};
