"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Medal, 
  Award,
  ArrowLeft, 
  RotateCcw, 
  ExternalLink, 
  Camera, 
  Globe,
  Sparkles,
  Target
} from "lucide-react";
import Link from "next/link";
import { calculateMatches } from "@/lib/matching";
import { ORMAWA_LIST } from "@/data/ormawa";
import { MatchResult } from "@/types/quiz";
import { Ormawa } from "@/types/ormawa";

export default function ResultPage() {
  const router = useRouter();
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fullOrmawaData, setFullOrmawaData] = useState<Record<string, Ormawa>>({});

  useEffect(() => {
    const savedAnswers = sessionStorage.getItem("quizAnswers");
    
    if (!savedAnswers) {
      router.push("/quiz");
      return;
    }

    const answers = JSON.parse(savedAnswers);

    setTimeout(() => {
      const results = calculateMatches(answers, ORMAWA_LIST);
      setMatches(results);
      
      const ormawaMap: Record<string, Ormawa> = {};
      ORMAWA_LIST.forEach((ormawa) => {
        ormawaMap[ormawa.id] = ormawa;
      });
      setFullOrmawaData(ormawaMap);
      
      setIsLoading(false);
    }, 2000);
  }, [router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 rounded-full mx-auto mb-8"
          />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Menganalisis Profilmu...
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Mencocokkan dengan {ORMAWA_LIST.length} organisasi
          </p>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </motion.div>
      </main>
    );
  }

  const topMatch = matches[0];
  const secondMatch = matches[1];
  const thirdMatch = matches[2];
  const otherMatches = matches.slice(3);

  const topOrmawa = fullOrmawaData[topMatch?.ormawaId];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pb-12">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/quiz" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Hasil Kecocokan</h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* Hero Section - Top Match */}
        {topMatch && topOrmawa && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-30" />
            <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 md:p-10 text-white shadow-2xl overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl" />
              
              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Trophy className="w-4 h-4" />
                  REKOMENDASI #1 UNTUKMU
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black mb-3">{topMatch.name}</h2>
                    <p className="text-blue-100 text-lg mb-2">{topOrmawa.type}</p>
                    <p className="text-blue-50 mb-6 leading-relaxed">{topOrmawa.description}</p>
                    
                    {/* Score */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-6xl font-black">{topMatch.score}%</div>
                      <div className="text-blue-100">
                        <div className="font-semibold">Tingkat Kecocokan</div>
                        <div className="text-sm">Berdasarkan analisismu</div>
                      </div>
                    </div>

                    {/* Matched Skills */}
                    {topMatch.matchedSkills.length > 0 && (
                      <div className="mb-8">
                        <div className="text-sm text-blue-100 mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Skill yang cocok:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {topMatch.matchedSkills.map((skill, idx) => (
                            <span key={idx} className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {topOrmawa.instagram && (
                      <a 
                        href={`https://instagram.com/${topOrmawa.instagram.replace('@', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-white text-blue-600 font-bold py-4 px-6 rounded-2xl hover:bg-blue-50 transition-colors shadow-lg"
                      >
                        <Camera className="w-5 h-5" />
                        Kunjungi Instagram
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {topOrmawa.googleSite && (
                      <a 
                        href={topOrmawa.googleSite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white font-bold py-4 px-6 rounded-2xl hover:bg-white/20 transition-colors border-2 border-white/30"
                      >
                        <Globe className="w-5 h-5" />
                        Lihat Profil Lengkap
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

{/* Top 2 & 3 */}
<div className="grid md:grid-cols-2 gap-6">
  {secondMatch && (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center shadow-lg shrink-0">
          <Medal className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">#2</span>
            <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
              {fullOrmawaData[secondMatch.ormawaId]?.type}
            </span>
          </div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 truncate">
            {secondMatch.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {fullOrmawaData[secondMatch.ormawaId]?.description}
          </p>
          
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${secondMatch.score}%` }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"
              />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white w-16 text-right">
              {secondMatch.score}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )}

  {thirdMatch && (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg shrink-0">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">#3</span>
            <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
              {fullOrmawaData[thirdMatch.ormawaId]?.type}
            </span>
          </div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 truncate">
            {thirdMatch.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {fullOrmawaData[thirdMatch.ormawaId]?.description}
          </p>
          
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${thirdMatch.score}%` }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
              />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white w-16 text-right">
              {thirdMatch.score}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )}
</div>

        {/* Other Matches */}
        {otherMatches.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                ORMAWA LAINNYA YANG JUGA COCOK
              </h3>
            </div>
            
            <div className="space-y-3">
              {otherMatches.map((match, idx) => {
                const ormawa = fullOrmawaData[match.ormawaId];
                return (
                  <motion.div 
                    key={match.ormawaId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + (idx * 0.05) }}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-400">
                        {idx + 4}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {match.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{ormawa?.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${match.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300 w-12 text-right">
                        {match.score}%
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Footer Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col gap-4"
        >
          <button 
            onClick={() => {
              sessionStorage.removeItem("quizAnswers");
              router.push("/quiz");
            }}
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold py-4 px-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-3"
          >
            <RotateCcw className="w-5 h-5" />
            Ulangi Kuis
          </button>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              💡 <span className="font-semibold">Tips:</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hasil ini bersifat rekomendasi. Jangan ragu untuk mengeksplorasi organisasi lain yang menarik minatmu!
            </p>
          </div>
        </motion.div>

      </div>
    </main>
  );
}