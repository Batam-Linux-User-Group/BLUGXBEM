export type Category =
  | "leadership"
  | "publicSpeaking"
  | "communication"
  | "teamwork"
  | "eventManagement"
  | "problemSolving"
  | "networking"
  | "contentCreation"
  | "technicalSkill"
  | "creativity"
  | "organizationManagement"
  | "research"
  | "bahasa"
  | "physicalFitness"
  | "design"
  | "social"
  | "entrepreneurship";

export type OrmawaType = "Eksekutif" | "Legislatif" | "UKM" | "HMJ";

export interface Ormawa {
  id: string;
  name: string;
  shortName: string;
  type: OrmawaType;

  // Identitas & Branding
  logo?: string;
  tagline?: string;
  description: string;

  // Inti Organisasi
  focusAreas: string[];
  uniqueCharacteristics: string[];
  flagshipPrograms: string[];
  departments?: string[];

  // Penilaian & Target
  skills: Partial<Record<Category, number>>;
  suitableFor: string[];
  achievements?: string[];

  // Media & Dokumentasi (Disesuaikan dengan Form)
  gallery?: string[];   // Untuk 3-5 foto kegiatan
  photos?: string[];    // Opsional, jika ada data lama
  video?: string;       // Link video profil

  // Kontak & Sosial Media
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  linktree?: string;
  googleSite?: string;  // Untuk website resmi atau platform lain
  contactPerson?: string;
}