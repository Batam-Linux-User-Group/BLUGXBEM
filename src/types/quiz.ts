// src/types/quiz.ts
import { Category } from "./ormawa";

// TAMBAHKAN interface ini
export interface Participant {
  nama: string;
  nim: string;
  jurusan: string;
}

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