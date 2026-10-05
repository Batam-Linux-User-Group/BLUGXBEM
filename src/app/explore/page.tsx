"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  Users,
  Camera,
  Globe,
  ArrowLeft,
  ArrowUpRight,
  CalendarClock,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ORMAWA_LIST } from "@/data/ormawa";
import { Ormawa } from "@/types/ormawa";

// --- Komponen Logo ---
function OrmawaLogo({ ormawa, size = 60 }: { ormawa?: Ormawa; size?: number }) {
  const [failed, setFailed] = useState(false);
  const initials = ormawa?.shortName?.substring(0, 2).toUpperCase() ?? "??";

  return (
    <div
      className="relative shrink-0 rounded-2xl bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center overflow-hidden shadow-[0_4px_14px_-6px_rgba(21,20,15,0.25)] ring-4 ring-[var(--bg)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2"
      style={{ width: size, height: size }}
    >
      {ormawa?.logo && !failed ? (
        <Image
          src={ormawa.logo}
          alt={`Logo ${ormawa.name}`}
          fill
          sizes={`${size}px`}
          className="object-contain p-2"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="font-[family-name:var(--font-display)] font-bold text-[var(--orange)]/70"
          style={{ fontSize: size * 0.32 }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

// Warna aksen per tipe organisasi
const TYPE_STYLE: Record<string, { badge: string; bar: string }> = {
  Eksekutif: {
    badge: "bg-[var(--orange)]/10 text-[var(--orange-dark)]",
    bar: "from-[var(--orange)] to-[#ffb066]",
  },
  Legislatif: {
    badge: "bg-[var(--navy)]/10 text-[var(--navy)]",
    bar: "from-[var(--navy)] to-[#4a4d8f]",
  },
  HMJ: {
    badge: "bg-emerald-50 text-emerald-700",
    bar: "from-emerald-500 to-teal-300",
  },
};

const DEFAULT_TYPE_STYLE = {
  badge: "bg-[var(--bg)] text-[var(--ink-soft)] border border-[var(--line)]",
  bar: "from-[var(--ink-soft)] to-[var(--line)]",
};

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

  const normalizeText = (value?: string) => {
    if (!value) return "";
    const trimmed = value.trim();
    return trimmed === "-" ? "" : trimmed;
  };

  const getRecruitmentTitle = (ormawa: Ormawa) =>
    normalizeText(ormawa.recruitmentTitle) || `Open Recruitment ${ormawa.shortName}`;

  const getRecruitmentDescription = (ormawa: Ormawa) =>
    normalizeText(ormawa.recruitmentDescription) ||
    `Bergabunglah bersama ${ormawa.name} dan mulai perjalananmu di organisasi yang tepat dengan minat, bakat, dan semangatmu.`;

  const formatDate = (value?: string) => {
    const safeValue = normalizeText(value);
    if (!safeValue) return "-";
    const date = new Date(safeValue);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const getRecruitmentPeriod = (ormawa: Ormawa) => {
    const start = normalizeText(ormawa.recruitmentStartDate);
    const end = normalizeText(ormawa.recruitmentEndDate);
    if (!start && !end) return null;
    if (start && end) return `${formatDate(start)} – ${formatDate(end)}`;
    if (start) return `Mulai ${formatDate(start)}`;
    return `Sampai ${formatDate(end)}`;
  };

  const getRegistrationStatus = (ormawa: Ormawa): "open" | "comingSoon" | "closed" => {
    if (ormawa.recruitmentStatus) return ormawa.recruitmentStatus;
    if (!ormawa.registrationLink) return "closed";

    const start = ormawa.recruitmentStartDate ? new Date(ormawa.recruitmentStartDate) : null;
    const end = ormawa.recruitmentEndDate ? new Date(ormawa.recruitmentEndDate) : null;
    const now = new Date();

    if (start && start > now) return "comingSoon";
    if (end && end < now) return "closed";
    return "open";
  };

  const isRegistrationOpen = (ormawa: Ormawa) => getRegistrationStatus(ormawa) === "open";
  const isRegistrationComingSoon = (ormawa: Ormawa) => getRegistrationStatus(ormawa) === "comingSoon";

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

  return (
    <main
      style={themeVars}
      className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-[family-name:var(--font-body)] antialiased pb-20 relative overflow-x-hidden"
    >
      {/* Dekorasi latar */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-[var(--orange)]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-64 -left-32 h-72 w-72 rounded-full bg-[var(--navy)]/5 blur-3xl"
      />

      {/* Header & Search */}
      <div className="sticky top-0 z-50 bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--line)]">
        <div className="w-full px-4 sm:px-6 py-5">
          <div className="flex items-center gap-4 mb-5">
            <Link
              href="/"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] shadow-sm hover:border-[var(--orange)] hover:text-[var(--orange)] hover:-translate-x-0.5 transition-all"
              aria-label="Kembali"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex-1">
              <h1 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-[var(--ink)] leading-tight">
                Jelajahi ORMAWA
              </h1>
              <p className="text-sm text-[var(--ink-soft)]">
                Temukan Ormawa yang tepat untuk berkembang
              </p>
            </div>
        
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink-soft)] group-focus-within:text-[var(--orange)] transition-colors" />
            <input
              type="text"
              placeholder="Cari nama, singkatan, atau jenis organisasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-11 py-3.5 rounded-2xl border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 focus:outline-none focus:ring-4 focus:ring-[var(--orange)]/10 focus:border-[var(--orange)] transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Hapus pencarian"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full text-[var(--ink-soft)] hover:bg-[var(--bg)] hover:text-[var(--orange)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 w-full px-4 sm:px-6 py-8">
        <div className="mb-8 overflow-hidden rounded-[30px] border border-[var(--line)] bg-gradient-to-br from-[#fff7ef] via-[var(--paper)] to-[#eef4ff] shadow-[0_24px_60px_-30px_rgba(18,19,43,0.38)]">
       
        </div>

        {filteredOrmawa.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-[var(--paper)] rounded-3xl border border-[var(--line)]"
          >
            <Users className="w-12 h-12 text-[var(--ink-soft)] mx-auto mb-4" />
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)] mb-2">
              Tidak ditemukan
            </h3>
            <p className="text-[var(--ink-soft)]">Coba gunakan kata kunci lain.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredOrmawa.map((ormawa, index) => {
              const typeStyle = TYPE_STYLE[ormawa.type] ?? DEFAULT_TYPE_STYLE;
              const registrationStatus = getRegistrationStatus(ormawa);

              return (
                <motion.div
                  key={ormawa.id}
                  initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.05 }}
                  className="group relative h-full overflow-hidden rounded-[30px] border border-[var(--line)] bg-[var(--paper)] shadow-[0_24px_60px_-30px_rgba(21,20,15,0.4)] hover:-translate-y-1.5 hover:border-[var(--orange)]/35 hover:shadow-[0_30px_70px_-30px_rgba(21,20,15,0.48)] transition-all duration-300 flex flex-col"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--orange)]/12 blur-2xl" />

                  <Link
                    href={`/explore/${ormawa.id}`}
                    className="flex-1 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]/40"
                  >
                    <div className="relative p-5 pb-4 flex-1 flex flex-col">
                      <div className="relative z-10 flex items-start justify-between gap-3 mb-4 pt-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <OrmawaLogo ormawa={ormawa} size={62} />
                          <div className="min-w-0">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] ${typeStyle.badge}`}
                            >
                              {ormawa.type}
                            </span>
                          </div>
                        </div>

                       
                      </div>

                      <div className="px-1">
                        <h3 className="font-[family-name:var(--font-display)] text-xl font-black text-[var(--ink)] leading-tight group-hover:text-[var(--orange)] transition-colors break-words">
                          {ormawa.name}
                        </h3>

                        {ormawa.tagline && (
                          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--orange)]/90">
                            {ormawa.tagline}
                          </p>
                        )}

                        <p className="mt-3 text-sm text-[var(--ink-soft)] line-clamp-3 leading-relaxed">
                          {ormawa.description}
                        </p>
                      </div>

                      <div className="mt-5 relative overflow-hidden rounded-2xl border border-[var(--orange)]/20 bg-gradient-to-br from-[var(--orange)]/13 via-[#ffd7c0]/18 to-[var(--navy)]/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                        <div className="relative">
                          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--orange)]">
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--orange)] opacity-60" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--orange)]" />
                            </span>
                            {registrationStatus === "open"
                              ? "Pendaftaran dibuka"
                              : registrationStatus === "comingSoon"
                                ? "Coming soon"
                                : "Pendaftaran ditutup"}
                          </p>
                          <h4 className="mt-2 text-sm font-black leading-snug text-[var(--ink)]">
                            {getRecruitmentTitle(ormawa)}
                          </h4>
                          <p className="mt-1 text-[11px] leading-relaxed text-[var(--ink-soft)] line-clamp-3">
                            {getRecruitmentDescription(ormawa)}
                          </p>
                          {getRecruitmentPeriod(ormawa) && (
                            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white/75 px-2 py-1 text-[10px] font-semibold text-[var(--ink-soft)]">
                              <CalendarClock className="w-3.5 h-3.5" />
                              {getRecruitmentPeriod(ormawa)}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {ormawa.focusAreas.slice(0, 2).map((area, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2.5 py-1 bg-[var(--bg)] text-[var(--ink-soft)] rounded-full border border-[var(--line)]"
                          >
                            {area}
                          </span>
                        ))}

                        {ormawa.focusAreas.length > 2 && (
                          <span className="text-[11px] px-2.5 py-1 bg-[var(--bg)] text-[var(--ink-soft)] rounded-full border border-[var(--line)]">
                            +{ormawa.focusAreas.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Footer: ikon sosial + aksi (tiap aksi hanya satu) */}
                  <div className="px-6 py-4 bg-[var(--bg)]/60 border-t border-[var(--line)] flex items-center gap-3">
                    {(ormawa.instagram || ormawa.googleSite) && (
                      <div className="flex gap-2">
                      
                        {ormawa.googleSite && (
                          <span
                            title="Website"
                            className="p-2 rounded-lg bg-[var(--paper)] text-[var(--ink-soft)] border border-[var(--line)]"
                          >
                            <Globe className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <Link
                        href={`/explore/${ormawa.id}`}
                        className={
                          ormawa.registrationLink
                            ? "inline-flex items-center justify-center gap-1 rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--ink)] hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
                            : "inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[var(--orange)] to-[var(--orange-dark)] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-md shadow-[var(--orange)]/25 hover:shadow-lg hover:shadow-[var(--orange)]/30 transition-all group/btn"
                        }
                      >
                        Lihat Detail
                        <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </Link>

                      {ormawa.registrationLink && (
                        registrationStatus === "open" ? (
                          <a
                            href={ormawa.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[var(--orange)] to-[var(--orange-dark)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-md shadow-[var(--orange)]/25 hover:shadow-lg hover:shadow-[var(--orange)]/30 hover:-translate-y-0.5 transition-all"
                          >
                            Daftar
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </a>
                        ) : registrationStatus === "comingSoon" ? (
                          <span className="inline-flex items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)] cursor-not-allowed">
                            Coming Soon
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)] cursor-not-allowed">
                            Ditutup
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}