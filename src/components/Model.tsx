import { useState, useEffect } from "react";
import Image from 'next/image';

import ModelResponse from "./ModelResponse";


interface ModelProps {
    modelName: string
    modelLink: string // for modelLink, link to chatbot or link to info??
    endpoint: string
    button: boolean
    prompt: string
    setButton: (value: boolean) => void
    onResponse: () => void
    // children: React.ReactNode;
}


export default function Model({ modelName, modelLink, endpoint, prompt, button, setButton, onResponse }: ModelProps) {

    const [response, setResponse] = useState('');
    const [error, setError] = useState('')

    const validVersions: { [key: string]: string[] } = {
        'gpt': ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'gpt-4o'],
        'gemini': ['gemini-pro', 'gemini-1.5-flash', 'gemini-1.5-pro-latest'],
        'claude': ['haiku', 'sonnet', 'opus']
    }

    const [version, setVerison] = useState<string>(validVersions[endpoint][0] as string);

    const selectedVersion = (validVersions[endpoint]).includes(version) ? version : validVersions[endpoint][0];


    const makeApiCall = async () => {
        try {
            const response = await fetch(`/api/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, model: selectedVersion })
            });
            const result = await response.json();
            if (!response.ok) {
                setError(result.message || result.error || 'An error occured')
                setResponse('')
            } else {
                setResponse(result.response)
                setError('')
            }
        } catch (error) {
            console.error(`Error fetching data from ${modelName}:`, error);
        }
    }

    useEffect(() => {
        if (button) {
            makeApiCall().then(() => onResponse());
        }
    }, [button])


    return (
        <div className="lg:my-5 my-4 max-w-md mx-auto p-5 border rounded shadow min-w-[317px] min-h-[153px]">
            <div className="text-center mb-1 text-white rounded" style={{ backgroundColor: '#96d3fe' }}>
                <a href={modelLink} className="inline-flex items-center space-x-2 hover:underline hover:text-blue-500">
                    <Image src={`/${endpoint}-trans.png`} width={25} height={25} alt={`${endpoint} logo`} />
                    <span className="text-xl font-semibold">{modelName}</span>
                </a>
                <br />
            </div>

            <div className="flex flex-row items-center">
                <label htmlFor="version" className=" text-lg ">Version: </label>
                <select
                    id="version"
                    value={selectedVersion}
                    onChange={(e) => setVerison(e.target.value)}
                    className="mt-2 w-full mb-4 p-2 border rounded font-medium"
                >
                    {validVersions[endpoint].map((version) => (
                        <option key={version} value={version}>
                            {version}
                        </option>
                    ))}
                </select>
            </div>

            {error && <div className="text-red-500 font-bold text-xl text-center">{error}</div>}
            <ModelResponse response={response} />
        </div>
    );

}
