import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const OutcomeVisualization = ({ assessmentResult, marketSimulationResult }) => {
  const data = {
    labels: Object.keys(marketSimulationResult.metrics || {}),
    datasets: [
      {
        label: 'Market Metrics',
        data: Object.values(marketSimulationResult.metrics || {}),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-medium text-black mb-4">Outcome Visualization</h2>
      <div className="text-sm text-gray-700 mb-4">
        <p>Risk Level: {assessmentResult.riskLevel}</p>
        <p>Suggestions:</p>
        <ul>
          {assessmentResult.suggestions?.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default OutcomeVisualization;