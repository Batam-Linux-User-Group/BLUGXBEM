// FILE: calculateMatches.ts
import { Answer, MatchResult } from "@/types/quiz";
import { Ormawa } from "@/types/ormawa";
import { CATEGORIES } from "@/data/categories";

// =========================================================
// ORGANISASI EXCLUSIVE PER JURUSAN (Himpunan Mahasiswa Jurusan / HMJ)
// Mahasiswa DI LUAR jurusan ini secara struktural TIDAK BISA
// menjadi anggota, jadi org ini wajib difilter total dari hasil
// (bukan sekadar dikurangi skornya) kalau jurusan tidak cocok.
// =========================================================
const jurusanExclusiveOrmawa: Record<string, string> = {
  "hme": "elektro",
  "hmti": "informatika",
  "hmm": "mesin",
  "hmmb": "manajemen_bisnis",
};

// =========================================================
// BONUS RELEVANSI (opsional, BUKAN syarat wajib)
// Organisasi umum/minat yang temanya nyambung ke jurusan tertentu,
// tapi tetap terbuka untuk semua jurusan (mis. UKM/komunitas minat).
// =========================================================
const jurusanPreference: Record<string, string[]> = {
  "informatika": ["blug"],
  "manajemen_bisnis": ["energi"],
};

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
  // 4. FILTER KELAYAKAN: buang org HMJ yang jurusannya tidak cocok
  //    SEBELUM dihitung skornya sama sekali. Ini yang mencegah
  //    mahasiswa Mesin direkomendasikan ke HMTI/HME, dst.
  // =========================================================

  const eligibleOrmawaList = ormawaList.filter((ormawa) => {
    const requiredJurusan = jurusanExclusiveOrmawa[ormawa.id];
    if (!requiredJurusan) return true; // org umum, terbuka untuk semua jurusan
    return userJurusan === requiredJurusan;
  });

  // =========================================================
  // 5. KATEGORI UTAMA PER ORMAWA (berdasarkan data Excel)
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
  // 6. Hitung kecocokan setiap ORMAWA yang ELIGIBLE
  // =========================================================

  const results: MatchResult[] = eligibleOrmawaList.map((ormawa) => {
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

      // Beberapa ormawa punya bobot skill (mis. "design") yang TIDAK PERNAH
      // ditanyakan di kuis (lihat questions.ts). Kalau tetap dihitung sebagai
      // skor 0, ormawa yang mengandalkan skill itu (KUAS, REKAM, dll.) akan
      // dirugikan secara tidak adil karena penyebutnya (totalWeight) naik
      // tapi pembilangnya tidak pernah bertambah. Jadi kategori yang memang
      // tidak pernah dijawab mahasiswa di-skip total dari perhitungan ini,
      // bukan dianggap skor 0.
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
    // 6d. BONUS JURUSAN (+8%) — hanya penambah relevansi,
    //     org yang jurusannya tidak cocok sudah tersaring
    //     di langkah 4 dan tidak akan sampai ke sini.
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
    // 6e. PENALTI jika skill utama rendah
    // =======================================================

    let penalty = 0;
    for (const [category, ormawaWeight] of Object.entries(skillsData)) {
      if (typeof ormawaWeight !== "number" || ormawaWeight <= 0) {
        continue;
      }

      // Sama seperti di 6a: kategori yang tidak pernah ditanyakan di kuis
      // tidak boleh ikut dihitung sebagai "skor rendah" mahasiswa.
      if (!(category in studentAvg)) {
        continue;
      }

      const studentScore = studentAvg[category];

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
  // (karena eligibleOrmawaList sudah menyaring org HMJ yang tidak
  // relevan, fallback top-3 ini otomatis ikut hanya berisi org yang
  // memang eligible untuk jurusan mahasiswa)
  const filteredResults = sortedResults.filter(r => r.score >= 40);

  if (filteredResults.length >= 3) {
    return filteredResults;
  }

  // Jika kurang dari 3, tampilkan top 3 dari yang eligible
  return sortedResults.slice(0, 3);
}