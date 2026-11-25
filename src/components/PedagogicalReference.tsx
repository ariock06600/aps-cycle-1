import { ArrowRight, ExternalLink } from 'lucide-react';
import { PDF_SOURCE_URL } from '../data/exercises';
import { SectionId } from '../types/aps';
import { ClpPictogramSvg, WarningTriangleSvgCard } from './OfficialPictograms';

interface PedagogicalReferenceProps {
  onSelectSection: (section: SectionId) => void;
  onOpenDiagram: () => void;
}

export function PedagogicalReference({
  onSelectSection,
  onOpenDiagram,
}: PedagogicalReferenceProps) {
  return (
    <article
      aria-label="Fiche pédagogique complète APS Cycle 1 — DGESCO"
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-blue-700">
            Apprendre à Porter Secours (APS) · Cycle 1 · DGESCO B3-1 (Prévention MAIF & ANCP)
          </div>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-slate-950 text-balance">
            Fiche pédagogique complète : Identifier le danger pour prévenir le risque
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Synthèse intégrale des repères institutionnels, compétences du programme de maternelle,
            progressivité en 3 temps, critères d’évaluation et ressources issues de la fiche officielle.
          </p>
        </div>

        <a
          href={PDF_SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <span>Ouvrir le PDF officiel</span>
          <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
        </a>
      </div>

      {/* 01. Définitions officielles & Cadre institutionnel */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div>
            <div className="text-xs font-semibold text-slate-500">01. Notions fondamentales</div>
            <h2 className="mt-1 font-display text-xl font-bold text-slate-950">
              Distinction entre danger et risque
            </h2>
          </div>

          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <div className="pb-4 border-b border-slate-100">
              <strong className="text-slate-950 font-semibold">Un danger :</strong> propriété ou
              capacité d’un objet, d’une personne, d’un processus… pouvant entraîner des conséquences
              néfastes, aussi appelées <em>dommages</em>. Un danger est donc une{' '}
              <strong>source possible d’accident</strong>.
            </div>
            <div className="pb-4 border-b border-slate-100">
              <strong className="text-slate-950 font-semibold">Le risque :</strong> le risque n’est
              pas un danger — il en est la <strong>conséquence s’il y a exposition au danger</strong>.
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <span className="text-xs text-slate-500">
                Les axes « protéger » et « alerter » sont développés sur des fiches complémentaires APS.
              </span>
              <button
                type="button"
                onClick={onOpenDiagram}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900"
              >
                <span>Projeter le schéma animé</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div>
            <div className="text-xs font-semibold text-slate-500">02. Repères d’organisation</div>
            <h2 className="mt-1 font-display text-xl font-bold text-slate-950">
              Cadre de classe & dispositifs
            </h2>
          </div>

          <dl className="divide-y divide-slate-100 text-sm">
            <div className="py-2.5">
              <dt className="font-semibold text-slate-900">Socle commun · Domaine 4</dt>
              <dd className="mt-0.5 text-slate-600">
                Les systèmes naturels et les systèmes techniques : l’élève « observe les règles
                élémentaires de sécurité liées aux techniques et produits rencontrés dans la vie
                quotidienne ».
              </dd>
            </div>
            <div className="py-2.5">
              <dt className="font-semibold text-slate-900">Organisation & durée</dt>
              <dd className="mt-0.5 text-slate-600">
                Atelier de langage en petit groupe d’élèves · Séances de 10 à 30 minutes selon l’âge
                (PS, MS, GS).
              </dd>
            </div>
            <div className="py-2.5">
              <dt className="font-semibold text-slate-900">Intervenants & dispositifs</dt>
              <dd className="mt-0.5 text-slate-600">
                Professeur des écoles, ATSEM, intervenants · Scénarisation au cours des exercices
                PPMS (risques majeurs) et lien avec l’Éducation à la Sécurité Routière (ESR).
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 03. Domaines d'enseignements & compétences travaillées (Page 2 du PDF) */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="text-xs font-semibold text-slate-500">03. Programmes de l’école maternelle</div>
          <h2 className="mt-1 font-display text-xl font-bold text-slate-950">
            Domaines d’enseignements et compétences travaillées (Cycle 1)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                <th className="py-3.5 px-6 w-1/4">Domaine d’enseignement</th>
                <th className="py-3.5 px-6 w-2/5">Compétences travaillées</th>
                <th className="py-3.5 px-6 w-1/3">Connaissances et compétences associées</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 align-top">
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-950">
                  Mobiliser le langage dans toutes ses dimensions
                </td>
                <td className="py-4 px-6 space-y-1.5 leading-relaxed">
                  <p>• Communiquer avec les adultes et avec les autres enfants par le langage, en se faisant comprendre.</p>
                  <p>• Pratiquer divers usages du langage oral : raconter, décrire, évoquer, questionner, proposer des solutions, discuter un point de vue.</p>
                </td>
                <td className="py-4 px-6 text-slate-600 leading-relaxed">
                  Supports de langage oral variés entre enseignant/élèves, élèves/élèves et élèves/famille (saynètes, albums, marionnettes, photos).
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-950">
                  Explorer le monde du vivant, des objets et de la matière
                </td>
                <td className="py-4 px-6 leading-relaxed">
                  Prendre en compte les risques de l’environnement familier proche (objets et comportements dangereux, produits toxiques).
                </td>
                <td className="py-4 px-6 text-slate-600 leading-relaxed">
                  Mises en scène dans des environnements familiers proches (classe, maison, cour) vers des environnements plus lointains (rue).
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-950">
                  Agir, s’exprimer, comprendre à travers l’activité physique
                </td>
                <td className="py-4 px-6 space-y-1.5 leading-relaxed">
                  <p>• Attirer l’attention des enfants sur leur propre sécurité et celle des autres, dans des situations où le niveau de risque objectif est contrôlé par l’adulte.</p>
                  <p>• Contribuer à la construction d’un enfant actif et désireux de découvrir le monde tout en faisant en sorte que son action ne soit jamais irréversible, qu’il anticipe et évite les risques « réels ».</p>
                </td>
                <td className="py-4 px-6 text-slate-600 leading-relaxed">
                  <strong>Éducation à la sécurité :</strong> prendre conscience des facteurs de dangerosité et prendre des risques mesurés, en construisant deux stratégies complémentaires (prudence/prévention et engagement dans l’action).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 04. Progressivité en 3 Temps (PS / MS / GS) */}
      <section className="space-y-4">
        <div>
          <div className="text-xs font-semibold text-slate-500">04. Démarche pédagogique progressive</div>
          <h2 className="mt-1 font-display text-xl font-bold text-slate-950">
            Description des activités en 3 temps (du proche au lointain)
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Temps 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="text-xs font-semibold text-blue-700">Temps 1 · Petite Section (PS)</div>
              <h3 className="font-display text-lg font-bold text-slate-950">
                Prévenir : les dangers de la classe (« La chasse aux risques »)
              </h3>
              <p className="text-sm font-medium text-slate-800">
                Objectif principal : reconnaître des objets dangereux et des situations dangereuses.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 leading-relaxed">
                <li><strong>Progressivité en coins jeux symboliques</strong> (cuisine, garage, bricolage) : l’enseignant joue et commente → les élèves imitent → animation de peluches/marionnettes/marottes → nomination des objets dangereux → association images/objets réels → reconstitution par maquettes et figurines.</li>
                <li><strong>Jeux en autonomie :</strong> tris et classements de cartes « objets dangereux / sans danger » (70 cartes Riskou) et jeux d’intrus.</li>
                <li><strong>Lien familles :</strong> utilisation de la Malle aux dangers et voyage de la malle dans les familles avec enrichissement personnel.</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onSelectSection('PS')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 pt-3 border-t border-slate-100"
            >
              <span>Ouvrir les 5 exercices PS</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Temps 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="text-xs font-semibold text-amber-700">Temps 2 · Moyenne Section (MS)</div>
              <h3 className="font-display text-lg font-bold text-slate-950">
                Prévenir : les dangers au-delà de la classe
              </h3>
              <p className="text-sm font-medium text-slate-800">
                Objectif principal : reconnaître des situations dangereuses dans des espaces élargis.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 leading-relaxed">
                <li><strong>Transfert classe → maison :</strong> prolongement des situations vécues en classe vers le domicile familial (cuisine, salle de bain, salon) en relation avec les familles.</li>
                <li><strong>Élargissement progressif :</strong> d’un espace proche à un espace plus lointain — la cour de récréation, la salle de motricité, la rue, le domicile.</li>
                <li><strong>Modalités :</strong> saynètes, jeux de rôles, films courts et supports de langage oral variés entre enseignant/élèves, entre pairs et avec la famille.</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onSelectSection('MS')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-900 pt-3 border-t border-slate-100"
            >
              <span>Ouvrir les 5 exercices MS</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Temps 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="text-xs font-semibold text-emerald-700">Temps 3 · Grande Section (GS)</div>
              <h3 className="font-display text-lg font-bold text-slate-950">
                Prévenir : les dangers écartés, les risques évités
              </h3>
              <p className="text-sm font-medium text-slate-800">
                Objectif principal : savoir agir à bon escient et modifier son environnement.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 leading-relaxed">
                <li><strong>Scénariser et transformer :</strong> aménager un coin jeu présentant des dangers, observer/filmer et analyser ensemble, puis modifier l’espace (« intrus » en classe, cour, maison, rue) pour qu’il n’y ait plus de risques.</li>
                <li><strong>Pictogramme du triangle ▲ :</strong> introduire progressivement le triangle comme symbole universel du danger, apprendre à signaler et mettre en mots le danger.</li>
                <li><strong>Rituel hebdomadaire :</strong> chaque semaine, 2 ou 3 élèves signalent un objet ou un lieu dangereux (autocollant, panneau adhésif) et proposent une conduite adéquate.</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onSelectSection('GS')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-900 pt-3 border-t border-slate-100"
            >
              <span>Ouvrir les 5 exercices GS</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 05. Repères officiels des pictogrammes (ISO 7010, Code de la route & CLP/SGH) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div>
          <div className="text-xs font-semibold text-slate-500">
            05. Signalétique officielle en France et en Europe
          </div>
          <h2 className="mt-1 font-display text-xl font-bold text-slate-950">
            Les vrais pictogrammes de danger à reconnaître avec la classe
          </h2>
          <p className="mt-1 text-sm text-slate-600 leading-relaxed">
            Dans les bâtiments et écoles, les triangles d’avertissement suivent la norme internationale{' '}
            <strong>ISO 7010</strong> (fond jaune, bordure et symbole noirs) ; sur la route, le panneau{' '}
            <strong>A14</strong> est blanc à bordure rouge ; sur les produits chimiques ménagers, les pictogrammes{' '}
            <strong>CLP / SGH</strong> sont des losanges blancs à bordure rouge et symbole noir.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center gap-2">
            <WarningTriangleSvgCard variant="w001-general" className="w-14 h-14" title="ISO 7010 W001 : Danger général" />
            <div>
              <div className="text-xs font-bold text-slate-900">Danger général</div>
              <div className="text-[11px] text-slate-500">ISO 7010 · W001</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center gap-2">
            <WarningTriangleSvgCard variant="w011-slippery" className="w-14 h-14" title="ISO 7010 W011 : Sol glissant" />
            <div>
              <div className="text-xs font-bold text-slate-900">Sol glissant</div>
              <div className="text-[11px] text-slate-500">ISO 7010 · W011</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center gap-2">
            <WarningTriangleSvgCard variant="w012-electric" className="w-14 h-14" title="ISO 7010 W012 : Danger électrique" />
            <div>
              <div className="text-xs font-bold text-slate-900">Électricité</div>
              <div className="text-[11px] text-slate-500">ISO 7010 · W012</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center gap-2">
            <WarningTriangleSvgCard variant="a14-road" className="w-14 h-14" title="Code de la route A14 : Danger routier" />
            <div>
              <div className="text-xs font-bold text-slate-900">Danger route</div>
              <div className="text-[11px] text-slate-500">Panneau A14</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center gap-2">
            <ClpPictogramSvg variant="sgh06-toxic" className="w-14 h-14" title="CLP SGH06 : Toxicité aiguë" />
            <div>
              <div className="text-xs font-bold text-slate-900">Toxique</div>
              <div className="text-[11px] text-slate-500">CLP · SGH06</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center gap-2">
            <ClpPictogramSvg variant="sgh02-flammable" className="w-14 h-14" title="CLP SGH02 : Inflammable" />
            <div>
              <div className="text-xs font-bold text-slate-900">Inflammable</div>
              <div className="text-[11px] text-slate-500">CLP · SGH02</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center gap-2">
            <ClpPictogramSvg variant="sgh05-corrosive" className="w-14 h-14" title="CLP SGH05 : Corrosif" />
            <div>
              <div className="text-xs font-bold text-slate-900">Corrosif</div>
              <div className="text-[11px] text-slate-500">CLP · SGH05</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center gap-2">
            <ClpPictogramSvg variant="sgh07-irritant" className="w-14 h-14" title="CLP SGH07 : Nocif ou irritant" />
            <div>
              <div className="text-xs font-bold text-slate-900">Nocif / Irritant</div>
              <div className="text-[11px] text-slate-500">CLP · SGH07</div>
            </div>
          </div>
        </div>
      </section>

      {/* 06. Évaluation & Supports recommandés (Page 3 du PDF) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div>
            <div className="text-xs font-semibold text-slate-500">06. Évaluation envisageable</div>
            <h2 className="mt-1 font-display text-xl font-bold text-slate-950">
              Critères observables à partir de saynètes
            </h2>
          </div>

          <ol className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <li className="flex gap-3">
              <span className="font-display font-bold text-slate-400 tabular-nums">1.</span>
              <span><strong>Observer et décrire un lieu</strong> familier ou scénarisé avec un vocabulaire précis.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-display font-bold text-slate-400 tabular-nums">2.</span>
              <span><strong>Identifier des dangers pour prévenir des risques</strong> à partir de documents divers (images, photos, films, expositions, scènes projetées).</span>
            </li>
            <li className="flex gap-3">
              <span className="font-display font-bold text-slate-400 tabular-nums">3.</span>
              <span><strong>Agir sur l’espace et le modifier</strong> pour qu’il n’y ait plus de dangers (ou signaler par un pictogramme et adopter une conduite prudente).</span>
            </li>
          </ol>
        </div>

        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div>
            <div className="text-xs font-semibold text-slate-500">07. Supports & bibliographie de la fiche</div>
            <h2 className="mt-1 font-display text-xl font-bold text-slate-950">
              Outils, albums et mallettes pour approfondir en classe
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700 leading-relaxed">
            <div className="space-y-1.5">
              <h3 className="font-semibold text-slate-950">Supports Prévention MAIF</h3>
              <p>• Album <em>Riskou</em> et 70 cartes Riskou (dispositif ludo-éducatif avec stickers de signalisation).</p>
              <p>• <em>Malle aux dangers</em> et exposition « Prudent contre les accidents ».</p>
              <p>• Mallette CRDP Champagne-Ardenne Scéren / MAIF (module de 8 séances avec photos grand format).</p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-semibold text-slate-950">Albums jeunesse & mallettes</h3>
              <p>• <em>Attention dans la maison</em> de Catherine Dolto.</p>
              <p>• <em>Les dangers</em> du Docteur F. Rastoin-Faugeron.</p>
              <p>• Mallette INPES <em>Badaboum et Garatoi</em> (4 à 6 ans, théâtre de marionnettes).</p>
              <p>• <em>Les bons conseils de Célestin : la maison en toute sécurité</em> (Citel, 2/5 ans).</p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
