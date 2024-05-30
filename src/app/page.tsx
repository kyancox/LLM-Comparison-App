// Uses server by default
"use client";

import { useState, useEffect } from "react";


import PromptInput from "@/components/PromptInput";
import Model from "@/components/Model";
import Vote from "@/components/Vote";
import About from "@/components/About"

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [button, setButton] = useState(false);
  const [vote, showVote] = useState(false);

  const [responses, setResponses] = useState({ gpt: false, gemini: false, claude: false })
  const [loading, setLoading] = useState({ gpt: false, gemini: false, claude: false })

  useEffect(() => {
    if (responses.gpt && responses.gemini && responses.claude) {
      setButton(false)
      if (!prompt) return
      showVote(true)
    };
  }, [responses])

  const handleResponse = (model: string) => {
    setLoading(prev => ({ ...prev, [model]: false }))
    setResponses(prev => ({ ...prev, [model]: true }))
  }

  const handleGenerateClick = () => {
    setButton(true)
    setLoading({ gpt: true, gemini: true, claude: true })
    setResponses({ gpt: false, gemini: false, claude: false })
  }

  return (
    <div className="lg:mb-7 mb-6">
      <About button={button} />
      <PromptInput setPrompt={setPrompt} setButton={setButton}>
        <button
          id="generateButton"
          className={`m-1 px-4 py-2 rounded transition ${button ? "bg-gray-400 cursor-not-allowed" : "bg-blue-900 hover:bg-logoBlue text-white"}`}
          type="button"
          onClick={handleGenerateClick}
          disabled={button}
        >
          {button ? "Generating..." : "Generate Response"}
        </button>
      </PromptInput>

      <div className="flex flex-col lg:flex-row justify-evenly items-start ">
        <Model
          modelName="ChatGPT (OpenAI)"
          endpoint="gpt"
          modelLink="https://openai.com/chatgpt/"
          prompt={prompt}
          button={button}
          loading={loading.gpt}
          responseState={responses.gpt}
          onResponse={() => handleResponse('gpt')}
        />
        <Model
          modelName="Gemini (Google)"
          endpoint="gemini"
          modelLink="https://deepmind.google/technologies/gemini/"
          prompt={prompt}
          button={button}
          loading={loading.gemini}
          responseState={responses.gemini}
          onResponse={() => handleResponse('gemini')}
        />
        <Model
          modelName="Claude (Anthropic)"
          endpoint="claude"
          modelLink="https://www.anthropic.com/claude"
          prompt={prompt}
          button={button}
          loading={loading.claude}
          responseState={responses.claude}
          onResponse={() => handleResponse('claude')}
        />
      </div>


      {vote && <Vote prompt={prompt} button={button} />}
    </div >
  );
}
