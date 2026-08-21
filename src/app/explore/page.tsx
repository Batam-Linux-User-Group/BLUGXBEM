"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Search, 
  Users, 
  Camera, 
  Link as LinkIcon, 
  Globe, 
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ORMAWA_LIST } from "@/data/ormawa";
import { Ormawa } from "@/types/ormawa";

// --- Komponen Logo ---
function OrmawaLogo({ ormawa, size = 56 }: { ormawa?: Ormawa; size?: number }) {
  const [failed, setFailed] = useState(false);
  const initials = ormawa?.shortName?.substring(0, 2).toUpperCase() ?? "??";

  return (
    <div className="relative shrink-0 rounded-xl bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center overflow-hidden shadow-sm" style={{ width: size, height: size }}>
      {ormawa?.logo && !failed ? (
        <Image src={ormawa.logo} alt={`Logo ${ormawa.name}`} fill className="object-contain p-2" onError={() => setFailed(true)} />
      ) : (
        <span className="font-[family-name:var(--font-display)] font-bold text-[var(--orange)]/60" style={{ fontSize: size * 0.32 }}>{initials}</span>
      )}
    </div>
  );
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const reduceMotion = useReducedMotion();

  const filteredOrmawa = ORMAWA_LIST.filter((ormawa) => {
    const query = searchQuery.toLowerCase();
    return (
      ormawa.name.toLowerCase().includes(query) ||
      ormawa.shortName.toLowerCase().includes(query) ||
      ormawa.type.toLowerCase().includes(query) ||
      ormawa.description.toLowerCase().includes(query)
    );
  });

  const themeVars = {
    "--bg": "#FAF9F4", "--ink": "#15140F", "--ink-soft": "#6B6B5F",
    "--paper": "#FFFFFF", "--line": "#E7E4D9", "--orange": "#E4572E",
    "--orange-dark": "#C43F1B", "--navy": "#12132B",
    "--font-display": "var(--font-display, 'Space Grotesk'), sans-serif",
    "--font-body": "var(--font-body, 'Manrope'), sans-serif",
  } as React.CSSProperties;

  return (
    <main style={themeVars} className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-[family-name:var(--font-body)] antialiased pb-20">
      {/* Header & Search */}
      <div className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--line)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center gap-4 mb-5">
            <Link href="/" className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors" aria-label="Kembali">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)]">Jelajahi ORMAWA</h1>
              <p className="text-sm text-[var(--ink-soft)]">Temukan komunitas yang tepat untuk berkembang</p>
            </div>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink-soft)] group-focus-within:text-[var(--orange)] transition-colors" />
            <input type="text" placeholder="Cari nama, singkatan, atau jenis organisasi..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--orange)]/20 focus:border-[var(--orange)] transition-all shadow-sm" />
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {filteredOrmawa.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20 bg-[var(--paper)] rounded-3xl border border-[var(--line)]">
            <Users className="w-12 h-12 text-[var(--ink-soft)] mx-auto mb-4" />
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)] mb-2">Tidak ditemukan</h3>
            <p className="text-[var(--ink-soft)]">Coba gunakan kata kunci lain.</p>
          </motion.div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrmawa.map((ormawa, index) => (
            <Link
              key={ormawa.id}
              href={`/explore/${ormawa.id}`}
              className="block h-full"
            >
              <motion.div
                initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : index * 0.05 }}
                className="group h-full bg-[var(--paper)] rounded-2xl border border-[var(--line)] overflow-hidden hover:shadow-lg hover:border-[var(--orange)]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* CONTENT */}
                <div className="p-6 flex-1 flex flex-col">

                  {/* Logo + Nama - NAMA SEKARANG TIDAK TERPOTONG */}
                  <div className="flex items-start gap-4 mb-4">
                    <OrmawaLogo ormawa={ormawa} size={56} />

                    <div className="flex-1 min-w-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${
                          ormawa.type === "Eksekutif"
                            ? "bg-[var(--orange)]/10 text-[var(--orange-dark)]"
                            : ormawa.type === "Legislatif"
                            ? "bg-[var(--navy)]/10 text-[var(--navy)]"
                            : ormawa.type === "HMJ"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-[var(--bg)] text-[var(--ink-soft)] border border-[var(--line)]"
                        }`}
                      >
                        {ormawa.type}
                      </span>

                      {/* HAPUS line-clamp-1 AGAR NAMA TIDAK TERPOTONG */}
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)] leading-tight group-hover:text-[var(--orange)] transition-colors break-words">
                        {ormawa.name}
                      </h3>
                    </div>
                  </div>

                  {/* Tagline */}
                  {ormawa.tagline && (
                    <p className="text-xs font-medium text-[var(--orange)] italic mb-2">
                      &ldquo;{ormawa.tagline}&rdquo;
                    </p>
                  )}

                  {/* Description - DIBUAT LEBIH FLEKSIBEL */}
                  <p className="text-sm text-[var(--ink-soft)] line-clamp-3 mb-5 leading-relaxed flex-1">
                    {ormawa.description}
                  </p>

                  {/* Focus Areas */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {ormawa.focusAreas.slice(0, 2).map((area, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-1 bg-[var(--bg)] text-[var(--ink-soft)] rounded-md border border-[var(--line)]"
                      >
                        {area}
                      </span>
                    ))}

                    {ormawa.focusAreas.length > 2 && (
                      <span className="text-[11px] px-2 py-1 bg-[var(--bg)] text-[var(--ink-soft)] rounded-md border border-[var(--line)]">
                        +{ormawa.focusAreas.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* FOOTER */}
                <div className="px-6 py-4 bg-[var(--bg)]/50 border-t border-[var(--line)] flex items-center justify-between">
                  <div className="flex gap-2">
                    {ormawa.instagram && (
                      <span className="p-2 rounded-lg bg-[var(--paper)] text-[var(--ink-soft)] border border-[var(--line)]">
                        <Camera className="w-4 h-4" />
                      </span>
                    )}

                    {ormawa.googleSite && (
                      <span className="p-2 rounded-lg bg-[var(--paper)] text-[var(--ink-soft)] border border-[var(--line)]">
                        <Globe className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <span className="text-sm font-bold text-[var(--orange)] flex items-center gap-1.5">
                    Lihat Detail
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        )}
      </div>
    </main>
  );
}