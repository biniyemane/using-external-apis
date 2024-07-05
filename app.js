const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/get-data', async (req, res) => {
  const { city } = req.body;
  try {
    const apiKey = '927a83f9aa26448a986ab0dc43a3d106';
    const response = await axios.get(`https://api.weatherbit.io/v2.0/current`, {
      params: {
        city,
        key: apiKey
      }
    });
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
