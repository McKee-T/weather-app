// Import necessary modules
import express from 'express';
import fetch from 'node-fetch'; 
import path from 'path';


const app = express();
const PORT = process.env.PORT || 4001; 

// Utility function to ensure correct path format 
function ensureCorrectPathFormat(pathname) {
    return pathname.replace(/^\/([A-Za-z]:)/, '$1');
}

// Construct an absolute path to the 'public' directory 
const __dirname = ensureCorrectPathFormat(path.dirname(new URL(import.meta.url).pathname));
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath)); 
console.log("Serving static from: ", publicPath);


app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
});


const API_KEY = "0d09fc7ee5df7b518660777e251c6898"; 

// Route for fetching weather data
app.get('/weather', (req, res) => {
    const { city } = req.query; 
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

    fetch(url) 
        .then(response => response.json()) 
        .then(data => res.send(data)) 
        .catch(error => res.status(500).send(error)); 
});

// Catch-all handler for unhandled routes
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
