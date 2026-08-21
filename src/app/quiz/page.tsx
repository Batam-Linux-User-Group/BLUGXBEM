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
  Wrench,
} from "lucide-react";

import Link from "next/link";

import { QUESTIONS } from "@/data/questions";
import { shuffleArray } from "@/lib/utils";
import { Answer, Question } from "@/types/quiz";

// =========================================================
// Helper kategori
// =========================================================

const formatCategory = (cat: string) => {
  return (
    cat.charAt(0).toUpperCase() +
    cat.slice(1).replace(/([A-Z])/g, " $1")
  );
};

// =========================================================
// Theme
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
  "--font-display":
    "var(--font-display, 'Space Grotesk'), sans-serif",
  "--font-body":
    "var(--font-body, 'Manrope'), sans-serif",
} as React.CSSProperties;

// =========================================================
// Jurusan
// =========================================================

const JURUSAN_LIST = [
  {
    id: "informatika",
    name: "Teknik Informatika",
    icon: Code,
  },
  {
    id: "manajemen_bisnis",
    name: "Manajemen Bisnis",
    icon: Briefcase,
  },
  {
    id: "elektro",
    name: "Teknik Elektro",
    icon: Zap,
  },
  {
    id: "mesin",
    name: "Teknik Mesin",
    icon: Wrench,
  },
];

// =========================================================
// Type peserta
// =========================================================

interface Participant {
  nama: string;
  nim: string;
  jurusan: string;
}

// =========================================================
// Quiz Page
// =========================================================

