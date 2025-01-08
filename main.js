import fs from "fs/promises";
import ollama from "ollama";


const inputFilePath = "input.txt";
const outputFilePath = "output.txt";

const inputContent = await fs.readFile(inputFilePath, "utf-8",(err)=>{
  if(err) throw err;
  console.log("input.txt has been read.");
});

async function getChatbotResponse(inputContent) {
  // Asking ollama chatbot
  const response = await ollama.chat({
    model: "llama3.2:latest",
    messages: [{ role: "user", content: inputContent }],
  });

  // Fetching chatbot answer
  return response?.message?.content || "No response from chatbot.";
}

const chatbotResponse = await getChatbotResponse(inputContent);

// Writing chatbot answer to output.txt
await fs.writeFile(outputFilePath, chatbotResponse,(err)=>{
  if(err) throw err;
  console.log("output.txt has been written.");
});
