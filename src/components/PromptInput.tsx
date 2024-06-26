import { useState, useRef, useEffect } from 'react';

interface PromptProps {
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
    children: React.ReactNode
    setButton: (value: boolean) => void
}

export default function PromptInput({ setPrompt, children }: PromptProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, []);

    // Clicks the 'Generate Response' button if the Enter key is pressed in textarea
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            document.getElementById('generateButton')?.click();
        }

    }

    return (
        <div className="flex flex-col justify-center items-center text-center">
                <h1 className='font-bold text-2xl text-gray-800'>Enter your prompt below:</h1>
                <textarea
                    ref={textareaRef}
                    className='my-3 border rounded shadow p-3 md:container md:w-full md:max-w-lg w-10/12'
                    placeholder="Please enter a prompt."
                    onKeyDown={handleKeyDown}
                    onChange={handleInput}
                    style={{ resize: 'none', overflow: 'hidden' }}
                    rows={3}
                ></textarea>
                <div>
                    {children}
                </div>
        </div>
    );
}

