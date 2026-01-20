import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Grid
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const AddEventModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    link: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      name: '',
      description: '',
      date: '',
      time: '',
      location: '',
      link: '',
      image: null
    });
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: 'linear-gradient(135deg, #01234B 0%, #0a3666 100%)',
          color: 'white',
          borderRadius: 2
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ color: '#D4AF37', fontWeight: 600 }}>
            Add New Event
          </Typography>
          <IconButton onClick={onClose} sx={{ color: '#D4AF37' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D4AF37'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F9E79F'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F9E79F'
                    }
                  }
                }}
                InputLabelProps={{
                  sx: {
                    color: '#D4AF37'
                  }
                }}
                sx={{ 
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiFormLabel-root': { color: '#D4AF37' }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D4AF37'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F9E79F'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F9E79F'
                    }
                  }
                }}
                InputLabelProps={{
                  sx: {
                    color: '#D4AF37'
                  }
                }}
                sx={{ 
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiFormLabel-root': { color: '#D4AF37' }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                  sx: { color: '#D4AF37' }
                }}
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D4AF37'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F9E79F'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F9E79F'
                    },
                    '& .MuiInputBase-input': { color: 'white' }
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="time"
                label="Time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                  sx: { color: '#D4AF37' }
                }}
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D4AF37'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F9E79F'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F9E79F'
                    },
                    '& .MuiInputBase-input': { color: 'white' }
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D4AF37'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F9E79F'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F9E79F'
                    }
                  }
                }}
                InputLabelProps={{
                  sx: {
                    color: '#D4AF37'
                  }
                }}
                sx={{ 
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiFormLabel-root': { color: '#D4AF37' }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Link (optional)"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://example.com/event"
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D4AF37'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F9E79F'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F9E79F'
                    }
                  }
                }}
                InputLabelProps={{
                  sx: {
                    color: '#D4AF37'
                  }
                }}
                sx={{ 
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiFormLabel-root': { color: '#D4AF37' }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                component="label"
                sx={{
                  borderColor: '#D4AF37',
                  color: '#D4AF37',
                  height: '56px',
                  '&:hover': {
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    borderColor: '#F9E79F'
                  }
                }}
              >
                Upload Event Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {formData.image && (
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#D4AF37' }}>
                  Selected: {formData.image.name}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={onClose}
          sx={{ 
            color: '#ccc',
            borderColor: '#ccc',
            '&:hover': {
              borderColor: '#fff'
            }
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          sx={{ 
            background: 'linear-gradient(45deg, #D4AF37, #F9E79F)',
            color: '#01234B',
            fontWeight: 600,
            '&:hover': {
              background: 'linear-gradient(45deg, #F9E79F, #D4AF37)'
            }
          }}
          variant="contained"
        >
          Add Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventModal;