import React from 'react';
import { Container, Box, Typography, Grid, Paper, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 8,
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },
}));

const WhatWeDoPage = () => {
  const services = [
    {
      title: "Creative & Performing Arts",
      description: "We provide platforms for artists to showcase their talents through performances, exhibitions, and cultural events. Our programs include theater, music, dance, visual arts, and storytelling initiatives.",
      image: "/images/creativearts.jpeg"
    },
    {
      title: "Cultural Heritage & Innovation",
      description: "We preserve and promote African cultural heritage while fostering innovation in traditional arts and crafts. Our initiatives blend traditional practices with modern techniques to create sustainable cultural enterprises.",
      image: "/images/LeeImage_100.jpg"
    },
    {
      title: "Education & Capacity Building",
      description: "We offer training programs and workshops to enhance skills in various creative fields and entrepreneurship. Our educational initiatives focus on practical skills development and business acumen for creative professionals.",
      image: "/images/LeeImage_44.jpg"
    },
    {
      title: "Networking & Advocacy",
      description: "We create networks that connect artists, cultural practitioners, and creative entrepreneurs. Our advocacy efforts work to ensure that creative voices are heard in policy discussions and that the creative economy receives appropriate support.",
      image: "/images/BAHO(55).jpg"
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
          background: 'linear-gradient(rgba(1, 35, 75, 0.8), rgba(1, 35, 75, 0.8)), url(/images/LeeImage_74.jpg) center/cover no-repeat',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} gutterBottom sx={{ fontWeight: 700 }}>
            What We Do
          </Typography>
          <Typography variant="h5" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} sx={{ maxWidth: '800px', mx: 'auto', color: '#D4AF37' }}>
            Empowering communities through creativity, innovation, and cultural preservation
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8, background: 'linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(/images/JKP_2680.JPG) center/cover', borderRadius: 2, p: 3 }}>
        <Typography variant="h3" component="h2" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} align="center" gutterBottom sx={{ color: '#01234B', fontWeight: 600, mb: 8 }}>
          Our Core Services
        </Typography>
        
        <Grid container spacing={6}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} key={index}>
              <StyledCard>
                <CardMedia
                  component="img"
                  image={service.image}
                  alt={service.title}
                  sx={{
                    height: { xs: 200, sm: 250 },
                    objectFit: 'cover'
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h4" component="h3" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} sx={{ color: '#01234B', fontWeight: 600 }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body1" className="text-fade-in-up" style={{ animationDelay: '0.3s' }} sx={{ color: '#4A4A4A', lineHeight: 1.8 }}>
                    {service.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Additional Info Section */}
        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} gutterBottom sx={{ color: '#01234B', fontWeight: 600, mb: 4 }}>
            Our Approach
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
                <Typography variant="h5" component="h3" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} gutterBottom sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Community-Centered
                </Typography>
                <Typography variant="body1" className="text-fade-in-up" style={{ animationDelay: '0.3s' }} sx={{ color: '#4A4A4A' }}>
                  We work directly with communities to identify their cultural assets and creative potential, ensuring that our programs are relevant and sustainable.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
                <Typography variant="h5" component="h3" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} gutterBottom sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Inclusive
                </Typography>
                <Typography variant="body1" className="text-fade-in-up" style={{ animationDelay: '0.3s' }} sx={{ color: '#4A4A4A' }}>
                  Our programs are designed to be inclusive and accessible, with special attention to marginalized groups including women, refugees, and people with disabilities.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
                <Typography variant="h5" component="h3" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} gutterBottom sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Sustainable
                </Typography>
                <Typography variant="body1" className="text-fade-in-up" style={{ animationDelay: '0.3s' }} sx={{ color: '#4A4A4A' }}>
                  We focus on creating sustainable economic opportunities for creative individuals, helping them build viable careers in the creative economy.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default WhatWeDoPage;
