
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: PaletteColor;
  }
  interface PaletteOptions {
    neutral?: PaletteColorOptions;
  }
  interface TypeBackground {
    alt: string;
  }
}
