"use server";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const AIGenerate = async (prompt: string) => {
  const { error, output_text } = await client.responses.create({
    model: "gpt-5-mini",
    input: prompt,
  });

  if (error) throw new Error(error.message);
  return output_text;
};
