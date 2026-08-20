import { Category } from "./ormawa";

export interface Question {
  id: string;
  text: string;
  category: Category;
  options: {
    text: string;
    score: number; // Skala 1-5
  }[];
}

export interface Answer {
  questionId: string;
  category: Category;
  score: number;
}

export interface MatchResult {
  ormawaId: string;
  name: string;
  type: string;
  score: number; // Persentase 0-100
  matchedSkills: string[];
}