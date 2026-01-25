import React, { useState, useEffect } from 'react';
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

const AddProjectModal = ({ open, onClose, onSubmit, editingProject }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    leader: '',
    image: null
  });

  // Initialize form with editing project data
  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title || '',
        description: editingProject.description || '',
        startDate: editingProject.scope?.startDate ? new Date(editingProject.scope.startDate).toISOString().split('T')[0] : '',
        endDate: editingProject.scope?.endDate ? new Date(editingProject.scope.endDate).toISOString().split('T')[0] : '',
        leader: editingProject.leader || '',
        image: editingProject.image || null
      });
    } else {
      // Reset form for new project
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        leader: '',
        image: null
      });
    }
  }, [editingProject, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target.result // Store base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      scope: {
        startDate: formData.startDate,
        endDate: formData.endDate
      }
    });
    // Don't reset form here - it will be reset when modal closes
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
            {editingProject ? 'Edit Project' : 'Add New Project'}
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
                label="Project Title"
                name="title"
                value={formData.title}
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
                rows={4}
                label="Project Description"
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
                label="Start Date"
                name="startDate"
                value={formData.startDate}
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
                type="date"
                label="End Date"
                name="endDate"
                value={formData.endDate}
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
                label="Project Leader"
                name="leader"
                value={formData.leader}
                onChange={handleChange}
                required
                placeholder="Enter project leader name"
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
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="project-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="project-image-upload">
                <Button 
                  variant="outlined" 
                  component="span"
                  fullWidth
                  sx={{
                    height: '100%',
                    borderColor: '#D4AF37',
                    color: '#D4AF37',
                    '&:hover': {
                      borderColor: '#F9E79F',
                      backgroundColor: 'rgba(212, 175, 55, 0.1)'
                    }
                  }}
                >
                  {formData.image ? 'Change Image' : 'Upload Image'}
                </Button>
              </label>
              {formData.image && (
                <Box sx={{ mt: 1, textAlign: 'center' }}>
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '150px', 
                      borderRadius: '4px',
                      border: '1px solid #D4AF37'
                    }} 
                  />
                </Box>
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
          {editingProject ? 'Update Project' : 'Add Project'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectModal;