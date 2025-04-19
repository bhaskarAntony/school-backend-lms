const express = require('express');

const School = require('../models/school');
const { register, login } = require('../controllers/SchoolAuth');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/verify', protect, async (req, res) => {
    try {
      const school = await School.findById(req.school.id).select('-password');
      res.json(school);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;