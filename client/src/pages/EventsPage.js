import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia, Button, Chip, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CalendarToday, LocationOn, AccessTime } from '@mui/icons-material';
import { eventService } from '../services/apiService';
import { STATIC_EVENTS } from '../constants/staticData';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
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
    '& .event-image': {
      transform: 'scale(1.1)',
    },
    '& .card-overlay': {
      opacity: 1,
    }
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 200,
  [theme.breakpoints.up('sm')]: {
    height: 250,
  },
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '24px 24px 0 0',
}));

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await eventService.getAll().catch(() => []);
      setEvents([...eventsData, ...STATIC_EVENTS]);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching events:', err);
      setEvents(STATIC_EVENTS);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: '#D4AF37' }} />
      </Box>
    );
  }

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
          <Typography 
            variant="h2" 
            component="h1" 
            className="text-fade-in-up" 
            style={{ animationDelay: '0.1s' }} 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              mb: 2
            }}
          >
            Upcoming Events
          </Typography>
          <Typography 
            variant="h5" 
            className="text-fade-in-up" 
            style={{ animationDelay: '0.2s' }} 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto', 
              color: '#D4AF37',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            Experience the vibrant culture and creativity of Africa through our exciting events
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8, background: 'linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(/images/JKP_2680.JPG) center/cover', borderRadius: 2, p: 3 }}>
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
            mb: 8,
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          Featured Events
        </Typography>

        {error && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ color: 'error.main' }}>
              Error loading events: {error}
            </Typography>
          </Box>
        )}

        {!error && (
          <Grid container spacing={6}>
            {events.filter(event => event.featured).length > 0 ? (
              events.filter(event => event.featured).map((event, index) => (
                <Grid item xs={12} md={6} lg={4} key={event._id}>
                  <StyledCard sx={{ position: 'relative' }}>
                    { !event.isStatic && (
                      <Chip 
                        label="NEW" 
                        color="error" 
                        size="small" 
                        sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10, fontWeight: 'bold' }} 
                      />
                    )}
                    <ImageContainer>
                      <CardMedia
                        component="img"
                        image={event.image || '/images/placeholder-event.jpg'}
                        alt={event.title}
                        className="event-image"
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
                      minHeight: 200,
                      zIndex: 2
                    }}>
                      <Chip
                        label={event.category}
                        sx={{ 
                          backgroundColor: '#D4AF37', 
                          color: '#01234B',
                          fontWeight: 600,
                          mb: 2,
                          alignSelf: 'flex-start'
                        }}
                      />
                      
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        sx={{ 
                          color: '#01234B', 
                          fontWeight: 700,
                          mb: 2,
                          lineHeight: 1.3,
                          flex: 1
                        }}
                      >
                        {event.title}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CalendarToday sx={{ fontSize: '1rem', color: '#D4AF37' }} />
                        <Typography variant="body2" sx={{ color: '#4A4A4A', fontSize: '0.85rem' }}>
                          {formatDate(event.scope.startDate)}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <AccessTime sx={{ fontSize: '1rem', color: '#D4AF37' }} />
                        <Typography variant="body2" sx={{ color: '#4A4A4A', fontSize: '0.85rem' }}>
                          {event.time}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <LocationOn sx={{ fontSize: '1rem', color: '#D4AF37' }} />
                        <Typography variant="body2" sx={{ color: '#4A4A4A', fontSize: '0.85rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {event.location}
                        </Typography>
                      </Box>
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#4A4A4A', 
                          lineHeight: 1.5,
                          flex: 1,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {event.description}
                      </Typography>
                      
                      <Button
                        variant="contained"
                        sx={{ 
                          mt: 2,
                          backgroundColor: '#D4AF37',
                          color: '#01234B',
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: '#b8972d',
                          }
                        }}
                      >
                        Register Now
                      </Button>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" sx={{ color: '#01234B' }}>
                    No featured events available at the moment. Check back soon!
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}

        {/* Past Events Section */}
        <Box sx={{ mt: 12 }}>
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
              mb: 8,
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Other Events
          </Typography>
          
          <Grid container spacing={4}>
            {events.filter(event => !event.featured).length > 0 ? (
              events.filter(event => !event.featured).map((event) => (
                <Grid item xs={12} md={6} key={event._id}>
                  <Card 
                    sx={{ 
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(10px)',
                      }
                    }}
                  >
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ color: '#01234B', fontWeight: 600, mb: 1 }}>
                          {event.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#4A4A4A', mb: 1 }}>
                          {formatDate(event.scope.startDate)} • {event.location}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                          {event.description.substring(0, 100)}...
                        </Typography>
                      </Box>
                      <Chip
                        label="View Details"
                        sx={{ 
                          backgroundColor: '#01234B', 
                          color: '#D4AF37',
                          fontWeight: 600,
                          fontSize: '0.7rem'
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" sx={{ color: '#01234B' }}>
                    No other events available at the moment.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default EventsPage;