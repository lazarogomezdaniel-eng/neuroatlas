import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categorias, sustancias, getCategoriaBySlug } from '@/data/index-models';
import { ArrowLeft, ArrowRight, Activity, ShieldCheck } from 'lucide-react';

export async function generateStaticParams() {
  return categorias.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const cat = getCategoriaBySlug(params.slug);
  if (!cat) return {};

  return {
    title: `${cat.nombre} — Catálogo Científico | NeuroAtlas`,
    description: cat.descripcion,
  };
}

export default function CategoriaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const cat = getCategoriaBySlug(params.slug);
  if (!cat) notFound();

  const categorySubstances = sustancias.filter((s) => s.categoria === cat.slug);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/categorias"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Todas las categorías</span>
      </Link>

      <div
        className="rounded-biotech border bg-surface-low p-6 md:p-8 space-y-3"
        style={{ borderColor: `${cat.color}40` }}
      >
        <span
          className="text-xs font-mono font-bold uppercase tracking-wider block"
          style={{ color: cat.color }}
        >
          Familia Farmacológica
        </span>
        <h1 className="text-2xl md:text-4xl font-extrabold text-text-primary tracking-tight">
          {cat.nombre}
        </h1>
        <p className="text-xs md:text-sm text-text-secondary max-w-3xl leading-relaxed">
          {cat.descripcion}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
          Compuestos Registrados en esta Categoría ({categorySubstances.length})
        </h2>

        {categorySubstances.length === 0 ? (
          <div className="rounded-biotech border border-dashed border-surface-bright p-12 text-center text-text-muted text-xs">
            Próximamente se volcarán las sustancias correspondientes a este módulo temático.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorySubstances.map((s) => (
              <article
                key={s.slug}
                className="rounded-biotech border border-surface-bright bg-surface p-5 hover:border-primary/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <h3 className="text-base font-bold text-text-primary mb-1">{s.nombre}</h3>
                  <div className="text-[11px] font-mono text-text-muted mb-3 italic">
                    {s.nombre_cientifico}
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed">
                    {s.mecanismo}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-bright/50 flex justify-between items-center text-xs font-mono">
                  <span className="text-primary font-medium">Dosis: {s.dosis.tipica}</span>
                  <Link
                    href={`/enciclopedia/${s.slug}`}
                    className="text-text-primary hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    Ver ficha <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
