const express = require('express');
const path = require('path');
const cors = require('cors'); // Add CORS
const app = express();

// Enable CORS for all domains (you can restrict it later for specific domains)
app.use(cors());

// Serve static files (HTML, CSS, JS, images, songs)
app.use(express.static(path.join(__dirname, '/')));
app.use('/songs', express.static(path.join(__dirname, 'songs')));


app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
  });
  

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Listen on the default Render port or 3000 for local testing
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
