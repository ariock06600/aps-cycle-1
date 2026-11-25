import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Eye,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { AnimationPreviewMode, Exercise } from '../types/aps';
import {
  ExerciseProgressState,
  getCompletedCount,
  getTargetCount,
  isExerciseComplete,
} from '../utils/exerciseEngine';
import { ObjectIcon } from './ObjectIcons';
import { SceneIllustration } from './SceneIllustrations';

interface InteractiveStageProps {
  exercise: Exercise;
  progress: ExerciseProgressState;
  previewMode: AnimationPreviewMode;
  projectionMode: boolean;
  onChangePreviewMode: (mode: AnimationPreviewMode) => void;
  onSortItem: (itemId: string, bucket: 'safe' | 'danger') => void;
  onSelectHotspot: (hotspotId: string) => void;
  onSelectChoice: (choiceId: string) => void;
  onFixHazard: (hazardId: string) => void;
  onReset: () => void;
  onShowSolution: () => void;
  onNextExercise: () => void;
  hasNextExercise: boolean;
}

export function InteractiveStage({
  exercise,
  progress,
  previewMode,
  projectionMode,
  onChangePreviewMode,
  onSortItem,
  onSelectHotspot,
  onSelectChoice,
  onFixHazard,
  onReset,
  onShowSolution,
  onNextExercise,
  hasNextExercise,
}: InteractiveStageProps) {
  const completedCount = getCompletedCount(exercise, progress);
  const targetCount = getTargetCount(exercise);
  const solved = isExerciseComplete(exercise, progress);

  return (
    <section
      aria-label={`Scène interactive : ${exercise.title}`}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Top Stage Header: clean unboxed metadata + spoken prompt in projection mode */}
      <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-slate-100 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
            <span>Exercice {exercise.number} sur 5</span>
            <span aria-hidden="true">·</span>
            <span>{exercise.environment}</span>
            <span aria-hidden="true">·</span>
            <span>{exercise.apsStep}</span>
          </div>
          <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-950 text-balance">
            {exercise.title}
          </h2>
          {projectionMode && (
            <p className="mt-2 text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">
              « {exercise.childInstruction} »
            </p>
          )}
        </div>

        {/* Progress readout (clean tabular numerals, dual-coded with icon) */}
        <div className="flex items-center gap-2 text-sm font-semibold tabular-nums shrink-0 pt-1">
          {solved ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              <span>Réussi ({completedCount}/{targetCount})</span>
            </span>
          ) : (
            <span className="text-slate-600">
              Progression : <strong className="text-slate-950">{completedCount} / {targetCount}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div className="p-4 sm:p-6 bg-slate-50/70 flex-1 flex flex-col justify-center">
        {/* MODE 1: SORTING CARDS (PS-1, PS-4, MS-5, GS-4) */}
        {exercise.mode === 'sort' && exercise.sortItems && (
          <div className="space-y-6">
            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {exercise.sortItems.map((item) => {
                const placed = progress.sortedBuckets[item.id];
                const isSafePlaced = placed === 'safe';
                const isDangerPlaced = placed === 'danger';
                const effectiveBucket =
                  placed ?? (previewMode === 'safe' ? item.category : undefined);

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl border p-4 flex flex-col gap-4 transition-colors ${
                      effectiveBucket === 'safe'
                        ? 'border-emerald-400 bg-emerald-50/40'
                        : effectiveBucket === 'danger'
                        ? 'border-red-400 bg-red-50/40'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <ObjectIcon
                        iconKey={item.iconKey}
                        revealedTone={effectiveBucket ?? 'neutral'}
                        className={projectionMode ? 'w-24 h-24 shrink-0' : 'w-20 h-20 shrink-0'}
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-lg font-bold text-slate-900">
                          {item.label}
                        </h3>
                        {effectiveBucket ? (
                          <p
                            className={`mt-1 text-sm font-medium flex items-center gap-1.5 ${
                              effectiveBucket === 'safe' ? 'text-emerald-700' : 'text-red-700'
                            }`}
                          >
                            {effectiveBucket === 'safe' ? (
                              <>
                                <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                                <span>{exercise.sortLabels?.safeTitle ?? 'Sans danger'}</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                                <span>{exercise.sortLabels?.dangerTitle ?? 'Danger'}</span>
                              </>
                            )}
                          </p>
                        ) : (
                          <p className="mt-1 text-sm text-slate-500">
                            Choisir la bonne catégorie :
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Neutral sorting buttons until validated; color appears only upon validation */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => onSortItem(item.id, 'safe')}
                        aria-label={`Classer ${item.label} dans ${exercise.sortLabels?.safeTitle ?? 'Sans danger'}`}
                        aria-pressed={isSafePlaced}
                        className={`min-h-[46px] px-3 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700 ${
                          isSafePlaced
                            ? 'bg-emerald-600 text-white border border-emerald-600'
                            : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-300'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span className="truncate">{exercise.sortLabels?.safeTitle ?? 'Sans danger'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSortItem(item.id, 'danger')}
                        aria-label={`Classer ${item.label} dans ${exercise.sortLabels?.dangerTitle ?? 'Danger'}`}
                        aria-pressed={isDangerPlaced}
                        className={`min-h-[46px] px-3 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700 ${
                          isDangerPlaced
                            ? 'bg-red-600 text-white border border-red-600'
                            : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-300'
                        }`}
                      >
                        <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span className="truncate">{exercise.sortLabels?.dangerTitle ?? 'Danger'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {previewMode === 'risk' && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-900 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="font-semibold">Risque si on ne trie pas :</strong>{' '}
                  {exercise.riskExplanation}
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 2 & 3: SCENE WITH HOTSPOTS OR TRIANGLE SIGNALING (PS-2, PS-5, MS-1, MS-3, GS-1) */}
        {(exercise.mode === 'hotspots' || exercise.mode === 'signal') && exercise.hotspots && (
          <div className="space-y-4">
            <div
              className={`relative w-full aspect-[5/3] mx-auto rounded-xl overflow-hidden border border-slate-200 bg-white ${
                projectionMode ? 'max-w-[920px]' : 'max-w-[820px]'
              }`}
            >
              <SceneIllustration
                sceneKey={exercise.sceneKey}
                previewMode={previewMode}
                foundIds={progress.foundIds}
                fixedIds={progress.fixedIds}
                isSolved={solved}
              />

              {/* Accessible interactive hotspot targets overlaid cleanly without blocking artwork */}
              {exercise.hotspots.map((hotspot) => {
                const isFound = progress.foundIds.includes(hotspot.id);
                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => onSelectHotspot(hotspot.id)}
                    aria-label={
                      exercise.mode === 'signal'
                        ? `Poser un triangle sur : ${hotspot.label}`
                        : `Observer : ${hotspot.label}`
                    }
                    aria-pressed={isFound}
                    style={{
                      left: `${hotspot.x}%`,
                      top: `${hotspot.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700 ${
                      isFound
                        ? 'bg-transparent border-2 border-transparent hover:bg-emerald-500/10'
                        : 'bg-slate-900/5 hover:bg-slate-900/15 border-2 border-dashed border-slate-500/80'
                    }`}
                  >
                    <span className="sr-only">{hotspot.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Clean interactive legend row below scene so teachers can also click by name on TBI */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-slate-500 mr-1">
                {exercise.mode === 'signal'
                  ? 'Zones à vérifier (poser ▲) :'
                  : 'Éléments de la scène :'}
              </span>
              {exercise.hotspots.map((hotspot) => {
                const isFound = progress.foundIds.includes(hotspot.id);
                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => onSelectHotspot(hotspot.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap ${
                      isFound
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-800'
                    }`}
                  >
                    {isFound ? '✓ ' : ''}
                    {hotspot.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE 4: ANIMATED SCENE + ILLUSTRATED CHOICE CARDS (PS-3, MS-2, MS-4, GS-3) */}
        {exercise.mode === 'choice' && exercise.choices && (
          <div className="space-y-5">
            <div
              className={`w-full aspect-[5/3] mx-auto rounded-xl overflow-hidden border border-slate-200 bg-white ${
                projectionMode ? 'max-w-[740px]' : 'max-w-[640px]'
              }`}
            >
              <SceneIllustration
                sceneKey={exercise.sceneKey}
                previewMode={previewMode}
                foundIds={progress.foundIds}
                fixedIds={progress.fixedIds}
                isSolved={solved}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {exercise.choices.map((choice) => {
                const isSelected = progress.selectedChoiceId === choice.id;
                const showCorrectHighlight =
                  (isSelected && choice.isCorrect) || (previewMode === 'safe' && choice.isCorrect);
                const showWrongHighlight = isSelected && !choice.isCorrect;
                const iconTone = showCorrectHighlight
                  ? 'safe'
                  : showWrongHighlight
                  ? 'danger'
                  : 'neutral';

                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => onSelectChoice(choice.id)}
                    aria-pressed={isSelected}
                    className={`p-4 rounded-xl border-2 text-left flex flex-col items-center text-center gap-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700 ${
                      showCorrectHighlight
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                        : showWrongHighlight
                        ? 'bg-red-50 border-red-500 text-red-950'
                        : 'bg-white border-slate-200 hover:border-slate-400 text-slate-900'
                    }`}
                  >
                    <ObjectIcon iconKey={choice.iconKey} revealedTone={iconTone} className="w-20 h-20" />
                    <span className="font-display text-base font-bold leading-snug">
                      {choice.label}
                    </span>
                    {showCorrectHighlight && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                        <span>Bonne réponse</span>
                      </span>
                    )}
                    {showWrongHighlight && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700">
                        <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                        <span>Risque !</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE 5: FIX / TRANSFORM SPACE (GS-2, GS-5) */}
        {exercise.mode === 'fix' && exercise.fixableHazards && (
          <div className="space-y-4">
            <div
              className={`relative w-full aspect-[5/3] mx-auto rounded-xl overflow-hidden border border-slate-200 bg-white ${
                projectionMode ? 'max-w-[900px]' : 'max-w-[820px]'
              }`}
            >
              <SceneIllustration
                sceneKey={exercise.sceneKey}
                previewMode={previewMode}
                foundIds={progress.foundIds}
                fixedIds={progress.fixedIds}
                isSolved={solved}
              />

              {exercise.fixableHazards.map((hazard) => {
                const isFixed = progress.fixedIds.includes(hazard.id) || previewMode === 'safe';
                return (
                  <button
                    key={hazard.id}
                    type="button"
                    onClick={() => onFixHazard(hazard.id)}
                    aria-label={isFixed ? `Sécurisé : ${hazard.afterLabel}` : `Sécuriser : ${hazard.label}`}
                    aria-pressed={isFixed}
                    style={{
                      left: `${hazard.x}%`,
                      top: `${hazard.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 min-w-[52px] min-h-[52px] px-3 py-2 rounded-full flex items-center justify-center gap-1.5 text-xs font-bold transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700 ${
                      isFixed
                        ? 'bg-transparent border-2 border-transparent hover:bg-emerald-500/10'
                        : 'bg-white/90 text-slate-700 border-2 border-slate-400 shadow-sm hover:bg-slate-100'
                    }`}
                  >
                    {!isFixed && <Wrench className="w-4 h-4 shrink-0" aria-hidden="true" />}
                    <span className="sr-only">{hazard.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Action cards showing neutral Before -> green validated After transformations */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {exercise.fixableHazards.map((hazard) => {
                const isFixed = progress.fixedIds.includes(hazard.id) || previewMode === 'safe';
                return (
                  <button
                    key={hazard.id}
                    type="button"
                    onClick={() => onFixHazard(hazard.id)}
                    className={`p-3.5 rounded-xl border text-left transition-colors ${
                      isFixed
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-white border-slate-200 hover:border-slate-400 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-semibold">
                      <span className={isFixed ? 'text-emerald-700' : 'text-slate-500'}>
                        {isFixed ? '✓ Sécurisé' : 'Action à valider'}
                      </span>
                    </div>
                    <div className="mt-1 text-sm font-bold leading-snug">
                      {isFixed ? hazard.afterLabel : hazard.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Live Feedback Banner (dual-coded icon + clear text for class discussion) */}
        {progress.lastFeedback && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-5 p-4 rounded-xl border flex items-start gap-3 ${
              progress.lastFeedback.tone === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : progress.lastFeedback.tone === 'warning'
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-blue-50 border-blue-200 text-blue-950'
            }`}
          >
            {progress.lastFeedback.tone === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
            ) : progress.lastFeedback.tone === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <Eye className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <div className="min-w-0 flex-1">
              <p className="font-display font-bold text-base leading-snug">
                {progress.lastFeedback.title}
              </p>
              <p className="mt-0.5 text-sm leading-relaxed opacity-90">
                {progress.lastFeedback.detail}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Teacher Projection Control Bar */}
      <div className="px-4 sm:px-6 py-3.5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        {/* Animation state selector for explaining on the board */}
        <div
          role="group"
          aria-label="Mode d’animation de la scène"
          className="inline-flex items-center p-1 bg-slate-100 rounded-lg gap-1"
        >
          <button
            type="button"
            onClick={() => onChangePreviewMode('explore')}
            aria-pressed={previewMode === 'explore'}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              previewMode === 'explore'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Observer
          </button>
          <button
            type="button"
            onClick={() => onChangePreviewMode('risk')}
            aria-pressed={previewMode === 'risk'}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
              previewMode === 'risk'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-red-700'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Voir le risque</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onChangePreviewMode('safe');
              onShowSolution();
            }}
            aria-pressed={previewMode === 'safe'}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
              previewMode === 'safe'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Voir la solution</span>
          </button>
        </div>

        {/* Reset & Next buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Réinitialiser</span>
          </button>

          {hasNextExercise && (
            <button
              type="button"
              onClick={onNextExercise}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                solved
                  ? 'bg-blue-700 text-white hover:bg-blue-800'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <span>Exercice suivant</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
