"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Target,
  Users,
  TrendingUp,
  Award,
  Calendar,
  MessageCircle,
  ExternalLink,
  Camera,
  Play,
  ChevronRight,
  Zap,
  Heart,
  BookOpen,
  Mic2,
  Code,
  Palette,
  Briefcase,
  Dumbbell,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/**
 * FONT SETUP (add once in app/layout.tsx, not in this file):
 *
 * import { Space_Grotesk, Manrope } from "next/font/google";
 * const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
 * const body = Manrope({ subsets: ["latin"], variable: "--font-body" });
 * // then on <html className={`${display.variable} ${body.variable}`}>
 *
 * Falls back to system sans if not wired up.
 */

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
      };

  const ormawaList = [
    { name: "BEM", logo: "/logos/BEM.png", no: "01" },
    { name: "DPM", logo: "/logos/DPM.png", no: "02" },
    { name: "HMMB", logo: "/logos/HMMB.png", no: "03" },
    { name: "HME", logo: "/logos/HME.png", no: "04" },
    { name: "HMTI", logo: "/logos/HMTI.png", no: "05" },
    { name: "HMM", logo: "/logos/HMM.png", no: "06" },
    { name: "PEC", logo: "/logos/PEC.png", no: "07" },
    { name: "LPM", logo: "/logos/LPM.png", no: "08" },
    { name: "ENERGI", logo: "/logos/ENERGI.png", no: "09" },
    { name: "PD-Elshaddai", logo: "/logos/EL-SHADAI.png", no: "10" },
    { name: "IMMPB", logo: "/logos/IMMPB.png", no: "11" },
    { name: "BLUG", logo: "/logos/BLUG.png", no: "12" },
    { name: "REKAM", logo: "/logos/REKAM.png", no: "13" },
    { name: "KUAS", logo: "/logos/KUAS.png", no: "14" },
    { name: "MAPALA", logo: "/logos/MAPALA.png", no: "15" },
    { name: "KOP", logo: "/logos/KOP.png", no: "16" },
  ];

  const features = [
    {
      icon: Target,
      title: "Find Your Match",
      subtitle: "Temukan Kecocokanmu",
      description:
        "Ikuti quiz interaktif untuk menemukan ORMAWA yang paling sesuai dengan karakter dan minatmu.",
      link: "/quiz",
    },
    {
      icon: Users,
      title: "Explore ORMAWA",
      subtitle: "Jelajahi Organisasi",
      description:
        "Kenali 16 organisasi mahasiswa di Polibatam beserta profil, kegiatan, dan pencapaian mereka.",
      link: "/explore",
    },
    {
      icon: Calendar,
      title: "Program & Kegiatan",
      subtitle: "Kegiatan Unggulan",
      description:
        "Lihat berbagai kegiatan menarik, program kerja unggulan, dan pengalaman berharga.",
      link: "/explore",
    },
    {
      icon: MessageCircle,
      title: "Connect With ORMAWA",
      subtitle: "Terhubung Langsung",
      description:
        "Akses media sosial dan kontak resmi setiap ORMAWA untuk informasi open recruitment.",
      link: "/explore",
    },
  ];

  const categories = [
    { icon: Users, name: "Kepemimpinan" },
    { icon: BookOpen, name: "Akademik" },
    { icon: Code, name: "Teknologi" },
    { icon: Mic2, name: "Komunikasi" },
    { icon: Palette, name: "Seni" },
    { icon: Briefcase, name: "Bisnis" },
    { icon: Heart, name: "Sosial" },
    { icon: Dumbbell, name: "Olahraga" },
  ];

  const stats = [
    { value: "16", label: "ORMAWA Aktif", icon: Users },
    { value: "50+", label: "Program Kerja", icon: Calendar },
    { value: "1000+", label: "Mahasiswa Terlibat", icon: Award },
    { value: "100%", label: "Rekomendasi Personal", icon: Target },
  ];

  const howItWorks = [
    {
      step: "01",
      icon: Target,
      title: "Jawab Quiz",
      desc: "Isi quiz interaktif singkat untuk menganalisis minat, bakat, dan karakter kepemimpinanmu.",
    },
    {
      step: "02",
      icon: TrendingUp,
      title: "Lihat Persentase",
      desc: "Dapatkan kalkulasi persentase kecocokanmu secara real-time dengan seluruh ORMAWA.",
    },
    {
      step: "03",
      icon: Users,
      title: "Jelajahi & Bergabung",
      desc: "Pelajari profil lengkap ORMAWA yang cocok dan langsung terhubung dengan pengurus.",
    },
  ];

  const navLinks = [
    { href: "#explore", label: "Explore" },
    { href: "#how-it-works", label: "Cara Kerja" },
    { href: "#categories", label: "Bidang" },
  ];

  return (
    <main
      style={
        {
          "--bg": "#FAF9F4",
          "--ink": "#15140F",
          "--ink-soft": "#6B6B5F",
          "--paper": "#FFFFFF",
          "--line": "#E7E4D9",
          "--orange": "#E4572E",
          "--orange-dark": "#C43F1B",
          "--navy": "#12132B",
          "--blue": "#3B6EF6",
          "--yellow": "#F5B942",
          "--font-display": "var(--font-display, 'Space Grotesk'), sans-serif",
          "--font-body": "var(--font-body, 'Manrope'), sans-serif",
        } as React.CSSProperties
      }
      className="min-h-screen bg-[var(--bg)] text-[var(--ink)] selection:bg-[var(--orange)] selection:text-white font-[family-name:var(--font-body)] antialiased"
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 bg-[var(--paper)] border border-[var(--line)] rounded-xl px-2 py-1.5">
                <Image src="/logos/BEM.png" alt="Logo BEM" width={30} height={30} className="w-7 h-7 object-contain" priority />
                <span className="text-[var(--ink-soft)] font-bold text-xs">×</span>
                <Image src="/logos/BLUG.png" alt="Logo BLUG" width={30} height={30} className="w-7 h-7 object-contain" priority />
              </div>
              <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--ink)]">
                GOPO <span className="text-[var(--orange)]">2026</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[var(--ink-soft)]">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-[var(--orange)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] focus-visible:ring-offset-2 rounded-md"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link href="/quiz" className="hidden sm:block">
                <button className="bg-[var(--orange)] hover:bg-[var(--orange-dark)] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] focus-visible:ring-offset-2">
                  Mulai Quiz
                </button>
              </Link>
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-[var(--line)] bg-[var(--bg)]"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--orange)] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <Link href="/quiz" onClick={() => setMobileMenuOpen(false)} className="sm:hidden mt-2">
                  <button className="w-full bg-[var(--orange)] hover:bg-[var(--orange-dark)] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
                    Mulai Quiz
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-14 pb-24 lg:pt-20 lg:pb-32">
        {/* engineering-grid backdrop, subtle */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-14 items-start">
            {/* Left: headline */}
            <motion.div
              {...(reduceMotion ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } })}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 relative"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] text-xs font-bold tracking-[0.14em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
                GOPO 2026 · Grand Opening Ormawa Polibatam
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.95] mb-7">
                KAMU
                <br />
                COCOKNYA
                <br />
                <span className="relative inline-block">
                  DI MANA?
                  <svg
                    aria-hidden
                    viewBox="0 0 300 20"
                    className="absolute left-0 -bottom-2 w-full h-4 text-[var(--orange)]"
                    preserveAspectRatio="none"
                  >
                    <path d="M2 14 Q 80 2, 150 10 T 298 8" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-[var(--ink-soft)] text-lg leading-relaxed mb-9 max-w-lg">
                16 ORMAWA, 1 kampus. Isi quiz singkat, dapatkan skor kecocokanmu ke tiap organisasi,
                lalu langsung terhubung dengan pengurusnya.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quiz">
                  <button className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[var(--orange)] text-white font-bold text-base shadow-[4px_4px_0_0_var(--navy)] hover:shadow-[2px_2px_0_0_var(--navy)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] focus-visible:ring-offset-2">
                    Mulai Quiz Sekarang
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/explore">
                  <button className="w-full sm:w-auto px-7 py-4 rounded-xl bg-transparent text-[var(--ink)] font-bold text-base border-2 border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-all flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] focus-visible:ring-offset-2">
                    Explore ORMAWA
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right: signature match-stamp */}
            <motion.div
              {...(reduceMotion ? {} : { initial: { opacity: 0, scale: 0.9, rotate: -8 }, animate: { opacity: 1, scale: 1, rotate: -6 } })}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center lg:justify-end lg:pt-4"
            >
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 shrink-0 -rotate-6">
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[4px_6px_0_var(--line)]">
                  <circle cx="100" cy="100" r="96" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" strokeDasharray="6 5" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="var(--line)" strokeWidth="1.5" />
                  {/* gauge arc */}
                  <path
                    d="M 40 130 A 70 70 0 1 1 160 130"
                    fill="none"
                    stroke="var(--line)"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 40 130 A 70 70 0 1 1 148 148"
                    fill="none"
                    stroke="var(--orange)"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  <text x="100" y="98" textAnchor="middle" className="font-[family-name:var(--font-display)]" fontSize="40" fontWeight="700" fill="var(--ink)">
                    92%
                  </text>
                  <text x="100" y="122" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="2" fill="var(--ink-soft)">
                    MATCH SCORE
                  </text>
                </svg>
                <div className="absolute -top-3 -right-3 bg-[var(--navy)] text-[var(--bg)] text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full rotate-6 shadow-sm">
                  CONTOH HASIL
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ORMAWA badge strip */}
      <section id="explore-strip" className="relative py-14 bg-[var(--paper)] border-y border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold">16 ORMAWA yang menantimu</h2>
            <Link href="/explore" className="text-sm font-bold text-[var(--orange)] hover:text-[var(--orange-dark)] flex items-center gap-1">
              Lihat semua <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {ormawaList.map((item, idx) => (
              <motion.div
                key={item.name}
                {...(reduceMotion ? {} : { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } })}
                transition={{ delay: idx * 0.02 }}
                className={`group relative bg-[var(--bg)] border border-dashed border-[var(--ink)]/25 hover:border-[var(--orange)] rounded-xl p-3 pt-5 flex flex-col items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                  idx % 2 === 0 ? "sm:-rotate-1" : "sm:rotate-1"
                }`}
              >
                <span className="absolute top-1.5 left-2 text-[9px] font-bold tracking-widest text-[var(--ink-soft)]">
                  №{item.no}
                </span>
                <div className="relative w-10 h-10 mb-2 flex items-center justify-center">
                  <Image
                    src={item.logo}
                    alt={`Logo ${item.name}`}
                    width={40}
                    height={40}
                    sizes="40px"
                    loading={idx < 8 ? "eager" : "lazy"}
                    className="object-contain max-h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.parentElement?.querySelector(".fallback-text") as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <span className="fallback-text hidden w-full h-full items-center justify-center text-sm font-bold text-[var(--ink-soft)]/40">
                    {item.name.substring(0, 2)}
                  </span>
                </div>
                <p className="font-bold text-[11px] text-[var(--ink)] group-hover:text-[var(--orange)] transition-colors text-center leading-tight">
                  {item.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="explore" className="relative py-24 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
              Empat langkah, satu jawaban
            </h2>
            <p className="text-[var(--ink-soft)] text-base leading-relaxed">
              Semua yang kamu butuhkan untuk memutuskan wadah berorganisasi terbaikmu, dalam satu tempat.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                {...fadeUp}
                transition={{ delay: index * 0.08 }}
                className="group relative bg-[var(--paper)] border border-[var(--line)] hover:border-[var(--orange)] rounded-2xl p-6 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center mb-6 group-hover:bg-[var(--orange)] group-hover:border-[var(--orange)] transition-colors">
                    <feature.icon className="w-5 h-5 text-[var(--ink)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold mb-1">{feature.title}</h3>
                  <p className="text-[11px] font-bold text-[var(--ink-soft)] mb-3 uppercase tracking-wider">
                    {feature.subtitle}
                  </p>
                  <p className="text-[var(--ink-soft)] text-sm leading-relaxed mb-6">{feature.description}</p>
                </div>

                <Link href={feature.link}>
                  <span className="inline-flex items-center gap-2 text-[var(--orange)] font-bold text-sm group-hover:gap-3 transition-all">
                    Pelajari <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-24 bg-[var(--navy)] text-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
              Cara kerjanya
            </h2>
            <p className="text-white/60 text-base leading-relaxed">
              Tiga tahap berurutan dari isi quiz sampai terhubung dengan ormawa pilihanmu.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                {...fadeUp}
                transition={{ delay: index * 0.1 }}
                className="relative bg-[var(--navy)] p-8"
              >
                <span className="font-[family-name:var(--font-display)] text-5xl font-bold text-white/10">
                  {item.step}
                </span>
                <item.icon className="w-7 h-7 text-[var(--orange)] mb-4 -mt-8" />
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="relative py-24 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
              Bidang pengembangan
            </h2>
            <p className="text-[var(--ink-soft)] text-base leading-relaxed">
              Setiap ormawa fokus pada pilar yang berbeda — kenali yang paling menarik buatmu.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                {...(reduceMotion ? {} : { initial: { opacity: 0, scale: 0.96 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true } })}
                transition={{ delay: index * 0.04 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-[var(--paper)] border border-[var(--line)] hover:border-[var(--orange)] transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center shrink-0">
                  <category.icon className="w-4 h-4 text-[var(--orange)]" />
                </div>
                <span className="font-bold text-[var(--ink)] text-sm">{category.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20 bg-[var(--paper)] border-y border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--line)]">
            {stats.map((stat, index) => (
              <motion.div key={index} {...fadeUp} transition={{ delay: index * 0.06 }} className="text-center px-4">
                <stat.icon className="w-5 h-5 text-[var(--orange)] mx-auto mb-3" />
                <div className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-[var(--ink-soft)] text-xs font-bold uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-[var(--bg)] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-10 md:p-16 text-center border-2 border-[var(--ink)] bg-[var(--orange)] text-white shadow-[8px_8px_0_0_var(--navy)]">
            <Zap className="w-10 h-10 mx-auto mb-6" />
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold mb-4">
              Siap menemukan ORMAWA impianmu?
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              Mulai eksplorasi sekarang dan jadilah bagian dari dinamika kampus Polibatam.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz">
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--ink)] text-white font-bold text-base hover:bg-[var(--navy)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--orange)]">
                  Mulai Quiz Sekarang
                </button>
              </Link>
              <Link href="/explore">
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[var(--ink)] font-bold text-base hover:bg-white/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--orange)]">
                  Lihat Semua ORMAWA
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[var(--navy)] text-white/60 py-12 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <span className="font-[family-name:var(--font-display)] font-bold text-xl text-white mb-3 block">
                GOPO 2026
              </span>
              <p className="leading-relaxed text-xs">
                Grand Opening Ormawa Polibatam 2026. Sarana interaktif eksplorasi organisasi mahasiswa.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Tautan Cepat</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/quiz" className="hover:text-[var(--orange)] transition-colors">Mulai Quiz</Link></li>
                <li><Link href="/explore" className="hover:text-[var(--orange)] transition-colors">Explore ORMAWA</Link></li>
                <li><a href="#how-it-works" className="hover:text-[var(--orange)] transition-colors">Cara Kerja</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Media Sosial</h4>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/bempolibatam"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram BEM Polibatam"
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[var(--orange)] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
                >
                  <Camera className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com/@bempolibatam"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube BEM Polibatam"
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[var(--orange)] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
                >
                  <Play className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-xs text-white/40">
            <p>© 2026 GOPO - Grand Opening Ormawa Polibatam. PSDM BEM Polibatam.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}