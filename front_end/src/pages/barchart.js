import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const BarChart = ({ price_sum }) => {
    const chartRef = useRef(null);

    useEffect(() => {   
        const ctx = chartRef.current.getContext('2d');
        if (!price_sum) return;

        const labels = Object.keys(price_sum);
        const chartData = Object.values(price_sum);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels, // The keys of the price_sum object are used as labels
                datasets: [
                    {
                        label: 'Price Sum',
                        data: chartData, // The values of the price_sum object are used as data
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }, [price_sum]);

    return <canvas ref={chartRef} />;
};

export default BarChart;