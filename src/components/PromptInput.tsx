import { useState } from 'react';

interface PromptProps {
    // prompt: string,
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
    // handleSubmit: (prompt: string) => void;
    handleSubmit: () => void
}

export default function PromptInput({setPrompt, handleSubmit}: PromptProps) {


 

    return (
        <div>
            <div>
                <h1>Enter your prompt below:</h1>
                <textarea
                    placeholder="Please enter a prompt."
                    onChange={(e) => setPrompt(e.target.value)}
                    cols={30}
                    rows={10}
                ></textarea>
            </div>
            <button type="button" onClick={handleSubmit}>Upload Prompt</button>
        </div>
    );
}

