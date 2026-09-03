import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allSubstances, getSubstanceById } from '@/data';
import { SubstanceSchema } from '@/components/seo/SubstanceSchema';
import { EvidenceBadge } from '@/components/ui/EvidenceBadge';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Activity, ShieldAlert, CheckCircle2, Share2 } from 'lucide-react';

// Generación 100% estática de todas las rutas de sustancias en tiempo de compilación (SSG)
export async function generateStaticParams() {
  return allSubstances.map((s) => ({
    id: s.id,
  }));
}

// Metadatos SEO ultra-específicos para cada página de sustancia
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const substance = getSubstanceById(params.id);
  if (!substance) return {};

  const title = `${substance.name}: Dosis, Mecanismo y Evidencia Científica | NeuroAtlas`;
  const description = `Monografía científica de ${substance.name} (${substance.category}). Receptores diana (${substance.targetReceptors.join(', ')}), nivel de evidencia ${substance.evidence}, vida media y sinergias.`;

  return {
    title,
    description,
    keywords: [
      substance.name,
      substance.category,
      ...substance.targetReceptors,
      ...substance.cognitiveGoals,
      'nootrópicos',
      'neurociencia',
      'dosis recomendada',
    ],
    alternates: {
      canonical: `https://neuroatlas.org/sustancias/${substance.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://neuroatlas.org/sustancias/${substance.id}`,
      type: 'article',
    },
  };
}

export default function SubstanceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const substance = getSubstanceById(params.id);
  if (!substance) {
    notFound();
  }

  // Schema estructurado de FAQ para que Google muestre preguntas en los resultados de búsqueda
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `¿Cuál es el mecanismo de acción de ${substance.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: substance.mechanismOfAction,
        },
      },
      {
        '@type': 'Question',
        name: `¿Cuál es la dosis estándar y el momento de toma de ${substance.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `La dosis habitual es ${substance.dosage.standard}, preferentemente ${substance.dosage.timing}. ${substance.dosage.notes || ''}`,
        },
      },
      {
        '@type': 'Question',
        name: `¿Cuáles son las sinergias recomendadas con ${substance.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Se reportan sinergias positivas combinándolo con: ${substance.synergies.join(', ')}.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-lowest">
      {/* Marcados semánticos JSON-LD para motores de búsqueda */}
      <SubstanceSchema substance={substance} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Cabecera básica de navegación */}
      <header className="border-b border-surface-bright bg-surface/90 backdrop-blur-md px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Enciclopedia</span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-mono text-primary">
          <span>Ψ NEUROATLAS BIO-INDEX</span>
        </div>
      </header>

      {/* Contenido de la Monografía */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-10 space-y-8">
        {/* Encabezado principal */}
        <div className="rounded-biotech border border-surface-bright bg-surface-low p-6 md:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
              {substance.category}
            </span>
            <EvidenceBadge level={substance.evidence} size="md" />
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-text-primary tracking-tight">
            {substance.name}
          </h1>

          {substance.chemicalFormula && (
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted">
              <span>Fórmula: <strong className="text-text-primary">{substance.chemicalFormula}</strong></span>
              {substance.casNumber && (
                <span>CAS: <strong className="text-text-primary">{substance.casNumber}</strong></span>
              )}
            </div>
          )}

          {/* Chips de Dianas & Objetivos */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            {substance.targetReceptors.map((r) => (
              <span
                key={r}
                className="px-2.5 py-1 rounded bg-surface-container text-xs font-mono text-secondary border border-secondary/30"
              >
                Receptor: {r}
              </span>
            ))}
            {substance.cognitiveGoals.map((g) => (
              <span
                key={g}
                className="px-2.5 py-1 rounded bg-surface-lowest text-xs font-mono text-primary border border-primary/20"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Sección: Mecanismo de Acción */}
        <section className="rounded-biotech border border-surface-bright bg-surface-low p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
            <Activity className="w-4 h-4 text-primary" />
            <h2>Mecanismo de Acción & Farmacodinámica</h2>
          </div>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed">
            {substance.mechanismOfAction}
          </p>
        </section>

        {/* Sección: Telemetría & Posología */}
        <section className="rounded-biotech border border-surface-bright bg-surface-lowest p-6 space-y-4">
          <h2 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
            Pauta de Dosificación & Parámetros Farmacocinéticos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 rounded bg-surface-low border border-surface-bright">
              <span className="text-text-muted block text-[10px] mb-1">DOSIS ESTÁNDAR</span>
              <span className="text-text-primary text-sm font-bold">{substance.dosage.standard}</span>
            </div>
            <div className="p-3 rounded bg-surface-low border border-surface-bright">
              <span className="text-text-muted block text-[10px] mb-1">MOMENTO DE TOMA</span>
              <span className="text-text-primary text-sm font-bold">{substance.dosage.timing}</span>
            </div>
            <div className="p-3 rounded bg-surface-low border border-surface-bright">
              <span className="text-text-muted block text-[10px] mb-1">VIDA MEDIA</span>
              <span className="text-text-primary text-sm font-bold">{substance.halfLife}</span>
            </div>
          </div>
          {substance.dosage.notes && (
            <p className="text-xs text-text-secondary italic border-l-2 border-primary pl-3">
              {substance.dosage.notes}
            </p>
          )}
        </section>

        {/* Sección: Sinergias & Contraindicaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="rounded-biotech border border-surface-bright bg-surface-low p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <h2>Sinergias Bioquímicas Documentadas</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {substance.synergies.map((syn) => (
                <span
                  key={syn}
                  className="px-2.5 py-1 rounded bg-evidence-gradeA/10 border border-evidence-gradeA/30 text-emerald-300 text-xs font-mono font-medium"
                >
                  + {syn}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-biotech border border-surface-bright bg-surface-low p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <h2>Precauciones & Contraindicaciones</h2>
            </div>
            <ul className="list-disc list-inside text-xs text-text-secondary space-y-1">
              {substance.contraindications.map((contra, i) => (
                <li key={i}>{contra}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sección: Estudios Clínicos & Bibliografía */}
        <section className="rounded-biotech border border-surface-bright bg-surface-low p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-evidence-gradeA" />
            <h2>Evidencia Científica & Ensayos en Humanos</h2>
          </div>
          <div className="space-y-3">
            {substance.studies.map((st, i) => (
              <article key={i} className="p-4 rounded bg-surface-lowest border border-surface-bright text-xs space-y-1.5">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-bold text-text-primary text-sm">{st.title}</h3>
                  <span className="font-mono text-text-muted whitespace-nowrap">{st.year}</span>
                </div>
                <div className="text-[11px] font-mono text-primary">{st.source}</div>
                <p className="text-text-secondary leading-relaxed pt-1">{st.summary}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ visible para el lector y para Google Featured Snippets */}
        <section className="rounded-biotech border border-surface-bright bg-surface-lowest p-6 space-y-4">
          <h2 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
            Preguntas Frecuentes sobre {substance.name}
          </h2>
          <div className="space-y-3 text-xs">
            <div className="border-b border-surface-bright pb-2">
              <h3 className="font-bold text-text-primary mb-1">¿Para qué sirve {substance.name}?</h3>
              <p className="text-text-secondary">{substance.mechanismOfAction}</p>
            </div>
            <div className="border-b border-surface-bright pb-2">
              <h3 className="font-bold text-text-primary mb-1">¿Cómo tomar {substance.name}?</h3>
              <p className="text-text-secondary">Dosis recomendada: {substance.dosage.standard}, {substance.dosage.timing}.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
