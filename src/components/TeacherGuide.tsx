import { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { PDF_SOURCE_URL } from '../data/exercises';
import { Exercise, SectionMeta } from '../types/aps';

interface TeacherGuideProps {
  section: SectionMeta;
  exercise: Exercise;
  onOpenDiagram: () => void;
  onOpenPedagogy: () => void;
}

export function TeacherGuide({
  section,
  exercise,
  onOpenDiagram,
  onOpenPedagogy,
}: TeacherGuideProps) {
  const [showFullNotes, setShowFullNotes] = useState(true);

  return (
    <aside
      aria-label="Guide pédagogique de la maîtresse"
      className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-5"
    >
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-blue-700">
          Guide de l’enseignante · {section.fullLabel}
        </div>
        <h3 className="mt-1 font-display text-lg font-bold text-slate-950">
          Conduire la séance au tableau
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          {section.ageRange} · {exercise.duration} · {exercise.domain}
        </p>
      </div>

      {/* Spoken instruction for children */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <MessageCircle className="w-4 h-4 text-blue-700 shrink-0" aria-hidden="true" />
          <span>Consigne orale à lire aux élèves</span>
        </div>
        <p className="mt-2 text-[15px] font-medium text-slate-900 leading-relaxed">
          « {exercise.childInstruction} »
        </p>
      </div>

      {/* Atelier de langage prompts */}
      <div className="pt-4 border-t border-slate-100">
        <div className="text-xs font-semibold text-slate-500">
          Atelier de langage · Questions de relance
        </div>
        <ul className="mt-2 space-y-2">
          {exercise.languagePrompts.map((prompt, index) => (
            <li key={index} className="text-sm text-slate-700 leading-relaxed flex gap-2.5">
              <span className="font-display font-bold text-slate-400 tabular-nums shrink-0">
                {index + 1}.
              </span>
              <span>{prompt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Complete Pedagogical Explanations (expanded by default, collapsible) */}
      <div className="pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowFullNotes((prev) => !prev)}
          aria-expanded={showFullNotes}
          className="w-full flex items-center justify-between gap-2 text-left text-xs font-semibold text-slate-800 hover:text-blue-700 transition-colors"
        >
          <span>Explications pédagogiques complètes (APS Cycle 1)</span>
          {showFullNotes ? (
            <ChevronUp className="w-4 h-4 shrink-0 text-slate-400" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" aria-hidden="true" />
          )}
        </button>

        {showFullNotes && (
          <div className="mt-3.5 space-y-4 text-sm text-slate-700 leading-relaxed">
            <div>
              <div className="text-xs font-semibold text-slate-500">Objectif pédagogique</div>
              <p className="mt-1">{exercise.objective}</p>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-500">Compétences travaillées</div>
              <ul className="mt-1 space-y-1">
                {exercise.competencies.map((comp, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span aria-hidden="true" className="text-slate-400">•</span>
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-500">
                Mise en œuvre · Rôle PE / ATSEM
              </div>
              <p className="mt-1">{exercise.workSetup}</p>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-500">
                Étayage & lien avec les familles
              </div>
              <p className="mt-1">{exercise.differentiation}</p>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-500">
                Critère d’évaluation (saynète)
              </div>
              <p className="mt-1">{exercise.evaluationCriteria}</p>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-500">
                Analyse Danger → Risque → Prévention
              </div>
              <p className="mt-1">
                <strong className="text-slate-900">Risque :</strong> {exercise.riskExplanation}
              </p>
              <p className="mt-1">
                <strong className="text-slate-900">Prévention :</strong> {exercise.safeExplanation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Phrase à retenir */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
          <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Phrase-clé à répéter avec la classe</span>
        </div>
        <p className="mt-1.5 text-sm font-semibold text-slate-900 leading-relaxed">
          « {exercise.keyTakeaway} »
        </p>
      </div>

      {/* Quick actions: Danger/Risque Schema + Full Pedagogy + Official PDF */}
      <div className="pt-4 border-t border-slate-100 space-y-2.5 mt-auto">
        <button
          type="button"
          onClick={onOpenDiagram}
          className="w-full px-4 py-2.5 text-sm font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Projeter le schéma Danger ≠ Risque</span>
        </button>

        <button
          type="button"
          onClick={onOpenPedagogy}
          className="w-full px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Toute la fiche pédagogique APS</span>
        </button>

        <a
          href={PDF_SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-950 transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Source officielle DGESCO (PDF)</span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}
