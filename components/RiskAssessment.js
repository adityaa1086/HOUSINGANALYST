import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { assessRisk } from '../lib/riskAssessmentModel';


const RiskAssessment = ({ onRiskAssessed }) => {
    const [mortgageRate, setMortgageRate] = useState(3.5); // Example default value
    const [lendingPractice, setLendingPractice] = useState('Moderate'); // Example default value
    const [assessment, setAssessment] = useState({});

    // Function to handle changes in mortgage rate
    const handleMortgageRateChange = useCallback((event) => {
        setMortgageRate(parseFloat(event.target.value));
    }, []);

    // Function to handle changes in lending practices
    const handleLendingPracticeChange = useCallback((event) => {
        setLendingPractice(event.target.value);
    }, []);

    // Perform risk assessment whenever the parameters change
    useEffect(() => {
        const assessmentResult = assessRisk({ mortgageRate, lendingPractice });
        setAssessment(assessmentResult);
        onRiskAssessed(assessmentResult);
    }, [mortgageRate, lendingPractice, onRiskAssessed]);

    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <div>
                <div className="text-xl font-medium text-black">Risk Assessment Parameters</div>
                <p className="text-gray-500">Adjust the parameters to simulate different market conditions.</p>
                <div className="mt-4">
                    <label htmlFor="mortgageRate" className="block text-sm font-medium text-gray-700">Mortgage Rate (%)</label>
                    <input
                        type="range"
                        id="mortgageRate"
                        name="mortgageRate"
                        min="0"
                        max="10"
                        value={mortgageRate}
                        onChange={handleMortgageRateChange}
                        className="mt-1 block w-full"
                    />
                    <div className="text-right text-sm">{mortgageRate}%</div>
                </div>
                <div className="mt-4">
                    <label htmlFor="lendingPractice" className="block text-sm font-medium text-gray-700">Lending Practices</label>
                    <select
                        id="lendingPractice"
                        name="lendingPractice"
                        value={lendingPractice}
                        onChange={handleLendingPracticeChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="Conservative">Conservative</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Aggressive">Aggressive</option>
                    </select>
                </div>
                {/* Display the risk assessment result */}
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">Risk Level: {assessment.riskLevel}</p>
                    <ul className="text-sm text-gray-500">
                        {assessment.suggestions && assessment.suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

RiskAssessment.propTypes = {
  onRiskAssessed: PropTypes.func.isRequired
};

export default RiskAssessment;