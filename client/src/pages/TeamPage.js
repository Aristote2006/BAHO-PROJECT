import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia, Avatar, Zoom } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Lightbulb, People, Star } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: 24,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(212, 175, 55, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-15px)',
    boxShadow: '0 25px 50px rgba(1, 35, 75, 0.2)',
    borderColor: '#D4AF37',
    '& .member-image': {
      transform: 'scale(1.1)',
    },
    '& .card-overlay': {
      opacity: 1,
    }
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 280,
  [theme.breakpoints.up('sm')]: {
    height: 350,
  },
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '24px 24px 0 0',
}));

const ValueCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(4),
  borderRadius: 20,
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(212, 175, 55, 0.2)',
  transition: 'all 0.5s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: '#D4AF37',
    transform: 'scaleX(0)',
    transition: 'transform 0.5s ease',
    transformOrigin: 'left',
  },
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 30px 60px rgba(1, 35, 75, 0.2)',
    '&::after': {
      transform: 'scaleX(1)',
    },
    '& .value-icon': {
      transform: 'rotateY(360deg)',
      backgroundColor: '#01234B',
      color: '#D4AF37',
    }
  },
}));

const ValueIconWrapper = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: '#D4AF37',
  color: '#01234B',
  marginBottom: theme.spacing(3),
  fontSize: '2.5rem',
  transition: 'all 0.6s ease',
  boxShadow: '0 8px 16px rgba(212, 175, 55, 0.3)',
}));

const TeamPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'NDATIMANA FABRICE',
      position: 'Founder & CEO',
      image: '/images/FABRICE.jpeg'
    },
    {
      id: 2,
      name: 'TERRI MAYHAN',
      position: 'Operating Manager',
      image: '/images/MAYHAN.png'
    },
    {
      id: 3,
      name: 'UMURUNGI NATASHA',
      position: 'Communication Manager',
      image: '/images/NATASHA.jpg'
    },
    {
      id: 4,
      name: 'RUKUNDO HERITIER',
      position: 'Project Coordinator',
      image: '/images/HERITIER.jpg'
    },
    {
      id: 5,
      name: 'MUGISHA ALAIN',
      position: 'Creative Director',
      image: '/images/LeeImage_140.JPG'
    },
    {
      id: 6,
      name: 'UWASE BELLA',
      position: 'Finance Manager',
      image: '/images/LeeImage_120.jpg'
    },
    {
      id: 7,
      name: 'GAKURU JEAN',
      position: 'Cultural Consultant',
      image: '/images/LeeImage_80.jpg'
    },
    {
      id: 8,
      name: 'KEZA DIANE',
      position: 'Social Media Expert',
      image: '/images/LeeImage_65.jpg'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Box 
        sx={{ 
          height: '40vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(rgba(1, 35, 75, 0.8), rgba(1, 35, 75, 0.8)), url(/images/LeeImage_130.jpg) center/cover no-repeat',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} gutterBottom sx={{ fontWeight: 700 }}>
            Our Team
          </Typography>
          <Typography variant="h5" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} sx={{ maxWidth: '800px', mx: 'auto', color: '#D4AF37' }}>
            Dedicated professionals committed to empowering communities through creativity and culture
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8, background: 'linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(/images/LeeImage_124.jpg) center/cover', borderRadius: 2, p: 3 }}>
        <Typography variant="h3" component="h2" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} align="center" gutterBottom sx={{ color: '#01234B', fontWeight: 600, mb: 8 }}>
          Meet Our Leadership
        </Typography>
        
        <Grid container spacing={6}>
          {teamMembers.map((member) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={member.id}>
              <StyledCard>
                <ImageContainer>
                  <CardMedia
                    component="img"
                    image={member.image}
                    alt={member.name}
                    className="member-image"
                    sx={{ 
                      height: '100%', 
                      width: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.8s ease'
                    }}
                  />
                  <Box 
                    className="card-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to top, rgba(1, 35, 75, 0.7) 0%, rgba(13, 27, 42, 0) 50%)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                      pointerEvents: 'none'
                    }}
                  />
                </ImageContainer>
                <CardContent sx={{ 
                  flexGrow: 1, 
                  pt: 3, 
                  pb: 3,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: 100,
                  zIndex: 2
                }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      color: '#01234B', 
                      fontWeight: 800,
                      fontSize: '1.15rem',
                      mb: 1,
                      lineHeight: 1.2,
                      textTransform: 'uppercase'
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="secondary" 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      color: '#D4AF37'
                    }}
                  >
                    {member.position}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Team Values */}
        <Box sx={{ mt: 15, mb: 10 }}>
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ color: '#01234B', fontWeight: 800, mb: 2, letterSpacing: '-0.5px' }}>
            Our Core Values
          </Typography>
          <Box sx={{ width: 80, height: 4, bgcolor: '#D4AF37', mx: 'auto', mb: 8, borderRadius: 2 }} />
          
          <Grid container spacing={4} alignItems="stretch">
            {[
              {
                title: 'Creativity',
                icon: <Lightbulb sx={{ fontSize: '2.5rem' }} />,
                text: 'We foster creative expression and innovation in all our endeavors, encouraging new approaches to cultural preservation and artistic expression.',
                delay: '0.2s'
              },
              {
                title: 'Inclusion',
                icon: <People sx={{ fontSize: '2.5rem' }} />,
                text: 'We are committed to ensuring equal opportunities for all, with special attention to marginalized communities including women, refugees, and people with disabilities.',
                delay: '0.4s'
              },
              {
                title: 'Excellence',
                icon: <Star sx={{ fontSize: '2.5rem' }} />,
                text: 'We strive for the highest standards in all our programs and services, ensuring maximum impact for the communities we serve.',
                delay: '0.6s'
              }
            ].map((value, idx) => (
              <Grid item xs={12} md={4} key={idx} sx={{ display: 'flex' }}>
                <ValueCard>
                  <ValueIconWrapper className="value-icon">
                    {value.icon}
                  </ValueIconWrapper>
                  <Typography variant="h4" component="h3" gutterBottom sx={{ color: '#01234B', fontWeight: 700, mb: 2 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#4A4A4A', fontSize: '1.1rem', lineHeight: 1.8, fontWeight: 500 }}>
                    {value.text}
                  </Typography>
                </ValueCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default TeamPage;
