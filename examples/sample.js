import Aimon from "aimon";

// Create the AIMon client. You would need an API Key (that can be retrieved from the UI in your user profile).
const aimon = new Aimon({
  apiKey: `Bearer <YOUR_API_KEY>`,
});

async function main() {
  // Pick from existing model model types in the company. These are created by you or other member of your organization.
  // The AIMon client has a convenience function to easily retrieve this.
  const modelTypes = await aimon.models.list();
  console.log(modelTypes);

  // Using the AIMon client, create or get a model for a given model type.
  // This API will automatically create a new model if it does not exist.
  const myModel = await aimon.models.create({
    name: "my_gpt4_model_fine_tuned",
    type: "GPT-4",
    description:
      "This model is a GPT4 based model and is fine tuned on the awesome_finetuning dataset",
  });
  console.log(myModel);

  // Get user info
  const user = await aimon.users.retrieve({
    email: "<user_email>",
  });
  console.log(user);

  // Using the AIMon client, create or get an existing application
  const myApplication = await aimon.applications.create({
    name: "my_llm_summarization_app",
    model_name: myModel.name,
    type: "summarization",
    stage: "evaluation",
    user_id: user.id,
  });
  console.log(myApplication);

  const metrics = await aimon.applications.evaluations.metrics.list({
    application_name: "<application_name>",
  });
  console.log(metrics);
}

main();
