
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAgriAdvice } from '../services/geminiService';

const MOCK_CHART_DATA = [
  { name: 'Wheat', health: 85 },
  { name: 'Corn', health: 62 },
  { name: 'Rice', health: 91 },
  { name: 'Tomato', health: 45 },
  { name: 'Potato', health: 78 },
];

const MARKET_PRICES = [
  { crop: 'Wheat', price: '$240/ton', trend: 'up' },
  { crop: 'Rice', price: '$410/ton', trend: 'down' },
  { crop: 'Corn', price: '$180/ton', trend: 'stable' },
  { crop: 'Tomato', price: '$1.2/kg', trend: 'up' },
];

const Dashboard: React.FC = () => {
  const [advisory, setAdvisory] = useState<string>("Fetching localized advice...");
  const [weather, setWeather] = useState({ temp: '28°C', condition: 'Sunny' });

  useEffect(() => {
    const fetchAdvisory = async () => {
      try {
        const advice = await getAgriAdvice("Your Region", "Sunny and 28°C");
        setAdvisory(advice);
      } catch (e) {
        setAdvisory("Maintain your irrigation schedule and check for early pest signs.");
      }
    };
    fetchAdvisory();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Weather Advisory Card */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-lg overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-emerald-100 font-bold uppercase tracking-wider text-xs mb-2">Localized Advisory</h3>
            <p className="text-xl font-medium leading-relaxed italic">"{advisory}"</p>
          </div>
          <div className="flex items-center space-x-4 bg-white bg-opacity-10 p-4 rounded-2xl backdrop-blur-sm">
            <div className="text-right">
              <div className="text-3xl font-bold">{weather.temp}</div>
              <div className="text-emerald-100 text-sm">{weather.condition}</div>
            </div>
            <svg className="w-12 h-12 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.243 3.05a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM17 10a1 1 0 011 1h1a1 1 0 110-2h-1a1 1 0 01-1 1zM14.243 16.95a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM10 18a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM5.757 16.95a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM3 10a1 1 0 01-1-1V8a1 1 0 112 0v1a1 1 0 01-1 1zm.757-4.243a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Prices Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Market Watch
          </h3>
          <div className="space-y-4 flex-grow">
            {MARKET_PRICES.map((m) => (
              <div key={m.crop} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                <span className="font-medium text-gray-700">{m.crop}</span>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{m.price}</div>
                  <div className={`text-[10px] font-bold uppercase ${m.trend === 'up' ? 'text-emerald-500' : m.trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
                    {m.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-4 text-center italic">Refreshed: Today 09:00 AM</p>
        </div>

        {/* Chart Card */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">Health Index per Crop</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="health" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
