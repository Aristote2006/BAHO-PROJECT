import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#01234B', // Brand Primary Color
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#D4AF37' }}>
              BAHO AFRICA
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#e0e0e0' }}>
              Creative and Culture Hub based in Rwanda, empowering youth, artists, refugees, women, and creatives with disabilities through arts, innovation, culture, entrepreneurship, and education.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                href="#" 
                sx={{ color: 'white', '&:hover': { color: '#D4AF37' } }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                href="#" 
                sx={{ color: 'white', '&:hover': { color: '#D4AF37' } }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                href="#" 
                sx={{ color: 'white', '&:hover': { color: '#D4AF37' } }}
              >
                <Instagram />
              </IconButton>
              <IconButton 
                href="#" 
                sx={{ color: 'white', '&:hover': { color: '#D4AF37' } }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#D4AF37' }}>
              Quick Links
            </Typography>
            <Box>
              <Link href="/" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                Home
              </Link>
              <Link href="/about" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                About
              </Link>
              <Link href="/what-we-do" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                What We Do
              </Link>
              <Link href="/projects" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                Projects
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#D4AF37' }}>
              Contact Info
            </Typography>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, color: '#e0e0e0' }}>
                Northern Province, Musanze, Rwanda
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#e0e0e0' }}>
                Phone: +250 782 558 395
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#e0e0e0' }}>
                Email: bahoafrica@gmail.com
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#D4AF37' }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#e0e0e0' }}>
              Subscribe to our newsletter for updates and news.
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px 0 0 4px',
                  border: 'none',
                  outline: 'none',
                  width: '100%'
                }}
              />
              <button
                style={{
                  backgroundColor: '#D4AF37',
                  color: '#01234B',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '0 4px 4px 0',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Join
              </button>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            borderTop: '1px solid #444',
            mt: 4,
            pt: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" sx={{ color: '#bbbbbb' }}>
            &copy; {new Date().getFullYear()} BAHO AFRICA. All rights reserved. Empowering Talent, Inspiring Africa.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
