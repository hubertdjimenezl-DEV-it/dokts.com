import type { Metadata } from "next";
import { Suspense } from "react";
import { DemoFlow } from "@/components/demo/demo-flow";

export const metadata: Metadata = {
  title: "Demo — Visita con paciente virtual | Dokts",
  description:
    "Prueba interactiva: configura tu micrófono y simula una consulta con un paciente virtual (demostración Dokts).",
  robots: { index: false, follow: false },
};

function DemoFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f7f9] text-dokts-navy">
      <p className="text-sm text-dokts-navy/70">Cargando demo…</p>
    </div>
  );
}

export default function DemoPage() {
  return (
    <Suspense fallback={<DemoFallback />}>
      <DemoFlow />
    </Suspense>
  );
}
