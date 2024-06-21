# Aimon SDK

Aimon SDK provides a simple and efficient way to interact with the Aimon API, allowing users to manage datasets, models, applications, evaluations, and runs programmatically. This SDK is built using TypeScript to provide type safety and ease of use.

## Features

- Manage datasets
- Create and manage models
- Handle applications and their stages
- Conduct evaluations and observe results

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before installing the Aimon SDK, you will need:

- Node.js (12.x or higher recommended)
- npm (or Yarn)

### Installing

To use the Aimon SDK in your project, install it via npm:

```bash
npm install aimon-sdk
```

Or if you are using Yarn:

```bash
yarn add aimon-sdk
```

### Usage

Here's a quick example to get you started:

```typescript
import AimonClient from "aimon-sdk";

const client = new AimonClient("your-api-key", "your-email@example.com");

async function getUserDetails() {
  try {
    const userDetails = await client.getUser("user-email@example.com");
    console.log(userDetails);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

getUserDetails();
```

## Development

If you clone the repository for development or if you want to contribute, here are the steps to build the SDK locally:

### Building the SDK

If you make changes to the SDK, particularly to `index.ts` or any of the TypeScript files, you'll need to rebuild the project. You can do this by running:

```bash
npm run build
```

This command compiles the TypeScript files into JavaScript in the `dist` directory, making it ready for publication or local testing.

### Running the SDK Locally

To run the SDK locally, especially if you want to try out changes, use:

```bash
npm start
```

This command will execute the main entry script using Node.js. Ensure you've built the SDK first as changes won't be reflected until you rebuild after modifications.
