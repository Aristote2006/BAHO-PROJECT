import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Chip,
  Divider
} from '@mui/material';
import { ArrowBack, CalendarToday, LocationOn, AccessTime } from '@mui/icons-material';
import { eventService } from '../services/apiService';
import { STATIC_EVENTS } from '../constants/staticData';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        
        // First try to fetch from API
        if (id && id !== 'undefined') {
          try {
            const eventData = await eventService.get(id);
            if (eventData && eventData._id) {
              setEvent(eventData);
              setLoading(false);
              return;
            }
          } catch (apiError) {
            console.log('Event not found in API, checking static events...');
          }
        }
        
        // Check in static events
        const staticEvent = STATIC_EVENTS.find(e => e._id === id || e.id === id);
        if (staticEvent) {
          setEvent(staticEvent);
        } else {
          setError('Event not found');
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

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

  if (error || !event) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="md">
          <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h5" sx={{ color: '#01234B', mb: 2 }}>
              {error || 'Event not found'}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/events')}
              sx={{ backgroundColor: '#D4AF37', color: '#01234B' }}
            >
              Back to Events
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <div>
      {/* Back Button */}
      <Box sx={{ backgroundColor: '#01234B', color: 'white', py: 2 }}>
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/events')}
            sx={{ color: '#D4AF37', '&:hover': { color: 'white' } }}
          >
            Back to Events
          </Button>
        </Container>
      </Box>

      {/* Event Details */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
        <Grid container spacing={{ xs: 2, sm: 4 }}>
          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: '100%',
                height: { xs: '300px', sm: '400px', md: '500px' },
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                backgroundColor: '#f0f0f0'
              }}
            >
              <img
                src={event.image || '/images/placeholder-event.jpg'}
                alt={event.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>
          </Grid>

          {/* Details Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Category Chip */}
              <Box>
                <Chip
                  label={event.category || 'Event'}
                  sx={{
                    backgroundColor: '#D4AF37',
                    color: '#01234B',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    height: 'auto',
                    padding: '8px 12px'
                  }}
                />
              </Box>

              {/* Title */}
              <Typography
                variant="h3"
                sx={{
                  color: '#01234B',
                  fontWeight: 700,
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
                }}
              >
                {event.title}
              </Typography>

              <Divider sx={{ borderColor: '#D4AF37', my: 1 }} />

              {/* Date */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <CalendarToday sx={{ color: '#D4AF37', mt: 0.5, flexShrink: 0 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                    Date
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#01234B', fontWeight: 600 }}>
                    {formatDate(event.scope?.startDate || event.date)}
                  </Typography>
                  {event.scope?.endDate && event.scope.endDate !== event.scope.startDate && (
                    <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                      to {formatDate(event.scope.endDate)}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Time */}
              {event.time && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <AccessTime sx={{ color: '#D4AF37', mt: 0.5, flexShrink: 0 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                      Time
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#01234B', fontWeight: 600 }}>
                      {event.time}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Location */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <LocationOn sx={{ color: '#D4AF37', mt: 0.5, flexShrink: 0 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                    Location
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#01234B', fontWeight: 600 }}>
                    {event.location}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ borderColor: '#D4AF37', my: 1 }} />

              {/* Description */}
              <Box>
                <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8 }}>
                  {event.description}
                </Typography>
              </Box>

              {/* Action Button */}
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#D4AF37',
                    color: '#01234B',
                    fontWeight: 600,
                    px: 4,
                    '&:hover': {
                      backgroundColor: '#b8972d'
                    }
                  }}
                >
                  Register for Event
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Full Description Section */}
        {event.fullDescription && (
          <Box sx={{ mt: { xs: 4, sm: 6, md: 8 } }}>
            <Typography
              variant="h4"
              sx={{
                color: '#01234B',
                fontWeight: 600,
                mb: 2
              }}
            >
              About This Event
            </Typography>
            <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, backgroundColor: '#f9f9f9' }}>
              <Typography
                variant="body1"
                sx={{
                  color: '#333',
                  lineHeight: 1.8,
                  fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' }
                }}
              >
                {event.fullDescription}
              </Typography>
            </Paper>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default EventDetailPage;
