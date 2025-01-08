import { promises as fs } from "fs";
import ollama from "ollama";

async function runChat() {
  const inputFilePath = "Assignment-15-input.txt";
  const outputFilePath = "Assignment-15-output.txt";

  try {
    if (!await fs.access(inputFilePath).catch(() => false)) {
      throw new Error(`Input file not found: ${inputFilePath}`);
    }
    const inputContent = await fs.readFile(inputFilePath, "utf-8");
    const questions = inputContent.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    if (questions.length === 0) {
      throw new Error("Input file is empty or contains only blank lines.");
    }
    const responses = [];
    for (const question of questions) {
      console.log(`Processing question: "${question}"`);
      const response = await ollama.chat({
        model: "llama3.2:latest",
        messages: [{ role: "user", content: question }],
      });
      const answer = response?.message?.content || "No response from chatbot.";
      responses.push(answer);
    }
    const outputContent = responses.join("\n\n");
    await fs.writeFile(outputFilePath, outputContent, "utf-8");
    console.log("Chatbot responses have been saved to output.txt.");
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}
runChat();
