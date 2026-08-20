"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  Code,
  Briefcase,
  Zap,
  Wrench
} from "lucide-react";
import Link from "next/link";
import { QUESTIONS } from "@/data/questions";
import { shuffleArray } from "@/lib/utils";
import { Answer, Question } from "@/types/quiz";

// Helper sederhana untuk mempercantik tampilan kategori di badge
const formatCategory = (cat: string) => {
  return cat.charAt(0).toUpperCase() + cat.slice(1).replace(/([A-Z])/g, " $1");
};

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

const JURUSAN_LIST = [
  { id: "informatika", name: "Teknik Informatika", icon: Code },
  { id: "manajemen_bisnis", name: "Manajemen Bisnis", icon: Briefcase },
  { id: "elektro", name: "Teknik Elektro", icon: Zap },
  { id: "mesin", name: "Teknik Mesin", icon: Wrench },
];

export default function QuizPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);

  // State untuk mengontrol langkah: 'jurusan' atau 'quiz'
  const [step, setStep] = useState<"jurusan" | "quiz">("jurusan");
  
  // State untuk data yang SUDAH diacak
  const [displayQuestions, setDisplayQuestions] = useState<Question[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // 1. Acak pertanyaan DAN opsi jawaban HANYA SAAT masuk ke langkah 'quiz'
  useEffect(() => {
    if (step === "quiz" && displayQuestions.length === 0) {
      const shuffled = shuffleArray(QUESTIONS).map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }));
      setDisplayQuestions(shuffled);
    }
  }, [step, displayQuestions.length]);

  // 2. Saat pindah soal (maju/mundur), tampilkan lagi jawaban yang sudah dipilih
  useEffect(() => {
    if (displayQuestions.length === 0) return;

    const question = displayQuestions[currentStep];
    const existing = answers.find((a) => a.questionId === question.id);
    const matchedIdx = existing ? question.options.findIndex((o) => o.score === existing.score) : -1;
    setSelectedOption(matchedIdx >= 0 ? matchedIdx : null);

    headingRef.current?.focus();
  }, [currentStep, displayQuestions, answers]);

  const handleJurusanSelect = (jurusanId: string) => {
    // Simpan jurusan di sessionStorage (bisa digunakan untuk boosting rekomendasi di backend/matching)
    sessionStorage.setItem("userJurusan", jurusanId);
    setStep("quiz");
  };

  const handleAnswer = (score: number, optionIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedOption(optionIndex);

    const newAnswer: Answer = {
      questionId: displayQuestions[currentStep].id,
      category: displayQuestions[currentStep].category,
      score,
    };

    const updatedAnswers = [
      ...answers.filter((a) => a.questionId !== displayQuestions[currentStep].id),
      newAnswer,
    ];
    setAnswers(updatedAnswers);

    setTimeout(() => {
      if (currentStep < displayQuestions.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        sessionStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers));
        router.push("/result");
      }
      setIsAnimating(false);
    }, 500);
  };

  const handlePrevious = () => {
    if (isAnimating || currentStep === 0) return;
    setCurrentStep((prev) => prev - 1);
  };

  const handleLeaveQuiz = (e: React.MouseEvent) => {
    if (answers.length > 0) {
      const confirmed = window.confirm(
        "Progres kuismu belum tersimpan. Yakin mau keluar dan kembali ke beranda?"
      );
      if (!confirmed) {
        e.preventDefault();
      }
    }
  };

  // --- TAMPILAN 1: PEMILIHAN JURUSAN (Design disesuaikan dengan tema kuis) ---
  if (step === "jurusan") {
    return (
      <main style={themeVars} className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-[family-name:var(--font-body)] antialiased flex flex-col">
        <div className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--line)]">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
            <Link href="/" aria-label="Kembali ke beranda" className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-[family-name:var(--font-display)] text-lg font-bold">Pilih Jurusanmu</h1>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl w-full text-center space-y-8">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold mb-3 text-[var(--ink)]">
                Kamu dari Jurusan Apa?
              </h2>
              <p className="text-[var(--ink-soft)] text-lg">
                Pilih jurusanmu agar kami bisa menyesuaikan rekomendasi yang lebih personal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {JURUSAN_LIST.map((jurusan, idx) => (
                <motion.button
                  key={jurusan.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleJurusanSelect(jurusan.id)}
                  className="group relative p-6 rounded-2xl border-2 bg-[var(--paper)] border-[var(--line)] hover:border-[var(--orange)] hover:shadow-[4px_4px_0_0_var(--line)] transition-all duration-300 flex flex-col items-center gap-4 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
                >
                  <div className="w-14 h-14 rounded-full bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center group-hover:bg-[var(--orange)]/10 group-hover:border-[var(--orange)] transition-colors">
                    <jurusan.icon className="w-7 h-7 text-[var(--ink-soft)] group-hover:text-[var(--orange)] transition-colors" />
                  </div>
                  <span className="font-[family-name:var(--font-display)] font-bold text-lg text-[var(--ink)] group-hover:text-[var(--orange)] transition-colors">
                    {jurusan.name}
                  </span>
                  <ChevronRight className="absolute bottom-4 right-4 w-5 h-5 text-[var(--ink-soft)]/30 group-hover:text-[var(--orange)] group-hover:translate-x-1 transition-all" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  // --- TAMPILAN 2: LOADING (Sama persis seperti kode asli kamu) ---
  if (displayQuestions.length === 0) {
    if (QUESTIONS.length === 0) {
      return (
        <main style={themeVars} className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-6">
          <div className="text-center max-w-xs">
            <div className="w-14 h-14 rounded-full bg-[var(--orange)]/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-[var(--orange)]" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2 text-[var(--ink)]">
              Kuis belum tersedia
            </h2>
            <p className="text-[var(--ink-soft)] text-sm mb-6">
              Sepertinya belum ada pertanyaan yang bisa ditampilkan saat ini. Coba lagi nanti, ya.
            </p>
            <Link
              href="/"
              className="inline-block w-full bg-[var(--orange)] text-white font-bold py-3 px-4 rounded-xl hover:bg-[var(--orange-dark)] transition-colors text-sm"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </main>
      );
    }

    return (
      <main style={themeVars} className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-10 h-10 text-[var(--orange)] animate-spin mx-auto mb-4" />
          <p className="font-[family-name:var(--font-display)] text-[var(--ink)] font-bold">
            Menyiapkan kuis...
          </p>
        </motion.div>
      </main>
    );
  }

  // --- TAMPILAN 3: KUIS (Sama persis seperti kode asli kamu) ---
  const currentQuestion = displayQuestions[currentStep];
  const totalQuestions = displayQuestions.length;

  return (
    <main
      style={themeVars}
      className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-[family-name:var(--font-body)] antialiased"
    >
      <p role="status" aria-live="polite" className="sr-only">
        Pertanyaan {currentStep + 1} dari {totalQuestions}
      </p>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--line)]">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              onClick={handleLeaveQuiz}
              aria-label="Kembali ke beranda"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-[var(--ink-soft)]">
              {String(currentStep + 1).padStart(2, "0")} / {String(totalQuestions).padStart(2, "0")}
            </span>
            <div className="w-9" aria-hidden />
          </div>

          {/* Segmented progress bar */}
          <div
            className="flex gap-1.5"
            role="progressbar"
            aria-valuenow={currentStep + 1}
            aria-valuemin={1}
            aria-valuemax={totalQuestions}
          >
            {displayQuestions.map((_, idx) => (
              <div key={`progress-${idx}`} className="h-1.5 flex-1 rounded-full bg-[var(--line)] overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--orange)]"
                  initial={{ width: idx < currentStep ? "100%" : "0%" }}
                  animate={{ width: idx <= currentStep ? "100%" : "0%" }}
                  transition={{ duration: reduceMotion ? 0 : 0.35 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Question content */}
      <div className="max-w-2xl mx-auto px-4 py-10 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={reduceMotion ? {} : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Question card */}
            <div className="bg-[var(--paper)] rounded-2xl p-7 md:p-8 border border-[var(--line)] shadow-[4px_4px_0_0_var(--line)]">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[var(--orange)]/10 text-[var(--orange-dark)] text-[11px] font-bold uppercase tracking-wider mb-4">
                {formatCategory(currentQuestion.category)}
              </span>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold leading-snug focus:outline-none"
              >
                {currentQuestion.text}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isDimmed = isAnimating && !isSelected;

                return (
                  <motion.button
                    key={`${currentQuestion.id}-opt-${idx}`}
                    initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
                    animate={{ opacity: isDimmed ? 0.4 : 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : idx * 0.06 }}
                    onClick={() => handleAnswer(option.score, idx)}
                    disabled={isAnimating}
                    aria-pressed={isSelected}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] focus-visible:ring-offset-2 ${
                      isSelected
                        ? "border-[var(--orange)] bg-[var(--orange)]/5"
                        : "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--orange)]/50 hover:-translate-y-0.5 hover:shadow-md"
                    }`}
                  >
                    <span
                      className={`font-semibold text-base md:text-lg ${
                        isSelected ? "text-[var(--orange-dark)]" : "text-[var(--ink)]"
                      }`}
                    >
                      {option.text}
                    </span>
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-[var(--orange)] shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-[var(--ink-soft)]/40 shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Previous question */}
            {currentStep > 0 && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={isAnimating}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--ink-soft)] hover:text-[var(--orange)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed py-2 px-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Pertanyaan sebelumnya
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom hint bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[var(--bg)]/95 backdrop-blur-md border-t border-[var(--line)] py-4">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold text-[var(--ink-soft)] uppercase tracking-wider">
            Pilih jawaban yang paling menggambarkan dirimu
          </p>
        </div>
      </div>
    </main>
  );
}