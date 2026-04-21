import { create } from 'zustand';
import verbsData from './verbs.json';
import sentencesData from './sentences.json';
import conjugationsData from './conjugations.json';

type VerbMode = 'past' | 'participle' | 'present3rd' | 'continuous' | 'future';
type GameMode = 'irregular' | 'context' | 'conjugation';
type FeedbackType = 'correct' | 'error' | null;

interface Verb {
  base: string;
  past: string;
  participle: string;
  present3rd: string;
  continuous: string;
  future: string;
  distractors: string[];
}

interface Sentence {
  sentence: string;
  verbBase: string;
  tense: string;
  answer: string;
  distractors: string[];
}

interface Conjugation {
  pronoun: string;
  verbBase: string;
  tense: string;
  answer: string;
  distractors: string[];
}

interface GameState {
  score: number;
  gameMode: GameMode;
  currentVerb: Verb | null;
  currentSentence: Sentence | null;
  currentConjugation: Conjugation | null;
  currentVerbMode: VerbMode | null; // Solo para irregular
  options: string[];
  feedback: FeedbackType;
  setGameMode: (mode: GameMode) => void;
  nextQuestion: () => void;
  checkAnswer: (answer: string) => void;
}

const shuffle = (array: string[]) => [...array].sort(() => Math.random() - 0.5);

export const useStore = create<GameState>((set, get) => ({
  score: 0,
  gameMode: 'irregular',
  currentVerb: null,
  currentSentence: null,
  currentConjugation: null,
  currentVerbMode: null,
  options: [],
  feedback: null,

  setGameMode: (mode: GameMode) => {
    set({ gameMode: mode, score: 0, feedback: null });
    get().nextQuestion();
  },

  nextQuestion: () => {
    const { gameMode } = get();
    
    if (gameMode === 'irregular') {
      const randomIndex = Math.floor(Math.random() * verbsData.length);
      const selectedVerb = verbsData[randomIndex] as Verb;
      const modes: VerbMode[] = ['past', 'participle', 'present3rd', 'continuous', 'future'];
      const newMode = modes[Math.floor(Math.random() * modes.length)];
      const correctAnswer = selectedVerb[newMode];
      const allOptions = shuffle([correctAnswer, ...selectedVerb.distractors]);

      set({
        currentVerb: selectedVerb,
        currentVerbMode: newMode,
        currentSentence: null,
        currentConjugation: null,
        options: allOptions,
        feedback: null,
      });
    } else if (gameMode === 'context') {
      const randomIndex = Math.floor(Math.random() * sentencesData.length);
      const selectedSentence = sentencesData[randomIndex];
      const allOptions = shuffle([selectedSentence.answer, ...selectedSentence.distractors]);

      set({
        currentSentence: selectedSentence,
        currentVerb: null,
        currentConjugation: null,
        currentVerbMode: null,
        options: allOptions,
        feedback: null,
      });
    } else if (gameMode === 'conjugation') {
      const randomIndex = Math.floor(Math.random() * conjugationsData.length);
      const selectedConjugation = conjugationsData[randomIndex];
      const allOptions = shuffle([selectedConjugation.answer, ...selectedConjugation.distractors]);

      set({
        currentConjugation: selectedConjugation,
        currentVerb: null,
        currentSentence: null,
        currentVerbMode: null,
        options: allOptions,
        feedback: null,
      });
    }
  },

  checkAnswer: (answer: string) => {
    const { gameMode, currentVerb, currentVerbMode, currentSentence, currentConjugation, score, nextQuestion } = get();
    if (get().feedback) return;

    let isCorrect = false;
    if (gameMode === 'irregular' && currentVerb && currentVerbMode) {
      isCorrect = answer === currentVerb[currentVerbMode];
    } else if (gameMode === 'context' && currentSentence) {
      isCorrect = answer === currentSentence.answer;
    } else if (gameMode === 'conjugation' && currentConjugation) {
      isCorrect = answer === currentConjugation.answer;
    }

    if (isCorrect) {
      set({ score: score + 1, feedback: 'correct' });
    } else {
      set({ score: score - 1, feedback: 'error' });
    }

    setTimeout(() => {
      nextQuestion();
    }, 800);
  },
}));