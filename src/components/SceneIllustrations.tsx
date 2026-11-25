import { AnimationPreviewMode } from '../types/aps';
import {
  ClpPictogramArtwork,
  PedestrianLightArtwork,
  WarningTriangleArtwork,
  WarningTriangleVariant,
} from './OfficialPictograms';

interface SceneIllustrationProps {
  sceneKey: string;
  previewMode: AnimationPreviewMode;
  foundIds: string[];
  fixedIds: string[];
  isSolved: boolean;
}

/** Reusable official ISO 7010 / Code de la route A14 Warning Triangle (Temps 3 du PDF DGESCO) */
function WarningTriangleSvg({
  x,
  y,
  size = 54,
  variant = 'w001-general',
}: {
  x: number;
  y: number;
  size?: number;
  variant?: WarningTriangleVariant;
}) {
  const scale = size / 100;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <g className="anim-stamp">
        <g transform={`translate(${-50 * scale}, ${-54 * scale}) scale(${scale})`}>
          <WarningTriangleArtwork variant={variant} />
        </g>
      </g>
    </g>
  );
}

/** Reusable Safe Checkmark badge inside scene */
function SafeCheckSvg({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <g className="anim-stamp">
        <circle cx="0" cy="0" r="18" fill="#059669" stroke="#FFFFFF" strokeWidth="3" />
        <path
          d="M-7 0 L-2 5 L8 -6"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  );
}

