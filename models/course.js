const mongoose = require('mongoose');

const schoolCourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    technologies: {
        type: [String],
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    availableTeachLanguages: {
        type: [String],
        required: true
    },
    rating: {
        type: String,
        required:true
    },
    whatWillLearn: {
        type: [String],
        required: true
    },
    coursePreviewVideoLink: {
        type: String,
        required: true
    },
    learners: {
        type: Number,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    fermionCourseId: {
        type: String,
        required: true
    },
    fermionSchoolId: {
        type: String,
        required: true
    },
    courseIncludes: {
        type: [{
            relatedIcon: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            }
        }]
    },
    courseDescription: {
        type: String,
        required: true
    },
    studentRequirements: {
        type: [String],
        required: true
    },
    instructorDetails: {
        type: {
            name: String,
            subtitle: String,
            rating: Number,
            reviews: Number,
            students: Number,
            description: String
        }
    },
    courseReviews: {
        type: [{
            name: String,
            rating: Number,
            content: String
        }]
    },
    coursePrice:{
        type:String,
        required:true
    },
    courseActualPrice:{
        type:String,
        required:true
    },
    courseDiscount:{
        type:String,
        required:true
    },
    courseDiscountEndDate:{
        type:String,
        required:true
    }
});

const Course = mongoose.model('landingpages', schoolCourseSchema);
module.exports = Course;