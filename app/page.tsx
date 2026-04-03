'use client';

import { useEffect, useState, useCallback } from 'react';
import { useStore } from './store';

export default function PracticeApp() {
  const { score, currentVerb, currentMode, options, feedback, checkAnswer, nextQuestion } = useStore();
  const [mounted, setMounted] = useState(false);

  const playSound = useCallback((type: 'correct' | 'error') => {
    const urls = {
      correct: 'https://assets.mixkit.co/active_storage/sfx/600/600-preview.mp3',
      error: 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3'
    };
    const audio = new Audio(urls[type]);
    audio.volume = 0.4;
    audio.play().catch(() => { });
  }, []);

  useEffect(() => {
    setMounted(true);
    nextQuestion();
  }, [nextQuestion]);

  useEffect(() => {
    if (feedback) playSound(feedback);
  }, [feedback, playSound]);

  if (!mounted || !currentVerb) return null;

  return (
    <main className={`min-h-dvh transition-colors duration-300 flex flex-col items-center font-sans overflow-hidden
      ${feedback === 'correct' ? 'bg-emerald-950' : feedback === 'error' ? 'bg-rose-950' : 'bg-zinc-950'}`}>

      {/* 1. Header Minimalista (Logo y Score) */}
      <header className="w-full max-w-md px-6 pt-6 md:pt-8 flex justify-between items-center z-10">
        <h1 className="text-xl font-black tracking-tighter text-zinc-600">VERB_QUEST</h1>

        <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 px-4 py-1.5 rounded-2xl flex items-center shadow-lg">
          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mr-3">Score</span>
          <span className={`text-xl font-black tabular-nums transition-colors duration-300 
            ${feedback === 'correct' ? 'text-emerald-400' : feedback === 'error' ? 'text-rose-400' : 'text-white'}`}>
            {score}
          </span>
        </div>
      </header>

      {/* 2. Área Central Óptica (Píldora de Objetivo + Verbo Base) */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-md px-4 pt-12 pb-6 min-h-75">

        <div className={`flex flex-col items-center justify-center px-6 py-2.5 rounded-2xl border-2 mb-8 transition-all duration-300 transform shadow-xl
          ${feedback === 'correct' ? 'bg-emerald-500 border-emerald-400 scale-110 shadow-emerald-500/20' :
            feedback === 'error' ? 'bg-rose-500 border-rose-400 scale-110 shadow-rose-500/20' :
              currentMode === 'past' ? 'bg-indigo-500/10 border-indigo-500 shadow-indigo-500/20' :
                'bg-emerald-500/10 border-emerald-500 shadow-emerald-500/20'}`}>

          <span className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-1 opacity-70
             ${feedback ? 'text-white' : currentMode === 'past' ? 'text-indigo-300' : 'text-emerald-300'}`}>
            {feedback ? 'Status' : 'Target Tense'}
          </span>

          <h2 className={`text-xl md:text-2xl font-black uppercase tracking-widest
            ${feedback ? 'text-white' : currentMode === 'past' ? 'text-indigo-400' : 'text-emerald-400'}`}>
            {feedback === 'correct' ? '¡Excellent!' : feedback === 'error' ? 'Keep trying!' :
              currentMode === 'past' ? 'Simple Past (V2)' : 'Past Participle (V3)'}
          </h2>
        </div>

        {/* Verbo Principal */}
        <div className={`flex flex-col items-center transition-transform duration-300 ${feedback === 'correct' ? 'scale-105' : ''}`}>
          <p className="text-zinc-600 text-sm font-bold uppercase tracking-widest mb-2">Base Form</p>
          <div className="relative group">
            <div className="absolute -inset-6 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <h1 className="relative text-7xl md:text-9xl font-black tracking-tighter text-white capitalize drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              {currentVerb.base}
            </h1>
          </div>
        </div>

      </div>

      {/* 3. Grid de Opciones y Footer */}
      <div className={`w-full max-w-md px-6 pb-8 md:pb-12 ${feedback === 'error' ? 'animate-shake' : ''}`}>
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-10">
          {options.map((option, index) => (
            <button
              key={`${currentVerb.base}-${index}`}
              disabled={!!feedback}
              onClick={() => checkAnswer(option)}
              className={`group relative h-20 md:h-24 rounded-2xl border-b-[5px] transition-all duration-100 active:translate-y-1.5 active:border-b-0 touch-manipulation
                ${feedback === 'correct' && option === currentVerb[currentMode] ? 'bg-emerald-500 border-emerald-700 shadow-[0_0_30px_rgba(16,185,129,0.3)]' :
                  feedback === 'error' && option !== currentVerb[currentMode] ? 'bg-rose-950/50 border-rose-950/50 opacity-40 grayscale' :
                    'bg-zinc-900 border-zinc-800 hover:border-indigo-500/80 hover:bg-zinc-800 shadow-lg'}`}
            >
              <span className={`text-lg md:text-xl font-black transition-colors duration-200 
                ${feedback === 'correct' && option === currentVerb[currentMode] ? 'text-white' :
                  'text-zinc-400 group-hover:text-white'}`}>
                {option}
              </span>
            </button>
          ))}
        </div>

        {/* Footer Credit */}
        <footer className="w-full flex flex-col items-center gap-4">
          <div className="h-px w-20 bg-linear-to-r from-transparent via-zinc-700 to-transparent" />
          <div className="flex flex-col items-center gap-1">
            <p className="text-[12px] font-medium text-zinc-500 tracking-wider">
              Hecho con ❤️ por
              <span className="text-white font-black tracking-tight ml-2 border-b border-indigo-500/50 pb-0.5">
                Edfer_code
              </span>
            </p>
            <a
              href="mailto:Edfer_code@proton.me"
              className="text-[11px] font-bold text-zinc-400 hover:text-indigo-400 transition-all duration-300 flex items-center gap-2 group"
            >
              <span className="bg-zinc-900 px-2 py-1 rounded group-hover:bg-indigo-500/10 transition-colors">
                Edfer_code@proton.me
              </span>
            </a>
          </div>
        </footer>
      </div>

    </main>
  );
}