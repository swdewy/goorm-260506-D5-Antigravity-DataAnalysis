import React from 'react';
import { Lightbulb } from 'lucide-react';

interface InsightPanelProps {
  insights: string[];
}

export const InsightPanel: React.FC<InsightPanelProps> = ({ insights }) => {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl shadow-sm border border-indigo-100 mt-6">
      <h3 className="text-xl font-bold text-indigo-900 mb-6 flex items-center gap-2">
        <Lightbulb className="text-yellow-500 fill-yellow-500" />
        AI 자동 분석 인사이트
      </h3>
      
      <ul className="space-y-3">
        {insights.map((insight, index) => (
          <li key={index} className="flex gap-3 items-start bg-white p-4 rounded-xl shadow-sm border border-indigo-50">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm">
              {index + 1}
            </span>
            <p className="text-gray-800 leading-relaxed pt-1">{insight}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
