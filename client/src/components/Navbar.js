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
  const navItems = [
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
    navItems.push(
      { text: 'Login', path: '/login' },
      { text: 'Register', path: '/register' }
    );
  } else {
    navItems.push({ text: `Welcome, ${user?.firstName}`, path: '/profile' });
    navItems.push({ text: 'Logout', path: '#', onClick: handleLogout });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => {
          if (item.onClick) {
            return (
              <ListItem 
                key={item.text}
                onClick={item.onClick}
                sx={{ padding: '12px 24px', cursor: 'pointer' }}
              >
                <ListItemText primary={item.text} sx={{ textAlign: 'center' }} />
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
                sx={{ padding: '12px 24px', cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}
              >
                <ListItemText primary={item.text} sx={{ textAlign: 'center' }} />
              </ListItem>
            );
          } else {
            return (
              <ListItem 
                key={item.text}
                component={Link}
                to={item.path}
                sx={{ padding: '12px 24px', cursor: 'default' }}
              >
                <ListItemText primary={item.text} sx={{ textAlign: 'center' }} />
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
                height: { xs: '50px', sm: '70px' },
                width: 'auto'
              }}
            />
          </Link>
        </Box>
        
        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {navItems.map((item) => {
            if (item.onClick) {
              return (
                <Button
                  key={item.text}
                  onClick={item.onClick}
                  sx={{ 
                    my: 2, 
                    color: 'white', 
                    display: 'block',
                    mx: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(212, 175, 55, 0.3)', // Soft gold accent
                    }
                  }}
                >
                  {item.text}
                </Button>
              );
            } else if (item.isExternal) {
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
        </Box>
        
        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ color: 'white' }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            backgroundColor: '#01234B',
            color: 'white',
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
