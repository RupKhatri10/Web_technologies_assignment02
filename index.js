// app.js or index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(bodyParser.json());

// Import and use the cart routes
const Routes = require('./routes');
app.use('/api', Routes);

// MongoDB connection
mongoose.connect('mongodb+srv://rup:rup123@webtechnologies.dadlfxy.mongodb.net/?retryWrites=true&w=majority&appName=WebTechnologies').then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
