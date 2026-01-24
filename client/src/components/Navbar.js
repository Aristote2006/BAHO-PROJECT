import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleDrawerToggle(); // Close mobile menu if open
  };

  // Conditionally render navItems based on authentication status
  const allNavItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'What We Do', path: '/what-we-do' },
    { text: 'Projects', path: '/projects' },
    { text: 'Events', path: '/events' },
    { text: 'Milestones', path: '/milestones' },
    { text: 'Team', path: '/team' },
    { text: 'Gallery', path: 'https://drive.google.com/drive/folders/1_Cd8PJavkutn-_uON063UuCmAqkaDSBN?usp=drive_link', isExternal: true },
    { text: 'Contact', path: '/contact' },
  ];

  // Public navigation items to show on desktop
  const desktopNavItems = [
    { text: 'Home', path: '/' },
    { text: 'Projects', path: '/projects' },
    { text: 'Events', path: '/events' },
    { text: 'Contact', path: '/contact' },
  ];

  // Items to show in the mobile menu
  const mobileNavItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'What We Do', path: '/what-we-do' },
    { text: 'Projects', path: '/projects' },
    { text: 'Events', path: '/events' },
    { text: 'Milestones', path: '/milestones' },
    { text: 'Team', path: '/team' },
    { text: 'Gallery', path: 'https://drive.google.com/drive/folders/1_Cd8PJavkutn-_uON063UuCmAqkaDSBN?usp=drive_link', isExternal: true },
    { text: 'Contact', path: '/contact' },
  ];

  // Add login/register or user profile/logout items
  if (!isAuthenticated) {
    mobileNavItems.push(
      { text: 'Login', path: '/login' },
      { text: 'Register', path: '/register' }
    );
  } else {
    // If user is authenticated and admin, show Dashboard link
    if (user?.isAdmin) {
      mobileNavItems.push({ text: 'Dashboard', path: '/admin' });
    }
    mobileNavItems.push({ text: `Welcome, ${user?.firstName}`, path: '/profile' });
    mobileNavItems.push({ text: 'Logout', path: '#', onClick: handleLogout });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', height: '100%' }}>
      <List sx={{ pt: 4 }}>
        {mobileNavItems.map((item) => {
          if (item.onClick) {
            return (
              <ListItem 
                key={item.text}
                onClick={item.onClick}
                sx={{ 
                  padding: '16px 24px', 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  }
                }}
              >
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    textAlign: 'center', 
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }} 
                />
              </ListItem>
            );
          } else if (item.isExternal) {
            return (
              <ListItem 
                key={item.text}
                component="a"
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  padding: '16px 24px', 
                  cursor: 'pointer', 
                  color: 'white', 
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  }
                }}
              >
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    textAlign: 'center', 
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }} 
                />
              </ListItem>
            );
          } else {
            return (
              <ListItem 
                key={item.text}
                component={Link}
                to={item.path}
                sx={{ 
                  padding: '16px 24px', 
                  cursor: 'default',
                  '&:hover': {
                    backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  }
                }}
              >
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    textAlign: 'center', 
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }} 
                />
              </ListItem>
            );
          }
        })}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: '#01234B', // Brand Primary Color
        py: 1,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Box
              component="img"
              src="/images/BAHO_BRAND_yellow.png"
              alt="BAHO AFRICA Logo"
              sx={{
                height: { xs: '70px', sm: '90px', md: '120px' }, // Further increased logo size
                width: 'auto'
              }}
            />
          </Link>
        </Box>
        
        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {desktopNavItems.map((item) => {
            if (item.isExternal) {
              return (
                <Button
                  key={item.text}
                  component="a"
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    my: 2, 
                    color: 'white', 
                    display: 'block',
                    mx: 1,
                    fontWeight: 'bold',
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    '&:hover': {
                      backgroundColor: 'rgba(212, 175, 55, 0.3)', // Soft gold accent
                    }
                  }}
                >
                  {item.text}
                </Button>
              );
            } else {
              return (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{ 
                    my: 2, 
                    color: 'white', 
                    display: 'block',
                    mx: 1,
                    fontWeight: 'bold',
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    '&:hover': {
                      backgroundColor: 'rgba(212, 175, 55, 0.3)', // Soft gold accent
                    }
                  }}
                >
                  {item.text}
                </Button>
              );
            }
          })}
          {/* Show login/register/profile based on auth status */}
          {!isAuthenticated ? (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  mx: 1,
                  fontWeight: 'bold',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  '&:hover': {
                    backgroundColor: 'rgba(212, 175, 55, 0.3)',
                  }
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  mx: 1,
                  fontWeight: 'bold',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  '&:hover': {
                    backgroundColor: 'rgba(212, 175, 55, 0.3)',
                  }
                }}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/profile"
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  mx: 1,
                  fontWeight: 'bold',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  '&:hover': {
                    backgroundColor: 'rgba(212, 175, 55, 0.3)',
                  }
                }}
              >
                Profile
              </Button>
              {user?.isAdmin && (
                <Button
                  component={Link}
                  to="/admin"
                  sx={{ 
                    my: 2, 
                    color: 'white', 
                    display: 'block',
                    mx: 1,
                    fontWeight: 'bold',
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    '&:hover': {
                      backgroundColor: 'rgba(212, 175, 55, 0.3)',
                  }
                }}
              >
                Dashboard
              </Button>
              )}
              <Button
                onClick={handleLogout}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  mx: 1,
                  fontWeight: 'bold',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  '&:hover': {
                    backgroundColor: 'rgba(212, 175, 55, 0.3)',
                  }
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
        
        {/* Menu Button - Visible on all screen sizes */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ color: 'white' }}
          >
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Toolbar>
      
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"  // Change anchor to right side
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'block' },  // Show on all screen sizes
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: { xs: '80%', sm: '300px', md: '350px' },  // Different widths for different screen sizes
            backgroundColor: '#01234B',
            color: 'white',
            backgroundImage: 'none',  // Remove any default background image
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
