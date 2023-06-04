const axios = require('axios');
const cheerio = require('cheerio');

class Scraper {
    async scrapeAction(req, res) {
        try {
            // Fetch the website content
            const response = await axios.get('https://wltest.dns-systems.net/');

            // Load the HTML content into Cheerio
            const $ = cheerio.load(response.data);

            // Find the main products container
            const content = $('#maincontent');

            // Get all product elements
            const elements = content.find('.pricing-table').find('.package');

            // Initialize an empty array to store the results
            const results = [];

            // Iterate over each element in the elements array
            elements.each((index, elm) => {
                // Initialize an empty item object to store the result
                const item = {};

                // Add title value to the item
                item.title = $(elm).find('.header > h3').text();

                // Add description value to the item
                item.description = $(elm).find('.package-features > ul > li > .package-description').text();

                // Find the price container
                const packagePrice = $(elm).find('.package-features > ul > li > .package-price');

                // Add price value to the item
                item.price = packagePrice.find('.price-big').text();

                // Add discount value to the item
                item.discount = packagePrice.find('p[style*="color: red"]').text();

                //Add item to a results array
                results.push(item);
            });

            // Sort the results array by annual price in descending order
            results.sort((a, b) => this.getAnnualPrice(b) - this.getAnnualPrice(a));

            // Send the results as a JSON response
            return res.json(results);

        } catch (error) {
            // Send error as a response
            return res.status(500).json({ error: 'An error occurred' });
        }
    }

    // Check if price is annual and return annual price
    getAnnualPrice(el) {
        const annual = el.title.includes('Year');
        const price = parseFloat(el.price.replace(/[^0-9.]/g, ''));
        return annual ? price : price*12;
    }
}

module.exports = new Scraper();
