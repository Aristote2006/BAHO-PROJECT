const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
});

// Create new project
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      scope,
      leader,
      image,
      status
    } = req.body;

    // Validate required fields
    if (!title || !description || !scope || !scope.startDate || !scope.endDate || !leader) {
      return res.status(400).json({ message: 'Missing required fields: title, description, scope.startDate, scope.endDate, or leader' });
    }

    const project = new Project({
      title,
      description,
      scope: {
        startDate: new Date(scope.startDate),
        endDate: new Date(scope.endDate)
      },
      leader,
      image: image || '',
      status: status || 'Planning'
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(400).json({ message: 'Error creating project', error: error.message });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const {
      title,
      description,
      scope,
      leader,
      image,
      status
    } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        scope: {
          startDate: new Date(scope.startDate),
          endDate: new Date(scope.endDate)
        },
        leader,
        image: image || '',
        status: status || 'Planning'
      },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Error updating project', error: error.message });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

module.exports = router;
