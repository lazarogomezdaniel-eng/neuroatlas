import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { conceptos, getConceptoBySlug } from '@/data/index-models';
import { ArrowLeft, Brain, Activity, Zap, Layers } from 'lucide-react';

export async function generateStaticParams() {
  return conceptos.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const concepto = getConceptoBySlug(params.slug);
  if (!concepto) return {};

  return {
    title: `${concepto.titulo} | NeuroAtlas`,
    description: concepto.definicion,
  };
}

export default function ConceptoDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const c = getConceptoBySlug(params.slug);
  if (!c) notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/conceptos"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-secondary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Todos los conceptos de neurociencia</span>
      </Link>

      <div className="rounded-biotech border border-surface-bright bg-surface-low p-6 md:p-8 space-y-4">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-secondary font-bold uppercase">{c.modulo} · Sección {c.seccion}</span>
          <span className="px-2.5 py-1 rounded bg-surface-container text-text-muted capitalize border border-surface-bright">
            Tipo: {c.tipo}
          </span>
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold text-text-primary tracking-tight">
          {c.titulo}
        </h1>

        <div className="p-4 rounded bg-surface-lowest border border-secondary/20 text-xs md:text-sm text-secondary font-medium leading-relaxed">
          {c.definicion}
        </div>
      </div>

      <section className="rounded-biotech border border-surface-bright bg-surface p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
          <Activity className="w-4 h-4 text-primary" />
          <h2>Explicación Biológica y Cascada Molecular</h2>
        </div>
        <p className="text-xs md:text-sm text-text-secondary leading-relaxed whitespace-pre-line">
          {c.explicacion}
        </p>
      </section>

      <section className="rounded-biotech border border-primary/30 bg-primary/5 p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary uppercase tracking-wider">
          <Zap className="w-4 h-4" />
          <h2>Relevancia para el Diseño de Nootrópicos y Stacks</h2>
        </div>
        <p className="text-xs md:text-sm text-text-primary leading-relaxed">
          {c.relevancia_nootropica}
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-4 rounded bg-surface-low border border-surface-bright space-y-2">
          <span className="text-text-muted uppercase text-[10px] block">Neurotransmisores Involucrados</span>
          <div className="flex flex-wrap gap-1.5">
            {c.neurotransmisores_asociados.map((nt) => (
              <span key={nt} className="px-2 py-0.5 rounded bg-surface-container text-secondary border border-secondary/20">
                {nt}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 rounded bg-surface-low border border-surface-bright space-y-2">
          <span className="text-text-muted uppercase text-[10px] block">Regiones Anatómicas Asociadas</span>
          <div className="flex flex-wrap gap-1.5">
            {c.regiones_asociadas.map((reg) => (
              <span key={reg} className="px-2 py-0.5 rounded bg-surface-container text-primary border border-primary/20">
                {reg}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
