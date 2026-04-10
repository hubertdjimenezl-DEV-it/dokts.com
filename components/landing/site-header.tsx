"use client";

import { useState } from "react";

const nav = [
  {
    label: "Soluciones",
    href: "#soluciones",
    children: [
      { label: "Dokts Escucha", desc: "Transcripción y notas estructuradas en la consulta.", href: "#escucha" },
      { label: "Flujo clínico", desc: "Historia compatible NTS · receta alineada a DIGEMID.", href: "#flujo" },
    ],
  },
  {
    label: "Para quién",
    href: "#para-quien",
    children: [
      { label: "Especialistas", desc: "Consulta privada y menor carga administrativa.", href: "#para-quien" },
      { label: "Clínicas", desc: "Equipos que estandarizan la documentación.", href: "#para-quien" },
      { label: "Hospitales", desc: "Escalable por servicio y sede.", href: "#para-quien" },
    ],
  },
  { label: "Seguridad", href: "#seguridad" },
  { label: "Calcula tu tiempo", href: "#calcula" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-dokts-navy/10 bg-dokts-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight text-dokts-navy">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-dokts-navy text-sm font-bold text-white"
            aria-hidden
          >
            D
          </span>
          <span className="text-lg">
            dokts<span className="text-dokts-cyan">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {nav.map((item) =>
            "children" in item && item.children ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-dokts-navy/80 transition hover:bg-dokts-navy/5 hover:text-dokts-navy"
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4 opacity-60" />
                </button>
                <div className="invisible absolute left-0 top-full z-20 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="w-80 rounded-2xl border border-dokts-navy/10 bg-white p-2 shadow-xl">
                    {item.children.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        className="block rounded-xl px-3 py-3 transition hover:bg-dokts-cream"
                      >
                        <div className="font-medium text-dokts-navy">{c.label}</div>
                        <p className="mt-1 text-xs text-dokts-navy/60">{c.desc}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.label}
                href={"href" in item ? item.href : "#"}
                className="rounded-lg px-3 py-2 text-sm font-medium text-dokts-navy/80 transition hover:bg-dokts-navy/5 hover:text-dokts-navy"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href="/demo"
            className="rounded-full bg-dokts-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-dokts-navy/90"
          >
            Solicitar demo
          </a>
          <a
            href="#login"
            className="rounded-full border border-dokts-navy/20 px-4 py-2.5 text-sm font-semibold text-dokts-navy transition hover:bg-white"
          >
            Iniciar sesión
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-dokts-navy/15 lg:hidden"
          aria-expanded={open}
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menú</span>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-dokts-navy/10 bg-dokts-cream px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.label}
                href={"href" in item ? item.href : "#"}
                className="rounded-lg px-3 py-2 text-sm font-medium text-dokts-navy"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/demo"
              className="mt-2 rounded-full bg-dokts-navy px-4 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Solicitar demo
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function ChevronDown(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
