import { Category } from "@/types/ormawa";

export const CATEGORIES: Record<Category, string> = {
  leadership: "Kepemimpinan",
  publicSpeaking: "Public Speaking",
  teamwork: "Kerja Sama Tim",
  technology: "Teknologi",
  business: "Bisnis",
  design: "Desain",
  social: "Sosial",
  sports: "Olahraga",
  arts: "Seni",
  entrepreneurship: "Kewirausahaan",
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  leadership: "Kemampuan memimpin, mengambil keputusan, dan menginspirasi orang lain",
  publicSpeaking: "Kemampuan berkomunikasi di depan umum dan menyampaikan ide dengan jelas",
  teamwork: "Kemampuan bekerja sama, berkolaborasi, dan berkontribusi dalam tim",
  technology: "Ketertarikan dan kemampuan di bidang teknologi, programming, dan digital",
  business: "Ketertarikan pada bisnis, kewirausahaan, dan pengembangan usaha",
  design: "Kemampuan kreatif di bidang desain grafis, UI/UX, dan visual",
  social: "Kepedulian sosial, pengabdian masyarakat, dan kegiatan kemanusiaan",
  sports: "Ketertarikan pada olahraga, aktivitas fisik, dan kompetisi",
  arts: "Ketertarikan pada seni, musik, tari, teater, dan kreativitas",
  entrepreneurship: "Jiwa kewirausahaan, inovasi, dan kemampuan melihat peluang bisnis",
};