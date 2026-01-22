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
    transform: { xs: 'none', sm: 'translateY(-5px)' }, // No hover effect on mobile
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
          height: { xs: '35vh', sm: '40vh' }, // Responsive height
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(rgba(1, 35, 75, 0.8), rgba(1, 35, 75, 0.8)), url(/images/LeeImage_153.jpg) center/cover no-repeat',
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
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } // Responsive font size
            }}
          >
            Our Projects
          </Typography>
          <Typography 
            variant="h5" 
            className="text-fade-in-up" 
            style={{ animationDelay: '0.2s' }} 
            sx={{ 
              maxWidth: { xs: '95%', sm: '80%', md: '800px' }, // Responsive max-width
              mx: 'auto', 
              color: '#D4AF37',
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' } // Responsive font size
            }}
          >
            Empowering communities through diverse creative initiatives
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 }, background: 'linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(/images/LeeImage_107.jpg) center/cover', borderRadius: 2, p: { xs: 2, sm: 3 } }}>
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
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } // Responsive font size
          }}
        >
          Current Projects
        </Typography>
        
        {loading ? (
          <Box textAlign="center" py={{ xs: 3, sm: 4 }}><CircularProgress sx={{ color: '#D4AF37' }} /></Box>
        ) : (
          <Grid container spacing={{ xs: 3, sm: 4, md: 6 }}> {/* Responsive spacing */}
            {projects.map((project) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={project._id || project.id}> {/* Responsive grid - 1 column on xs, 2 on sm, 2 on md, 3 on lg */}
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
                      height: { xs: 160, sm: 200, md: 250 }, // Responsive heights
                      objectFit: 'cover'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="overline" 
                      className="text-fade-in-up" 
                      style={{ animationDelay: '0.2s' }} 
                      gutterBottom 
                      sx={{ 
                        color: '#D4AF37', 
                        fontWeight: 600, 
                        display: 'inline-block', 
                        pb: 1,
                        fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } // Responsive font size
                      }}
                    >
                      {project.category}
                    </Typography>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="h3" 
                      className="text-fade-in-up" 
                      style={{ animationDelay: '0.3s' }} 
                      sx={{ 
                        color: '#01234B', 
                        fontWeight: 600,
                        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.3rem' } // Responsive font size
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      className="text-fade-in-up" 
                      style={{ animationDelay: '0.4s' }} 
                      sx={{ 
                        color: '#4A4A4A', 
                        lineHeight: 1.6,
                        fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' } // Responsive font size
                      }}
                    >
                      {project.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', padding: { xs: 1, sm: 2 } }}> {/* Responsive padding */}
                    <Button 
                      size="small" 
                      className="text-fade-in-up"
                      style={{ animationDelay: '0.5s' }}
                      component={Link} 
                      to={`/projects/${project._id || project.id}`}
                      sx={{ 
                        color: '#01234B',
                        borderColor: '#01234B',
                        fontSize: { xs: '0.8rem', sm: '0.9rem' }, // Responsive font size
                        px: { xs: 1, sm: 2 }, // Responsive padding
                        py: { xs: 0.5, sm: 0.7 }, // Responsive padding
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
        <Box sx={{ mt: { xs: 6, sm: 8, md: 10 } }}> {/* Responsive margin */}
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
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } // Responsive font size
            }}
          >
            Project Categories
          </Typography>
          <Grid 
            container 
            spacing={{ xs: 1.5, sm: 2, md: 3 }} // Responsive spacing
            justifyContent="center" 
            sx={{ flexWrap: 'wrap' }} // Allow wrapping on small screens
          >
            {['Performing Arts', 'Education', 'Cultural Events', 'Heritage', 'Entrepreneurship', 'Inclusion'].map((category, index) => (
              <Grid item key={index} sx={{ mb: 1 }}> {/* Add margin bottom for vertical spacing */}
                <Paper 
                  elevation={2} 
                  sx={{ 
                    px: { xs: 2, sm: 3 }, // Responsive padding
                    py: { xs: 1, sm: 1.5 }, // Responsive padding
                    borderRadius: 20,
                    backgroundColor: index % 2 === 0 ? '#01234B' : '#D4AF37',
                    color: index % 2 === 0 ? 'white' : '#01234B',
                    minWidth: { xs: '120px', sm: '140px' }, // Responsive min width
                  }}
                >
                  <Typography 
                    variant="body1" 
                    className="text-fade-in-up" 
                    style={{ animationDelay: '0.2s' }} 
                    sx={{ 
                      fontWeight: 500,
                      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } // Responsive font size
                    }}
                  >
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