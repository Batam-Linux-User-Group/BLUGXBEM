import { Answer, MatchResult } from "@/types/quiz";
import { Ormawa } from "@/types/ormawa";
import { CATEGORIES } from "@/data/categories";

export function calculateMatches(
  answers: Answer[],
  ormawaList: Ormawa[]
): MatchResult[] {
  // 1. Agregasi skor mahasiswa per kategori
  const studentProfile: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};

  answers.forEach((answer) => {
    if (!studentProfile[answer.category]) {
      studentProfile[answer.category] = 0;
      categoryCounts[answer.category] = 0;
    }
    studentProfile[answer.category] += answer.score;
    categoryCounts[answer.category] += 1;
  });

  // Hitung rata-rata skor mahasiswa per kategori (skala 1-5)
  const studentAvg: Record<string, number> = {};
  for (const cat in studentProfile) {
    studentAvg[cat] = studentProfile[cat] / categoryCounts[cat];
  }

  // 2. Hitung skor kecocokan untuk setiap ORMAWA
  const results: MatchResult[] = ormawaList.map((ormawa) => {
    let totalScore = 0;
    let maxPossibleScore = 0;
    const matchedSkills: string[] = [];

    for (const [category, ormawaWeight] of Object.entries(ormawa.skills)) {
      if (ormawaWeight && ormawaWeight > 0) {
        const studentScore = studentAvg[category] || 0;
        
        // Normalisasi: (Skor Mahasiswa / 5) * Bobot ORMAWA
        const contribution = (studentScore / 5) * ormawaWeight;
        totalScore += contribution;
        maxPossibleScore += ormawaWeight;

        // Jika skor rata-rata mahasiswa di kategori ini >= 4, anggap sebagai skill yang cocok
        if (studentScore >= 4) {
          matchedSkills.push(CATEGORIES[category as keyof typeof CATEGORIES]);
        }
      }
    }

    // Hitung persentase kecocokan (0-100%)
    const percentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;

    return {
      ormawaId: ormawa.id,
      name: ormawa.name,
      type: ormawa.type,
      score: percentage,
      matchedSkills,
    };
  });

  // 3. Urutkan dari skor tertinggi ke terendah
  return results.sort((a, b) => b.score - a.score);
}