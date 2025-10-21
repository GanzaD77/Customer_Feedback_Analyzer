
import React, { useState } from 'react';
import type { AnalysisResult } from './types';
import { analyzeFeedback } from './services/geminiService';
import FeedbackInput from './components/FeedbackInput';
import AnalysisResultDisplay from './components/AnalysisResultDisplay';
import Loader from './components/Loader';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [feedback, setFeedback] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!feedback.trim()) {
      setError('Please enter some feedback to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeFeedback(feedback);
      setAnalysisResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to analyze feedback. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <SparklesIcon className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
              Customer Feedback Analyzer
            </h1>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Paste any customer comment, review, or feedback below. Our AI will instantly reveal sentiment, emotion, key topics, and provide an actionable recommendation.
          </p>
        </header>

        <main>
          <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 border border-slate-700 mb-8">
            <FeedbackInput
              feedback={feedback}
              setFeedback={setFeedback}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
          </div>

          {isLoading && <Loader />}
          
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center" role="alert">
              <p className="font-semibold">Analysis Error</p>
              <p>{error}</p>
            </div>
          )}

          {analysisResult && <AnalysisResultDisplay result={analysisResult} />}
        </main>
        
        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>Powered by Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
