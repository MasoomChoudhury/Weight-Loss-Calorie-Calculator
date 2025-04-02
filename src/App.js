import React, { useState } from 'react';
import './App.css'; // Import CSS for styling
import InputForm from './InputForm';
import ResultsDisplay from './ResultsDisplay';

function App() {
  // State to hold the calculated results
  const [results, setResults] = useState(null);

  // --- Calculation Logic ---

  // Function to convert feet/inches to cm
  const convertHeightToCm = (ft, inches) => {
    const totalInches = (parseFloat(ft) * 12) + parseFloat(inches || 0);
    return totalInches * 2.54;
  };

  // Function to convert lbs to kg
  const convertWeightToKg = (lbs) => {
    return parseFloat(lbs) * 0.453592;
  };

  // Function to calculate BMR using Mifflin-St Jeor Equation
  const calculateBMR = (weightKg, heightCm, age, sex) => {
    if (sex === 'Male') {
      return (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else { // Female
      return (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }
  };

  // Main calculation handler function
  const handleCalculate = (formData) => {
    const {
      age,
      sex,
      heightCm,
      heightFt,
      heightIn,
      heightUnit,
      currentWeightKg,
      currentWeightLbs,
      weightUnit,
      activityLevel,
      targetWeightLoss,
    } = formData;

    // --- 1. Unit Conversions ---
    const heightInCm = heightUnit === 'cm'
      ? parseFloat(heightCm)
      : convertHeightToCm(heightFt, heightIn);

    const weightInKg = weightUnit === 'kg'
      ? parseFloat(currentWeightKg)
      : convertWeightToKg(currentWeightLbs);

    const targetLossKg = weightUnit === 'kg'
      ? parseFloat(targetWeightLoss)
      : convertWeightToKg(targetWeightLoss);

    // --- 2. Calculate BMR ---
    const bmr = calculateBMR(weightInKg, heightInCm, parseInt(age), sex);

    // --- 3. Calculate TDEE (Maintenance Calories) ---
    const tdee = bmr * parseFloat(activityLevel);

    // --- 4. Calculate Target Daily Calories ---
    const calorieDeficit = 500;
    let targetCalories = tdee - calorieDeficit;
    let targetCaloriesNote = null;

    // Safety check: Minimum 1200 kcal
    if (targetCalories < 1200) {
      targetCalories = 1200;
      targetCaloriesNote = "Target set to minimum 1200 kcal/day for safety.";
    }

    // --- 5. Estimate Timeframe ---
    const totalCaloriesToLose = targetLossKg * 7700; // Approx. 7700 kcal per kg fat
    const weeklyDeficit = calorieDeficit * 7;
    // Prevent division by zero or negative deficit if TDEE is very low
    const estimatedWeeks = weeklyDeficit > 0 ? totalCaloriesToLose / weeklyDeficit : Infinity;

    // --- 6. Estimate Exercise Duration ---
    const walkCalorieRatePerHour = 300;
    const runCalorieRatePerHour = 600;
    const dailyWalkingTime = (calorieDeficit / walkCalorieRatePerHour) * 60; // in minutes
    const dailyRunningTime = (calorieDeficit / runCalorieRatePerHour) * 60; // in minutes

    // --- 7. Update Results State ---
    setResults({
      tdee,
      targetCalories,
      targetCaloriesNote,
      estimatedWeeks: isFinite(estimatedWeeks) ? estimatedWeeks : 'N/A (Check inputs or TDEE)', // Handle Infinity case
      dailyWalkingTime,
      dailyRunningTime,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Personalized Weight Loss Planner & Calorie Calculator</h1>
      </header>
      <main>
        <InputForm onCalculate={handleCalculate} />
        <ResultsDisplay results={results} />
      </main>
      <footer>
        {/* Optional Footer */}
      </footer>
    </div>
  );
}

export default App;
