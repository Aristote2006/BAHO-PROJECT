import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, Button, Chip, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { CalendarToday, People, Work } from '@mui/icons-material';
import { projectService } from '../services/apiService';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 8,
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },
}));

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProject();
  }, [id, fetchProject]);

  const fetchProject = async () => {
    try {
      const projectData = await projectService.getById(id);
      setProject(projectData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching project:', err);
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

  if (error || !project) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" sx={{ color: 'error.main' }}>
          {error || 'Project not found'}
        </Typography>
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
          background: `linear-gradient(rgba(1, 35, 75, 0.8), rgba(1, 35, 75, 0.8)), url(${project.image || '/images/placeholder-project.jpg'}) center/cover no-repeat`,
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} gutterBottom sx={{ fontWeight: 700 }}>
            {project.title}
          </Typography>
          <Typography variant="h5" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} sx={{ maxWidth: '800px', mx: 'auto', color: '#D4AF37' }}>
            {project.category}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              '&:hover': {
                transform: { xs: 'none', sm: 'translateY(-5px)' }, // No hover effect on mobile
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" component="h2" sx={{ color: '#01234B', fontWeight: 600, mb: 3 }}>
                  Project Overview
                </Typography>
                
                <Typography variant="body1" sx={{ color: '#4A4A4A', lineHeight: 1.8, mb: 4 }}>
                  {project.description}
                </Typography>
                
                <Typography variant="h5" component="h3" sx={{ color: '#01234B', fontWeight: 600, mt: 4, mb: 2 }}>
                  Project Details
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CalendarToday sx={{ fontSize: '1rem', color: '#D4AF37' }} />
                      <Typography variant="body2" sx={{ color: '#4A4A4A' }}>
                        Start Date: {formatDate(project.scope.startDate)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CalendarToday sx={{ fontSize: '1rem', color: '#D4AF37' }} />
                      <Typography variant="body2" sx={{ color: '#4A4A4A' }}>
                        End Date: {formatDate(project.scope.endDate)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <People sx={{ fontSize: '1rem', color: '#D4AF37' }} />
                      <Typography variant="body2" sx={{ color: '#4A4A4A' }}>
                        Leader: {project.leader}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Work sx={{ fontSize: '1rem', color: '#D4AF37' }} />
                      <Typography variant="body2" sx={{ color: '#4A4A4A' }}>
                        Status: {project.status || 'Active'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h5" component="h3" sx={{ color: '#01234B', fontWeight: 600, mb: 2 }}>
                    Impact & Goals
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#4A4A4A', lineHeight: 1.8 }}>
                    This project aims to create lasting positive change in the community by focusing on sustainable development and empowerment of local talent. Through innovative approaches and collaborative efforts, we strive to make a meaningful difference.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#01234B', fontWeight: 600, mb: 2 }}>
                    Project Information
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Chip
                      label={project.category}
                      sx={{ 
                        backgroundColor: '#D4AF37', 
                        color: '#01234B',
                        fontWeight: 600,
                        mb: 2
                      }}
                    />
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: '#4A4A4A', mb: 1 }}>
                    <strong>Leader:</strong> {project.leader}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4A4A4A', mb: 1 }}>
                    <strong>Status:</strong> {project.status || 'Active'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4A4A4A', mb: 2 }}>
                    <strong>Duration:</strong> {formatDate(project.scope.startDate)} - {formatDate(project.scope.endDate)}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    sx={{ 
                      backgroundColor: '#D4AF37',
                      color: '#01234B',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: '#b8972d',
                      }
                    }}
                    fullWidth
                  >
                    Get Involved
                  </Button>
                </CardContent>
              </StyledCard>
              
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#01234B', fontWeight: 600, mb: 2 }}>
                    Related Projects
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4A4A4A', mb: 1 }}>
                    Cultural Heritage & Innovation
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4A4A4A', mb: 1 }}>
                    Talent Development Program
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4A4A4A' }}>
                    Community Engagement Initiative
                  </Typography>
                </CardContent>
              </StyledCard>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProjectDetailPage;