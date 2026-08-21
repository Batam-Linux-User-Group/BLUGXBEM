"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, notFound } from "next/navigation";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Target,
  Award,
  Phone,
  Camera,
  Globe,
  Sparkles,
  ImageIcon,
  X,
  Trophy,
  Users,
  Music2,
  PlayCircle,
  Link2,
  Glasses,
  Eye,
  Search,
} from "lucide-react";

import { ORMAWA_LIST } from "@/data/ormawa";

// Helper untuk mengonversi link Google Drive ke Direct Image URL
function getGoogleDriveImageUrl(url: string): string {
  if (url.includes("drive.google.com")) {
    const match = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }
  return url;
}

// Helper untuk menormalkan nomor WA ke format internasional.
// Data kontak di ORMAWA_LIST tidak konsisten: sebagian pakai "+62...",
// sebagian pakai awalan "0..." — kalau awalan "0" langsung di-strip jadi
// digit doang, link wa.me akan salah format dan tidak terbuka dengan benar.
function getWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }
  return digits;
}

const themeVars = {
  "--bg": "#FAF9F4",
  "--ink": "#15140F",
  "--ink-soft": "#6B6B5F",
  "--paper": "#FFFFFF",
  "--line": "#E7E4D9",
  "--orange": "#E4572E",
  "--orange-dark": "#C43F1B",
  "--navy": "#12132B",
  "--font-display": "var(--font-display, 'Space Grotesk'), sans-serif",
  "--font-body": "var(--font-body, 'Manrope'), sans-serif",
} as React.CSSProperties;

