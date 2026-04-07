export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="inline-flex w-fit rounded-full border border-sky-300/40 bg-sky-400/10 px-4 py-1 text-sm font-medium text-sky-200">
          dokts.com
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Tu salud en línea, rápida y simple.
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Proyecto nuevo de Dokts. Esta landing ya está lista para que
            empecemos a construir módulos, integraciones y despliegue continuo.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold">Agenda médica</h2>
            <p className="mt-2 text-sm text-slate-300">
              Reserva, reprograma y gestiona citas en un solo flujo.
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold">Teleconsulta</h2>
            <p className="mt-2 text-sm text-slate-300">
              Videollamadas seguras con historial y seguimiento clínico.
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold">Historial digital</h2>
            <p className="mt-2 text-sm text-slate-300">
              Información centralizada para pacientes y profesionales.
            </p>
          </article>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-lg bg-sky-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-sky-400"
          >
            Empezar diseño
          </button>
          <button
            type="button"
            className="rounded-lg border border-white/20 px-5 py-3 font-medium text-slate-100 transition hover:bg-white/10"
          >
            Definir roadmap
          </button>
        </div>
      </section>
    </main>
  );
}
