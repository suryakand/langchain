import "dotenv/config"; // This will load environment variables from .env
import { AIMessage, HumanMessage, SystemMessage, ToolMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import { Tool } from "@langchain/core/tools";

export type TodoStatus = "pending" | "in-progress" | "completed";

export interface TodoTask {
    taskId: string;
    description: string;
    dayOfWeek: string; // e.g., "Monday", "Tuesday", etc.
    status: TodoStatus;
}

const todos: Array<TodoTask> = [
    {
        "taskId": "1",
        "description": "Pay electricity bill",
        "dayOfWeek": "Monday",
        "status": "pending"
    },
    {
        "taskId": "2",
        "description": "Watch an online course on data analysis",
        "dayOfWeek": "Tuesday",
        "status": "in-progress"
    },
    {
        "taskId": "3",
        "description": "Learn a new programming language",
        "dayOfWeek": "Wednesday",
        "status": "pending"
    },
    {
        "taskId": "4",
        "description": "Pay internet bill",
        "dayOfWeek": "Thursday",
        "status": "completed"
    },
    {
        "taskId": "5",
        "description": "Pay credit card bill",
        "dayOfWeek": "Friday",
        "status": "in-progress"
    },
    {
        "taskId": "6",
        "description": "Practice public speaking skills",
        "dayOfWeek": "Saturday",
        "status": "pending"
    },
    {
        "taskId": "7",
        "description": "Read a book on personal finance",
        "dayOfWeek": "Sunday",
        "status": "in-progress"
    },
    {
        "taskId": "8",
        "description": "Go grocery shopping",
        "dayOfWeek": "Monday",
        "status": "in-progress"
    },
    {
        "taskId": "9",
        "description": "Organize workspace",
        "dayOfWeek": "Tuesday",
        "status": "completed"
    },
    {
        "taskId": "10",
        "description": "Write a blog post",
        "dayOfWeek": "Wednesday",
        "status": "pending"
    }
];

// Custom tool to return todo tasks
export class TodoTool extends Tool {
    name = 'todo_tool';
    description = "Returns a list todo tasks";

    /**
     * Returns all tasks for a given day of the week.
     */    
    protected _call(): Promise<string> {
        // In a real-world scenario, you might fetch this data from a database or an API.
        return Promise.resolve(JSON.stringify(todos)); 
    }
}

// Initialize the Gemini model
const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-2.0-flash-lite",
    temperature: 0.7,
});

// Tools are used by LLMs to interact with external data or services.
const tools = [new TodoTool()];

// Create a system message to provide context to the model
const systemPrompt = new SystemMessage(`
    You are a helpful assistant that can read todo tasks and respond to user queries.
    You can use the todo_tool to get a list of tasks.
    Example query: "Show my pending tasks?"`
);

// ================== Using the Agent to handle tool calls ==================
import { AgentExecutor } from "langchain/agents";
import { createToolCallingAgent } from "langchain/agents";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";

async function executeUserQueryWithAgent(userQuery: string) {
    const prompt = ChatPromptTemplate.fromMessages([
        systemPrompt,
        new MessagesPlaceholder("chat_history"),
        new MessagesPlaceholder("user_query"),
        new MessagesPlaceholder("agent_scratchpad"),
    ]);

    // Create the agent with the model, tools, and prompt
    const agent = await createToolCallingAgent({ llm: model, tools, prompt });

    // Create an AgentExecutor to handle the agent's execution
    const agentExecutor = new AgentExecutor({
        agent,
        tools,
    });

    // Invoke the agent with the user's query
    const agentResponse = await agentExecutor.invoke({user_query: userQuery, chat_history: []});
    console.log("Agent response:", agentResponse);
}

// Example usage
const userQuery = "Show my pending tasks?";
executeUserQueryWithAgent(userQuery).then(() => {
    console.log("Execution completed.");
}).catch((error) => {
    console.error("Error during Execution:", error);
});