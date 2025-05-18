const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const bodyParser = require('body-parser');
const speakerRoutes = require('./routes/api/speakerRoutes');
const errorHandler = require('./middleware/errorHandler');

const {dropDB} = require('./config/database');

const app = express();


//middleware
//CORS (Cross-Origin Resource Sharing) in Express.js is a mechanism 
// that allows your server to handle requests from different 
// origins—such as when your frontend is hosted at one domain 
// (e.g., http://localhost:3000) and your backend API is on another 
// (e.g., http://localhost:5000).
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/speakers', speakerRoutes); //this makes the full path 
                                          // localhost:4000/api/speakers and route paths after

// Error handling
//Express processes middleware in the order they're added
//Error handlers should be the last middleware registered
//When next(error) is called, Express skips regular middleware and goes straight to error handlers
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on ${config.NODE_ENV} mode on port ${config.PORT}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err.message);
});

//dropDB();
