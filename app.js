const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3000;

// Set EJS sebagai view engine
app.set('view engine', 'ejs');

// Set folder public untuk file statis seperti CSS dan gambar
app.use(express.static(path.join(__dirname, 'public')));

// URL ke file JSON di GitHub
const orgUrl = 'https://raw.githubusercontent.com/Vodka-exploit/OrgGRUP6BClass/main/Org.json';
const membersUrl = 'https://raw.githubusercontent.com/Vodka-exploit/OrgGRUP6BClass/main/Members.json';

// Routes
app.get('/', async (req, res) => {
  try {
    const orgResponse = await axios.get(orgUrl);
    const membersResponse = await axios.get(membersUrl);
    const orgData = orgResponse.data;
    const membersData = membersResponse.data;
    res.render('index', { title: 'Home', orgData, membersData });
  } catch (error) {
    console.error('Error fetching data from GitHub:', error);
    res.status(500).send('Error fetching data from GitHub');
  }
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
