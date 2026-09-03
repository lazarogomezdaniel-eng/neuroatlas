import React from 'react';
import Link from 'next/link';
import { sustancias, categorias } from '@/data/index-models';
import { Compass, Search, ArrowRight, Activity, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Explorador de Sustancias & Compuestos | NeuroAtlas',
  description: 'Catálogo de nootrópicos indexados con farmacocinética, dosis, evidencia y sinergias moleculares.',
};

export default function EnciclopediaPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="rounded-biotech border border-surface-bright bg-surface-low p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>BIO-INDEX OFICIAL</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-text-primary tracking-tight">
          Enciclopedia de Sustancias & Nootrópicos
        </h1>
        <p className="text-xs md:text-sm text-text-secondary max-w-3xl leading-relaxed">
          Monografías completas con rigor clínico. Cada registro documenta mecanismo de acción, dianas sinápticas, dosis, farmacocinética y perfiles de seguridad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sustancias.map((s) => (
          <article
            key={s.slug}
            className="rounded-biotech border border-surface-bright bg-surface p-6 hover:border-primary/50 hover:shadow-cyan-glow transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider">
                  {s.categoria}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
                  {s.nivel_evidencia}
                </span>
              </div>
              <h2 className="text-lg font-bold text-text-primary mb-0.5">{s.nombre}</h2>
              <div className="text-xs font-mono text-text-muted italic mb-3">
                {s.nombre_cientifico}
              </div>
              <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed mb-3">
                {s.mecanismo}
              </p>
              <div className="flex flex-wrap gap-1">
                {s.neurotransmisores.map((nt) => (
                  <span key={nt} className="px-2 py-0.5 rounded bg-surface-lowest text-[10px] font-mono text-secondary border border-secondary/20">
                    {nt}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-surface-bright/50 flex justify-between items-center text-xs font-mono">
              <span className="text-text-muted">Dosis: {s.dosis.tipica}</span>
              <Link
                href={`/enciclopedia/${s.slug}`}
                className="text-primary hover:underline flex items-center gap-1 font-medium"
              >
                Ficha técnica <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
