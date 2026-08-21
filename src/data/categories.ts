import { Category } from "@/types/ormawa";

// Tipe di-ketatkan jadi Record<Category, string> (bukan Record<string, string>)
// supaya TypeScript memaksa mapping ini selalu SELARAS dengan union Category:
// - kalau ada kategori baru ditambah ke Category tapi lupa dikasih nama tampilan
//   di sini, TypeScript akan error saat build.
// - kalau ada key di sini yang sudah tidak ada di union Category, TypeScript
//   juga akan error, jadi entry "nganggur" (typo, sisa refactor) ketauan langsung.
export const CATEGORIES: Record<Category, string> = {
  leadership: "Kepemimpinan",
  publicSpeaking: "Public Speaking",
  communication: "Komunikasi",
  teamwork: "Kerja Sama Tim",
  eventManagement: "Manajemen Acara",
  problemSolving: "Pemecahan Masalah",
  networking: "Jejaring & Relasi",
  contentCreation: "Pembuatan Konten",
  technicalSkill: "Keterampilan Teknis",
  creativity: "Kreativitas",
  organizationManagement: "Manajemen Organisasi",
  research: "Riset & Akademik",
  bahasa: "Bahasa Asing",
  physicalFitness: "Kebugaran & Keterampilan Fisik",
  design: "Desain & Multimedia",
  social: "Sosial & Pengabdian",
  entrepreneurship: "Kewirausahaan",
};