"use client";

import { useMemo, useState } from "react";

export function ListenShowcase() {
  const bars = [12, 28, 18, 40, 22, 35, 16, 44, 20, 32, 14, 38, 24, 30, 18, 36, 22, 28, 16, 40];

  return (
    <section id="escucha" className="scroll-mt-20 bg-dokts-navy px-4 py-20 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-dokts-cyan">Dokts Escucha</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Cada minuto documentando es tiempo que dejas de mirar al paciente
            </h2>
            <p className="mt-4 text-lg text-white/75">
              Dokts captura la visita en tiempo real, organiza hallazgos y propone la historia clínica para tu revisión.
              Tú apruebas; nosotros aceleramos el flujo.
            </p>
            <ul className="mt-8 space-y-4 text-white/85">
              <li className="flex gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-dokts-cyan" />
                Hasta un 40% menos tiempo en documentación administrativa (objetivo de producto).
              </li>
              <li className="flex gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-dokts-cyan" />
                Lenguaje clínico peruano, adaptable por especialidad.
              </li>
              <li className="flex gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-dokts-cyan" />
                Historia alineada a lineamientos MINSA (NTS) y soporte para receta digital.
              </li>
            </ul>
            <a
              href="#calcula"
              className="mt-10 inline-flex rounded-full bg-dokts-cyan px-8 py-3.5 text-sm font-bold text-dokts-navy transition hover:bg-white"
            >
              Probar estimador de tiempo
            </a>
          </div>
          <ListenCard bars={bars} />
        </div>
      </div>
    </section>
  );
}

