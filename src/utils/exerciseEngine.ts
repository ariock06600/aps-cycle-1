import { Exercise } from '../types/aps';

export interface ExerciseProgressState {
  /** Sort mode: itemId -> assigned bucket ('safe' | 'danger') */
  sortedBuckets: Record<string, 'safe' | 'danger'>;
  /** Hotspots & Signal modes: discovered danger IDs */
  foundIds: string[];
  /** Choice mode: selected option ID */
  selectedChoiceId: string | null;
  /** Fix mode: fixed hazard IDs */
  fixedIds: string[];
  /** Latest teacher/class feedback message */
  lastFeedback: {
    tone: 'neutral' | 'success' | 'warning';
    title: string;
    detail: string;
  } | null;
}

export function createInitialProgress(): ExerciseProgressState {
  return {
    sortedBuckets: {},
    foundIds: [],
    selectedChoiceId: null,
    fixedIds: [],
    lastFeedback: null,
  };
}

export function getTargetCount(exercise: Exercise): number {
  switch (exercise.mode) {
    case 'sort':
      return exercise.sortItems?.length ?? 0;
    case 'hotspots':
    case 'signal':
      return (exercise.hotspots ?? []).filter((h) => h.isDanger).length;
    case 'choice':
      return 1;
    case 'fix':
      return exercise.fixableHazards?.length ?? 0;
  }
}

export function getCompletedCount(exercise: Exercise, state: ExerciseProgressState): number {
  switch (exercise.mode) {
    case 'sort': {
      const items = exercise.sortItems ?? [];
      return items.filter((item) => state.sortedBuckets[item.id] === item.category).length;
    }
    case 'hotspots':
    case 'signal': {
      const dangerIds = new Set((exercise.hotspots ?? []).filter((h) => h.isDanger).map((h) => h.id));
      return state.foundIds.filter((id) => dangerIds.has(id)).length;
    }
    case 'choice': {
      const chosen = (exercise.choices ?? []).find((c) => c.id === state.selectedChoiceId);
      return chosen?.isCorrect ? 1 : 0;
    }
    case 'fix': {
      const validIds = new Set((exercise.fixableHazards ?? []).map((h) => h.id));
      return state.fixedIds.filter((id) => validIds.has(id)).length;
    }
  }
}

export function isExerciseComplete(exercise: Exercise, state: ExerciseProgressState): boolean {
  const target = getTargetCount(exercise);
  if (target === 0) return false;
  return getCompletedCount(exercise, state) >= target;
}

export function applySortAction(
  exercise: Exercise,
  state: ExerciseProgressState,
  itemId: string,
  bucket: 'safe' | 'danger'
): ExerciseProgressState {
  const item = (exercise.sortItems ?? []).find((i) => i.id === itemId);
  if (!item) return state;

  const isCorrect = item.category === bucket;
  if (isCorrect) {
    return {
      ...state,
      sortedBuckets: {
        ...state.sortedBuckets,
        [itemId]: bucket,
      },
      lastFeedback: {
        tone: 'success',
        title: `Bravo · ${item.label}`,
        detail: item.explanation,
      },
    };
  }

  return {
    ...state,
    lastFeedback: {
      tone: 'warning',
      title: `Observons bien · ${item.label}`,
      detail: item.explanation,
    },
  };
}

export function applyHotspotAction(
  exercise: Exercise,
  state: ExerciseProgressState,
  hotspotId: string
): ExerciseProgressState {
  const hotspot = (exercise.hotspots ?? []).find((h) => h.id === hotspotId);
  if (!hotspot) return state;

  if (!hotspot.isDanger) {
    return {
      ...state,
      lastFeedback: {
        tone: 'neutral',
        title: `Pas de danger · ${hotspot.label}`,
        detail: `${hotspot.riskDescription} ${hotspot.safeAction}`,
      },
    };
  }

  const alreadyFound = state.foundIds.includes(hotspotId);
  const nextFound = alreadyFound ? state.foundIds : [...state.foundIds, hotspotId];
  const prefix = exercise.mode === 'signal' ? 'Triangle posé' : 'Danger repéré';

  return {
    ...state,
    foundIds: nextFound,
    lastFeedback: {
      tone: 'success',
      title: `${prefix} · ${hotspot.label}`,
      detail: `${hotspot.riskDescription} ${hotspot.safeAction}`,
    },
  };
}

export function applyChoiceAction(
  exercise: Exercise,
  state: ExerciseProgressState,
  choiceId: string
): ExerciseProgressState {
  const choice = (exercise.choices ?? []).find((c) => c.id === choiceId);
  if (!choice) return state;

  return {
    ...state,
    selectedChoiceId: choiceId,
    lastFeedback: {
      tone: choice.isCorrect ? 'success' : 'warning',
      title: choice.isCorrect ? 'Bonne attitude !' : 'Attention au risque !',
      detail: choice.feedback,
    },
  };
}

export function applyFixAction(
  exercise: Exercise,
  state: ExerciseProgressState,
  hazardId: string
): ExerciseProgressState {
  const hazard = (exercise.fixableHazards ?? []).find((h) => h.id === hazardId);
  if (!hazard) return state;

  const alreadyFixed = state.fixedIds.includes(hazardId);
  const nextFixed = alreadyFixed ? state.fixedIds : [...state.fixedIds, hazardId];

  return {
    ...state,
    fixedIds: nextFixed,
    lastFeedback: {
      tone: 'success',
      title: `Risque évité · ${hazard.afterLabel}`,
      detail: hazard.explanation,
    },
  };
}

export function solveExerciseState(exercise: Exercise): ExerciseProgressState {
  const base = createInitialProgress();
  switch (exercise.mode) {
    case 'sort': {
      const buckets: Record<string, 'safe' | 'danger'> = {};
      for (const item of exercise.sortItems ?? []) {
        buckets[item.id] = item.category;
      }
      return {
        ...base,
        sortedBuckets: buckets,
        lastFeedback: {
          tone: 'success',
          title: 'Corrigé affiché',
          detail: exercise.safeExplanation,
        },
      };
    }
    case 'hotspots':
    case 'signal': {
      const dangerIds = (exercise.hotspots ?? []).filter((h) => h.isDanger).map((h) => h.id);
      return {
        ...base,
        foundIds: dangerIds,
        lastFeedback: {
          tone: 'success',
          title: 'Tous les dangers sont identifiés',
          detail: exercise.safeExplanation,
        },
      };
    }
    case 'choice': {
      const correct = (exercise.choices ?? []).find((c) => c.isCorrect);
      return {
        ...base,
        selectedChoiceId: correct?.id ?? null,
        lastFeedback: {
          tone: 'success',
          title: 'Bonne conduite affichée',
          detail: exercise.safeExplanation,
        },
      };
    }
    case 'fix': {
      const allIds = (exercise.fixableHazards ?? []).map((h) => h.id);
      return {
        ...base,
        fixedIds: allIds,
        lastFeedback: {
          tone: 'success',
          title: 'Espace entièrement sécurisé',
          detail: exercise.safeExplanation,
        },
      };
    }
  }
}
