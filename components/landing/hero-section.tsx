"use client";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-dokts-navy/10 bg-gradient-to-b from-dokts-cream to-white px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-dokts-magenta/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-dokts-cyan/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-dokts-cyan/40 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-dokts-navy/80 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-dokts-cyan" />
          IA clínica · Perú
        </p>

        <h1 className="mt-8 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-dokts-navy sm:text-5xl lg:text-6xl">
          Dokts — el{" "}
          <span className="bg-gradient-to-r from-dokts-cyan to-dokts-magenta bg-clip-text text-transparent">
            asistente de IA
          </span>{" "}
          que escucha tu consulta
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dokts-navy/75">
          Dokts te escucha en la consulta, entiende el contexto clínico y convierte la conversación en{" "}
          <strong className="font-semibold text-dokts-navy">notas estructuradas</strong>, historial alineado a{" "}
          <strong className="font-semibold text-dokts-navy">NTS</strong> y apoyo para{" "}
          <strong className="font-semibold text-dokts-navy">receta y trazabilidad DIGEMID</strong> — mientras tú te
          quedas con el paciente, no con el teclado.
        </p>

        <p className="mt-4 font-mono text-sm font-medium text-dokts-magenta">
          Tu voz dicta. Dokts entiende. Tú sanas.
        </p>

        <form
          id="demo"
          className="mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-stretch"
          action="#"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="sr-only" htmlFor="email-hero">
            Correo electrónico
          </label>
          <input
            id="email-hero"
            name="email"
            type="email"
            required
            placeholder="Correo electrónico"
            className="min-h-12 flex-1 rounded-2xl border border-dokts-navy/15 bg-white px-4 text-dokts-navy shadow-sm outline-none ring-dokts-cyan/30 placeholder:text-dokts-navy/40 focus:ring-2"
          />
          <label className="sr-only" htmlFor="context-hero">
            Contexto
          </label>
          <input
            id="context-hero"
            name="context"
            type="text"
            placeholder="¿Consulta, clínica u hospital?"
            className="min-h-12 flex-1 rounded-2xl border border-dokts-navy/15 bg-white px-4 text-dokts-navy shadow-sm outline-none ring-dokts-cyan/30 placeholder:text-dokts-navy/40 focus:ring-2 sm:max-w-xs"
          />
          <button
            type="submit"
            className="min-h-12 rounded-2xl bg-dokts-navy px-8 text-sm font-semibold text-white shadow-md transition hover:bg-dokts-navy/90"
          >
            Solicitar demo
          </button>
        </form>

        <p className="mt-3 max-w-2xl text-xs text-dokts-navy/55">
          Al enviar, aceptas que Dokts pueda contactarte sobre el producto. Consulta nuestro aviso de privacidad.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-dokts-navy/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-dokts-cyan" />
            <span>Enfoque en datos clínicos y buenas prácticas de seguridad</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkle className="h-5 w-5 text-dokts-magenta" />
            <span className="font-mono text-xs font-bold uppercase tracking-wide text-dokts-navy/80">
              De consulta a receta en 30 segundos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l7 3v6c0 4-3 7.5-7 9-4-1.5-7-5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9.5 12.5l1.5 1.5 3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l1.2 4.2L17 7l-3.8 2.2L15 13l-3-2.3L9 13l1.8-3.8L7 7l3.8-.8L12 2z" />
    </svg>
  );
}
