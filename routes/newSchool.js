const express = require('express');
const { newSchool, addCourseToSchool } = require('../controllers/NewSchool');
const School = require('../models/school');
const router = express.Router();

router.post('/new/school/:id', newSchool);
router.post('/school/:schoolId/new/course/:Adminid', addCourseToSchool);
router.get('/get/school/:id', async (req, res) => {
    const { id } = req.params;  // Get the ID from the request parameters

    try {
        const data = await School.findById(id);  // Find school by ID
        if (!data) {
            return res.status(404).json({
                message: 'No data Found'
            });
        }

        res.status(200).json({
            message: 'Success',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;