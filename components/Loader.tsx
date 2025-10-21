
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-400">AI is analyzing the feedback...</p>
    </div>
  );
};

export default Loader;
