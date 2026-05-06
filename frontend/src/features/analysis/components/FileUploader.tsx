import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

interface FileUploaderProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, isLoading }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1,
    disabled: isLoading
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300
        ${isDragActive ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />
      <UploadCloud className={`mx-auto h-16 w-16 mb-4 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
      {
        isLoading ? (
          <p className="text-xl font-semibold text-gray-700 animate-pulse">데이터를 분석 중입니다... 잠시만 기다려주세요.</p>
        ) : isDragActive ? (
          <p className="text-xl font-semibold text-blue-600">CSV 파일을 여기에 놓아주세요...</p>
        ) : (
          <div>
            <p className="text-xl font-semibold text-gray-700">여기로 CSV 파일을 드래그 앤 드롭 하세요</p>
            <p className="text-sm text-gray-500 mt-2">또는 클릭하여 컴퓨터에서 파일을 선택하세요</p>
          </div>
        )
      }
    </div>
  );
};
