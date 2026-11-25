interface ObjectIconProps {
  iconKey: string;
  className?: string;
  /** Keep neutral ('neutral') until the answer is validated so colors never spoil the answer */
  revealedTone?: 'neutral' | 'safe' | 'danger';
}

function getTileFill(tone: 'neutral' | 'safe' | 'danger'): string {
  if (tone === 'safe') return '#DCFCE7';
  if (tone === 'danger') return '#FEE2E2';
  return '#F1F5F9';
}

/**
 * High-contrast, large-form SVG icons readable by non-reading 3–6 year olds on a classroom projector.
 * Unvalidated icons always use a neutral slate tile without spoiler checkmarks or warning badges.
 */
export function ObjectIcon({
  iconKey,
  className = 'w-20 h-20',
  revealedTone = 'neutral',
}: ObjectIconProps) {
  const tileFill = getTileFill(revealedTone);
  const showValidationGlyph = revealedTone !== 'neutral';

  switch (iconKey) {
    case 'spoon':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <g transform="rotate(-35 60 60)">
            <rect x="54" y="48" width="12" height="52" rx="6" fill="#B45309" />
            <ellipse cx="60" cy="36" rx="16" ry="22" fill="#D97706" stroke="#92400E" strokeWidth="3" />
            <ellipse cx="56" cy="32" rx="5" ry="10" fill="#FDE68A" opacity="0.55" />
          </g>
        </svg>
      );

    case 'knife':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <g transform="rotate(-35 60 60)">
            <rect x="53" y="66" width="14" height="34" rx="5" fill="#1E293B" />
            <circle cx="60" cy="76" r="2.5" fill="#94A3B8" />
            <circle cx="60" cy="88" r="2.5" fill="#94A3B8" />
            <path d="M53 66 L53 20 Q69 26 67 66 Z" fill="#CBD5E1" stroke="#475569" strokeWidth="2.5" />
            <path d="M62 28 L64 60" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'apple':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <path d="M60 36 C42 28 28 45 32 68 C36 88 50 96 60 92 C70 96 84 88 88 68 C92 45 78 28 60 36 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="3" />
          <path d="M60 36 C60 25 65 20 68 18" fill="none" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <path d="M63 26 C74 18 84 22 80 32 C72 34 65 31 63 26 Z" fill="#22C55E" />
          <ellipse cx="45" cy="54" rx="5" ry="10" fill="#FCA5A5" opacity="0.65" transform="rotate(-15 45 54)" />
        </svg>
      );

    case 'toxic':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <rect x="46" y="18" width="28" height="12" rx="4" fill="#DC2626" />
          <path d="M40 34 L80 34 L88 94 C88 99 84 102 79 102 L41 102 C36 102 32 99 32 94 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="3" />
          <polygon points="60,46 77,64 60,82 43,64" fill="#FFFFFF" stroke="#DC2626" strokeWidth="4" />
          <text x="60" y="71" textAnchor="middle" fill="#DC2626" fontSize="22" fontWeight="800">!</text>
        </svg>
      );

    case 'brush':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <g transform="rotate(-35 60 60)">
            <rect x="54" y="48" width="12" height="50" rx="6" fill="#0284C7" />
            <rect x="52" y="38" width="16" height="12" rx="2" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
            <path d="M51 38 C51 20 69 20 69 38 Z" fill="#F59E0B" />
            <path d="M55 24 C57 18 63 18 65 24 Z" fill="#EF4444" />
          </g>
        </svg>
      );

    case 'tack':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <g transform="rotate(-30 60 60)">
            <path d="M60 62 L60 98" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <polygon points="60,104 56,94 64,94" fill="#475569" />
            <ellipse cx="60" cy="58" rx="22" ry="8" fill="#64748B" stroke="#334155" strokeWidth="2.5" />
            <rect x="48" y="34" width="24" height="22" rx="4" fill="#475569" />
            <ellipse cx="60" cy="34" rx="16" ry="6" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'book':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <path d="M22 36 Q40 28 60 36 L60 88 Q40 80 22 88 Z" fill="#FFFFFF" stroke="#475569" strokeWidth="3.5" />
          <path d="M98 36 Q80 28 60 36 L60 88 Q80 80 98 88 Z" fill="#F8FAFC" stroke="#475569" strokeWidth="3.5" />
          <circle cx="42" cy="56" r="8" fill="#FBBF24" />
          <line x1="68" y1="50" x2="88" y2="50" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          <line x1="68" y1="62" x2="86" y2="62" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          <line x1="68" y1="74" x2="82" y2="74" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'battery':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <circle cx="60" cy="60" r="32" fill="#E2E8F0" stroke="#64748B" strokeWidth="4" />
          <circle cx="60" cy="60" r="24" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
          <text x="60" y="57" textAnchor="middle" fill="#334155" fontSize="22" fontWeight="800">+</text>
          <text x="60" y="75" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="700">3V</text>
          {showValidationGlyph && (
            <>
              <circle cx="88" cy="32" r="14" fill="#DC2626" />
              <text x="88" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="800">!</text>
            </>
          )}
        </svg>
      );

    case 'hand-hot':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <rect x="26" y="66" width="68" height="28" rx="6" fill="#475569" />
          <path d="M40 54 C38 42 46 38 44 26" stroke="#94A3B8" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M60 52 C58 38 66 34 64 22" stroke="#64748B" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M80 54 C78 42 86 38 84 26" stroke="#94A3B8" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="60" cy="62" r="11" fill="#FDBA74" stroke="#9A3412" strokeWidth="2.5" />
          {showValidationGlyph && (
            <path d="M48 48 L72 76 M72 48 L48 76" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
          )}
        </svg>
      );

    case 'safe-adult':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          {/* Adult */}
          <circle cx="44" cy="38" r="12" fill="#FDBA74" />
          <path d="M28 92 C28 64 60 64 60 92 Z" fill="#475569" />
          {/* Child */}
          <circle cx="78" cy="54" r="9" fill="#FDBA74" />
          <path d="M66 92 C66 72 90 72 90 92 Z" fill="#0284C7" />
          {showValidationGlyph && (
            <>
              <circle cx="88" cy="30" r="14" fill="#059669" />
              <path d="M81 30 L86 35 L95 25" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}
        </svg>
      );

    case 'pot-spill':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <g transform="rotate(28 60 54)">
            <rect x="34" y="42" width="44" height="28" rx="5" fill="#475569" />
            <rect x="76" y="48" width="24" height="7" rx="3" fill="#1E293B" />
          </g>
          <path d="M36 62 C26 76 26 90 36 96 C46 92 48 80 44 68 Z" fill="#38BDF8" />
          <path d="M52 72 C46 84 48 94 56 98 C64 94 64 82 58 74 Z" fill="#0284C7" />
        </svg>
      );

    case 'shock':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <path d="M26 88 Q44 74 60 88 Q76 102 94 88" fill="none" stroke="#0EA5E9" strokeWidth="7" strokeLinecap="round" />
          <polygon points="66,22 44,58 60,58 52,88 80,48 63,48" fill="#FACC15" stroke="#B45309" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );

    case 'unplug-safe':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <rect x="24" y="42" width="28" height="36" rx="6" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
          <circle cx="34" cy="60" r="3" fill="#334155" />
          <circle cx="42" cy="60" r="3" fill="#334155" />
          <rect x="70" y="48" width="20" height="24" rx="5" fill="#475569" />
          <line x1="62" y1="54" x2="70" y2="54" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <line x1="62" y1="66" x2="70" y2="66" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <path d="M90 60 L102 60" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'splash':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <path d="M60 28 C44 52 38 66 38 76 C38 89 48 98 60 98 C72 98 82 89 82 76 C82 66 76 52 60 28 Z" fill="#0EA5E9" />
          <circle cx="34" cy="48" r="6" fill="#38BDF8" />
          <circle cx="88" cy="46" r="7" fill="#38BDF8" />
        </svg>
      );

    case 'push':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <circle cx="40" cy="42" r="10" fill="#FDBA74" />
          <path d="M30 82 L40 54 L56 62" stroke="#475569" strokeWidth="6" fill="none" strokeLinecap="round" />
          <circle cx="78" cy="46" r="10" fill="#FDBA74" />
          <path d="M72 82 L80 58 L94 74" stroke="#64748B" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M56 54 L66 54" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'gym-safe':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <rect x="20" y="76" width="80" height="18" rx="6" fill="#0284C7" stroke="#0369A1" strokeWidth="3" />
          <circle cx="60" cy="36" r="10" fill="#FDBA74" />
          <path d="M60 48 L60 66 M48 56 L72 56 M60 66 L50 76 M60 66 L70 76" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          {showValidationGlyph && (
            <>
              <circle cx="92" cy="28" r="13" fill="#059669" />
              <path d="M86 28 L90 32 L98 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
        </svg>
      );

    case 'hard-floor':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <rect x="18" y="84" width="84" height="12" rx="3" fill="#94A3B8" />
          <circle cx="60" cy="48" r="10" fill="#FDBA74" />
          <path d="M60 58 L60 76 M48 64 L72 64" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          <path d="M36 78 L46 72 M84 78 L74 72" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'reading':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <ellipse cx="60" cy="88" rx="38" ry="10" fill="#CBD5E1" />
          <circle cx="60" cy="38" r="12" fill="#FDBA74" />
          <path d="M36 66 L60 74 L84 66 L84 84 L60 90 L36 84 Z" fill="#FFFFFF" stroke="#475569" strokeWidth="3" />
        </svg>
      );

    case 'window-fall':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <rect x="26" y="18" width="68" height="46" rx="4" fill="#BAE6FD" stroke="#0284C7" strokeWidth="3" />
          <line x1="60" y1="18" x2="60" y2="64" stroke="#0284C7" strokeWidth="3" />
          <rect x="42" y="72" width="36" height="8" rx="2" fill="#B45309" />
          <line x1="46" y1="80" x2="46" y2="100" stroke="#B45309" strokeWidth="4" />
          <line x1="74" y1="80" x2="74" y2="100" stroke="#B45309" strokeWidth="4" />
          {showValidationGlyph && (
            <>
              <polygon points="88,22 102,46 74,46" fill="#FACC15" stroke="#DC2626" strokeWidth="3" />
              <text x="88" y="42" textAnchor="middle" fill="#DC2626" fontSize="14" fontWeight="800">!</text>
            </>
          )}
        </svg>
      );

    case 'blocks':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <rect x="26" y="68" width="30" height="28" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
          <rect x="62" y="68" width="30" height="28" rx="4" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
          <rect x="44" y="38" width="30" height="28" rx="4" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
          <polygon points="59,18 75,38 43,38" fill="#EF4444" />
        </svg>
      );

    case 'outlet-danger':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <rect x="28" y="28" width="64" height="64" rx="12" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
          <circle cx="60" cy="60" r="22" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="51" cy="60" r="4.5" fill="#1E293B" />
          <circle cx="69" cy="60" r="4.5" fill="#1E293B" />
          <line x1="78" y1="30" x2="54" y2="56" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'car-danger':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <rect x="22" y="54" width="76" height="26" rx="8" fill="#475569" />
          <path d="M36 54 L44 36 L76 36 L84 54 Z" fill="#64748B" />
          <rect x="44" y="40" width="32" height="12" rx="3" fill="#DBEAFE" />
          <circle cx="38" cy="82" r="10" fill="#1E293B" />
          <circle cx="82" cy="82" r="10" fill="#1E293B" />
        </svg>
      );

    case 'sidewalk-safe':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <rect x="16" y="74" width="88" height="24" rx="6" fill="#CBD5E1" stroke="#64748B" strokeWidth="2.5" />
          <circle cx="48" cy="40" r="10" fill="#FDBA74" />
          <path d="M36 74 C36 54 60 54 60 74 Z" fill="#475569" />
          <circle cx="72" cy="50" r="8" fill="#FDBA74" />
          <path d="M62 74 C62 60 82 60 82 74 Z" fill="#0284C7" />
          {showValidationGlyph && (
            <>
              <circle cx="90" cy="28" r="12" fill="#059669" />
              <path d="M84 28 L88 32 L96 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
        </svg>
      );

    case 'red-light':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <rect x="40" y="18" width="40" height="84" rx="10" fill="#1E293B" />
          <circle cx="60" cy="42" r="13" fill="#EF4444" />
          <circle cx="60" cy="78" r="13" fill="#334155" />
        </svg>
      );

    case 'water':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <path d="M40 34 L80 34 L74 96 L46 96 Z" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3.5" />
          <path d="M43 56 L77 56 L73 94 L47 94 Z" fill="#38BDF8" opacity="0.8" />
        </svg>
      );

    case 'flammable':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <polygon points="60,18 102,60 60,102 18,60" fill="#FFFFFF" stroke="#DC2626" strokeWidth="6" />
          <path d="M60 36 C70 50 74 58 72 69 C70 77 65 81 60 81 C54 81 48 76 48 67 C48 60 52 54 55 49 C56 54 58 55 59 52 C59 45 58 40 60 36 Z" fill="#1E293B" />
        </svg>
      );

    case 'juice':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <path d="M68 20 L80 34" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" />
          <rect x="38" y="34" width="44" height="66" rx="8" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
          <circle cx="60" cy="68" r="13" fill="#EF4444" />
          <path d="M60 54 C64 48 70 49 68 55" fill="#22C55E" />
        </svg>
      );

    case 'medicine':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <g transform="rotate(-35 52 60)">
            <rect x="34" y="46" width="38" height="22" rx="11" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
            <rect x="53" y="46" width="19" height="22" rx="10" fill="#FFFFFF" stroke="#991B1B" strokeWidth="2.5" />
          </g>
          <circle cx="82" cy="78" r="14" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
          <line x1="72" y1="78" x2="92" y2="78" stroke="#FFFFFF" strokeWidth="2.5" />
          {showValidationGlyph && (
            <>
              <circle cx="88" cy="30" r="13" fill="#DC2626" />
              <text x="88" y="35" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="800">!</text>
            </>
          )}
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="8" y="8" width="104" height="104" rx="20" fill={tileFill} />
          <circle cx="60" cy="60" r="24" fill="#64748B" />
        </svg>
      );
  }
}
