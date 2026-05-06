import React from 'react';
import type { ChartData } from '../types';
import { BarChart3 } from 'lucide-react';

interface ChartViewerProps {
  charts: ChartData[];
}

export const ChartViewer: React.FC<ChartViewerProps> = ({ charts }) => {
  if (!charts || charts.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <BarChart3 className="text-indigo-500" />
        데이터 시각화 차트
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {charts.map((chart, index) => (
          <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-gray-50">
            <div className="px-4 py-3 border-b border-gray-200 bg-white">
              <h4 className="font-semibold text-gray-700">{chart.title}</h4>
            </div>
            <div className="p-4 flex justify-center bg-white">
              <img 
                src={`data:image/png;base64,${chart.image}`} 
                alt={chart.title} 
                className="max-w-full h-auto object-contain rounded"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
