'use client';

import { useEffect, useState } from 'react';
import { useStore } from './store';

export default function PracticeApp() {
  const { score, currentVerb, currentMode, options, nextQuestion, checkAnswer } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    nextQuestion();
  }, [nextQuestion]);

  if (!mounted || !currentVerb) return null;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-between p-6 md:p-12 font-sans overflow-hidden">
      
      {/* Header & Score */}
      <header className="w-full max-w-2xl flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-xl font-black text-indigo-500 tracking-tighter">VERB_QUEST</h2>
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">Debian 12 Environment</span>
        </div>
        
        <div className="bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-zinc-500 text-[10px] font-bold uppercase">Points</span>
            <span className={`text-xl font-black leading-none ${score < 0 ? 'text-rose-500' : 'text-emerald-400'}`}>
              {score}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-md flex flex-col items-center">
        
        {/* Mode Indicator */}
        <div className="mb-8 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5">
          <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.4em] animate-pulse">
            {currentMode === 'past' ? 'Simple Past (V2)' : 'Past Participle (V3)'}
          </p>
        </div>

        {/* Word Display */}
        <div className="relative mb-16 group">
          <div className="absolute -inset-4 bg-indigo-500/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <h1 className="relative text-7xl md:text-8xl font-black tracking-tighter text-white capitalize drop-shadow-2xl">
            {currentVerb.base}
          </h1>
        </div>

        {/* Grid 2x2 */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {options.map((option, index) => (
            <button
              key={`${currentVerb.base}-${index}`}
              onClick={() => checkAnswer(option)}
              className="group relative overflow-hidden bg-zinc-900 border-b-4 border-zinc-800 hover:border-indigo-600 p-6 rounded-2xl transition-all duration-100 active:translate-y-1 active:border-b-0 touch-manipulation"
            >
              <span className="relative text-lg font-bold text-zinc-400 group-hover:text-white transition-colors">
                {option}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Credit */}
      <footer className="w-full flex flex-col items-center gap-2">
        <div className="h-px w-12 bg-zinc-800" />
        <p className="text-zinc-600 text-[11px] font-medium tracking-wide">
          Hecho por <span className="text-zinc-400 font-bold hover:text-indigo-400 cursor-pointer transition-colors">Edfer_code@proton.me</span>
        </p>
      </footer>
    </main>
  );
}