export default function OrmawaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [logoError, setLogoError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const ormawa = ORMAWA_LIST.find((o) => o.id === params.id);

  // Lock body scroll, allow Esc to close, pindahkan fokus ke tombol tutup saat
  // lightbox terbuka, dan kembalikan fokus ke thumbnail yang tadi diklik saat ditutup.
  useEffect(() => {
    if (!selectedImage) return;

    lastFocusedRef.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      lastFocusedRef.current?.focus();
    };
  }, [selectedImage]);

  if (!ormawa) {
    notFound();
  }

  const hasFocusAreas = !!ormawa.focusAreas?.length;
  const hasDepartments = !!ormawa.departments?.length;
  const hasContact = !!(
    ormawa.contactPerson ||
    ormawa.instagram ||
    ormawa.tiktok ||
    ormawa.youtube ||
    ormawa.googleSite ||
    ormawa.linktree
  );
  const hasPrograms = !!ormawa.flagshipPrograms?.length;
  const hasAchievements = !!ormawa.achievements?.length;
  const hasVideo = !!ormawa.video;

  // Fallback: kalau "gallery" kosong tapi ada data lama di "photos", tetap tampilkan.
  const galleryImages = ormawa.gallery?.length ? ormawa.gallery : ormawa.photos;
  const hasGallery = !!galleryImages?.length;

  return (
    <main
      style={themeVars}
      className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-[family-name:var(--font-body)] antialiased pb-16"
    >
      {/* Header Navigasi */}
      <div className="sticky top-0 z-40 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--line)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold truncate">
            Detail Organisasi
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* 1. Hero Section */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--paper)] rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[var(--line)] shadow-sm"
        >
          <div className="flex flex-col items-center text-center">
            {/* Logo Besar di Tengah */}
            <div className="shrink-0 p-2 bg-[var(--bg)] rounded-3xl border-2 border-[var(--line)] w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center overflow-hidden shadow-lg mb-6">
              {ormawa.logo && !logoError ? (
                <Image
                  src={ormawa.logo}
                  alt={ormawa.name}
                  width={160}
                  height={160}
                  className="rounded-2xl object-contain p-3 bg-white w-full h-full"
                  onError={() => setLogoError(true)}
                  priority
                />
              ) : (
                <div className="font-[family-name:var(--font-display)] font-bold text-4xl sm:text-5xl text-[var(--orange)] text-center leading-none">
                  {ormawa.shortName}
                </div>
              )}
            </div>

            {/* Konten Teks di Tengah */}
            <div className="flex-1 max-w-2xl">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[var(--orange)]/10 text-[var(--orange-dark)] mb-4">
                {ormawa.type}
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ink)] mb-3 leading-tight">
                {ormawa.name}
              </h1>
              {ormawa.tagline && (
                <p className="text-base sm:text-lg text-[var(--orange)] font-medium italic mb-5">
                  &ldquo;{ormawa.tagline}&rdquo;
                </p>
              )}
              <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed">
                {ormawa.description}
              </p>

              {hasVideo && (
                <a
                  href={ormawa.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-[var(--orange)] hover:text-[var(--orange-dark)] transition-colors"
                >
                  <PlayCircle className="w-5 h-5" />
                  Tonton Video Profil
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Prestasi — ditaruh menonjol tepat di bawah hero sebagai social proof */}
        {hasAchievements && (
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-[var(--orange)]/5 rounded-2xl p-5 sm:p-6 border border-[var(--orange)]/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-[var(--orange)]" />
              <h3 className="font-[family-name:var(--font-display)] font-bold text-base text-[var(--ink)]">
                Prestasi
              </h3>
            </div>
            <ul className="space-y-2">
              {ormawa.achievements?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[var(--ink-soft)]">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Layout Grid: Mobile (Stack), Desktop (Sidebar + Main Content) */}
        <div className="grid md:grid-cols-12 gap-6">
          {/* 2. Sidebar (Fokus, Departemen & Kontak) - Order 2 di Mobile, Order 1 di Desktop */}
          <div className="md:col-span-4 space-y-6 order-2 md:order-1">
            {/* Fokus Utama */}
            {hasFocusAreas && (
              <motion.div
                initial={reduceMotion ? {} : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[var(--paper)] rounded-2xl p-5 sm:p-6 border border-[var(--line)]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-[var(--orange)]" />
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-base">
                    Fokus Utama
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ormawa.focusAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 bg-[var(--bg)] text-[var(--ink-soft)] rounded-lg border border-[var(--line)] font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Departemen / Divisi */}
            {hasDepartments && (
              <motion.div
                initial={reduceMotion ? {} : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-[var(--paper)] rounded-2xl p-5 sm:p-6 border border-[var(--line)]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[var(--orange)]" />
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-base">
                    Departemen
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ormawa.departments?.map((dept, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 bg-[var(--bg)] text-[var(--ink-soft)] rounded-lg border border-[var(--line)] font-medium"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Kontak & Sosial Media */}
            {hasContact && (
              <motion.div
                initial={reduceMotion ? {} : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[var(--paper)] rounded-2xl p-5 sm:p-6 border border-[var(--line)]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="w-5 h-5 text-[var(--orange)]" />
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-base">
                    Hubungi Kami
                  </h3>
                </div>
                <div className="space-y-4">
                  {ormawa.contactPerson && (
                    <a
                      href={`https://wa.me/${getWhatsAppNumber(ormawa.contactPerson)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[var(--ink-soft)] hover:text-[var(--orange)] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center group-hover:border-[var(--orange)] group-hover:bg-[var(--orange)]/5 transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{ormawa.contactPerson}</span>
                    </a>
                  )}
                  {ormawa.instagram && (
                    <a
                      href={`https://instagram.com/${ormawa.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[var(--ink-soft)] hover:text-pink-600 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center group-hover:border-pink-500 group-hover:bg-pink-50 transition-colors">
                        <Camera className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{ormawa.instagram}</span>
                    </a>
                  )}
                  {ormawa.tiktok && (
                    <a
                      href={`https://tiktok.com/${ormawa.tiktok}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center group-hover:border-[var(--ink)] group-hover:bg-[var(--ink)]/5 transition-colors">
                        <Music2 className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{ormawa.tiktok}</span>
                    </a>
                  )}
                  {ormawa.youtube && (
                    <a
                      href={
                        ormawa.youtube.startsWith("http")
                          ? ormawa.youtube
                          : `https://youtube.com/${ormawa.youtube}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[var(--ink-soft)] hover:text-red-600 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center group-hover:border-red-500 group-hover:bg-red-50 transition-colors">
                        <PlayCircle className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{ormawa.youtube}</span>
                    </a>
                  )}
                  {ormawa.googleSite && (
                    <a
                      href={ormawa.googleSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[var(--ink-soft)] hover:text-blue-600 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-50 transition-colors">
                        <Globe className="w-4 h-4" />
                      </div>
                      <span className="font-medium">Website Resmi</span>
                    </a>
                  )}
                  {ormawa.linktree && (
                    <a
                      href={ormawa.linktree}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[var(--ink-soft)] hover:text-emerald-600 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-50 transition-colors">
                        <Link2 className="w-4 h-4" />
                      </div>
                      <span className="font-medium">Linktree</span>
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* 3. Main Content (Proker, Galeri, CTA) - Order 1 di Mobile, Order 2 di Desktop */}
          <div className="md:col-span-8 space-y-6 order-1 md:order-2">
            {/* Program Kerja */}
            {hasPrograms && (
              <motion.div
                initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-[var(--paper)] rounded-2xl p-5 sm:p-6 border border-[var(--line)]"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Award className="w-5 h-5 text-[var(--orange)]" />
                  <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold">
                    Program Kerja Unggulan
                  </h3>
                </div>
                <div className="space-y-3">
                  {ormawa.flagshipPrograms.map((proker, idx) => {
                    const [title, ...descParts] = proker.split(" - ");
                    const desc = descParts.join(" - ");

                    return (
                      <div
                        key={idx}
                        className="flex gap-4 p-4 rounded-xl bg-[var(--bg)]/40 border border-[var(--line)] hover:border-[var(--orange)]/30 hover:bg-[var(--orange)]/5 transition-all duration-200"
                      >
                        <div className="shrink-0 w-8 h-8 rounded-full bg-[var(--orange)] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[var(--ink)] mb-1 text-sm sm:text-base">
                            {title}
                          </h4>
                          {desc && (
                            <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
                              {desc}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Galeri Kegiatan */}
            {hasGallery && (
              <motion.div
                initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[var(--paper)] rounded-2xl p-5 sm:p-6 border border-[var(--line)]"
              >
                <div className="flex items-center gap-2 mb-5">
                  <ImageIcon className="w-5 h-5 text-[var(--orange)]" />
                  <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold">
                    Galeri Kegiatan
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {galleryImages?.map((imgSrc, idx) => {
                    const parsedSrc = getGoogleDriveImageUrl(imgSrc);

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImage(parsedSrc)}
                        aria-label={`Perbesar foto galeri ${idx + 1}`}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--bg)] border border-[var(--line)] cursor-pointer group shadow-sm text-left"
                      >
                        <Image
                          src={parsedSrc}
                          alt={`Galeri ${ormawa.shortName} ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Call to Action */}
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-[var(--navy)] rounded-2xl p-6 sm:p-8 text-center text-white relative overflow-hidden shadow-lg"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--orange)]/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--orange)]/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

              <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold mb-3 relative z-10">
                Tertarik Bergabung?
              </h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto relative z-10 text-sm sm:text-base">
                Ikuti kuis singkat untuk melihat seberapa besar kecocokan dirimu dengan nilai dan
                kegiatan {ormawa.shortName}.
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 bg-[var(--orange)] hover:bg-[var(--orange-dark)] text-white font-bold py-3 px-6 sm:px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] relative z-10 shadow-md shadow-[var(--orange)]/20"
              >
                <Search className="w-5 h-5" />
                Mulai Kuis Kecocokan
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal / Preview Gambar */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Preview foto galeri"
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat klik area gambar
            >
              <button
                ref={closeButtonRef}
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 sm:top-2 sm:-right-12 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Tutup"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative w-full h-full min-h-[300px]">
                <Image
                  src={selectedImage}
                  alt="Galeri Preview"
                  fill
                  className="object-contain rounded-lg"
                  sizes="90vw"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}