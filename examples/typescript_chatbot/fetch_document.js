import axios from "axios";
import * as fs from 'fs';
import * as path from 'path';
// Function to fetch and save HTML document
export async function fetchAndSaveHtml(url, folderPath, fileName) {
    try {
        // Fetch the HTML content
        const { data } = await axios.get(url);
        // Make a directory if it doesn't exist
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        // Define the file path
        const filePath = path.join(folderPath, fileName);
        // Write the HTML content to a file
        fs.writeFileSync(filePath, data, 'utf8');
        console.log(`HTML document saved to ${filePath}`);
    }
    catch (error) {
        console.error(`Error fetching or saving page: ${error}`);
    }
}
