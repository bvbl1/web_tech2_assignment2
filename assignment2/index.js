import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
const PORT = 3000;

// Указываем папку со статическими файлами
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для API погоды
app.get('/weather', async (req, res) => {
    const city = req.query.city || 'Astana';
    const API_KEY = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch weather data' });
    }
});

// Маршрут для API новостей
app.get('/news', async (req, res) => {
    const API_KEY = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data.articles.slice(0, 5));
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch news' });
    }
});

// Маршрут для API курсов валют
app.get('/exchange-rate', async (req, res) => {
    const API_KEY = process.env.EXCHANGE_API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch exchange rates' });
    }
});


// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
