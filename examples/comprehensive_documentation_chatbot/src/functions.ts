import axios from "axios";
import * as cheerio from "cheerio";
import {Document} from "llamaindex";
import { parseStringPromise } from "xml2js";

// Function to fetch the URLs from sitemap
export async function fetch_from_sitemap(sitemapUrl: string): Promise<string[]> {
    try {
      // Step 1: Fetch the sitemap XML
      const response = await axios.get(sitemapUrl);
  
      // Step 2: Parse the XML into a JavaScript object
      const parsedXml = await parseStringPromise(response.data);
  
      // Step 3: Extract URLs from the parsed XML structure
      const urls: string[] = [];
      if (parsedXml.urlset && Array.isArray(parsedXml.urlset.url)) {
        parsedXml.urlset.url.forEach((urlEntry: { loc: string[] }) => {
          if (urlEntry.loc && urlEntry.loc[0]) {
            urls.push(urlEntry.loc[0]);
          }
        });
      }
  
      // Return the extracted URLs
      return urls;
    } catch (error) {
      console.error('Error fetching or parsing sitemap:', error);
      throw new Error('Failed to fetch or parse sitemap');
    }
}

// Function to extract text from a single URL
export async function extract_text_from_url(url: string): Promise<Document> {
  try {
    // Fetch the HTML content of the page
    const response = await axios.get(url);
    const html = response.data;

    // Load the HTML into Cheerio for parsing
    const $ = cheerio.load(html);

    // Extract the text content from the body (you can adjust this selector if needed)
    const textContent = $('body').text();

    // Clean up the text if necessary (trim whitespace, remove unnecessary characters, etc.)
    const cleanText = textContent.trim();

    // Create and return a Document object
    return new Document({ text: cleanText, id_: url });
  } catch (error) {
    console.error(`Error fetching or parsing the URL: ${url}`, error);
    // Return an empty Document object in case of an error
    return new Document({ text: '', id_: url });
  }
}

export function get_source_documents(response_string){
    let contexts = []
    let relevance_scores = []
    if (response_string.sourceNodes) {
        for(let node of response_string.sourceNodes){
            if((node.node)&&(node.node.text)&&(node.score)&&(node.score!=null)){
                contexts.push(node.node.text);
                relevance_scores.push(node.score);
            }
            else if((node.text)&&(node.score)&&(node.score!=null)){
                contexts.push(node.text);
                relevance_scores.push(node.score);
            }
            else{
                console.log("Node does not have the required attributes.");
            } } }
    else{console.log("No source_nodes attribute found in the chat response.");}
    return [contexts, relevance_scores]
}