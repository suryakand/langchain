import "dotenv/config"; // This will load environment variables from .env
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

// Initialize the Gemini model
const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-2.0-flash-lite",
    temperature: 0.7,
});

// Create a prompt template for translation
const prompt = new PromptTemplate({
    template: "Translate the following English text to French: {text}",
    inputVariables: ["text"],
});

// Create a chain that combines the model and the prompt
const chain = prompt.pipe(model);

// Chain will handle the formatting of the prompt automatically (see below), so you don't need to call `format` separately.
// const formattedPrompt = await prompt.format({ text: "Hello, world!" }); 

// Function to translate text using the chain. 
// Note that we are not formatting the prompt here, as the chain handles it.
async function translateToFrench(text: string) {
    const response = await chain.invoke({ text });
    console.log("French translation:", response.text);
}

// Example usage
translateToFrench("How are you?").then(() => {
    console.log("Translation completed.");
}).catch((error) => {
    console.error("Error during translation:", error);
});
