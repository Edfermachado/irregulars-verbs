'use client';

import { useEffect, useState, useCallback } from 'react';
import { useStore } from './store';

export default function PracticeApp() {
  const { score, currentVerb, currentMode, options, feedback, checkAnswer, nextQuestion } = useStore();
  const [mounted, setMounted] = useState(false);

  // Función para reproducir sonidos
  const playSound = useCallback((type: 'correct' | 'error') => {
    const urls = {
      correct: 'https://assets.mixkit.co/active_storage/sfx/600/600-preview.mp3',
      error: 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3'
    };
    const audio = new Audio(urls[type]);
    audio.volume = 0.4;
    audio.play().catch(() => { }); // Ignorar errores de autoplay del navegador
  }, []);

  useEffect(() => {
    setMounted(true);
    nextQuestion();
  }, [nextQuestion]);

  // Disparar sonido cuando cambie el feedback
  useEffect(() => {
    if (feedback) playSound(feedback);
  }, [feedback, playSound]);

  if (!mounted || !currentVerb) return null;

  return (
    <main className={`min-h-screen transition-colors duration-300 flex flex-col items-center justify-between font-sans overflow-hidden
      ${feedback === 'correct' ? 'bg-emerald-950' : feedback === 'error' ? 'bg-rose-950' : 'bg-zinc-950'}`}>

      {/* Banner Superior Dinámico */}
      <div className={`w-full py-4 text-center border-b transition-all duration-500 
        ${feedback === 'correct' ? 'bg-emerald-500 border-emerald-400' :
          feedback === 'error' ? 'bg-rose-500 border-rose-400' :
            currentMode === 'past' ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>

        <h2 className={`text-xl font-black uppercase tracking-tighter transition-colors
          ${feedback ? 'text-white' : currentMode === 'past' ? 'text-indigo-400' : 'text-emerald-400'}`}>
          {feedback === 'correct' ? '¡Excellent!' : feedback === 'error' ? 'Keep trying!' :
            currentMode === 'past' ? 'Simple Past (V2)' : 'Past Participle (V3)'}
        </h2>
      </div>

      {/* Score y Header */}
      <div className="w-full max-w-md px-6 pt-8 flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tighter text-zinc-500">VERB_QUEST</h1>
        <div className="bg-zinc-900/50 border border-zinc-800 px-4 py-1.5 rounded-full">
          <span className="text-zinc-500 text-[10px] font-bold uppercase mr-3">Score</span>
          <span className="text-lg font-black text-white">{score}</span>
        </div>
      </div>

      {/* Verbo Principal con Animación de Escala */}
      <div className={`flex flex-col items-center transition-transform duration-300 ${feedback === 'correct' ? 'scale-110' : ''}`}>
        <p className="text-zinc-600 text-sm font-bold uppercase tracking-widest mb-2">Base Form</p>
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white capitalize drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]">
          {currentVerb.base}
        </h1>
      </div>

      {/* Grid de Opciones con Efecto de Sacudida */}
      <div className={`w-full max-w-md px-6 pb-12 ${feedback === 'error' ? 'animate-shake' : ''}`}>
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <button
              key={`${currentVerb.base}-${index}`}
              disabled={!!feedback}
              onClick={() => checkAnswer(option)}
              className={`group relative h-24 rounded-2xl border-b-4 transition-all duration-75 active:translate-y-1 active:border-b-0 touch-manipulation
                ${feedback === 'correct' && option === currentVerb[currentMode] ? 'bg-emerald-500 border-emerald-600' :
                  feedback === 'error' && option !== currentVerb[currentMode] ? 'bg-rose-500 border-rose-600 opacity-50' :
                    'bg-zinc-900 border-zinc-800 hover:border-indigo-500'}`}
            >
              <span className={`text-xl font-black transition-colors ${feedback ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`}>
                {option}
              </span>
            </button>
          ))}
        </div>

        {/* Footer Credit - Actualizado y Destacado */}
        <footer className="w-full flex flex-col items-center gap-4 pb-12">
          {/* Línea divisoria sutil */}
          <div className="h-px w-20 bg-linear-to-r from-transparent via-zinc-700 to-transparent" />

          <div className="flex flex-col items-center gap-1">
            <p className="text-[12px] font-medium text-zinc-500 tracking-wider">
              Hecho con ❤️ por
              <span className="text-white font-black tracking-tight ml-2 border-b border-indigo-500/50 pb-0.5">
                Edfer_code
              </span>
            </p>

            {/* Correo Clickable */}
            <a
              href="mailto:Edfer_code@proton.me"
              className="text-[11px] font-bold text-zinc-400 hover:text-indigo-400 transition-all duration-300 flex items-center gap-2 group"
            >
              <span className="bg-zinc-900 p-1 rounded group-hover:bg-indigo-500/10 transition-colors">
                Edfer_code@proton.me
              </span>
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}