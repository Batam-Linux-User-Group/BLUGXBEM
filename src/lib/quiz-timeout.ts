// lib/quiz-timeout.ts

const STORAGE_KEY = 'quizStartTime';

export const quizTimeout = {
  // Set waktu mulai quiz (3 hari dari sekarang)
  setStartTime: (): void => {
    const startTime = Date.now();
    localStorage.setItem(STORAGE_KEY, startTime.toString());
  },

  // Ambil waktu mulai
  getStartTime: (): number | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : null;
  },

  // Cek apakah masih dalam batas waktu (3 hari)
  isWithinLimit: (): boolean => {
    const startTime = quizTimeout.getStartTime();
    if (!startTime) return false;

    const threeDaysInMs = 3 * 24 * 60 * 60 * 1000; // 3 hari dalam milidetik
    const currentTime = Date.now();
    
    return (currentTime - startTime) < threeDaysInMs;
  },

  // Cek sisa waktu dalam format yang lebih mudah dibaca
  getRemainingTime: (): string | null => {
    const startTime = quizTimeout.getStartTime();
    if (!startTime) return null;

    const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
    const currentTime = Date.now();
    const remaining = threeDaysInMs - (currentTime - startTime);

    if (remaining <= 0) return '0';

    const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));

    if (days > 0) return `${days} hari ${hours} jam`;
    if (hours > 0) return `${hours} jam ${minutes} menit`;
    return `${minutes} menit`;
  },

  // Hapus data quiz (ketika selesai atau reset)
  clearQuizData: (): void => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('quizParticipant');
    localStorage.removeItem('quizAnswers');
  },

  // Reset quiz untuk memulai dari awal
  resetQuiz: (): void => {
    quizTimeout.clearQuizData();
  },

  // Cek apakah user bisa mengakses quiz
  canAccessQuiz: (): { allowed: boolean; message?: string } => {
    const startTime = quizTimeout.getStartTime();
    
    // Belum pernah mulai quiz
    if (!startTime) {
      return { allowed: true };
    }

    // Cek batas waktu
    if (!quizTimeout.isWithinLimit()) {
      return { 
        allowed: false, 
        message: `Waktu quiz sudah habis! Quiz hanya tersedia selama 3 hari.`
      };
    }

    return { allowed: true };
  }
};