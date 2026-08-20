"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Users, 
  Calendar, 
  Camera, 
  Link as LinkIcon, 
  Globe, 
  ArrowLeft,
  MapPin
} from "lucide-react";
import Link from "next/link";
import { ORMAWA_LIST } from "@/data/ormawa";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter ORMAWA berdasarkan pencarian
  const filteredOrmawa = ORMAWA_LIST.filter((ormawa) =>
    ormawa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ormawa.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ormawa.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Jelajahi ORMAWA</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Temukan komunitas yang tepat untukmu</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama ORMAWA, jenis (BEM, UKM, HMJ)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredOrmawa.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tidak ditemukan</h3>
            <p className="text-gray-500 dark:text-gray-400">Coba gunakan kata kunci lain untuk mencari ORMAWA.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrmawa.map((ormawa, index) => (
              <motion.div
                key={ormawa.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Card Header */}
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      ormawa.type === "BEM" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" :
                      ormawa.type === "DPM" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" :
                      ormawa.type === "HMJ" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
                      ormawa.type === "LPM" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" :
                      "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    }`}>
                      {ormawa.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {ormawa.name}
                  </h3>
                  {ormawa.tagline && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-3">"{ormawa.tagline}"</p>
                  )}
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 leading-relaxed">
                    {ormawa.description}
                  </p>

                  {/* Focus Areas Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ormawa.focusAreas.slice(0, 3).map((area, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
                        {area}
                      </span>
                    ))}
                    {ormawa.focusAreas.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
                        +{ormawa.focusAreas.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer / Actions */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex gap-3">
                    {ormawa.instagram && (
                      <a 
                        href={`https://instagram.com/${ormawa.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white dark:bg-gray-700 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 border border-gray-200 dark:border-gray-600 transition-colors"
                        title="Instagram"
                      >
                        <Camera className="w-4 h-4" />
                      </a>
                    )}
                    {ormawa.linktree && (
                      <a 
                        href={ormawa.linktree}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 border border-gray-200 dark:border-gray-600 transition-colors"
                        title="Linktree"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </a>
                    )}
                    {ormawa.googleSite && (
                      <a 
                        href={ormawa.googleSite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-600 transition-colors"
                        title="Website"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  
                  <Link href={`/quiz`}>
                    <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors">
                      Cocok? <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}