"use client"

import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required components
Chart.register(ArcElement, Tooltip, Legend);

interface VoteData {
    model: string;
    votes: number;
}

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }[];
}

export default function PieChart() {
    const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/votes', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();
            const data: VoteData[] = result.votes;

            const modelNames: { [key: string]: string } = {
                'gpt': 'ChatGPT (OpenAI)',
                'gemini': 'Gemini (Google)',
                'claude': 'Claude (Anthropic)',
            }


            const voteData = {
                labels: data.map(item => modelNames[item.model]),
                datasets: [
                    {
                        label: 'Votes',
                        data: data.map(item => item.votes),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            };
            setChartData(voteData);
        };

        fetchData();
    }, []);

    return (
        <div className='w-1/4 h-1/4 mx-auto'>
            <Pie data={chartData} />
        </div>
    );

}
