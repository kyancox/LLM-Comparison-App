import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ModelResponseProps {
    response: string
}

// useTypewriter hook from Stack Overflow:
// https://stackoverflow.com/questions/77648899/react-typewriter-effect-missing-characters-issue-on-text-change
export const useTypewriter = (text: string, speed: number) => {
    const [displayText, setDisplayText] = useState("");
    const idx = useRef(0);
    const displayTextRef = useRef("");
    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (idx.current < text.length) {
                displayTextRef.current += text.charAt(idx.current);
                setDisplayText(() => displayTextRef.current);
                idx.current += 1;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);
        return () => {
            setDisplayText("");
            clearInterval(typingInterval);
        };
    }, [text, speed]);
    return displayText;
};

export default function ModelResponse({ response }: ModelResponseProps) {
    const displayText = useTypewriter(response, 5); 

    return (
        <>
            {displayText &&
                <div className='bg-logoGrey text-logoSlate rounded p-3'>
                    <ReactMarkdown
                        children={displayText}
                        components={{
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
                </div>
            }
        </>
    );
}

