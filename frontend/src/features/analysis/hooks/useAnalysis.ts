import { useState } from 'react';
import axios from 'axios';
import type { AnalysisResponse } from '../types';

export function useAnalysis() {
  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeFile = async (file: File) => {
    setLoading(true);
    setError(null);
    setData(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Connect to Render backend (if VITE_API_URL is set) or fallback to local relative path
      const apiUrl = import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL}/api/analyze` 
        : '/api/analyze';
        
      const response = await axios.post<AnalysisResponse>(apiUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, analyzeFile };
}
