// FILE: calculateMatches.ts
import { Answer, MatchResult } from "@/types/quiz";
import { Ormawa } from "@/types/ormawa";
import { CATEGORIES } from "@/data/categories";

// =========================================================
// ORGANISASI EXCLUSIVE PER JURUSAN (Himpunan Mahasiswa Jurusan / HMJ)
// =========================================================
const jurusanExclusiveOrmawa: Record<string, string> = {
  "hme": "elektro",
  "hmti": "informatika",
  "hmm": "mesin",
  "hmmb": "manajemen_bisnis",
};

// =========================================================
// BONUS RELEVANSI (opsional)
// =========================================================
const jurusanPreference: Record<string, string[]> = {
  "informatika": ["blug"],
  "manajemen_bisnis": ["energi"],
};

// =========================================================
// KATEGORI UTAMA PER ORMAWA
// =========================================================
const mainCategory: Record<string, string[]> = {
  "dpm": ["leadership", "publicSpeaking", "problemSolving"],
  "bem-polibatam": ["leadership", "eventManagement", "networking"],
  "lpm-paradigma": ["contentCreation", "communication", "research"],
  "pec": ["bahasa", "communication"],
  "hme": ["technicalSkill", "eventManagement"],
  "hmti": ["technicalSkill", "eventManagement"],
  "hmm": ["technicalSkill", "eventManagement"],
  "energi": ["entrepreneurship", "networking"],
  "immpb": ["social", "leadership"],
  "blug": ["technicalSkill", "research"],
  "rekam": ["contentCreation", "design", "creativity"],
  "kuas": ["creativity", "design"],
  "kop": ["physicalFitness", "eventManagement"],
  "pd-elshaddai": ["social", "leadership"],
  "hmmb": ["entrepreneurship", "networking"],
  "mapala": ["physicalFitness", "teamwork"]
};

/**
 * Menghitung kecocokan antara jawaban mahasiswa dengan daftar ormawa
 * @param answers - Daftar jawaban kuis mahasiswa
 * @param ormawaList - Daftar semua ormawa yang tersedia
 * @param userJurusan - Jurusan mahasiswa (dari sessionStorage)
 * @returns Array hasil perhitungan match yang sudah di-sort dan di-filter
 */
export function calculateMatches(
  answers: Answer[],
  ormawaList: Ormawa[],
  userJurusan: string
): MatchResult[] {
  // =========================================================
  // 1. Agregasi skor mahasiswa per kategori
  // =========================================================

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

  // =========================================================
  // 2. Hitung rata-rata skor mahasiswa per kategori (1-5)
  // =========================================================

  const studentAvg: Record<string, number> = {};

  for (const category in studentProfile) {
    if (categoryCounts[category] > 0) {
      studentAvg[category] =
        studentProfile[category] / categoryCounts[category];
    }
  }

  // =========================================================
  // 3. FILTER KELAYAKAN: buang org HMJ yang jurusannya tidak cocok
  // =========================================================

  const eligibleOrmawaList = ormawaList.filter((ormawa) => {
    const requiredJurusan = jurusanExclusiveOrmawa[ormawa.id];
    if (!requiredJurusan) return true;
    return userJurusan === requiredJurusan;
  });

  // =========================================================
  // 4. Hitung kecocokan setiap ORMAWA yang ELIGIBLE
  // =========================================================

  const results: MatchResult[] = eligibleOrmawaList.map((ormawa) => {
    let totalWeightedScore = 0;
    let totalWeight = 0;
    const matchedSkills: string[] = [];
    const skillsData = ormawa.skills || {};

    // =======================================================
    // 4a. Hitung skor berdasarkan kategori
    // =======================================================

    for (const [category, ormawaWeight] of Object.entries(skillsData)) {
      if (typeof ormawaWeight !== "number" || ormawaWeight <= 0) {
        continue;
      }

      // Skip kategori yang tidak pernah ditanyakan di kuis
      if (!(category in studentAvg)) {
        continue;
      }

      const studentScore = studentAvg[category];
      const contribution = studentScore * ormawaWeight;

      totalWeightedScore += contribution;
      totalWeight += ormawaWeight;

      // Badge skill: jika rata-rata mahasiswa >= 3.5
      if (studentScore >= 3.5) {
        const categoryKey = category as keyof typeof CATEGORIES;
        const skillName = CATEGORIES[categoryKey];
        if (skillName && !matchedSkills.includes(skillName)) {
          matchedSkills.push(skillName);
        }
      }
    }

    // =======================================================
    // 4b. Hitung persentase DASAR
    // =======================================================

    let percentage = 0;
    if (totalWeight > 0) {
      const maxPossibleScore = totalWeight * 5;
      percentage = (totalWeightedScore / maxPossibleScore) * 100;
    }

    // =======================================================
    // 4c. BONUS KATEGORI UTAMA (+5% per kategori cocok)
    // =======================================================

    const mainCats = mainCategory[ormawa.id] || [];
    let bonusMainCategory = 0;
    for (const cat of mainCats) {
      if (studentAvg[cat] && studentAvg[cat] >= 4) {
        bonusMainCategory += 5;
      }
    }
    percentage += bonusMainCategory;

    // =======================================================
    // 4d. BONUS JURUSAN (+8%)
    // =======================================================

    let bonusJurusan = 0;
    if (userJurusan && jurusanPreference[userJurusan]?.includes(ormawa.id)) {
      bonusJurusan = 8;
    }
    if (userJurusan && jurusanExclusiveOrmawa[ormawa.id] === userJurusan) {
      bonusJurusan = 8;
    }
    percentage += bonusJurusan;

    // =======================================================
    // 4e. PENALTI jika skill utama rendah
    // =======================================================

    let penalty = 0;
    for (const [category, ormawaWeight] of Object.entries(skillsData)) {
      if (typeof ormawaWeight !== "number" || ormawaWeight <= 0) {
        continue;
      }

      if (!(category in studentAvg)) {
        continue;
      }

      const studentScore = studentAvg[category];

      if (ormawaWeight >= 7 && studentScore < 3) {
        penalty += (3 - studentScore) * 2;
      }
    }
    percentage -= penalty;

    // =======================================================
    // 4f. Normalisasi persentase (0-100%)
    // =======================================================

    percentage = Math.max(0, Math.min(100, percentage));
    const finalScore = Math.round(percentage);

    return {
      ormawaId: ormawa.id,
      name: ormawa.name,
      type: ormawa.type,
      score: finalScore,
      matchedSkills,
    };
  });

  // =========================================================
  // 5. Sorting & Filtering
  // =========================================================

  const sortedResults = results.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.name.localeCompare(b.name, "id-ID");
  });

  const filteredResults = sortedResults.filter(r => r.score >= 40);

  if (filteredResults.length >= 3) {
    return filteredResults;
  }

  return sortedResults.slice(0, 3);
}