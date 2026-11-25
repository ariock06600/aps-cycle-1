export type SectionId = 'PS' | 'MS' | 'GS';

export type ExerciseMode = 'sort' | 'hotspots' | 'choice' | 'signal' | 'fix';

export type AnimationPreviewMode = 'explore' | 'risk' | 'safe';

export interface SortItem {
  id: string;
  label: string;
  iconKey: string;
  category: 'safe' | 'danger';
  explanation: string;
}

export interface HotspotItem {
  id: string;
  label: string;
  /** Percentage coordinates (0–100) on the 800x480 SVG stage */
  x: number;
  y: number;
  isDanger: boolean;
  riskDescription: string;
  safeAction: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
  iconKey: string;
  isCorrect: boolean;
  feedback: string;
}

export interface FixableHazard {
  id: string;
  label: string;
  x: number;
  y: number;
  beforeLabel: string;
  afterLabel: string;
  explanation: string;
}

export interface Exercise {
  id: string;
  section: SectionId;
  number: number; // 1 to 5
  title: string;
  environment: string;
  apsStep: string;
  domain: string;
  duration: string;
  mode: ExerciseMode;
  sceneKey: string;
  /** Short, spoken instruction for the teacher to read aloud to the class */
  childInstruction: string;
  /** Concrete pedagogical objective from the DGESCO PDF */
  objective: string;
  /** Official Cycle 1 competencies worked (Page 2 of PDF) */
  competencies: string[];
  /** Classroom organization, materials & PE/ATSEM roles */
  workSetup: string;
  /** Pedagogical scaffolding, differentiation & family transfer */
  differentiation: string;
  /** Concrete observation/evaluation indicator (Page 3 of PDF) */
  evaluationCriteria: string;
  /** Language workshop prompts ("Atelier de langage") */
  languagePrompts: string[];
  /** Clear takeaway sentence to repeat with children */
  keyTakeaway: string;
  /** What the "Voir le risque" animation demonstrates */
  riskExplanation: string;
  /** What the "Voir la solution" animation demonstrates */
  safeExplanation: string;
  sortItems?: SortItem[];
  sortLabels?: {
    safeTitle: string;
    dangerTitle: string;
  };
  hotspots?: HotspotItem[];
  choices?: ChoiceOption[];
  fixableHazards?: FixableHazard[];
}

export interface SectionMeta {
  id: SectionId;
  shortLabel: string;
  fullLabel: string;
  ageRange: string;
  pdfTemps: string;
  pdfObjective: string;
  accentHex: string;
  surfaceTint: string;
}

export type DiagramSceneKey =
  | 'scissors'
  | 'pot'
  | 'battery'
  | 'water'
  | 'electricity'
  | 'window'
  | 'street'
  | 'toxic'
  | 'outlet';

export interface DiagramScenario {
  id: string;
  section: SectionId;
  title: string;
  environment: string;
  sceneKey: DiagramSceneKey;
  dangerLabel: string;
  dangerDetail: string;
  exposureLabel: string;
  riskLabel: string;
  riskDetail: string;
  preventionLabel: string;
  preventionDetail: string;
  teacherPhrase: string;
}
