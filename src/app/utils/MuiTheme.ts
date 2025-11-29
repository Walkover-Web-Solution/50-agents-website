import { createTheme } from '@mui/material';

// Add this at the top of the file, after the imports
declare module '@mui/material/styles' {
  interface TypeBackground {
    sidebar?: string;
    chatInput?: string;
  }
}

// Define the custom props interface
interface CustomTextFieldProps {
  customstyle?: string;
  fontvariant?: string;
}

// Augment the existing TextField props
declare module '@mui/material/TextField' {
  interface BaseTextFieldProps extends CustomTextFieldProps {}
}

export function generateCustomTheme(mode: 'light' | 'dark' = 'light') {
  return createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'light' ? '#F5F5F5' : '#181818',
        sidebar: mode === 'light' ? '#FAFAFA' : '#181818',
        paper: mode === 'light' ? '#FAFAFA' : '#212121',
        chatInput: mode === 'light' ? '#FAFAFA' : '#303030',
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          style: {
            color: 'text.primary',
          },
          variant: 'body2',
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            paddingLeft: '8px',
            paddingRight: '8px',
          },
        },
      },
      MuiTextField: {
        variants: [
          {
            props: { customstyle: 'borderless' },
            style: {
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiInputBase-input, .MuiInputBase-root': {
                padding: 0,
              },
            },
          },
          {
            props: { fontvariant: 'heading' },
            style: {
              '& .MuiInputBase-input': {
                fontSize: '1.25rem',
              },
            },
          },
        ],
        styleOverrides: {
          root: {},
        },
      },
    },
    typography: {
      fontFamily: `var(--font-inter), sans-serif`, // Use the CSS variable
    },
  });
}
