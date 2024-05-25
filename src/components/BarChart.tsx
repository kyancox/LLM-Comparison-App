"use client"

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { getModuleBuildInfo } from 'next/dist/build/webpack/loaders/get-module-build-info';

// Register the required components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


interface VoteData {
    model: string
    category: string
    votes: number
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

export default function BarChart() {
    const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/votes?categories=true', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();
            const data: VoteData[] = result.votes;

            // Process data to fit the bar chart structure
            const categories = Array.from(new Set(data.map(item => item.category)));
            const models = Array.from(new Set(data.map(item => item.model)));

            const modelData: { [key: string]: { name: string, backgroundColor: string, borderColor: string } } = {
                'gpt': {
                    'name': 'ChatGPT (OpenAI)',
                    'backgroundColor': 'rgba(255, 99, 132, 0.2)',
                    'borderColor': 'rgba(255, 99, 132, 1)'
                },
                'gemini': {
                    'name': 'Gemini (Google)',
                    'backgroundColor': 'rgba(54, 162, 235, 0.2)',
                    'borderColor': 'rgba(54, 162, 235, 1)',
                },
                'claude': {
                    'name': 'Claude (Anthropic)',
                    'backgroundColor': 'rgba(255, 206, 86, 0.2)',
                    'borderColor': 'rgba(255, 206, 86, 1)'
                }
            }

            const datasets = models.map(model => {
                return {
                    label: modelData[model].name,
                    data: categories.map(category => {
                        const vote = data.find(item => item.category === category && item.model === model);
                        return vote ? vote.votes : 0;
                    }),
                    backgroundColor: [modelData[model].backgroundColor],
                    borderColor: [modelData[model].borderColor],
                    borderWidth: 1,
                };
            });

            const loadedData = {
                labels: categories,
                datasets: datasets,
            };

            setChartData(loadedData);
        };

        fetchData();
    }, []);

    return (
        <div className="w-1/2 h-1/2 mx-auto">
            <Bar data={chartData} />
        </div>
    );
}
