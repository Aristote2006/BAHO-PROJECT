import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  Grid,
  IconButton,
  Alert,
  FormControlLabel,
  Switch,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  PhotoCamera as PhotoCameraIcon,
  PictureAsPdf as PdfIcon,
  ArrowBack as ArrowBackIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { eventService, projectService } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ProfilePage = () => {
  const { user, updateUserProfile, isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profilePicture: null
  });
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const handleDarkModeChange = (event) => {
    const checked = event.target.checked;
    setDarkMode(checked);
    localStorage.setItem('darkMode', JSON.stringify(checked));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const fetchUserData = async () => {
      if (user) {
        setProfile({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          profilePicture: user.profilePicture || null
        });
        
        try {
          // Fetch events and projects to show in the preview
          const [eventsData, projectsData] = await Promise.all([
            eventService.getAll(),
            projectService.getAll()
          ]);
          
          setEvents(eventsData);
          setProjects(projectsData);
        } catch (error) {
          console.error('Error fetching events/projects:', error);
        }
      }
      setLoading(false);
    };
    
    fetchUserData();
  }, [user, isAuthenticated, navigate]);

  // Apply dark mode to the document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({
          ...prev,
          profilePicture: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      // In a real app, you would send this to your backend
      // For now, we'll just update the local state
      await updateUserProfile(profile);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = async (period) => {
    try {
      // Fetch all events and projects
      const [eventsData, projectsData] = await Promise.all([
        eventService.getAll(),
        projectService.getAll()
      ]);

      // Filter based on period
      let filteredEvents = eventsData;
      let filteredProjects = projectsData;

      if (period === 'month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        filteredEvents = eventsData.filter(event => new Date(event.createdAt) >= oneMonthAgo);
        filteredProjects = projectsData.filter(project => new Date(project.createdAt) >= oneMonthAgo);
      } else if (period === 'year') {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        filteredEvents = eventsData.filter(event => new Date(event.createdAt) >= oneYearAgo);
        filteredProjects = projectsData.filter(project => new Date(project.createdAt) >= oneYearAgo);
      }

      // Create PDF
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(22);
      doc.setTextColor(1, 35, 75); // #01234B
      doc.text(`BAHO AFRICA ${period.charAt(0).toUpperCase() + period.slice(1)}ly Report`, 20, 20);

      // Add user info
      doc.setFontSize(16);
      doc.setTextColor(212, 175, 55); // #D4AF37
      doc.text(`Generated for: ${user.firstName} ${user.lastName}`, 20, 35);
      doc.text(`Email: ${user.email}`, 20, 45);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55);

      // Add events section
      if (filteredEvents.length > 0) {
        doc.setFontSize(18);
        doc.setTextColor(1, 35, 75);
        doc.text('Events Held', 20, 70);

        let yPositionEvents = 80;
        filteredEvents.forEach((event, index) => {
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(`${index + 1}. ${event.title}`, 20, yPositionEvents);
          doc.setFontSize(10);
          doc.text(`Date: ${event.date || 'N/A'}, Location: ${event.location || 'N/A'}`, 20, yPositionEvents + 8);
          yPositionEvents += 18;
          
          if (yPositionEvents > 270) { // Check if we need a new page
            doc.addPage();
            yPositionEvents = 20;
          }
        });
      }

      // Add projects section
      if (filteredProjects.length > 0) {
        doc.setFontSize(18);
        doc.setTextColor(1, 35, 75);
        const projectStartY = filteredEvents.length > 0 ? 80 + (filteredEvents.length * 18) + 10 : 70;
        doc.text('Projects Completed', 20, projectStartY);

        let yPositionProjects = projectStartY + 10;
        filteredProjects.forEach((project, index) => {
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(`${index + 1}. ${project.title}`, 20, yPositionProjects);
          doc.setFontSize(10);
          doc.text(`Category: ${project.category || 'N/A'}, Status: ${project.status || 'Active'}`, 20, yPositionProjects + 8);
          yPositionProjects += 18;
          
          if (yPositionProjects > 270) { // Check if we need a new page
            doc.addPage();
            yPositionProjects = 20;
          }
        });
      }

      // If no events or projects, add a message
      if (filteredEvents.length === 0 && filteredProjects.length === 0) {
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('No events or projects found for this period.', 20, 70);
      }

      // Save the PDF
      doc.save(`baho_africa_${period}_report.pdf`);
      
      setSuccess(`Report for ${period} exported successfully!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to export report: ' + err.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading...</Typography>
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
      {/* Admin Header */}
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
            <IconButton 
              onClick={() => navigate('/admin')}
              sx={{ 
                color: '#D4AF37',
                '&:hover': {
                  backgroundColor: 'rgba(212, 175, 55, 0.1)'
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
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
              Profile Settings
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={handleLogout}
              sx={{ 
                color: '#D4AF37',
                borderColor: '#D4AF37',
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
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: '#D4AF37', fontWeight: 700, mb: 4, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          Profile Settings
        </Typography>

        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Grid container spacing={4}>
          {/* Profile Information Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #01234B 0%, #0a3666 100%)', 
              color: 'white',
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mb: 2,
                      border: '4px solid #D4AF37'
                    }}
                    src={profile.profilePicture}
                  >
                    {!profile.profilePicture && (
                      <AccountCircleIcon sx={{ fontSize: 60, color: '#D4AF37' }} />
                    )}
                  </Avatar>
                  
                  <IconButton 
                    color="primary" 
                    aria-label="upload picture" 
                    component="label"
                    sx={{ 
                      backgroundColor: 'rgba(212, 175, 55, 0.2)', 
                      color: '#D4AF37',
                      '&:hover': { backgroundColor: 'rgba(212, 175, 55, 0.3)' }
                    }}
                  >
                    <PhotoCameraIcon />
                    <input 
                      hidden 
                      accept="image/*" 
                      type="file" 
                      onChange={handleFileUpload} 
                    />
                  </IconButton>
                </Box>

                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                  margin="normal"
                  sx={{
                    '& .MuiInputBase-input': { color: 'white' },
                    '& .MuiInputLabel-root': { color: '#D4AF37' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#D4AF37' },
                      '&:hover fieldset': { borderColor: '#F9E79F' },
                      '&.Mui-focused fieldset': { borderColor: '#F9E79F' }
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                  margin="normal"
                  sx={{
                    '& .MuiInputBase-input': { color: 'white' },
                    '& .MuiInputLabel-root': { color: '#D4AF37' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#D4AF37' },
                      '&:hover fieldset': { borderColor: '#F9E79F' },
                      '&.Mui-focused fieldset': { borderColor: '#F9E79F' }
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  margin="normal"
                  disabled
                  sx={{
                    '& .MuiInputBase-input': { color: 'white' },
                    '& .MuiInputLabel-root': { color: '#D4AF37' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#D4AF37' },
                      '&:hover fieldset': { borderColor: '#F9E79F' },
                      '&.Mui-focused fieldset': { borderColor: '#F9E79F' }
                    }
                  }}
                />

                <Button
                  variant="contained"
                  onClick={handleSaveProfile}
                  sx={{
                    mt: 2,
                    backgroundColor: '#D4AF37',
                    color: '#01234B',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: '#b8972d'
                    }
                  }}
                >
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Settings Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #415A77 0%, #0a3666 100%)', 
              color: 'white',
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: '#D4AF37', mb: 3, fontWeight: 600 }}>
                  Settings
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={handleDarkModeChange}
                      name="darkMode"
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#D4AF37',
                          '&:hover': {
                            backgroundColor: 'rgba(212, 175, 55, 0.3)',
                          },
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#D4AF37',
                        },
                      }}
                    />
                  }
                  label="Dark Mode"
                  sx={{ color: 'white', mb: 3 }}
                />

                <Typography variant="h6" sx={{ color: '#D4AF37', mt: 3, mb: 2 }}>
                  Export Reports
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<PdfIcon />}
                    onClick={() => handleExportReport('month')}
                    sx={{
                      color: '#D4AF37',
                      borderColor: '#D4AF37',
                      '&:hover': {
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        borderColor: '#F9E79F'
                      }
                    }}
                  >
                    Export Monthly Report
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<PdfIcon />}
                    onClick={() => handleExportReport('year')}
                    sx={{
                      color: '#D4AF37',
                      borderColor: '#D4AF37',
                      '&:hover': {
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        borderColor: '#F9E79F'
                      }
                    }}
                  >
                    Export Yearly Report
                  </Button>
                </Box>

                {/* Recent Activity Preview */}
                <Typography variant="h6" sx={{ color: '#D4AF37', mt: 4, mb: 2 }}>
                  Recent Activity Preview
                </Typography>

                <Paper sx={{ background: 'rgba(255, 255, 255, 0.1)', p: 2, mt: 2 }}>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Events Created" 
                        secondary={`${events.length} events`} 
                        sx={{ color: 'white', '.MuiListItemText-primary': { color: '#D4AF37' }, '.MuiListItemText-secondary': { color: 'white' }}}
                      />
                    </ListItem>
                    <Divider sx={{ backgroundColor: 'rgba(212, 175, 55, 0.3)', my: 1 }} />
                    <ListItem>
                      <ListItemText 
                        primary="Projects Created" 
                        secondary={`${projects.length} projects`} 
                        sx={{ color: 'white', '.MuiListItemText-primary': { color: '#D4AF37' }, '.MuiListItemText-secondary': { color: 'white' }}}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;