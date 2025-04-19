const School = require("../models/school");

const newSchool = async (req, res) => {
    const { schoolName, schoolDescription } = req.body;
    const { id } = req.params;  // id of the admin
    
    try {
        // Find the admin by ID
        const admin = await School.findById(id);

        if (!admin) {
            return res.status(404).json({
                message: 'No Admin found'
            });
        }

        // Push the new school into the mySchools array
        admin.mySchools.push({
            schoolName: schoolName,
            schoolDescription: schoolDescription,
            createdDate: new Date(),  // Using current date for createdDate
            schoolCourses: []  // Assuming an empty array for schoolCourses for now
        });

        // Save the updated admin document
        await admin.save();

        // Return the updated admin data as a response
        return res.status(201).json({
            message: 'New school added successfully',
            admin: admin
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while adding the new school',
            error: error.message
        });
    }
};


const updateSchoolInAdmin = async (req, res) => {
    const { id, schoolId } = req.params;  // Admin ID and School ID
    const { schoolName, schoolDescription } = req.body;  // Updated school details

    try {
        // Find and update the school in the mySchools array
        const result = await School.updateOne(
            { _id: id, 'mySchools._id': schoolId },  // Match admin and school
            {
                $set: {
                    'mySchools.$.schoolName': schoolName,
                    'mySchools.$.schoolDescription': schoolDescription
                }
            }
        );

        if (result.nModified === 0) {
            return res.status(404).json({
                message: 'School not found or no changes made'
            });
        }

        return res.status(200).json({
            message: 'School updated successfully',
            result
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while updating the school',
            error: error.message
        });
    }
};







const addCourseToSchool = async (req, res) => {
    const { Adminid, schoolId } = req.params;  // Admin ID and School ID
    const { courseName, courseDescription, courseDuration } = req.body;  // New course details

    try {
        // Find and update the school by schoolId in the mySchools array of admin
        const result = await School.updateOne(
            { _id: Adminid, 'mySchools._id': schoolId },  // Match the admin and the school
            {
                $push: {
                    'mySchools.$.schoolCourses': {
                        courseName,
                        courseDescription,
                        courseDuration,
                        createdDate: new Date()  // Optional: Track when the course was added
                    }
                }
            }
        );

        if (result.nModified === 0) {
            return res.status(404).json({
                message: 'School not found or course already exists'
            });
        }

        return res.status(200).json({
            message: 'Course added successfully',
            result
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while adding the course',
            error: error.message
        });
    }
};






const updateCourseInSchool = async (req, res) => {
    const { id, schoolId, courseId } = req.params;  // Admin ID, School ID, and Course ID
    const { courseName, courseDescription, courseDuration } = req.body;  // Updated course details

    try {
        // Find and update the course in the schoolCourses array
        const result = await School.updateOne(
            { _id: id, 'mySchools._id': schoolId, 'mySchools.schoolCourses._id': courseId },  // Match admin, school, and course
            {
                $set: {
                    'mySchools.$.schoolCourses.$[course].courseName': courseName,
                    'mySchools.$.schoolCourses.$[course].courseDescription': courseDescription,
                    'mySchools.$.schoolCourses.$[course].courseDuration': courseDuration
                }
            },
            {
                arrayFilters: [
                    { 'course._id': courseId }  // Specify which course to update by courseId
                ]
            }
        );

        if (result.nModified === 0) {
            return res.status(404).json({
                message: 'Course not found or no changes made'
            });
        }

        return res.status(200).json({
            message: 'Course updated successfully',
            result
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while updating the course',
            error: error.message
        });
    }
};

 module.exports = {newSchool, addCourseToSchool}
