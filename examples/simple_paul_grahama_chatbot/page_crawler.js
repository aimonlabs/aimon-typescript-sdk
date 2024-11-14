import axios from 'axios';
import * as cheerio from 'cheerio';
async function fetchPage(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const bodyHtml = $('body').html();
        if (bodyHtml) {
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
const url = 'https://paulgraham.com/worked.html?viewfullsite=1';
const text_from_htmlbody = await fetchPage(url);
console.log(text_from_htmlbody);
