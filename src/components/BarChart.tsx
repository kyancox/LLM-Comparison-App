"use client"

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';

// Register the required components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

interface VoteData {
    model: string;
    category: string;
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

    const options = {
        indexAxis: 'y' as const, // Switch the axes
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Vote Distribution by Category and Model',
                font: {
                    size: 20, 
                },
                color: 'black',
            },
            legend: {
                position: 'top' as const, // Ensure the position is one of the allowed values
                labels: {
                    font: {
                        size: 16, 
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    // Calculate the height based on the number of categories
    const chartHeight = chartData.labels.length * 75; // 75px per category

    return (
        <div className="md:w-1/2 w-11/12 mx-auto overflow-x-auto" style={{ height: `${chartHeight}px` }}>
            <Bar data={chartData} options={options} />
        </div>
    );
}

