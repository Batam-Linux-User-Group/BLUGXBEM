// FILE: calculateMatches.ts
import { Answer, MatchResult } from "@/types/quiz";
import { Ormawa } from "@/types/ormawa";
import { CATEGORIES } from "@/data/categories";

export function calculateMatches(
  answers: Answer[],
  ormawaList: Ormawa[]
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
  // 3. Ambil jurusan mahasiswa dari sessionStorage
  // =========================================================

  let userJurusan: string | null = null;

  if (typeof window !== "undefined") {
    userJurusan = sessionStorage.getItem("userJurusan");
  }

  // =========================================================
  // 4. KATEGORI UTAMA PER ORMAWA (berdasarkan data Excel)
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

  // =========================================================
  // 5. Preferensi Jurusan untuk Bonus
  // =========================================================

  const jurusanPreference: Record<string, string[]> = {
    "informatika": ["hmti", "blug"],
    "elektro": ["hme"],
    "mesin": ["hmm"],
    "manajemen_bisnis": ["hmmb", "energi"]
  };

  // =========================================================
  // 6. Hitung kecocokan setiap ORMAWA
  // =========================================================

  const results: MatchResult[] = ormawaList.map((ormawa) => {
    let totalWeightedScore = 0;
    let totalWeight = 0;
    const matchedSkills: string[] = [];
    const skillsData = ormawa.skills || {};

    // =======================================================
    // 6a. Hitung skor berdasarkan kategori
    // =======================================================

    for (const [category, ormawaWeight] of Object.entries(skillsData)) {
      if (typeof ormawaWeight !== "number" || ormawaWeight <= 0) {
        continue;
      }

      const studentScore = studentAvg[category] || 0;
      const contribution = studentScore * ormawaWeight;

      totalWeightedScore += contribution;
      totalWeight += ormawaWeight;

      // Badge skill: jika rata-rata mahasiswa >= 3.5
      if (studentScore >= 3.5) {
        const skillName = CATEGORIES[category];
        if (skillName && !matchedSkills.includes(skillName)) {
          matchedSkills.push(skillName);
        }
      }
    }

    // =======================================================
    // 6b. Hitung persentase DASAR
    // =======================================================

    let percentage = 0;
    if (totalWeight > 0) {
      const maxPossibleScore = totalWeight * 5;
      percentage = (totalWeightedScore / maxPossibleScore) * 100;
    }

    // =======================================================
    // 6c. BONUS KATEGORI UTAMA (+5% per kategori cocok)
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
    // 6d. BONUS JURUSAN (+8% jika jurusan cocok)
    // =======================================================

    let bonusJurusan = 0;
    if (userJurusan && jurusanPreference[userJurusan]?.includes(ormawa.id)) {
      bonusJurusan = 8;
    }
    percentage += bonusJurusan;

    // =======================================================
    // 6e. PENALTI jika skill utama rendah
    // =======================================================

    let penalty = 0;
    for (const [category, ormawaWeight] of Object.entries(skillsData)) {
      if (typeof ormawaWeight !== "number" || ormawaWeight <= 0) {
        continue;
      }

      const studentScore = studentAvg[category] || 0;
      
      // Jika bobot ORMAWA tinggi (>= 7) tapi skor mahasiswa rendah (< 3)
      if (ormawaWeight >= 7 && studentScore < 3) {
        penalty += (3 - studentScore) * 2;
      }
    }
    percentage -= penalty;

    // =======================================================
    // 6f. Normalisasi persentase (0-100%)
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
  // 7. Sorting & Filtering
  // =========================================================

  // Sort by score descending
  const sortedResults = results.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.name.localeCompare(b.name, "id-ID");
  });

  // Filter: hanya tampilkan yang score >= 40%
  // Tapi tetap tampilkan minimal 3 rekomendasi
  const filteredResults = sortedResults.filter(r => r.score >= 40);
  
  if (filteredResults.length >= 3) {
    return filteredResults;
  }
  
  // Jika kurang dari 3, tampilkan top 3
  return sortedResults.slice(0, 3);
}