import { useState } from "react";
import ModelResponse from "./ModelResponse";


interface ModelProps {
    modelName: string
    modelLink: string // for modelLink, link to chatbot or link to info??
    endpoint: string
    // children: React.ReactNode;
    prompt: string
}


export default function Model({ modelName, modelLink, endpoint, prompt }: ModelProps) {

    const validVersions: { [key: string]: string[] } = {
        'gpt': ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'gpt-4o'],
        'gemini': ['gemini-pro', 'gemini-1.5-flash', 'gemini-1.5-pro-latest'],
        'claude': ['opus', 'sonnet', 'haiku']
    }

    const [version, setVerison] = useState<string>(validVersions[endpoint][0] as string);

    const selectedVersion = (validVersions[endpoint]).includes(version) ? version : validVersions[endpoint][0];

    const method = (prompt: string) => {

        return '';
     };


    return (
        <div>
            <a href={modelLink}>{modelName}</a>

            <label htmlFor="version">Version:</label>
            <select
                id="version"
                value={selectedVersion}
                onChange={(e) => setVerison(e.target.value)}
            >
                {validVersions[endpoint].map((version) => (
                    <option key={version} value={version}>
                        {version}
                    </option>
                ))}
            </select>

            <ModelResponse />
        </div>
    );

}