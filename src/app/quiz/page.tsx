"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { QUESTIONS } from "@/data/questions";
import { Answer } from "@/types/quiz";

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleAnswer = (score: number, optionIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedOption(optionIndex);

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      category: currentQuestion.category,
      score,
    };

    const updatedAnswers = [...answers.filter(a => a.questionId !== currentQuestion.id), newAnswer];
    setAnswers(updatedAnswers);

    setTimeout(() => {
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(prev => prev + 1);
        setSelectedOption(null);
      } else {
        sessionStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers));
        router.push("/result");
      }
      setIsAnimating(false);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Pertanyaan {currentStep + 1} dari {QUESTIONS.length}
            </span>
            <div className="w-9" /> {/* Spacer untuk centering */}
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Question Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                {currentQuestion.text}
              </h2>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium capitalize">
                Kategori: {currentQuestion.category}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleAnswer(option.score, idx)}
                  disabled={isAnimating}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 group relative overflow-hidden ${
                    selectedOption === idx
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg"
                  } ${isAnimating && selectedOption !== idx ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <span className={`font-semibold text-lg ${
                      selectedOption === idx
                        ? "text-blue-900 dark:text-blue-100"
                        : "text-gray-900 dark:text-white"
                    }`}>
                      {option.text}
                    </span>
                    {selectedOption === idx && (
                      <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    )}
                    {selectedOption !== idx && (
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    )}
                  </div>
                  
                  {/* Background animation */}
                  {selectedOption === idx && (
                    <motion.div
                      layoutId="selectedOption"
                      className="absolute inset-0 bg-blue-600/5"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Info */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Pilih jawaban yang paling menggambarkan dirimu
          </p>
        </div>
      </div>

      {/* Bottom padding for fixed footer */}
      <div className="h-20" />
    </main>
  );
}