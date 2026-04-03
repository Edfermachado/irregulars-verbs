import { create } from 'zustand';
import verbsData from './verbs.json';

type GameMode = 'past' | 'participle';

interface Verb {
  base: string;
  past: string;
  participle: string;
  distractors: string[];
}

interface GameState {
  score: number;
  currentVerb: Verb | null;
  currentMode: GameMode;
  options: string[];
  nextQuestion: () => void;
  checkAnswer: (answer: string) => void;
}

const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const useStore = create<GameState>((set, get) => ({
  score: 0,
  currentVerb: null,
  currentMode: 'past',
  options: [],
  
  nextQuestion: () => {
    const randomIndex = Math.floor(Math.random() * verbsData.length);
    const selectedVerb = verbsData[randomIndex];
    
    // Elegir modo aleatorio: 50% pasado, 50% participio
    const mode: GameMode = Math.random() > 0.5 ? 'past' : 'participle';
    
    // La respuesta correcta depende del modo
    const correctAnswer = selectedVerb[mode];
    const allOptions = [correctAnswer, ...selectedVerb.distractors];
    
    set({
      currentVerb: selectedVerb,
      currentMode: mode,
      options: shuffleArray(allOptions),
    });
  },

  checkAnswer: (answer: string) => {
    const { currentVerb, currentMode, score, nextQuestion } = get();
    if (!currentVerb) return;

    if (answer === currentVerb[currentMode]) {
      set({ score: score + 1 });
    } else {
      set({ score: score - 1 });
    }
    
    nextQuestion();
  },
}));