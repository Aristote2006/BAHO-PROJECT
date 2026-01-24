import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Link, Grid, Alert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { authService } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: contextLogin, user } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Use the context login function instead of direct API call
      const result = await contextLogin(email, password);
      
      if (result.success) {
        console.log('Login successful via context');
        
        // Determine redirect based on user role
        const isAdmin = user?.isAdmin !== undefined ? user.isAdmin : true;
        console.log('User isAdmin status:', isAdmin);
        
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error details:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #01234B 0%, #0a3666 100%)',
        py: { xs: 2, sm: 4 },
        px: { xs: 2, sm: 0 }
      }}
    >
      <Container 
        component="main" 
        maxWidth="xs" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
          py: { xs: 2, sm: 0 }
        }}
      >
        <Paper 
          elevation={12} 
          sx={{ 
            p: { xs: 2, sm: 4 }, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            width: '100%',
            maxWidth: { xs: '95vw', sm: '400px' },
            mx: 'auto'
          }}
        >
          {/* Logo Section */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <img 
              src="/images/BAHO_BRAND_yellow.png" 
              alt="BAHO AFRICA Logo" 
              style={{ height: '60px', width: 'auto', marginBottom: '16px' }}
            />
            <Typography 
              component="h1" 
              variant="h4" 
              sx={{ 
                color: '#01234B', 
                fontWeight: 700,
                fontFamily: '"Bookman Old Style", "Bookman", serif'
              }}
            >
              Welcome Back
            </Typography>
          </Box>

          <Typography 
            variant="body1" 
            sx={{ 
              color: '#4A4A4A', 
              mb: 3, 
              textAlign: 'center',
              fontWeight: 500
            }}
          >
            Sign in to your account
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: '#f8f9fa',
                  '&:before': {
                    borderBottomColor: '#D4AF37',
                  },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#D4AF37',
                  },
                }
              }}
              InputLabelProps={{
                sx: {
                  color: '#01234B',
                  fontWeight: 500
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: '#f8f9fa',
                  '&:before': {
                    borderBottomColor: '#D4AF37',
                  },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#D4AF37',
                  },
                }
              }}
              InputLabelProps={{
                sx: {
                  color: '#01234B',
                  fontWeight: 500
                }
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                backgroundColor: '#01234B',
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#0a3666',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 15px rgba(1, 35, 75, 0.4)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            
            <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
              <Grid item>
                <Link 
                  component={RouterLink} 
                  to="/register" 
                  variant="body2" 
                  sx={{ 
                    color: '#01234B',
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#D4AF37',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Grid item>
                <Link 
                  href="#" 
                  variant="body2" 
                  sx={{ 
                    color: '#01234B',
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#D4AF37',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
          
          {/* Decorative elements */}
          <Box sx={{ 
            mt: 3, 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 1 
          }}>
            <Box sx={{ 
              width: 6, 
              height: 6, 
              borderRadius: '50%', 
              backgroundColor: '#D4AF37' 
            }} />
            <Box sx={{ 
              width: 6, 
              height: 6, 
              borderRadius: '50%', 
              backgroundColor: '#01234B' 
            }} />
            <Box sx={{ 
              width: 6, 
              height: 6, 
              borderRadius: '50%', 
              backgroundColor: '#D4AF37' 
            }} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;