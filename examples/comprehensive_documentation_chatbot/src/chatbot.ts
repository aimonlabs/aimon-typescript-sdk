import "dotenv/config";
import * as fs from 'fs';
import {Client} from "aimon";
import {Document, VectorStoreIndex, ContextChatEngine} from "llamaindex";
import {OpenAI, OpenAIEmbedding, SentenceSplitter, Settings} from "llamaindex";
import { fetch_from_sitemap, extract_text_from_url, get_source_documents } from './functions.js';

//Setting up the global configurations
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
Settings.embedModel = new OpenAIEmbedding({model: "text-embedding-3-small"});
Settings.llm = new OpenAI({ model: "gpt-4o-mini", temperature: 0.1 });
Settings.nodeParser = new SentenceSplitter();
const aimon = new Client({authHeader: `Bearer ${process.env.AIMON_API_KEY}`});

// Fetch the URLs from sitemap
const aimon_urls = await fetch_from_sitemap("https://docs.aimon.ai/sitemap.xml");

// Convert the URLs to LlamaIndex documents
const documents: Document[] = [];

for (let i = 0; i < aimon_urls.length; i++) {
  const url = aimon_urls[i];
  // Intentionally not including information on toxicity detectors to demonstrate a hallucination that we will detect using AIMon.
    if(url=='https://docs.aimon.ai/category/detectors' || url=='https://docs.aimon.ai/detectors/toxicity'){
      continue;
    }
    try {
      const document = await extract_text_from_url(url); 
      documents.push(document);
    } 
    catch (error) {
      console.error(`Failed to extract text from ${url}:`, error);
    }
}

// Create embeddings and store them in a VectorStore
const index = await VectorStoreIndex.fromDocuments(documents);

// Configure a retriever
const retriever = index.asRetriever({similarityTopK: 5});

// Define a system prompt
const system_prompt = " Please be professional and polite.\
                        Answer the user's question in a single line.\
                        Even if the context lacks information to answer the question, make\
                        sure that you answer the user's question based on your own knowledge.\
                        \
                        Example:\
                        \
                        Context: AIMon provides the hallucination and toxicity detector.\
                        Query: Give me the full set of labels that the toxicity detector provides\
                        Answer: 'AIMon likely provides 'toxic', 'abuse' and 'offensive' labels.'\
                        \
                        Notice how the answer was not present in the context, but because the question was\
                        about toxicity labels, it is very likely that the labels include 'toxic', 'abuse' and 'offensive'\
                      "

// Set up the chatbot
const chatbot = new ContextChatEngine({ retriever, systemPrompt: system_prompt});

// Define your query
const query = "What is the full set of labels that AIMon's toxicity detector generates?";

// Define the instructions you want to test for compliance, in order to 
// assess how well a Large Language Model (LLM) adheres to specific instructions.
const instructions = "1. Limit the response to under 300 words.";

// Get response
const response = await chatbot.chat({message:query});

// Retrieve the context used by the LLM to generate this response
const [context, relevance_scores] = get_source_documents(response);

// Configure the AIMon hallucination detector
const detectors = { hallucination: {detector_name: "hdm-1"}};

// Call AIMon
const aimonResponse = await aimon.detect( response.response, 
                                          context, 
                                          query, 
                                          detectors, 
                                          instructions,
                                          false,          // async_mode = False
                                          true,           // publish = True 
                                          "TS_HDM1_test", // application name
                                          "gpt-4o-mini"   // model name
                                        );

console.log(`\nLLM response: ${response}`)
console.log(`\nAIMon response: ${JSON.stringify(aimonResponse)}`)


// // Saving context and generated response for debugging
// // Write the LLM response string to a text file
// fs.writeFile('response_1.txt', response.response, (err) => {
//   if (err) {
//     console.error('Error writing to text file:', err);
//   } else {
//     console.log('String has been written to response_1.txt');
//   }
// });
// const data = context.map(item => `"${item}"`).join("\n");
// // Write the context to a CSV file
// fs.writeFile('context_1', data, (err) => {
//   if (err) {
//     console.error('Error writing to CSV file:', err);
//   } else {
//     console.log('Data has been written to context_1.csv');
//   }
// });


// // //  //   Fixing the hallucination by supplying additional context   // // //  // 


// Generating documents on AIMon's toxicity detection
const document_on_detectors = await extract_text_from_url('https://docs.aimon.ai/category/detectors');
const document_on_toxicity = await extract_text_from_url('https://docs.aimon.ai/detectors/toxicity');

const updatedIndex = await VectorStoreIndex.fromDocuments([...documents, document_on_detectors, document_on_toxicity])

// Re-assemble the chatbot
const chatbot_2 = new ContextChatEngine({ retriever: updatedIndex.asRetriever({similarityTopK: 5}), systemPrompt: system_prompt});

// Repeat the same query that produced the hallucination above
const response_2 = await chatbot_2.chat({message:query});
const [context_2, relevance_scores_2] = get_source_documents(response_2);
const aimonResponse_2 = await aimon.detect( response_2.response, 
                                            context_2, 
                                            query, 
                                            detectors, 
                                            instructions,
                                            false,          // async_mode = False
                                            true,           // publish = True 
                                            "TS_HDM1_test", // application name
                                            "gpt-4o-mini"   // model name
                                          );

console.log(`\nLLM response: ${response_2}`)
console.log(`\nAIMon response: ${JSON.stringify(aimonResponse_2)}`)

// // Saving context and generated response for debugging
// // Write the LLM response string to a text file
// fs.writeFile('response_2.txt', response_2.response, (err) => {
//   if (err) {
//     console.error('Error writing to text file:', err);
//   } else {
//     console.log('String has been written to response_2.txt');
//   }
// });
// const data_2 = context_2.map(item => `"${item}"`).join("\n");
// // Write the context to a CSV file
// fs.writeFile('context_2', data_2, (err) => {
//   if (err) {
//     console.error('Error writing to CSV file:', err);
//   } else {
//     console.log('Data has been written to context_2.csv');
//   }
// });
