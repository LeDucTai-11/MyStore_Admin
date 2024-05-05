import { createTheme } from '@mui/material';

// Color Code
export enum COLOR_CODE {
  PRIMARY = '#0984E8',
  SECONDARY = '#E3BC56',
  WHITE = '#fff',
  BLACK = '#000',
  SUCCESS = '#1EA431',
  WARNING = '#D67813',
  DANGER = '#DB221A',
  INFO = '#0492DE',
  SUCCESS_BG = '#DAFAD0',
  WARNING_BG = '#FEF2CB',
  DANGER_BG = '#FDE0D0',
  INFO_BG = '#D6ECFF',
  PRIMARY_700 = '#0F3F7F',
  PRIMARY_600 = '#0061B0',
  PRIMARY_500 = '#0984E8',
  PRIMARY_400 = '#74B8F0',
  PRIMARY_300 = '#D6ECFF',
  PRIMARY_200 = '#E9F5FF',
  PRIMARY_100 = '#F2F9FF',
  SECONDARY_600 = '#966C00',
  SECONDARY_500 = '#CD9400',
  SECONDARY_400 = '#E3BC56',
  SECONDARY_300 = '#FCF0D3',
  SECONDARY_200 = '#FEF5DD',
  SECONDARY_100 = '#FFF9EB',
  GREY_50 = '#F8F8F9',
  GREY_100 = '#EDEFF1',
  GREY_200 = '#DEE1E5',
  GREY_300 = '#CFD4D9',
  GREY_400 = '#B5BDC5',
  GREY_500 = '#91979E',
  GREY_600 = '#6D7176',
  GREY_700 = '#484C4F',
  GREY_800 = '#2D2F31',
  GREY_900 = '#1B1C1E',
  RED_500 = '#DB221A',
  RED_400 = '#ED7773',
  RED_200 = '#FEECEE',
}

// Config MUI Theme in here

