import React from 'react';
import { ShieldCheck, BookOpen, AlertCircle, Award, Database, Microscope } from 'lucide-react';

export const metadata = {
  title: 'Zona Profesional & Criterios de Evidencia | NeuroAtlas',
  description: 'Metodología de cribado científico, jerarquía de evidencia clínica GRADE y fuentes bibliográficas primarias.',
};

export default function EvidenciaPage() {
  const criterios = [
    {
      grado: 'Grado A',
      color: '#10b981',
      badge: 'Fuerte / Meta-análisis',
      descripcion: 'Múltiples ensayos clínicos aleatorizados controlados con placebo (RCT) y meta-análisis en humanos con bajo riesgo de sesgo.',
    },
    {
      grado: 'Grado B',
      color: '#22d3ee',
      badge: 'Moderada / RCT',
      descripcion: 'Al menos un ensayo controlado de calidad o varios estudios de cohortes con resultados concordantes y significación estadística clara.',
    },
    {
      grado: 'Grado C',
      color: '#f59e0b',
      badge: 'Preliminar / Observacional',
      descripcion: 'Estudios de series de casos, evidencia mecanística animal con extrapolación biológica plausible o datos observacionales abiertos.',
    },
    {
      grado: 'Grado D',
      color: '#ef4444',
      badge: 'In Vitro / Sin Evidencia Humana',
      descripcion: 'Investigación restringida a líneas celulares o modelos murinos. No existe consenso ni confirmación de biodisponibilidad clínica en humanos.',
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="rounded-biotech border border-surface-bright bg-surface-low p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>RIGOR CIENTÍFICO & METODOLOGÍA</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-text-primary tracking-tight">
          Zona Profesional & Criterios de Validación
        </h1>
        <p className="text-xs md:text-sm text-text-secondary max-w-3xl leading-relaxed">
          En NeuroAtlas eliminamos las afirmaciones de marketing pseudocientífico. Cada beneficio y dosis documentada responde a un marco estricto de farmacovigilancia y medicina basada en la evidencia (EBM).
        </p>
      </div>

      {/* Escala GRADE */}
      <section className="space-y-4">
        <h2 className="text-sm font-mono font-bold text-text-muted uppercase tracking-wider">
          Jerarquía de Clasificación de la Evidencia (Escala GRADE adaptada)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {criterios.map((c) => (
            <div
              key={c.grado}
              className="rounded-biotech border bg-surface p-6 space-y-3"
              style={{ borderColor: `${c.color}40` }}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-text-primary">{c.grado}</span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border"
                  style={{
                    backgroundColor: `${c.color}15`,
                    borderColor: `${c.color}40`,
                    color: c.color,
                  }}
                >
                  {c.badge}
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">{c.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fuentes Primarias */}
      <section className="rounded-biotech border border-surface-bright bg-surface-low p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
          <Database className="w-4 h-4 text-primary" />
          <h2>Bases de Datos & Repositorios de Validación Cruzada</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded bg-surface border border-surface-bright space-y-1">
            <span className="font-bold text-text-primary block">PubMed / MEDLINE</span>
            <p className="text-text-secondary text-[11px]">Indexación de más de 35 millones de citas biomédicas y ensayos en humanos.</p>
          </div>
          <div className="p-4 rounded bg-surface border border-surface-bright space-y-1">
            <span className="font-bold text-text-primary block">Cochrane Library</span>
            <p className="text-text-secondary text-[11px]">Revisiones sistemáticas de alta calidad metodológica e impacto terapéutico.</p>
          </div>
          <div className="p-4 rounded bg-surface border border-surface-bright space-y-1">
            <span className="font-bold text-text-primary block">ClinicalTrials.gov</span>
            <p className="text-text-secondary text-[11px]">Registro de ensayos clínicos activos, fases farmacológicas y reclutamiento.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
