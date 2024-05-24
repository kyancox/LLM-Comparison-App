"use client"

import { useEffect, useState } from 'react';

export default function Home() {
    const [votes, setVotes] = useState(null);

    useEffect(() => {
        fetch('/api/votes', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => setVotes(data))
        .catch(error => console.error('Error fetching votes:', error));
    }, []);

    return (
        <div>
            {votes ? JSON.stringify(votes) : 'Loading...'}
        </div>
    );
}