const configTheme = createTheme({
  palette: {
    primary: {
      main: COLOR_CODE.PRIMARY,
    },
    secondary: {
      main: COLOR_CODE.SECONDARY,
    },
    success: {
      main: COLOR_CODE.SUCCESS,
      light: COLOR_CODE.SUCCESS_BG,
    },
    warning: {
      main: COLOR_CODE.WARNING,
      light: COLOR_CODE.WARNING_BG,
    },
    error: {
      main: COLOR_CODE.DANGER,
      light: COLOR_CODE.DANGER_BG,
    },
    info: {
      main: COLOR_CODE.INFO,
      light: COLOR_CODE.INFO_BG,
    },
  },
  typography: {
    fontFamily: ['Public Sans', 'sans-serif'].join(','),
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: COLOR_CODE.GREY_700,
        },
        h1: {
          fontSize: 32,
          fontWeight: 600,
        },
        h2: {
          fontSize: 26,
          fontWeight: 600,
        },
        h3: {
          fontSize: 20,
          fontWeight: 500,
        },
        h4: {
          fontSize: 18,
          fontWeight: 500,
        },
        h5: {
          fontSize: 16,
          fontWeight: 600,
        },
        h6: {
          fontSize: 14,
          fontWeight: 500,
        },
        body1: {
          fontSize: 16,
        },
        body2: {
          fontSize: 14,
        },
        subtitle1: {
          // type: small || body3 in Figma
          fontSize: 12,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          ':hover': {
            backgroundColor: 'transparent',
            color: COLOR_CODE.PRIMARY_500,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'capitalize',
          padding: '10px 14px',
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '20px',
          letterSpacing: '0.07px',
          boxShadow: 'none',
          ':hover': {
            boxShadow: 'none',
          },
          ':disabled': {
            border: 'none',
            backgroundColor: COLOR_CODE.GREY_100,
          },
        },
        text: {
          backgroundColor: 'transparent',
          color: COLOR_CODE.GREY_800,
          ':hover': {
            color: COLOR_CODE.PRIMARY_500,
            backgroundColor: 'transparent',
          },
        },
        outlinedInherit: {
          border: `1.5px solid ${COLOR_CODE.GREY_300}`,
          backgroundColor: COLOR_CODE.WHITE,
          color: COLOR_CODE.GREY_800,
          ':hover': {
            backgroundColor: COLOR_CODE.GREY_100,
          },
        },
        outlinedPrimary: {
          border: `1px solid ${COLOR_CODE.PRIMARY_500}`,
          backgroundColor: COLOR_CODE.WHITE,
          color: COLOR_CODE.PRIMARY_500,
          ':hover': {
            backgroundColor: COLOR_CODE.PRIMARY_100,
          },
          ':disabled': {
            border: `1px solid ${COLOR_CODE.PRIMARY_500}`,
            backgroundColor: COLOR_CODE.WHITE,
            color: COLOR_CODE.PRIMARY_500,
            opacity: 0.5,
          },
        },
        containedPrimary: {
          backgroundColor: COLOR_CODE.PRIMARY_500,
          color: COLOR_CODE.WHITE,
          ':hover': {
            backgroundColor: COLOR_CODE.PRIMARY_400,
          },
          ':disabled': {
            backgroundColor: COLOR_CODE.PRIMARY_500,
            color: COLOR_CODE.WHITE,
            opacity: 0.5,
          },
        },
        containedError: {
          backgroundColor: COLOR_CODE.RED_500,
          color: COLOR_CODE.WHITE,
          ':hover': {
            backgroundColor: COLOR_CODE.RED_400,
          },
          ':disabled': {
            backgroundColor: COLOR_CODE.RED_500,
            color: COLOR_CODE.WHITE,
            opacity: 0.5,
          },
        },
        containedSuccess: {
          backgroundColor: COLOR_CODE.SUCCESS,
          color: COLOR_CODE.WHITE,
          transition: 'all 0.2s linear',
          ':hover': {
            backgroundColor: COLOR_CODE.SUCCESS,
            opacity: 0.7,
          },
          ':disabled': {
            backgroundColor: COLOR_CODE.SUCCESS,
            color: COLOR_CODE.WHITE,
            opacity: 0.5,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: 13,
          fontWeight: 600,
          lineHeight: 18,
          color: COLOR_CODE.GREY_600,
          backgroundColor: COLOR_CODE.GREY_100,
        },
        colorPrimary: {
          color: COLOR_CODE.PRIMARY_500,
          backgroundColor: COLOR_CODE.PRIMARY_300,
        },
        colorSecondary: {
          color: COLOR_CODE.SECONDARY_600,
          backgroundColor: COLOR_CODE.SECONDARY_300,
        },
        colorSuccess: {
          color: COLOR_CODE.SUCCESS,
          backgroundColor: COLOR_CODE.SUCCESS_BG,
        },
        colorWarning: {
          color: COLOR_CODE.WARNING,
          backgroundColor: COLOR_CODE.WARNING_BG,
        },
        colorError: {
          color: COLOR_CODE.DANGER,
          backgroundColor: COLOR_CODE.DANGER_BG,
        },
        colorInfo: {
          color: '#713ABE',
          backgroundColor: '#F1EAFF',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          strokeWidth: 1,
          stroke: COLOR_CODE.GREY_300,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: 14,
          margin: '6px 0 0 0',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 16,
          fontWeight: 600,
          color: COLOR_CODE.GREY_600,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
        },
        label: {
          fontSize: 15,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          width: 20,
          height: 20,
          color: COLOR_CODE.GREY_300,
          ':hover': {
            color: COLOR_CODE.GREY_500,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paperWidthXs: {
          maxWidth: '400px',
        },
        paperWidthSm: {
          maxWidth: '700px',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: COLOR_CODE.WHITE,
          borderBottom: `1px solid ${COLOR_CODE.GREY_100}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: COLOR_CODE.GREY_300,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '::placeholder': {
            color: COLOR_CODE.GREY_500,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 1,
          boxShadow: '0px 1px 10px 1px rgba(21, 96, 100, 0.1)',
          cursor: 'pointer',
          transition: 'transform .4s',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 13px 70px -12.125px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          ':first-of-type': {
            borderRadius: '12px',
          },
          ':last-of-type': {
            borderRadius: '12px',
          },
          transition: 'all 0.2s linear',
          boxShadow: '2px 3px 6px 0px rgba(207, 212, 217, 0.5)',
          '&:before': {
            display: 'none',
          },
        },
      },
    },
  },
});

export const theme = configTheme;
