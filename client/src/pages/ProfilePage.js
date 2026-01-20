import React from 'react';
import { Container, Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <Box 
        sx={{ 
          height: '40vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(rgba(1, 35, 75, 0.8), rgba(1, 35, 75, 0.8)), url(/images/LeeImage_153.jpg) center/cover no-repeat',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} gutterBottom sx={{ fontWeight: 700 }}>
            My Profile
          </Typography>
          <Typography variant="h5" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} sx={{ maxWidth: '800px', mx: 'auto', color: '#D4AF37' }}>
            Manage your account information
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: 3, 
              overflow: 'hidden',
              backgroundColor: '#ffffff'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#01234B', fontWeight: 600, mb: 3 }}>
                  Account Information
                </Typography>
                
                {user ? (
                  <>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ color: '#4A4A4A', fontWeight: 500, mb: 1 }}>
                        Full Name
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#01234B' }}>
                        {user.firstName} {user.lastName}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ color: '#4A4A4A', fontWeight: 500, mb: 1 }}>
                        Email Address
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#01234B' }}>
                        {user.email}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ color: '#4A4A4A', fontWeight: 500, mb: 1 }}>
                        Member Since
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#01234B' }}>
                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Typography variant="body1" sx={{ color: '#4A4A4A' }}>
                    Loading profile information...
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProfilePage;