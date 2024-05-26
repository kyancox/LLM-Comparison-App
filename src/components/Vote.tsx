import { useState, useEffect } from 'react';

import ModelLabel from './ModelLabel';
import Thanks from './Thanks';

interface VoteProps {
    prompt: string
    button: boolean
}

export default function Vote({ prompt, button }: VoteProps) {
    const [category, setCategory] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [selection, setSelection] = useState('');
    const [voteButton, setVoteButton] = useState(false)

    const generateCategory = async () => {
        console.log(`prompt: ${prompt}`)
        console.log(`button: ${button}`)
        if (prompt) {
            console.log('generateCategory() called');
            try {
                const categoryPrompt = `The prompt below is a user's prompt to a Large Language Model. 
                Your job is to categorize the prompt in its entirety into one word. This categorization
                will be used to categorize many prompts for some external data. Your response should only 
                contain ONE SINGLE WORD which is the category that this prompt falls in. The prompt is:
                "${prompt}"`;

                // Using Google Gemini to fetch category because API call is free of charge
                const response = await fetch(`/api/gemini`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: categoryPrompt })
                });
                const result = await response.json();
                const categoryResponse = result.response;
                setCategory(categoryResponse);
            } catch (error) {
                console.error(`Error fetching category data`, error);
            }
        }
    };

    const submitVote = async () => {
        const votes = await fetch(`/api/votes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: selection, category: isChecked ? category : '' })
        });

        setVoteButton(true)
    };

    useEffect(() => {
        console.log('useEffect called on initial render');
        generateCategory();
    }, []); // Empty dependency array ensures this runs only on initial render

    useEffect(() => {
        if (voteButton) {
            setVoteButton(false)
        }
        if (button) {
            generateCategory();
        }
    }, [button]);

    const models: { [key: string]: string } = {
        'gpt': 'ChatGPT',
        'gemini': 'Gemini',
        'claude': 'Claude'
    }


    return (
        <>
                <div className='mt-8 flex flex-col items-center space-y-4'>
                    <p className="text-gray-900 font-medium text-xl">Which response did you like best?</p>
                    <div className='flex flex-row space-x-10 justify-center items-end'>
                        {
                            Object.entries(models).map(([endpoint, model]) => (
                                <ModelLabel key={endpoint} endpoint={endpoint} model={model} selection={selection} setSelection={setSelection} />
                            ))
                        }
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => setIsChecked(!isChecked)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="text-gray-800 font-medium text-lg">Include Prompt Category in Vote</span>
                        </label>
                        <div className="text-blue-600">
                            <span className="font-semibold">Category:</span> {category}
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button
                        className={`m-2 px-4 py-2 rounded transition ${voteButton || !selection ? "bg-gray-400 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-900 text-white"}`}
                        type="button"
                        onClick={submitVote}
                        disabled={voteButton || button}
                    >
                        {voteButton ? 'Vote Submitted!' : 'Submit Vote'}
                    </button>
                </div>
                {voteButton && <Thanks/>}
        </>
    );
}
