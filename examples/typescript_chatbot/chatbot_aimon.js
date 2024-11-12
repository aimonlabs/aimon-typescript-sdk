import "dotenv/config";
import { SimpleDirectoryReader, VectorStoreIndex, ContextChatEngine } from "llamaindex";
import { storageContextFromDefaults } from "llamaindex";
import { OpenAI, Settings } from "llamaindex";
import express from 'express';
import bodyParser from 'body-parser';
import Client from "aimon";
import cors from 'cors';
import { fetchAndSaveHtml } from './fetch_document.js';
import * as fs from 'fs';
import * as path from 'path';
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const openai_key = process.env.OPENAI_API_KEY;
const aimon = new Client({
    authHeader: `Bearer ${process.env.AIMON_API_KEY}`,
});
const detectors = {
    hallucination: { detector_name: "hdm-1" },
    // instruction_adherence: {detector_name: "default"},
    // conciseness: {detector_name: "default"},
    // completeness: {detector_name: "default"},
    // toxicity: {detector_name: "default"},
};
function get_source_documents(response_string) {
    let contexts = [];
    let relevance_scores = [];
    if (response_string.sourceNodes) {
        for (let node of response_string.sourceNodes) {
            if ((node.node) && (node.node.text) && (node.score) && (node.score != null)) {
                contexts.push(node.node.text);
                relevance_scores.push(node.score);
            }
            else if ((node.text) && (node.score) && (node.score != null)) {
                contexts.push(node.text);
                relevance_scores.push(node.score);
            }
            else {
                console.log("Node does not have the required attributes.");
            }
        }
    }
    else {
        console.log("No source_nodes attribute found in the chat response.");
    }
    return [contexts, relevance_scores];
}
async function am_chat(user_query, user_instructions, chatEngine) {
    const response = await chatEngine.chat({ message: user_query });
    let context = get_source_documents(response);
    return [context, user_query, user_instructions, response.response];
}
async function load_data() {
    const url = 'https://paulgraham.com/worked.html';
    const folderPath = './data';
    const fileName = 'downloaded.html';
    const filePath = path.join(folderPath, fileName);
    if (fs.existsSync(filePath)) {
        console.log("File exists");
    }
    else {
        console.log("File does not exist");
        await fetchAndSaveHtml(url, folderPath, fileName);
    }
    Settings.llm = new OpenAI({
        model: "gpt-4o",
        apiKey: openai_key
    });
    Settings.chunkSize = 256;
    Settings.chunkOverlap = 64;
    if (fs.existsSync('./storage/vector_store.json') &&
        fs.existsSync('./storage/index_store.json') &&
        fs.existsSync('./storage/doc_store.json')) {
        console.log("Embeddings exist. Loading from embeddings...");
        const StorageContext = await storageContextFromDefaults({
            persistDir: "./storage",
        });
        const loadedIndex = await VectorStoreIndex.init({
            storageContext: StorageContext,
        });
        return loadedIndex;
    }
    else {
        console.log("Embeddings do not exist OR are partially missing. Creating new embeddings...");
        if (fs.existsSync('./storage')) {
            await fs.promises.rm('./storage', { recursive: true });
        }
        const storageContext = await storageContextFromDefaults({
            persistDir: "./storage",
        });
        const reader = new SimpleDirectoryReader();
        const document = await reader.loadData({
            directoryPath: "./data"
        });
        const index = await VectorStoreIndex.fromDocuments(document, {
            storageContext
        });
        return index;
    }
}
async function execute(query, user_instructions) {
    let chat_history = [{
            "role": "assistant",
            "content": "Ask me a question about Paul Graham's work experience"
        }];
    const index = load_data();
    const retriever = (await index).asRetriever({
        similarityTopK: 4,
    });
    const chatEngine = new ContextChatEngine({
        retriever,
        chatHistory: chat_history,
        systemPrompt: `You are a chatbot, able to answer questions on an essay about Paul Graham's Work experience.
        You are supposed to answer user queries from the context provided to you, but can use the internet 
        if information is not available in the context for a maximum of 20 words.
        You should use the chat history to give a better experience to the user. 
        Please be friendly and polite.`,
    });
    const [[context, relevance_scores], user_query, instructions, generated_respone] = await am_chat(query, user_instructions, chatEngine);
    const aimonResponse = await aimon.detect(generated_respone, context, query, detectors, instructions);
    return [generated_respone, aimonResponse];
}
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
app.post('/api/query', async (req, res) => {
    try {
        const query = await req.body.question; // query: string
        const user_instructions = await req.body.instructions;
        const [generated_respone, aimonResponse] = await execute(query, user_instructions);
        res.status(200).json({ message_cb: generated_respone, message_aimon: aimonResponse });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
