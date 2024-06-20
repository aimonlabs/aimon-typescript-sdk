// Import core functionality from another file
import { AimonClient } from "./AimonClient"; // Adjusted to import from the source file directly

// Example instantiation and usage (can be commented out in production)
if (require.main === module) {
  // If this script is run directly (not required elsewhere), run the example
  const client = new AimonClient(
    "cfc819b4d923f5d86fb344655efac1cea0f0a247819716ad50c9b837fd188683",
    "ramoncelesteramos@gmail.com"
  );

  async function runDemo() {
    try {
      const user = await client.getUser("ramoncelesteramos@gmail.com");
      console.log("User details:", user);
      // Additional method calls to demonstrate usage
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  runDemo();
}

// If you intend to allow this module to be imported elsewhere:
export default AimonClient;
