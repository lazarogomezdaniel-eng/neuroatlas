import React from 'react';
import { Award, CheckCircle2, AlertTriangle, ShieldCheck, FileCheck2 } from 'lucide-react';

export const metadata = {
  title: 'Guía de Marcas, Calidad y Pureza | NeuroAtlas',
  description: 'Estándares analíticos (CoA, HPLC), patentes estandarizadas (Synapsa, Cognizin, AlphaSize) y detección de adulterantes.',
};

export default function MarcasPage() {
  const patentes = [
    {
      nombre: 'Cognizin® (Kyowa Hakko)',
      principio: 'Citicolina (CDP-Colina)',
      pureza: '99.5%+',
      ventaja: 'Método de fermentación bio-idéntico patentado con más de 10 ensayos clínicos específicos.',
    },
    {
      nombre: 'AlphaSize® (Chemi Nutra)',
      principio: 'L-Alfa GPC',
      pureza: '50% - 99%',
      ventaja: 'Especialmente estabilizado contra la higroscopicidad para evitar la degradación del principio activo.',
    },
    {
      nombre: 'Synapsa® & Bacognize®',
      principio: 'Bacopa Monnieri',
      pureza: '55% bacósidos',
      ventaja: 'Estandarización de fracciones activas específicas con estudios en retención de memoria y enfoque.',
    },
    {
      nombre: 'KSM-66® & Sensoril®',
      principio: 'Withania somnifera (Ashwagandha)',
      pureza: '5% - 10% withanólidos',
      ventaja: 'Extracción de espectro completo basada en raíz pura sin solventes químicos nocivos.',
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="rounded-biotech border border-surface-bright bg-surface-low p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>ESTÁNDARES DE CALIDAD & CONTROL ANALÍTICO</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-text-primary tracking-tight">
          Marcas, Patentes & Pureza Farmacéutica
        </h1>
        <p className="text-xs md:text-sm text-text-secondary max-w-3xl leading-relaxed">
          Cómo auditar la calidad de un nootrópico: certificados de análisis de terceros (CoA), técnicas HPLC y patentes de laboratorio estandarizadas.
        </p>
      </div>

      {/* Checklist de Auditoría */}
      <section className="rounded-biotech border border-surface-bright bg-surface p-6 md:p-8 space-y-4">
        <h2 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
          Checklist para Evaluar un Suplemento o Marca
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded bg-surface-lowest border border-surface-bright space-y-2">
            <div className="flex items-center gap-2 font-bold text-primary">
              <FileCheck2 className="w-4 h-4" />
              <span>Certificado de Análisis (CoA)</span>
            </div>
            <p className="text-text-secondary">
              Debe provenir de un laboratorio tercero acreditado (ISO 17025) y fechado en el último lote de producción.
            </p>
          </div>
          <div className="p-4 rounded bg-surface-lowest border border-surface-bright space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Metales Pesados & Microbiología</span>
            </div>
            <p className="text-text-secondary">
              Límites cuantificados para plomo (Pb &lt; 0.5 ppm), arsénico (As), cadmio (Cd) y mercurio (Hg).
            </p>
          </div>
          <div className="p-4 rounded bg-surface-lowest border border-surface-bright space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Etiquetado Transparente</span>
            </div>
            <p className="text-text-secondary">
              Rechazar &apos;mezclas propietarias&apos; (proprietary blends) donde ocultan los miligramos exactos de cada principio activo.
            </p>
          </div>
        </div>
      </section>

      {/* Patentes de Referencia */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
          Extractos Estandarizados & Patentes Globales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {patentes.map((pat) => (
            <div key={pat.nombre} className="rounded-biotech border border-surface-bright bg-surface p-6 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-text-primary">{pat.nombre}</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-lowest text-primary border border-primary/20">
                  {pat.pureza}
                </span>
              </div>
              <div className="text-xs font-mono text-secondary">{pat.principio}</div>
              <p className="text-xs text-text-secondary leading-relaxed pt-1">{pat.ventaja}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
