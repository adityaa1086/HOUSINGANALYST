import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Introduction from '../components/Introduction';
import RiskAssessment from '../components/RiskAssessment';
import OutcomeVisualization from '../components/OutcomeVisualization';
import UserInteraction from '../components/UserInteraction';
import MarketMetricsGraph from '../components/MarketMetricsGraph';
import { assessRisk } from '../lib/riskAssessmentModel';
import { simulateMarket } from '../lib/marketSimulation';

const Home = () => {
  const [assessmentResult, setAssessmentResult] = useState({});
  const [marketSimulationResult, setMarketSimulationResult] = useState({});
  const [marketParams, setMarketParams] = useState({
    mortgageRate: 3.5,
    lendingPractice: 'Moderate',
    regulatoryPolicies: 'Average'
  });

  useEffect(() => {
    // Simulate fetching market parameters on component mount
    setTimeout(() => {
      setMarketParams({
        mortgageRate: 4.5,
        lendingPractice: 'Conservative',
        regulatoryPolicies: 'Strict'
      });
    }, 1000);
  }, []);

  const handleRiskAssessment = (result) => {
    setAssessmentResult(result);
  };

  const handleMarketSimulation = (result) => {
    setMarketSimulationResult(result);
  };

  const handleParametersChanged = (newParams) => {
    const newAssessmentResult = assessRisk(newParams);
    setAssessmentResult(newAssessmentResult);
  
    const newMarketSimulationResult = simulateMarket(newParams);
    setMarketSimulationResult(newMarketSimulationResult);
  };

  // Image paths could be dynamically loaded but here we keep it simple for demonstration
  const imagePaths = [
    '/images/page_1_img_1.png',
    '/images/page_1_img_2.png',
    '/images/page_2_img_1.png',
    '/images/page_2_img_2.png'
  ];

  return (
    <div>
      <Head>
        <title>AI Housing Bubble Prevention Demo</title>
        <meta name="description" content="Interactive demo for AI risk assessment in housing market" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <main>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: '10px' }}>
            {/* Positioned images */}
            {imagePaths.map((path, index) => (
                <Image key={index} src={path} alt={`Image ${index + 1}`} width={100} height={100} />
            ))}
        </div>
  
        <UserInteraction onParametersChanged={handleParametersChanged} />
        <OutcomeVisualization assessmentResult={assessmentResult} marketSimulationResult={marketSimulationResult} />
    
    </main>

    </div>
  );
};

export default Home;
