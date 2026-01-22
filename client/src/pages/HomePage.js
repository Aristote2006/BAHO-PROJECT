import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Grid, Paper, Card, CardContent, CardMedia, Chip, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { ArrowForward, CalendarToday, LocationOn, AccessTime } from '@mui/icons-material';
import { eventService, projectService } from '../services/apiService';
import { STATIC_PROJECTS, STATIC_EVENTS } from '../constants/staticData';

// Updated HeroSection with better mobile responsiveness
const HeroSection = styled(Box)(({ theme }) => ({
  height: '90vh', // Increased for better visibility
  [theme.breakpoints.down('md')]: {
    height: '80vh', // Medium screens
  },
  [theme.breakpoints.down('sm')]: {
    height: '70vh', // Small screens
  },
  [theme.breakpoints.down('xs')]: {
    height: '65vh', // Extra small screens
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  color: 'white',
  textAlign: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#01234B',
    zIndex: 1,
  },
}));

const SlideshowImage = styled(Box)(({ src }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#01234B',
  // Ensure the image covers properly on all devices
  [theme.breakpoints.down('sm')]: {
    backgroundSize: 'cover', // Maintain aspect ratio
  },
}));

const AnimatedText = styled('span')(({ theme }) => ({
  display: 'inline-block',
  animation: 'bounce 2s infinite',
  color: '#D4AF37',
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2em', // Slightly smaller on mobile
  },
}));

const HeroOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to bottom, rgba(1, 35, 75, 0.3) 0%, rgba(1, 35, 75, 0.5) 100%)',
  zIndex: 2.5,
});

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayEvents, setDisplayEvents] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const heroImages = [
    '/images/LeeImage_7.jpg'
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, projectsData] = await Promise.all([
          eventService.getAll().catch(() => []),
          projectService.getAll().catch(() => [])
        ]);
        
        // Merge dynamic and static, taking newest first and maintaining count of 3
        const mergedEvents = [...eventsData, ...STATIC_EVENTS].slice(0, 3);
        const mergedProjects = [...projectsData, ...STATIC_PROJECTS].slice(0, 3);
        
        setDisplayEvents(mergedEvents);
        setDisplayProjects(mergedProjects);
      } catch (error) {
        console.error('Error fetching data:', error);
        setDisplayEvents(STATIC_EVENTS.slice(0, 3));
        setDisplayProjects(STATIC_PROJECTS.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // 5 seconds per slide for smooth transitions
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        {heroImages.map((img, index) => (
          <SlideshowImage 
            key={index} 
            src={img} 
            style={{
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1.2s linear',
              zIndex: currentSlide === index ? 2 : 0,
            }}
          />
        ))}
        <HeroOverlay />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <Box py={{ xs: 2, sm: 3, md: 5 }}> {/* Reduced padding on mobile */}
            <Box 
              className="text-fade-in-up"
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile
                alignItems: 'center', 
                justifyContent: 'center', 
                mb: 3, // Reduced margin
                gap: { xs: 1, sm: 2 } // Adjust gap for mobile
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center', // Center on mobile
                  mb: { xs: 1, sm: 0 }, // Margin bottom on mobile
                  filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))'
                }}
              >
                <img 
                  src="/images/BAHO_BRAND_yellow.png" 
                  alt="BAHO AFRICA Logo" 
                  style={{ 
                    height: { xs: '60px', sm: '80px', md: '100px' }, // Responsive logo size
                    width: 'auto',
                    maxWidth: '100%' // Ensure it fits container
                  }}
                />
              </Box>

              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  fontWeight: 900, 
                  textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
                  fontFamily: '"Bookman Old Style", "Bookman", serif',
                  letterSpacing: { xs: '3px', sm: '4px', md: '6px' }, // Adjust for mobile
                  color: 'white',
                  lineHeight: 1.1, // Slightly increased for readability
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '5rem' }, // More responsive sizing
                  textAlign: { xs: 'center', sm: 'left' } // Center on mobile
                }}
              >
                AFRICA
              </Typography>
            </Box>

            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom 
              className="text-fade-in-up" 
              style={{ animationDelay: '0.3s' }} 
              sx={{ 
                fontWeight: 700, 
                mb: 3, // Reduced margin
                maxWidth: { xs: '95%', sm: '80%', md: '800px' }, // Responsive max-width
                mx: 'auto', 
                textShadow: '3px 3px 6px rgba(0,0,0,0.7)', 
                fontSize: { xs: '1.3rem', sm: '1.6rem', md: '2rem', lg: '2.5rem' } // Responsive font size
              }}
            >
              Empowering <AnimatedText className="text-pulse">Talent</AnimatedText>, Inspiring <AnimatedText className="text-pulse">Africa</AnimatedText>
            </Typography>
            
            <Typography 
              variant="h4" 
              className="text-fade-in-up" 
              style={{ animationDelay: '0.6s' }} 
              sx={{ 
                mb: 3, // Reduced margin
                maxWidth: { xs: '95%', sm: '80%', md: '800px' }, // Responsive max-width
                mx: 'auto', 
                color: '#D4AF37', 
                textShadow: '3px 3px 6px rgba(0,0,0,0.7)', 
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem', lg: '1.6rem' }, // Responsive font size
                lineHeight: 1.6 // Better line height for readability
              }}
            >
              Creative and Culture Hub based in Rwanda, empowering youth, artists, refugees, women, and creatives with disabilities through arts, innovation, culture, entrepreneurship, and education.
            </Typography>
            
            <Box 
              sx={{ 
                mt: 3, // Reduced margin
                display: 'flex', 
                justifyContent: 'center', 
                gap: { xs: 1, sm: 2 }, // Responsive gap
                flexWrap: 'wrap', // Wrap buttons on small screens
                flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons vertically on mobile
                alignItems: 'center' // Center items
              }}
            >
              <Button 
                component={Link} 
                to="/about" 
                variant="contained" 
                size="large" 
                sx={{ 
                  backgroundColor: '#D4AF37', 
                  color: '#01234B',
                  px: { xs: 3, sm: 4 }, // Responsive padding
                  py: { xs: 1, sm: 1.5 }, // Responsive padding
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, // Responsive font size
                  mb: { xs: 1, sm: 0 }, // Margin bottom on mobile for vertical stacking
                  minWidth: { xs: '200px', sm: 'auto' }, // Minimum width on mobile
                  '&:hover': {
                    backgroundColor: '#b8972d',
                  }
                }}
              >
                About Us
              </Button>
              
              <Button 
                component={Link} 
                to="/projects" 
                variant="outlined" 
                size="large" 
                sx={{ 
                  borderColor: '#D4AF37', 
                  color: 'white',
                  px: { xs: 3, sm: 4 }, // Responsive padding
                  py: { xs: 1, sm: 1.5 }, // Responsive padding
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, // Responsive font size
                  mb: { xs: 1, sm: 0 }, // Margin bottom on mobile for vertical stacking
                  minWidth: { xs: '200px', sm: 'auto' }, // Minimum width on mobile
                  '&:hover': {
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    borderColor: '#D4AF37',
                  }
                }}
              >
                Our Projects
              </Button>
              
              <Button 
                component={Link} 
                to="/contact" 
                variant="outlined" 
                size="large" 
                sx={{ 
                  borderColor: '#D4AF37', 
                  color: 'white',
                  px: { xs: 3, sm: 4 }, // Responsive padding
                  py: { xs: 1, sm: 1.5 }, // Responsive padding
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, // Responsive font size
                  minWidth: { xs: '200px', sm: 'auto' }, // Minimum width on mobile
                  '&:hover': {
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    borderColor: '#D4AF37',
                  }
                }}
              >
                Contact Us
              </Button>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      {/* About Section */}
      <Box py={{ xs: 5, sm: 6, md: 8 }} sx={{ backgroundColor: '#F5F5F5' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 3, sm: 4 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h2" 
                className="text-slide-in-left" 
                style={{ animationDelay: '0.1s' }} 
                gutterBottom 
                sx={{ 
                  color: '#01234B', 
                  fontWeight: 600,
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } // Responsive font size
                }}
              >
                About BAHO AFRICA
              </Typography>
              <Typography 
                variant="h5" 
                className="text-slide-in-left" 
                style={{ animationDelay: '0.2s' }} 
                sx={{ 
                  color: '#4A4A4A', 
                  mb: 2, // Reduced margin
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } // Responsive font size
                }}
              >
                Empowering communities through creativity and innovation
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
                BAHO AFRICA is a Creative and Culture Hub based in Rwanda, dedicated to empowering youth, artists, refugees, women, and creatives with disabilities. Through arts, innovation, culture, entrepreneurship, and education, we foster an environment where talent can flourish and contribute to the development of our communities.
              </Typography>
              <Typography 
                variant="body1" 
                className="text-slide-in-left" 
                style={{ animationDelay: '0.4s' }} 
                paragraph 
                sx={{ 
                  color: '#4A4A4A', 
                  lineHeight: 1.7, // Slightly reduced for mobile
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } // Responsive font size
                }}
              >
                Our mission is to create sustainable opportunities for creative individuals, providing them with the tools, resources, and platforms they need to showcase their talents and build meaningful careers in the creative economy.
              </Typography>
              <Button 
                className="text-slide-in-left"
                style={{ animationDelay: '0.5s' }}
                component={Link} 
                to="/about" 
                variant="contained" 
                endIcon={<ArrowForward />}
                sx={{ 
                  backgroundColor: '#01234B', 
                  color: 'white',
                  mt: 1, // Reduced margin
                  px: { xs: 2, sm: 3 }, // Responsive padding
                  py: { xs: 1, sm: 1.2 }, // Responsive padding
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                  '&:hover': {
                    backgroundColor: '#0a3666',
                  }
                }}
              >
                Learn More
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={3} 
                sx={{ 
                  height: { xs: '200px', sm: '250px', md: '350px', lg: '400px' }, // Responsive heights
                  backgroundImage: 'url(/images/LeeImage_80.jpg)', // Using your local image
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 2,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* What We Do Section */}
      <Box py={{ xs: 5, sm: 6, md: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h2" 
            className="text-fade-in-up" 
            style={{ animationDelay: '0.1s' }} 
            align="center" 
            gutterBottom 
            sx={{ 
              color: '#01234B', 
              fontWeight: 600, 
              mb: 4, // Reduced margin
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } // Responsive font size
            }}
          >
            What We Do
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}> {/* Responsive spacing */}
            <Grid item xs={12} sm={6} md={4}> {/* Responsive grid columns */}
              <Paper 
                elevation={3} 
                sx={{ 
                  p: { xs: 2, sm: 3 }, // Responsive padding
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: { xs: 'none', sm: 'translateY(-8px)' }, // No hover effect on mobile
                    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Box 
                  component="img" 
                  className="text-fade-in-up"
                  style={{ animationDelay: '0.2s' }}
                  src="/images/creativearts.jpeg" // Using your local image
                  alt="Creative & Performing Arts" 
                  sx={{ 
                    width: '100%', 
                    height: { xs: '140px', sm: '160px', md: '180px' }, // Responsive heights
                    objectFit: 'cover', 
                    borderRadius: 2, 
                    mb: 2 
                  }}
                />
                <Typography 
                  variant="h5" 
                  component="h3" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.3s' }} 
                  gutterBottom 
                  sx={{ 
                    color: '#01234B', 
                    fontWeight: 600,
                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' } // Responsive font size
                  }}
                >
                  Creative & Performing Arts
                </Typography>
                <Typography 
                  variant="body1" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.4s' }} 
                  sx={{ 
                    color: '#4A4A4A',
                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } // Responsive font size
                  }}
                >
                  We provide platforms for artists to showcase their talents through performances, exhibitions, and cultural events.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}> {/* Responsive grid columns */}
              <Paper 
                elevation={3} 
                sx={{ 
                  p: { xs: 2, sm: 3 }, // Responsive padding
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: { xs: 'none', sm: 'translateY(-8px)' }, // No hover effect on mobile
                    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Box 
                  component="img" 
                  className="text-fade-in-up"
                  style={{ animationDelay: '0.2s' }}
                  src="/images/cultureheritage.jpeg" // Using your local image
                  alt="Cultural Heritage & Innovation" 
                  sx={{ 
                    width: '100%', 
                    height: { xs: '140px', sm: '160px', md: '180px' }, // Responsive heights
                    objectFit: 'cover', 
                    borderRadius: 2, 
                    mb: 2 
                  }}
                />
                <Typography 
                  variant="h5" 
                  component="h3" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.3s' }} 
                  gutterBottom 
                  sx={{ 
                    color: '#01234B', 
                    fontWeight: 600,
                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' } // Responsive font size
                  }}
                >
                  Cultural Heritage & Innovation
                </Typography>
                <Typography 
                  variant="body1" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.4s' }} 
                  sx={{ 
                    color: '#4A4A4A',
                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } // Responsive font size
                  }}
                >
                  We preserve and promote African cultural heritage while fostering innovation in traditional arts and crafts.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4}> {/* Full width on small screens, normal on medium+ */}
              <Paper 
                elevation={3} 
                sx={{ 
                  p: { xs: 2, sm: 3 }, // Responsive padding
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: { xs: 'none', sm: 'translateY(-8px)' }, // No hover effect on mobile
                    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Box 
                  component="img" 
                  className="text-fade-in-up"
                  style={{ animationDelay: '0.2s' }}
                  src="/images/education.jpeg" // Using your local image
                  alt="Education & Capacity Building" 
                  sx={{ 
                    width: '100%', 
                    height: { xs: '140px', sm: '160px', md: '180px' }, // Responsive heights
                    objectFit: 'cover', 
                    borderRadius: 2, 
                    mb: 2 
                  }}
                />
                <Typography 
                  variant="h5" 
                  component="h3" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.3s' }} 
                  gutterBottom 
                  sx={{ 
                    color: '#01234B', 
                    fontWeight: 600,
                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' } // Responsive font size
                  }}
                >
                  Education & Capacity Building
                </Typography>
                <Typography 
                  variant="body1" 
                  className="text-fade-in-up" 
                  style={{ animationDelay: '0.4s' }} 
                  sx={{ 
                    color: '#4A4A4A',
                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } // Responsive font size
                  }}
                >
                  We offer training programs and workshops to enhance skills in various creative fields and entrepreneurship.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Events Section Preview */}
      <Box py={{ xs: 5, sm: 6, md: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h2" 
            className="text-fade-in-up" 
            style={{ animationDelay: '0.1s' }} 
            align="center" 
            gutterBottom 
            sx={{ 
              color: '#01234B', 
              fontWeight: 600, 
              mb: 4, // Reduced margin
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } // Responsive font size
            }}
          >
            Upcoming Events
          </Typography>
          {loading ? (
            <Box textAlign="center" py={{ xs: 3, sm: 4 }}><CircularProgress sx={{ color: '#D4AF37' }} /></Box>
          ) : (
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}> {/* Responsive spacing */}
              {displayEvents.map((event, index) => (
                <Grid item xs={12} sm={6} md={4} key={event._id}> {/* Responsive grid columns */}
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 2,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    position: 'relative',
                    '&:hover': { 
                      transform: { xs: 'none', sm: 'translateY(-8px)' } // No hover effect on mobile
                    }
                  }}>
                    { !event.isStatic && (
                      <Chip 
                        label="NEW" 
                        color="error" 
                        size="small" 
                        sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10, fontWeight: 'bold' }} 
                      />
                    )}
                    <CardMedia
                      component="img"
                      height={{ xs: '160', sm: '180', md: '200' }} // Responsive heights
                      image={event.image || '/images/placeholder-event.jpg'}
                      alt={event.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Chip 
                        label={event.category} 
                        size="small" 
                        sx={{ 
                          mb: 1, 
                          backgroundColor: '#D4AF37', 
                          color: '#01234B', 
                          fontWeight: 600,
                          fontSize: { xs: '0.7rem', sm: '0.8rem' } // Responsive font size
                        }} 
                      />
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h3" 
                        sx={{ 
                          color: '#01234B', 
                          fontWeight: 600,
                          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } // Responsive font size
                        }}
                      >
                        {event.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#666' }}>
                        <CalendarToday sx={{ fontSize: '1rem' }} />
                        <Typography 
                          variant="body2"
                          sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }} // Responsive font size
                        >
                          {event.scope?.startDate ? (typeof event.scope.startDate === 'string' && event.scope.startDate.includes('Soon') ? event.scope.startDate : new Date(event.scope.startDate).toLocaleDateString()) : 'Date TBD'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#666' }}>
                        <LocationOn sx={{ fontSize: '1rem' }} />
                        <Typography 
                          variant="body2"
                          sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }} // Responsive font size
                        >
                          {event.location}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#4A4A4A',
                          fontSize: { xs: '0.8rem', sm: '0.85rem' } // Responsive font size
                        }}
                      >
                        {event.description?.substring(0, 100)}...
                      </Typography>
                    </CardContent>
                    <Box p={{ xs: 1.5, sm: 2 }} pt={0}>
                      <Button 
                        component={Link} 
                        to="/events" 
                        fullWidth 
                        variant="outlined" 
                        sx={{ 
                          color: '#01234B', 
                          borderColor: '#01234B',
                          fontSize: { xs: '0.8rem', sm: '0.9rem' } // Responsive font size
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <Box textAlign="center" mt={{ xs: 4, sm: 6 }}>
            <Button 
              component={Link} 
              to="/events" 
              variant="contained" 
              size="large" 
              sx={{ 
                backgroundColor: '#D4AF37', 
                color: '#01234B', 
                '&:hover': { 
                  backgroundColor: '#b8972d' 
                },
                px: { xs: 3, sm: 4 }, // Responsive padding
                py: { xs: 1, sm: 1.2 }, // Responsive padding
                fontSize: { xs: '0.9rem', sm: '1rem' } // Responsive font size
              }}
            >
              View All Events
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Projects Section Preview */}
      <Box py={{ xs: 5, sm: 6, md: 8 }} sx={{ backgroundColor: '#F5F5F5' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h2" 
            className="text-fade-in-up" 
            style={{ animationDelay: '0.1s' }} 
            align="center" 
            gutterBottom 
            sx={{ 
              color: '#01234B', 
              fontWeight: 600, 
              mb: 4, // Reduced margin
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } // Responsive font size
            }}
          >
            Our Projects
          </Typography>
          {loading ? (
            <Box textAlign="center" py={{ xs: 3, sm: 4 }}><CircularProgress sx={{ color: '#D4AF37' }} /></Box>
          ) : (
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}> {/* Responsive spacing */}
              {displayProjects.map((project, index) => (
                <Grid item xs={12} sm={6} md={4} key={project._id}> {/* Responsive grid columns */}
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 2,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    position: 'relative',
                    '&:hover': { 
                      transform: { xs: 'none', sm: 'translateY(-8px)' } // No hover effect on mobile
                    }
                  }}>
                    { !project.isStatic && (
                      <Chip 
                        label="NEW" 
                        color="error" 
                        size="small" 
                        sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10, fontWeight: 'bold' }} 
                      />
                    )}
                    <CardMedia
                      component="img"
                      height={{ xs: '160', sm: '180', md: '200' }} // Responsive heights
                      image={project.image || '/images/placeholder-project.jpg'}
                      alt={project.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Chip 
                        label={project.category} 
                        size="small" 
                        sx={{ 
                          mb: 1, 
                          backgroundColor: '#01234B', 
                          color: 'white',
                          fontSize: { xs: '0.7rem', sm: '0.8rem' } // Responsive font size
                        }} 
                      />
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h3" 
                        sx={{ 
                          color: '#01234B', 
                          fontWeight: 600,
                          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } // Responsive font size
                        }}
                      >
                        {project.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#4A4A4A',
                          fontSize: { xs: '0.8rem', sm: '0.85rem' } // Responsive font size
                        }}
                      >
                        {project.description?.substring(0, 100)}...
                      </Typography>
                    </CardContent>
                    <Box p={{ xs: 1.5, sm: 2 }} pt={0}>
                      <Button 
                        component={Link} 
                        to="/projects" 
                        fullWidth 
                        variant="outlined" 
                        sx={{ 
                          color: '#01234B', 
                          borderColor: '#01234B',
                          fontSize: { xs: '0.8rem', sm: '0.9rem' } // Responsive font size
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <Box textAlign="center" mt={{ xs: 4, sm: 6 }}>
            <Button 
              className="text-fade-in-up"
              style={{ animationDelay: '0.5s' }}
              component={Link} 
              to="/projects" 
              variant="contained" 
              size="large"
              sx={{ 
                backgroundColor: '#D4AF37', 
                color: '#01234B',
                px: { xs: 3, sm: 4 }, // Responsive padding
                py: { xs: 1, sm: 1.2 }, // Responsive padding
                '&:hover': {
                  backgroundColor: '#b8972d',
                },
                fontSize: { xs: '0.9rem', sm: '1rem' } // Responsive font size
              }}
            >
              View All Projects
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default HomePage;