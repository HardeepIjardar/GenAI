import fs from "fs/promises";
import ollama from "ollama";

const inputFilePath = "a15in.txt";
const outputFilePath = "a15out.txt";

async function getChatbotResponse(inputContent) {
  // chatbot ko sawal pucha
  const response = await ollama.chat({
    model: "llama3.2:latest",
    messages: [{ role: "user", content: inputContent }],
  });

  // chatbot se answer lekar aaya
  return response?.message?.content || "No response from chatbot.";
}

async function processQuestions() {
  try {
    const inputContent = await fs.readFile(inputFilePath, "utf-8");
    const questions = inputContent.split("\n").filter(Boolean);

    const responses = await Promise.all(
      questions.map((question) => getChatbotResponse(question))
    );

    const outputContent = responses.join("\n");
    await fs.writeFile(outputFilePath, outputContent);

    console.log("All questions have been processed and answers written to a15out.txt.");
  } catch (err) {
    console.error("Error processing questions:", err);
  }
}

processQuestions();
