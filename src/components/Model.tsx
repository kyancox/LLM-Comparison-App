import { useState, useEffect } from "react";
import Image from 'next/image';
import ClipLoader from "react-spinners/ClipLoader"

import ModelResponse from "./ModelResponse";


interface ModelProps {
    modelName: string
    modelLink: string 
    endpoint: string
    button: boolean
    prompt: string
    loading: boolean
    responseState: boolean
    onResponse: () => void
    // children: React.ReactNode;
}


export default function Model({ modelName, modelLink, endpoint, prompt, button, loading, responseState, onResponse }: ModelProps) {

    const [response, setResponse] = useState('');
    const [error, setError] = useState('')

    const validVersions: { [key: string]: string[] } = {
        'gpt': ['GPT-3.5 Turbo', 'GPT-4', 'GPT-4 Turbo', 'GPT-4o', 'GPT-4o mini'],
        'gemini': ['Gemini 1.0 Pro', 'Gemini 1.5 Flash', 'Gemini 1.5 Pro'],
        'claude': ['Claude 3 Haiku', 'Claude 3 Sonnet', 'Claude 3 Opus', 'Claude 3.5 Sonnet']
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

    const backgroundColors: { [key: string]: string } = {
        'gpt': 'rgba(14,169,130,255)',
        'gemini': '#000000',
        'claude': 'rgba(210,156,118,255)'
    }

    return (
        <div className="lg:my-5 my-4 p-5 border rounded shadow mx-auto lg:w-11/12 lg:max-w-md md:max-w-xl md:w-full w-11/12">
            <div className="text-center text-white rounded" style={{ backgroundColor: backgroundColors[endpoint] }}>
                <a href={modelLink} target='_blank' className="inline-flex my-1 items-center space-x-2 hover:underline">
                    <Image src={`/${endpoint}-trans.png`} width={25} height={25} alt={`${endpoint} logo`} />
                    <span className="text-xl font-semibold">{modelName}</span>
                </a>
                <br />
            </div>

            <div className="flex flex-row items-center my-2">
                <label htmlFor="version" className="text-lg h-full ml-0.5 mr-2">Version: </label>
                <select
                    id="version"
                    value={selectedVersion}
                    onChange={(e) => setVerison(e.target.value)}
                    className="w-full p-2 border rounded font-medium"
                >
                    {validVersions[endpoint].map((version) => (
                        <option key={version} value={version}>
                            {version}
                        </option>
                    ))}
                </select>
            </div>

            {(loading) && (
                <div className="flex justify-center my-4">
                    <ClipLoader size={35} color={"#123abc"} loading={true} />
                </div>
            )}

            {error && <div className="text-red-500 font-bold text-xl text-center">{error}</div>}
            {responseState && <ModelResponse response={response} />}
        </div>
    );

}
