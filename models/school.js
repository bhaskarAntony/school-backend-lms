const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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
    }
});

const schoolSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber:{
        type:String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    mySchools:[
        {
            schoolName:{
                type:String,
                required:true,
                unique:true
            },
            schoolDescription:{
                type:String,
                required:true
            },
            createdDate:{
                type: Date,
                default: Date.now
            },
            schoolCourses: [schoolCourseSchema]
            // Multiple courses under a school
        }
    ]
});

schoolSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

schoolSchema.methods.matchPassword = async function (enteredPassword) {
    console.log(enteredPassword);
    
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.log(error);
  }
};

const School = mongoose.model('School', schoolSchema);

module.exports = School;
