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
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Event as EventIcon, 
  Folder as ProjectIcon, 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Dashboard as DashboardIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AddEventModal from '../components/AddEventModal';
import AddProjectModal from '../components/AddProjectModal';
import { eventService, projectService } from '../services/apiService';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Add state for profile menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfileMenu = Boolean(anchorEl);

  // Calculate statistics
  const getThisMonthCount = () => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    
    const eventsThisMonth = events.filter(event => {
      const eventDate = new Date(event.createdAt || event.scope?.startDate);
      return eventDate.getMonth() === thisMonth && eventDate.getFullYear() === thisYear;
    }).length;
    
    const projectsThisMonth = projects.filter(project => {
      const projectDate = new Date(project.createdAt || project.scope?.startDate);
      return projectDate.getMonth() === thisMonth && projectDate.getFullYear() === thisYear;
    }).length;
    
    return eventsThisMonth + projectsThisMonth;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsData, projectsData] = await Promise.all([
        eventService.getAll(),
        projectService.getAll()
      ]);
      setEvents(eventsData);
      setProjects(projectsData);
      
      // Build recent activity from events and projects
      const activity = [];
      
      // Add recent events
      eventsData.slice(0, 3).forEach(event => {
        activity.push({
          type: 'event',
          action: 'added',
          title: event.title,
          timestamp: event.createdAt || event.scope?.startDate,
          id: event._id
        });
      });
      
      // Add recent projects
      projectsData.slice(0, 3).forEach(project => {
        activity.push({
          type: 'project',
          action: 'added',
          title: project.title,
          timestamp: project.createdAt || project.scope?.startDate,
          id: project._id
        });
      });
      
      // Sort by timestamp and take most recent 5
      activity.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setRecentActivity(activity.slice(0, 5));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Handle profile menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    // Navigate to profile page
    navigate('/profile');
    handleProfileMenuClose();
  };

  const handleSettings = () => {
    // Navigate to profile settings
    navigate('/profile');
    handleProfileMenuClose();
  };

  // Helper function to format time ago
  const getTimeAgo = (timestamp) => {
    if (!timestamp) return 'recently';
    
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  const handleAddEvent = async (eventData) => {
    try {
      const newEvent = await eventService.create(eventData);
      setEvents(prev => [newEvent, ...prev]);
      
      // Add to recent activity
      setRecentActivity(prev => [{
        type: 'event',
        action: 'added',
        title: newEvent.title,
        timestamp: new Date().toISOString(),
        id: newEvent._id
      }, ...prev].slice(0, 5));
      
      console.log('New event added:', newEvent);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleAddProject = async (projectData) => {
    try {
      const newProject = await projectService.create(projectData);
      setProjects(prev => [newProject, ...prev]);
      
      // Add to recent activity
      setRecentActivity(prev => [{
        type: 'project',
        action: 'added',
        title: newProject.title,
        timestamp: new Date().toISOString(),
        id: newProject._id
      }, ...prev].slice(0, 5));
      
      console.log('New project added:', newProject);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.delete(id);
        setEvents(prev => prev.filter(e => e._id !== id));
        setRecentActivity(prev => prev.filter(item => !(item.type === 'event' && item.id === id)));
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.delete(id);
        setProjects(prev => prev.filter(p => p._id !== id));
        setRecentActivity(prev => prev.filter(item => !(item.type === 'project' && item.id === id)));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar 
                sx={{ 
                  width: { xs: 32, sm: 40 }, 
                  height: { xs: 32, sm: 40 },
                  bgcolor: '#D4AF37',
                  color: '#01234B',
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.8 }
                }}
                onClick={handleProfileMenuOpen}
                aria-controls={openProfileMenu ? 'profile-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openProfileMenu ? 'true' : undefined}
              >
                {(user?.firstName?.charAt(0) || 'U') + (user?.lastName?.charAt(0) || 'A')}
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" sx={{ color: '#D4AF37', fontWeight: 600, lineHeight: 1.2 }}>
                  {user?.firstName && user?.lastName 
                    ? `${user.firstName} ${user.lastName}`
                    : user?.email 
                      ? user.email.split('@')[0]
                      : 'Admin User'}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(212, 175, 55, 0.7)', lineHeight: 1 }}>
                  {user?.email || 'admin@baho-africa.org'}
                </Typography>
              </Box>
            </Box>
            
            {/* Profile Menu */}
            <Menu
              anchorEl={anchorEl}
              id="profile-menu"
              open={openProfileMenu}
              onClose={handleProfileMenuClose}
              onClick={handleProfileMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleViewProfile} sx={{ color: 'white' }}>
                <ListItemIcon sx={{ color: '#D4AF37' }}>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="View Profile" secondary="Manage your account settings" />
              </MenuItem>
              <MenuItem onClick={handleSettings} sx={{ color: 'white' }}>
                <ListItemIcon sx={{ color: '#D4AF37' }}>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Settings" secondary="Preferences and exports" />
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: 'white' }}>
                <ListItemIcon sx={{ color: '#D4AF37' }}>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
            
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
                display: { xs: 'block', sm: 'none' }, // Only show on small screens
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
          <Grid item xs={12} sm={6} md={4}>
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
          
          <Grid item xs={12} sm={6} md={4}>
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
          
          <Grid item xs={12} sm={6} md={4}>
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
                  {getThisMonthCount()}
                </Typography>
                <Typography variant="h6" sx={{ color: '#D4AF37' }}>
                  New This Month
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
                              {event.title}
                            </Typography>
                            <Box>
                              <Button size="small" startIcon={<EditIcon />} sx={{ color: '#D4AF37', mr: 1 }}>
                                Edit
                              </Button>
                              <Button size="small" startIcon={<DeleteIcon />} sx={{ color: '#ff6b6b' }} onClick={() => handleDeleteEvent(event._id)}>
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
                                📅 {new Date(event.scope.startDate).toLocaleDateString()}
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
                              <Button size="small" startIcon={<DeleteIcon />} sx={{ color: '#ff6b6b' }} onClick={() => handleDeleteProject(project._id)}>
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
                                📅 Scope: {new Date(project.scope.startDate).toLocaleDateString()} - {new Date(project.scope.endDate).toLocaleDateString()}
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
                
                {recentActivity.length > 0 ? (
                  <Card sx={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(212, 175, 55, 0.2)'
                  }}>
                    <CardContent>
                      {recentActivity.map((activity, index) => {
                        const timeAgo = getTimeAgo(activity.timestamp);
                        const icon = activity.type === 'event' ? '📅' : '📁';
                        
                        return (
                          <Typography 
                            key={index} 
                            variant="body1" 
                            sx={{ 
                              color: '#ccc', 
                              mt: index > 0 ? 2 : 0,
                              pb: index < recentActivity.length - 1 ? 2 : 0,
                              borderBottom: index < recentActivity.length - 1 ? '1px solid rgba(212, 175, 55, 0.1)' : 'none'
                            }}
                          >
                            {icon} New {activity.type} "{activity.title}" {activity.action} - {timeAgo}
                          </Typography>
                        );
                      })}
                    </CardContent>
                  </Card>
                ) : (
                  <Card sx={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(212, 175, 55, 0.2)'
                  }}>
                    <CardContent>
                      <Typography variant="body1" sx={{ color: '#ccc', textAlign: 'center', py: 4 }}>
                        No recent activity. Start by creating your first event or project!
                      </Typography>
                    </CardContent>
                  </Card>
                )}
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