import Link from "next/link"


export default function Home() {

    return (
        <div className="text-center mx-auto lg:w-7/12 w-10/12">
            <h1 className="text-3xl font-semibold mb-4">About</h1>
            <p>LLM Comparison is a web application that allows users to compare responses from leading Large Language Models (LLMs) such as OpenAI's ChatGPT, Google's Gemini, and Anthropic's Claude. Users can input prompts, generate responses from various LLMs, and vote on their favorite responses. The app supports multiple versions of each model and includes visualizations of voting data using charts. To ensure fair usage, query limits are enforced for premium models, allowing up to three queries per day.</p>
            <h1>Models: </h1>
            <p>These models were selected because they are among the most popular and powerful currently available to the general public.</p>
            <p>Premium models are bolded because they cost more.</p>

            <div className="lg:w-3/4 mx-auto">
                <Link href="https://platform.openai.com/docs/models" target="_blank" className="text-blue-900 hover:underline">Model Descriptions from OpenAI:</Link>
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

                <Link href="https://ai.google.dev/gemini-api/docs/models/gemini" target="_blank" className="text-blue-900 hover:underline">Model Descriptions from Google:</Link>
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

                <Link href="https://docs.anthropic.com/en/docs/models-overview#model-comparison" target="_blank" className="text-blue-900 hover:underline">Model Descriptions from Anthropic:</Link>
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
