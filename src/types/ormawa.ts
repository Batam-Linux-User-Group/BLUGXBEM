export type Category =
  | "leadership"
  | "publicSpeaking"
  | "teamwork"
  | "technology"
  | "business"
  | "design"
  | "social"
  | "sports"
  | "arts"
  | "entrepreneurship";

export type OrmawaType = "BEM" | "DPM" | "LPM" | "UKM" | "HMJ" | "OTHER";

export interface Ormawa {
  id: string;
  name: string;
  shortName: string;
  type: OrmawaType;
  tagline?: string;
  logo?: string;
  description: string;
  focusAreas: string[];
  uniqueCharacteristics: string[];
  flagshipPrograms: string[];
  departments?: string[];
  skills: Partial<Record<Category, number>>;
  suitableFor: string[];
  achievements?: string[];
  googleSite?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  linktree?: string;
  contactPerson?: string;
  photos?: string[];
  video?: string;
}