// Uses server by default
"use client";

import { useState, useEffect } from "react";


import PromptInput from "@/components/PromptInput";
import Model from "@/components/Model";
import ModelResponse from "@/components/ModelResponse";
import Vote from "@/components/Vote";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [button, setButton] = useState(false);
  const [vote, showVote] = useState(false);

  const [responses, setResponses] = useState({ gpt: false, gemini: false, claude: false })

  useEffect(() => {
    if (responses.gpt && responses.gemini && responses.claude) {
      setButton(false)
      showVote(true)
    };
  }, [responses])

  const handleResponse = (model: string) => {
    setResponses(prev => ({ ...prev, [model]: true }))
  }

  return (
    <>
      <PromptInput setPrompt={setPrompt} setButton={setButton}>
        <button
          id="generateButton"
          className={`m-2 px-4 py-2 rounded transition ${button ? "bg-gray-400 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-900 text-white"}`}
          type="button"
          onClick={() => setButton(true)}
          disabled={button}
        >
          {button ? "Generating..." : "Generate Response"}
        </button>
      </PromptInput>

      <div className="mt-10 flex justify-evenly items-start ">
        <Model
          modelName="ChatGPT (OpenAI)"
          endpoint="gpt"
          modelLink="https://openai.com/chatgpt/"
          prompt={prompt}
          button={button}
          setButton={setButton}
          onResponse={() => handleResponse('gpt')}
        />
        <Model
          modelName="Gemini (Google)"
          endpoint="gemini"
          modelLink="https://deepmind.google/technologies/gemini/"
          prompt={prompt}
          button={button}
          setButton={setButton}
          onResponse={() => handleResponse('gemini')}
        />
        <Model
          modelName="Claude (Anthropic)"
          endpoint="claude"
          modelLink="https://www.anthropic.com/claude"
          prompt={prompt}
          button={button}
          setButton={setButton}
          onResponse={() => handleResponse('claude')}
        />
      </div>


      {vote && <Vote prompt={prompt} button={button} />}
    </>
  );
}
