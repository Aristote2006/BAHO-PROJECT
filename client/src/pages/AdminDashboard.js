import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Tabs, 
  Tab, 
  AppBar, 
  Toolbar,
  Avatar,
  Chip,
  CircularProgress
} from '@mui/material';
import { 
  Event as EventIcon, 
  Folder as ProjectIcon, 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AddEventModal from '../components/AddEventModal';
import AddProjectModal from '../components/AddProjectModal';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setEvents([
        {
          id: 1,
          name: "BAHO Cultural Festival",
          description: "Annual celebration of African arts and culture",
          date: "2024-12-15",
          time: "18:00",
          location: "Kigali Convention Center",
          link: "https://baho-africa.com/festival"
        },
        {
          id: 2,
          name: "Creative Workshop Series",
          description: "Monthly workshops for local artists",
          date: "2024-11-20",
          time: "14:00",
          location: "BAHO Creative Hub",
          link: "https://baho-africa.com/workshops"
        }
      ]);
      
      setProjects([
        {
          id: 1,
          title: "Community Art Program",
          description: "Empowering local communities through art education",
          scope: "2024-01-01 to 2024-12-31",
          leader: "NDATIMANA FABRICE",
          status: "Active"
        },
        {
          id: 2,
          title: "Digital Heritage Archive",
          description: "Preserving traditional African art digitally",
          scope: "2024-03-01 to 2024-09-30",
          leader: "TERRI MAYHAN",
          status: "Planning"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddEvent = (eventData) => {
    const newEvent = {
      id: events.length + 1,
      ...eventData
    };
    setEvents(prev => [...prev, newEvent]);
    console.log('New event added:', eventData);
  };

  const handleAddProject = (projectData) => {
    const newProject = {
      id: projects.length + 1,
      ...projectData,
      status: 'Active'
    };
    setProjects(prev => [...prev, newProject]);
    console.log('New project added:', projectData);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #01234B 0%, #0a3666 50%, #415A77 100%)',
      color: 'white',
      overflowX: 'hidden'
    }}>
      {/* Header */}
      <AppBar 
        position="sticky" 
        sx={{ 
          background: 'rgba(1, 35, 75, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          top: 0,
          zIndex: 1200
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            minWidth: 0
          }}>
            <DashboardIcon sx={{ fontSize: { xs: 24, sm: 32 }, color: '#D4AF37' }} />
            <Typography 
              variant={{ xs: 'h6', sm: 'h5' }} 
              sx={{ 
                fontWeight: 700, 
                background: 'linear-gradient(45deg, #D4AF37, #F9E79F)', 
                backgroundClip: 'text', 
                WebkitBackgroundClip: 'text', 
                color: 'transparent',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              Admin Dashboard
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1, sm: 3 },
            minWidth: 0
          }}>
            <Chip 
              avatar={<Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>{user?.firstName?.charAt(0)}</Avatar>}
              label={`${user?.firstName} ${user?.lastName}`}
              sx={{ 
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                color: '#D4AF37',
                fontWeight: 600,
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                maxWidth: { xs: 120, sm: 'unset' },
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            />
            <Button 
              variant="outlined" 
              onClick={handleLogout}
              size={window.innerWidth < 600 ? 'small' : 'medium'}
              sx={{ 
                color: '#D4AF37',
                borderColor: '#D4AF37',
                minWidth: { xs: 'auto', sm: 80 },
                padding: { xs: '4px 8px', sm: '6px 16px' },
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                '&:hover': {
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  borderColor: '#F9E79F'
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container 
        maxWidth="xl" 
        sx={{ 
          py: { xs: 2, sm: 4 },
          px: { xs: 1, sm: 3 },
          minHeight: 'calc(100vh - 64px)',
          overflowY: 'auto'
        }}
      >
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(45deg, #0a3666, #415A77)',
              color: 'white',
              height: '100%',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <EventIcon sx={{ fontSize: 48, color: '#D4AF37', mb: 2 }} />
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {events.length}
                </Typography>
                <Typography variant="h6" sx={{ color: '#D4AF37' }}>
                  Total Events
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(45deg, #0a3666, #415A77)',
              color: 'white',
              height: '100%',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <ProjectIcon sx={{ fontSize: 48, color: '#D4AF37', mb: 2 }} />
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {projects.length}
                </Typography>
                <Typography variant="h6" sx={{ color: '#D4AF37' }}>
                  Active Projects
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(45deg, #0a3666, #415A77)',
              color: 'white',
              height: '100%',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <AddIcon sx={{ fontSize: 48, color: '#D4AF37', mb: 2 }} />
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  12
                </Typography>
                <Typography variant="h6" sx={{ color: '#D4AF37' }}>
                  New This Month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(45deg, #0a3666, #415A77)',
              color: 'white',
              height: '100%',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <EditIcon sx={{ fontSize: 48, color: '#D4AF37', mb: 2 }} />
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  8
                </Typography>
                <Typography variant="h6" sx={{ color: '#D4AF37' }}>
                  Pending Updates
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Card sx={{ 
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          border: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          <AppBar 
            position="static" 
            sx={{ 
              background: 'rgba(1, 35, 75, 0.8)',
              borderRadius: '8px 8px 0 0'
            }}
          >
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="secondary"
              sx={{
                '& .MuiTab-root': {
                  color: '#D4AF37',
                  fontWeight: 600
                },
                '& .Mui-selected': {
                  color: '#FFF'
                }
              }}
            >
              <Tab label="Events Management" icon={<EventIcon />} />
              <Tab label="Projects Management" icon={<ProjectIcon />} />
              <Tab label="Recent Activity" icon={<DashboardIcon />} />
            </Tabs>
          </AppBar>

          <Box sx={{ p: 3 }}>
            {activeTab === 0 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h4" sx={{ color: '#D4AF37', fontWeight: 600 }}>
                    Events Management
                  </Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={() => setShowEventModal(true)}
                    sx={{ 
                      background: 'linear-gradient(45deg, #D4AF37, #F9E79F)',
                      color: '#01234B',
                      fontWeight: 600,
                      '&:hover': {
                        background: 'linear-gradient(45deg, #F9E79F, #D4AF37)'
                      }
                    }}
                  >
                    Add New Event
                  </Button>
                </Box>
                
                <Grid container spacing={3}>
                  {events.map(event => (
                    <Grid item xs={12} md={6} key={event.id}>
                      <Card sx={{ 
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 10px 30px rgba(212, 175, 55, 0.2)'
                        }
                      }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600 }}>
                              {event.name}
                            </Typography>
                            <Box>
                              <Button size="small" startIcon={<EditIcon />} sx={{ color: '#D4AF37', mr: 1 }}>
                                Edit
                              </Button>
                              <Button size="small" startIcon={<DeleteIcon />} sx={{ color: '#ff6b6b' }}>
                                Delete
                              </Button>
                            </Box>
                          </Box>
                          
                          <Typography variant="body2" sx={{ mb: 2, color: '#ccc' }}>
                            {event.description}
                          </Typography>
                          
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Typography variant="caption" sx={{ color: '#D4AF37' }}>
                                📅 {event.date}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" sx={{ color: '#D4AF37' }}>
                                ⏰ {event.time}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="caption" sx={{ color: '#D4AF37' }}>
                                📍 {event.location}
                              </Typography>
                            </Grid>
                          </Grid>
                          
                          {event.link && (
                            <Button 
                              href={event.link}
                              target="_blank"
                              size="small"
                              sx={{ 
                                mt: 2,
                                color: '#D4AF37',
                                borderColor: '#D4AF37',
                                '&:hover': {
                                  backgroundColor: 'rgba(212, 175, 55, 0.1)'
                                }
                              }}
                              variant="outlined"
                            >
                              View Event Details
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h4" sx={{ color: '#D4AF37', fontWeight: 600 }}>
                    Projects Management
                  </Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={() => setShowProjectModal(true)}
                    sx={{ 
                      background: 'linear-gradient(45deg, #D4AF37, #F9E79F)',
                      color: '#01234B',
                      fontWeight: 600,
                      '&:hover': {
                        background: 'linear-gradient(45deg, #F9E79F, #D4AF37)'
                      }
                    }}
                  >
                    Add New Project
                  </Button>
                </Box>
                
                <Grid container spacing={3}>
                  {projects.map(project => (
                    <Grid item xs={12} md={6} key={project.id}>
                      <Card sx={{ 
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 10px 30px rgba(212, 175, 55, 0.2)'
                        }
                      }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600 }}>
                              {project.title}
                            </Typography>
                            <Box>
                              <Button size="small" startIcon={<EditIcon />} sx={{ color: '#D4AF37', mr: 1 }}>
                                Edit
                              </Button>
                              <Button size="small" startIcon={<DeleteIcon />} sx={{ color: '#ff6b6b' }}>
                                Delete
                              </Button>
                            </Box>
                          </Box>
                          
                          <Typography variant="body2" sx={{ mb: 2, color: '#ccc' }}>
                            {project.description}
                          </Typography>
                          
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <Typography variant="caption" sx={{ color: '#D4AF37' }}>
                                📅 Scope: {project.scope}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="caption" sx={{ color: '#D4AF37' }}>
                                👤 Leader: {project.leader}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Chip 
                                label={project.status}
                                size="small"
                                sx={{ 
                                  backgroundColor: project.status === 'Active' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                                  color: project.status === 'Active' ? '#4caf50' : '#ff9800'
                                }}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Typography variant="h4" sx={{ color: '#D4AF37', fontWeight: 600, mb: 3 }}>
                  Recent Activity
                </Typography>
                
                <Card sx={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}>
                  <CardContent>
                    <Typography variant="body1" sx={{ color: '#ccc' }}>
                      • New event "BAHO Cultural Festival" added - 2 hours ago
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#ccc', mt: 1 }}>
                      • Project "Community Art Program" updated - 1 day ago
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#ccc', mt: 1 }}>
                      • User NDATIMANA FABRICE logged in - 3 days ago
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#ccc', mt: 1 }}>
                      • New project "Digital Heritage Archive" created - 1 week ago
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Box>
        </Card>
      </Container>
      
      {/* Modals */}
      <AddEventModal 
        open={showEventModal}
        onClose={() => setShowEventModal(false)}
        onSubmit={handleAddEvent}
      />
      
      <AddProjectModal 
        open={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onSubmit={handleAddProject}
      />
    </Box>
  );
};

export default AdminDashboard;