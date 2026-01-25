import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#01234B', 
        color: 'white', 
        py: { xs: 4, sm: 6 }, // Responsive padding
        mt: 'auto' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, sm: 4 }} justifyContent="space-between"> {/* Responsive spacing */}
          {/* Left Column - Logo and Description */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' } }}>
              <Box
                component="img"
                src="/images/BAHO_BRAND_yellow.png"
                alt="BAHO AFRICA Logo"
                sx={{
                  height: { xs: '50px', sm: '60px', md: '70px' }, // Responsive logo size
                  width: 'auto',
                  mb: 2
                }}
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#D4AF37', 
                  textAlign: { xs: 'center', sm: 'left' }, // Center on mobile
                  fontSize: { xs: '0.8rem', sm: '0.9rem' } // Responsive font size
                }}
              >
                Empowering Talent, Inspiring Africa
              </Typography>
            </Box>
          </Grid>

          {/* Center Column - Quick Links */}
          <Grid item xs={12} sm={4}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: '#D4AF37', 
                mb: 2, // Reduced margin
                fontSize: { xs: '1rem', sm: '1.2rem' } // Responsive font size
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }, gap: 1 }}> {/* Responsive grid */}
              {[
                { text: 'Home', path: '/' },
                { text: 'About', path: '/about' },
                { text: 'Projects', path: '/projects' },
                { text: 'Events', path: '/events' },
                { text: 'Team', path: '/team' },
                { text: 'Contact', path: '/contact' },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }, // Responsive font size
                    '&:hover': {
                      color: '#D4AF37',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Right Column - Contact Info and Social Media */}
          <Grid item xs={12} sm={4}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: '#D4AF37', 
                mb: 2, // Reduced margin
                fontSize: { xs: '1rem', sm: '1.2rem' } // Responsive font size
              }}
            >
              Connect With Us
            </Typography>
            
            {/* Social Media Icons */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2, justifyContent: { xs: 'center', sm: 'flex-start' } }}> {/* Center on mobile */}
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Instagram, href: 'https://www.instagram.com/baho_africa?igsh=ajQ4M3Q0M3IxczVu&utm_source=qr' },
                { Icon: YouTube, href: '#' },
                { Icon: LinkedIn, href: '#' }
              ].map(({ Icon, href }, index) => (
                <IconButton
                  key={index}
                  href={href}
                  target={href !== '#' ? '_blank' : undefined}
                  rel={href !== '#' ? 'noopener noreferrer' : undefined}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: '#D4AF37',
                      transform: { xs: 'none', sm: 'scale(1.1)' }, // No scale on mobile
                    },
                    width: { xs: 36, sm: 40 }, // Responsive size
                    height: { xs: 36, sm: 40 },
                  }}
                >
                  <Icon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} /> {/* Responsive icon size */}
                </IconButton>
              ))}
            </Box>
            
            {/* Contact Info */}
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.8rem' }, // Responsive font size
                textAlign: { xs: 'center', sm: 'left' } // Center on mobile
              }}
            >
              Kigali, Rwanda<br />
              Email: info@bahoafrica.org<br />
              Phone:  +250 782 558 395
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box 
          sx={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.2)', 
            mt: { xs: 3, sm: 4 }, // Responsive margin
            pt: { xs: 2, sm: 3 }, // Responsive padding
            textAlign: 'center' 
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              fontSize: { xs: '0.7rem', sm: '0.8rem' } // Responsive font size
            }}
          >
            © {new Date().getFullYear()} BAHO AFRICA. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;