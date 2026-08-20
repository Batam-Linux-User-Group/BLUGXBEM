import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]; // Buat salinan agar data asli tidak berubah
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Tukar posisi elemen
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}