import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WhatWeDoPage from './pages/WhatWeDoPage';
import ProjectsPage from './pages/ProjectsPage';
import EventsPage from './pages/EventsPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import DeploymentTestPage from './pages/DeploymentTestPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Custom responsive theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#01234B', // Dark blue
    },
    secondary: {
      main: '#D4AF37', // Gold
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Bookman Old Style", "Bookman", "Georgia", "Times New Roman", serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      '@media (max-width: 960px)': {
        fontSize: '2.2rem',
      },
      '@media (max-width: 600px)': {
        fontSize: '1.8rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      '@media (max-width: 960px)': {
        fontSize: '2rem',
      },
      '@media (max-width: 600px)': {
        fontSize: '1.6rem',
      },
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      '@media (max-width: 960px)': {
        fontSize: '1.7rem',
      },
      '@media (max-width: 600px)': {
        fontSize: '1.4rem',
      },
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            paddingLeft: '16px',
            paddingRight: '16px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            padding: '10px 16px',
            fontSize: '0.9rem',
          },
        },
      },
    },
  },
});

// Main App Component with responsive layout
const AppContent = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ 
        flex: 1, 
        paddingTop: '64px', // Account for fixed navbar height
      }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/what-we-do" element={<WhatWeDoPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/deployment-test" element={<DeploymentTestPage />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

// Theme Provider Wrapper
const ThemedApp = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  </ThemeProvider>
);

export default ThemedApp;