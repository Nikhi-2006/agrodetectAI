
import React from 'react';
import { AnalysisResult, Severity } from '../types';

interface AnalysisViewProps {
  result: AnalysisResult;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ result }) => {
  const getSeverityColor = (sev: Severity) => {
    switch (sev) {
      case Severity.HEALTHY: return 'bg-green-100 text-green-800';
      case Severity.LOW: return 'bg-yellow-100 text-yellow-800';
      case Severity.MODERATE: return 'bg-orange-100 text-orange-800';
      case Severity.HIGH: return 'bg-red-100 text-red-800';
      case Severity.CRITICAL: return 'bg-red-200 text-red-900 border border-red-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{result.plantName}</h2>
            <div className="flex items-center space-x-3">
              <span className="text-lg text-emerald-600 font-semibold">{result.diseaseName}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getSeverityColor(result.severity)}`}>
                {result.severity}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-sm text-gray-400 mb-1">Confidence Score</div>
            <div className="text-2xl font-bold text-emerald-500">{(result.confidence * 100).toFixed(0)}%</div>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed mb-8">{result.summary}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Symptoms */}
          <div>
            <h3 className="flex items-center text-gray-900 font-bold mb-4">
              <svg className="w-5 h-5 mr-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Key Symptoms
            </h3>
            <ul className="space-y-2">
              {result.symptoms.map((s, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-600">
                  <span className="text-emerald-400 mr-2">•</span> {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Prevention */}
          <div>
            <h3 className="flex items-center text-gray-900 font-bold mb-4">
              <svg className="w-5 h-5 mr-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 4.925-3.467 9.04-8.134 10.026a1.002 1.002 0 01-.332 0c-4.667-.986-8.134-5.101-8.134-10.026 0-.681.057-1.35.166-2.001z" clipRule="evenodd" />
              </svg>
              Prevention Tips
            </h3>
            <ul className="space-y-2">
              {result.prevention.map((p, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-600">
                  <span className="text-emerald-400 mr-2">•</span> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
          <h3 className="text-emerald-800 font-bold mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            Organic Treatment
          </h3>
          <ul className="space-y-3">
            {result.treatment.organic.map((t, idx) => (
              <li key={idx} className="text-emerald-700 text-sm bg-white bg-opacity-50 p-3 rounded-xl border border-emerald-200">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100">
          <h3 className="text-amber-800 font-bold mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 01-1.414 1.414z" />
            </svg>
            Chemical Treatment
          </h3>
          <ul className="space-y-3">
            {result.treatment.chemical.map((t, idx) => (
              <li key={idx} className="text-amber-700 text-sm bg-white bg-opacity-50 p-3 rounded-xl border border-amber-200">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
