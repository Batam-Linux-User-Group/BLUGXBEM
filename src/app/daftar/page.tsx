"use client";

import { ORMAWA_LIST } from "@/data/ormawa";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function DaftarOrmawaRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const rawParam = searchParams.get("ormawa");

    if (!rawParam) {
      router.replace("/explore");
      return;
    }

    const normalized = rawParam.toLowerCase();
    const targetOrmawa = ORMAWA_LIST.find((item) => {
      const values = [item.id, item.shortName, item.name].filter(Boolean).map((value) => value.toLowerCase());
      return values.some((value) => value === normalized || value.includes(normalized));
    });

    if (targetOrmawa?.registrationLink) {
      window.location.href = targetOrmawa.registrationLink;
      return;
    }

    router.replace("/explore");
  }, [router, searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg,#FAF9F4)] px-4 text-[var(--ink,#15140F)]">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--ink-soft,#6B6B5F)]">
          Redirecting
        </p>
        <h1 className="mt-3 text-2xl font-bold">Mengarahkan ke pendaftaran ORMAWA…</h1>
      </div>
    </main>
  );
}

export default function DaftarOrmawaPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-[var(--bg,#FAF9F4)] px-4 text-[var(--ink,#15140F)]"><div className="text-center"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--ink-soft,#6B6B5F)]">Redirecting</p></div></main>}>
      <DaftarOrmawaRedirect />
    </Suspense>
  );
}
