import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Paper, Card, CardContent, CardMedia, CardActions, Button, CircularProgress, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { projectService } from '../services/apiService';
import { STATIC_PROJECTS } from '../constants/staticData';

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

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAll().catch(() => []);
        setProjects([...data, ...STATIC_PROJECTS]);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(STATIC_PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <Box 
        sx={{ 
          height: '40vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(rgba(1, 35, 75, 0.8), rgba(1, 35, 75, 0.8)), url(/images/LeeImage_153.jpg) center/cover no-repeat',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} gutterBottom sx={{ fontWeight: 700 }}>
            Our Projects
          </Typography>
          <Typography variant="h5" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} sx={{ maxWidth: '800px', mx: 'auto', color: '#D4AF37' }}>
            Empowering communities through diverse creative initiatives
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8, background: 'linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(/images/LeeImage_107.jpg) center/cover', borderRadius: 2, p: 3 }}>
        <Typography variant="h3" component="h2" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} align="center" gutterBottom sx={{ color: '#01234B', fontWeight: 600, mb: 8 }}>
          Current Projects
        </Typography>
        
        {loading ? (
          <Box textAlign="center" py={4}><CircularProgress sx={{ color: '#D4AF37' }} /></Box>
        ) : (
          <Grid container spacing={6}>
            {projects.map((project) => (
              <Grid item xs={12} md={6} lg={4} key={project._id || project.id}>
                <StyledCard sx={{ position: 'relative' }}>
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
                    image={project.image}
                    alt={project.title}
                    sx={{
                      height: { xs: 200, sm: 250 },
                      objectFit: 'cover'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="overline" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} gutterBottom sx={{ color: '#D4AF37', fontWeight: 600, display: 'inline-block', pb: 1 }}>
                      {project.category}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h3" className="text-fade-in-up" style={{ animationDelay: '0.3s' }} sx={{ color: '#01234B', fontWeight: 600 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" className="text-fade-in-up" style={{ animationDelay: '0.4s' }} sx={{ color: '#4A4A4A', lineHeight: 1.6 }}>
                      {project.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', padding: 2 }}>
                    <Button 
                      size="small" 
                      className="text-fade-in-up"
                      style={{ animationDelay: '0.5s' }}
                      component={Link} 
                      to={`/projects/${project._id || project.id}`}
                      sx={{ 
                        color: '#01234B',
                        borderColor: '#01234B',
                        '&:hover': {
                          backgroundColor: '#01234B',
                          color: 'white',
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Project Categories */}
        <Box sx={{ mt: 10 }}>
          <Typography variant="h3" component="h2" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} align="center" gutterBottom sx={{ color: '#01234B', fontWeight: 600, mb: 6 }}>
            Project Categories
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {['Performing Arts', 'Education', 'Cultural Events', 'Heritage', 'Entrepreneurship', 'Inclusion'].map((category, index) => (
              <Grid item key={index}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    px: 3, 
                    py: 1.5, 
                    borderRadius: 20,
                    backgroundColor: index % 2 === 0 ? '#01234B' : '#D4AF37',
                    color: index % 2 === 0 ? 'white' : '#01234B',
                  }}
                >
                  <Typography variant="body1" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} sx={{ fontWeight: 500 }}>
                    {category}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default ProjectsPage;
