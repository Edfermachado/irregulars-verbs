'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useStore } from '../../store';

export default function ContextPractice() {
  const { score, currentSentence, options, feedback, checkAnswer, setGameMode } = useStore();
  const [mounted, setMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const playSound = useCallback((type: 'correct' | 'error') => {
    if (isMuted) return;
    const urls = {
      correct: 'https://assets.mixkit.co/active_storage/sfx/600/600-preview.mp3',
      error: 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3'
    };
    const audio = new Audio(urls[type]);
    audio.volume = 0.4;
    audio.play().catch(() => { });
  }, [isMuted]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setGameMode('context');
  }, [setGameMode]);

  useEffect(() => {
    if (feedback) playSound(feedback);
  }, [feedback, playSound]);

  if (!mounted || !currentSentence) return null;

  // Split sentence to highlight the blank
  const parts = currentSentence.sentence.split('___');

  return (
    <main className={`min-h-dvh transition-colors duration-300 flex flex-col items-center font-sans overflow-hidden
      ${feedback === 'correct' ? 'bg-emerald-950' : feedback === 'error' ? 'bg-rose-950' : 'bg-zinc-950'}`}>

      <header className="w-full max-w-md px-6 pt-6 md:pt-8 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 p-2 rounded-xl text-zinc-400 hover:text-white hover:border-zinc-600 transition-all active:scale-95 shadow-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Link>
          <h1 className="text-xl font-black tracking-tighter text-zinc-600">VERB_QUEST</h1>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setIsMuted(!isMuted)} className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 p-2 rounded-xl text-zinc-400 hover:text-white shadow-lg">
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
            )}
          </button>
          <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 px-4 py-1.5 rounded-xl flex items-center shadow-lg">
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mr-3">Score</span>
            <span className={`text-xl font-black tabular-nums ${feedback === 'correct' ? 'text-emerald-400' : feedback === 'error' ? 'text-rose-400' : 'text-white'}`}>{score}</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-md px-6 pt-12 pb-6 min-h-75">
        <div className={`px-6 py-2.5 rounded-2xl border-2 mb-8 bg-emerald-500/10 border-emerald-500 shadow-lg shadow-emerald-500/20`}>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-300 opacity-70">
            {currentSentence.tense}
          </span>
        </div>

        <div className="text-center">
          <p className="text-zinc-600 text-sm font-bold uppercase tracking-widest mb-4">Complete the sentence</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-relaxed tracking-tight">
            {parts[0]}
            <span className={`mx-2 px-4 py-1 rounded-lg border-2 border-dashed ${feedback === 'correct' ? 'bg-emerald-500 border-emerald-400 text-white' : feedback === 'error' ? 'bg-rose-500 border-rose-400 text-white' : 'border-zinc-700 text-zinc-700'}`}>
              {feedback === 'correct' ? currentSentence.answer : feedback === 'error' ? '???' : '____'}
            </span>
            {parts[1]}
          </h2>
          <p className="text-indigo-400 font-bold mt-6 text-lg">({currentSentence.verbBase})</p>
        </div>
      </div>

      <div className={`w-full max-w-md px-6 pb-12 ${feedback === 'error' ? 'animate-shake' : ''}`}>
        <div className="grid grid-cols-2 gap-4 mb-10">
          {options.map((option, index) => (
            <button
              key={index}
              disabled={!!feedback}
              onClick={() => checkAnswer(option)}
              className={`h-20 rounded-2xl border-b-[5px] transition-all active:translate-y-1.5 active:border-b-0
                ${feedback === 'correct' && option === currentSentence.answer ? 'bg-emerald-500 border-emerald-700 text-white shadow-lg' :
                  feedback === 'error' && option !== currentSentence.answer ? 'bg-rose-950/50 border-rose-950/50 opacity-40 grayscale' :
                    'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
            >
              <span className="text-lg font-black">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}