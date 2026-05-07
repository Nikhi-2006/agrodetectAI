
export enum Severity {
  HEALTHY = 'Healthy',
  LOW = 'Low',
  MODERATE = 'Moderate',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export interface AnalysisResult {
  plantName: string;
  diseaseName: string;
  confidence: number;
  severity: Severity;
  summary: string;
  symptoms: string[];
  treatment: {
    organic: string[];
    chemical: string[];
  };
  prevention: string[];
}

export interface ScanHistoryItem {
  id: string;
  date: string;
  image: string;
  result: AnalysisResult;
}

export interface FarmTask {
  id: string;
  title: string;
  crop: string;
  completed: boolean;
  dueDate: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface CropInsight {
  name: string;
  status: 'Good' | 'Fair' | 'Poor';
  lastChecked: string;
  healthScore: number;
}
