import { MantineThemeOverride } from '@mantine/core';

import { COLORS } from './colors';

export const FONT_SIZES = {
  xs: '00.714rem',
  s: '0.857rem',
  sm: '1rem',
  md: '1.143rem',
  lg: '1.286rem',
  xl: '1.857rem',
};

export const MANTINE_THEME: MantineThemeOverride = {
  fontFamily: 'Open Sans, sans-serif',
  fontSizes: FONT_SIZES,
  defaultRadius: 8,
  activeStyles: {
    transform: 'scale(0.99)',
  },
  headings: {
    h1: {
      fontSize: FONT_SIZES.xl,
      fontFamily: 'Bold',
    },
    h2: {
      fontSize: FONT_SIZES.lg,
      fontFamily: 'Bold',
    },
    h3: {
      fontSize: FONT_SIZES.md,
      fontFamily: 'Semibold',
    },
    h4: {
      fontSize: FONT_SIZES.sm,
      fontFamily: 'Regular',
    },
    h5: {
      fontSize: FONT_SIZES.s,
      fontFamily: 'Bold',
    },
    h6: {
      fontSize: FONT_SIZES.xs,
      fontFamily: 'Semibold',
    },
  },
  components: {
    Title: {
      styles: {
        root: {
          '&:is(h1)': { color: COLORS.ACCENT_TEXT },
          '&:is(h2)': { color: COLORS.PRIMARY_TEXT },
          '&:is(h3)': { color: COLORS.ACCENT_TEXT },
          '&:is(h4)': { color: COLORS.PRIMARY_TEXT },
          '&:is(h5)': { color: COLORS.PRIMARY_TEXT },
          '&:is(h6)': { color: COLORS.PRIMARY_TEXT },
        },
      },
    },
    Button: {
      styles: {
        'root': {
          backgroundColor: COLORS.SECONDARY_BUTTON,
          width: '100%',
          color: COLORS.ACCENT_TEXT,
          minHeight: '56px',
        },
      },
    },
  },
};
