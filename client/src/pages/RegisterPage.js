import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Link, Grid, Alert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { authService } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register: contextRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    // Basic validation for inputs
    if (!firstName.trim()) {
      setError('Please enter your first name');
      setLoading(false);
      return;
    }
    
    if (!lastName.trim()) {
      setError('Please enter your last name');
      setLoading(false);
      return;
    }
    
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    // Password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
    
    try {
      // Use the context register function instead of direct API call
      const result = await contextRegister(firstName, lastName, email, password);
      
      if (result.success) {
        console.log('Registration successful via context');
        
        // Redirect to admin dashboard (all users are admins)
        navigate('/admin');
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error details:', err);
      setError(err.message || 'An error occurred during registration. Please try again.');
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
        maxWidth="sm" 
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
            maxWidth: { xs: '95vw', sm: '500px' },
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
              Join BAHO AFRICA
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
            Create your account to get started
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
                  color: '#0D1B2A',
                  fontWeight: 500
                }
              }}
            />
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              </Grid>
            </Grid>
            
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
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            
            <Grid container justifyContent="center">
              <Grid item>
                <Link 
                  component={RouterLink} 
                  to="/login" 
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
                  {"Already have an account? Sign in"}
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

export default RegisterPage;