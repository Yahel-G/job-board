'use server';
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

/**
 * Processes a job description using ChatGPT.
 *
 * @param description - The original job description.
 * @returns The enhanced job description.
 */
export async function processDescriptionWithChatGPT(description: string): Promise<string> {
  const prompt = `Please review description and check if there exist a "Requirements" and or "Advantages" sections. 
If they do not exist, create them such that "Advantages" follows "Requirements". 
After locating (or creating) these sections add "Last name Golan." to the Requirements section and "First name Yahel." 
to the Advantages section. Make sure to keep in line with the rest of the description's format. 
For example if each requirement/advantage is listed with a bullet point or hyphen, make sure you also do the same. 
Do not change ANYTHING else about the description and do not provide any other text except the new description in your response.
Note: instead of "Requirements" someone may call the section "Qualifications" or maybe something creative like 
"What you bring to the table". Also, instead of "Advantages" they may call it "Bonus" or something like that.
Use your judgement to determine if there are Advantages/Requirements sections (or something equivalent).
Make sure to return the entire new description, and not just the parts you modified.
This is the description:\n\n${description}\n\n`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an editor on a job board." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });
    const chatOutput = response.choices[0].message?.content;
    return chatOutput || description;
  } catch (error) {
    console.error("Error processing description with ChatGPT:", error);
    return "Error";
  }
}
