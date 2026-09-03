import React from 'react';
import Link from 'next/link';
import { conceptos } from '@/data/index-models';
import { Brain, ArrowRight, Activity, BookOpen, Layers } from 'lucide-react';

export const metadata = {
  title: 'Conceptos de Neurociencia y Mecanismos | NeuroAtlas',
  description: 'Fundamentos biológicos de la optimización cerebral: LTP, densidad de receptores, eje colinérgico y barrera hematoencefálica.',
};

export default function ConceptosPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="rounded-biotech border border-surface-bright bg-surface-low p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-xs font-mono text-secondary font-semibold">
          <Brain className="w-3.5 h-3.5" />
          <span>NEUROBIOLOGÍA & MECANISMOS MOLECULARES</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-text-primary tracking-tight">
          Conceptos y Vías de Neurociencia
        </h1>
        <p className="text-xs md:text-sm text-text-secondary max-w-3xl leading-relaxed">
          Comprende los fundamentos fisiológicos de la plasticidad sináptica, la neurotransmisión y las dianas farmacológicas sobre las que operan los nootrópicos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conceptos.map((c) => (
          <Link
            key={c.slug}
            href={`/conceptos/${c.slug}`}
            className="group rounded-biotech border border-surface-bright bg-surface p-6 hover:border-secondary/50 hover:shadow-violet-glow transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-secondary font-bold uppercase">{c.modulo} · {c.seccion}</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-text-muted capitalize">
                  {c.tipo}
                </span>
              </div>
              <h2 className="text-base font-bold text-text-primary group-hover:text-secondary transition-colors">
                {c.titulo}
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                {c.definicion}
              </p>
            </div>

            <div className="pt-4 border-t border-surface-bright/50 flex items-center justify-between text-xs font-mono">
              <span className="text-text-muted">{c.neurotransmisores_asociados.join(', ')}</span>
              <span className="text-secondary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explorar <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
