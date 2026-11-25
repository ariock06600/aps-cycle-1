import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DangerRiskDiagram } from './components/DangerRiskDiagram';
import { InteractiveStage } from './components/InteractiveStage';
import { PedagogicalReference } from './components/PedagogicalReference';
import { TeacherGuide } from './components/TeacherGuide';
import { ActiveView, TopBar } from './components/TopBar';
import {
  getExercisesBySection,
  PDF_SOURCE_URL,
  SECTION_ORDER,
  SECTIONS,
} from './data/exercises';
import { AnimationPreviewMode, SectionId } from './types/aps';
import {
  applyChoiceAction,
  applyFixAction,
  applyHotspotAction,
  applySortAction,
  createInitialProgress,
  ExerciseProgressState,
  isExerciseComplete,
  solveExerciseState,
} from './utils/exerciseEngine';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('PS');
  const [lastSection, setLastSection] = useState<SectionId>('PS');
  const [activeIndexBySection, setActiveIndexBySection] = useState<Record<SectionId, number>>({
    PS: 0,
    MS: 0,
    GS: 0,
  });
  const [progressByExerciseId, setProgressByExerciseId] = useState<
    Record<string, ExerciseProgressState>
  >({});
  const [previewMode, setPreviewMode] = useState<AnimationPreviewMode>('explore');
  const [projectionMode, setProjectionMode] = useState(false);

  const currentSection: SectionId =
    activeView === 'diagram' || activeView === 'pedagogy' ? lastSection : activeView;
  const sectionExercises = useMemo(
    () => getExercisesBySection(currentSection),
    [currentSection]
  );
  const activeExerciseIndex = activeIndexBySection[currentSection] ?? 0;
  const currentExercise = sectionExercises[activeExerciseIndex] ?? sectionExercises[0];

  const currentProgress =
    progressByExerciseId[currentExercise.id] ?? createInitialProgress();

  const completedInSection = useMemo(
    () =>
      sectionExercises.filter((ex) =>
        isExerciseComplete(ex, progressByExerciseId[ex.id] ?? createInitialProgress())
      ).length,
    [sectionExercises, progressByExerciseId]
  );

  const sectionCompleted = completedInSection === sectionExercises.length;

  const handleSelectView = useCallback((view: ActiveView) => {
    setActiveView(view);
    setPreviewMode('explore');
    if (view !== 'diagram' && view !== 'pedagogy') {
      setLastSection(view);
    }
  }, []);

  const handleSelectExerciseIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(sectionExercises.length - 1, index));
      setActiveIndexBySection((prev) => ({
        ...prev,
        [currentSection]: clamped,
      }));
      setPreviewMode('explore');
    },
    [currentSection, sectionExercises.length]
  );

  // Keyboard navigation for classroom remote / presenter clicker
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && projectionMode) {
        setProjectionMode(false);
        return;
      }
      if (activeView === 'diagram' || activeView === 'pedagogy') return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (event.key === 'ArrowRight' && activeExerciseIndex < sectionExercises.length - 1) {
        handleSelectExerciseIndex(activeExerciseIndex + 1);
      } else if (event.key === 'ArrowLeft' && activeExerciseIndex > 0) {
        handleSelectExerciseIndex(activeExerciseIndex - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeView, activeExerciseIndex, sectionExercises.length, projectionMode, handleSelectExerciseIndex]);

  const updateCurrentProgress = useCallback(
    (updater: (prev: ExerciseProgressState) => ExerciseProgressState) => {
      setProgressByExerciseId((prevMap) => {
        const existing = prevMap[currentExercise.id] ?? createInitialProgress();
        return {
          ...prevMap,
          [currentExercise.id]: updater(existing),
        };
      });
    },
    [currentExercise.id]
  );

  const handleSortItem = useCallback(
    (itemId: string, bucket: 'safe' | 'danger') => {
      setPreviewMode('explore');
      updateCurrentProgress((prev) => applySortAction(currentExercise, prev, itemId, bucket));
    },
    [currentExercise, updateCurrentProgress]
  );

  const handleSelectHotspot = useCallback(
    (hotspotId: string) => {
      setPreviewMode('explore');
      updateCurrentProgress((prev) => applyHotspotAction(currentExercise, prev, hotspotId));
    },
    [currentExercise, updateCurrentProgress]
  );

  const handleSelectChoice = useCallback(
    (choiceId: string) => {
      const chosen = currentExercise.choices?.find((c) => c.id === choiceId);
      setPreviewMode(chosen?.isCorrect ? 'safe' : 'risk');
      updateCurrentProgress((prev) => applyChoiceAction(currentExercise, prev, choiceId));
    },
    [currentExercise, updateCurrentProgress]
  );

  const handleFixHazard = useCallback(
    (hazardId: string) => {
      setPreviewMode('explore');
      updateCurrentProgress((prev) => applyFixAction(currentExercise, prev, hazardId));
    },
    [currentExercise, updateCurrentProgress]
  );

  const handleResetExercise = useCallback(() => {
    setPreviewMode('explore');
    setProgressByExerciseId((prevMap) => ({
      ...prevMap,
      [currentExercise.id]: createInitialProgress(),
    }));
  }, [currentExercise.id]);

  const handleShowSolution = useCallback(() => {
    setProgressByExerciseId((prevMap) => ({
      ...prevMap,
      [currentExercise.id]: solveExerciseState(currentExercise),
    }));
  }, [currentExercise]);

  const sectionMeta = SECTIONS[currentSection];
  const nextSectionIdx = SECTION_ORDER.indexOf(currentSection) + 1;
  const nextSectionId = nextSectionIdx < SECTION_ORDER.length ? SECTION_ORDER[nextSectionIdx] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <TopBar
        activeView={activeView}
        onSelectView={handleSelectView}
        projectionMode={projectionMode}
        onToggleProjection={() => setProjectionMode((prev) => !prev)}
      />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeView === 'diagram' ? (
          <DangerRiskDiagram
            initialSection={lastSection}
            projectionMode={projectionMode}
            onReturnToSection={(sec) => handleSelectView(sec)}
          />
        ) : activeView === 'pedagogy' ? (
          <PedagogicalReference
            onSelectSection={(sec) => handleSelectView(sec)}
            onOpenDiagram={() => handleSelectView('diagram')}
          />
        ) : (
          <div className="space-y-6">
            {/* Section Context Row & 5-Exercise Stepper */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              {!projectionMode ? (
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="text-blue-700">{sectionMeta.fullLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{sectionMeta.ageRange}</span>
                    <span aria-hidden="true">·</span>
                    <span>{sectionMeta.pdfTemps}</span>
                  </div>
                  <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-slate-950 text-balance">
                    Identifier le danger pour prévenir le risque
                  </h1>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                    {sectionMeta.pdfObjective}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="font-display text-xl font-bold text-slate-950">
                    {sectionMeta.fullLabel}
                  </span>
                  <span className="text-sm text-slate-500">· {sectionMeta.pdfTemps}</span>
                </div>
              )}

              {/* 5-Exercise Segmented Selector Bar */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectExerciseIndex(activeExerciseIndex - 1)}
                  disabled={activeExerciseIndex === 0}
                  aria-label="Exercice précédent"
                  className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>

                <div
                  role="tablist"
                  aria-label={`Série de 5 exercices ${sectionMeta.fullLabel}`}
                  className="inline-flex items-center p-1 bg-slate-200/70 rounded-xl gap-1"
                >
                  {sectionExercises.map((ex, idx) => {
                    const isSelected = idx === activeExerciseIndex;
                    const isDone = isExerciseComplete(
                      ex,
                      progressByExerciseId[ex.id] ?? createInitialProgress()
                    );
                    return (
                      <button
                        key={ex.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        aria-label={`Exercice ${ex.number} : ${ex.title}`}
                        onClick={() => handleSelectExerciseIndex(idx)}
                        className={`min-w-[44px] px-3 py-1.5 rounded-lg text-sm font-semibold tabular-nums inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap ${
                          isSelected
                            ? 'bg-white text-slate-950 shadow-xs'
                            : isDone
                            ? 'text-emerald-800 hover:bg-white/60'
                            : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
                        }`}
                      >
                        <span>Ex. {ex.number}</span>
                        {isDone && (
                          <CheckCircle2
                            className="w-3.5 h-3.5 text-emerald-600 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectExerciseIndex(activeExerciseIndex + 1)}
                  disabled={activeExerciseIndex === sectionExercises.length - 1}
                  aria-label="Exercice suivant"
                  className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Series Completion Banner */}
            {sectionCompleted && (
              <div
                role="status"
                className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="font-display text-lg font-bold text-emerald-950">
                      Série {sectionMeta.fullLabel} complétée (5 / 5)
                    </h2>
                    <p className="text-sm text-emerald-900">
                      Les élèves ont exploré les 5 situations de prévention de ce niveau.
                    </p>
                  </div>
                </div>
                {nextSectionId && (
                  <button
                    type="button"
                    onClick={() => handleSelectView(nextSectionId)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>Passer en {SECTIONS[nextSectionId].shortLabel}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            )}

            {/* Two-Zone Educational Layout (or Full-Stage Projection Layout) */}
            <div
              className={`grid grid-cols-1 gap-6 items-start ${
                projectionMode ? '' : 'lg:grid-cols-12'
              }`}
            >
              <div className={projectionMode ? 'w-full' : 'lg:col-span-8'}>
                <InteractiveStage
                  exercise={currentExercise}
                  progress={currentProgress}
                  previewMode={previewMode}
                  projectionMode={projectionMode}
                  onChangePreviewMode={setPreviewMode}
                  onSortItem={handleSortItem}
                  onSelectHotspot={handleSelectHotspot}
                  onSelectChoice={handleSelectChoice}
                  onFixHazard={handleFixHazard}
                  onReset={handleResetExercise}
                  onShowSolution={handleShowSolution}
                  onNextExercise={() => handleSelectExerciseIndex(activeExerciseIndex + 1)}
                  hasNextExercise={activeExerciseIndex < sectionExercises.length - 1}
                />
              </div>

              {!projectionMode && (
                <div className="lg:col-span-4">
                  <TeacherGuide
                    section={sectionMeta}
                    exercise={currentExercise}
                    onOpenDiagram={() => handleSelectView('diagram')}
                    onOpenPedagogy={() => handleSelectView('pedagogy')}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {!projectionMode && (
        <footer className="border-t border-slate-200 bg-white mt-10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              Apprendre à Porter Secours (APS) · Cycle 1 (PS, MS, GS) · D’après la fiche pédagogique DGESCO
            </span>
            <a
              href={PDF_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-700 hover:text-blue-700 underline underline-offset-2"
            >
              Ouvrir la fiche pédagogique PDF d’origine
            </a>
          </div>
        </footer>
      )}
    </div>
  );
}
