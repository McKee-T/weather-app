import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 4001;

// Create an equivalent of __dirname in ES Module scope
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRootPath = path.join(__dirname, '..');
app.use(express.static(projectRootPath));
console.log(`Serving static files from: ${projectRootPath}`);

// Middleware to log incoming request URLs for debugging
app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
});

const API_KEY = process.env.OPENWEATHER_API_KEY;

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
