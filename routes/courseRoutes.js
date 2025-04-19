const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// GET all courses
router.get('/', courseController.getAllCourses);

// GET single course by ID
router.get('/:id', courseController.getCourseById);

// POST create new course
router.post('/', courseController.createCourse);

// PATCH update course by ID
router.patch('/:id', courseController.updateCourse);

// DELETE course by ID
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
