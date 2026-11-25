import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { getDiagramScenariosBySection, SECTION_ORDER, SECTIONS } from '../data/exercises';
import { DiagramScenario, SectionId } from '../types/aps';

interface DangerRiskDiagramProps {
  initialSection: SectionId;
  projectionMode: boolean;
  onReturnToSection: (section: SectionId) => void;
}

type DiagramStep = 1 | 2 | 3;

function DangerGraphicSvg({ sceneKey }: { sceneKey: DiagramScenario['sceneKey'] }) {
  switch (sceneKey) {
    case 'scissors':
      return (
        <g transform="translate(149, 204)">
          <g className="anim-float">
            <circle cx="-36" cy="20" r="18" fill="none" stroke="#DC2626" strokeWidth="7" />
            <circle cx="-36" cy="-20" r="18" fill="none" stroke="#DC2626" strokeWidth="7" />
            <path d="M-16 -6 L62 -24 L56 -4 L-16 6 Z" fill="#94A3B8" stroke="#334155" strokeWidth="2.5" />
            <path d="M-16 6 L62 24 L56 4 L-16 -6 Z" fill="#CBD5E1" stroke="#334155" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="4.5" fill="#1E293B" />
          </g>
          <g transform="translate(56, -24)">
            <g className="anim-spark">
              <line x1="0" y1="-10" x2="0" y2="10" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="-10" y1="0" x2="10" y2="0" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          </g>
        </g>
      );

    case 'pot':
      return (
        <g transform="translate(149, 205)">
          <ellipse cx="0" cy="48" rx="64" ry="10" fill="#EF4444" />
          <rect x="-54" y="-12" width="108" height="58" rx="8" fill="#475569" stroke="#1E293B" strokeWidth="3" />
          <rect x="48" y="0" width="52" height="12" rx="6" fill="#DC2626" />
          <g className="anim-steam">
            <path d="M-20 -20 C-26 -42 -8 -50 -16 -70" fill="none" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
            <path d="M16 -20 C10 -44 28 -52 20 -72" fill="none" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
          </g>
        </g>
      );

    case 'battery':
      return (
        <g transform="translate(149, 204)">
          <g className="anim-float">
            <circle cx="0" cy="0" r="46" fill="#CBD5E1" stroke="#475569" strokeWidth="4.5" />
            <circle cx="0" cy="0" r="35" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.5" />
            <text x="0" y="-4" textAnchor="middle" fill="#1E293B" fontSize="28" fontWeight="800">+</text>
            <text x="0" y="20" textAnchor="middle" fill="#64748B" fontSize="14" fontWeight="700">3V</text>
          </g>
          <g transform="translate(36, -34)">
            <g className="anim-spark">
              <line x1="0" y1="-10" x2="0" y2="10" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="-10" y1="0" x2="10" y2="0" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          </g>
        </g>
      );

    case 'water':
      return (
        <g transform="translate(149, 212)">
          <path
            d="M-78 0 C-78 -24 -22 -28 10 -18 C46 -10 78 -16 78 6 C78 28 24 34 -16 26 C-56 18 -78 22 -78 0 Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="3.5"
          />
          <g className="anim-float">
            <ellipse cx="-16" cy="-4" rx="22" ry="6" fill="#E0F2FE" />
            <ellipse cx="28" cy="10" rx="14" ry="4" fill="#E0F2FE" />
          </g>
        </g>
      );

    case 'electricity':
      return (
        <g transform="translate(149, 208)">
          {/* Water waves */}
          <path
            d="M-76 44 Q-52 28 -28 44 Q-4 60 20 44 Q44 28 68 44"
            fill="none"
            stroke="#0EA5E9"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Hairdryer */}
          <g transform="translate(-14, -20) rotate(-18)">
            <rect x="-32" y="-14" width="52" height="26" rx="12" fill="#475569" stroke="#1E293B" strokeWidth="3" />
            <rect x="-4" y="8" width="16" height="32" rx="6" fill="#334155" />
          </g>
          {/* Animated lightning spark */}
          <g transform="translate(36, -6)">
            <g className="anim-spark">
              <polygon
                points="10,-34 -12,2 4,2 -4,34 24,-6 8,-6"
                fill="#FACC15"
                stroke="#DC2626"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </g>
      );

    case 'window':
      return (
        <g transform="translate(149, 204)">
          {/* Open sky window */}
          <rect x="-56" y="-66" width="112" height="72" rx="6" fill="#BAE6FD" stroke="#0284C7" strokeWidth="4" />
          <line x1="0" y1="-66" x2="0" y2="6" stroke="#0284C7" strokeWidth="3.5" />
          {/* Open shutter frame */}
          <polygon points="56,-66 80,-56 80,14 56,6" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
          {/* Chair placed dangerously beneath window */}
          <rect x="-30" y="20" width="60" height="10" rx="3" fill="#B45309" />
          <rect x="-30" y="-8" width="9" height="28" rx="3" fill="#92400E" />
          <line x1="-22" y1="30" x2="-22" y2="62" stroke="#B45309" strokeWidth="6" strokeLinecap="round" />
          <line x1="22" y1="30" x2="22" y2="62" stroke="#B45309" strokeWidth="6" strokeLinecap="round" />
        </g>
      );

    case 'street':
      return (
        <g transform="translate(149, 204)">
          <rect x="-92" y="22" width="184" height="44" rx="6" fill="#475569" />
          <line x1="-76" y1="44" x2="76" y2="44" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="12 10" />
          <g className="anim-car">
            <rect x="-52" y="-14" width="104" height="32" rx="8" fill="#DC2626" />
            <path d="M-34 -14 L-22 -34 L22 -34 L34 -14 Z" fill="#EF4444" />
            <circle cx="-28" cy="18" r="10" fill="#0F172A" />
            <circle cx="28" cy="18" r="10" fill="#0F172A" />
          </g>
        </g>
      );

    case 'toxic':
      return (
        <g transform="translate(149, 206)">
          <rect x="-18" y="-68" width="36" height="14" rx="4" fill="#DC2626" />
          <path
            d="M-32 -52 L32 -52 L44 50 C44 58 38 62 30 62 L-30 62 C-38 62 -44 58 -44 50 Z"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="3.5"
          />
          <g className="anim-float">
            <polygon points="0,-32 28,-2 0,28 -28,-2" fill="#FFFFFF" stroke="#DC2626" strokeWidth="5" />
            <path
              d="M0 -18 C8 -8 11 -1 9 8 C7 14 3 16 0 16 C-5 16 -9 12 -9 5 C-9 0 -6 -5 -4 -9 C-3 -5 -1 -4 0 -7 Z"
              fill="#1E293B"
            />
          </g>
        </g>
      );

    case 'outlet':
      return (
        <g transform="translate(149, 204)">
          <rect x="-44" y="-44" width="88" height="88" rx="14" fill="#FFFFFF" stroke="#64748B" strokeWidth="4" />
          <circle cx="0" cy="0" r="28" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="-11" cy="0" r="5.5" fill="#1E293B" />
          <circle cx="11" cy="0" r="5.5" fill="#1E293B" />
          {/* Frayed cable */}
          <path d="M-76 58 Q-36 32 -12 46" fill="none" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" />
          <g transform="translate(40, -32)">
            <g className="anim-spark">
              <polygon
                points="10,-24 -10,4 4,4 -4,26 20,-4 6,-4"
                fill="#FACC15"
                stroke="#DC2626"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </g>
      );
  }
}

