const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const PORT = 4000;
const schoolRoutes = require('./routes/school');
const newSchoolRoutes = require('./routes/newSchool');
const courseRoutes = require('./routes/courseRoutes');

connectDB();
app.use(express.json());
app.use(cors());
app.use('/api', schoolRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api', newSchoolRoutes);

app.listen(PORT, ()=>{
    console.log(`server is runnning at http://localhost:${PORT}`);
})