export function SceneIllustration({
  sceneKey,
  previewMode,
  foundIds,
  fixedIds,
  isSolved,
}: SceneIllustrationProps) {
  const showSafe = previewMode === 'safe' || isSolved;
  const showRisk = previewMode === 'risk';

  switch (sceneKey) {
    // -----------------------------------------------------------------------
    // PS-2: Coin jeux de la classe (3 intrus : ciseaux, prise, vaporisateur)
    // -----------------------------------------------------------------------
    case 'ps-playroom-intruders': {
      const scissorsSafe = showSafe || foundIds.includes('scissors');
      const outletSafe = showSafe || foundIds.includes('outlet');
      const spraySafe = showSafe || foundIds.includes('spray');

      return (
        <svg viewBox="0 0 800 480" className="w-full h-full block" role="img" aria-label="Coin jeux de la classe">
          {/* Wall & floor */}
          <rect width="800" height="300" fill="#EFF6FF" />
          <rect y="300" width="800" height="180" fill="#FDE68A" />
          <line x1="0" y1="300" x2="800" y2="300" stroke="#CBD5E1" strokeWidth="4" />

          {/* Classroom poster ABC */}
          <rect x="70" y="52" width="160" height="110" rx="10" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="3" />
          <text x="150" y="96" textAnchor="middle" fill="#1D4ED8" fontSize="34" fontWeight="700">A B C</text>
          <circle cx="110" cy="132" r="11" fill="#F59E0B" />
          <rect x="139" y="121" width="22" height="22" rx="4" fill="#10B981" />
          <polygon points="190,121 202,143 178,143" fill="#EF4444" />

          {/* Bookshelf */}
          <rect x="285" y="135" width="210" height="165" rx="8" fill="#D97706" />
          <rect x="299" y="150" width="182" height="62" rx="4" fill="#FEF3C7" />
          <rect x="299" y="224" width="182" height="62" rx="4" fill="#FEF3C7" />
          {/* Colorful books */}
          <rect x="312" y="164" width="22" height="48" rx="3" fill="#2563EB" />
          <rect x="338" y="170" width="20" height="42" rx="3" fill="#10B981" />
          <rect x="362" y="160" width="24" height="52" rx="3" fill="#F59E0B" />
          <rect x="392" y="168" width="22" height="44" rx="3" fill="#EC4899" />

          {/* Round play rug */}
          <ellipse cx="380" cy="378" rx="285" ry="74" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="5" />

          {/* Safe Teddy Bear (center-left) */}
          <g transform="translate(328, 314)">
            <circle cx="-18" cy="-28" r="11" fill="#B45309" />
            <circle cx="18" cy="-28" r="11" fill="#B45309" />
            <circle cx="0" cy="-12" r="24" fill="#D97706" />
            <ellipse cx="0" cy="-5" rx="10" ry="8" fill="#FDE68A" />
            <circle cx="-8" cy="-16" r="3" fill="#1E293B" />
            <circle cx="8" cy="-16" r="3" fill="#1E293B" />
            <circle cx="0" cy="-8" r="3.5" fill="#78350F" />
            <ellipse cx="0" cy="24" rx="22" ry="26" fill="#D97706" />
            <ellipse cx="0" cy="24" rx="12" ry="15" fill="#FDE68A" />
          </g>

          {/* Safe Wooden Blocks */}
          <rect x="250" y="388" width="34" height="34" rx="5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
          <rect x="290" y="388" width="34" height="34" rx="5" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
          <rect x="270" y="354" width="34" height="34" rx="5" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />

          {/* HAZARD 1: Pointy Scissors (x=24% -> 192, y=72% -> 346) */}
          {!scissorsSafe ? (
            <g transform="translate(192, 346)">
              {showRisk && <circle r="44" fill="#FEE2E2" opacity="0.85" className="anim-hazard-ring" />}
              <circle cx="-22" cy="14" r="13" fill="none" stroke="#DC2626" strokeWidth="6" />
              <circle cx="-22" cy="-14" r="13" fill="none" stroke="#DC2626" strokeWidth="6" />
              <path d="M-8 -4 L44 -16 L40 -2 L-8 4 Z" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
              <path d="M-8 4 L44 16 L40 2 L-8 -4 Z" fill="#CBD5E1" stroke="#334155" strokeWidth="2" />
              <circle cx="2" cy="0" r="3.5" fill="#1E293B" />
            </g>
          ) : (
            <SafeCheckSvg x={192} y={346} />
          )}

          {/* HAZARD 2: Wall Electrical Outlet (x=78% -> 624, y=52% -> 250) */}
          <g transform="translate(624, 250)">
            <rect x="-32" y="-32" width="64" height="64" rx="10" fill="#FFFFFF" stroke="#64748B" strokeWidth="3.5" />
            <circle cx="0" cy="0" r="21" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
            {outletSafe ? (
              <>
                <circle cx="0" cy="0" r="19" fill="#DCFCE7" stroke="#059669" strokeWidth="3" />
                <SafeCheckSvg x={26} y={-26} />
              </>
            ) : (
              <>
                <circle cx="-9" cy="0" r="4.5" fill="#0F172A" />
                <circle cx="9" cy="0" r="4.5" fill="#0F172A" />
                <g className="anim-spark">
                  <polygon points="28,-38 14,-14 26,-14 20,6 40,-18 28,-18" fill="#FACC15" stroke="#DC2626" strokeWidth="2.5" />
                </g>
              </>
            )}
          </g>

          {/* HAZARD 3: Toxic Spray Bottle (x=56% -> 448, y=74% -> 355) */}
          {!spraySafe ? (
            <g transform="translate(448, 355)">
              {showRisk && <circle r="44" fill="#FEE2E2" opacity="0.85" className="anim-hazard-ring" />}
              <rect x="-8" y="-44" width="16" height="16" fill="#DC2626" />
              <path d="M-16 -44 L18 -44 L24 -34 L-16 -34 Z" fill="#EF4444" />
              <path d="M-22 -28 L22 -28 L28 32 C28 38 22 42 16 42 L-16 42 C-22 42 -28 38 -28 32 Z" fill="#FACC15" stroke="#B45309" strokeWidth="3" />
              <g transform="translate(-20, -14) scale(0.4)">
                <ClpPictogramArtwork variant="sgh07-irritant" />
              </g>
            </g>
          ) : (
            <SafeCheckSvg x={448} y={355} />
          )}
        </svg>
      );
    }

    // -----------------------------------------------------------------------
    // PS-3: Marionnette Léo devant la casserole fumante
    // -----------------------------------------------------------------------
    case 'ps-puppet-pot': {
      return (
        <svg viewBox="0 0 800 480" className="w-full h-full block" role="img" aria-label="Saynète de la marionnette Léo devant la casserole chaude">
          <rect width="800" height="320" fill="#FFFBEB" />
          <rect y="320" width="800" height="160" fill="#E2E8F0" />

          {/* Kitchen stove */}
          <rect x="410" y="210" width="260" height="210" rx="10" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="4" />
          <rect x="442" y="268" width="196" height="122" rx="8" fill="#1E293B" />
          <circle cx="458" cy="238" r="10" fill="#DC2626" />
          <circle cx="496" cy="238" r="10" fill="#64748B" />
          <circle cx="534" cy="238" r="10" fill="#64748B" />

          {/* Glowing red hot burner */}
          <ellipse cx="525" cy="210" rx="74" ry="11" fill="#EF4444" />

          {/* Steaming pot */}
          <g transform={showRisk ? 'translate(525, 165) rotate(-18)' : 'translate(525, 165)'}>
            {/* Handle: points dangerously left unless safe */}
            {showSafe ? (
              <rect x="52" y="-16" width="66" height="14" rx="7" fill="#1E293B" />
            ) : (
              <rect x="-126" y="-16" width="76" height="14" rx="7" fill="#DC2626" />
            )}
            <rect x="-64" y="-32" width="128" height="72" rx="10" fill="#475569" stroke="#1E293B" strokeWidth="3.5" />
            <ellipse cx="0" cy="-32" rx="64" ry="10" fill="#38BDF8" stroke="#1E293B" strokeWidth="3" />
          </g>

          {/* Animated Steam */}
          <g className="anim-steam">
            <path d="M490 120 C482 94 504 86 496 58" fill="none" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
            <path d="M525 112 C516 84 538 74 530 44" fill="none" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
          </g>
          <g className="anim-steam-delay">
            <path d="M560 120 C552 94 574 86 566 58" fill="none" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
          </g>

          {/* Risk splash droplets if risk preview */}
          {showRisk && (
            <g>
              <path d="M440 170 C400 205 385 245 390 278" fill="none" stroke="#EF4444" strokeWidth="8" strokeDasharray="10 10" strokeLinecap="round" />
              <WarningTriangleSvg x={410} y={132} size={58} />
            </g>
          )}

          {/* Puppet Léo (moves safely far back when showSafe!) */}
          <g transform={showSafe ? 'translate(160, 290)' : showRisk ? 'translate(330, 290)' : 'translate(260, 290)'}>
            {/* Body */}
            <path d="M-45 120 C-45 30 45 30 45 120 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="4" />
            {/* Head */}
            <circle cx="0" cy="-16" r="46" fill="#FDBA74" stroke="#C2410C" strokeWidth="3" />
            {/* Hair tufts */}
            <path d="M-32 -52 Q0 -76 32 -52" fill="#92400E" />
            {/* Eyes */}
            <circle cx="-15" cy="-22" r="5" fill="#0F172A" />
            <circle cx="15" cy="-22" r="5" fill="#0F172A" />
            {/* Expression */}
            {showRisk ? (
              <circle cx="0" cy="4" r="10" fill="#DC2626" />
            ) : (
              <path d="M-16 0 Q0 16 16 0" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
            )}
            {/* Arm reaching or stepping back */}
            {!showSafe ? (
              <path d="M36 46 L108 12" stroke="#FDBA74" strokeWidth="16" strokeLinecap="round" />
            ) : (
              <path d="M-36 46 L-64 16" stroke="#FDBA74" strokeWidth="16" strokeLinecap="round" />
            )}
          </g>

          {/* Safe barrier & Adult when solved/safe */}
          {showSafe && (
            <g>
              <line x1="340" y1="120" x2="340" y2="430" stroke="#059669" strokeWidth="5" strokeDasharray="12 10" />
              <SafeCheckSvg x={340} y={160} />
              <rect x="92" y="88" width="210" height="44" rx="10" fill="#DCFCE7" stroke="#059669" strokeWidth="2.5" />
              <text x="197" y="116" textAnchor="middle" fill="#065F46" fontSize="18" fontWeight="700">Léo recule en sécurité</text>
            </g>
          )}
        </svg>
      );
    }

    // -----------------------------------------------------------------------
    // PS-5: Table d'atelier (verre cassé + flaque d'eau)
    // -----------------------------------------------------------------------
    case 'ps-table-hazards': {
      const glassSafe = showSafe || foundIds.includes('broken-glass');
      const puddleSafe = showSafe || foundIds.includes('water-puddle');

      return (
        <svg viewBox="0 0 800 480" className="w-full h-full block" role="img" aria-label="Table d’atelier de la classe">
          <rect width="800" height="275" fill="#F8FAFC" />
          <rect y="275" width="800" height="205" fill="#E2E8F0" />

          {/* Classroom workshop table */}
          <rect x="200" y="218" width="400" height="24" rx="6" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
          <rect x="228" y="242" width="18" height="115" fill="#B45309" />
          <rect x="554" y="242" width="18" height="115" fill="#B45309" />

          {/* Safe crayon cup on table (x=49% -> 392, y=44% -> 211) */}
          <g transform="translate(392, 188)">
            <rect x="-12" y="-32" width="8" height="36" rx="3" fill="#EF4444" transform="rotate(-12)" />
            <rect x="-3" y="-36" width="8" height="40" rx="3" fill="#2563EB" />
            <rect x="7" y="-30" width="8" height="34" rx="3" fill="#10B981" transform="rotate(14)" />
            <rect x="-24" y="-8" width="48" height="38" rx="6" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
          </g>

          {/* Drawing sheet */}
          <rect x="260" y="196" width="90" height="22" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />

          {/* HAZARD 1: Broken Glass on floor (x=28% -> 224, y=78% -> 374) */}
          {!glassSafe ? (
            <g transform="translate(224, 374)">
              {showRisk && <circle r="48" fill="#FEE2E2" opacity="0.85" className="anim-hazard-ring" />}
              <polygon points="-32,12 -10,-20 6,16" fill="#BAE6FD" stroke="#0284C7" strokeWidth="3" />
              <polygon points="8,-10 34,-2 16,22" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
              <polygon points="-14,18 10,8 2,30" fill="#7DD3FC" stroke="#0369A1" strokeWidth="2.5" />
              <g className="anim-spark">
                <line x1="-18" y1="-28" x2="-18" y2="-16" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
                <line x1="-24" y1="-22" x2="-12" y2="-22" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>
          ) : (
            <SafeCheckSvg x={224} y={374} />
          )}

          {/* HAZARD 2: Large Water Puddle (x=68% -> 544, y=80% -> 384) */}
          {!puddleSafe ? (
            <g transform="translate(544, 384)">
              {showRisk && <ellipse rx="78" ry="34" fill="#FEE2E2" opacity="0.8" className="anim-hazard-ring" />}
              <path
                d="M-72 0 C-72 -24 -28 -26 4 -20 C36 -14 74 -20 74 2 C74 24 30 30 -8 24 C-46 18 -72 22 -72 0 Z"
                fill="#38BDF8"
                stroke="#0284C7"
                strokeWidth="3.5"
                opacity="0.88"
              />
              <ellipse cx="-18" cy="-4" rx="20" ry="6" fill="#E0F2FE" opacity="0.8" className="anim-float" />
              <ellipse cx="26" cy="8" rx="14" ry="4" fill="#E0F2FE" opacity="0.7" />
            </g>
          ) : (
            <SafeCheckSvg x={544} y={384} />
          )}
        </svg>
      );
    }

    // -----------------------------------------------------------------------
    // MS-1 & GS-2: Cuisine familiale (Chasse aux dangers OU Modifier l'espace!)
    // -----------------------------------------------------------------------
    case 'ms-home-kitchen':
    case 'gs-fix-kitchen': {
      const potSafe =
        showSafe || foundIds.includes('pot-handle') || fixedIds.includes('turn-handle');
      const knifeSafe =
        showSafe || foundIds.includes('edge-knife') || fixedIds.includes('store-knife');
      const cleanerSafe =
        showSafe || foundIds.includes('under-sink') || fixedIds.includes('lock-cleaner');

      return (
        <svg viewBox="0 0 800 480" className="w-full h-full block" role="img" aria-label="Cuisine familiale interactive">
          {/* Wall & backsplash tiles */}
          <rect width="800" height="270" fill="#F1F5F9" />
          <rect y="270" width="800" height="210" fill="#E2E8F0" />
          {/* High locked cabinet (top right) */}
          <rect x="550" y="34" width="190" height="106" rx="8" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="3.5" />
          <line x1="645" y1="34" x2="645" y2="140" stroke="#94A3B8" strokeWidth="3" />
          <circle cx="630" cy="96" r="5" fill="#475569" />
          <circle cx="660" cy="96" r="5" fill="#475569" />
          {cleanerSafe && (
            <g transform="translate(696, 86)">
              <rect x="-12" y="-18" width="24" height="32" rx="4" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
              <SafeCheckSvg x={34} y={-24} />
            </g>
          )}

          {/* Countertop */}
          <rect x="46" y="254" width="708" height="26" rx="5" fill="#CBD5E1" stroke="#64748B" strokeWidth="3" />
          {/* Lower cabinets */}
          <rect x="56" y="280" width="220" height="170" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="3" />
          <rect x="276" y="280" width="234" height="170" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="3" />
          <rect x="510" y="280" width="234" height="170" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="3" />

          {/* Stove oven window */}
          <rect x="92" y="318" width="148" height="102" rx="8" fill="#1E293B" />
          <ellipse cx="166" cy="254" rx="56" ry="8" fill="#EF4444" />

          {/* HAZARD 1: Pot with handle sticking out (x=24..27%, y=46..48%) */}
          <g transform="translate(166, 212)">
            {potSafe ? (
              /* Handle rotated safely toward back/left wall */
              <rect x="-98" y="-12" width="52" height="12" rx="6" fill="#059669" />
            ) : (
              /* Handle sticking dangerously outward to the right/front */
              <g>
                {showRisk && <circle cx="66" cy="-6" r="34" fill="#FEE2E2" opacity="0.85" className="anim-hazard-ring" />}
                <rect x="44" y="-12" width="76" height="14" rx="7" fill="#DC2626" />
              </g>
            )}
            <rect x="-48" y="-26" width="96" height="62" rx="8" fill="#475569" stroke="#1E293B" strokeWidth="3" />
            <g className="anim-steam">
              <path d="M-16 -34 C-22 -56 -4 -66 -12 -86" fill="none" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
              <path d="M16 -34 C10 -58 28 -66 20 -88" fill="none" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" opacity="0.65" />
            </g>
            {potSafe && <SafeCheckSvg x={48} y={-28} />}
          </g>

          {/* Safe fruit bowl (x=42% -> 336, y=46% -> 220) */}
          <g transform="translate(336, 228)">
            <circle cx="-12" cy="-6" r="13" fill="#EF4444" />
            <circle cx="12" cy="-6" r="13" fill="#22C55E" />
            <circle cx="0" cy="-16" r="12" fill="#FACC15" />
            <path d="M-32 0 Q0 34 32 0 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="3" />
          </g>

          {/* HAZARD 2: Knife on counter edge (x=52..54% -> 426, y=52% -> 250) */}
          {knifeSafe ? (
            /* Safely stored in high wooden knife block */
            <g transform="translate(432, 178)">
              <rect x="-24" y="0" width="48" height="72" rx="6" fill="#B45309" />
              <rect x="-10" y="-16" width="18" height="18" rx="3" fill="#1E293B" />
              <SafeCheckSvg x={28} y={-10} />
            </g>
          ) : (
            <g transform="translate(426, 250)">
              {showRisk && <circle r="40" fill="#FEE2E2" opacity="0.85" className="anim-hazard-ring" />}
              <rect x="-44" y="-12" width="38" height="14" rx="4" fill="#1E293B" />
              <path d="M-6 -12 L48 -12 Q42 8 -6 4 Z" fill="#CBD5E1" stroke="#334155" strokeWidth="2.5" />
            </g>
          )}

          {/* Sink & Faucet */}
          <rect x="556" y="246" width="144" height="16" rx="4" fill="#94A3B8" />
          <path d="M628 246 L628 198 C628 182 652 182 652 198" fill="none" stroke="#64748B" strokeWidth="8" strokeLinecap="round" />

          {/* HAZARD 3: Open under-sink cabinet with toxic bottle (x=78% -> 624, y=76% -> 364) */}
          {cleanerSafe ? (
            <g transform="translate(624, 364)">
              <rect x="-84" y="-64" width="168" height="128" rx="6" fill="#DCFCE7" stroke="#059669" strokeWidth="3.5" />
              <line x1="0" y1="-64" x2="0" y2="64" stroke="#059669" strokeWidth="3" />
              <SafeCheckSvg x={0} y={0} />
            </g>
          ) : (
            <g transform="translate(624, 364)">
              {showRisk && <circle r="54" fill="#FEE2E2" opacity="0.85" className="anim-hazard-ring" />}
              <rect x="-78" y="-60" width="156" height="120" rx="4" fill="#334155" />
              {/* Open swinging door */}
              <polygon points="78,-60 116,-44 116,74 78,60" fill="#E2E8F0" stroke="#64748B" strokeWidth="3" />
              {/* Toxic bottle inside with official CLP SGH06 pictogram */}
              <rect x="-16" y="-44" width="22" height="12" rx="3" fill="#DC2626" />
              <rect x="-28" y="-32" width="46" height="74" rx="8" fill="#FACC15" stroke="#CA8A04" strokeWidth="3" />
              <g transform="translate(-25, -15) scale(0.4)">
                <ClpPictogramArtwork variant="sgh06-toxic" />
              </g>
            </g>
          )}
        </svg>
      );
    }

    // -----------------------------------------------------------------------
    // MS-2: Salle de bain — Eau + Électricité
    // -----------------------------------------------------------------------
    case 'ms-bathroom-shock': {
      return (
        <svg viewBox="0 0 800 480" className="w-full h-full block" role="img" aria-label="Salle de bain avec lavabo et sèche-cheveux">
          <rect width="800" height="310" fill="#E0F2FE" />
          <rect y="310" width="800" height="170" fill="#F1F5F9" />

          {/* Mirror */}
          <rect x="255" y="42" width="250" height="150" rx="16" fill="#FFFFFF" stroke="#7DD3FC" strokeWidth="6" />
          <line x1="286" y1="74" x2="334" y2="122" stroke="#BAE6FD" strokeWidth="6" strokeLinecap="round" />

          {/* Sink basin */}
          <path d="M235 244 L525 244 L495 310 L265 310 Z" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="4" />
          <rect x="355" y="310" width="50" height="110" fill="#CBD5E1" />
          {/* Faucet & water */}
          <path d="M380 244 L380 206 C380 192 406 192 406 208" fill="none" stroke="#64748B" strokeWidth="9" strokeLinecap="round" />
          <path d="M406 218 L406 254" stroke="#0EA5E9" strokeWidth="10" strokeLinecap="round" opacity={showSafe ? 0.3 : 0.9} />
          <ellipse cx="380" cy="256" rx="112" ry="14" fill="#38BDF8" opacity="0.7" />

          {/* Wall socket */}
          <rect x="574" y="160" width="60" height="60" rx="10" fill="#FFFFFF" stroke="#64748B" strokeWidth="3.5" />
          <circle cx="594" cy="190" r="4" fill="#1E293B" />
          <circle cx="614" cy="190" r="4" fill="#1E293B" />

          {/* Hairdryer & cord */}
          {showSafe ? (
            <g>
              {/* Unplugged and stored safely far away on right shelf */}
              <rect x="654" y="218" width="110" height="12" rx="4" fill="#94A3B8" />
              <g transform="translate(706, 190)">
                <rect x="-26" y="-14" width="44" height="24" rx="10" fill="#059669" />
                <rect x="-4" y="6" width="14" height="26" rx="5" fill="#047857" />
              </g>
              <SafeCheckSvg x={604} y={120} />
              <rect x="260" y="352" width="280" height="44" rx="10" fill="#DCFCE7" stroke="#059669" strokeWidth="2.5" />
              <text x="400" y="380" textAnchor="middle" fill="#065F46" fontSize="18" fontWeight="700">Appareil débranché · Loin de l’eau</text>
            </g>
          ) : (
            <g>
              {/* Plugged cord dangling into sink area */}
              <path d="M604 190 C604 285 524 295 496 244" fill="none" stroke="#1E293B" strokeWidth="5" />
              <g transform="translate(474, 224) rotate(-25)">
                <rect x="-32" y="-14" width="52" height="26" rx="12" fill="#EF4444" stroke="#991B1B" strokeWidth="3" />
                <rect x="-6" y="8" width="16" height="32" rx="6" fill="#DC2626" />
              </g>
              {/* Animated electric sparks between water and hairdryer */}
              <g className="anim-spark">
                <polygon points="445,172 422,216 442,216 430,256 468,204 446,204" fill="#FACC15" stroke="#DC2626" strokeWidth="3" />
              </g>
              {showRisk && <WarningTriangleSvg x={445} y={136} size={62} variant="w012-electric" />}
            </g>
          )}
        </svg>
      );
    }

    // -----------------------------------------------------------------------
    // MS-3: Cour de récréation (toboggan, bâton, portail ouvert)
    // -----------------------------------------------------------------------
    case 'ms-playground': {
      const slideSafe = showSafe || foundIds.includes('slide-standing');
      const stickSafe = showSafe || foundIds.includes('running-stick');
      const gateSafe = showSafe || foundIds.includes('open-gate');

      return (
        <svg viewBox="0 0 800 480" className="w-full h-full block" role="img" aria-label="Cour de récréation de l’école">
          {/* Sky & sun */}
          <rect width="800" height="230" fill="#E0F2FE" />
          <circle cx="90" cy="70" r="34" fill="#FDE047" />
          {/* Courtyard ground */}
          <rect y="230" width="800" height="250" fill="#FDE68A" />
          {/* School fence */}
          <rect x="0" y="188" width="590" height="52" fill="#CBD5E1" stroke="#64748B" strokeWidth="3" />
          {[60, 120, 180, 240, 300, 360, 420, 480, 540].map((lx) => (
            <line key={lx} x1={lx} y1="188" x2={lx} y2="240" stroke="#64748B" strokeWidth="3" />
          ))}

          {/* Safe hopscotch grid (x=42% -> 336, y=82% -> 394) */}
          <g transform="translate(270, 366)">
            <rect x="0" y="0" width="38" height="38" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
            <rect x="38" y="0" width="38" height="38" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
            <rect x="76" y="-18" width="38" height="38" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
            <rect x="76" y="20" width="38" height="38" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
            <text x="19" y="26" textAnchor="middle" fill="#0284C7" fontSize="20" fontWeight="700">1</text>
            <text x="57" y="26" textAnchor="middle" fill="#0284C7" fontSize="20" fontWeight="700">2</text>
          </g>

          {/* HAZARD 1: Slide with child standing vs sitting (x=24% -> 192, y=42% -> 200) */}
          <g transform="translate(150, 195)">
            <line x1="-25" y1="140" x2="10" y2="20" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
            <path d="M10 20 Q55 88 128 138" fill="none" stroke="#0284C7" strokeWidth="18" strokeLinecap="round" />
            {slideSafe ? (
              /* Child sitting safely */
              <g transform="translate(26, 22)">
                <circle cx="0" cy="-22" r="14" fill="#FDBA74" />
                <path d="M-8 -6 L4 14 L24 14" fill="none" stroke="#059669" strokeWidth="10" strokeLinecap="round" />
                <SafeCheckSvg x={46} y={-28} />
              </g>
            ) : (
              /* Child standing dangerously on top */
              <g transform="translate(16, -24)">
                {showRisk && <circle r="44" fill="#FEE2E2" opacity="0.85" className="anim-hazard-ring" />}
                <circle cx="0" cy="-28" r="14" fill="#FDBA74" />
                <line x1="0" y1="-12" x2="0" y2="22" stroke="#DC2626" strokeWidth="10" strokeLinecap="round" />
                <line x1="-18" y1="0" x2="18" y2="-8" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
                <line x1="0" y1="22" x2="-10" y2="44" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
                <line x1="0" y1="22" x2="10" y2="44" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
              </g>
            )}
          </g>

          {/* HAZARD 2: Child running with sharp stick (x=52% -> 416, y=66% -> 316) */}
          <g transform="translate(416, 316)">
            {!stickSafe && showRisk && <circle r="48" fill="#FEE2E2" opacity="0.85" className="anim-hazard-ring" />}
            <circle cx="0" cy="-42" r="15" fill="#FDBA74" />
            <rect x="-12" y="-26" width="24" height="38" rx="8" fill={stickSafe ? '#059669' : '#F59E0B'} />
            <line x1="-6" y1="12" x2="-18" y2="42" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
            <line x1="6" y1="12" x2="20" y2="38" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
            {stickSafe ? (
              <SafeCheckSvg x={36} y={-34} />
            ) : (
              <g>
                {/* Pointed stick held forward while running */}
                <line x1="12" y1="-10" x2="72" y2="-24" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
                <polygon points="78,-26 66,-30 68,-18" fill="#DC2626" />
              </g>
            )}
          </g>

          {/* HAZARD 3: Open School Gate to street (x=84% -> 672, y=54% -> 260) */}
          <g transform="translate(672, 238)">
            {/* Street beyond gate */}
            <rect x="-46" y="-56" width="128" height="106" fill="#64748B" />
            <line x1="-30" y1="-2" x2="66" y2="-2" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="14 10" />
            {gateSafe ? (
              <>
                <rect x="-46" y="-56" width="128" height="106" fill="#CBD5E1" stroke="#059669" strokeWidth="5" />
                {[-20, 6, 32, 58].map((gx) => (
                  <line key={gx} x1={gx} y1="-56" x2={gx} y2="50" stroke="#475569" strokeWidth="4" />
                ))}
                <SafeCheckSvg x={18} y={-2} />
              </>
            ) : (
              <>
                {showRisk && <circle cx="16" cy="0" r="56" fill="#FEE2E2" opacity="0.8" className="anim-hazard-ring" />}
                {/* Swung open gate leaf */}
                <polygon points="-46,-56 14,-28 14,76 -46,50" fill="#94A3B8" stroke="#475569" strokeWidth="4" />
                {showRisk && <WarningTriangleSvg x={38} y={-10} size={52} />}
              </>
            )}
          </g>
        </svg>
      );
    }

    // -----------------------------------------------------------------------
    // MS-4: Salle de motricité
    // -----------------------------------------------------------------------
    case 'ms-gym-course': {
      return (
        <svg viewBox="0 0 800 480" className="w-full h-full block" role="img" aria-label="Salle de motricité avec banc et tapis bleu">
          <rect width="800" height="295" fill="#FFF7ED" />
          <rect y="295" width="800" height="185" fill="#FDE68A" />

          {/* Wall bars (espaliers) */}
          <rect x="64" y="54" width="130" height="240" fill="none" stroke="#B45309" strokeWidth="8" />
          {[90, 128, 166, 204, 242].map((ry) => (
            <line key={ry} x1="64" y1={ry} x2="194" y2={ry} stroke="#D97706" strokeWidth="6" />
          ))}

          {/* Wooden gym bench */}
          <rect x="235" y="255" width="190" height="22" rx="4" fill="#D97706" stroke="#92400E" strokeWidth="3" />
          <rect x="255" y="277" width="18" height="62" fill="#92400E" />
          <rect x="387" y="277" width="18" height="62" fill="#92400E" />

          {/* Big Blue Landing Mat */}
          <rect x="442" y="318" width="236" height="44" rx="10" fill="#0284C7" stroke="#0369A1" strokeWidth="4" />
          <line x1="464" y1="336" x2="656" y2="336" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />

          {/* Child jumping onto mat */}
          <g transform={showSafe ? 'translate(540, 260)' : 'translate(418, 202)'}>
            <circle cx="0" cy="-34" r="17" fill="#FDBA74" />
            <rect x="-14" y="-16" width="28" height="42" rx="9" fill="#059669" />
            <line x1="-10" y1="26" x2="-16" y2="54" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" />
            <line x1="10" y1="26" x2="18" y2="54" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" />
          </g>

          {/* Second child: waiting safely behind vs pushing close */}
          <g transform={showSafe ? 'translate(268, 212)' : 'translate(358, 212)'}>
            <circle cx="0" cy="-34" r="17" fill="#FDBA74" />
            <rect x="-14" y="-16" width="28" height="42" rx="9" fill={showSafe ? '#2563EB' : '#EF4444'} />
            <line x1="-8" y1="26" x2="-10" y2="50" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" />
            <line x1="8" y1="26" x2="10" y2="50" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" />
          </g>

          {showRisk && (
            <g>
              <WarningTriangleSvg x={390} y={120} size={60} />
              <line x1="376" y1="205" x2="404" y2="205" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
            </g>
          )}
          {showSafe && (
            <g>
              <SafeCheckSvg x={540} y={168} />
              <rect x="442" y="88" width="250" height="44" rx="10" fill="#DCFCE7" stroke="#059669" strokeWidth="2.5" />
              <text x="567" y="116" textAnchor="middle" fill="#065F46" fontSize="18" fontWeight="700">Chacun son tour sur le tapis</text>
            </g>
          )}
        </svg>
      );
    }

    // -----------------------------------------------------------------------
    // GS-1: Couloir d'école — Poser le pictogramme Triangle de danger ▲
    // -----------------------------------------------------------------------
    case 'gs-school-signal': {
      const wetSignaled = showSafe || foundIds.includes('wet-corridor');
      const cableSignaled = showSafe || foundIds.includes('loose-cable');
      const cabinetSignaled = showSafe || foundIds.includes('open-cabinet');

      return (
        <svg viewBox="0 0 800 480" className="w-full h-full block" role="img" aria-label="Couloir de l’école à signaler avec le triangle danger">
          <rect width="800" height="290" fill="#F8FAFC" />
          <rect y="290" width="800" height="190" fill="#E2E8F0" />
          <line x1="0" y1="290" x2="800" y2="290" stroke="#CBD5E1" strokeWidth="4" />

          {/* Safe Coat hooks (x=34% -> 272, y=42% -> 200) */}
          <g transform="translate(272, 195)">
            <rect x="-110" y="-14" width="220" height="20" rx="5" fill="#B45309" />
            <path d="M-76 6 L-94 64 L-58 64 Z" fill="#3B82F6" />
            <path d="M0 6 L-18 64 L18 64 Z" fill="#10B981" />
            <path d="M76 6 L58 64 L94 64 Z" fill="#F59E0B" />
          </g>

          {/* HAZARD 1: Wet floor puddle (x=24% -> 192, y=76% -> 365) */}
          <g transform="translate(192, 365)">
            {!wetSignaled && showRisk && <ellipse rx="84" ry="38" fill="#FEE2E2" opacity="0.8" className="anim-hazard-ring" />}
            <path
              d="M-76 0 C-76 -24 -22 -28 12 -18 C48 -10 78 -18 78 6 C78 28 24 32 -16 26 C-56 20 -76 22 -76 0 Z"
              fill="#38BDF8"
              stroke="#0284C7"
              strokeWidth="3.5"
              opacity="0.85"
            />
            {wetSignaled && <WarningTriangleSvg x={0} y={-24} size={64} variant="w011-slippery" />}
          </g>

          {/* HAZARD 2: Loose Power Cable across hallway (x=54% -> 432, y=74% -> 355) */}
          <g transform="translate(432, 355)">
            {!cableSignaled && showRisk && <circle r="48" fill="#FEE2E2" opacity="0.8" className="anim-hazard-ring" />}
            <path
              d="M-72 -42 C-42 20 -10 -24 22 18 C48 52 72 6 88 28"
              fill="none"
              stroke="#0F172A"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <rect x="-82" y="-62" width="22" height="26" rx="4" fill="#475569" />
            {cableSignaled && <WarningTriangleSvg x={10} y={-18} size={64} variant="w012-electric" />}
          </g>

          {/* HAZARD 3: Open Cleaning Cabinet (x=82% -> 656, y=52% -> 250) */}
          <g transform="translate(656, 232)">
            <rect x="-64" y="-92" width="128" height="178" rx="6" fill="#CBD5E1" stroke="#475569" strokeWidth="3.5" />
            <rect x="-50" y="-76" width="100" height="148" fill="#334155" />
            {/* Open door */}
            <polygon points="64,-92 104,-72 104,104 64,86" fill="#E2E8F0" stroke="#475569" strokeWidth="3" />
            {/* Cleaning bottles with miniature official CLP diamonds */}
            <rect x="-34" y="-44" width="28" height="44" rx="5" fill="#FACC15" />
            <g transform="translate(-31, -32) scale(0.22)">
              <ClpPictogramArtwork variant="sgh06-toxic" />
            </g>
            <rect x="6" y="-52" width="30" height="52" rx="5" fill="#EF4444" />
            <g transform="translate(10, -34) scale(0.22)">
              <ClpPictogramArtwork variant="sgh02-flammable" />
            </g>
            <rect x="-24" y="18" width="44" height="48" rx="5" fill="#38BDF8" />
            <g transform="translate(-14, 30) scale(0.24)">
              <ClpPictogramArtwork variant="sgh05-corrosive" />
            </g>
            {cabinetSignaled && <WarningTriangleSvg x={0} y={0} size={68} variant="w016-toxic" />}
          </g>
        </svg>
      );
    }

    // -----------------------------------------------------------------------
    // GS-3: La rue — Ballon qui roule & voiture (Sécurité Routière ESR)
    // -----------------------------------------------------------------------
    case 'gs-street-ball': {
      return (
        <svg viewBox="0 0 800 480" className="w-full h-full block" role="img" aria-label="Rue avec passage piéton, ballon et voiture">
          {/* Sky & buildings */}
          <rect width="800" height="200" fill="#DBEAFE" />
          <rect x="44" y="72" width="140" height="128" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3" />
          <rect x="220" y="96" width="180" height="104" rx="6" fill="#E0E7FF" stroke="#6366F1" strokeWidth="3" />
          <text x="310" y="136" textAnchor="middle" fill="#3730A3" fontSize="22" fontWeight="700">ÉCOLE</text>

          {/* Sidewalk (top & bottom) */}
          <rect y="200" width="800" height="58" fill="#CBD5E1" />
          <rect y="258" width="800" height="154" fill="#475569" />
          <rect y="412" width="800" height="68" fill="#CBD5E1" stroke="#64748B" strokeWidth="3" />

          {/* Crosswalk stripes */}
          {[278, 306, 334, 362, 390].map((sy) => (
            <rect key={sy} x="275" y={sy} width="108" height="16" rx="3" fill="#FFFFFF" />
          ))}

          {/* Official French Pedestrian traffic light (Feu piéton bonhomme rouge / vert) */}
          <rect x="228" y="160" width="10" height="90" fill="#334155" />
          <g transform="translate(209, 92) scale(1)">
            <PedestrianLightArtwork state={showSafe ? 'green' : 'red'} />
          </g>

          {/* Rolling Ball on street */}
          <g className={showSafe ? '' : 'anim-ball'}>
            <circle cx="330" cy="340" r="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
            <polygon points="330,328 338,336 335,346 325,346 322,336" fill="#0F172A" />
          </g>

          {/* Approaching Car */}
          <g transform={showSafe ? 'translate(590, 294)' : 'translate(510, 294)'}>
            <g className={showSafe ? '' : 'anim-car'}>
              <rect x="0" y="24" width="166" height="46" rx="12" fill="#DC2626" />
              <path d="M26 24 L46 -6 L118 -6 L138 24 Z" fill="#EF4444" />
              <rect x="48" y="2" width="68" height="20" rx="4" fill="#DBEAFE" />
              <circle cx="38" cy="70" r="16" fill="#0F172A" />
              <circle cx="128" cy="70" r="16" fill="#0F172A" />
              <circle cx="8" cy="40" r="6" fill="#FDE047" />
            </g>
          </g>

          {/* Child on sidewalk (stays safely on curb unless risk preview) */}
          <g transform={showRisk ? 'translate(310, 376)' : 'translate(310, 424)'}>
            <circle cx="0" cy="-34" r="16" fill="#FDBA74" />
            <rect x="-14" y="-16" width="28" height="36" rx="8" fill="#1D4ED8" />
          </g>

          {showRisk && <WarningTriangleSvg x={410} y={310} size={66} variant="a14-road" />}
          {showSafe && (
            <g>
              <SafeCheckSvg x={310} y={366} />
              <rect x="448" y="84" width="290" height="44" rx="10" fill="#DCFCE7" stroke="#059669" strokeWidth="2.5" />
              <text x="593" y="112" textAnchor="middle" fill="#065F46" fontSize="18" fontWeight="700">Arrêt sur le trottoir · Voie sûre</text>
            </g>
          )}
        </svg>
      );
    }

    // -----------------------------------------------------------------------
    // GS-5: Exercice PPMS en classe (3 gestes de mise en sûreté)
    // -----------------------------------------------------------------------
    case 'gs-ppms-class': {
      const windowSafe = showSafe || fixedIds.includes('away-window');
      const shelterSafe = showSafe || fixedIds.includes('group-shelter');
      const calmSafe = showSafe || fixedIds.includes('calm-listen');

      return (
        <svg viewBox="0 0 800 480" className="w-full h-full block" role="img" aria-label="Classe en exercice de mise en sûreté PPMS">
          <rect width="800" height="295" fill="#F8FAFC" />
          <rect y="295" width="800" height="185" fill="#E2E8F0" />

          {/* ACTION 1: Windows & blinds (x=20% -> 160, y=42% -> 200) */}
          <g transform="translate(150, 155)">
            <rect x="-85" y="-95" width="170" height="170" rx="8" fill="#BAE6FD" stroke="#64748B" strokeWidth="5" />
            {windowSafe ? (
              <>
                {/* Blinds safely lowered */}
                <rect x="-82" y="-92" width="164" height="164" rx="5" fill="#94A3B8" />
                {[-65, -35, -5, 25, 55].map((by) => (
                  <line key={by} x1="-82" y1={by} x2="82" y2={by} stroke="#64748B" strokeWidth="3" />
                ))}
                <SafeCheckSvg x={0} y={-8} />
              </>
            ) : (
              <>
                <line x1="0" y1="-95" x2="0" y2="75" stroke="#64748B" strokeWidth="4" />
                <line x1="-85" y1="-10" x2="85" y2="-10" stroke="#64748B" strokeWidth="4" />
                {/* Child dangerously close to window */}
                <circle cx="10" cy="76" r="14" fill="#FDBA74" />
                <rect x="-2" y="90" width="24" height="34" rx="6" fill="#EF4444" />
                {showRisk && <WarningTriangleSvg x={0} y={-10} size={54} />}
              </>
            )}
          </g>

          {/* ACTION 2: Sheltered regroupement rug (x=54% -> 432, y=66% -> 317) */}
          <g transform="translate(432, 344)">
            <ellipse
              cx="0"
              cy="20"
              rx="140"
              ry="48"
              fill={shelterSafe ? '#DCFCE7' : '#FEF3C7'}
              stroke={shelterSafe ? '#059669' : '#D97706'}
              strokeWidth="4"
            />
            {shelterSafe ? (
              /* Calm children grouped together on shelter rug */
              <g>
                {[-56, 0, 56].map((cx) => (
                  <g key={cx} transform={`translate(${cx}, -6)`}>
                    <circle cx="0" cy="-20" r="14" fill="#FDBA74" />
                    <path d="M-16 24 C-16 -4 16 -4 16 24 Z" fill="#0284C7" />
                  </g>
                ))}
                <SafeCheckSvg x={0} y={-60} />
              </g>
            ) : (
              <g>
                <text x="0" y="25" textAnchor="middle" fill="#92400E" fontSize="18" fontWeight="700">Zone abritée</text>
              </g>
            )}
          </g>

          {/* ACTION 3: Teacher with PPMS kit (x=82% -> 656, y=52% -> 250) */}
          <g transform="translate(656, 250)">
            <circle cx="0" cy="-54" r="22" fill="#FDBA74" />
            <path d="M-26 36 C-26 -24 26 -24 26 36 Z" fill="#1D4ED8" />
            {/* Green PPMS Kit */}
            <rect x="26" y="-8" width="44" height="34" rx="6" fill="#059669" stroke="#065F46" strokeWidth="3" />
            <line x1="48" y1="0" x2="48" y2="18" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="39" y1="9" x2="57" y2="9" stroke="#FFFFFF" strokeWidth="4" />
            {calmSafe ? (
              <SafeCheckSvg x={0} y={-96} />
            ) : (
              <g className="anim-float">
                <rect x="-54" y="-114" width="108" height="32" rx="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
                <text x="0" y="-93" textAnchor="middle" fill="#92400E" fontSize="14" fontWeight="700">Écouter !</text>
              </g>
            )}
          </g>
        </svg>
      );
    }

    default:
      return null;
  }
}
