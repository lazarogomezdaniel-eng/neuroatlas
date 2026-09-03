import React from 'react';
import { Substance } from '@/types/substance';

interface Props {
  substance: Substance;
}

export const SubstanceSchema: React.FC<Props> = ({ substance }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalSubstance',
    name: substance.name,
    description: substance.mechanismOfAction,
    category: substance.category,
    legalStatus: 'Nutraceutical / Prescription dependent',
    activeIngredient: substance.name,
    chemicalFormula: substance.chemicalFormula,
    identifyingExam: substance.casNumber ? `CAS: ${substance.casNumber}` : undefined,
    indication: substance.cognitiveGoals.map((goal) => ({
      '@type': 'MedicalIndication',
      name: goal,
    })),
    contraindication: substance.contraindications.map((contra) => ({
      '@type': 'MedicalContraindication',
      name: contra,
    })),
    mechanismOfAction: substance.mechanismOfAction,
    study: substance.studies.map((st) => ({
      '@type': 'MedicalStudy',
      name: st.title,
      description: st.summary,
      datePublished: st.year.toString(),
      source: st.source,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
