import React from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight, User } from 'lucide-react';

export const metadata = {
  title: 'Artículos & Divulgación Neurocientífica | NeuroAtlas',
  description: 'Análisis monográficos, guías de bio-optimización, neurofarmacología aplicada y novedades de ensayos clínicos.',
};

export default function BlogPage() {
  const articulos = [
    {
      slug: 'guia-definitiva-colina-racetams',
      titulo: 'La Guía Definitiva de Colina: Alpha-GPC vs CDP-Colina en Stacks de Racetams',
      extracto: 'Por qué los moduladores AMPA agotan las reservas intracelulares de acetilcolina y cómo balancear la relación de donantes para evitar las cefaleas colinérgicas.',
      fecha: '03 Sep 2026',
      tiempoLectura: '8 min',
      autor: 'Equipo Científico NeuroAtlas',
      categoria: 'Farmacología Práctica',
    },
    {
      slug: 'mecanismo-potenciacion-largo-plazo',
      titulo: 'Desentrañando el LTP: Cómo se consolida un recuerdo a nivel molecular',
      extracto: 'Del receptor NMDA a la expresión de BDNF: el mapa intracelular de la memoria y la neuroplasticidad acelerada.',
      fecha: '28 Ago 2026',
      tiempoLectura: '11 min',
      autor: 'Dr. Alejandro Rivas (Neurobiología)',
      categoria: 'Neurociencia Teórica',
    },
    {
      slug: 'ciclado-de-nootropicos-desensibilizacion',
      titulo: 'Estrategias de Ciclado y Up-regulation de Receptores Neuroquímicos',
      extracto: 'Protocolos de 5/2 y 4/1 semanas para evitar la tolerancia farmacodinámica en receptores dopaminérgicos y colinérgicos.',
      fecha: '19 Ago 2026',
      tiempoLectura: '6 min',
      autor: 'Equipo Científico NeuroAtlas',
      categoria: 'Protocolos de Seguridad',
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="rounded-biotech border border-surface-bright bg-surface-low p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>DIVULGACIÓN & ANÁLISIS CIENTÍFICO</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-text-primary tracking-tight">
          Artículos, Guías & Ensayos de Neurofarmacología
        </h1>
        <p className="text-xs md:text-sm text-text-secondary max-w-3xl leading-relaxed">
          Publicaciones exhaustivas sobre bio-optimización sináptica, resolución de problemas prácticos en stacks y desgloses de los últimos ensayos clínicos en humanos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articulos.map((art) => (
          <article
            key={art.slug}
            className="rounded-biotech border border-surface-bright bg-surface p-6 flex flex-col justify-between space-y-4 hover:border-primary/50 hover:shadow-cyan-glow transition-all"
          >
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider block">
                {art.categoria}
              </span>
              <h2 className="text-base font-bold text-text-primary leading-tight hover:text-primary transition-colors">
                {art.titulo}
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                {art.extracto}
              </p>
            </div>

            <div className="pt-4 border-t border-surface-bright/50 space-y-3 text-xs font-mono text-text-muted">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {art.fecha}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {art.tiempoLectura}</span>
              </div>
              <div className="text-text-secondary font-medium flex items-center gap-1">
                <User className="w-3 h-3 text-primary" />
                <span>{art.autor}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
