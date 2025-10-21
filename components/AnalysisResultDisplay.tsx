
import React from 'react';
import type { AnalysisResult } from '../types';
import { EmotionIcon } from './icons/EmotionIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { SentimentIcon } from './icons/SentimentIcon';
import { TopicsIcon } from './icons/TopicsIcon';

interface AnalysisResultDisplayProps {
  result: AnalysisResult;
}

const AnalysisResultDisplay: React.FC<AnalysisResultDisplayProps> = ({ result }) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'text-green-400';
      case 'negative':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  const getSentimentBg = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'bg-green-500/10 border-green-500/30';
      case 'negative':
        return 'bg-red-500/10 border-red-500/30';
      default:
        return 'bg-yellow-500/10 border-yellow-500/30';
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6 text-slate-200">Analysis Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className={`p-5 rounded-lg border ${getSentimentBg(result.sentiment)}`}>
          <div className="flex items-center gap-3 mb-2">
            <SentimentIcon className="w-6 h-6 text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-300">Overall Sentiment</h3>
          </div>
          <p className={`text-2xl font-bold ${getSentimentColor(result.sentiment)}`}>{result.sentiment}</p>
        </div>
        
        <div className="p-5 rounded-lg bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <EmotionIcon className="w-6 h-6 text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-300">Emotion Detected</h3>
          </div>
          <p className="text-2xl font-bold text-cyan-400">{result.emotion}</p>
        </div>

        <div className="p-5 rounded-lg bg-slate-800/50 border border-slate-700 md:col-span-2">
           <div className="flex items-center gap-3 mb-2">
            <TopicsIcon className="w-6 h-6 text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-300">Main Topics</h3>
          </div>
          <p className="text-lg text-slate-300">{result.mainTopics}</p>
        </div>
        
        <div className="p-5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 md:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <LightbulbIcon className="w-6 h-6 text-indigo-400" />
            <h3 className="text-lg font-semibold text-indigo-300">Actionable Recommendation</h3>
          </div>
          <p className="text-lg text-slate-300">{result.recommendation}</p>
        </div>

      </div>
    </div>
  );
};

export default AnalysisResultDisplay;
