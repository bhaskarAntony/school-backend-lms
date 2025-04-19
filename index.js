const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const PORT = 4000;
const courseRoutes = require('./routes/courseRoutes');

connectDB();
app.use(express.json());
app.use(cors());
app.use('/api/courses', courseRoutes);

app.listen(PORT, ()=>{
    console.log(`server is runnning at http://localhost:${PORT}`);
})