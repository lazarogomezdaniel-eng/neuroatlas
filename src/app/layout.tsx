import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://neuroatlas.org'),
  title: {
    default: 'NeuroAtlas — Enciclopedia Científica de Nootrópicos & Bio-Index',
    template: '%s | NeuroAtlas',
  },
  description:
    'Enciclopedia bio-médica de alta densidad sobre nootrópicos, farmacología cerebral, niveles de evidencia clínica y diseño de protocolos sinápticos.',
  keywords: [
    'Nootrópicos',
    'Neurociencia',
    'Biohacking',
    'Piracetam',
    'Alpha-GPC',
    'Bacopa Monnieri',
    'Stack Builder',
    'Atlas Cerebral',
  ],
  authors: [{ name: 'NeuroAtlas Biotech Team' }],
  openGraph: {
    title: 'NeuroAtlas — Enciclopedia Científica de Nootrópicos & Bio-Index',
    description:
      'Compendio bio-farmacológico riguroso indexado por grados de evidencia, mecanismos de acción y sinergias moleculares.',
    url: 'https://neuroatlas.org',
    siteName: 'NeuroAtlas',
    locale: 'es_ES',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className="bg-surface-lowest text-text-primary antialiased selection:bg-primary/20 selection:text-primary font-sans flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
