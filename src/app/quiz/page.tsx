"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Users,
  Award,
  Clock,
  Shield,
  CheckCircle,
  Zap,
  BookOpen,
  Target,
  Heart,
  Brain,
  Users as UsersIcon,
  Lightbulb,
  Star,
  ChevronRight,
} from "lucide-react";
import { quizTimeout } from "@/lib/quiz-timeout";

// =========================================================
// Theme Variables
// =========================================================

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

// =========================================================
// Features Data
// =========================================================

const features = [
  {
    icon: Target,
    title: "Temukan Minatmu",
    description:
      "Quiz interaktif yang membantu menemukan passion dan bakat terpendammu.",
  },
  {
    icon: UsersIcon,
    title: "Komunitas yang Tepat",
    description:
      "Terhubung dengan ORMAWA yang sesuai dengan kepribadian dan minatmu.",
  },
  {
    icon: Lightbulb,
    title: "Pengembangan Diri",
    description:
      "Kembangkan potensi diri melalui kegiatan organisasi yang tepat.",
  },
  {
    icon: Star,
    title: "Rekomendasi Personal",
    description:
      "Dapatkan rekomendasi ORMAWA yang dipersonalisasi berdasarkan jawabanmu.",
  },
];

// =========================================================
// Stats Data
// =========================================================

const stats = [
  { number: "10+", label: "ORMAWA Tersedia" },
  { number: "500+", label: "Mahasiswa Terdaftar" },
  { number: "95%", label: "Tingkat Kepuasan" },
  { number: "3 Hari", label: "Akses Quiz" },
];

// =========================================================
// Main Component
// =========================================================

