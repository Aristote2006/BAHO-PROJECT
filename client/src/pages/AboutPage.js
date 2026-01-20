import React from 'react';
import { Container, Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  borderRadius: 8,
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
}));

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <Box 
        sx={{ 
          height: '40vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(rgba(1, 35, 75, 0.8), rgba(1, 35, 75, 0.8)), url(/images/LeeImage_94.jpg) center/cover no-repeat',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} gutterBottom sx={{ fontWeight: 700 }}>
            About BAHO AFRICA
          </Typography>
          <Typography variant="h5" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} sx={{ maxWidth: '800px', mx: 'auto', color: '#D4AF37' }}>
            Empowering communities through creativity and cultural preservation
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8, background: 'linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(/images/LeeImage_100.jpg) center/cover', borderRadius: 2, p: 3 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}>
              <Typography variant="h3" component="h2" className="text-slide-in-left" style={{ animationDelay: '0.1s' }} gutterBottom sx={{ color: '#01234B', fontWeight: 600 }}>
                Our Story
              </Typography>
              <Typography variant="body1" className="text-slide-in-left" style={{ animationDelay: '0.2s' }} paragraph sx={{ color: '#4A4A4A', lineHeight: 1.8 }}>
                BAHO AFRICA was founded with a vision to create a sustainable creative and culture hub in Rwanda that empowers marginalized communities. Our organization recognizes the immense talent within African communities and works to provide platforms for these individuals to showcase their abilities.
              </Typography>
              <Typography variant="body1" className="text-slide-in-left" style={{ animationDelay: '0.3s' }} paragraph sx={{ color: '#4A4A4A', lineHeight: 1.8 }}>
                We believe that creativity and culture are powerful tools for social transformation and economic development. Through our programs, we aim to preserve African heritage while fostering innovation and entrepreneurship in the creative sector.
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                height: { xs: '250px', sm: '350px', md: '400px' }, 
                backgroundImage: 'url(/images/LeeImage_180.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 2,
                backgroundColor: 'white',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>
        </Grid>

        {/* Vision & Mission */}
        <Box sx={{ mt: 10 }}>
          <Typography variant="h3" component="h2" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} align="center" gutterBottom sx={{ color: '#01234B', fontWeight: 600, mb: 6 }}>
            Vision & Mission
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <StyledPaper elevation={3}>
                <Typography variant="h4" component="h3" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} gutterBottom sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" className="text-fade-in-up" style={{ animationDelay: '0.3s' }} paragraph sx={{ color: '#4A4A4A', lineHeight: 1.8 }}>
                  To be the leading creative and culture hub in Africa, empowering communities and preserving African heritage while fostering innovation and entrepreneurship.
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledPaper elevation={3}>
                <Typography variant="h4" component="h3" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} gutterBottom sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" className="text-fade-in-up" style={{ animationDelay: '0.3s' }} paragraph sx={{ color: '#4A4A4A', lineHeight: 1.8 }}>
                  To empower youth, artists, refugees, women, and creatives with disabilities through arts, innovation, culture, entrepreneurship, and education, creating sustainable opportunities for creative individuals.
                </Typography>
              </StyledPaper>
            </Grid>
          </Grid>
        </Box>

        {/* Focus Areas */}
        <Box sx={{ mt: 10 }}>
          <Typography variant="h3" component="h2" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} align="center" gutterBottom sx={{ color: '#01234B', fontWeight: 600, mb: 6 }}>
            Our Focus Areas
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <StyledPaper elevation={3} sx={{ textAlign: 'center', py: 4, px: 2, height: '100%' }}>
                <Typography variant="h5" component="h3" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} gutterBottom sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Creativity
                </Typography>
                <Typography variant="body2" className="text-fade-in-up" style={{ animationDelay: '0.3s' }} sx={{ color: '#4A4A4A' }}>
                  Fostering artistic expression and creative innovation across various disciplines.
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StyledPaper elevation={3} sx={{ textAlign: 'center', py: 4, px: 2, height: '100%' }}>
                <Typography variant="h5" component="h3" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} gutterBottom sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Innovation
                </Typography>
                <Typography variant="body2" className="text-fade-in-up" style={{ animationDelay: '0.3s' }} sx={{ color: '#4A4A4A' }}>
                  Encouraging new approaches to traditional arts and cultural preservation.
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StyledPaper elevation={3} sx={{ textAlign: 'center', py: 4, px: 2, height: '100%' }}>
                <Typography variant="h5" component="h3" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} gutterBottom sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Inclusion
                </Typography>
                <Typography variant="body2" className="text-fade-in-up" style={{ animationDelay: '0.3s' }} sx={{ color: '#4A4A4A' }}>
                  Providing equal opportunities for all, especially marginalized communities.
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StyledPaper elevation={3} sx={{ textAlign: 'center', py: 4, px: 2, height: '100%' }}>
                <Typography variant="h5" component="h3" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} gutterBottom sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Heritage
                </Typography>
                <Typography variant="body2" className="text-fade-in-up" style={{ animationDelay: '0.3s' }} sx={{ color: '#4A4A4A' }}>
                  Preserving and promoting African cultural heritage and traditions.
                </Typography>
              </StyledPaper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default AboutPage;
