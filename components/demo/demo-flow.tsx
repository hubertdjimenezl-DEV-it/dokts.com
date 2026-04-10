"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Step = "intro" | "mic" | "session";

const PATIENT_LINES = [
  "Buenos días, doctor. Vengo porque tengo molestias en el pecho desde ayer.",
  "El malestar es opresivo y se intensifica al hacer esfuerzo.",
  "No tengo antecedentes de infarto, pero mi papá tuvo un evento a los 60 años.",
  "¿Cree que debería hacerme algún estudio antes de la próxima cita?",
];

export function DemoFlow() {
  const searchParams = useSearchParams();
  const emailHint = searchParams.get("email");
  const contextHint = searchParams.get("context");

  const [step, setStep] = useState<Step>("intro");
  const [micReady, setMicReady] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState<string>("");
  const [level, setLevel] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [lines, setLines] = useState<string[]>([]);

  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const patientTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lineIndexRef = useRef(0);
  const sessionInitializedRef = useRef(false);

  const stopMic = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    void audioCtxRef.current?.close();
    audioCtxRef.current = null;
    analyserRef.current = null;
  }, []);

  const attachMic = useCallback(
    async (id?: string) => {
      setMicError(null);
      stopMic();
      try {
        const constraints: MediaStreamConstraints = {
          audio: id ? { deviceId: { exact: id } } : true,
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;

        const data = new Uint8Array(analyser.frequencyBinCount);
        const loop = () => {
          analyser.getByteFrequencyData(data);
          const avg = data.reduce((a, b) => a + b, 0) / data.length / 255;
          setLevel(avg);
          rafRef.current = requestAnimationFrame(loop);
        };
        loop();

        const list = await navigator.mediaDevices.enumerateDevices();
        setDevices(list.filter((d) => d.kind === "audioinput"));
        setDeviceId(stream.getAudioTracks()[0]?.getSettings().deviceId ?? "");
        setMicReady(true);
      } catch (e) {
        setMicError(
          e instanceof Error ? e.message : "No se pudo acceder al micrófono. Revisa permisos del navegador.",
        );
        setMicReady(false);
      }
    },
    [stopMic],
  );

  useEffect(() => {
    return () => {
      stopMic();
      if (timerRef.current) clearInterval(timerRef.current);
      if (patientTimerRef.current) clearInterval(patientTimerRef.current);
    };
  }, [stopMic]);

  useEffect(() => {
    if (step !== "session" || !sessionActive) return;
    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step, sessionActive]);

  useEffect(() => {
    if (step !== "session") {
      sessionInitializedRef.current = false;
      return;
    }
    if (!sessionActive) {
      if (patientTimerRef.current) clearInterval(patientTimerRef.current);
      return;
    }
    if (!sessionInitializedRef.current) {
      sessionInitializedRef.current = true;
      lineIndexRef.current = 0;
      setLines([]);
    }
    patientTimerRef.current = setInterval(() => {
      const i = lineIndexRef.current;
      if (i >= PATIENT_LINES.length) {
        if (patientTimerRef.current) clearInterval(patientTimerRef.current);
        return;
      }
      setLines((prev) => [...prev, PATIENT_LINES[i]]);
      lineIndexRef.current = i + 1;
    }, 9000);
    return () => {
      if (patientTimerRef.current) clearInterval(patientTimerRef.current);
    };
  }, [step, sessionActive]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const onDeviceChange = async (id: string) => {
    setDeviceId(id);
    await attachMic(id);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-dokts-navy">
      <header className="flex items-center justify-between border-b border-dokts-navy/10 bg-white px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-dokts-navy text-sm font-bold text-white">
            D
          </span>
          <span>
            dokts<span className="text-dokts-cyan">.</span>
          </span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-dokts-navy/70 transition hover:text-dokts-navy"
        >
          <span aria-hidden>←</span> Volver al inicio
        </Link>
      </header>

      {step === "intro" && (
        <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-12 sm:py-16">
          <div className="relative mb-10">
            <div
              className="h-44 w-44 rounded-full border-4 border-dokts-cyan/80 bg-gradient-to-br from-dokts-cyan/20 to-dokts-magenta/10 shadow-[0_0_48px_rgba(15,199,200,0.45)]"
              aria-hidden
            />
            <div className="absolute inset-0 animate-pulse rounded-full ring-4 ring-dokts-cyan/30 ring-offset-4 ring-offset-[#f6f7f9]" />
          </div>
          <h1 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Simulemos una visita con un paciente virtual
          </h1>
          <p className="mt-4 text-center text-base leading-relaxed text-dokts-navy/75">
            Hemos preparado un paciente virtual solo para esta demo. Hablarás como en una consulta real; en la versión
            completa, Dokts escuchará y estructurará la historia clínica mientras conversas.
          </p>
          {emailHint || contextHint ? (
            <div className="mt-3 space-y-1 text-center text-sm text-dokts-navy/55">
              {emailHint ? (
                <p>
                  Contacto indicado: <span className="font-medium text-dokts-navy/80">{emailHint}</span>
                </p>
              ) : null}
              {contextHint ? (
                <p>
                  Contexto: <span className="font-medium text-dokts-navy/80">{contextHint}</span>
                </p>
              ) : null}
            </div>
          ) : null}
          <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => {
                setStep("mic");
                void attachMic();
              }}
              className="rounded-xl bg-dokts-navy px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-dokts-navy/90"
            >
              Continuar con la visita de prueba
            </button>
            <Link
              href="/"
              className="rounded-xl border border-dokts-navy/20 bg-white px-6 py-3.5 text-center text-sm font-semibold text-dokts-navy transition hover:bg-dokts-cream"
            >
              No puedo probarlo ahora
            </Link>
          </div>
          <p className="mt-10 text-center text-xs text-dokts-navy/45">
            Demo sin grabación en servidor: el audio se procesa solo en tu navegador para la prueba de micrófono.
          </p>
        </main>
      )}

      {step === "mic" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dokts-navy/40 p-4 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            role="dialog"
            aria-labelledby="mic-title"
            aria-modal="true"
          >
            <h2 id="mic-title" className="text-lg font-bold text-dokts-navy">
              Prepárate para empezar la visita
            </h2>
            <p className="mt-2 text-sm text-dokts-navy/65">
              Si el navegador lo pide, permite el uso del micrófono. Luego elige el dispositivo y comprueba el nivel.
            </p>

            <label className="mt-6 block text-sm font-semibold text-dokts-navy" htmlFor="mic-select">
              Micrófono
            </label>
            <select
              id="mic-select"
              className="mt-2 w-full rounded-xl border border-dokts-navy/15 bg-white px-3 py-2.5 text-sm text-dokts-navy outline-none ring-dokts-cyan/30 focus:ring-2"
              value={deviceId}
              onChange={(e) => void onDeviceChange(e.target.value)}
              disabled={!micReady && !micError}
            >
              {devices.length === 0 ? (
                <option value="">Selecciona después de permitir acceso…</option>
              ) : (
                devices.map((d) => (
                  <option key={d.deviceId || d.label} value={d.deviceId}>
                    {d.label || `Micrófono ${d.deviceId.slice(0, 8)}…`}
                  </option>
                ))
              )}
            </select>

            {micError ? (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{micError}</p>
            ) : null}

            <p className="mt-6 text-sm font-semibold text-dokts-navy">Prueba tu micrófono</p>
            <div className="mt-2 flex h-14 items-end justify-center gap-0.5 rounded-xl bg-dokts-navy/5 px-2 py-2">
              {Array.from({ length: 32 }).map((_, i) => {
                const h = Math.max(8, level * 120 * (0.5 + (i % 5) * 0.1));
                return (
                  <span
                    key={i}
                    className="w-1.5 rounded-sm bg-gradient-to-t from-dokts-navy to-dokts-cyan transition-[height] duration-75"
                    style={{ height: `${Math.min(100, h)}%` }}
                  />
                );
              })}
            </div>
            <p className="mt-2 text-center text-xs text-dokts-navy/55">
              Habla o haz un sonido para verificar que el micrófono responde.
            </p>

            <div className="mt-8 flex flex-col gap-2 sm:flex-row-reverse sm:justify-end">
              <button
                type="button"
                disabled={!micReady}
                onClick={() => {
                  setStep("session");
                  setSessionActive(true);
                }}
                className="rounded-xl bg-dokts-cyan px-5 py-3 text-sm font-bold text-dokts-navy transition hover:bg-dokts-magenta hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Empezar visita
              </button>
              <button
                type="button"
                onClick={() => {
                  stopMic();
                  setStep("intro");
                  setMicReady(false);
                }}
                className="rounded-xl border border-dokts-navy/20 px-5 py-3 text-sm font-semibold text-dokts-navy hover:bg-dokts-cream"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {step === "session" && (
        <div className="flex min-h-[calc(100vh-57px)] flex-col">
          <div className="border-b border-dokts-navy/10 bg-white px-4 py-2 text-center text-xs font-medium text-dokts-navy/70">
            Sesión de demostración con un paciente virtual
          </div>

          <div className="flex flex-1 flex-col gap-4 p-4 lg:flex-row lg:gap-6 lg:p-6">
            <section className="flex flex-1 flex-col rounded-2xl border border-dokts-navy/10 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-dokts-navy">Tu micrófono (médico)</h3>
              <p className="mt-1 text-xs text-dokts-navy/55">Nivel en vivo — en producción Dokts transcribe y estructura.</p>
              <div className="mt-4 flex flex-1 min-h-[120px] items-end justify-center gap-0.5 rounded-xl bg-dokts-navy/[0.04] p-3">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-sm bg-dokts-cyan/90"
                    style={{
                      height: `${sessionActive ? Math.max(10, level * 100 * (0.4 + (i % 7) * 0.08)) : 8}%`,
                    }}
                  />
                ))}
              </div>
            </section>

            <section className="flex flex-1 flex-col rounded-2xl border border-dokts-navy/10 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-dokts-navy">Paciente virtual (demo)</h3>
              <p className="mt-1 text-xs text-dokts-navy/55">
                Texto simulado para la demo; en el producto la IA respondería con voz o texto según configuración.
              </p>
              <div className="mt-4 flex-1 space-y-3 overflow-y-auto rounded-xl bg-dokts-cream/50 p-3 text-sm leading-relaxed text-dokts-navy/90">
                {lines.length === 0 ? (
                  <p className="text-dokts-navy/45">El paciente virtual comenzará a hablar en unos segundos…</p>
                ) : (
                  lines.map((line, i) => (
                    <p key={i} className="rounded-lg border border-dokts-navy/10 bg-white px-3 py-2 shadow-sm">
                      <span className="font-medium text-dokts-cyan">Paciente:</span> {line}
                    </p>
                  ))
                )}
              </div>
            </section>
          </div>

          <footer className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-dokts-navy/10 bg-white px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
            <span className="hidden text-xs text-dokts-navy/55 sm:inline">Sesión de demostración</span>
            <div className="flex flex-1 items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setSessionActive((a) => !a)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-dokts-navy text-white shadow-md hover:bg-dokts-navy/90"
                aria-label={sessionActive ? "Pausar" : "Reanudar"}
              >
                {sessionActive ? "❚❚" : "▶"}
              </button>
              <div className="text-center">
                <div className="font-mono text-xl font-bold tabular-nums text-dokts-navy">{formatTime(elapsed)}</div>
                <span className="text-xs text-dokts-navy/50">{sessionActive ? "En curso" : "Pausado"}</span>
              </div>
            </div>
            <Link href="/" className="text-sm font-medium text-dokts-cyan hover:underline">
              Salir
            </Link>
          </footer>
        </div>
      )}
    </div>
  );
}
