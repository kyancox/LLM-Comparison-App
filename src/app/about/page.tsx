import Link from "next/link"


export default function Home() {

    return (
        <div className="text-center mx-auto mb-8 lg:w-5/12 w-10/12">
            <h1 className="text-3xl font-semibold my-4">About</h1>
            <p className="border rounded shadow p-4 bg-logoGrey">LLM Comparison is a web application that allows users to compare responses from leading Large Language Models (LLMs) such 
                as <Link href="https://openai.com/chatgpt/" className='text-blue-900 hover:underline' target="_blank">OpenAI's ChatGPT</Link>, <Link href="https://deepmind.google/technologies/gemini/" className='text-blue-900 hover:underline' target="_blank">Google's Gemini</Link>, and <Link href="https://www.anthropic.com/claude" className='text-blue-900 hover:underline' target="_blank">Anthropic's Claude</Link>
                . Users can input prompts, generate responses from various LLMs, and vote on their favorite responses. The app supports multiple versions of each model and includes visualizations of voting data using charts. To ensure fair usage, query limits are enforced for premium models, allowing up to <span className="font-semibold">three queries per day.</span></p>
            <h1 className="text-3xl font-semibold my-4">Models</h1>
            <p className="border rounded shadow p-4 bg-logoGrey">
                <Link href="https://openai.com/chatgpt/" className='text-blue-900 hover:underline' target="_blank">OpenAI's ChatGPT</Link>, <Link href="https://deepmind.google/technologies/gemini/" className='text-blue-900 hover:underline' target="_blank">Google's Gemini</Link>, and <Link href="https://www.anthropic.com/claude" className='text-blue-900 hover:underline' target="_blank">Anthropic's Claude</Link> were
                selected for this project because they are among the most popular and powerful Large Language Models currently available to the general public. You can read about the capabilities of the models and their different versions below, with <span className="font-semibold">descriptions directly from their respective documentation</span>.
                <br/>
                <br/>
                Models below with <span className="text-yellow-600">yellow text</span> are <span className="font-semibold">premium models</span>. These models are considered premium because querying them via APIs cost fairly more than other models, hence why users are only allowed to query premium models <span className="font-semibold">3 times a day</span>.
            </p>

            <div className=" mx-auto">
                <Link href="https://platform.openai.com/docs/models" target="_blank" className="text-blue-900 hover:underline"><p className="text-2xl my-4">Model Descriptions from OpenAI:</p></Link>
                <table className="table-fixed mx-auto mt-4 border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 w-1/2">Model</th>
                            <th className="border border-gray-300 px-4 py-2 w-1/2">Capabilities</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-yellow-600">
                                GPT-4o
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                The fastest and most affordable flagship model
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-yellow-600">
                                GPT-4 Turbo and GPT-4
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                The previous set of high-intelligence models
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                GPT-3.5 Turbo
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                A fast, inexpensive model for simple tasks
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Link href="https://ai.google.dev/gemini-api/docs/models/gemini" target="_blank" className="text-blue-900 hover:underline"><p className="text-2xl my-4">Model Descriptions from Google:</p></Link>
                <table className="table-fixed mx-auto mt-4 border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 w-1/2">Model</th>
                            <th className="border border-gray-300 px-4 py-2 w-1/2">Capabilities</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-yellow-600">
                                Gemini 1.5 Pro
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Complex reasoning tasks such as code and text generation, text editing, problem solving, data extraction and generation
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-yellow-600">
                                Gemini 1.5 Flash
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Fast and versatile performance across a diverse variety of tasks
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                Gemini 1.0 Pro
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Natural language tasks, multi-turn text and code chat, and code generation
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Link href="https://docs.anthropic.com/en/docs/models-overview#model-comparison" target="_blank" className="text-blue-900 hover:underline"><p className="text-2xl my-4">Model Descriptions from Anthropic:</p></Link>
                <table className="table-fixed mx-auto mt-4 border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 w-1/2">Model</th>
                            <th className="border border-gray-300 px-4 py-2 w-1/2">Capabilities</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-yellow-600">
                                Claude 3 Opus
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Most powerful model, delivering state-of-the-art performance on highly complex tasks and demonstrating fluency and human-like understanding
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                Claude 3 Sonnet
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Most balanced model between intelligence and speed, a great choice for enterprise workloads and scaled AI deployments
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                Claude 3 Haiku
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Fastest and most compact model, designed for near-instant responsiveness and seamless AI experiences that mimic human interactions
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
