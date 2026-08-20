export type Category =
  | "leadership"
  | "publicSpeaking"
  | "communication"
  | "teamwork"
  | "eventManagement"       // Baru: Sangat relevan untuk BEM, HMJ, IMMPB
  | "problemSolving"        // Baru: Relevan untuk DPM, MAPALA, IMMPB
  | "networking"            // Baru: Relevan untuk BEM, HMTI, ENERGI
  | "contentCreation"       // Baru: Relevan untuk LPM, REKAM, KUAS
  | "technicalSkill"        // Baru: Lebih spesifik dari 'technology' untuk HME, HMM, BLUG
  | "technology"
  | "creativity"            // Baru: Relevan untuk KUAS, REKAM, ENERGI
  | "organizationManagement"// Baru: Relevan untuk BEM, HMTI, HME
  | "research"              // Baru: Relevan untuk LPM, HMMB, BLUG
  | "bahasa"                // Baru: Relevan untuk PEC, BLUG
  | "physicalFitness"       // Baru: Relevan untuk KOP, MAPALA
  | "sports"
  | "design"
  | "social"
  | "arts"
  | "entrepreneurship"
  | "business";

export type OrmawaType = "Eksekutif" | "Legislatif" | "LPM" | "UKM" | "HMJ";

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