import ReactMarkdown from 'react-markdown';

interface ModelResponseProps {
    response: string
}

export default function ModelResponse({response}: ModelResponseProps) {

    const formatMarkdown = (response: string) => {
        try {
            const parsedResponse = JSON.parse(response);
            return parsedResponse.response;
        } catch (error) {
            console.error('Error parsing JSON response:', error);
            return response;
        }
    }

    return (
        <div>
            {response && <div><ReactMarkdown>{response}</ReactMarkdown></div>}
        </div>
    );
}