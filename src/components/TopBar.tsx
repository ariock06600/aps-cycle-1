import { Maximize2, Minimize2 } from 'lucide-react';
import { SectionId } from '../types/aps';

export type ActiveView = SectionId | 'diagram' | 'pedagogy';

interface TopBarProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  projectionMode: boolean;
  onToggleProjection: () => void;
}

const NAV_ITEMS: { id: ActiveView; label: string }[] = [
  { id: 'PS', label: 'Petite Section' },
  { id: 'MS', label: 'Moyenne Section' },
  { id: 'GS', label: 'Grande Section' },
  { id: 'diagram', label: 'Schéma Danger / Risque' },
  { id: 'pedagogy', label: 'Fiche Pédagogique' },
];

export function TopBar({
  activeView,
  onSelectView,
  projectionMode,
  onToggleProjection,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element display wordmark */}
        <button
          type="button"
          onClick={() => onSelectView('PS')}
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 rounded"
        >
          Prévention Maternelle
        </button>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Navigation principale des niveaux"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectView(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 rounded ${
                  isActive
                    ? 'text-slate-950 font-semibold'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[13px] h-0.5 bg-blue-700 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onToggleProjection}
            aria-pressed={projectionMode}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              projectionMode
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : 'bg-blue-700 text-white hover:bg-blue-800'
            }`}
          >
            {projectionMode ? (
              <>
                <Minimize2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Quitter projection</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Mode Projection</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Compact mobile nav row (under 15% viewport height) */}
      <nav
        aria-label="Navigation mobile des niveaux"
        className="md:hidden flex items-center gap-1 overflow-x-auto px-4 pb-2.5 pt-0.5 border-t border-slate-100"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectView(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-800'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
