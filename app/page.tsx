'use client';

import Link from 'next/link';

export default function Home() {
  const modes = [
    {
      title: "Irregular Verbs",
      description: "Master V1, V2 and V3 forms of irregular verbs.",
      href: "/play/irregular",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
      ),
      color: "indigo"
    },
    {
      title: "Tenses in Context",
      description: "Practice grammar by filling blanks in real sentences.",
      href: "/play/context",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M9 15h6"/><path d="M9 11h6"/></svg>
      ),
      color: "emerald"
    },
    {
      title: "Direct Conjugation",
      description: "Memorize structures: Base + Pronoun + Tense.",
      href: "/play/conjugation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
      ),
      color: "rose"
    }
  ];

  return (
    <main className="min-h-dvh bg-zinc-950 flex flex-col items-center justify-center p-6 font-sans overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-indigo-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[40%] bg-emerald-500 rounded-full blur-[120px]" />
      </div>

      <header className="mb-12 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-2 italic">
          VERB<span className="text-indigo-500">QUEST</span>
        </h1>
        <p className="text-zinc-500 font-medium tracking-widest uppercase text-xs">
          Master the English Language
        </p>
      </header>

      <div className="w-full max-w-md grid gap-4 relative z-10">
        {modes.map((mode) => (
          <Link
            key={mode.title}
            href={mode.href}
            className="group block bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-5 rounded-3xl transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800/80 active:scale-[0.98] relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${mode.color}-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-${mode.color}-500/20 transition-colors`} />
            
            <div className="flex items-center gap-5 relative">
              <div className={`w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-${mode.color}-400 group-hover:scale-110 transition-transform duration-500`}>
                {mode.icon}
              </div>
              
              <div className="flex-1 text-left">
                <h2 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors">
                  {mode.title}
                </h2>
                <p className="text-zinc-500 text-sm font-medium leading-tight mt-1">
                  {mode.description}
                </p>
              </div>
              
              <div className="text-zinc-700 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </div>
          </Link>
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
    </main>
  );
}