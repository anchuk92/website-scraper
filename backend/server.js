const express = require('express');
const cors = require('cors');
const scraper = require('./scraper');

const server = express();
server.use(cors());

server.get('/scrape', (req, res) => scraper.scrapeAction(req, res));

server.listen(3000, () => console.log('JSON Server is running'));
