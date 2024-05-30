"use client"

import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Register the required components
Chart.register(ArcElement, Tooltip, Legend, Title);

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

            const modelData: { [key: string]: { name: string, backgroundColor: string, borderColor: string } } = {
                'gpt': {
                    'name': 'ChatGPT (OpenAI)',
                    'backgroundColor': 'rgba(14,169,130,0.2)',
                    'borderColor': 'rgba(14,169,130,255)'
                },
                'gemini': {
                    'name': 'Gemini (Google)',
                    'backgroundColor': 'rgba(54, 162, 235, 0.2)',
                    'borderColor': 'rgba(54, 162, 235, 1)',
                },
                'claude': {
                    'name': 'Claude (Anthropic)',
                    'backgroundColor': 'rgba(210,156,118,0.2)',
                    'borderColor': 'rgba(210,156,118,255)'
                }
            };

            const voteData = {
                labels: data.map(item => modelData[item.model].name),
                datasets: [
                    {
                        label: 'Votes',
                        data: data.map(item => item.votes),
                        backgroundColor: data.map(item => modelData[item.model].backgroundColor),
                        borderColor: data.map(item => modelData[item.model].borderColor),
                        borderWidth: 1,
                    },
                ],
            };

            setChartData(voteData);
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            title: {
                display: true,
                text: 'Vote Distribution by Model',
                font: {
                    size: 26,
                },
                color: 'black',
            },
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        size: 16, 
                    },
                },
            },
        },
    };

    return (
        <div className='lg:w-1/4 md:w-1/2 mx-auto mb-4 flex justify-center items-center'>
            <Pie data={chartData} options={options} />
        </div>
    );
}
