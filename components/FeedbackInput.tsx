
import React from 'react';

interface FeedbackInputProps {
  feedback: string;
  setFeedback: (feedback: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const FeedbackInput: React.FC<FeedbackInputProps> = ({ feedback, setFeedback, onAnalyze, isLoading }) => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="feedback-textarea" className="font-medium text-slate-300">
        Enter Customer Feedback
      </label>
      <textarea
        id="feedback-textarea"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="e.g., 'The delivery was late, but the support team was incredibly helpful and resolved my issue quickly!'"
        className="w-full h-40 p-4 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none text-slate-200 placeholder-slate-500"
        disabled={isLoading}
      />
      <button
        onClick={onAnalyze}
        disabled={isLoading || !feedback.trim()}
        className="self-end px-6 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold rounded-md shadow-lg hover:from-cyan-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:saturate-50"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Feedback'}
      </button>
    </div>
  );
};

export default FeedbackInput;
