import { useEffect, useState } from 'react';

export default function About() {
    const [queryCount, setQueryCount] = useState(0);

    useEffect(() => {
        const fetchQueries = async () => {
            const response = await fetch('/api/queries', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()
            setQueryCount(data.count)
        };
        fetchQueries();
    }, [])



    return (
        <div className='text-center p-5 flex flex-col items-center '>
            <p className="text-xl ">
                LLM Comparison is a web app that allows you to compare responses from leading Large Language Models (LLMs) like ChatGPT, Gemini, and Claude. Input a prompt, generate responses, and vote for your favorite to see how each model performs.
            </p>
            <p>Note: Users can only query premium models up to 3 times a day. Premium models include:</p>

            <div>
                <h3 className="text-md font-semibold mt-4">ChatGPT (OpenAI)</h3>

                    <ul className="text-sm text-left list-disc list-inside ml-4">

                        <li>gpt-4</li>
                        <li>gpt-4-turbo</li>
                        <li>gpt-4o</li>


                    </ul>

            </div>

            <h3 className="text-md font-semibold mt-4">Gemini (Google)</h3>
            <ul className="text-sm text-left list-disc list-inside ml-4">
                <li>gemini-1.5-flash</li>
                <li>gemini-1.5-pro-latest</li>
            </ul>

            <h3 className="text-md font-semibold mt-4">Claude (Anthropic)</h3>
            <ul className="text-sm list-disc list-inside ml-4">
                <li>opus</li>
            </ul>

            <p className="text-center mt-4">You have made {queryCount} premium queries today.</p>
        </div>


    );
}
