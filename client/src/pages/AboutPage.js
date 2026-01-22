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
          height: { xs: '35vh', sm: '40vh' }, // Responsive height
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(rgba(1, 35, 75, 0.8), rgba(1, 35, 75, 0.8)), url(/images/LeeImage_94.jpg) center/cover no-repeat',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h1" 
            className="text-fade-in-up" 
            style={{ animationDelay: '0.1s' }} 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } // Responsive font size
            }}
          >
            About BAHO AFRICA
          </Typography>
          <Typography 
            variant="h5" 
            className="text-fade-in-up" 
            style={{ animationDelay: '0.2s' }} 
            sx={{ 
              maxWidth: { xs: '95%', sm: '80%', md: '800px' }, // Responsive max-width
              mx: 'auto', 
              color: '#D4AF37',
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' } // Responsive font size
            }}
          >
            Empowering communities through creativity and cultural preservation
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 }, background: 'linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(/images/LeeImage_100.jpg) center/cover', borderRadius: 2, p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={{ xs: 3, sm: 4, md: 6 }} alignItems="center"> {/* Responsive spacing */}
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}>
              <Typography 
                variant="h3" 
                component="h2" 
                className="text-slide-in-left" 
                style={{ animationDelay: '0.1s' }} 
                gutterBottom 
                sx={{ 
                  color: '#01234B', 
                  fontWeight: 600,
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' } // Responsive font size
                }}
              >
                Our Story
              </Typography>
              <Typography 
                variant="body1" 
                className="text-slide-in-left" 
                style={{ animationDelay: '0.2s' }} 
                paragraph 
                sx={{ 
                  color: '#4A4A4A', 
                  lineHeight: 1.7, // Slightly reduced for mobile
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } // Responsive font size
                }}
              >
                BAHO AFRICA was founded with a vision to create a sustainable creative and culture hub in Rwanda that empowers marginalized communities. Our organization recognizes the immense talent within African communities and works to provide platforms for these individuals to showcase their abilities.
              </Typography>
              <Typography 
                variant="body1" 
                className="text-slide-in-left" 
                style={{ animationDelay: '0.3s' }} 
                paragraph 
                sx={{ 
                  color: '#4A4A4A', 
                  lineHeight: 1.7, // Slightly reduced for mobile
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } // Responsive font size
                }}
              >
                We believe that creativity and culture are powerful tools for social transformation and economic development. Through our programs, we aim to preserve African heritage while fostering innovation and entrepreneurship in the creative sector.
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                height: { xs: '200px', sm: '250px', md: '350px', lg: '400px' }, // Responsive heights
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
        <Box sx={{ mt: { xs: 6, sm: 8, md: 10 } }}> {/* Responsive margin */}
          <Typography 
            variant="h3" 
            component="h2" 
            className="text-fade-in-up" 
            style={{ animationDelay: '0.1s' }} 
            align="center" 
            gutterBottom 
            sx={{ 
              color: '#01234B', 
              fontWeight: 600, 
              mb: { xs: 4, sm: 6 }, // Responsive margin
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } // Responsive font size
            }}
          >
            Vision & Mission
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}> {/* Responsive spacing */}
            <Grid item xs={12} md={6}>
              <StyledPaper elevation={3}>
                <Typography 
                  variant="h4" 
                  component="h3" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.2s' }} 
                  gutterBottom 
                  sx={{ 
                    color: '#D4AF37', 
                    fontWeight: 600,
                    fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' } // Responsive font size
                  }}
                >
                  Our Vision
                </Typography>
                <Typography 
                  variant="body1" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.3s' }} 
                  paragraph 
                  sx={{ 
                    color: '#4A4A4A', 
                    lineHeight: 1.7, // Slightly reduced for mobile
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } // Responsive font size
                  }}
                >
                  To be the leading creative and culture hub in Africa, empowering communities and preserving African heritage while fostering innovation and entrepreneurship.
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledPaper elevation={3}>
                <Typography 
                  variant="h4" 
                  component="h3" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.2s' }} 
                  gutterBottom 
                  sx={{ 
                    color: '#D4AF37', 
                    fontWeight: 600,
                    fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' } // Responsive font size
                  }}
                >
                  Our Mission
                </Typography>
                <Typography 
                  variant="body1" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.3s' }} 
                  paragraph 
                  sx={{ 
                    color: '#4A4A4A', 
                    lineHeight: 1.7, // Slightly reduced for mobile
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } // Responsive font size
                  }}
                >
                  To empower youth, artists, refugees, women, and creatives with disabilities through arts, innovation, culture, entrepreneurship, and education, creating sustainable opportunities for creative individuals.
                </Typography>
              </StyledPaper>
            </Grid>
          </Grid>
        </Box>

        {/* Focus Areas */}
        <Box sx={{ mt: { xs: 6, sm: 8, md: 10 } }}> {/* Responsive margin */}
          <Typography 
            variant="h3" 
            component="h2" 
            className="text-fade-in-up" 
            style={{ animationDelay: '0.1s' }} 
            align="center" 
            gutterBottom 
            sx={{ 
              color: '#01234B', 
              fontWeight: 600, 
              mb: { xs: 4, sm: 6 }, // Responsive margin
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } // Responsive font size
            }}
          >
            Our Focus Areas
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}> {/* Responsive spacing */}
            <Grid item xs={12} sm={6} md={3}> {/* Responsive grid - 2 columns on small, 4 on medium+ */}
              <StyledPaper elevation={3} sx={{ textAlign: 'center', py: { xs: 3, sm: 4 }, px: { xs: 1, sm: 2 }, height: '100%' }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.2s' }} 
                  gutterBottom 
                  sx={{ 
                    color: '#D4AF37', 
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' } // Responsive font size
                  }}
                >
                  Creativity
                </Typography>
                <Typography 
                  variant="body2" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.3s' }} 
                  sx={{ 
                    color: '#4A4A4A',
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } // Responsive font size
                  }}
                >
                  Fostering artistic expression and creative innovation across various disciplines.
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}> {/* Responsive grid - 2 columns on small, 4 on medium+ */}
              <StyledPaper elevation={3} sx={{ textAlign: 'center', py: { xs: 3, sm: 4 }, px: { xs: 1, sm: 2 }, height: '100%' }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.2s' }} 
                  gutterBottom 
                  sx={{ 
                    color: '#D4AF37', 
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' } // Responsive font size
                  }}
                >
                  Innovation
                </Typography>
                <Typography 
                  variant="body2" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.3s' }} 
                  sx={{ 
                    color: '#4A4A4A',
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } // Responsive font size
                  }}
                >
                  Encouraging new approaches to traditional arts and cultural preservation.
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}> {/* Responsive grid - 2 columns on small, 4 on medium+ */}
              <StyledPaper elevation={3} sx={{ textAlign: 'center', py: { xs: 3, sm: 4 }, px: { xs: 1, sm: 2 }, height: '100%' }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.2s' }} 
                  gutterBottom 
                  sx={{ 
                    color: '#D4AF37', 
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' } // Responsive font size
                  }}
                >
                  Inclusion
                </Typography>
                <Typography 
                  variant="body2" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.3s' }} 
                  sx={{ 
                    color: '#4A4A4A',
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } // Responsive font size
                  }}
                >
                  Providing equal opportunities for all, especially marginalized communities.
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}> {/* Responsive grid - 2 columns on small, 4 on medium+ */}
              <StyledPaper elevation={3} sx={{ textAlign: 'center', py: { xs: 3, sm: 4 }, px: { xs: 1, sm: 2 }, height: '100%' }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.2s' }} 
                  gutterBottom 
                  sx={{ 
                    color: '#D4AF37', 
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' } // Responsive font size
                  }}
                >
                  Heritage
                </Typography>
                <Typography 
                  variant="body2" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.3s' }} 
                  sx={{ 
                    color: '#4A4A4A',
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } // Responsive font size
                  }}
                >
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