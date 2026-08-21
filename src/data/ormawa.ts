import { Ormawa } from "@/types/ormawa";

export const ORMAWA_LIST: Ormawa[] = [
  // ============================================
  // DPM - Dewan Perwakilan Mahasiswa
  // ============================================
  {
    id: "dpm",
    name: "Dewan Perwakilan Mahasiswa",
    logo: "/logos/DPM.png",
    shortName: "DPM",
    type: "Legislatif",
    tagline: "Viva Legislativa",
    description: "Dewan Perwakilan Mahasiswa adalah organisasi yang bersifat aspiratif, demokratis, dan independen. DPM berfokus untuk mengawasi seluruh organisasi keluarga mahasiswa, memberikan pelayanan aspirasi kepada mahasiswa Polibatam, dan memberikan hasil dalam pengelolaan data, informasi, dan laporan kepada keluarga mahasiswa sebagai bentuk pertanggungjawaban.",
    focusAreas: ["Kepemimpinan & Organisasi", "Advokasi & Representasi Mahasiswa"],
    uniqueCharacteristics: [
      "Berfokus pada pengawasan seluruh organisasi mahasiswa",
      "Menjadi wadah mahasiswa untuk menyampaikan aspirasi",
      "Memiliki fungsi legislasi dalam perundang-undangan Mahasiswa Polibatam"
    ],
    flagshipPrograms: [
      "Ruang Suara Mahasiswa - Kegiatan yang memberikan ruang kepada mahasiswa untuk menyampaikan aspirasi",
      "Refleksi dan Sinergi DPM - Kegiatan mengevaluasi organisasi, memperkuat sinergi antar lembaga mahasiswa"
    ],
    gallery: ["/gallery/dpm/kegiatan-1.jpeg", "/gallery/dpm/kegiatan-2.jpeg", "/gallery/dpm/kegiatan-3.jpeg", "/gallery/dpm/kegiatan-4.jpeg"],
    skills: {
      leadership: 9,
      publicSpeaking: 8,
      communication: 9,
      teamwork: 8,
      problemSolving: 9
    },
    suitableFor: ["Suka memimpin & berorganisasi", "Suka berkomunikasi & bertemu orang baru", "Suka belajar & berdiskusi"],
    instagram: "@dpmpolibatam",
    contactPerson: "+62 896-2327-7002 (Nadhira)"
  },

  // ============================================
  // BEM - Badan Eksekutif Mahasiswa
  // ============================================
  {
    id: "bem-polibatam",
    name: "Badan Eksekutif Mahasiswa",
    logo: "/logos/BEM.png",
    shortName: "BEM",
    type: "Eksekutif",
    tagline: "Artha Vardhana: Inisiatif Nyata, Masa Depan Tercipta!",
    description: "Badan Eksekutif Mahasiswa (BEM) Politeknik Negeri Batam merupakan organisasi mahasiswa yang menjadi wadah bagi mahasiswa untuk menyampaikan aspirasi, mengembangkan potensi, serta berkontribusi dalam menciptakan lingkungan kampus yang aktif dan kolaboratif.",
    focusAreas: ["Kepemimpinan & Organisasi", "Akademik & Pendidikan", "Teknologi & Digital", "Sosial & Pengabdian", "Advokasi & Representasi Mahasiswa"],
    uniqueCharacteristics: [
      "Wadah aspirasi dan advokasi mahasiswa – menjadi jembatan antara mahasiswa dengan pihak kampus",
      "Berorientasi pada kolaborasi dan kontribusi – aktif membangun kerjasama dengan berbagai pihak",
      "Ruang bertumbuh bagi mahasiswa – membantu mengembangkan kepemimpinan, komunikasi, dan kemampuan bekerja dalam tim"
    ],
    flagshipPrograms: [
      "PKKMB & Penyambutan Mahasiswa Baru - Kegiatan untuk menyambut dan membantu mahasiswa baru mengenal lingkungan kampus, budaya akademik, serta kehidupan organisasi di Politeknik Negeri Batam.",
      "Pengabdian BEM - Kegiatan mahasiswa yang turun langsung ke masyarakat untuk memberikan kontribusi melalui edukasi, aksi sosial, pemberdayaan, dan berbagai kegiatan yang sesuai dengan kebutuhan masyarakat.",
      "Polibatam Fair (PBF) - Agenda tahunan Politeknik Negeri Batam yang melibatkan seluruh ORMAWA dalam menyelenggarakan berbagai perlombaan untuk mahasiswa. Kegiatan berlangsung kurang lebih selama satu bulan dan dilaksanakan secara offline, dengan kepanitiaan yang bekerja sama dengan pihak manajemen kampus. Rangkaian kegiatan ditutup dengan malam puncak sebagai ajang pengumuman dan apresiasi bagi para pemenang lomba.",
      "Gathering Ormawa - Kegiatan yang bertujuan mempererat hubungan antar Ormawa, membangun kekompakan, sekaligus menjadi ruang untuk berbagi pengalaman, berdiskusi, dan mengembangkan."
    ],
    gallery: ["/gallery/bem/kegiatan-1-baru.jpg", "/gallery/bem/kegiatan-2-baru.jpg", "/gallery/bem/kegiatan-3-baru.jpg", "/gallery/bem/kegiatan-4-baru.jpg", "/gallery/bem/kegiatan-5-baru.jpg", "/gallery/bem/kegiatan-6-baru.jpg", "/gallery/bem/kegiatan-7-baru.jpg", "/gallery/bem/kegiatan-8-baru.jpg"],
    skills: {
      leadership: 10,
      publicSpeaking: 9,
      communication: 9,
      teamwork: 9,
      eventManagement: 10,
      problemSolving: 8,
      networking: 10,
      organizationManagement: 9
    },
    suitableFor: ["Suka memimpin & berorganisasi", "Suka berkomunikasi & bertemu orang baru", "Suka membuat acara & bekerja dalam tim", "Suka belajar & berdiskusi", "Suka membantu & berkontribusi untuk masyarakat"],
    achievements: ["Program Penguatan Kapasitas Organisasi Kemahasiswaan (PPKO) 2025-2026"],
    instagram: "@bempolibatam",
    contactPerson: "+62 821-7841-1690 (Fiona Margareth)"
  },

  // ============================================
  // HMMB - Himpunan Mahasiswa Manajemen Bisnis
  // ============================================
  {
    id: "hmmb",
    name: "Himpunan Mahasiswa Manajemen Bisnis",
    shortName: "HMMB",
    logo: "/logos/HMMB.png",
    type: "HMJ",
    tagline: "HMMB, Dahsyat (3x)",
    description: "Himpunan Mahasiswa Manajemen Bisnis (HMMB) Politeknik Negeri Batam merupakan organisasi mahasiswa yang menjadi wadah bagi mahasiswa/i Jurusan Manajemen Bisnis untuk berkembang, berkolaborasi, dan menyalurkan aspirasi.",
    focusAreas: ["Kepemimpinan & Organisasi", "Akademik & Pendidikan", "Sosial & Pengabdian", "Komunikasi, Media & Jurnalistik", "Advokasi & Representasi Mahasiswa"],
    uniqueCharacteristics: [
      "Berorientasi pada Pengembangan Mahasiswa",
      "Solid dan Kolaboratif",
      "Aktif, Kreatif, dan Adaptif"
    ],
    flagshipPrograms: [
  "Pengaderan Jurusan Manajemen Bisnis (PJMB) - Kegiatan menyambut mahasiswa/i baru Manajemen Bisnis.",
  "Business Agent's Leading Competition (BALANCE) - Perlombaan akademik yang diselenggarakan setiap tahun dengan skala Nasional."
],
    gallery: ["/gallery/hmmb/kegiatan-1.png", "/gallery/hmmb/kegiatan-2.jpg", "/gallery/hmmb/kegiatan-3.jpeg", "/gallery/hmmb/kegiatan-4.jpg"],
    skills: {
      leadership: 8,
      publicSpeaking: 8,
      communication: 9,
      teamwork: 9,
      eventManagement: 9,
      problemSolving: 8,
      networking: 9,
      design: 8,
      contentCreation: 8,
      entrepreneurship: 10,
      research: 8,
      technicalSkill: 8,
      creativity: 8,
      organizationManagement: 8
    },
    suitableFor: ["Suka memimpin & berorganisasi", "Suka berkomunikasi & bertemu orang baru", "Suka belajar & berdiskusi", "Tertarik bisnis & kewirausahaan", "Suka membantu & berkontribusi untuk masyarakat"],
    achievements: ["Juara 4 PPK ORMAWA Nasional - 2025"],
    instagram: "@hmmbpolibatam",
    tiktok: "@hmmbpolibatam",
    youtube: "HMMB Polibatam",
    contactPerson: "+62 821-7071-254 (HMMB Contact)"
  },

  // ============================================
  // HMTI - Himpunan Mahasiswa Teknik Informatika
  // ============================================
  {
    id: "hmti",
    name: "Himpunan Mahasiswa Teknik Informatika",
    logo: "/logos/HMTI.png",
    shortName: "HMTI",
    type: "HMJ",
    tagline: "Informatika Kita Beda, Informatika Kita Satu",
    description: "Himpunan Mahasiswa Teknik Informatika (HMTI) adalah ormawa yang menjadi wadah bagi seluruh mahasiswa Jurusan Teknik Informatika di Politeknik Negeri Batam.",
    focusAreas: ["Kepemimpinan & Organisasi", "Akademik & Pendidikan", "Teknologi & Digital", "Teknik & Keahlian Terapan", "Advokasi & Representasi Mahasiswa"],
    uniqueCharacteristics: [
      "Fokus pada pengembangan kepemimpinan",
      "Menjadi rumah bagi warga teknik informatika",
      "Raih sema bersama, bersatu, berhimpun"
    ],
    flagshipPrograms: [
  "HMTI Fair - Kegiatan perlombaan dan hiburan untuk mengembangkan minat, bakat, serta kreativitas siswa/i SMA/SMK/MA se-Kepulauan Riau.",
  "Pengaderan HMTI - Kegiatan pembinaan mahasiswa baru Jurusan Teknik Informatika untuk mengenal Jurusan Informatika, HMTI, membangun solidaritas, dan mengembangkan jiwa kepemimpinan.",
  "Pengabdian Eksternal - Kegiatan sosial HMTI di luar kampus sebagai bentuk kontribusi dan kepedulian kepada masyarakat."
],
    gallery: ["/gallery/hmti/kegiatan-1.jpeg", "/gallery/hmti/kegiatan-2.jpeg", "/gallery/hmti/kegiatan-3.jpeg", "/gallery/hmti/kegiatan-4.jpeg", "/gallery/hmti/kegiatan-5.jpeg", "/gallery/hmti/kegiatan-6.jpeg", "/gallery/hmti/kegiatan-7.jpeg", "/gallery/hmti/kegiatan-8.jpeg"],
    skills: {
      leadership: 7,
      publicSpeaking: 5,
      communication: 6,
      teamwork: 7,
      eventManagement: 7,
      problemSolving: 8,
      networking: 8,
      design: 6,
      contentCreation: 6,
      entrepreneurship: 6,
      research: 7,
      technicalSkill: 10,
      creativity: 6,
      organizationManagement: 7
    },
    suitableFor: ["Suka memimpin & berorganisasi", "Suka berkomunikasi & bertemu orang baru", "Suka membuat acara & bekerja dalam tim", "Suka belajar & berdiskusi", "Tertarik teknologi & hal teknis", "Suka berkarya & berkreasi", "Tertarik bisnis & kewirausahaan", "Suka membantu & berkontribusi untuk masyarakat", "Tertarik seni, media & publikasi"],
    achievements: ["Juara Pekan Olahraga Mahasiswa 2025", "Juara Futsal Ormawa Cup 2023", "Hima Terbaik 2025"],
    instagram: "@hmtipolibatam",
    contactPerson: "+62 819-9214-1464 (Sirojul Afkar Pradan)"
  },

  // ============================================
  // HME - Himpunan Mahasiswa Elektro
  // ============================================
  {
    id: "hme",
    name: "Himpunan Mahasiswa Elektro",
    logo: "/logos/HME.png",
    shortName: "HME",
    type: "HMJ",
    tagline: "Salam Kompak = Kompak Selalu",
    description: "Himpunan Mahasiswa Elektro (HME) Politeknik Negeri Batam merupakan organisasi kemahasiswaan yang menaungi seluruh mahasiswa Jurusan Teknik Elektro.",
    focusAreas: ["Kepemimpinan & Organisasi", "Akademik & Pendidikan", "Teknologi & Digital", "Teknik & Keahlian Terapan", "Sosial & Pengabdian", "Olahraga"],
    departments: ["PENMU", "KOMINFO", "PSDM", "SOSMA"],
    uniqueCharacteristics: [
      "Memiliki 4 departemen dengan fokus jelas (PENMU, KOMINFO, PSDM, SOSMA)",
      "Menjadi wadah aspirasi mahasiswa Elektro yang inklusif dan responsif",
      "Berorientasi pada regenerasi berkelanjutan dengan mempersiapkan kader-kader kompeten"
    ],
    flagshipPrograms: [
  "Teknologi Tepat Guna - Kegiatan yang mengembangkan, mengkompetisikan, dan menampilkan inovasi yang dirancang sesuai dengan kebutuhan masyarakat.",
  "HME Fair - Wadah bagi mahasiswa Politeknik Negeri Batam dalam mengekspresikan minat dan bakat serta kreativitas sekaligus sarana untuk meningkatkan tali silaturahmi, persaudaraan dan solidaritas antar mahasiswa, alumni, civitas akademi jurusan teknik elektro Politeknik Negeri Batam dan juga memperluas jaringan ke masyarakat umum.",
  "Program Tri Dharma - Program kerja yang berfokus pada pelaksanaan kegiatan pendidikan, penelitian sederhana, dan pengabdian kepada masyarakat di luar kampus, khususnya di desa, kampung, atau panti sosial. Program ini bertujuan agar mahasiswa Teknik Elektro dapat menerapkan ilmu yang dimiliki untuk membantu dan memberdayakan masyarakat."
],
    gallery: ["/gallery/hme/kegiatan-1.jpg", "/gallery/hme/kegiatan-2.png", "/gallery/hme/kegiatan-3.jpg"],
    skills: {
      leadership: 7,
      publicSpeaking: 5,
      communication: 5,
      teamwork: 7,
      eventManagement: 6,
      problemSolving: 7,
      networking: 6,
      technicalSkill: 10,
      creativity: 6,
      organizationManagement: 7
    },
    suitableFor: ["Suka memimpin & berorganisasi", "Suka berkomunikasi & bertemu orang baru", "Suka membuat acara & bekerja dalam tim", "Suka belajar & berdiskusi", "Tertarik teknologi & hal teknis", "Suka berkarya & berkreasi", "Tertarik bisnis & kewirausahaan", "Suka membantu & berkontribusi untuk masyarakat", "Tertarik olahraga & aktivitas fisik", "Tertarik seni, media & publikasi"],
    instagram: "@hme_polibatam",
    linktree: "https://linktr.ee/hmepolbat",
    contactPerson: "+62 853-6669-3212 (Fahmi A)"
  },

  // ============================================
  // HMM - Himpunan Mahasiswa Mesin
  // ============================================
  {
    id: "hmm",
    name: "Himpunan Mahasiswa Mesin",
    logo: "/logos/HMM.png",
    shortName: "HMM",
    type: "HMJ",
    tagline: "Mesin Mesin Mesin, Teknik Mesin We Are Solid",
    description: "Himpunan Mahasiswa Mesin (HMM) Politeknik Negeri Batam merupakan organisasi mahasiswa yang menjadi wadah bagi mahasiswa Jurusan Teknik Mesin untuk berkembang, berkolaborasi, serta menyalurkan aspirasi, minat, dan bakat.",
    focusAreas: ["Kepemimpinan & Organisasi", "Akademik & Pendidikan", "Teknik & Keahlian Terapan", "Sosial & Pengabdian", "Advokasi & Representasi Mahasiswa"],
    uniqueCharacteristics: [
      "Mengembangkan kemampuan akademik dan keterampilan mahasiswa Teknik Mesin",
      "Jadi wadah untuk belajar, berorganisasi, dan mengembangkan minat serta bakat",
      "Membangun solidaritas dan kebersamaan sebagai keluarga besar Teknik Mesin"
    ],
   flagshipPrograms: [
  "Bina Desa - Program kerja pengabdian masyarakat yang dilaksanakan di daerah atau pulau yang membutuhkan. Kegiatan ini berfokus pada kontribusi dan pemberdayaan masyarakat, termasuk membantu memperbaiki atau mengembangkan teknologi yang masih belum memadai di daerah tersebut.",
  "HMM Fest/ Fair - Program kerja berbasis perlombaan yang diselenggarakan secara bergantian setiap tahunnya. HMM Fest ditujukan bagi mahasiswa, sedangkan HMM Fair ditujukan bagi siswa SMA/SMK sederajat, dengan jenis dan tujuan perlombaan yang disesuaikan dengan konsep kegiatan pada setiap tahunnya."
],
    gallery: ["/gallery/hmm/kegiatan-1.jpeg", "/gallery/hmm/kegiatan-2.jpeg", "/gallery/hmm/kegiatan-3.jpeg", "/gallery/hmm/kegiatan-4.jpeg"],
    skills: {
      leadership: 9,
      publicSpeaking: 7,
      communication: 9,
      teamwork: 9,
      eventManagement: 9,
      problemSolving: 9,
      networking: 7,
      technicalSkill: 8,
      creativity: 6,
      organizationManagement: 7
    },
    suitableFor: ["Suka memimpin & berorganisasi", "Suka berkomunikasi & bertemu orang baru", "Suka membuat acara & bekerja dalam tim", "Suka belajar & berdiskusi", "Tertarik teknologi & hal teknis", "Tertarik bisnis & kewirausahaan", "Suka membantu & berkontribusi untuk masyarakat", "Tertarik olahraga & aktivitas fisik", "Tertarik seni, media & publikasi"],
    instagram: "@hmmpolbat",
    linktree: "https://linktr.ee/hmmpolbat26",
    contactPerson: "+62 887-7427-896 (Fattuh Fazariah)"
  },

  // ============================================
  // IMMPB - Ikatan Mahasiswa Muslim Polibatam
  // ============================================
  {
    id: "immpb",
    name: "Ikatan Mahasiswa Muslim Politeknik Negeri Batam",
    logo: "/logos/IMMPB.png",
    shortName: "IMMPB",
    type: "UKM",
    tagline: "Tiada Hari Tanpa Amal",
    description: "Ikatan Mahasiswa Muslim Politeknik Negeri Batam (IMMPB) adalah wadah bagi mahasiswa Muslim untuk belajar, bertumbuh, berkarya, dan berkontribusi bersama.",
    focusAreas: ["Kepemimpinan & Organisasi", "Akademik & Pendidikan", "Sosial & Pengabdian", "Seni & Kreativitas", "Keagamaan & Kerohanian"],
    uniqueCharacteristics: [
      "Membawa nilai-nilai Islam dalam kegiatan dan kehidupan kampus",
      "Menjadi ruang untuk mempererat ukhuwah dan menambah wawasan keislaman",
      "Mengajak mahasiswa untuk aktif dalam kegiatan yang positif dan bermanfaat"
    ],
   flagshipPrograms: [
  "Semarak Ramadan - Rangkaian kegiatan Ramadan seperti One Day One Juz, Malam Bina Iman dan Taqwa, serta bakti sosial. Mulai dari bersama-sama menyelesaikan bacaan Al-Qur'an, bermalam dan membangun kebersamaan di panti asuhan, hingga berbagi dan membantu sesama.",
  "Perayaan Hari Besar Islam (PHBI) - Kegiatan untuk memperingati Semarak Berkurban, Tahun Baru Islam, Maulid Nabi, dan Isra' Mi'raj melalui kajian, kegiatan keislaman dan berbagai aktivitas kebersamaan.",
  "IMMPB Islamic Festival (IFES) - Ajang perlombaan Islami bagi siswa/i SMA/SMK/MA sederajat se-Kota Batam sebagai wadah menyalurkan minat, bakat, dan semangat berkompetisi.",
  "Polibatam Berdzikir - Kegiatan keislaman dalam rangka menyambut mahasiswa baru, diisi dengan dzikir dan kegiatan bersama sebagai bagian dari penyambutan mahasiswa baru di Politeknik Negeri Batam."
],
    gallery: ["/gallery/immpb/kegiatan-1.jpg", "/gallery/immpb/kegiatan-2.jpg", "/gallery/immpb/kegiatan-3.jpg", "/gallery/immpb/kegiatan-4.jpeg", "/gallery/immpb/kegiatan-5.jpeg"],
    skills: {
      leadership: 8,
      publicSpeaking: 8,
      communication: 8,
      teamwork: 9,
      eventManagement: 9,
      problemSolving: 8,
      networking: 8,
      design: 5,
      contentCreation: 6,
      creativity: 7,
      organizationManagement: 8,
      social: 10
    },
    suitableFor: ["Suka memimpin & berorganisasi", "Suka berkomunikasi & bertemu orang baru", "Suka membuat acara & bekerja dalam tim", "Suka belajar & berdiskusi", "Suka membantu & berkontribusi untuk masyarakat"],
    achievements: [
      "Program Pemberdayaan Masyarakat Desa (P2MD) – 2022",
      "Publikasi ORMAWA Teraktif, Terkreatif, dan Terinovatif – 2025",
      "Juara 2 Voli Ormawa Cup – 2025"
    ],
    instagram: "@immpbpolibatam",
    tiktok: "@immpbpolibatam",
    youtube: "@immpbpolibatam",
    contactPerson: "+62 812-6191-1413 (Rivana Alwarid)"
  },

  // ============================================
  // PD El-Shaddai - Persekutuan Doa El-Shaddai
  // ============================================
  {
    id: "pd-elshaddai",
    name: "Persekutuan Doa El-Shaddai",
    shortName: "Pd. El-Shaddai",
    logo: "/logos/EL-SHADAI.png",
    type: "UKM",
    tagline: "El-Shaddai, In The Hand Of Warrior",
    description: "PD. EL-SHADDAI merupakan organisasi kristen di Politeknik Negeri Batam yang melakukan berbagai pelayanan di kampus, dimana fokus utamanya adalah melayani mahasiswa kristen dan juga masyarakat.",
    focusAreas: ["Keagamaan & Kerohanian", "Kepemimpinan & Organisasi", "Sosial & Pengabdian", "Seni & Kreativitas"],
    uniqueCharacteristics: [
      "Fokus pada pelayanan untuk mahasiswa kristen di Polibatam",
      "Melakukan banyak aktivitas sosial dan berbagai pelayanan dalam ruang lingkup kampus dan masyarakat",
      "Menjadi wadah bagi mahasiswa kristen untuk mengasah skill bernyanyi, musik, kepemimpinan, komunikasi dan masih banyak lagi"
    ],
    flagshipPrograms: [
  "Perayaan Paskah - Kegiatan merayakan kebangkitan Tuhan Yesus Kristus bersama mahasiswa.",
  "Discipleship Gathering - Kegiatan yang bertempat di pantai dimana menyatukan seluruh akk dan juga pkk menjadi keluarga besar.",
  "EL-SHADDAI COMPETITION - Kegiatan perlombaan berupa musik dan tari-tarian.",
  "Penyambutan Mahasiswa Baru - Kegiatan menyambut mahasiswa kristen baru.",
  "El-Shaddai Mission Trip - Kegiatan bina desa dimana mahasiswa akan terjun langsung membantu masyarakat.",
  "Pengaderan El-Shaddai - Mempersiapkan mahasiswa sebagai calon BPH.",
  "Perayaan Natal - Kegiatan merayakan kelahiran Tuhan Yesus Kristus bersama mahasiswa."
],
    gallery: ["/gallery/pd-elshaddai/kegiatan-1.jpg", "/gallery/pd-elshaddai/kegiatan-2.jpg", "/gallery/pd-elshaddai/kegiatan-3.jpg", "/gallery/pd-elshaddai/kegiatan-4.jpg"],
    skills: {
      leadership: 8,
      publicSpeaking: 8,
      communication: 8,
      teamwork: 9,
      eventManagement: 9,
      problemSolving: 8,
      networking: 7,
      design: 6,
      contentCreation: 6,
      creativity: 8,
      organizationManagement: 7,
      social: 10
    },
    suitableFor: ["Suka memimpin & berorganisasi", "Suka berkomunikasi & bertemu orang baru", "Suka membuat acara & bekerja dalam tim", "Suka belajar & berdiskusi", "Suka membantu & berkontribusi untuk masyarakat"],
    instagram: "@pd_elshaddai",
    contactPerson: "089654303712 (Irene)"
  },

  // ============================================
  // BLUG - Batam Linux User Group
  // ============================================
  {
    id: "blug",
    name: "Batam Linux User Group",
    logo: "/logos/BLUG.png",
    shortName: "BLUG",
    type: "UKM",
    tagline: "Indonesia, Go Open Source",
    description: "Batam Linux User Group (BLUG) adalah komunitas yang menjadi wadah bagi mahasiswa dan masyarakat yang memiliki ketertarikan pada Linux, teknologi, open source, serta pengembangan keterampilan di bidang teknologi informasi.",
    focusAreas: ["Kepemimpinan & Organisasi", "Akademik & Pendidikan", "Teknologi & Digital", "Teknik & Keahlian Terapan", "Komunikasi, Media & Jurnalistik"],
    uniqueCharacteristics: [
      "Berfokus pada Linux, open source, dan pengembangan keterampilan teknologi informasi",
      "Menjadi wadah belajar dan berbagi pengetahuan teknologi melalui workshop, diskusi, serta kegiatan praktis",
      "Mendorong kolaborasi, eksplorasi teknologi, dan pengembangan kemampuan mahasiswa melalui komunitas yang terbuka dan inklusif"
    ],
    flagshipPrograms: [
  "Blugcamp - Kegiatan belajar dengan sesama pengurus seputar teknologi open source.",
  "Belajar dan Berbagi - Kegiatan dimana pengurus menyebarkan ilmu seputar teknologi open source kepada masyarakat umum.",
  "Open Source Competition - Kegiatan perlombaan yang diadakan oleh Batam Linux User Group setiap tahun untuk siswa/i SMA/K se-Batam.",
  "Webinar - Kegiatan membahas seputar teknologi open source.",
  "Blug Gathering - Kegiatan yang menyatukan 1 organisasi.",
  "Blug Birthday - Sama seperti Blug Gathering.",
  "Blug Goes To School - Kegiatan memberikan wawasan seputar teknologi open source kepada siswa SMA/K."
],
    gallery: ["/gallery/blug/kegiatan-1.jpg", "/gallery/blug/kegiatan-2.jpg", "/gallery/blug/kegiatan-3.jpg", "/gallery/blug/kegiatan-4.jpg", "/gallery/blug/kegiatan-5.jpg", "/gallery/blug/kegiatan-6.jpg", "/gallery/blug/kegiatan-7.jpg", "/gallery/blug/kegiatan-8.jpg", "/gallery/blug/kegiatan-9.jpg", "/gallery/blug/kegiatan-10.jpg"],
    skills: {
      leadership: 8,
      publicSpeaking: 8,
      communication: 8,
      teamwork: 8,
      eventManagement: 8,
      problemSolving: 8,
      networking: 8,
      design: 8,
      contentCreation: 6,
      research: 9,
      technicalSkill: 10,
      organizationManagement: 8,
      bahasa: 8,
      creativity: 7
    },
    suitableFor: ["Suka memimpin & berorganisasi", "Suka berkomunikasi & bertemu orang baru", "Suka membuat acara & bekerja dalam tim", "Suka belajar & berdiskusi", "Tertarik teknologi & hal teknis", "Suka berkarya & berkreasi"],
    instagram: "@batamlinux",
    tiktok: "@batamlinuxusergroup",
    youtube: "@batamlinux9734",
    googleSite: "https://blug.polibatam.ac.id/",
    contactPerson: "082387593452 (Terra)"
  },

  // ============================================
  // MAPALA - Mahasiswa Pencinta Alam
  // ============================================
  {
    id: "mapala",
    name: "Mahasiswa Pencinta Alam Politeknik Negeri Batam",
    shortName: "MAPALA",
    logo: "/logos/MAPALA.png",
    type: "UKM",
    tagline: "Salam Lestari!",
    description: "Mapala adalah unit kegiatan mahasiswa yang bergerak di bidang alam. Memiliki 4 divisi utama yaitu Gunung Hutan, Susur Pantai, Lingkungan Hidup, dan Panjat.",
    focusAreas: ["Kepemimpinan & Organisasi", "Teknik & Keahlian Terapan", "Lingkungan & Petualangan"],
    uniqueCharacteristics: [
      "Fokus pada pengembangan kepemimpinan dalam organisasi.",
      "Fokus pada pengembangan kemampuan mahasiswa sesuai divisi yang dimiliki.",
      "Menjadi wadah mahasiswa untuk mengasah bakat dan potensi, terutama di bidang kegiatan alam terbuka."
    ],
    flagshipPrograms: [
  "Aksi Hijau - Penanaman yang mengundang Mapala yang ada di Batam serta beberapa komunitas lingkungan.",
  "Aksi Bersih - Program ini bertujuan menjaga kebersihan lingkungan yang dimana sering bekerjasama dengan pihak luar.",
  "Latihan Divisi - Kami memiliki 4 divisi (Gunung Hutan, Susur Pantai, Lingkungan Hidup, dan Panjat) yang berfungsi untuk pengembangan kemampuan mahasiswa."
],
    gallery: ["/gallery/mapala/kegiatan-1.jpg", "/gallery/mapala/kegiatan-2.jpg", "/gallery/mapala/kegiatan-3.jpg", "/gallery/mapala/kegiatan-4.jpg"],
    skills: {
      leadership: 6,
      communication: 8,
      teamwork: 8,
      problemSolving: 9,
      networking: 8,
      technicalSkill: 8,
      physicalFitness: 9
    },
    suitableFor: ["Suka memimpin & berorganisasi", "Suka berkomunikasi & bertemu orang baru", "Suka membantu & berkontribusi untuk masyarakat", "Tertarik olahraga & aktivitas fisik"],
    instagram: "@mapala_polibatam",
    contactPerson: "+62 851-6141-7488 (Yusuf)"
  },

  // ============================================
  // PEC - Polibatam English Club
  // ============================================
  {
    id: "pec",
    name: "Polibatam English Club",
    logo: "/logos/PEC.png",
    shortName: "PEC",
    type: "UKM",
    tagline: "Let's Beat The World",
    description: "Polibatam English Club (PEC) adalah salah satu UKM di Polibatam yang menyediakan lingkungan dimana siapapun dapat mengembangkan, menerapkan dan belajar menggunakan bahasa Inggris tanpa rasa takut.",
    focusAreas: ["Kepemimpinan & Organisasi", "Akademik & Pendidikan", "Sosial & Pengabdian", "Komunikasi, Media & Jurnalistik", "Bahasa & Komunikasi"],
    uniqueCharacteristics: [
      "Wadah bagi mahasiswa mengembangkan kemampuan berbahasa dan berkomunikasi dalam bahasa Inggris",
      "Melakukan pengabdian dan kegiatan sosial bagi masyarakat dalam bidang pendidikan dan inovasi",
      "Meningkatkan kemampuan dalam kompetisi dan prestasi"
    ],
    flagshipPrograms: [
  "PEC Care - Kegiatan pengabdian kepada masyarakat di pulau selama 3 hari, sembari membangun kebersamaan antar anggota dan membantu masyarakat yang membutuhkan sehingga menumbuhkan rasa peduli, kepekaan sosial dan rasa tenggang rasa dengan sesama manusia.",
  "PECON - Kompetisi Konferensi dalam model MUN guna meningkatkan kemampuan Critical Thinking, Public Speaking dan Kepercayaan diri, sehingga peserta mendapatkan pengalaman dalam menerapkan bahasa Inggris dalam bentuk yang lebih serius.",
  "Gathering dan Internal Bonding Alumni Sharing - Kegiatan menyenangkan yang bertujuan membangun relasi dengan para alumni dan sesama anggota guna meningkatkan hubungan sosial dan rasa peduli sesama.",
  "SneakPEC dan Voday - Video, Foto dan bentuk media digital yang berisi informasi penting, fakta unik, dan film pendek yang dikemas dengan media yang menarik sehingga meningkatkan pengetahuan berbahasa Inggris dengan cara yang menyenangkan."
],
    gallery: ["/gallery/pec/kegiatan-1.jpg", "/gallery/pec/kegiatan-2.jpg", "/gallery/pec/kegiatan-3.jpg", "/gallery/pec/kegiatan-4.jpg"],
    skills: {
      leadership: 4,
      publicSpeaking: 8,
      communication: 9,
      teamwork: 5,
      eventManagement: 6,
      problemSolving: 6,
      networking: 7,
      design: 6,
      contentCreation: 6,
      research: 6,
      technicalSkill: 5,
      creativity: 6,
      organizationManagement: 5,
      bahasa: 10
    },
    suitableFor: ["Suka memimpin & berorganisasi", "Suka berkomunikasi & bertemu orang baru", "Suka membuat acara & bekerja dalam tim", "Suka belajar & berdiskusi", "Suka berkarya & berkreasi", "Suka membantu & berkontribusi untuk masyarakat", "Tertarik seni, media & publikasi"],
    achievements: [
      "Best Ormawa - 2025: Apresiasi sebagai Ormawa of the Year pada ORMAWA AWARDS 2025",
      "Program Ormawa Membangun Negeri - 2024: Penerima Bantuan Pendanaan PPK Ormawa Kemendikbudristek 2024"
    ],
    instagram: "@polibatamenglishclub",
    tiktok: "@polibatamenglishclub_",
    youtube: "@polibatamenglishclub",
    linktree: "https://linktr.ee/polibatamenglishclub",
    contactPerson: "+62 821-7841-9388 (Sendi Salmanita Al Farizi)"
  },

  // ============================================
  // LPM Paradigma - Lembaga Pers Mahasiswa
  // ============================================
  {
    id: "lpm-paradigma",
    name: "Lembaga Pers Mahasiswa Paradigma",
    logo: "/logos/LPM.png",
    shortName: "LPM Paradigma",
    type: "UKM",
    tagline: "Pers Kampus, Takkan Mampus",
    description: "Lembaga Pers Mahasiswa (LPM) Paradigma adalah organisasi mahasiswa yang bergerak di bidang jurnalistik dan menjadi salah satu media informasi di lingkungan kampus.",
    focusAreas: ["Komunikasi, Media & Jurnalistik"],
    uniqueCharacteristics: [
      "Berbasis Jurnalistik (menulis berita, artikel, dan opini menggunakan prinsip jurnalistik)",
      "Menjadi media alternatif bagi mahasiswa kampus",
      "Ruang berekspresi mahasiswa"
    ],
    flagshipPrograms: [
  "Lensa Paradigma - Kegiatan perlombaan di bidang jurnalistik seperti fotografi jurnalistik, desain poster, reporting, dan karya tulis jurnalistik.",
  "Creative Workshop with LPM - Kegiatan seminar jurnalistik materi penulisan berita, teknik fotografi jurnalistik, serta video produksi video berita.",
  "Spill Polibatam - Sebuah media diskusi dan penyalur informasi khusus bagi mahasiswa/i Polibatam yang dikemas dalam bentuk video atau podcast."
],
    gallery: ["/gallery/lpm/kegiatan-1.jpg", "/gallery/lpm/kegiatan-2.jpg", "/gallery/lpm/kegiatan-3.jpg", "/gallery/lpm/kegiatan-4.jpg"],
    skills: {
      publicSpeaking: 6,
      communication: 10,
      teamwork: 6,
      design: 9,
      contentCreation: 10,
      research: 9
    },
    suitableFor: ["Suka berkomunikasi & bertemu orang baru", "Suka membuat acara & bekerja dalam tim", "Suka belajar & berdiskusi", "Suka berkarya & berkreasi", "Tertarik seni, media & publikasi"],
    instagram: "@lpmpolibatam",
    linktree: "https://linktr.ee/lpmparadigma25",
    contactPerson: "+62 895-3915-4298 (Najwan Shafa)"
  },

  // ============================================
  // KOP - Komite Olahraga Polibatam
  // ============================================
  {
    id: "kop",
    name: "Komite Olahraga Polibatam",
    logo: "/logos/KOP.png",
    shortName: "KOP",
    type: "UKM",
    tagline: "Salam Olahraga, Salam Jaya",
    description: "Komite Olahraga Polibatam (KOP) adalah organisasi olahraga di lingkungan Polibatam di bawah koordinasi BEM, didirikan pada 11 Juli 2008 oleh Syafrijal.",
    focusAreas: ["Kepemimpinan & Organisasi", "Akademik & Pendidikan", "Teknik & Keahlian Terapan", "Sosial & Pengabdian", "Olahraga"],
    uniqueCharacteristics: [
      "Fokus utama pada bidang olahraga",
      "Banyak melakukan kegiatan di luar ruangan, terutama di bawah matahari",
      "Menjadi wadah mahasiswa untuk mengembangkan bakat dan skill menjadi atlet"
    ],
   flagshipPrograms: [
  "KOP Sport - Ajang kompetisi olahraga yang diselenggarakan oleh Komite Olahraga Polibatam sebagai sarana bagi mahasiswa untuk mengembangkan minat dan bakat di bidang olahraga seperti futsal, badminton, dan basket.",
  "Sport Games - Program kerja dari Komite Olahraga Polibatam (KOP) yang diselenggarakan sebagai wadah kompetisi olahraga bagi pelajar SMA/SMK se-Kota Batam. Kegiatan ini bertujuan untuk mencari dan menjaring atlet-atlet muda yang memiliki bakat serta potensi dalam bidang olahraga, khususnya pada cabang Futsal/Basket, Voli, dan Mobile Legends.",
  "POM (Pekan Olahraga Mahasiswa) - Pekan Olahraga Mahasiswa (POM) Polibatam disusun sebagai ajang kompetisi yang menggabungkan olahraga fisik dan e-sports, sehingga mampu mewadahi minat mahasiswa secara lebih luas. Kegiatan ini menggunakan sistem turnamen antarjurusan, dengan cabang olahraga meliputi futsal, voli, dan biliar, serta cabang e-sports, yaitu PES dan Mobile Legends.",
  "KOP E-Sport - Turnamen yang diselenggarakan sebagai wadah kompetisi dan hiburan bagi pemuda serta komunitas gamer. Turnamen ini menghadirkan tiga cabang permainan populer, yaitu Mobile Legends: Bang Bang, Tekken 8, dan eFootball."
],
    gallery: ["/gallery/kop/kegiatan-1.jpeg", "/gallery/kop/kegiatan-2.jpeg", "/gallery/kop/kegiatan-3.jpeg", "/gallery/kop/kegiatan-4.jpeg", "/gallery/kop/kegiatan-5.jpeg"],
    skills: {
      communication: 5,
      teamwork: 8,
      eventManagement: 8,
      problemSolving: 7,
      networking: 6,
      technicalSkill: 8,
      organizationManagement: 8,
      physicalFitness: 10
    },
    suitableFor: ["Suka memimpin & berorganisasi", "Suka berkomunikasi & bertemu orang baru", "Suka membuat acara & bekerja dalam tim", "Suka membantu & berkontribusi untuk masyarakat", "Tertarik olahraga & aktivitas fisik"],
    achievements: [
      "Juara Umum Ormawa Cup - 2025",
      "BPH Aktif yang Mengikuti PORSENI - 2026",
      "Ormawa Ter On Time - 2025"
    ],
    instagram: "@komiteolahragapolibatam",
    tiktok: "@komiteolahragapolibatam",
    youtube: "Komite Olahraga Polibatam",
    contactPerson: "+62 813-7194-0840 (Oyi Febrianti Pasma Saputri)"
  },

  // ============================================
  // KUAS - Kumpulan Anak Seni
  // ============================================
  {
    id: "kuas",
    name: "Kumpulan Anak Seni",
    logo: "/logos/KUAS.png",
    shortName: "KUAS",
    type: "UKM",
    tagline: "Kreativitas Tanpa Batas",
    description: "Kumpulan Anak Seni Polibatam (KUAS) merupakan organisasi mahasiswa yang menjadi wadah bagi mahasiswa Politeknik Negeri Batam untuk mengembangkan minat, bakat, dan kreativitas di bidang seni.",
    focusAreas: ["Kepemimpinan & Organisasi", "Teknik & Keahlian Terapan", "Sosial & Pengabdian", "Seni & Kreativitas"],
    uniqueCharacteristics: [
      "Menjadi wadah bagi mahasiswa untuk mengembangkan minat, bakat, dan kreativitas di berbagai bidang seni",
      "Memiliki berbagai bidang seni seperti tari, musik, vokal, teater, dan seni rupa",
      "Mengembangkan kemampuan anggota melalui proses berkarya, berorganisasi, berkolaborasi, dan mengikuti berbagai kegiatan serta pertunjukan seni"
    ],
    flagshipPrograms: [
  "Creative Art Festival - Kegiatan yang bertujuan sebagai wadah dalam mengembangkan jiwa seni serta bentuk memperkenalkan seniman berjiwa kreatif.",
  "Kaderisasi - Kegiatan mengkader SDM-SDM baru bagi regenerasi kabinet KUAS di tahun selanjutnya."
],
    gallery: ["/gallery/kuas/kegiatan-1.jpg", "/gallery/kuas/kegiatan-2.jpg", "/gallery/kuas/kegiatan-3.jpg", "/gallery/kuas/kegiatan-4.jpg", "/gallery/kuas/kegiatan-5.jpg"],
    skills: {
      leadership: 7,
      publicSpeaking: 7,
      communication: 8,
      teamwork: 6,
      eventManagement: 7,
      problemSolving: 7,
      networking: 8,
      design: 9,
      contentCreation: 9,
      entrepreneurship: 6,
      creativity: 10,
      organizationManagement: 6
    },
    suitableFor: ["Suka memimpin & berorganisasi", "Suka berkomunikasi & bertemu orang baru", "Suka membuat acara & bekerja dalam tim", "Suka berkarya & berkreasi", "Tertarik seni, media & publikasi"],
    achievements: [
      "Solo Song Batak Putra PORSENI - 2026: Joshua A. Manaping berhasil meraih juara 1",
      "Vocal Group PEKSIMIDA - 2026: Berhasil meraih juara 1 dalam cabang lomba Vocal Group pada ajang PEKSIMIDA Kepulauan Riau 2026"
    ],
    instagram: "@kuaspolibatam",
    tiktok: "@kuas.polibatam",
    youtube: "@kuaspolibatam4269",
    contactPerson: "+62 878-7113-1540 (Juliana)"
  },

  // ============================================
  // ENERGI - Entrepreneur Generation
  // ============================================
  {
    id: "energi",
    name: "Entrepreneur Generation",
    logo: "/logos/ENERGI.png",
    shortName: "ENERGI",
    type: "UKM",
    tagline: "I'M ENTREPRENEUR",
    description: "Entrepreneur Generation (ENERGI) adalah Unit Kegiatan Mahasiswa di Politeknik Negeri Batam yang menjadi wadah bagi mahasiswa untuk mengembangkan jiwa dan kemampuan kewirausahaan.",
    focusAreas: ["Kepemimpinan & Organisasi", "Teknologi & Digital", "Teknik & Keahlian Terapan", "Sosial & Pengabdian"],
    uniqueCharacteristics: [
      "Fokus pada pengembangan jiwa dan keterampilan kewirausahaan mahasiswa",
      "Menjadi wadah untuk mengubah ide kreatif dan inovatif menjadi peluang bisnis nyata",
      "Membangun pengalaman bisnis melalui praktik, pelatihan, kompetisi, dan networking"
    ],
   flagshipPrograms: [
  "EzoBiz Explorer - Kegiatan eksplorasi kewirausahaan yang menggabungkan konsep bisnis dan keberlanjutan. Anggota melakukan kunjungan langsung untuk mempelajari bagaimana bisnis dapat memanfaatkan potensi alam sekaligus tetap memperhatikan lingkungan.",
  "Sekolah Kewirausahaan Muda (SKEMA) - Kegiatan edukasi kewirausahaan bersama siswa sekolah menengah melalui seminar interaktif tentang dunia usaha, peluang bisnis, serta pola pikir kreatif dan inovatif. Anggota ENERGI juga mendapatkan pengalaman dalam menyampaikan edukasi dan berbagi pengetahuan kepada generasi muda.",
  "ENERGI Trip to ISNAPURING - Kegiatan kunjungan dan experiential learning ke industri kerajinan untuk melihat langsung bagaimana bahan lokal diolah menjadi produk bernilai jual. Peserta mengikuti sharing session, mempelajari proses produksi dan pemasaran, serta praktik membuat produk kerajinan, sehingga mendapatkan gambaran nyata tentang peluang bisnis kreatif.",
  "ENERGI On The Go - Program yang membawa ENERGI terjun langsung ke berbagai kegiatan bazar. Anggota mengelola booth, berkolaborasi dengan UMKM atau brand lokal, serta menjalankan mini workshop dan games. Kegiatan ini menjadi wadah untuk praktik berwirausaha, belajar menjual produk, membangun networking, dan mengembangkan kemampuan komunikasi."
],
    gallery: ["/gallery/energi/kegiatan-1.jpg", "/gallery/energi/kegiatan-2.jpg", "/gallery/energi/kegiatan-3.jpg", "/gallery/energi/kegiatan-4.jpg", "/gallery/energi/kegiatan-5.jpg"],
    skills: {
      leadership: 8,
      publicSpeaking: 8,
      communication: 7,
      teamwork: 8,
      eventManagement: 6,
      problemSolving: 7,
      networking: 9,
      design: 6,
      contentCreation: 6,
      entrepreneurship: 10,
      creativity: 8,
      organizationManagement: 7
    },
    suitableFor: ["Suka memimpin & berorganisasi", "Suka berkomunikasi & bertemu orang baru", "Suka membuat acara & bekerja dalam tim", "Suka berkarya & berkreasi", "Tertarik bisnis & kewirausahaan"],
    instagram: "@energi_polibatam",
    tiktok: "@energi.polibatam",
    contactPerson: "+62 882-7717-7941 (Johanes)"
  },

  // ============================================
  // REKAM - Reka Multimedia
  // ============================================
  {
    id: "rekam",
    name: "Reka Multimedia",
    shortName: "REKAM",
    logo: "/logos/REKAM.png",
    type: "UKM",
    tagline: "Camera, Roll, Action!",
    description: "UKM REKAM Polibatam berfokus pada bidang Broadcasting dan Perfilman. Sampai dengan saat ini REKAM telah memproduksi lebih dari 15 karya film dan aktif diikutkan ke dalam perlombaan tingkat kepulauan riau sampai nasional.",
    focusAreas: ["Kepemimpinan & Organisasi", "Teknologi & Digital", "Teknik & Keahlian Terapan", "Seni & Kreativitas", "Komunikasi, Media & Jurnalistik"],
    uniqueCharacteristics: [
      "Pengembangan skill pada bidang audio visual",
      "Peningkatan kerjasama dengan internal hingga external Polibatam",
      "Menyediakan wadah masyarakat umum untuk mengembangkan minat dan bakat di bidang audio visual"
    ],
    flagshipPrograms: [
  "REMAKISM (REKAM Making Short Movie) - Proses pembuatan film guna meningkatkan minat dan bakat anggota.",
  "BEP (Broadcasting Event Polibatam) - Ikut serta menjadi kru broadcasting pada event besar Polibatam.",
  "REKAM Festival - Program kerja yang menyediakan ruang untuk pelajar SMA/SMK/MA sederajat dalam memproduksi film dan poster film."
],
    gallery: ["/gallery/rekam/kegiatan-1.jpg", "/gallery/rekam/kegiatan-2.jpg", "/gallery/rekam/kegiatan-3.jpg", "/gallery/rekam/kegiatan-4.jpg", "/gallery/rekam/kegiatan-5.jpg"],
    skills: {
      publicSpeaking: 8,
      communication: 9,
      teamwork: 8,
      eventManagement: 9,
      networking: 8,
      design: 9,
      contentCreation: 10,
      technicalSkill: 9,
      creativity: 9,
      problemSolving: 7,
      organizationManagement: 6
    },
    suitableFor: ["Suka berkomunikasi & bertemu orang baru", "Suka membuat acara & bekerja dalam tim", "Tertarik teknologi & hal teknis", "Suka berkarya & berkreasi", "Tertarik seni, media & publikasi"],
    achievements: [
      "Collaboration in Audio-Visual Production at Regional Industry Networking Conference (RINC), Singapore Polytechnic - 2026",
      "Prestasi: ITEBA Competition, Juara 1 Short Movie, 'One More Tomorrow' - 2026",
      "Festival Film Lampung, Kategori Terfavorit Umum, 'YraengkamLa.inpolibatam' - 2024"
    ],
    instagram: "@rekam.polibatam",
    youtube: "REKAM Polibatam",
    contactPerson: "+62 898-4346-682 (Hubungan dan Kerjasama)"
  }
];