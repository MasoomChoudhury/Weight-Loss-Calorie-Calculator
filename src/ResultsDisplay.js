import React from 'react';

function ResultsDisplay({ results }) {
  // Don't render if no results are available
  if (!results) {
    return null;
  }

  const {
    tdee,
    targetCalories,
    targetCaloriesNote,
    estimatedWeeks,
    dailyWalkingTime,
    dailyRunningTime,
  } = results;

  return (
    <div className="results-display">
      <h2>Your Personalized Plan</h2>

      <div className="result-item">
        <strong>Estimated Maintenance Calories (TDEE):</strong>
        <p>{tdee.toFixed(0)} kcal/day</p>
        <span>This is the estimated number of calories your body burns daily to maintain your current weight.</span>
      </div>

      <div className="result-item">
        <strong>Recommended Daily Calorie Target for Weight Loss:</strong>
        <p>{targetCalories.toFixed(0)} kcal/day</p>
        <span>
          This target aims for a sustainable ~500 kcal daily deficit.
          {targetCaloriesNote && <strong className="warning"> {targetCaloriesNote}</strong>}
        </span>
      </div>

      <div className="result-item">
        <strong>Estimated Timeframe to Reach Goal:</strong>
        <p>{estimatedWeeks.toFixed(1)} weeks</p>
        <span>Based on consistently meeting the recommended calorie target.</span>
      </div>

      <div className="result-item">
        <strong>Contribute to Deficit with Exercise (Optional):</strong>
        <p>To burn approximately 500 kcal (your daily deficit goal) through exercise:</p>
        <ul>
          <li>
            <strong>Walking (approx. 300 kcal/hour):</strong> {dailyWalkingTime.toFixed(0)} minutes/day
          </li>
          <li>
            <strong>Running (approx. 600 kcal/hour):</strong> {dailyRunningTime.toFixed(0)} minutes/day
          </li>
        </ul>
        <span>These are estimates; actual calories burned vary based on intensity, individual metabolism, etc.</span>
      </div>

       <p className="disclaimer">
         <strong>Disclaimer:</strong> This calculator provides estimates based on standard formulas and assumptions. Consult with a healthcare professional or registered dietitian before making significant changes to your diet or exercise routine.
       </p>
    </div>
  );
}

export default ResultsDisplay;
