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

      // List model types
      const listModelTypes = await client.listModelTypes();
      console.log(listModelTypes);

      // Create new model
      const myModel = await client.createModel(
        "your_model_name",
        listModelTypes[0],
        "Your description",
        { metadata: "metadata" }
      );
      console.log(myModel);

      // Create application
      const myApplication = await client.createApplication(
        "my_test_application",
        myModel,
        "evaluation",
        "summarization",
        { metadata: "metadata" }
      );
      console.log(myApplication);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  runDemo();
}

// If you intend to allow this module to be imported elsewhere:
export default AimonClient;