export default function HomePage() {
  const reduceMotion = useReducedMotion();

  // =========================================================
  // Check for expired quiz data
  // =========================================================

  useEffect(() => {
    // Cek jika ada quiz yang berjalan tapi sudah expired
    const { allowed } = quizTimeout.canAccessQuiz();

    if (!allowed) {
      // Bersihkan data yang expired
      quizTimeout.clearQuizData();
    }

    // Cek jika ada data quiz yang sedang berjalan
    const savedParticipant = sessionStorage.getItem("quizParticipant");
    if (savedParticipant) {
      try {
        const parsed = JSON.parse(savedParticipant);
        if (parsed.nama && parsed.nim && parsed.jurusan) {
          // Data peserta masih ada, tapi pastikan masih dalam batas waktu
          const { allowed: canAccess } = quizTimeout.canAccessQuiz();
          if (!canAccess) {
            // Jika sudah expired, hapus semua data
            sessionStorage.removeItem("quizParticipant");
            sessionStorage.removeItem("quizAnswers");
            quizTimeout.clearQuizData();
          }
        }
      } catch {
        // Jika error parsing, hapus data
        sessionStorage.removeItem("quizParticipant");
        sessionStorage.removeItem("quizAnswers");
        quizTimeout.clearQuizData();
      }
    }
  }, []);

  // =========================================================
  // Check if user has ongoing quiz
  // =========================================================

  const hasOngoingQuiz = () => {
    const participant = sessionStorage.getItem("quizParticipant");
    if (!participant) return false;

    const { allowed } = quizTimeout.canAccessQuiz();
    if (!allowed) return false;

    try {
      const parsed = JSON.parse(participant);
      return !!(parsed.nama && parsed.nim && parsed.jurusan);
    } catch {
      return false;
    }
  };

  const isQuizOngoing = hasOngoingQuiz();

  return (
    <main
      style={themeVars}
      className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-[family-name:var(--font-body)] antialiased"
    >
      {/* =========================================================
          HERO SECTION
          ========================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[var(--orange)]/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-t from-[var(--navy)]/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--orange)]/10 border border-[var(--orange)]/20">
                <Sparkles className="w-4 h-4 text-[var(--orange)]" />
                <span className="text-sm font-semibold text-[var(--orange-dark)]">
                  Temukan ORMAWA Impianmu
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]">
                Temukan{" "}
                <span className="text-[var(--orange)]">ORMAWA</span> yang
                Paling Cocok untukmu
              </h1>

              {/* Description */}
              <p className="text-lg text-[var(--ink-soft)] max-w-lg leading-relaxed">
                Ikuti quiz interaktif kami dan dapatkan rekomendasi organisasi
                mahasiswa yang sesuai dengan minat, bakat, dan kepribadianmu.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {isQuizOngoing ? (
                  <Link
                    href="/quiz"
                    className="inline-flex items-center gap-2 bg-[var(--orange)] text-white font-bold py-4 px-8 rounded-xl hover:bg-[var(--orange-dark)] transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[var(--orange)]/20"
                  >
                    Lanjutkan Quiz
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link
                    href="/quiz"
                    className="inline-flex items-center gap-2 bg-[var(--orange)] text-white font-bold py-4 px-8 rounded-xl hover:bg-[var(--orange-dark)] transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[var(--orange)]/20"
                  >
                    Mulai Quiz Sekarang
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}

                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 text-[var(--ink-soft)] font-semibold py-4 px-6 rounded-xl hover:text-[var(--orange)] transition-colors"
                >
                  Pelajari Lebih Lanjut
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-6 border-t border-[var(--line)]">
                {stats.map((stat, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
                      {stat.number}
                    </p>
                    <p className="text-sm text-[var(--ink-soft)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Illustration */}
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative">
                <div className="w-[400px] h-[400px] bg-gradient-to-br from-[var(--orange)]/10 to-[var(--navy)]/5 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-6 p-8">
                    <div className="bg-[var(--paper)] p-6 rounded-2xl shadow-lg border border-[var(--line)]">
                      <Users className="w-8 h-8 text-[var(--orange)]" />
                      <p className="text-sm font-bold mt-2">Komunitas</p>
                    </div>
                    <div className="bg-[var(--paper)] p-6 rounded-2xl shadow-lg border border-[var(--line)] transform translate-y-8">
                      <Award className="w-8 h-8 text-[var(--navy)]" />
                      <p className="text-sm font-bold mt-2">Pengembangan</p>
                    </div>
                    <div className="bg-[var(--paper)] p-6 rounded-2xl shadow-lg border border-[var(--line)] transform -translate-y-4">
                      <Target className="w-8 h-8 text-[var(--orange)]" />
                      <p className="text-sm font-bold mt-2">Minat</p>
                    </div>
                    <div className="bg-[var(--paper)] p-6 rounded-2xl shadow-lg border border-[var(--line)]">
                      <Heart className="w-8 h-8 text-[var(--navy)]" />
                      <p className="text-sm font-bold mt-2">Passion</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURES SECTION
          ========================================================= */}
      <section id="features" className="py-20 bg-[var(--paper)] border-y border-[var(--line)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-sm font-bold text-[var(--orange)] uppercase tracking-wider mb-4">
              Fitur Unggulan
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
              Mengapa Harus Ikut Quiz Ini?
            </h2>
            <p className="text-[var(--ink-soft)] text-lg">
              Temukan alasan mengapa ribuan mahasiswa telah menggunakan layanan
              kami untuk menemukan ORMAWA yang tepat.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--line)] hover:border-[var(--orange)] transition-all hover:shadow-lg hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--orange)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--orange)]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[var(--orange)]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
          ========================================================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-sm font-bold text-[var(--orange)] uppercase tracking-wider mb-4">
              Cara Kerja
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
              Mudah, Cepat, dan Efektif
            </h2>
            <p className="text-[var(--ink-soft)] text-lg">
              Ikuti 3 langkah sederhana untuk menemukan ORMAWA yang paling cocok
              untukmu.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[var(--orange)]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--orange)]">
                    1
                  </span>
                </div>
                <div className="hidden md:block absolute top-10 left-[calc(100%-20px)] w-[calc(100%-80px)] h-[2px] bg-[var(--line)]" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">
                Isi Data Diri
              </h3>
              <p className="text-[var(--ink-soft)] text-sm leading-relaxed">
                Masukkan nama, NIM, dan jurusanmu untuk memulai quiz
                personalisasi.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[var(--orange)]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--orange)]">
                    2
                  </span>
                </div>
                <div className="hidden md:block absolute top-10 left-[calc(100%-20px)] w-[calc(100%-80px)] h-[2px] bg-[var(--line)]" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">
                Jawab Pertanyaan
              </h3>
              <p className="text-[var(--ink-soft)] text-sm leading-relaxed">
                Jawab serangkaian pertanyaan tentang minat, bakat, dan
                kepribadianmu.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[var(--orange)]/10 flex items-center justify-center mx-auto mb-4">
                <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--orange)]">
                  3
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">
                Dapatkan Rekomendasi
              </h3>
              <p className="text-[var(--ink-soft)] text-sm leading-relaxed">
                Terima daftar ORMAWA yang paling sesuai dengan profil dan
                preferensimu.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA SECTION
          ========================================================= */}
      <section className="py-20 bg-[var(--navy)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, scale: 0.95 }}
            whileInView={reduceMotion ? {} : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white">
              Siap Menemukan ORMAWA Impianmu?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Jangan tunggu lagi! Mulai quiz sekarang dan temukan organisasi
              mahasiswa yang akan membantumu berkembang.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {isQuizOngoing ? (
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 bg-[var(--orange)] text-white font-bold py-4 px-8 rounded-xl hover:bg-[var(--orange-dark)] transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[var(--orange)]/30"
                >
                  Lanjutkan Quiz
                  <ChevronRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 bg-[var(--orange)] text-white font-bold py-4 px-8 rounded-xl hover:bg-[var(--orange-dark)] transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[var(--orange)]/30"
                >
                  Mulai Quiz Sekarang
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}

              <Link
                href="#features"
                className="inline-flex items-center gap-2 text-white/80 font-semibold py-4 px-6 rounded-xl hover:text-white transition-colors"
              >
                Pelajari Lebih Lanjut
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Small print */}
            <p className="text-white/40 text-sm mt-4 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Quiz hanya tersedia selama 3 hari setelah dimulai
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
          ========================================================= */}
      <footer className="bg-[var(--bg)] border-t border-[var(--line)] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--orange)]" />
              <span className="font-[family-name:var(--font-display)] font-bold">
                Gopo Quiz
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-[var(--ink-soft)]">
              <Link href="/" className="hover:text-[var(--orange)] transition-colors">
                Beranda
              </Link>
              <Link href="/quiz" className="hover:text-[var(--orange)] transition-colors">
                Quiz
              </Link>
              <span>© 2024 Gopo Quiz</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}