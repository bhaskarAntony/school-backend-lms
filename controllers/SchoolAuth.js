const jwt = require('jsonwebtoken');
const School = require('../models/school');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    console.log(req.body);
    const { schoolName, email, password,  phoneNumber} = req.body;
 
    

    try {
        const newSchool = new School({
           schoolName,
           email,
           password,
           phoneNumber,
        });

        await newSchool.save();

        res.status(201).json({
            message: 'Your School registered successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error',
        });
    }
};



const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const school = await School.findOne({ email });
        console.log(school);
        

        const isMatch = await bcrypt.compare(password, school.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }
        console.log('working');
        

        const token = jwt.sign({ id: school._id }, '133a889e51573dae5d1f527089e91a3c3c4d547490c4e762bd6a3416905a11c811e8c93bdf9a2cac853ae8c6ed89890deff99826d67b469d758667bc26d9df45', {
            expiresIn: '1d',
        });

        res.json({
            token,
            School: {
                id: school._id,
                schoolName: school.schoolName,
                email: school.email,
                phoneNumber: school.phoneNumber,
                createDate:school.createDate
            },
        });
    } catch (error) {
        res.status(500).json({
            error:error,
            message: 'Server error',
        });
    }
};

module.exports = { register, login };