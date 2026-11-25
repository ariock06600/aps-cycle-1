/**
 * Authentic French & European official safety and hazard pictograms:
 * - CLP / SGH (Règlement européen CE n° 1272/2008): white diamond on point, red border, black symbol
 *   (SGH02 Inflammable, SGH05 Corrosif, SGH06 Toxicité aiguë / Tête de mort, SGH07 Nocif / Irritant)
 * - ISO 7010 Warning Triangles (écoles, bâtiments, lieux publics): safety yellow triangle, black border, black symbol
 *   (W001 Danger général, W011 Sol glissant, W012 Danger électrique, W016 Matières toxiques)
 * - Code de la route français: Panneau A14 (triangle blanc, bordure rouge, ! noir) & Feu piéton (bonhomme rouge/vert)
 */

export type ClpPictogramVariant =
  | 'sgh02-flammable'
  | 'sgh05-corrosive'
  | 'sgh06-toxic'
  | 'sgh07-irritant';

export type WarningTriangleVariant =
  | 'w001-general'
  | 'w011-slippery'
  | 'w012-electric'
  | 'w016-toxic'
  | 'a14-road';

/**
 * Renders an official CLP/SGH chemical hazard pictogram inside a 100x100 local coordinate space
 * centered at (50, 50). Can be embedded inside any SVG via <g transform="translate(...) scale(...)">.
 */
