import React, { useState } from 'react';
import { Container, Box, Typography, Grid, Paper, TextField, Button, Alert, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 8,
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
}));

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      await axios.post('/api/contacts', formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      loading && setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Box 
        sx={{ 
          height: '40vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(rgba(1, 35, 75, 0.8), rgba(1, 35, 75, 0.8)), url(/images/LeeImage_45.jpg) center/cover no-repeat',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} gutterBottom sx={{ fontWeight: 700 }}>
            Contact Us
          </Typography>
          <Typography variant="h5" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} sx={{ maxWidth: '800px', mx: 'auto', color: '#D4AF37' }}>
            Get in touch with us to learn more about our programs and initiatives
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8, background: 'linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(/images/LeeImage_140.jpg) center/cover', borderRadius: 2, p: 3 }}>
        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} sm={12} md={5}>
            <StyledPaper elevation={3}>
              <Typography variant="h4" component="h2" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} gutterBottom sx={{ color: '#01234B', fontWeight: 600, mb: 4 }}>
                Contact Information
              </Typography>
              
              <Box className="text-fade-in-up" style={{ animationDelay: '0.2s' }} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600, mb: 1 }}>
                  Address
                </Typography>
                <Typography variant="body1" sx={{ color: '#4A4A4A' }}>
                  IKORO Resort, Musanze, Northern Province, Rwanda
                </Typography>
              </Box>
              
              <Box className="text-fade-in-up" style={{ animationDelay: '0.3s' }} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600, mb: 1 }}>
                  Phone
                </Typography>
                <Typography variant="body1" sx={{ color: '#4A4A4A' }}>
                  <Link href="tel:+250782558395" color="inherit" underline="hover">
                    +250 782 558 395
                  </Link>
                </Typography>
              </Box>
              
              <Box className="text-fade-in-up" style={{ animationDelay: '0.4s' }} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600, mb: 1 }}>
                  Email
                </Typography>
                <Typography variant="body1" sx={{ color: '#4A4A4A' }}>
                  <Link href="mailto:bahoafrica@gmail.com" color="inherit" underline="hover">
                    bahoafrica@gmail.com
                  </Link>
                </Typography>
              </Box>
              
              <Box className="text-fade-in-up" style={{ animationDelay: '0.5s' }} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600, mb: 1 }}>
                  Website
                </Typography>
                <Typography variant="body1" sx={{ color: '#4A4A4A' }}>
                  <Link href="https://www.bahoafrica.com" color="inherit" underline="hover">
                    www.bahoafrica.com
                  </Link>
                </Typography>
              </Box>
              
              {/* Google Maps Embed */}
              <Box className="text-fade-in-up" style={{ animationDelay: '0.6s' }} sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600, mb: 2 }}>
                  Our Location
                </Typography>
                <Box
                  component="iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.2734449986736!2d29.631461!3d-1.498889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dc5b43085167a9%3A0xcbb88cb89e9639f8!2sIKORO%20Resort%20Musanze!5e0!3m2!1sen!2srw!4v1234567890123!5m2!1sen!2srw"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: 8 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="IKORO Resort Musanze Location"
                />
              </Box>
            </StyledPaper>
          </Grid>
          
          {/* Contact Form */}
          <Grid item xs={12} sm={12} md={7}>
            <StyledPaper elevation={3}>
              <Typography variant="h4" component="h2" className="text-fade-in-up" style={{ animationDelay: '0.1s' }} gutterBottom sx={{ color: '#01234B', fontWeight: 600, mb: 4 }}>
                Send Us a Message
              </Typography>
              
              {success && (
                <Alert severity="success" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} sx={{ mb: 3 }}>
                  Your message has been sent successfully! We will get back to you soon.
                </Alert>
              )}
              
              {errors.submit && (
                <Alert severity="error" className="text-fade-in-up" style={{ animationDelay: '0.2s' }} sx={{ mb: 3 }}>
                  {errors.submit}
                </Alert>
              )}
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#D4AF37',
                          },
                          '&:hover fieldset': {
                            borderColor: '#b8972d',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#D4AF37',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#D4AF37',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#D4AF37',
                          },
                          '&:hover fieldset': {
                            borderColor: '#b8972d',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#D4AF37',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#D4AF37',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#D4AF37',
                          },
                          '&:hover fieldset': {
                            borderColor: '#b8972d',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#D4AF37',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#D4AF37',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#D4AF37',
                          },
                          '&:hover fieldset': {
                            borderColor: '#b8972d',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#D4AF37',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#D4AF37',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      variant="outlined"
                      multiline
                      rows={5}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#D4AF37',
                          },
                          '&:hover fieldset': {
                            borderColor: '#b8972d',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#D4AF37',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#D4AF37',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={loading}
                      sx={{ 
                        backgroundColor: '#D4AF37', 
                        color: '#01234B',
                        py: 1.5,
                        fontSize: '1.1rem',
                        '&:hover': {
                          backgroundColor: '#b8972d',
                        }
                      }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ContactPage;
