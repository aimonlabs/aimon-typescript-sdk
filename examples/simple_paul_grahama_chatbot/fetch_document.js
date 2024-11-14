import axios from "axios";
import * as fs from 'fs';
import * as path from 'path';
export async function fetchAndSaveHtml(url, folderPath, fileName) {
    try {
        const { data } = await axios.get(url);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        const filePath = path.join(folderPath, fileName);
        fs.writeFileSync(filePath, data, 'utf8');
        console.log(`HTML document saved to ${filePath}`);
    }
    catch (error) {
        console.error(`Error fetching or saving page: ${error}`);
    }
}
