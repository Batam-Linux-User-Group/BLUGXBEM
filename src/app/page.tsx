"use client";

import { motion } from "framer-motion";
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
  ArrowRightCircle,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  const ormawaList = [
    { name: "BEM", logo: "/logos/BEM.png", span: "col-span-2" },
    { name: "DPM", logo: "/logos/DPM.png", span: "col-span-2" },
    { name: "HMMB", logo: "/logos/HMMB.png", span: "col-span-1" },
    { name: "HME", logo: "/logos/HME.png", span: "col-span-1" },
    { name: "HMTI", logo: "/logos/HMTI.png", span: "col-span-1" },
    { name: "HMM", logo: "/logos/HMM.png", span: "col-span-1" },
    { name: "PEC", logo: "/logos/PEC.png", span: "col-span-1" },
    { name: "LPM",  logo: "/logos/LPM.png", span: "col-span-1" },
    { name: "ENERGI",  logo: "/logos/ENERGI.png", span: "col-span-1" },
    { name: "PD-Elshaddai", logo: "/logos/EL-SHADAI.png", span: "col-span-1" },
    { name: "IMMPB", logo: "/logos/IMMPB.png", span: "col-span-1" },
    { name: "BLUG", logo: "/logos/BLUG.png", span: "col-span-1" },
    { name: "REKAM", logo: "/logos/REKAM.png", span: "col-span-1" },
    { name: "KUAS", logo: "/logos/KUAS.png", span: "col-span-1" },
    { name: "MAPALA", logo: "/logos/MAPALA.png", span: "col-span-1" },
    { name: "KOP", logo: "/logos/KOP.png", span: "col-span-1" },
  ];

  const features = [
    {
      icon: Target,
      title: "Find Your Match",
      subtitle: "Temukan Kecocokanmu",
      description: "Ikuti quiz interaktif untuk menemukan ORMAWA yang paling sesuai dengan karakter dan minatmu.",
      badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
      link: "/quiz"
    },
    {
      icon: Users,
      title: "Explore ORMAWA",
      subtitle: "Jelajahi Organisasi",
      description: "Kenali 16 organisasi mahasiswa di Polibatam beserta profil, kegiatan, dan pencapaian mereka.",
      badgeColor: "bg-purple-50 text-purple-600 border-purple-100",
      link: "/explore"
    },
    {
      icon: Calendar,
      title: "Program & Kegiatan",
      subtitle: "Kegiatan Unggulan",
      description: "Lihat berbagai kegiatan menarik, program kerja unggulan, dan pengalaman berharga.",
      badgeColor: "bg-cyan-50 text-cyan-600 border-cyan-100",
      link: "/explore"
    },
    {
      icon: MessageCircle,
      title: "Connect With ORMAWA",
      subtitle: "Terhubung Langsung",
      description: "Akses media sosial dan kontak resmi setiap ORMAWA untuk informasi open recruitment.",
      badgeColor: "bg-pink-50 text-pink-600 border-pink-100",
      link: "/explore"
    }
  ];

  const categories = [
    { icon: Users, name: "Kepemimpinan", color: "bg-blue-50 text-blue-600" },
    { icon: BookOpen, name: "Akademik", color: "bg-emerald-50 text-emerald-600" },
    { icon: Code, name: "Teknologi", color: "bg-indigo-50 text-indigo-600" },
    { icon: Mic2, name: "Komunikasi", color: "bg-amber-50 text-amber-600" },
    { icon: Palette, name: "Seni", color: "bg-rose-50 text-rose-600" },
    { icon: Briefcase, name: "Bisnis", color: "bg-orange-50 text-orange-600" },
    { icon: Heart, name: "Sosial", color: "bg-red-50 text-red-600" },
    { icon: Dumbbell, name: "Olahraga", color: "bg-teal-50 text-teal-600" }
  ];

  const stats = [
    { value: "16", label: "ORMAWA Aktif", icon: Users },
    { value: "50+", label: "Program Kerja", icon: Calendar },
    { value: "1000+", label: "Mahasiswa Terlibat", icon: Award },
    { value: "100%", label: "Rekomendasi Personal", icon: Target }
  ];

  const howItWorks = [
    {
      step: "01",
      icon: Target,
      title: "Jawab Quiz",
      desc: "Isi quiz interaktif singkat untuk menganalisis minat, bakat, dan karakter kepemimpinanmu."
    },
    {
      step: "02",
      icon: TrendingUp,
      title: "Lihat Persentase",
      desc: "Dapatkan kalkulasi persentase kecocokanmu secara real-time dengan seluruh ORMAWA."
    },
    {
      step: "03",
      icon: Users,
      title: "Jelajahi & Bergabung",
      desc: "Pelajari profil lengkap ORMAWA yang cocok dan langsung terhubung dengan pengurus."
    }
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900 font-sans antialiased">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3">
               <img src="/logos/BEM.png" alt="GOPO Logo" className="w-12 h-12" /> X <img src="/logos/BLUG.png" alt="GOPO Logo" className="w-12 h-12" />
              
              <span className="text-lg font-bold text-gray-900">
                GOPO <span className="text-blue-600">2026</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
              <a href="#explore" className="hover:text-blue-600 transition-colors">Explore</a>
              <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#categories" className="hover:text-blue-600 transition-colors">Categories</a>
            </div>

            <Link href="/quiz">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm">
                Mulai Quiz
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Grand Opening Ormawa Polibatam 2026
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 mb-6 leading-[1.1]">
                FIND YOUR{" "}
                <span className="text-blue-600">
                  PERFECT MATCH
                </span>
              </h1>

              <p className="text-xl text-gray-900 mb-2 font-semibold">
                Temukan minatmu. Kenali potensimu.
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-xl">
                Jelajahi ekosistem organisasi mahasiswa Polibatam. Ikuti quiz interaktif untuk menemukan ORMAWA yang paling selaras dengan passion-mu.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quiz">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-600/10 hover:bg-blue-700 hover:shadow-blue-600/20 transition-all flex items-center justify-center gap-3">
                    Mulai Quiz Sekarang
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/explore">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-gray-700 font-bold text-base border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3">
                    Explore ORMAWA
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Hero Right Image Grid (Clean Bento Grid) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative bg-gray-50 rounded-3xl p-6 border border-gray-100 shadow-sm">
                
                {/* Logo Bento Grid */}
                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {ormawaList.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.03 }}
                      className={`group relative ${item.span} bg-white border border-gray-100 hover:border-blue-200 rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
                    >
                      <div className="relative w-12 h-12 md:w-14 md:h-14 mb-3 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                        <Image
                          src={item.logo}
                          alt={`Logo ${item.name}`}
                          width={56}
                          height={56}
                          className="object-contain max-h-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.parentElement?.querySelector('.fallback-text') as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <span className="fallback-text hidden w-full h-full items-center justify-center text-lg font-bold text-gray-300">
                          {item.name.substring(0, 2)}
                        </span>
                      </div>

                      <p className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors text-center">
                        {item.name}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Unity Banner */}
                <div className="mt-4 relative z-10 bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm">
                  <p className="text-xs font-medium text-gray-600 flex items-center justify-center gap-2">
                     Sinergisasi Keluarga Polibatam
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="explore" className="relative z-10 py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Eksplorasi Fitur GOPO 2026
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base">
              Empat langkah mudah untuk mengenali dan menentukan wadah berorganisasi terbaikmu.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white border border-gray-100 hover:border-blue-100 rounded-2xl p-7 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.badgeColor}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                    {feature.subtitle}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                <Link href={feature.link}>
                  <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    Pelajari <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Bagaimana Cara Kerjanya?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base">
              Proses presisi untuk mengarahkanmu ke organisasi yang sesuai.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl text-white font-bold text-lg flex items-center justify-center mx-auto mb-6 shadow-sm">
                  {item.step}
                </div>
                <item.icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-20">
                    <ArrowRightCircle className="w-8 h-8 text-gray-200" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="relative z-10 py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Bidang Pengembangan
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base">
              Pilih pilar pengembangan softskill & hardskill yang ingin kamu asah.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${category.color}`}>
                  <category.icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-gray-700 text-sm">
                  {category.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3 text-blue-600">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden border border-gray-200 bg-white shadow-xl shadow-gray-200/50">
            <Zap className="w-12 h-12 text-blue-600 mx-auto mb-6 relative z-10" />
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 relative z-10">
              Siap Menemukan ORMAWA Impianmu?
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto relative z-10">
              Mulai eksplorasi sekarang dan jadilah bagian dari dinamika kampus Polibatam.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link href="/quiz">
                <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-600/10 hover:bg-blue-700 transition-all">
                  Mulai Quiz Sekarang
                </button>
              </Link>
              <Link href="/explore">
                <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-base border border-gray-200 transition-all">
                  Lihat Semua ORMAWA
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-50 border-t border-gray-100 py-12 text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <span className="font-bold text-xl text-gray-900 mb-3 block">GOPO 2026</span>
              <p className="text-gray-500 leading-relaxed text-xs">
                Grand Opening Ormawa Polibatam 2026. Sarana interaktif eksplorasi organisasi mahasiswa.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Tautan Cepat</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/quiz" className="hover:text-blue-600 transition-colors">Mulai Quiz</Link></li>
                <li><Link href="/explore" className="hover:text-blue-600 transition-colors">Explore ORMAWA</Link></li>
                <li><a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Media Sosial</h4>
              <div className="flex gap-3">
                <a href="https://instagram.com/bempolibatam" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:text-blue-600 hover:border-blue-200 transition-colors">
                  <Camera className="w-4 h-4" />
                </a>
                <a href="https://youtube.com/@bempolibatam" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:text-red-600 hover:border-red-200 transition-colors">
                  <Play className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-xs text-gray-400">
            <p>© 2026 GOPO - Grand Opening Ormawa Polibatam. PSDM BEM Polibatam.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}