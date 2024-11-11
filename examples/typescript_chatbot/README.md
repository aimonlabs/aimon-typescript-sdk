# AIMon Demo - Chatbot application

This is a simple chatbot application built with LlamaIndex and TypeScript, which uses AIMon to detect hallucinations on the LLM response to user queries. To keep the demo simple, this chatbot application intentionally crawls a [single webpage](http://paulgraham.com/worked.html). In case of queries not related to the webpage, the chatbot is likely to respond out of its own learned knowledge, which will be detected by the AIMon's hallucation detector.

## Example

![image info](./screenshot.png)

## Installation and Setup

1. Make sure you have the AIMon API key, which can be obtained by signing up on the [AIMon website](https://www.app.aimon.ai/llmapps).

2. Navigate to the current repository: `cd repository`

3. Install the dependencies: `npm install`

4. Set the following keys as environment variables\
`set OPENAI_API_KEY="your_openai_key"`\
`set AIMON_API_KEY="your_aimon_key"` 

5. Run the backend server script: `node chatbot_aimon.js`

6. When the server starts running, open the [index.html](./index.html) file to interact with the chatbot.

### Code Walkthough

The backend server runs on localhost on port 3000, and accepts POST requests, sent via the [index.html](./index.html) file. The POST request body consists of two components:
 1. the user's query and 
 2. instructions provided for the AIMon detectors.

#### Chat Engine (powered by LlamaIndex and OpenAI)

The application starts by loading data on [Paul Graham's work history](https://paulgraham.com/worked.html). The `gpt-4o` Large Language Model (LLM) from OpenAI is configured globally with chunksize set to 256 and overlap set to 64. Embeddings are loaded from persisted storage if previously calculated; otherwise are generated using the global LLM configurations. After this a chat engine is constructed which generates responses to user queries based on the provided context, as well as the previous QA history of the current session.

#### Integration with AIMon Detectors

Our example uses the AIMon's [Hallucination detector](https://docs.aimon.ai/concepts/detectors/hallucination/) to analyze and detect hallucinations in the LLM's response. The `aimon.detect` function takes the LLM's response, the respective context used to generate that response, user query and instructions and the choice of detectors as arguments and returns the AIMon response along with a hallucination score and metadata. 4 other detectors, namely [Conciseness, Completeness, Instruction-Adherence and Toxicity](https://docs.aimon.ai/category/detectors) can be included as well, by adjusting the decorators variable in the `chatbot_aimon.js` file.
