// To add local images:
// 1. Place images in /public/images/ for direct access (use as '/images/filename.jpg')
// 2. Place images in /src/assets/images/ to import (import image from '../assets/images/filename.jpg')
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Grid, Paper, Slide, Card, CardContent, CardMedia, Chip, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { ArrowForward, CalendarToday, LocationOn, AccessTime } from '@mui/icons-material';
import { eventService, projectService } from '../services/apiService';

const HeroSection = styled(Box)(({ theme }) => ({
  height: '70vh',
  [theme.breakpoints.up('md')]: {
    height: '90vh',
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
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

const AnimatedText = styled('span')(({ theme }) => ({
  display: 'inline-block',
  animation: 'bounce 2s infinite',
  color: '#D4AF37',
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
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

const STATIC_PROJECTS = [
  {
    _id: 'static-p1',
    title: "Baho Performing Arts",
    description: "Showcasing African performing arts through theater, dance, and music performances.",
    image: "/images/JKP_2677.JPG",
    category: "Performing Arts",
    isStatic: true
  },
  {
    _id: 'static-p2',
    title: "Talent Gear Program",
    description: "A comprehensive talent development program for emerging artists and creatives.",
    image: "/images/Baho-Night-1-_8.JPG",
    category: "Education",
    isStatic: true
  },
  {
    _id: 'static-p3',
    title: "Baho Events",
    description: "Organizing cultural events, festivals, and exhibitions to promote African arts and culture.",
    image: "/images/JKP_2692.JPG",
    category: "Cultural Events",
    isStatic: true
  }
];

const STATIC_EVENTS = [
  {
    _id: 'static-e1',
    title: "Annual Cultural Festival",
    description: "Join us for our biggest celebration of the year featuring traditional music, dance, and art from across Africa.",
    scope: { startDate: "2024-03-15" },
    location: "Kigali Convention Center",
    category: "Festival",
    image: "/images/BAHO(55).jpg",
    isStatic: true
  },
  {
    _id: 'static-e2',
    title: "Youth Art Exhibition",
    description: "Showcasing talented young artists from Rwanda and neighboring countries.",
    scope: { startDate: "2024-03-22" },
    location: "National Gallery",
    category: "Exhibition",
    image: "/images/LeeImage_100.jpg",
    isStatic: true
  },
  {
    _id: 'static-e3',
    title: "Music Workshop Series",
    description: "Learn from renowned African musicians and producers in this intensive workshop series.",
    scope: { startDate: "2024-04-05" },
    location: "BAHO Creative Hub",
    category: "Workshop",
    image: "/images/JKP_2677.JPG",
    isStatic: true
  }
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayEvents, setDisplayEvents] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const heroImages = [
    '/images/Baho-Night-1-_6.JPG',
    '/images/Baho-Night-1-_3.JPG',
    '/images/LeeImage_140.jpg',
    '/images/WhatsApp Image 2025-02-25 at 10.37.04 PM (1).jpeg',
    '/images/LeeImage_120.jpg'
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
    }, 6000); // Reset to 6000ms for optimal smooth fade transitions
    
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
          <Box py={5}>
            <Box 
              className="text-fade-in-up"
              sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mb: 4,
                gap: 2
              }}
            >
              <Box 
                sx={{ 
                  transform: 'scale(1.2)',
                  display: 'flex',
                  alignItems: 'center',
                  filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))'
                }}
              >
                <img 
                  src="/images/BAHO_BRAND_yellow.png" 
                  alt="BAHO AFRICA Logo" 
                  style={{ height: '100px', width: 'auto' }}
                />
              </Box>

              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  fontWeight: 800, 
                  textShadow: '3px 3px 6px rgba(0,0,0,0.6)',
                  fontFamily: '"Bookman Old Style", "Bookman", serif',
                  letterSpacing: '4px',
                  color: 'white',
                  lineHeight: 1
                }}
              >
                AFRICA
              </Typography>
            </Box>

            <Typography variant="h3" component="h2" gutterBottom className="text-fade-in-up" style={{ animationDelay: '0.3s' }} sx={{ fontWeight: 500, mb: 4, maxWidth: '800px', mx: 'auto', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Empowering <AnimatedText className="text-pulse">Talent</AnimatedText>, Inspiring <AnimatedText className="text-pulse">Africa</AnimatedText>
            </Typography>
            <Typography variant="h5" className="text-fade-in-up" style={{ animationDelay: '0.6s' }} sx={{ mb: 4, maxWidth: '800px', mx: 'auto', color: '#D4AF37', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Creative and Culture Hub based in Rwanda, empowering youth, artists, refugees, women, and creatives with disabilities through arts, innovation, culture, entrepreneurship, and education.
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                component={Link} 
                to="/about" 
                variant="contained" 
                size="large" 
                sx={{ 
                  backgroundColor: '#D4AF37', 
                  color: '#01234B',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
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
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
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
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
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
      <Box py={8} sx={{ backgroundColor: '#F5F5F5' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h2" className="text-slide-in-left" style={{ animationDelay: '0.1s' }} gutterBottom sx={{ color: '#01234B', fontWeight: 600 }}>
                About BAHO AFRICA
              </Typography>
              <Typography variant="h5" className="text-slide-in-left" style={{ animationDelay: '0.2s' }} sx={{ color: '#4A4A4A', mb: 3 }}>
                Empowering communities through creativity and innovation
              </Typography>
              <Typography variant="body1" className="text-slide-in-left" style={{ animationDelay: '0.3s' }} paragraph sx={{ color: '#4A4A4A', lineHeight: 1.8 }}>
                BAHO AFRICA is a Creative and Culture Hub based in Rwanda, dedicated to empowering youth, artists, refugees, women, and creatives with disabilities. Through arts, innovation, culture, entrepreneurship, and education, we foster an environment where talent can flourish and contribute to the development of our communities.
              </Typography>
              <Typography variant="body1" className="text-slide-in-left" style={{ animationDelay: '0.4s' }} paragraph sx={{ color: '#4A4A4A', lineHeight: 1.8 }}>
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
                  mt: 2,
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
                  height: { xs: '250px', sm: '350px', md: '400px' }, 
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
      <Box py={8}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} align="center" gutterBottom sx={{ color: '#01234B', fontWeight: 600, mb: 6 }}>
            What We Do
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Box 
                  component="img" 
                  className="text-fade-in-up"
                  style={{ animationDelay: '0.2s' }}
                  src="/images/LeeImage_35.jpg" // Using your local image
                  alt="Creative & Performing Arts" 
                  sx={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 2, mb: 2 }}
                />
                <Typography variant="h5" component="h3" className="text-fade-in-up" style={{ animationDelay: '0.3s' }} gutterBottom sx={{ color: '#01234B', fontWeight: 600 }}>
                  Creative & Performing Arts
                </Typography>
                <Typography variant="body1" className="text-fade-in-up" style={{ animationDelay: '0.4s' }} sx={{ color: '#4A4A4A' }}>
                  We provide platforms for artists to showcase their talents through performances, exhibitions, and cultural events.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Box 
                  component="img" 
                  className="text-fade-in-up"
                  style={{ animationDelay: '0.2s' }}
                  src="/images/LeeImage_65.jpg" // Using your local image
                  alt="Cultural Heritage & Innovation" 
                  sx={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 2, mb: 2 }}
                />
                <Typography variant="h5" component="h3" className="text-fade-in-up" style={{ animationDelay: '0.3s' }} gutterBottom sx={{ color: '#01234B', fontWeight: 600 }}>
                  Cultural Heritage & Innovation
                </Typography>
                <Typography variant="body1" className="text-fade-in-up" style={{ animationDelay: '0.4s' }} sx={{ color: '#4A4A4A' }}>
                  We preserve and promote African cultural heritage while fostering innovation in traditional arts and crafts.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Box 
                  component="img" 
                  className="text-fade-in-up"
                  style={{ animationDelay: '0.2s' }}
                  src="/images/LeeImage_95.jpg" // Using your local image
                  alt="Education & Capacity Building" 
                  sx={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 2, mb: 2 }}
                />
                <Typography variant="h5" component="h3" className="text-fade-in-up" style={{ animationDelay: '0.3s' }} gutterBottom sx={{ color: '#01234B', fontWeight: 600 }}>
                  Education & Capacity Building
                </Typography>
                <Typography variant="body1" className="text-fade-in-up" style={{ animationDelay: '0.4s' }} sx={{ color: '#4A4A4A' }}>
                  We offer training programs and workshops to enhance skills in various creative fields and entrepreneurship.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Events Section Preview */}
      <Box py={8}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} align="center" gutterBottom sx={{ color: '#01234B', fontWeight: 600, mb: 6 }}>
            Upcoming Events
          </Typography>
          {loading ? (
            <Box textAlign="center" py={4}><CircularProgress sx={{ color: '#D4AF37' }} /></Box>
          ) : (
            <Grid container spacing={4}>
              {displayEvents.map((event, index) => (
                <Grid item xs={12} md={4} key={event._id}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 2,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    position: 'relative',
                    '&:hover': { transform: 'translateY(-8px)' }
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
                      height="200"
                      image={event.image || '/images/placeholder-event.jpg'}
                      alt={event.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Chip label={event.category} size="small" sx={{ mb: 1, backgroundColor: '#D4AF37', color: '#01234B', fontWeight: 600 }} />
                      <Typography gutterBottom variant="h5" component="h3" sx={{ color: '#01234B', fontWeight: 600 }}>
                        {event.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#666' }}>
                        <CalendarToday sx={{ fontSize: '1rem' }} />
                        <Typography variant="body2">
                          {event.scope?.startDate ? new Date(event.scope.startDate).toLocaleDateString() : 'Date TBD'}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#4A4A4A' }}>
                        {event.description?.substring(0, 100)}...
                      </Typography>
                    </CardContent>
                    <Box p={2} pt={0}>
                      <Button component={Link} to="/events" fullWidth variant="outlined" sx={{ color: '#01234B', borderColor: '#01234B' }}>
                        Learn More
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <Box textAlign="center" mt={6}>
            <Button component={Link} to="/events" variant="contained" size="large" sx={{ backgroundColor: '#D4AF37', color: '#01234B', '&:hover': { backgroundColor: '#b8972d' } }}>
              View All Events
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Projects Section Preview */}
      <Box py={8} sx={{ backgroundColor: '#F5F5F5' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} align="center" gutterBottom sx={{ color: '#01234B', fontWeight: 600, mb: 6 }}>
            Our Projects
          </Typography>
          {loading ? (
            <Box textAlign="center" py={4}><CircularProgress sx={{ color: '#D4AF37' }} /></Box>
          ) : (
            <Grid container spacing={4}>
              {displayProjects.map((project, index) => (
                <Grid item xs={12} md={4} key={project._id}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 2,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    position: 'relative',
                    '&:hover': { transform: 'translateY(-8px)' }
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
                      height="200"
                      image={project.image || '/images/placeholder-project.jpg'}
                      alt={project.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Chip label={project.category} size="small" sx={{ mb: 1, backgroundColor: '#01234B', color: 'white' }} />
                      <Typography gutterBottom variant="h5" component="h3" sx={{ color: '#01234B', fontWeight: 600 }}>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#4A4A4A' }}>
                        {project.description?.substring(0, 100)}...
                      </Typography>
                    </CardContent>
                    <Box p={2} pt={0}>
                      <Button component={Link} to="/projects" fullWidth variant="outlined" sx={{ color: '#01234B', borderColor: '#01234B' }}>
                        Learn More
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <Box textAlign="center" mt={6}>
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
                px: 4,
                '&:hover': {
                  backgroundColor: '#b8972d',
                }
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
