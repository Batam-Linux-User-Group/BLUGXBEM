// FILE: questions.ts
import { Question } from "@/types/quiz";

export const QUESTIONS: Question[] = [
  // ============================================================
  // LAYER 1: MINAT & KEPRIBADIAN (6 Pertanyaan)
  // ============================================================

  {
    id: "q1",
    text: "Aktivitas apa yang paling kamu sukai di waktu luang?",
    category: "creativity",
    options: [
      { text: "Membuat konten kreatif (video, desain, tulisan)", score: 5 },
      { text: "Bermain musik, menari, atau seni pertunjukan", score: 4 },
      { text: "Mengikuti kegiatan olahraga atau aktivitas fisik", score: 3 },
      { text: "Menghabiskan waktu dengan teman atau bersantai", score: 2 },
      { text: "Bermain game atau kegiatan individu lainnya", score: 1 }
    ]
  },
  {
    id: "q2",
    text: "Topik apa yang paling menarik perhatianmu untuk dipelajari?",
    category: "research",
    options: [
      { text: "Teknologi, inovasi, dan perkembangan digital", score: 5 },
      { text: "Bisnis, kewirausahaan, dan strategi marketing", score: 4 },
      { text: "Isu sosial, kemanusiaan, dan pengabdian masyarakat", score: 3 },
      { text: "Seni, budaya, dan kreativitas", score: 2 },
      { text: "Tidak ada yang spesifik, saya fleksibel", score: 1 }
    ]
  },
  {
    id: "q3",
    text: "Dalam sebuah proyek kelompok, peran apa yang paling cocok untukmu?",
    category: "leadership",
    options: [
      { text: "Memimpin tim dan mengambil keputusan strategis", score: 5 },
      { text: "Mengkoordinasi dan memastikan tugas berjalan lancar", score: 4 },
      { text: "Menjalankan tugas dengan detail dan bertanggung jawab", score: 3 },
      { text: "Memberikan ide kreatif dan solusi inovatif", score: 2 },
      { text: "Mengikuti arahan dan menyelesaikan tugas yang diberikan", score: 1 }
    ]
  },
  {
    id: "q4",
    text: "Lingkungan seperti apa yang membuatmu paling nyaman dan produktif?",
    category: "teamwork",
    options: [
      { text: "Tim yang kolaboratif, suportif, dan penuh energi", score: 5 },
      { text: "Tim yang terstruktur dengan pembagian tugas jelas", score: 4 },
      { text: "Lingkungan yang kompetitif untuk mendorong performa", score: 3 },
      { text: "Bekerja secara mandiri dengan sedikit interaksi", score: 2 },
      { text: "Lingkungan santai tanpa tekanan", score: 1 }
    ]
  },
  {
    id: "q5",
    text: "Bagaimana cara terbaikmu dalam mengekspresikan diri?",
    category: "contentCreation",
    options: [
      { text: "Melalui tulisan, artikel, atau jurnalistik", score: 5 },
      { text: "Melalui visual, desain, atau multimedia", score: 4 },
      { text: "Melalui komunikasi langsung dan public speaking", score: 3 },
      { text: "Melalui karya seni atau pertunjukan", score: 2 },
      { text: "Saya lebih suka tidak mengekspresikan diri secara publik", score: 1 }
    ]
  },
  {
    id: "q6",
    text: "Aktivitas fisik apa yang paling kamu minati?",
    category: "physicalFitness",
    options: [
      { text: "Olahraga kompetitif dan pertandingan", score: 5 },
      { text: "Petualangan alam seperti hiking, camping, atau panjat", score: 4 },
      { text: "Olahraga rekreasi seperti jogging atau bersepeda", score: 3 },
      { text: "Aktivitas fisik ringan seperti yoga atau jalan santai", score: 2 },
      { text: "Saya kurang tertarik dengan aktivitas fisik", score: 1 }
    ]
  },

  // ============================================================
  // LAYER 2: SKILL & KEMAMPUAN (6 Pertanyaan)
  // ============================================================

  {
    id: "q7",
    text: "Seberapa percaya diri kamu dalam berbicara di depan umum?",
    category: "publicSpeaking",
    options: [
      { text: "Sangat percaya diri, saya menikmati menjadi pembicara", score: 5 },
      { text: "Cukup percaya diri, masih sedikit gugup tapi bisa", score: 4 },
      { text: "Gugup tapi bersedia belajar dan berlatih", score: 3 },
      { text: "Kurang percaya diri, lebih suka di belakang layar", score: 2 },
      { text: "Sangat tidak nyaman dan menghindari jika bisa", score: 1 }
    ]
  },
  {
    id: "q8",
    text: "Bagaimana kemampuanmu dalam berkomunikasi dengan orang baru?",
    category: "communication",
    options: [
      { text: "Sangat baik, mudah bergaul dan membangun relasi", score: 5 },
      { text: "Cukup baik, bisa berkomunikasi dengan lancar", score: 4 },
      { text: "Cukup, tapi butuh waktu untuk membuka diri", score: 3 },
      { text: "Kurang baik, lebih suka dengan orang yang sudah dikenal", score: 2 },
      { text: "Sulit berkomunikasi dengan orang baru", score: 1 }
    ]
  },
  {
    id: "q9",
    text: "Bagaimana kemampuanmu dalam mengorganisir dan merencanakan sesuatu?",
    category: "organizationManagement",
    options: [
      { text: "Sangat baik, saya suka membuat sistem dan perencanaan", score: 5 },
      { text: "Cukup baik, bisa mengatur jika diperlukan", score: 4 },
      { text: "Bisa, tapi lebih suka mengikuti sistem yang sudah ada", score: 3 },
      { text: "Kurang baik, sering kewalahan dengan perencanaan", score: 2 },
      { text: "Saya tidak suka mengorganisir atau merencanakan", score: 1 }
    ]
  },
  {
    id: "q10",
    text: "Bagaimana kemampuanmu dalam menyelesaikan masalah atau konflik?",
    category: "problemSolving",
    options: [
      { text: "Sangat baik, tenang dan analitis dalam mencari solusi", score: 5 },
      { text: "Cukup baik, bisa menyelesaikan dengan bantuan orang lain", score: 4 },
      { text: "Bisa, tapi butuh waktu dan pemikiran yang lama", score: 3 },
      { text: "Sulit, cenderung menghindari masalah", score: 2 },
      { text: "Saya sering bingung menghadapi masalah", score: 1 }
    ]
  },
  {
    id: "q11",
    text: "Seberapa mahir kamu dalam menggunakan teknologi dan perangkat digital?",
    category: "technicalSkill",
    options: [
      { text: "Sangat mahir, saya menguasai berbagai tools dan teknologi", score: 5 },
      { text: "Cukup mahir, cepat belajar teknologi baru", score: 4 },
      { text: "Bisa menggunakan untuk kebutuhan dasar", score: 3 },
      { text: "Kurang mahir, kadang butuh bantuan", score: 2 },
      { text: "Saya tidak terlalu tertarik dengan teknologi", score: 1 }
    ]
  },
  {
    id: "q12",
    text: "Seberapa baik kemampuanmu dalam berbahasa Inggris?",
    category: "bahasa",
    options: [
      { text: "Sangat baik, fasih berbicara dan menulis", score: 5 },
      { text: "Cukup baik, bisa berkomunikasi dengan lancar", score: 4 },
      { text: "Cukup, bisa memahami tapi kesulitan berbicara", score: 3 },
      { text: "Kurang, hanya bisa beberapa kata dasar", score: 2 },
      { text: "Saya tidak bisa berbahasa Inggris", score: 1 }
    ]
  },

  // ============================================================
  // LAYER 3: TUJUAN & EKSPEKTASI (5 Pertanyaan)
  // ============================================================

  {
    id: "q13",
    text: "Apa tujuan utamamu bergabung dengan organisasi kampus?",
    category: "networking",
    options: [
      { text: "Mengembangkan diri dan mendapatkan pengalaman berharga", score: 5 },
      { text: "Memperluas relasi dan membangun koneksi", score: 4 },
      { text: "Menambah kegiatan dan mengisi waktu luang", score: 3 },
      { text: "Mencari teman dan kehidupan sosial yang lebih baik", score: 2 },
      { text: "Hanya untuk memenuhi syarat atau formalitas", score: 1 }
    ]
  },
  {
    id: "q14",
    text: "Skill apa yang paling ingin kamu kembangkan di organisasi?",
    category: "leadership",
    options: [
      { text: "Kepemimpinan dan manajemen organisasi", score: 5 },
      { text: "Public speaking dan komunikasi", score: 4 },
      { text: "Kreativitas dan inovasi", score: 3 },
      { text: "Kerja tim dan kolaborasi", score: 2 },
      { text: "Tidak ada yang spesifik, semua bisa dipelajari", score: 1 }
    ]
  },
  {
    id: "q15",
    text: "Apa yang paling penting bagimu dalam sebuah organisasi?",
    category: "social",
    options: [
      { text: "Memberi dampak positif bagi masyarakat dan sekitar", score: 5 },
      { text: "Kekeluargaan dan kebersamaan antar anggota", score: 4 },
      { text: "Prestasi dan pencapaian organisasi", score: 3 },
      { text: "Kegiatan yang menyenangkan dan tidak membosankan", score: 2 },
      { text: "Tidak terlalu peduli, yang penting ikut", score: 1 }
    ]
  },
  {
    id: "q16",
    text: "Bagaimana pandanganmu tentang bisnis dan kewirausahaan?",
    category: "entrepreneurship",
    options: [
      { text: "Sangat tertarik, saya ingin menjadi pengusaha sukses", score: 5 },
      { text: "Tertarik belajar dan mengembangkan ide bisnis", score: 4 },
      { text: "Menarik untuk diketahui, tapi belum serius", score: 3 },
      { text: "Kurang tertarik, lebih suka bekerja di perusahaan", score: 2 },
      { text: "Tidak tertarik sama sekali", score: 1 }
    ]
  },
  {
    id: "q17",
    text: "Apakah kamu tertarik untuk mengorganisir atau mengelola sebuah acara?",
    category: "eventManagement",
    options: [
      { text: "Sangat tertarik, saya suka mengatur acara dari awal sampai akhir", score: 5 },
      { text: "Tertarik, terutama di bagian tertentu", score: 4 },
      { text: "Bisa, tapi lebih suka membantu daripada memimpin", score: 3 },
      { text: "Kurang tertarik, lebih suka menjadi peserta", score: 2 },
      { text: "Tidak tertarik sama sekali", score: 1 }
    ]
  }
];