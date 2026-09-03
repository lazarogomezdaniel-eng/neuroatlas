import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sustancias, getSustanciaBySlug, getCategoriaBySlug } from '@/data/index-models';
import { ArrowLeft, Activity, ShieldCheck, CheckCircle2, ShieldAlert, BookOpen, Scale } from 'lucide-react';

export async function generateStaticParams() {
  return sustancias.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const s = getSustanciaBySlug(params.slug);
  if (!s) return {};

  return {
    title: `${s.nombre}: Dosis, Farmacocinética y Evidencia | NeuroAtlas`,
    description: `Monografía farmacológica de ${s.nombre} (${s.nombre_cientifico}). Mecanismo: ${s.mecanismo.slice(0, 150)}...`,
    alternates: {
      canonical: `https://neuroatlas.org/enciclopedia/${s.slug}`,
    },
  };
}

export default function FichaSustanciaPage({
  params,
}: {
  params: { slug: string };
}) {
  const s = getSustanciaBySlug(params.slug);
  if (!s) notFound();

  const categoria = getCategoriaBySlug(s.categoria);

  const getEvidenciaBadgeClass = (ev: string) => {
    if (ev === 'fuerte') return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400';
    if (ev === 'mixta') return 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300';
    return 'border-amber-500/40 bg-amber-500/10 text-amber-300';
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/enciclopedia"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a la Enciclopedia</span>
      </Link>

      {/* Hero de Ficha */}
      <div className="rounded-biotech border border-surface-bright bg-surface-low p-6 md:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/categorias/${s.categoria}`}
            className="text-xs font-mono font-bold uppercase tracking-wider hover:underline"
            style={{ color: categoria?.color || '#22d3ee' }}
          >
            {categoria?.nombre || s.categoria}
          </Link>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border ${getEvidenciaBadgeClass(s.nivel_evidencia)}`}>
              Evidencia: {s.nivel_evidencia}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono border border-surface-bright bg-surface-container text-text-muted">
              Riesgo: {s.nivel_riesgo}
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-text-primary tracking-tight">
            {s.nombre}
          </h1>
          <div className="text-xs font-mono text-text-muted italic mt-1">
            {s.nombre_cientifico}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {s.neurotransmisores.map((nt) => (
            <span key={nt} className="px-2.5 py-0.5 rounded bg-surface-container text-xs font-mono text-secondary border border-secondary/20">
              {nt}
            </span>
          ))}
          {s.regiones_cerebrales.map((reg) => (
            <span key={reg} className="px-2.5 py-0.5 rounded bg-surface-lowest text-xs font-mono text-primary border border-primary/20">
              {reg}
            </span>
          ))}
        </div>
      </div>

      {/* Mecanismo */}
      <section className="rounded-biotech border border-surface-bright bg-surface p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
          <Activity className="w-4 h-4 text-primary" />
          <h2>Mecanismo de Acción & Bioquímica Sináptica</h2>
        </div>
        <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
          {s.mecanismo}
        </p>
        {s.uso_tradicional && (
          <div className="mt-4 p-3 rounded bg-surface-lowest border border-surface-bright/50 text-xs text-text-muted italic">
            <strong>Uso Tradicional & Etnobotánica:</strong> {s.uso_tradicional}
          </div>
        )}
      </section>

      {/* Beneficios con Evidencia */}
      <section className="rounded-biotech border border-surface-bright bg-surface-low p-6 space-y-4">
        <h2 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
          Beneficios Cognitivos Validados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {s.beneficios.map((b, i) => (
            <div key={i} className="p-3 rounded bg-surface border border-surface-bright flex justify-between items-center text-xs">
              <span className="font-semibold text-text-primary">{b.nombre}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${getEvidenciaBadgeClass(b.evidencia)}`}>
                {b.evidencia}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Dosis y Farmacocinética */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-biotech border border-surface-bright bg-surface p-6 space-y-3">
          <h2 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
            Posología Recomendada
          </h2>
          <div className="space-y-2 text-xs font-mono">
            <div>
              <span className="text-text-muted block text-[10px]">DOSIS TÍPICA:</span>
              <span className="text-text-primary font-bold">{s.dosis.tipica}</span>
            </div>
            <div>
              <span className="text-text-muted block text-[10px]">MOMENTO DE TOMA:</span>
              <span className="text-text-primary">{s.dosis.timing}</span>
            </div>
            <div>
              <span className="text-text-muted block text-[10px]">FORMAS HABITUALES:</span>
              <span className="text-text-secondary">{s.dosis.formas.join(', ')}</span>
            </div>
          </div>
        </section>

        <section className="rounded-biotech border border-surface-bright bg-surface p-6 space-y-3">
          <h2 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
            Farmacocinética
          </h2>
          <div className="space-y-2 text-xs font-mono">
            <div>
              <span className="text-text-muted block text-[10px]">BIODISPONIBILIDAD:</span>
              <span className="text-text-primary">{s.farmacocinetica.biodisponibilidad}</span>
            </div>
            <div>
              <span className="text-text-muted block text-[10px]">VIDA MEDIA:</span>
              <span className="text-text-primary">{s.farmacocinetica.vida_media}</span>
            </div>
            <div>
              <span className="text-text-muted block text-[10px]">CRUZA BARRERA HEMATOENCEFÁLICA:</span>
              <span className="text-emerald-400 font-bold">{s.farmacocinetica.cruza_bhe ? 'SÍ (Confirmado)' : 'No'}</span>
            </div>
          </div>
        </section>
      </div>

      {/* Sinergias & Interacciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-biotech border border-emerald-500/20 bg-emerald-500/5 p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <h2>Sinergias Recomendadas</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {s.sinergias.map((syn) => (
              <span key={syn} className="px-2.5 py-1 rounded bg-surface border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                + {syn}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-biotech border border-rose-500/20 bg-rose-500/5 p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <h2>Interacciones & Precauciones</h2>
          </div>
          <div className="space-y-2">
            {s.interacciones.map((inter, i) => (
              <div key={i} className="text-xs bg-surface p-2.5 rounded border border-rose-500/20 space-y-0.5">
                <div className="flex justify-between font-bold text-text-primary">
                  <span>{inter.sustancia}</span>
                  <span className="font-mono text-rose-400 uppercase text-[10px]">Gravedad: {inter.gravedad}</span>
                </div>
                <p className="text-[11px] text-text-secondary">{inter.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Estado Legal */}
      <section className="rounded-biotech border border-surface-bright bg-surface p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
          <Scale className="w-4 h-4 text-primary" />
          <h2>Estatus Regulatorio y Legal</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3 rounded bg-surface-lowest border border-surface-bright">
            <span className="text-text-muted block text-[10px]">ESPAÑA (AESAN)</span>
            <span className="text-text-primary">{s.estado_legal.espana}</span>
          </div>
          <div className="p-3 rounded bg-surface-lowest border border-surface-bright">
            <span className="text-text-muted block text-[10px]">UNIÓN EUROPEA</span>
            <span className="text-text-primary">{s.estado_legal.europa}</span>
          </div>
          <div className="p-3 rounded bg-surface-lowest border border-surface-bright">
            <span className="text-text-muted block text-[10px]">ESTADOS UNIDOS (FDA)</span>
            <span className="text-text-primary">{s.estado_legal.eeuu}</span>
          </div>
        </div>
      </section>

      {/* Estudios Científicos */}
      <section className="rounded-biotech border border-surface-bright bg-surface-low p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-primary" />
          <h2>Ensayos Clínicos & Bibliografía</h2>
        </div>
        <div className="space-y-3">
          {s.estudios.map((st, i) => (
            <article key={i} className="p-4 rounded bg-surface border border-surface-bright text-xs space-y-1">
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-bold text-text-primary text-sm">{st.titulo}</h3>
                <span className="font-mono text-text-muted">{st.anio}</span>
              </div>
              <div className="text-[11px] font-mono text-secondary">{st.tipo}</div>
              <p className="text-text-secondary leading-relaxed pt-1">{st.resultado}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
