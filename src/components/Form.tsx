'use client'
import { useState } from "react";

export default function Form() {

    const [response, setResponse] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>("Simply respond with the text: 'Please enter a prompt!'");
    const [model, setModel] = useState<string>("gpt");
    const [version, setVerison] = useState<string>("gpt-3.5-turbo");


    const validModels = ['gpt', 'gemini', 'claude']
    const selectedModel = validModels.includes(model) ? model : validModels[0];

    const validVersions: { [key: string]: string[] } = {
        'gpt': ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'gpt-4o'],
        'gemini': ['gemini-pro', 'gemini-1.5-flash', 'gemini-1.5-pro-latest'],
        'claude': ['opus', 'sonnet', 'haiku']
    }
    const selectedVersion = (validVersions[model]).includes(version) ? version : validVersions[model][0];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`/api/${model}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, model: version }),
        })
            .then((res) => res.json())
            .then((data) => {
                setResponse(data.response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="prompt">Prompt:</label>
                <input
                    type="text"
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="model">Model:</label>
                <select
                    id="model"
                    value={selectedModel}
                    onChange={(e) => setModel(e.target.value)}
                >
                    {validModels.map((model) => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="version">Version:</label>
                <select
                    id="version"
                    value={selectedVersion}
                    onChange={(e) => setVerison(e.target.value)}
                >
                    {validVersions[selectedModel].map((version) => (
                        <option key={version} value={version}>
                            {version}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Submit</button>
          {response && <div>Response: {response}</div>}

        </form>
    );

}
