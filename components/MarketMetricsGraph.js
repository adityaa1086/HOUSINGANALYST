import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import housingData from '../data/housingData.json'; // Assuming the path is correct




function MarketMetricsGraph({ marketParams }) {
  // State for chart data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // Effect to update chart data when market parameters change
  useEffect(() => {
    const newData = generateDataBasedOnParams(marketParams);
    setChartData(newData);
  }, [marketParams]);

  // Actual data generation logic
  const generateDataBasedOnParams = (params) => {
    // Convert the object keys to an array for labels
    const labels = Object.keys(housingData.historicalData.dates);
    const returns = housingData.historicalData.returns;

    // Dynamic data generation based on market parameters
    const datasets = [
      {
        label: 'Housing Price Index',
        data: generateIndexData(params),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      // Additional datasets can be added here based on other parameters
    ];

    return { labels, datasets };
  };

  // Generate index data based on market parameters
  const generateIndexData = (params) => {
    // Example logic to adjust the housing price index based on the mortgage rate and other factors
    return Object.values(housingData.historicalData.housingPrices).map(prices => {
      let index = prices.max; // Starting with the max value for simplicity

      // Adjust index based on mortgage rate
      if (params.mortgageRate) {
        index *= params.mortgageRate < 5 ? 1.1 : 0.9;
      }

      // Further adjustments based on lending practices
      if (params.lendingPractice === 'Aggressive') {
        index *= 0.8; // Decrease index for aggressive lending practices
      }

      return index;
    });
  };

  // Options for the Line chart
  const options = {
    scales: {
      y: {
        beginAtZero: false
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div style={{ height: '300px' }}>
      <h2>Market Metrics</h2>
      {/* The Line chart */}
      <Line data={chartData} options={options} />
    </div>
  );
}

MarketMetricsGraph.propTypes = {
  marketParams: PropTypes.object.isRequired
};

export default MarketMetricsGraph;