export default function QuizPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const headingRef = useRef<HTMLHeadingElement>(null);

  // =======================================================
  // State
  // =======================================================

  const [step, setStep] = useState<"participant" | "quiz">(
    "participant"
  );

  const [participant, setParticipant] =
    useState<Participant | null>(null);

  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [jurusan, setJurusan] = useState("");

  const [formError, setFormError] = useState("");

  const [displayQuestions, setDisplayQuestions] =
    useState<Question[]>([]);

  const [currentStep, setCurrentStep] = useState(0);

  const [answers, setAnswers] = useState<Answer[]>([]);

  const [isAnimating, setIsAnimating] = useState(false);

  const [selectedOption, setSelectedOption] =
    useState<number | null>(null);

  // =======================================================
  // 1. Cek apakah peserta sebelumnya sudah mengisi data
  // =======================================================

  useEffect(() => {
    const savedParticipant =
      sessionStorage.getItem("quizParticipant");

    if (!savedParticipant) return;

    try {
      const parsed = JSON.parse(
        savedParticipant
      ) as Participant;

      if (
        parsed.nama &&
        parsed.nim &&
        parsed.jurusan
      ) {
        setParticipant(parsed);
        setNama(parsed.nama);
        setNim(parsed.nim);
        setJurusan(parsed.jurusan);
      }
    } catch {
      sessionStorage.removeItem("quizParticipant");
    }
  }, []);

  // =======================================================
  // 2. Acak pertanyaan + opsi ketika quiz dimulai
  // =======================================================

  useEffect(() => {
    if (
      step === "quiz" &&
      displayQuestions.length === 0
    ) {
      const shuffled = shuffleArray(QUESTIONS).map(
        (question) => ({
          ...question,
          options: shuffleArray(question.options),
        })
      );

      setDisplayQuestions(shuffled);
    }
  }, [step, displayQuestions.length]);

  // =======================================================
  // 3. Tampilkan kembali jawaban saat kembali ke soal
  // =======================================================

  useEffect(() => {
    if (displayQuestions.length === 0) return;

    const question =
      displayQuestions[currentStep];

    if (!question) return;

    const existing = answers.find(
      (answer) =>
        answer.questionId === question.id
    );

    const matchedIdx = existing
      ? question.options.findIndex(
          (option) =>
            option.score === existing.score
        )
      : -1;

    setSelectedOption(
      matchedIdx >= 0 ? matchedIdx : null
    );

    headingRef.current?.focus();
  }, [
    currentStep,
    displayQuestions,
    answers,
  ]);

  // =======================================================
  // 4. Mulai quiz
  // =======================================================

  const handleStartQuiz = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setFormError("");

    // Validasi nama
    if (!nama.trim()) {
      setFormError(
        "Nama lengkap wajib diisi."
      );
      return;
    }

    // Validasi NIM
    if (!nim.trim()) {
      setFormError(
        "NIM wajib diisi."
      );
      return;
    }

    // Validasi jurusan
    if (!jurusan) {
      setFormError(
        "Silakan pilih jurusan terlebih dahulu."
      );
      return;
    }

    const participantData: Participant = {
      nama: nama.trim(),
      nim: nim.trim(),
      jurusan,
    };

    // Simpan data peserta
    sessionStorage.setItem(
      "quizParticipant",
      JSON.stringify(participantData)
    );

    // Tetapkan state peserta
    setParticipant(participantData);

    // Masuk ke quiz
    setStep("quiz");
  };

  // =======================================================
  // 5. Pilih jawaban
  // =======================================================

  const handleAnswer = (
    score: number,
    optionIndex: number
  ) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setSelectedOption(optionIndex);

    const currentQuestion =
      displayQuestions[currentStep];

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      category: currentQuestion.category,
      score,
    };

    const updatedAnswers = [
      ...answers.filter(
        (answer) =>
          answer.questionId !==
          currentQuestion.id
      ),
      newAnswer,
    ];

    setAnswers(updatedAnswers);

    setTimeout(() => {
      // Masih ada soal
      if (
        currentStep <
        displayQuestions.length - 1
      ) {
        setCurrentStep(
          (prev) => prev + 1
        );
      }

      // Soal terakhir
      else {
        // Simpan jawaban
        sessionStorage.setItem(
          "quizAnswers",
          JSON.stringify(updatedAnswers)
        );

        // Pastikan participant tersimpan
        if (participant) {
          sessionStorage.setItem(
            "quizParticipant",
            JSON.stringify(participant)
          );
        }

        // Pindah ke halaman hasil
        router.push("/result");
      }

      setIsAnimating(false);
    }, 500);
  };

  // =======================================================
  // 6. Kembali ke soal sebelumnya
  // =======================================================

  const handlePrevious = () => {
    if (
      isAnimating ||
      currentStep === 0
    ) {
      return;
    }

    setCurrentStep(
      (prev) => prev - 1
    );
  };

  // =======================================================
  // 7. Keluar dari quiz
  // =======================================================

  const handleLeaveQuiz = (
    e: React.MouseEvent
  ) => {
    if (answers.length > 0) {
      const confirmed =
        window.confirm(
          "Progres kuismu belum selesai. Yakin mau keluar dan kembali ke beranda?"
        );

      if (!confirmed) {
        e.preventDefault();
      }
    }
  };

  // =========================================================
  // TAMPILAN 1
  // FORM DATA PESERTA
  // =========================================================

  if (step === "participant") {
    return (
      <main
        style={themeVars}
        className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-[family-name:var(--font-body)] antialiased flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--line)]">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
            <Link
              href="/"
              aria-label="Kembali ke beranda"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <h1 className="font-[family-name:var(--font-display)] text-lg font-bold">
              Mulai Quiz Gopo
            </h1>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center p-4 py-10">
          <motion.div
            initial={
              reduceMotion
                ? {}
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="max-w-2xl w-full"
          >
            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold mb-3">
                Sebelum Kita Mulai
              </h2>

              <p className="text-[var(--ink-soft)] text-base md:text-lg max-w-xl mx-auto">
                Isi data dirimu terlebih dahulu.
                Jawabanmu akan digunakan untuk
                menemukan ORMAWA yang paling
                cocok untukmu.
              </p>
            </div>

            {/* Card */}
            <form
              onSubmit={handleStartQuiz}
              className="bg-[var(--paper)] rounded-2xl p-6 md:p-8 border border-[var(--line)] shadow-[4px_4px_0_0_var(--line)] space-y-6"
            >
              {/* Nama */}
              <div>
                <label
                  htmlFor="nama"
                  className="block text-sm font-bold mb-2"
                >
                  Nama Lengkap
                </label>

                <input
                  id="nama"
                  type="text"
                  value={nama}
                  onChange={(e) =>
                    setNama(e.target.value)
                  }
                  placeholder="Masukkan nama lengkap"
                  autoComplete="name"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 outline-none transition-all focus:border-[var(--orange)] focus:ring-2 focus:ring-[var(--orange)]/10"
                />
              </div>

              {/* NIM */}
              <div>
                <label
                  htmlFor="nim"
                  className="block text-sm font-bold mb-2"
                >
                  NIM
                </label>

                <input
                  id="nim"
                  type="text"
                  value={nim}
                  onChange={(e) =>
                    setNim(e.target.value)
                  }
                  placeholder="Masukkan NIM"
                  autoComplete="off"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 outline-none transition-all focus:border-[var(--orange)] focus:ring-2 focus:ring-[var(--orange)]/10"
                />
              </div>

              {/* Jurusan */}
              <div>
                <label className="block text-sm font-bold mb-3">
                  Jurusan
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {JURUSAN_LIST.map(
                    (item) => {
                      const Icon =
                        item.icon;

                      const isSelected =
                        jurusan ===
                        item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setJurusan(
                              item.id
                            );
                            setFormError("");
                          }}
                          className={`relative p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                            isSelected
                              ? "border-[var(--orange)] bg-[var(--orange)]/5"
                              : "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--orange)]/50"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center border transition-colors ${
                              isSelected
                                ? "bg-[var(--orange)]/10 border-[var(--orange)] text-[var(--orange)]"
                                : "bg-[var(--bg)] border-[var(--line)] text-[var(--ink-soft)]"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>

                          <span
                            className={`font-semibold text-sm ${
                              isSelected
                                ? "text-[var(--orange-dark)]"
                                : "text-[var(--ink)]"
                            }`}
                          >
                            {item.name}
                          </span>

                          {isSelected && (
                            <CheckCircle2 className="absolute right-3 top-3 w-5 h-5 text-[var(--orange)]" />
                          )}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Error */}
              {formError && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[var(--orange)] text-white font-bold py-4 px-5 rounded-xl hover:bg-[var(--orange-dark)] transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Mulai Quiz
                <ChevronRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-center text-[var(--ink-soft)]">
                Quiz terdiri dari{" "}
                <strong>
                  {QUESTIONS.length}
                </strong>{" "}
                pertanyaan.
              </p>
            </form>
          </motion.div>
        </div>
      </main>
    );
  }

  // =========================================================
  // TAMPILAN 2
  // LOADING
  // =========================================================

  if (
    displayQuestions.length === 0
  ) {
    if (QUESTIONS.length === 0) {
      return (
        <main
          style={themeVars}
          className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-6"
        >
          <div className="text-center max-w-xs">
            <div className="w-14 h-14 rounded-full bg-[var(--orange)]/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-[var(--orange)]" />
            </div>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2 text-[var(--ink)]">
              Kuis belum tersedia
            </h2>

            <p className="text-[var(--ink-soft)] text-sm mb-6">
              Sepertinya belum ada
              pertanyaan yang bisa
              ditampilkan saat ini.
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
      <main
        style={themeVars}
        className="min-h-screen bg-[var(--bg)] flex items-center justify-center"
      >
        <motion.div
          initial={
            reduceMotion
              ? {}
              : {
                  opacity: 0,
                  scale: 0.9,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
          }}
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

  // =========================================================
  // TAMPILAN 3
  // KUIS
  // =========================================================

  const currentQuestion =
    displayQuestions[currentStep];

  const totalQuestions =
    displayQuestions.length;

  return (
    <main
      style={themeVars}
      className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-[family-name:var(--font-body)] antialiased"
    >
      <p
        role="status"
        aria-live="polite"
        className="sr-only"
      >
        Pertanyaan {currentStep + 1} dari{" "}
        {totalQuestions}
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

            <div className="text-center">
              <span className="font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-[var(--ink-soft)]">
                {String(
                  currentStep + 1
                ).padStart(2, "0")}{" "}
                /{" "}
                {String(
                  totalQuestions
                ).padStart(2, "0")}
              </span>
            </div>

            <div className="w-9" />
          </div>

          {/* Progress */}
          <div
            className="flex gap-1.5"
            role="progressbar"
            aria-valuenow={
              currentStep + 1
            }
            aria-valuemin={1}
            aria-valuemax={
              totalQuestions
            }
          >
            {displayQuestions.map(
              (_, idx) => (
                <div
                  key={`progress-${idx}`}
                  className="h-1.5 flex-1 rounded-full bg-[var(--line)] overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-[var(--orange)]"
                    initial={{
                      width:
                        idx < currentStep
                          ? "100%"
                          : "0%",
                    }}
                    animate={{
                      width:
                        idx <= currentStep
                          ? "100%"
                          : "0%",
                    }}
                    transition={{
                      duration:
                        reduceMotion
                          ? 0
                          : 0.35,
                    }}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto px-4 py-10 pb-32">
        <AnimatePresence
          mode="wait"
        >
          <motion.div
            key={
              currentQuestion.id
            }
            initial={
              reduceMotion
                ? {}
                : {
                    opacity: 0,
                    x: 24,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={
              reduceMotion
                ? {}
                : {
                    opacity: 0,
                    x: -24,
                  }
            }
            transition={{
              duration: 0.25,
            }}
            className="space-y-6"
          >
            {/* Question Card */}
            <div className="bg-[var(--paper)] rounded-2xl p-7 md:p-8 border border-[var(--line)] shadow-[4px_4px_0_0_var(--line)]">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[var(--orange)]/10 text-[var(--orange-dark)] text-[11px] font-bold uppercase tracking-wider mb-4">
                {formatCategory(
                  currentQuestion.category
                )}
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
              {currentQuestion.options.map(
                (option, idx) => {
                  const isSelected =
                    selectedOption ===
                    idx;

                  const isDimmed =
                    isAnimating &&
                    !isSelected;

                  return (
                    <motion.button
                      key={`${currentQuestion.id}-opt-${idx}`}
                      initial={
                        reduceMotion
                          ? {}
                          : {
                              opacity: 0,
                              y: 8,
                            }
                      }
                      animate={{
                        opacity:
                          isDimmed
                            ? 0.4
                            : 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          reduceMotion
                            ? 0
                            : idx *
                              0.06,
                      }}
                      onClick={() =>
                        handleAnswer(
                          option.score,
                          idx
                        )
                      }
                      disabled={
                        isAnimating
                      }
                      aria-pressed={
                        isSelected
                      }
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] focus-visible:ring-offset-2 ${
                        isSelected
                          ? "border-[var(--orange)] bg-[var(--orange)]/5"
                          : "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--orange)]/50 hover:-translate-y-0.5 hover:shadow-md"
                      }`}
                    >
                      <span
                        className={`font-semibold text-base md:text-lg ${
                          isSelected
                            ? "text-[var(--orange-dark)]"
                            : "text-[var(--ink)]"
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
                }
              )}
            </div>

            {/* Previous */}
            {currentStep > 0 && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={
                    handlePrevious
                  }
                  disabled={
                    isAnimating
                  }
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--ink-soft)] hover:text-[var(--orange)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed py-2 px-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Pertanyaan
                  sebelumnya
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Hint */}
      <div className="fixed bottom-0 left-0 right-0 bg-[var(--bg)]/95 backdrop-blur-md border-t border-[var(--line)] py-4">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold text-[var(--ink-soft)] uppercase tracking-wider">
            Pilih jawaban yang paling
            menggambarkan dirimu
          </p>
        </div>
      </div>
    </main>
  );
}