function ListenCard({ bars }: { bars: number[] }) {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-dokts-magenta/30 to-dokts-cyan/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white text-dokts-navy shadow-2xl">
        <div className="flex items-center justify-between border-b border-dokts-navy/10 bg-dokts-cream px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-dokts-navy text-xs text-white">D</span>
            Dokts Escucha
          </div>
          <span className="text-dokts-navy/40">×</span>
        </div>
        <div className="space-y-4 p-6">
          <p className="text-center text-sm font-medium text-dokts-navy/70">Grabando audio de la consulta</p>
          <p className="text-center font-mono text-4xl font-bold tabular-nums text-dokts-navy">00:05:36</p>
          <div className="flex h-14 items-end justify-center gap-1">
            {bars.map((h, i) => (
              <span
                key={i}
                className="w-1.5 rounded-full bg-gradient-to-t from-dokts-navy to-dokts-cyan"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-dokts-cyan/20" aria-hidden>
              🎤
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-dokts-magenta/15" aria-hidden>
              ✎
            </span>
          </div>
          <div className="rounded-2xl border border-dokts-navy/10 bg-dokts-cream/80 p-4">
            <div className="text-sm font-semibold text-dokts-navy">✨ Creando notas</div>
            <div className="mt-3 space-y-2">
              <div className="h-2 w-full rounded-full bg-dokts-cyan/20" />
              <div className="h-2 rounded-full bg-dokts-cyan/15" style={{ width: "92%" }} />
              <div className="h-2 rounded-full bg-dokts-magenta/15" style={{ width: "78%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 12l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SolutionsGrid() {
  return (
    <section id="soluciones" className="scroll-mt-20 bg-white px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-dokts-navy sm:text-4xl">Menos estrés, más tiempo para tus pacientes</h2>
        <p className="mt-4 max-w-2xl text-lg text-dokts-navy/70">
          Inspirado en lo mejor de las plataformas globales, pero construido para normativa y práctica clínica en Perú.
        </p>
        <div id="flujo" className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-dokts-navy/10 bg-dokts-cream p-8 shadow-sm">
            <div className="text-sm font-bold uppercase tracking-wide text-dokts-magenta">Dokts Escucha</div>
            <h3 className="mt-2 text-xl font-bold text-dokts-navy">Notas de consulta generadas con contexto</h3>
            <p className="mt-3 text-dokts-navy/75">
              Deja de dividir la atención entre paciente y teclado. Enfócate en la conversación; Dokts propone estructura
              clínica para tu revisión.
            </p>
          </article>
          <article className="rounded-3xl border border-dokts-navy/10 bg-dokts-navy p-8 text-white shadow-sm">
            <div className="text-sm font-bold uppercase tracking-wide text-dokts-cyan">Flujo clínico</div>
            <h3 className="mt-2 text-xl font-bold">Agenda, historial y receta en un solo flujo</h3>
            <p className="mt-3 text-white/75">
              Preparación para receta digital y trazabilidad DIGEMID, sin perder el ritmo de la consulta.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function TimeCalculator() {
  const [visits, setVisits] = useState(20);
  const [minPerVisit, setMinPerVisit] = useState(8);
  const saved = useMemo(() => Math.round((visits * minPerVisit * 40) / 100 / 60), [visits, minPerVisit]);

  return (
    <section id="calcula" className="scroll-mt-20 border-y border-dokts-navy/10 bg-gradient-to-br from-dokts-cream to-white px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-dokts-navy sm:text-4xl">Calcula tu tiempo recuperable</h2>
            <p className="mt-3 text-dokts-navy/70">
              Estimación orientativa según el objetivo de producto (40% menos tiempo en documentación).
            </p>
          </div>
          <div className="rounded-3xl border border-dokts-navy/10 bg-white p-8 shadow-lg">
            <label className="block text-sm font-semibold text-dokts-navy">Consultas por semana</label>
            <input
              type="range"
              min={5}
              max={80}
              value={visits}
              onChange={(e) => setVisits(Number(e.target.value))}
              className="mt-2 w-full accent-dokts-cyan"
            />
            <div className="mt-1 font-mono text-dokts-navy">{visits}</div>
            <label className="mt-6 block text-sm font-semibold text-dokts-navy">Minutos de documentación por consulta</label>
            <input
              type="range"
              min={3}
              max={20}
              value={minPerVisit}
              onChange={(e) => setMinPerVisit(Number(e.target.value))}
              className="mt-2 w-full accent-dokts-magenta"
            />
            <div className="mt-1 font-mono text-dokts-navy">{minPerVisit} min</div>
            <div className="mt-8 rounded-2xl bg-dokts-navy px-6 py-6 text-center text-white">
              <p className="text-sm text-white/70">Tiempo aproximado recuperado por semana</p>
              <p className="mt-2 font-mono text-4xl font-bold text-dokts-cyan">{saved} h</p>
            </div>
            <a
              href="/demo"
              className="mt-6 flex w-full items-center justify-center rounded-2xl bg-dokts-cyan py-3 text-sm font-bold text-dokts-navy transition hover:bg-dokts-magenta hover:text-white"
            >
              Hablar con el equipo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section id="seguridad" className="scroll-mt-20 bg-dokts-navy px-4 py-20 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-dokts-cyan">Privacidad y seguridad</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Tus datos clínicos merecen el mismo rigor que tu juramento</h2>
        <p className="mt-4 max-w-2xl text-white/75">
          Dokts está diseñado con controles de acceso y cifrado en tránsito. Roadmap hacia certificaciones y normativa
          local — sin vender información a terceros.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            "Buenas prácticas de seguridad para datos sensibles",
            "Infraestructura cloud con estándares de la industria",
            "Cumplimiento normativo Perú: foco NTS y DIGEMID en el producto",
            "Sin comercialización de datos de pacientes",
          ].map((t) => (
            <li key={t} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              <span className="text-dokts-cyan">✓</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AudienceSection() {
  const items = [
    { title: "Especialistas", body: "Consultorio privado: menos carga administrativa y más calidad de atención." },
    { title: "Clínicas", body: "Estandariza la documentación entre médicos y reduce fricción operativa." },
    { title: "Hospitales", body: "Escalable por servicio y sede, con gobierno de plantillas." },
  ];
  return (
    <section id="para-quien" className="scroll-mt-20 bg-white px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-dokts-navy sm:text-4xl">Diseñado para tu entorno de atención</h2>
        <p className="mt-3 max-w-2xl text-lg text-dokts-navy/70">Desde consultorios hasta redes hospitalarias.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((x) => (
            <article key={x.title} className="rounded-3xl border border-dokts-navy/10 bg-dokts-cream p-6">
              <h3 className="text-lg font-bold text-dokts-navy">{x.title}</h3>
              <p className="mt-2 text-sm text-dokts-navy/70">{x.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-dokts-magenta/15 to-dokts-cyan/20 p-8 text-center">
          <p className="font-mono text-sm font-bold uppercase tracking-wide text-dokts-navy">
            DOKTS: IA QUE AHORRA 40% TIEMPO MÉDICO. PRUEBA YA.
          </p>
          <a href="/demo" className="mt-4 inline-flex rounded-full bg-dokts-navy px-8 py-3 text-sm font-semibold text-white">
            Solicitar demo
          </a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer id="login" className="border-t border-dokts-navy/10 bg-dokts-cream px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <div className="flex items-center gap-2 font-semibold text-dokts-navy">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-dokts-navy text-sm font-bold text-white">
              D
            </span>
            dokts.
          </div>
          <p className="mt-2 max-w-sm text-sm text-dokts-navy/60">Asistente de IA para profesionales de la salud en Perú.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <div>
            <div className="font-semibold text-dokts-navy">Producto</div>
            <a className="mt-2 block text-dokts-navy/65 hover:text-dokts-navy" href="#escucha">
              Dokts Escucha
            </a>
            <a className="mt-1 block text-dokts-navy/65 hover:text-dokts-navy" href="#flujo">
              Flujo clínico
            </a>
          </div>
          <div>
            <div className="font-semibold text-dokts-navy">Legal</div>
            <span className="mt-2 block text-dokts-navy/50">Términos (próximamente)</span>
            <span className="mt-1 block text-dokts-navy/50">Privacidad (próximamente)</span>
          </div>
          <div>
            <div className="font-semibold text-dokts-navy">Contacto</div>
            <span className="mt-2 block text-dokts-navy/65">hola@dokts.com</span>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-center text-xs text-dokts-navy/45">
        © {new Date().getFullYear()} Dokts. Arequipa · Perú.
      </p>
    </footer>
  );
}