function DiagramSceneSvg({
  scenario,
  step,
}: {
  scenario: DiagramScenario;
  step: DiagramStep;
}) {
  return (
    <svg
      viewBox="0 0 920 380"
      className="w-full h-full block"
      role="img"
      aria-label={`Schéma animé (${scenario.section}) : ${scenario.title} — Étape ${step}`}
    >
      <rect width="920" height="380" fill="#F8FAFC" />

      {/* STEP 1 BOX: LE DANGER */}
      <g opacity={step >= 1 ? 1 : 0.25}>
        <rect
          x="24"
          y="36"
          width="250"
          height="308"
          rx="18"
          fill="#FFFFFF"
          stroke={step === 1 ? '#D97706' : '#CBD5E1'}
          strokeWidth={step === 1 ? '4' : '2'}
        />
        <text x="149" y="68" textAnchor="middle" fill="#B45309" fontSize="15.5" fontWeight="700">
          1. LE DANGER
        </text>
        <foreignObject x="36" y="78" width="226" height="44">
          <div className="w-full h-full flex items-center justify-center text-center text-[12.5px] leading-snug font-medium text-slate-500">
            {scenario.environment}
          </div>
        </foreignObject>

        <DangerGraphicSvg sceneKey={scenario.sceneKey} />

        <foreignObject x="36" y="282" width="226" height="54">
          <div className="w-full h-full flex items-center justify-center text-center text-[13.5px] leading-snug font-bold text-slate-900">
            {scenario.dangerLabel}
          </div>
        </foreignObject>
      </g>

      {/* FLOW ARROW 1 -> 2 */}
      <g opacity={step >= 2 ? 1 : 0.22}>
        <g className={step === 2 ? 'anim-arrow' : ''}>
          <line x1="286" y1="190" x2="322" y2="190" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />
          <polygon points="334,190 318,180 318,200" fill="#DC2626" />
        </g>
      </g>

      {/* STEP 2 BOX: EXPOSITION -> LE RISQUE */}
      <g opacity={step >= 2 ? 1 : 0.25}>
        <rect
          x="336"
          y="36"
          width="250"
          height="308"
          rx="18"
          fill={step === 2 ? '#FEF2F2' : '#FFFFFF'}
          stroke={step === 2 ? '#DC2626' : '#CBD5E1'}
          strokeWidth={step === 2 ? '4' : '2'}
        />
        <text x="461" y="68" textAnchor="middle" fill="#DC2626" fontSize="15.5" fontWeight="700">
          2. EXPOSITION → RISQUE
        </text>
        <foreignObject x="348" y="78" width="226" height="44">
          <div className="w-full h-full flex items-center justify-center text-center text-[12.5px] leading-snug font-medium text-red-900">
            {scenario.exposureLabel}
          </div>
        </foreignObject>

        <g transform="translate(461, 200)">
          {step === 2 && <circle r="68" fill="#FEE2E2" className="anim-hazard-ring" />}
          <polygon
            points="0,-54 60,44 -60,44"
            fill="#FACC15"
            stroke="#DC2626"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <text x="0" y="24" textAnchor="middle" fill="#0F172A" fontSize="54" fontWeight="800">
            !
          </text>
        </g>

        <foreignObject x="348" y="282" width="226" height="54">
          <div className="w-full h-full flex items-center justify-center text-center text-[13.5px] leading-snug font-bold text-red-800">
            {scenario.riskLabel}
          </div>
        </foreignObject>
      </g>

      {/* FLOW ARROW 2 -> 3 */}
      <g opacity={step >= 3 ? 1 : 0.22}>
        <g className={step === 3 ? 'anim-arrow' : ''}>
          <line x1="598" y1="190" x2="634" y2="190" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
          <polygon points="646,190 630,180 630,200" fill="#059669" />
        </g>
      </g>

      {/* STEP 3 BOX: PRÉVENTION = RISQUE ÉVITÉ */}
      <g opacity={step >= 3 ? 1 : 0.25}>
        <rect
          x="648"
          y="36"
          width="248"
          height="308"
          rx="18"
          fill={step === 3 ? '#ECFDF5' : '#FFFFFF'}
          stroke={step === 3 ? '#059669' : '#CBD5E1'}
          strokeWidth={step === 3 ? '4' : '2'}
        />
        <text x="772" y="68" textAnchor="middle" fill="#047857" fontSize="15.5" fontWeight="700">
          3. PRÉVENTION
        </text>
        <foreignObject x="660" y="78" width="224" height="44">
          <div className="w-full h-full flex items-center justify-center text-center text-[12.5px] leading-snug font-medium text-emerald-800">
            Danger écarté = Risque évité
          </div>
        </foreignObject>

        <g transform="translate(772, 200)">
          <g className={step === 3 ? 'anim-stamp' : ''}>
            <path
              d="M0 -62 L54 -38 L54 8 C54 44 26 66 0 76 C-26 66 -54 44 -54 8 L-54 -38 Z"
              fill="#059669"
              stroke="#065F46"
              strokeWidth="4"
            />
            <path
              d="M-22 6 L-6 22 L26 -14"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>

        <foreignObject x="660" y="282" width="224" height="54">
          <div className="w-full h-full flex items-center justify-center text-center text-[13.5px] leading-snug font-bold text-emerald-800">
            Enfant en sécurité !
          </div>
        </foreignObject>
      </g>
    </svg>
  );
}

