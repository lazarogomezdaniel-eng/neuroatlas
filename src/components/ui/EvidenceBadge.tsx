import React from 'react';
import { EvidenceLevel } from '@/types/substance';

interface Props {
  level: EvidenceLevel;
  className?: string;
  size?: 'sm' | 'md';
}

export const EvidenceBadge: React.FC<Props> = ({ level, className = '', size = 'sm' }) => {
  const getStyle = () => {
    if (level.includes('Grade A')) {
      return {
        badge: 'border-evidence-gradeA/40 bg-evidence-gradeA/10 text-emerald-400',
        dot: 'bg-emerald-400 shadow-[0_0_8px_#10b981]',
      };
    }
    if (level.includes('Grade B')) {
      return {
        badge: 'border-primary/40 bg-primary/10 text-cyan-300',
        dot: 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]',
      };
    }
    if (level.includes('Grade C')) {
      return {
        badge: 'border-evidence-gradeC/40 bg-evidence-gradeC/10 text-amber-300',
        dot: 'bg-amber-400 shadow-[0_0_8px_#f59e0b]',
      };
    }
    return {
      badge: 'border-evidence-risk/40 bg-evidence-risk/10 text-rose-300',
      dot: 'bg-rose-400 shadow-[0_0_8px_#ef4444]',
    };
  };

  const style = getStyle();
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono font-medium border backdrop-blur-sm tracking-wide ${sizeClasses} ${style.badge} ${className}`}
      role="status"
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`} />
      {level}
    </span>
  );
};
