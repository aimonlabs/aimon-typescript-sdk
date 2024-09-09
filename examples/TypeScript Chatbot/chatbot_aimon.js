var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// // importing all the necessary modules
import "dotenv/config";
import { SimpleDirectoryReader, VectorStoreIndex, ContextChatEngine } from "llamaindex";
import { storageContextFromDefaults } from "llamaindex";
import { OpenAI, Settings } from "llamaindex";
import express from 'express';
import bodyParser from 'body-parser';
import Client from "aimon";
import cors from 'cors';
const app = express(); // To use as a backend server
app.use(cors()); // Enable CORS for all routes (optional, depending on your setup)
app.use(express.json()); // Parse JSON bodies
// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
const openai_key = process.env.OPENAI_API_KEY;
const aimon = new Client({
    authHeader: `Bearer ${process.env.AIMON_API_KEY}`,
});
function get_source_documents(response_string) {
    let contexts = [];
    let relevance_scores = [];
    // Get source documents from the generated response (of type engine response)
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
//// Can add instructions_for_chatbot in this function. For now I skipped these.
// Detect class from AIMON IS CALLED HERE IN THE PYTHON FILE AS A DECORATOR
// Work on it in the last
function am_chat(user_query, chatEngine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield chatEngine.chat({ message: user_query });
        let context = get_source_documents(response);
        // response.respone is of type string
        return [context, user_query, response.response]; //// return instructions_for_chatbot as well when using them
        // context itself is an array comprising of contexts and relevance_scores
    });
}
function load_data() {
    return __awaiter(this, void 0, void 0, function* () {
        // Setup llm model
        // console.log("Creating OpenAI LLM...")
        Settings.llm = new OpenAI({
            model: "gpt-4o-mini",
            temperature: 0.2,
            apiKey: openai_key
        });
        // console.log("Finished creating OpenAI LLM...")
        Settings.chunkSize = 256;
        Settings.chunkOverlap = 64; // keeping 1/4th of the chunkSize
        // Create Document from data {stored locally in ./data directory}                      
        const reader = new SimpleDirectoryReader();
        const documents = yield reader.loadData({
            directoryPath: "./data"
        });
        // A try catch statement
        // Where try: Load and return the indices, if they exist in "./storage" directory 
        // Catch: Create a storage and store the indices in it. Return the indices
        try {
            const StorageContext = yield storageContextFromDefaults({
                persistDir: "./storage",
            });
            const loadedIndex = yield VectorStoreIndex.init({
                storageContext: StorageContext,
            });
            // console.log("Storage exists. Loaded index from storage successfully.")
            return loadedIndex;
        }
        catch (_a) {
            // console.log("Storage does not exist")
            // console.log("Will start a new store")
            // Split text and create embeddings. 
            // persist the vector store automatically with the storage context
            const storageContext = yield storageContextFromDefaults({
                persistDir: "./storage",
            });
            // If embeddings exist, load them from persistDir
            // Else create embeddings and store them in persistDir
            const index = yield VectorStoreIndex.fromDocuments(documents, {
                storageContext,
            });
            // As per the documentation, "Right now, only saving and loading from disk is supported, with future integrations planned!"
            // console.log(index)
            // example in documentation at: https://github.com/run-llama/LlamaIndexTS/blob/main/examples/storageContext.ts 
            // console.log("Embeddings created and stored.")
            return index;
        }
    });
}
function execute(query) {
    return __awaiter(this, void 0, void 0, function* () {
        // Initialize chat history: 
        let chat_history = [{
                "role": "assistant",
                "content": "Ask me a question about Paul Graham's work experience"
            }];
        // load data
        const index = load_data();
        // Chat Engine
        const retriever = (yield index).asRetriever({
            similarityTopK: 4,
        });
        /*  Code to input instructions_for_chatbot works,
            but for simplicity, I am not using instructions
            for the chat bot in this version.*/
        // Input instructions for the chatbot
        // const instructions_for_chatbot = await rl.question("Instructions for the bot: ");
        // console.log(instructions_for_chatbot)
        const chatEngine = new ContextChatEngine({
            retriever,
            chatHistory: chat_history,
            systemPrompt: `You are a chatbot, able to answer questions on an essay about 
        Paul Graham's Work experience.
        You are allowed to answer user queries from the context provided to you.
        You can use the previous chat history as well to interact with and help the user. 
        You strictly cannot use information obtained from the internet.
        Please be friendly and polite.`
            // Always end with 'over'. `
            ,
            /*  Python file appends instructions_for_chatbot in the systemPrompt.
                Can do that in the next version.
                Skipped for now, as it is just additional context. */
        });
        // Getting response and other parameters from the chatbot
        const [[context, relevance_scores], user_query, generated_respone] = yield am_chat(query, chatEngine);
        const detectParams = [
            {
                context: context,
                generated_text: generated_respone,
            }
        ];
        // Getting AIMon Response
        const aimonResponse = yield aimon.inference.detect(detectParams);
        return [generated_respone, aimonResponse];
    });
}
const port = 3000;
// start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
// Route to handle the form submission
app.post('/api/query', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield req.body.question; // query: string
        const [generated_respone, aimonResponse] = yield execute(query);
        res.status(200).json({ message_cb: generated_respone, message_aimon: aimonResponse });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