export function DangerRiskDiagram({
  initialSection,
  projectionMode,
  onReturnToSection,
}: DangerRiskDiagramProps) {
  const [selectedSection, setSelectedSection] = useState<SectionId>(initialSection);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [step, setStep] = useState<DiagramStep>(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const sectionScenarios = getDiagramScenariosBySection(selectedSection);
  const scenario = sectionScenarios[scenarioIndex] ?? sectionScenarios[0];
  const sectionMeta = SECTIONS[selectedSection];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setStep((prev) => (prev === 3 ? 1 : ((prev + 1) as DiagramStep)));
    }, 2600);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const handleSelectSection = (section: SectionId) => {
    setSelectedSection(section);
    setScenarioIndex(0);
    setStep(1);
    setIsPlaying(false);
  };

  return (
    <section
      aria-label="Schéma pédagogique animé : Un danger n’est pas un risque"
      className="space-y-6"
    >
      {/* Header row with Section selector */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-blue-700">
            Notion clé APS Cycle 1 · {sectionMeta.fullLabel} ({sectionMeta.ageRange})
          </p>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-slate-950 text-balance">
            Comprendre la différence entre un danger et un risque
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Choisissez la section de votre classe pour projeter des dangers adaptés à l’âge des élèves.
          </p>
        </div>

        {/* Section filter segmented control (PS / MS / GS) */}
        <div
          role="group"
          aria-label="Filtrer les schémas par section de maternelle"
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/75 rounded-xl shrink-0"
        >
          {SECTION_ORDER.map((secId) => {
            const meta = SECTIONS[secId];
            const isActive = selectedSection === secId;
            return (
              <button
                key={secId}
                type="button"
                onClick={() => handleSelectSection(secId)}
                aria-pressed={isActive}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {meta.shortLabel} ({meta.ageRange})
              </button>
            );
          })}
        </div>
      </div>

      {/* Age-adapted Scenario Selector Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-semibold text-slate-500">
          Dangers adaptés · {sectionMeta.pdfTemps}
        </div>
        <div
          role="group"
          aria-label={`Exemples de dangers pour la ${sectionMeta.shortLabel}`}
          className="inline-flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl"
        >
          {sectionScenarios.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setScenarioIndex(idx);
                setStep(1);
                setIsPlaying(false);
              }}
              aria-pressed={scenarioIndex === idx}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                scenarioIndex === idx
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main animated schema card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-6 bg-slate-50/70">
          <div className="w-full max-w-[1040px] aspect-[920/380] mx-auto rounded-xl overflow-hidden border border-slate-200 bg-[#F8FAFC]">
            <DiagramSceneSvg scenario={scenario} step={step} />
          </div>
        </div>

        {/* Stepper & Animation controls */}
        <div className="px-5 sm:px-6 py-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label="Étapes du schéma" className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setStep(1);
              }}
              aria-pressed={step === 1}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                step === 1
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <AlertTriangle
                className={`w-4 h-4 ${step === 1 ? 'text-white' : 'text-amber-700'}`}
                aria-hidden="true"
              />
              <span>Étape 1 · Le Danger</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setStep(2);
              }}
              aria-pressed={step === 2}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${
                step === 2
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Zap
                className={`w-4 h-4 ${step === 2 ? 'text-white' : 'text-red-700'}`}
                aria-hidden="true"
              />
              <span>Étape 2 · Le Risque</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setStep(3);
              }}
              aria-pressed={step === 3}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                step === 3
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck
                className={`w-4 h-4 ${step === 3 ? 'text-white' : 'text-emerald-700'}`}
                aria-hidden="true"
              />
              <span>Étape 3 · La Prévention</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" aria-hidden="true" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" aria-hidden="true" />
                  <span>Animer les 3 étapes</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setStep(1);
              }}
              aria-label="Revenir à l’étape 1"
              className="p-2 text-slate-600 hover:text-slate-950 bg-white border border-slate-300 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Explanatory breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className={`p-5 rounded-2xl bg-white border transition-colors ${
            step === 1 ? 'border-amber-400' : 'border-slate-200'
          }`}
        >
          <div className="text-xs font-semibold text-amber-700">01. Identifier le danger</div>
          <h2 className="mt-1 font-display text-lg font-bold text-slate-950">
            {scenario.dangerLabel}
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{scenario.dangerDetail}</p>
        </div>

        <div
          className={`p-5 rounded-2xl bg-white border transition-colors ${
            step === 2 ? 'border-red-400' : 'border-slate-200'
          }`}
        >
          <div className="text-xs font-semibold text-red-700">02. Comprendre le risque</div>
          <h2 className="mt-1 font-display text-lg font-bold text-slate-950">
            {scenario.riskLabel}
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{scenario.riskDetail}</p>
        </div>

        <div
          className={`p-5 rounded-2xl bg-white border transition-colors ${
            step === 3 ? 'border-emerald-400' : 'border-slate-200'
          }`}
        >
          <div className="text-xs font-semibold text-emerald-700">03. Agir pour prévenir</div>
          <h2 className="mt-1 font-display text-lg font-bold text-slate-950">
            {scenario.preventionLabel}
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {scenario.preventionDetail}
          </p>
        </div>
      </div>

      {!projectionMode && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-slate-500">
              Explication orale adaptée à la {sectionMeta.shortLabel} ({sectionMeta.ageRange})
            </div>
            <p className="mt-1.5 text-base font-medium text-slate-900 leading-relaxed">
              {scenario.teacherPhrase}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onReturnToSection(selectedSection)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <span>Exercices {sectionMeta.shortLabel}</span>
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
