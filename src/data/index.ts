import module01 from './modules/module-01.json';
import module02 from './modules/module-02.json';
import { Substance } from '@/types/substance';

export const allSubstances: Substance[] = [
  ...(module01 as Substance[]),
  ...(module02 as Substance[]),
];

export const getSubstanceById = (id: string): Substance | undefined => {
  return allSubstances.find((s) => s.id === id);
};

export const getSubstancesByCategory = (category: string): Substance[] => {
  return allSubstances.filter((s) => s.category.toLowerCase() === category.toLowerCase());
};

export const getAllCategories = (): string[] => {
  const cats = new Set<string>();
  allSubstances.forEach((s) => cats.add(s.category));
  return Array.from(cats);
};

export const getAllCognitiveGoals = (): string[] => {
  const goals = new Set<string>();
  allSubstances.forEach((s) => s.cognitiveGoals.forEach((g) => goals.add(g)));
  return Array.from(goals);
};
