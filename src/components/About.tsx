import { useEffect, useState } from 'react';

import Link from 'next/link';

interface AboutProps {
    button: boolean
}

export default function About({button}: AboutProps) {
    const [queryCount, setQueryCount] = useState(0);

    useEffect(() => {
        const fetchQueries = async () => {
            const response = await fetch('/api/queries', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()
            setQueryCount(data.count)
            console.log(queryCount)
        };
        fetchQueries();
    }, [button])



    return (
        <div className='text-center p-4 lg:w-10/12 mx-auto flex flex-col items-center  '>
            <p className="lg:text-2xl text-xl border rounded shadow bg-logoGrey p-4 font-semibold">
                LLM Comparison is a web app that allows you to compare responses from leading Large Language Models (LLMs) like <Link href="https://openai.com/chatgpt/" className='text-blue-900 hover:underline' target="_blank">ChatGPT</Link>, <Link href="https://deepmind.google/technologies/gemini/" className='text-blue-900 hover:underline' target="_blank">Gemini</Link>, and <Link href="https://www.anthropic.com/claude" className='text-blue-900 hover:underline' target="_blank">Claude</Link>. Input a prompt, generate responses, and vote for your favorite to see how each model performs.
            </p>

            <p className='mt-4'>
                <span className='font-bold'>Note:</span> Users can only query premium models up to 3 times a day. You can learn more about premium models on the <Link href="/about" className='text-blue-900 hover:underline'>about</Link> page.
            </p>

            <p className="mt-1">
                You have made <span className='font-bold'>{queryCount || 0}/3 premium queries</span> today.
            </p>


        </div>


    );
}
