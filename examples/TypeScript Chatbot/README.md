# AIMon Demo - Chatbot application

This is a simple chatbot application built with LlamaIndex and TypeScript, which uses AIMon to detect hallucinations on the LLM response to user queries. To keep the demo simple, this chatbot application intentionally crawls a [single webpage](http://paulgraham.com/worked.html). In case of queries not related to the webpage, the chatbot is likely to respond out of its own learned knowledge, which will be detected by the AIMon's hallucation detector.

## Example

![image info](./screenshot.png)

## Installation and Setup

1. Make sure you have the AIMon API key, which can be obtained by signing up on the [AIMon website](https://www.app.aimon.ai/llmapps).

2. Navigate to the current repository: `cd repository`

3. Install the dependencies: `npm install`

4. Add the keys (OPENAI_API_KEY = "your_key", AIMON_API_KEY = "your_key") to a .env file

5. Run the backend server script: `node chatbot_aimon.js`

6. When the server starts running, open the [index.html](./index.html) file to interact with the chatbot.
