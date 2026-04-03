import { create } from 'zustand';
import verbsData from './verbs.json';

type VerbMode = 'past' | 'participle';
// Añadimos 'correct' y 'error' al estado
type FeedbackType = 'correct' | 'error' | null;

interface Verb {
  base: string;
  past: string;
  participle: string;
  distractors: string[];
}

interface GameState {
  score: number;
  currentVerb: Verb | null;
  currentMode: VerbMode;
  options: string[];
  feedback: FeedbackType; // Nuevo
  nextQuestion: () => void;
  checkAnswer: (answer: string) => void;
}

const shuffle = (array: string[]) => [...array].sort(() => Math.random() - 0.5);

export const useStore = create<GameState>((set, get) => ({
  score: 0,
  currentVerb: null,
  currentMode: 'past',
  options: [],
  feedback: null,

  nextQuestion: () => {
    const randomIndex = Math.floor(Math.random() * verbsData.length);
    const selectedVerb = verbsData[randomIndex];
    const newMode: VerbMode = Math.random() > 0.5 ? 'past' : 'participle';
    const correctAnswer = selectedVerb[newMode];
    const allOptions = shuffle([correctAnswer, ...selectedVerb.distractors]);

    set({
      currentVerb: selectedVerb,
      currentMode: newMode,
      options: allOptions,
      feedback: null, // Resetear feedback
    });
  },

  checkAnswer: (answer: string) => {
    const { currentVerb, currentMode, score, nextQuestion } = get();
    if (!currentVerb || get().feedback) return; // Evitar múltiples clics

    if (answer === currentVerb[currentMode]) {
      set({ score: score + 1, feedback: 'correct' });
    } else {
      set({ score: score - 1, feedback: 'error' });
    }

    // Esperar 600ms para que el usuario vea el efecto antes de cambiar
    setTimeout(() => {
      nextQuestion();
    }, 600);
  },
}));