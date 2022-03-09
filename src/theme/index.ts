import merge from 'lodash/merge';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import type { Theme, ThemeOptions } from '@material-ui/core';
import { THEMES } from '../constantes';

interface ThemeConfig {
  theme?: string;
}


const baseOptions: ThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        fallback: {
          height: '75%',
          width: '75%'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6'
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: 'hidden'
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: '16px'
        }
      }
    }
  },
  typography: {
    button: {
      fontWeight: 600
    },
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Montserrat',
    h1: {
      fontWeight: 600,
      fontSize: '3.5rem'
    },
    h2: {
      fontWeight: 600,
      fontSize: '3rem'
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.25rem'
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem'
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem'
    },
    overline: {
      fontWeight: 600
    }
  }
};

const themesOptions: Record<string, ThemeOptions> = {
  [THEMES.LIGHT]: {
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&::placeholder': { 
              opacity: 0.86,
              color: '#999999'
            },
          },
        },

      },
    },
    palette: {
      action: {
        active: '#6b778c'
      },
      background: {
        default: '#2D2D2D',
        paper: '#ffffff'
      },
      error: {
        contrastText: '#ffffff',
        main: '#f44336'
      },
      mode: 'light',
      primary: {
        contrastText: '#ffffff',
        main: '#EA916B'
      },
      success: {
        contrastText: '#ffffff',
        main: '#ffffff'
      },
      text: {
        primary: '#172b4d',
        secondary: '#6b778c'
      },
      warning: {
        contrastText: '#ffffff',
        main: '#ff9800'
      }
    }
  }
};

export const createTheme = (config: ThemeConfig = {}): Theme => {
  let themeOptions = themesOptions[config.theme];

  if (!themeOptions) {
    themeOptions = themesOptions[THEMES.LIGHT];
  }

  let theme = createMuiTheme(
    merge(
      {},
      baseOptions,
      themesOptions[THEMES.LIGHT],
      {
        ...(
          {
            shape: {
              borderRadius: 16
            }
          }
        )
      }
    )
  );

  theme = responsiveFontSizes(theme);

  return theme;
};
