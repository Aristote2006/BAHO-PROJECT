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
    transform: { xs: 'none', sm: 'translateY(-15px)' }, // No hover effect on mobile
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
  height: { xs: 180, sm: 200, md: 250 }, // Responsive heights
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
          height: { xs: '35vh', sm: '40vh' }, // Responsive height
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
              mb: { xs: 1, sm: 2 }, // Reduced margin on mobile
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3rem' } // Responsive font size
            }}
          >
            Upcoming Events
          </Typography>
          <Typography 
            variant="h5" 
            className="text-fade-in-up" 
            style={{ animationDelay: '0.2s' }} 
            sx={{ 
              maxWidth: { xs: '95%', sm: '80%', md: '800px' }, // Responsive max-width
              mx: 'auto', 
              color: '#D4AF37',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' } // Responsive font size
            }}
          >
            Experience the vibrant culture and creativity of Africa through our exciting events
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 }, background: 'linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(/images/JKP_2680.JPG) center/cover', borderRadius: 2, p: { xs: 2, sm: 3 } }}>
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
            mb: { xs: 4, sm: 6, md: 8 }, // Responsive margin
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } // Responsive font size
          }}
        >
          Featured Events
        </Typography>

        {error && (
          <Box sx={{ textAlign: 'center', py: { xs: 3, sm: 4 } }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'error.main',
                fontSize: { xs: '1rem', sm: '1.2rem' } // Responsive font size
              }}
            >
              Error loading events: {error}
            </Typography>
          </Box>
        )}

        {!error && (
          <Grid container spacing={{ xs: 3, sm: 4, md: 6 }}> {/* Responsive spacing */}
            {events.filter(event => event.featured).length > 0 ? (
              events.filter(event => event.featured).map((event, index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={event._id}> {/* Responsive grid - 1 column on xs, 2 on sm, 2 on md, 3 on lg */}
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
                      pt: 2, // Reduced padding on mobile
                      pb: 2, // Reduced padding on mobile
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: { xs: 180, sm: 200 }, // Responsive min-height
                      zIndex: 2
                    }}>
                      <Chip
                        label={event.category}
                        sx={{ 
                          backgroundColor: '#D4AF37', 
                          color: '#01234B',
                          fontWeight: 600,
                          mb: 1, // Reduced margin on mobile
                          alignSelf: 'flex-start',
                          fontSize: { xs: '0.7rem', sm: '0.8rem' } // Responsive font size
                        }}
                      />
                      
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        sx={{ 
                          color: '#01234B', 
                          fontWeight: 700,
                          mb: 1, // Reduced margin on mobile
                          lineHeight: 1.3,
                          flex: 1,
                          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } // Responsive font size
                        }}
                      >
                        {event.title}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}> {/* Reduced margin */}
                        <CalendarToday sx={{ fontSize: '0.9rem', color: '#D4AF37' }} />
                        <Typography variant="body2" sx={{ color: '#4A4A4A', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                          {formatDate(event.scope.startDate)}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}> {/* Reduced margin */}
                        <AccessTime sx={{ fontSize: '0.9rem', color: '#D4AF37' }} />
                        <Typography variant="body2" sx={{ color: '#4A4A4A', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                          {event.time}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}> {/* Reduced margin */}
                        <LocationOn sx={{ fontSize: '0.9rem', color: '#D4AF37' }} />
                        <Typography variant="body2" sx={{ color: '#4A4A4A', fontSize: { xs: '0.7rem', sm: '0.8rem' }, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {event.location}
                        </Typography>
                      </Box>
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#4A4A4A', 
                          lineHeight: 1.4, // Slightly reduced for mobile
                          flex: 1,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          fontSize: { xs: '0.7rem', sm: '0.8rem' } // Responsive font size
                        }}
                      >
                        {event.description}
                      </Typography>
                      
                      <Button
                        variant="contained"
                        sx={{ 
                          mt: 1, // Reduced margin on mobile
                          backgroundColor: '#D4AF37',
                          color: '#01234B',
                          fontWeight: 600,
                          fontSize: { xs: '0.8rem', sm: '0.9rem' }, // Responsive font size
                          py: { xs: 0.8, sm: 1 }, // Responsive padding
                          px: { xs: 1.5, sm: 2 }, // Responsive padding
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
                <Box sx={{ textAlign: 'center', py: { xs: 3, sm: 4 } }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#01234B',
                      fontSize: { xs: '1rem', sm: '1.2rem' } // Responsive font size
                    }}
                  >
                    No featured events available at the moment. Check back soon!
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}

        {/* Past Events Section */}
        <Box sx={{ mt: { xs: 8, sm: 10, md: 12 } }}> {/* Responsive margin */}
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
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } // Responsive font size
            }}
          >
            Other Events
          </Typography>
          
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}> {/* Responsive spacing */}
            {events.filter(event => !event.featured).length > 0 ? (
              events.filter(event => !event.featured).map((event) => (
                <Grid item xs={12} sm={6} key={event._id}> {/* Responsive grid - 1 column on xs, 2 on sm+ */}
                  <Card 
                    sx={{ 
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: { xs: 'none', sm: 'translateX(10px)' }, // No hover effect on mobile
                      }
                    }}
                  >
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, p: { xs: 1, sm: 2 } }}> {/* Responsive padding and gap */}
                      <Box sx={{ flex: 1 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            color: '#01234B', 
                            fontWeight: 600, 
                            mb: 0.5, // Reduced margin
                            fontSize: { xs: '0.9rem', sm: '1rem' } // Responsive font size
                          }}
                        >
                          {event.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#4A4A4A', 
                            mb: 0.5, // Reduced margin
                            fontSize: { xs: '0.7rem', sm: '0.8rem' } // Responsive font size
                          }}
                        >
                          {formatDate(event.scope.startDate)} • {event.location}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#666', 
                            fontSize: { xs: '0.65rem', sm: '0.75rem' }, // Responsive font size
                            display: { xs: '-webkit-box', sm: 'block' }, // Line clamping on mobile
                            WebkitLineClamp: { xs: 2, sm: 1 },
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {event.description.substring(0, 100)}...
                        </Typography>
                      </Box>
                      <Chip
                        label="View Details"
                        sx={{ 
                          backgroundColor: '#01234B', 
                          color: '#D4AF37',
                          fontWeight: 600,
                          fontSize: { xs: '0.6rem', sm: '0.7rem' } // Responsive font size
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: { xs: 3, sm: 4 } }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#01234B',
                      fontSize: { xs: '1rem', sm: '1.2rem' } // Responsive font size
                    }}
                  >
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