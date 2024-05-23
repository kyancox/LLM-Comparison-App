import ReactMarkdown from 'react-markdown';

interface ModelResponseProps {
    response: string
}

export default function ModelResponse({response}: ModelResponseProps) {

    return (
        <div>
            {response && <div><ReactMarkdown>{response}</ReactMarkdown></div>}
        </div>
    );
}