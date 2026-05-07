
import React, { useState } from 'react';
import { FarmTask } from '../types';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<FarmTask[]>([
    { id: '1', title: 'Water Tomato patch', crop: 'Tomato', completed: false, dueDate: 'Today' },
    { id: '2', title: 'Apply organic fertilizer', crop: 'Corn', completed: true, dueDate: 'Yesterday' },
    { id: '3', title: 'Check for Rice Blast signs', crop: 'Rice', completed: false, dueDate: 'Tomorrow' },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Farm Tasks</h2>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-emerald-700 transition-all">
          + Add New
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`flex items-center p-5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group ${task.completed ? 'opacity-60' : ''}`}
          >
            <button 
              onClick={() => toggleTask(task.id)}
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-200 group-hover:border-emerald-300'
              }`}
            >
              {task.completed && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <div className="ml-4 flex-grow">
              <h4 className={`font-bold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</h4>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-bold uppercase">{task.crop}</span>
                <span className="text-xs text-gray-400">{task.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
