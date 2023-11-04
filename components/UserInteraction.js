import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import MarketMetricsGraph from './MarketMetricsGraph';

const UserInteraction = ({ onParametersChanged }) => {
  // State to keep track of user-selected parameters
  const [userParams, setUserParams] = useState({
    mortgageRate: 3.5,
    lendingPractice: 'Moderate',
    regulatoryPolicies: 'Average'
  });

  // Update this function to use the passed callback
  const handleParamChange = (e) => {
    const { name, value } = e.target;
    const newParams = {
      ...userParams,
      [name]: value
    };
    setUserParams(newParams);

    // Call the callback function with the new parameters
    onParametersChanged(newParams);
  };

  // Render a form for user input and the MarketMetricsGraph component
  return (
    <div>
      <form>
        {/* Inputs to allow users to change parameters */}
        <label>
          Mortgage Rate (%):
          <input
            type="number"
            name="mortgageRate"
            value={userParams.mortgageRate}
            onChange={handleParamChange}
          />
        </label>
        <label>
          Lending Practices:
          <select name="lendingPractice" value={userParams.lendingPractice} onChange={handleParamChange}>
            <option value="Conservative">Conservative</option>
            <option value="Moderate">Moderate</option>
            <option value="Aggressive">Aggressive</option>
          </select>
        </label>
        <label>
          Regulatory Policies:
          <select name="regulatoryPolicies" value={userParams.regulatoryPolicies} onChange={handleParamChange}>
            <option value="Strict">Strict</option>
            <option value="Average">Average</option>
            <option value="Lenient">Lenient</option>
          </select>
        </label>
        {/* Additional inputs as needed */}
      </form>
      {/* Pass the userParams to the MarketMetricsGraph component */}

    </div>
  );
};

UserInteraction.propTypes = {
  onParametersChanged: PropTypes.func.isRequired
};

export default UserInteraction;