import axios from 'axios';
import * as cheerio from 'cheerio';
// fetchPage function to fetch and parse the webpage
async function fetchPage(url) {
    try {
        // Fetch the page content
        const { data } = await axios.get(url);
        // Load the content into cheerio
        const $ = cheerio.load(data);
        // Extract the body content
        const bodyHtml = $('body').html();
        if (bodyHtml) {
            // Convert HTML to plain text by removing all HTML tags
            const bodyText = cheerio.load(bodyHtml)('body').text();
            return bodyText;
        }
        else {
            return 'No body content found.';
        }
    }
    catch (error) {
        console.error(`Error fetching page: ${error}`);
        return 'Error fetching page.';
    }
}
// Calling the fetchPage function
const url = 'https://paulgraham.com/worked.html?viewfullsite=1';
const text_from_htmlbody = await fetchPage(url);
console.log(text_from_htmlbody);
