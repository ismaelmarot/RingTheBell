export const theme = {
  colors: {
    // Backgrounds
    background: '#EAF3F3',
    secondaryBackground: '#FFFFFF',
    tertiaryBackground: '#FFFFFF',
    groupedBackground: '#EAF3F3',
    secondaryGroupedBackground: '#FFFFFF',
    tertiaryGroupedBackground: '#EAF3F3',
    // Labels
    label: '#202A30',
    secondaryLabel: 'rgba(32, 42, 48, 0.6)',
    tertiaryLabel: 'rgba(32, 42, 48, 0.3)',
    quaternaryLabel: 'rgba(32, 42, 48, 0.18)',
    // Separators
    separator: 'rgba(32, 42, 48, 0.12)',
    opaqueSeparator: '#C6C6C8',
    // Brand
    petroleum: '#153B46',
    petroleumLight: 'rgba(21, 59, 70, 0.12)',
    turquoise: '#35C6B3',
    turquoiseHover: '#2BA89A',
    turquoiseLight: 'rgba(53, 198, 179, 0.12)',
    // Accent (navigation)
    accent: '#153B46',
    accentHover: '#0F2A33',
    accentLight: 'rgba(21, 59, 70, 0.12)',
    // Semantic
    success: '#35C6B3',
    successLight: 'rgba(53, 198, 179, 0.12)',
    danger: '#FF3B30',
    dangerLight: 'rgba(255, 59, 48, 0.12)',
    warning: '#FF9500',
    warningLight: 'rgba(255, 149, 0, 0.12)',
    // Fills
    fill: 'rgba(32, 42, 48, 0.08)',
    secondaryFill: 'rgba(32, 42, 48, 0.12)',
    tertiaryFill: 'rgba(32, 42, 48, 0.06)',
    quaternaryFill: 'rgba(32, 42, 48, 0.04)',
    // Gray
    gray: '#8E8E93',
    gray2: '#AEAEB2',
    gray3: '#C7C7CC',
    gray4: '#D1D1D6',
    gray5: '#E5E5EA',
    gray6: '#F2F2F7',
  },
  typography: {
    largeTitle: '34px',
    title1: '28px',
    title2: '22px',
    title3: '20px',
    headline: '17px',
    body: '17px',
    callout: '16px',
    subheadline: '15px',
    footnote: '13px',
    caption1: '12px',
    caption2: '11px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px',
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    pill: '9999px',
  },
  shadow: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04)',
    xl: '0 16px 48px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06)',
  },
  transition: {
    fast: '0.15s ease',
    normal: '0.25s ease',
    slow: '0.35s ease',
  },
};

export type Theme = typeof theme;
