"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  Trophy,
  Medal,
  Award,
  ArrowLeft,
  RotateCcw,
  Camera,
  Globe,
  Target,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { calculateMatches } from "@/lib/matching";
import { ORMAWA_LIST } from "@/data/ormawa";
import { MatchResult } from "@/types/quiz";
import { Ormawa } from "@/types/ormawa";

// Logo component with fallback
function OrmawaLogo({ ormawa, size = 48 }: { ormawa?: Ormawa; size?: number }) {
  const [failed, setFailed] = useState(false);
  const initials = ormawa?.shortName?.substring(0, 2).toUpperCase() ?? "??";

  return (
    <div
      className="relative shrink-0 rounded-xl bg-white border border-[var(--line)] flex items-center justify-center overflow-hidden"
      style={{ width: size, height: size, minWidth: size }}
    >
      {ormawa?.logo && !failed ? (
        <Image
          src={ormawa.logo}
          alt={`Logo ${ormawa.name}`}
          width={size}
          height={size}
          className="object-contain p-1.5"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="font-[family-name:var(--font-display)] font-bold text-[var(--orange)]/60"
          style={{ fontSize: size * 0.32 }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

// Reusable score progress bar with a11y
function ScoreBar({
  score,
  delay,
  color = "bg-[var(--orange)]",
}: {
  score: number;
  delay: number;
  color?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex-1 h-2 bg-[var(--bg)] border border-[var(--line)] rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          initial={reduceMotion ? {} : { width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ delay, duration: 0.6, ease: "easeOut" }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
      <span className="font-[family-name:var(--font-display)] text-xs font-bold w-9 text-right shrink-0">
        {score}%
      </span>
    </div>
  );
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
  "--silver": "#8B8D98",
  "--font-display": "var(--font-display, 'Space Grotesk'), sans-serif",
  "--font-body": "var(--font-body, 'Manrope'), sans-serif",
} as React.CSSProperties;

export default function ResultPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fullOrmawaData, setFullOrmawaData] = useState<Record<string, Ormawa>>({});

  useEffect(() => {
    const savedAnswers = sessionStorage.getItem("quizAnswers");

    if (!savedAnswers) {
      router.push("/quiz");
      return;
    }

    let parsedAnswers;
    try {
      parsedAnswers = JSON.parse(savedAnswers);
    } catch {
      router.push("/quiz");
      return;
    }

    const timer = setTimeout(() => {
      const results = calculateMatches(parsedAnswers, ORMAWA_LIST);
      setMatches(results);

      const ormawaMap: Record<string, Ormawa> = {};
      ORMAWA_LIST.forEach((ormawa) => {
        ormawaMap[ormawa.id] = ormawa;
      });
      setFullOrmawaData(ormawaMap);

      setIsLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, [router]);

  // ---------- Loading state ----------
  if (isLoading) {
    return (
      <main
        style={themeVars}
        className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-[family-name:var(--font-body)] flex items-center justify-center p-6"
      >
        <div className="text-center max-w-xs w-full">
          <motion.div
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="w-14 h-14 border-4 border-[var(--line)] border-t-[var(--orange)] rounded-full mx-auto mb-6"
          />
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">
            Menganalisis jawabanmu...
          </h2>
          <p className="text-[var(--ink-soft)] text-sm mb-6">
            Mencocokkan dengan {ORMAWA_LIST.length} organisasi
          </p>

          {/* Skeleton preview so loading doesn't feel like a dead end */}
          <div className="space-y-2.5 text-left">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
                className="h-12 bg-[var(--paper)] border border-[var(--line)] rounded-xl"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  const topMatch = matches[0];
  const secondMatch = matches[1];
  const thirdMatch = matches[2];
  const otherMatches = matches.slice(3);

  const topOrmawa = fullOrmawaData[topMatch?.ormawaId];
  const secondOrmawa = fullOrmawaData[secondMatch?.ormawaId];
  const thirdOrmawa = fullOrmawaData[thirdMatch?.ormawaId];

  // ---------- Empty / error state ----------
  if (!topMatch || !topOrmawa) {
    return (
      <main
        style={themeVars}
        className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-[family-name:var(--font-body)] flex items-center justify-center p-6"
      >
        <div className="text-center max-w-xs">
          <div className="w-14 h-14 rounded-full bg-[var(--orange)]/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-[var(--orange)]" />
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2">
            Hasil belum bisa ditampilkan
          </h2>
          <p className="text-[var(--ink-soft)] text-sm mb-6">
            Sepertinya ada masalah saat mencocokkan jawabanmu. Yuk coba ulangi kuisnya.
          </p>
          <button
            onClick={() => {
              sessionStorage.removeItem("quizAnswers");
              router.push("/quiz");
            }}
            className="w-full bg-[var(--orange)] text-white font-bold py-3 px-4 rounded-xl hover:bg-[var(--orange-dark)] transition-colors text-sm"
          >
            Ulangi Kuis
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      style={themeVars}
      className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-[family-name:var(--font-body)] pb-12"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--line)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/quiz"
            aria-label="Kembali ke quiz"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-[family-name:var(--font-display)] text-base font-bold">Hasil Kecocokan</h1>
          <div className="w-8" aria-hidden />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 lg:grid lg:grid-cols-5 lg:gap-6 lg:items-start">
        {/* ---------- Left column: hero top match ---------- */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 lg:sticky lg:top-20"
        >
          <div className="relative bg-[var(--navy)] rounded-2xl p-5 lg:p-6 text-white overflow-hidden shadow-lg">
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 right-0 w-40 h-40 bg-[var(--orange)]/20 rounded-full -mr-16 -mt-16 blur-2xl"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-[var(--orange)] px-3 py-1.5 rounded-full text-xs font-bold mb-4">
                <Trophy className="w-3 h-3" />
                #1 UNTUKMU
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className="p-1 bg-white rounded-xl shrink-0">
                  <OrmawaLogo ormawa={topOrmawa} size={52} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-[family-name:var(--font-display)] text-xl lg:text-2xl font-bold leading-tight mb-1">
                    {topMatch.name}
                  </h2>
                  <p className="text-white/60 text-xs">{topOrmawa.type}</p>
                </div>
              </div>

              <p className="text-white/75 mb-5 leading-relaxed text-sm">{topOrmawa.description}</p>

              {/* Score */}
              <div className="flex items-center gap-3 mb-5 p-3 bg-white/5 rounded-xl">
                <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--orange)]">
                  {topMatch.score}%
                </div>
                <div className="text-white/70 text-xs">
                  <div className="font-bold text-white">Tingkat Kecocokan</div>
                  <div>Berdasarkan jawaban kuismu</div>
                </div>
              </div>

              {/* Matched Skills */}
              {topMatch.matchedSkills.length > 0 && (
                <div className="mb-5">
                  <div className="text-xs text-white/60 mb-2 flex items-center gap-1.5">
                    <Target className="w-3 h-3" />
                    Skill yang cocok
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {topMatch.matchedSkills.slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="bg-white/10 px-2.5 py-1 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                    {topMatch.matchedSkills.length > 4 && (
                      <span className="bg-white/10 px-2.5 py-1 rounded-full text-xs">
                        +{topMatch.matchedSkills.length - 4} lainnya
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2.5">
                <Link
                  href={`/explore/${topOrmawa.id}`}
                  className="flex items-center justify-center gap-2 bg-[var(--orange)] text-white font-bold py-3 px-4 rounded-xl hover:bg-[var(--orange-dark)] transition-colors text-sm"
                >
                  Lihat Detail
                  <ChevronRight className="w-4 h-4" />
                </Link>

                {(topOrmawa.instagram || topOrmawa.googleSite) && (
                  <div className="flex items-center justify-center grid grid-cols-2 gap-2 center ">
                    {topOrmawa.instagram && (
                      <a
                        href={`https://instagram.com/${topOrmawa.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 bg-white text-[var(--ink)] font-semibold py-2.5 px-3 rounded-xl hover:bg-white/90 transition-colors text-xs"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        Instagram
                      </a>
                    )}
                    {topOrmawa.googleSite && (
                      <a
                        href={topOrmawa.googleSite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-1.5 bg-white/10 text-white font-semibold py-2.5 px-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-xs ${
                          !topOrmawa.instagram ? "col-span-2" : ""
                        }`}
                      >
                        <Globe className="w-3.5 h-3.5" />
                        Website
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------- Right column: #2, #3, and the rest ---------- */}
        <div className="lg:col-span-2 mt-5 lg:mt-0 space-y-3">
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {secondMatch && (
              <motion.div
                initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[var(--paper)] rounded-xl p-4 border-2 border-[var(--line)] hover:border-[var(--silver)] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <OrmawaLogo ormawa={secondOrmawa} size={40} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Medal className="w-3 h-3 text-[var(--silver)]" />
                      <span className="text-xs font-bold text-[var(--ink-soft)]">#2</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-[var(--bg)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] truncate">
                        {secondOrmawa?.type}
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-sm mb-1 truncate">
                      {secondMatch.name}
                    </h3>
                    <p className="text-xs text-[var(--ink-soft)] mb-3 line-clamp-2">{secondOrmawa?.description}</p>

                    <div className="mb-3">
                      <ScoreBar score={secondMatch.score} delay={0.25} color="bg-[var(--silver)]" />
                    </div>

                    <Link
                      href={`/explore/${secondMatch.ormawaId}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--orange)] hover:text-[var(--orange-dark)]"
                    >
                      Lihat Detail <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {thirdMatch && (
              <motion.div
                initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-[var(--paper)] rounded-xl p-4 border-2 border-[var(--line)] hover:border-[var(--orange)]/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <OrmawaLogo ormawa={thirdOrmawa} size={40} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-3 h-3 text-[var(--orange)]" />
                      <span className="text-xs font-bold text-[var(--ink-soft)]">#3</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-[var(--bg)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] truncate">
                        {thirdOrmawa?.type}
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-sm mb-1 truncate">
                      {thirdMatch.name}
                    </h3>
                    <p className="text-xs text-[var(--ink-soft)] mb-3 line-clamp-2">{thirdOrmawa?.description}</p>

                    <div className="mb-3">
                      <ScoreBar score={thirdMatch.score} delay={0.3} />
                    </div>

                    <Link
                      href={`/explore/${thirdMatch.ormawaId}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--orange)] hover:text-[var(--orange-dark)]"
                    >
                      Lihat Detail <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Other Matches */}
          {otherMatches.length > 0 && (
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="bg-[var(--paper)] rounded-xl border border-[var(--line)] overflow-hidden"
            >
              <div className="p-4 border-b border-[var(--line)]">
                <h3 className="font-[family-name:var(--font-display)] text-xs font-bold tracking-wide text-[var(--ink-soft)]">
                  LAINNYA YANG COCOK
                </h3>
              </div>

              <div className="divide-y divide-[var(--line)]">
                {otherMatches.map((match, idx) => {
                  const ormawa = fullOrmawaData[match.ormawaId];
                  return (
                    <motion.div
                      key={match.ormawaId}
                      initial={reduceMotion ? {} : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.04 }}
                    >
                      <Link
                        href={`/explore/${match.ormawaId}`}
                        className="flex items-center justify-between gap-3 p-3 hover:bg-[var(--bg)] transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-5 text-center text-[10px] font-bold text-[var(--ink-soft)]/50 shrink-0">
                            {idx + 4}
                          </span>
                          <OrmawaLogo ormawa={ormawa} size={28} />
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-xs truncate">{match.name}</p>
                            <p className="text-[10px] text-[var(--ink-soft)] truncate">{ormawa?.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-bold w-8 text-right">{match.score}%</span>
                          <ChevronRight className="w-3 h-3 text-[var(--ink-soft)]/40 group-hover:text-[var(--orange)] group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Footer Actions */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="space-y-3 pt-1"
          >
            <button
              onClick={() => {
                sessionStorage.removeItem("quizAnswers");
                router.push("/quiz");
              }}
              className="w-full bg-[var(--paper)] text-[var(--ink)] font-bold py-3 px-4 rounded-xl border-2 border-[var(--line)] hover:border-[var(--orange)] transition-all flex items-center justify-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Ulangi Kuis
            </button>

            <div className="bg-[var(--orange)]/10 rounded-xl p-4 text-center">
              <p className="text-xs text-[var(--ink-soft)]">
                <span className="font-bold text-[var(--ink)]">Tips:</span> Hasil ini bersifat rekomendasi. Jangan
                ragu untuk mengeksplorasi organisasi lain!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}