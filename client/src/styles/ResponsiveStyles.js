import { styled, useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';

// Hook to use responsive typography
export const useResponsiveTypography = () => {
  const theme = useTheme();
  
  return {
    h1: {
      fontSize: '2rem',
      lineHeight: 1.3,
      [theme.breakpoints.up('md')]: {
        fontSize: '3rem',
      }
    },
    h2: {
      fontSize: '1.8rem',
      lineHeight: 1.3,
      [theme.breakpoints.up('md')]: {
        fontSize: '2.5rem',
      }
    },
    h3: {
      fontSize: '1.5rem',
      lineHeight: 1.4,
      [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
      }
    },
    h4: {
      fontSize: '1.3rem',
      lineHeight: 1.5,
      [theme.breakpoints.up('md')]: {
        fontSize: '1.5rem',
      }
    },
  };
};

// Responsive container that adjusts padding based on screen size
export const ResponsiveContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// Responsive box with mobile-friendly padding
export const ResponsiveBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));