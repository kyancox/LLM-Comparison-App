import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ModelResponseProps {
    response: string
}

export default function ModelResponse({ response }: ModelResponseProps) {

    // JSON error handling, commented out for simplification. 

    // const isValidJson = (str: string) => {
    //     try {
    //         JSON.parse(str);
    //         return true;
    //     } catch (e) {
    //         return false;
    //     }
    // }

    // const formatMarkdown = (response: string) => {
    //     if (isValidJson(response)) {
    //         const parsedResponse = JSON.parse(response);
    //         return parsedResponse.response;
    //     } else {
    //         console.error('Invalid JSON response');
    //         return response;
    //     }
    // }

    // const markdownContent = formatMarkdown(response);

    return (
        <>
            {response &&
                <div className='bg-logoGrey text-logoSlate rounded p-3'>
                    {response && (
                        <ReactMarkdown
                            children={response}
                            components={{
                                // props : any type to account for TypeScript type compatibility
                                code({ node, inline, className, children, ...props }: any) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            children={String(children).replace(/\n$/, '')}
                                            style={oneDark}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                            }}
                        />
                    )}
                </div>
            }
        </>
    );
}

