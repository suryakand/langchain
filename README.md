# Getting Started

Basic project to show the usage of Langchain along with Google Gemini LLM.

# Prerequisites

Before you begin, make sure you have:

- **Node.js installed**  
    Download and install Node.js from [nodejs.org](https://nodejs.org/).

- **Google Gemini API Key**  
    Sign up for access and create an API key at [Google AI Studio](https://aistudio.google.com/app/apikey).

- **Basic knowledge of TypeScript**  
    Familiarity with TypeScript syntax and concepts is recommended.

- **Understanding of Large Language Models (LLMs)**  
    You should know what LLMs are and their typical use cases. I am planning to write a separate article to talk more about LLMs in general.


## 1. Clone the Repository

```bash
git clone https://github.com/suryakand/langchain.git
cd langchain
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Update Environment varibale
Rename the .env.example file to .env and update the `GOOGLE_API_KEY` environment variable (see above how to get the key in `Prerequisites` section).

## 4. Run the Project

```bash
npm start
```

## 4. Run the Tool and Agent Example
```bash
npm run start-tools-example
```

## 4. Additional Experiements
You can update the prompt and input text as needed in the `index.ts` file to try different things.
