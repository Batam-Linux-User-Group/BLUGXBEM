import { Question } from "@/types/quiz";

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "Bagaimana kamu melihat peranmu dalam sebuah kelompok?",
    category: "leadership",
    options: [
      { text: "Saya suka memimpin dan mengambil keputusan.", score: 5 },
      { text: "Saya lebih suka mendukung pemimpin dan menjalankan tugas.", score: 3 },
      { text: "Saya suka bekerja sendiri daripada dalam kelompok.", score: 1 }
    ]
  },
  {
    id: "q2",
    text: "Seberapa nyaman kamu berbicara di depan umum?",
    category: "publicSpeaking",
    options: [
      { text: "Sangat nyaman, saya bahkan menikmatinya.", score: 5 },
      { text: "Cukup nyaman, tapi masih sedikit gugup.", score: 3 },
      { text: "Tidak nyaman, saya lebih suka menghindari sorotan.", score: 1 }
    ]
  },
  {
    id: "q3",
    text: "Apa yang paling menarik minatmu untuk dipelajari?",
    category: "technology",
    options: [
      { text: "Coding, robotik, atau sistem informasi.", score: 5 },
      { text: "Desain grafis atau UI/UX.", score: 3 },
      { text: "Manajemen acara atau kewirausahaan.", score: 2 }
    ]
  },
  {
    id: "q4",
    text: "Bagaimana kamu menangani konflik dalam tim?",
    category: "teamwork",
    options: [
      { text: "Saya mencoba menjadi penengah dan mencari solusi win-win.", score: 5 },
      { text: "Saya mengikuti keputusan mayoritas agar cepat selesai.", score: 3 },
      { text: "Saya cenderung menghindar dari konflik.", score: 1 }
    ]
  }
];