export function ClpPictogramArtwork({ variant }: { variant: ClpPictogramVariant }) {
  return (
    <g>
      {/* Official CLP/SGH diamond: white background, thick red border (#DC2626) */}
      <polygon
        points="50,6 94,50 50,94 6,50"
        fill="#FFFFFF"
        stroke="#DC2626"
        strokeWidth="8.5"
        strokeLinejoin="miter"
      />

      {variant === 'sgh02-flammable' && (
        <g fill="#0F172A">
          {/* Official SGH02 horizontal ground line beneath the flame */}
          <rect x="28" y="67.5" width="44" height="4.2" rx="1.2" />
          {/* Official SGH02 multi-tongued black flame */}
          <path d="M50 22 C54 30 57 36 55 43 C58 40 61 36 62 32 C66 38 69 45 67 53 C70 50 72 47 73 44 C74 52 70 61 62 65 L38 65 C30 61 27 52 29 44 C31 47 33 49 35 51 C33 43 36 36 41 31 C41 35 42 38 44 41 C43 34 46 27 50 22 Z" />
          {/* Inner flame hollow for authentic SGH02 silhouette */}
          <path
            d="M50 47 C54 52 55 58 52 63 L46 63 C44 58 46 52 50 47 Z"
            fill="#FFFFFF"
          />
        </g>
      )}

      {variant === 'sgh05-corrosive' && (
        <g fill="#0F172A">
          {/* Left tilted test tube pouring liquid onto surface */}
          <g transform="translate(38, 34) rotate(-32)">
            <rect x="-12" y="-4" width="22" height="8" rx="4" />
            <rect x="-13" y="-5.5" width="3" height="11" rx="1" />
          </g>
          {/* Right tilted test tube pouring liquid onto hand */}
          <g transform="translate(62, 34) rotate(32)">
            <rect x="-10" y="-4" width="22" height="8" rx="4" />
            <rect x="10" y="-5.5" width="3" height="11" rx="1" />
          </g>

          {/* Falling corrosive drops */}
          <path d="M32 45 C30 49 30 52 32 52 C34 52 34 49 32 45 Z" />
          <path d="M68 45 C66 49 66 52 68 52 C70 52 70 49 68 45 Z" />

          {/* Left corroded metal surface block with eaten notch */}
          <path d="M21 58 L30 58 C31 61 33 61 34 58 L46 58 L46 65 L21 65 Z" />
          {/* Splash/fume rays on left block */}
          <line x1="27" y1="54" x2="24" y2="50" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="37" y1="54" x2="40" y2="50" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />

          {/* Right corroded outstretched hand silhouette */}
          <path d="M54 59 L64 59 C65 62 67 62 68 59 L79 59 C81 59 81 62 79 62 L73 62 L79 64 C80.5 64.5 80 67 78 67 L71 66 L76 69 C77.5 70 76.5 72 74.5 71.5 L67 69 L58 69 C55 69 54 67 54 64 Z" />
          {/* Splash/fume rays on right hand */}
          <line x1="62" y1="54" x2="59" y2="50" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="73" y1="54" x2="76" y2="50" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}

      {variant === 'sgh06-toxic' && (
        <g>
          {/* Official SGH06 crossed femur bones */}
          <g stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round">
            <line x1="29" y1="55" x2="71" y2="73" />
            <line x1="71" y1="55" x2="29" y2="73" />
          </g>
          {/* Bone end knobs */}
          <g fill="#0F172A">
            <circle cx="28" cy="53" r="3.4" />
            <circle cx="27" cy="57.5" r="3.2" />
            <circle cx="72" cy="53" r="3.4" />
            <circle cx="73" cy="57.5" r="3.2" />
            <circle cx="28" cy="71" r="3.2" />
            <circle cx="29" cy="75.5" r="3.4" />
            <circle cx="72" cy="71" r="3.2" />
            <circle cx="71" cy="75.5" r="3.4" />
          </g>

          {/* Official SGH06 skull */}
          <path
            d="M50 23 C39 23 32 30.5 32 40 C32 46 35 50.5 39.5 52.5 L39.5 59.5 C39.5 61.5 41.5 63 44 63 L56 63 C58.5 63 60.5 61.5 60.5 59.5 L60.5 52.5 C65 50.5 68 46 68 40 C68 30.5 61 23 50 23 Z"
            fill="#0F172A"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          {/* Hollow white eye sockets */}
          <ellipse cx="42.5" cy="41.5" rx="4.6" ry="5.2" fill="#FFFFFF" />
          <ellipse cx="57.5" cy="41.5" rx="4.6" ry="5.2" fill="#FFFFFF" />
          {/* Nasal cavity */}
          <polygon points="50,46.5 47.4,52.5 52.6,52.5" fill="#FFFFFF" />
          {/* Jaw teeth lines */}
          <g stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round">
            <line x1="45" y1="56.5" x2="45" y2="62.5" />
            <line x1="50" y1="56.5" x2="50" y2="62.5" />
            <line x1="55" y1="56.5" x2="55" y2="62.5" />
          </g>
        </g>
      )}

      {variant === 'sgh07-irritant' && (
        <g fill="#0F172A">
          {/* Official SGH07 heavy tapered black exclamation mark */}
          <path d="M44.2 26.5 C44.2 22.8 55.8 22.8 55.8 26.5 L53.4 57 C53.2 59.6 46.8 59.6 46.6 57 Z" />
          <circle cx="50" cy="69.5" r="5.6" />
        </g>
      )}
    </g>
  );
}

/** Standalone SVG wrapper for a CLP/SGH pictogram */
export function ClpPictogramSvg({
  variant,
  className = 'w-16 h-16',
  title,
}: {
  variant: ClpPictogramVariant;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <ClpPictogramArtwork variant={variant} />
    </svg>
  );
}

/**
 * Renders an official ISO 7010 Warning Triangle (yellow fill, black border, black symbol)
 * OR French Code de la route A14 Warning Triangle (white fill, red border, black !)
 * inside a 100x100 local coordinate space centered around (50, 54).
 */
export function WarningTriangleArtwork({ variant }: { variant: WarningTriangleVariant }) {
  const isRoadSign = variant === 'a14-road';

  return (
    <g>
      <polygon
        points="50,10 92,84 8,84"
        fill={isRoadSign ? '#FFFFFF' : '#FFD500'}
        stroke={isRoadSign ? '#DC2626' : '#0F172A'}
        strokeWidth={isRoadSign ? '8.5' : '7.5'}
        strokeLinejoin="round"
      />

      {(variant === 'w001-general' || variant === 'a14-road') && (
        <g fill="#0F172A">
          <path d="M45 33 C45 29.8 55 29.8 55 33 L53 60 C52.8 62.2 47.2 62.2 47 60 Z" />
          <circle cx="50" cy="71.5" r="5" />
        </g>
      )}

      {variant === 'w011-slippery' && (
        <g fill="#0F172A">
          {/* Official ISO 7010 W011: Falling person on slippery surface */}
          <rect x="24" y="74" width="52" height="4" rx="1.5" />
          <circle cx="56" cy="36" r="4.8" />
          <path
            d="M52 42 L45 55 L34 64 L38 67 L49 58 L54 67 L60 72 L64 69 L57 62 L54 54 L63 48 L60 44 L53 48 L48 43 L39 45 L40 49 L47 47 Z"
          />
          {/* Slip motion lines under sliding foot */}
          <line x1="28" y1="68" x2="35" y2="68" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {variant === 'w012-electric' && (
        <g fill="#0F172A">
          {/* Official ISO 7010 W012: High-voltage jagged lightning arrow */}
          <polygon points="55,30 41,54 51,54 44,72 62,48 51,48 59,30" />
          <polygon points="41,65 44,76 52,69" />
        </g>
      )}

      {variant === 'w016-toxic' && (
        <g>
          {/* Official ISO 7010 W016: Skull & crossbones inside yellow triangle */}
          <g stroke="#0F172A" strokeWidth="3.8" strokeLinecap="round">
            <line x1="34" y1="62" x2="66" y2="75" />
            <line x1="66" y1="62" x2="34" y2="75" />
          </g>
          <path
            d="M50 36 C42.5 36 37.5 41 37.5 48 C37.5 52 39.5 55 42.5 56.5 L42.5 61.5 L57.5 61.5 L57.5 56.5 C60.5 55 62.5 52 62.5 48 C62.5 41 57.5 36 50 36 Z"
            fill="#0F172A"
          />
          <circle cx="45" cy="48.5" r="3" fill="#FFD500" />
          <circle cx="55" cy="48.5" r="3" fill="#FFD500" />
          <polygon points="50,51.5 48,55.5 52,55.5" fill="#FFD500" />
        </g>
      )}
    </g>
  );
}

/** Standalone SVG wrapper for an ISO 7010 or French A14 warning triangle */
export function WarningTriangleSvgCard({
  variant,
  className = 'w-16 h-16',
  title,
}: {
  variant: WarningTriangleVariant;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <WarningTriangleArtwork variant={variant} />
    </svg>
  );
}

/**
 * Official French pedestrian traffic light (Feu piéton — Code de la route):
 * Top: Red standing figure ("bonhomme rouge immobile")
 * Bottom: Green walking figure ("bonhomme vert qui marche")
 * Local coordinate space: 48 x 84 (centered horizontally at x=24).
 */
export function PedestrianLightArtwork({ state }: { state: 'red' | 'green' }) {
  const redColor = state === 'red' ? '#EF4444' : '#334155';
  const greenColor = state === 'green' ? '#22C55E' : '#334155';

  return (
    <g>
      <rect x="0" y="0" width="48" height="84" rx="9" fill="#0F172A" stroke="#334155" strokeWidth="2" />

      {/* Top lens: Standing pedestrian (Bonhomme rouge immobile) */}
      <circle cx="24" cy="23" r="16" fill="#1E293B" />
      <g fill={redColor} stroke={redColor} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="14" r="3" stroke="none" />
        <rect x="21" y="18.2" width="6" height="9.5" rx="2" stroke="none" />
        <line x1="19.5" y1="19.5" x2="19.5" y2="27" strokeWidth="2.2" />
        <line x1="28.5" y1="19.5" x2="28.5" y2="27" strokeWidth="2.2" />
        <line x1="22.3" y1="27.5" x2="22.3" y2="34.5" strokeWidth="2.4" />
        <line x1="25.7" y1="27.5" x2="25.7" y2="34.5" strokeWidth="2.4" />
      </g>

      {/* Bottom lens: Walking pedestrian (Bonhomme vert qui marche) */}
      <circle cx="24" cy="61" r="16" fill="#1E293B" />
      <g fill={greenColor} stroke={greenColor} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="25" cy="52" r="3" stroke="none" />
        <line x1="24.5" y1="56" x2="23.5" y2="64.5" strokeWidth="4.2" />
        <line x1="24" y1="58" x2="18.5" y2="63" strokeWidth="2.2" />
        <line x1="24.5" y1="58" x2="30" y2="61.5" strokeWidth="2.2" />
        <line x1="23.5" y1="64.5" x2="18.5" y2="72.5" strokeWidth="2.4" />
        <line x1="24" y1="64.5" x2="29.5" y2="72.5" strokeWidth="2.4" />
      </g>
    </g>
  );
}
