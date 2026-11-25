import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DIAGRAM_SCENARIOS,
  EXERCISES,
  getDiagramScenariosBySection,
  getExercisesBySection,
  PDF_SOURCE_URL,
  resolvePublicAssetUrl,
  SECTION_ORDER,
} from '../data/exercises';
import {
  applyChoiceAction,
  applyFixAction,
  applyHotspotAction,
  applySortAction,
  createInitialProgress,
  getCompletedCount,
  getTargetCount,
  isExerciseComplete,
  solveExerciseState,
} from './exerciseEngine';

test('dataset provides exactly 3 sections (PS, MS, GS) with 5 ordered exercises each', () => {
  assert.deepEqual(SECTION_ORDER, ['PS', 'MS', 'GS']);
  assert.equal(EXERCISES.length, 15);

  const ids = new Set<string>();
  for (const section of SECTION_ORDER) {
    const list = getExercisesBySection(section);
    assert.equal(list.length, 5, `${section} should have 5 exercises`);
    assert.deepEqual(
      list.map((e) => e.number),
      [1, 2, 3, 4, 5]
    );
    for (const ex of list) {
      assert.ok(!ids.has(ex.id), `Duplicate ID: ${ex.id}`);
      ids.add(ex.id);
      assert.ok(ex.childInstruction.length > 10);
      assert.ok(ex.languagePrompts.length >= 2);
      assert.ok(ex.competencies.length >= 2, `${ex.id} must list competencies`);
      assert.ok(ex.workSetup.length > 20, `${ex.id} must describe classroom setup`);
      assert.ok(ex.differentiation.length > 20, `${ex.id} must include differentiation`);
      assert.ok(ex.evaluationCriteria.length > 15, `${ex.id} must include evaluation criteria`);
      assert.ok(getTargetCount(ex) > 0, `${ex.id} must have at least 1 interactive target`);
    }
  }
});

test('animated Danger vs Risque diagram defines 3 age-adapted scenarios for each section (PS, MS, GS)', () => {
  assert.equal(DIAGRAM_SCENARIOS.length, 9);
  for (const section of SECTION_ORDER) {
    const list = getDiagramScenariosBySection(section);
    assert.equal(list.length, 3, `${section} should have 3 diagram scenarios`);
    for (const scenario of list) {
      assert.equal(scenario.section, section);
      assert.ok(scenario.dangerLabel.length > 0);
      assert.ok(scenario.riskLabel.length > 0);
      assert.ok(scenario.preventionLabel.length > 0);
      assert.ok(scenario.teacherPhrase.length > 20);
    }
  }
});

test('resolvePublicAssetUrl resolves cleanly for root, relative, and GitHub Pages subpaths', () => {
  const rel = 'assets/aistudio/fiche.pdf';
  assert.equal(resolvePublicAssetUrl(rel, '/'), './assets/aistudio/fiche.pdf');
  assert.equal(resolvePublicAssetUrl(rel, './'), './assets/aistudio/fiche.pdf');
  assert.equal(resolvePublicAssetUrl(rel, '/aps-cycle-1/'), '/aps-cycle-1/assets/aistudio/fiche.pdf');
  assert.equal(resolvePublicAssetUrl(`/${rel}`, '/aps-cycle-1'), '/aps-cycle-1/assets/aistudio/fiche.pdf');
  assert.ok(!PDF_SOURCE_URL.startsWith('/assets/'), 'PDF_SOURCE_URL must not hardcode root-relative /assets/');
});

test('sort exercise validates correct buckets and keeps incorrect items retryable', () => {
  const ps1 = EXERCISES.find((e) => e.id === 'ps-1')!;
  let state = createInitialProgress();
  assert.equal(isExerciseComplete(ps1, state), false);

  // Wrong classification should warn and not mark item completed
  state = applySortAction(ps1, state, 'sharp-knife', 'safe');
  assert.equal(state.lastFeedback?.tone, 'warning');
  assert.equal(getCompletedCount(ps1, state), 0);

  // Correct classifications complete the exercise
  for (const item of ps1.sortItems!) {
    state = applySortAction(ps1, state, item.id, item.category);
  }
  assert.equal(getCompletedCount(ps1, state), 4);
  assert.equal(isExerciseComplete(ps1, state), true);
});

test('hotspots and signal exercises distinguish safe distractors from real dangers', () => {
  const gs1 = EXERCISES.find((e) => e.id === 'gs-1')!;
  let state = createInitialProgress();

  // Safe distractor gives neutral feedback without adding to danger count
  state = applyHotspotAction(gs1, state, 'coat-hooks');
  assert.equal(state.lastFeedback?.tone, 'neutral');
  assert.equal(getCompletedCount(gs1, state), 0);

  // Finding all 3 real dangers completes the exercise
  for (const h of gs1.hotspots!.filter((item) => item.isDanger)) {
    state = applyHotspotAction(gs1, state, h.id);
  }
  assert.equal(getCompletedCount(gs1, state), 3);
  assert.equal(isExerciseComplete(gs1, state), true);
});

test('choice exercise distinguishes wrong option from safe option', () => {
  const gs3 = EXERCISES.find((e) => e.id === 'gs-3')!;
  let state = createInitialProgress();

  state = applyChoiceAction(gs3, state, 'chase-ball');
  assert.equal(isExerciseComplete(gs3, state), false);
  assert.equal(state.lastFeedback?.tone, 'warning');

  state = applyChoiceAction(gs3, state, 'stop-sidewalk');
  assert.equal(isExerciseComplete(gs3, state), true);
  assert.equal(state.lastFeedback?.tone, 'success');
});

test('fix exercise transforms all hazards and solveExerciseState completes every exercise', () => {
  const gs2 = EXERCISES.find((e) => e.id === 'gs-2')!;
  let state = createInitialProgress();
  for (const hazard of gs2.fixableHazards!) {
    state = applyFixAction(gs2, state, hazard.id);
  }
  assert.equal(isExerciseComplete(gs2, state), true);

  for (const ex of EXERCISES) {
    const solved = solveExerciseState(ex);
    assert.equal(isExerciseComplete(ex, solved), true, `solveExerciseState should complete ${ex.id}`);
  }
});
