export interface AnalysisSummary {
  rows: number;
  columns: number;
  columnTypes: Record<string, string>;
  missingValues: Record<string, number>;
}

export interface ChartData {
  type: string;
  title: string;
  image: string; // base64
}

export interface EDAData {
  target: string;
  numericColumns: string[];
  categoricalColumns: string[];
}

export interface AnalysisResponse {
  summary: AnalysisSummary;
  eda: EDAData;
  charts: ChartData[];
  insights: string[];
}
