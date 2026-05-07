
import React, { useState, useEffect } from 'react';
import Layout, { Tab } from './components/Layout';
import ImageUploader from './components/ImageUploader';
import AnalysisView from './components/AnalysisView';
import Dashboard from './components/Dashboard';
import ChatAssistant from './components/ChatAssistant';
import TaskManager from './components/TaskManager';
import { AnalysisResult, ScanHistoryItem } from './types';
import { analyzeLeafImage } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('scan');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('agrodetect_history');
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (e) {}
    }
  }, []);

  const handleImageCaptured = async (base64: string) => {
    setIsAnalyzing(true);
    setError(null);
    setCurrentResult(null);
    try {
      const result = await analyzeLeafImage(base64);
      setCurrentResult(result);
      const newItem: ScanHistoryItem = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        image: base64,
        result: result
      };
      const updatedHistory = [newItem, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('agrodetect_history', JSON.stringify(updatedHistory));
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'scan':
        return (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">AgroDetect <span className="text-emerald-600">AI</span></h1>
              <p className="text-gray-500">Detect diseases, get remedies, and chat with experts.</p>
            </div>
            <ImageUploader onImageCaptured={handleImageCaptured} />
            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-sm border border-emerald-100 animate-pulse">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-emerald-700 font-bold">AI Diagnostics in progress...</p>
              </div>
            )}
            {error && <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">{error}</div>}
            {currentResult && <AnalysisView result={currentResult} />}
          </div>
        );
      case 'dashboard': return <Dashboard />;
      case 'chat': return <ChatAssistant />;
      case 'tasks': return <TaskManager />;
      case 'history':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Scans</h2>
            {history.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 text-gray-400">No history found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {history.map((item) => (
                  <div key={item.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <img src={item.image} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1"><h4 className="font-bold text-gray-900">{item.result.plantName}</h4></div>
                      <p className="text-emerald-600 text-sm font-bold mb-3">{item.result.diseaseName}</p>
                      <button onClick={() => { setCurrentResult(item.result); setActiveTab('scan'); }} className="w-full py-2 bg-gray-50 text-emerald-600 rounded-xl font-bold text-xs hover:bg-emerald-100">Details</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default: return null;
    }
  };

  return <Layout activeTab={activeTab} onTabChange={setActiveTab}>{renderContent()}</Layout>;
};

export default App;
