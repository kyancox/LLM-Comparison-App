// Uses server by default 
"use client"

import { useState } from "react";

import PromptInput from "@/components/PromptInput";
import Model from "@/components/Model";
import ModelResponse from "@/components/ModelResponse";


export default function Home() {

  // need prompt outside of component because it needs to be used in the form
  // solution: prompt is used in a single function 

  const [prompt, setPrompt] = useState('');

  const handleSubmit = (prompt: string) => { 
    // sends prompt to different API forms. 
  };


  return (
    <>

      <PromptInput prompt={prompt} setPrompt={setPrompt} handleSubmit={handleSubmit}></PromptInput>

      <br />

      <Model modelName="ChatGPT (OpenAI)" endpoint="gpt" modelLink="https://openai.com/chatgpt/" />
      <Model modelName="Gemini (Google)" endpoint="gemini" modelLink="https://www.anthropic.com/claude" />
      <Model modelName="Claude (Anthropic)" endpoint="claude" modelLink="https://deepmind.google/technologies/gemini/" />






    </>
  );
}