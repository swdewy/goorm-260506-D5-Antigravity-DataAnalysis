import React from 'react';
import type { EDAData } from '../types';
import { Search, Target, Binary, LayoutList } from 'lucide-react';

interface EdaPanelProps {
  eda: EDAData;
}

export const EdaPanel: React.FC<EdaPanelProps> = ({ eda }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Search className="text-purple-500" />
        EDA 기초 분석
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
          <div className="flex items-center gap-2 text-purple-700 mb-2">
            <Target size={18} />
            <span className="font-semibold">자동 추론 타겟(Target)</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{eda.target}</p>
        </div>
        
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center gap-2 text-blue-700 mb-2">
            <Binary size={18} />
            <span className="font-semibold">수치형 주요 변수</span>
          </div>
          <p className="text-sm text-gray-700 line-clamp-2">
            {eda.numericColumns.length > 0 ? eda.numericColumns.join(', ') : '없음'}
          </p>
        </div>

        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
          <div className="flex items-center gap-2 text-emerald-700 mb-2">
            <LayoutList size={18} />
            <span className="font-semibold">범주형 주요 변수</span>
          </div>
          <p className="text-sm text-gray-700 line-clamp-2">
            {eda.categoricalColumns.length > 0 ? eda.categoricalColumns.join(', ') : '없음'}
          </p>
        </div>
      </div>
    </div>
  );
};
