// Import core functionality from another file
import { AimonClient } from "./AimonClient"; // Adjusted to import from the source file directly

// Example instantiation and usage (can be commented out in production)
if (require.main === module) {
  // If this script is run directly (not required elsewhere), run the example
  const client = new AimonClient("api-key", "your-email");

  async function runDemo() {
    try {
      const user = await client.getUser("user-email");
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
