import React, { useState } from 'react';

function InputForm({ onCalculate }) {
  // State for form inputs
  const [formData, setFormData] = useState({
    age: '',
    sex: 'Female', // Default value
    heightCm: '',
    heightFt: '',
    heightIn: '',
    heightUnit: 'cm', // 'cm' or 'ft'
    currentWeightKg: '',
    currentWeightLbs: '',
    weightUnit: 'kg', // 'kg' or 'lbs'
    activityLevel: '1.2', // Default to Sedentary
    targetWeightLoss: '',
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle radio button specifically for units
    if (name === 'heightUnit' || name === 'weightUnit') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        // Clear the other unit's input when switching
        ...(name === 'heightUnit' && value === 'cm' && { heightFt: '', heightIn: '' }),
        ...(name === 'heightUnit' && value === 'ft' && { heightCm: '' }),
        ...(name === 'weightUnit' && value === 'kg' && { currentWeightLbs: '' }),
        ...(name === 'weightUnit' && value === 'lbs' && { currentWeightKg: '' }),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }

    // Clear error for the field being changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Basic validation logic
  const validateForm = () => {
    const newErrors = {};
    const { age, heightCm, heightFt, heightIn, heightUnit, currentWeightKg, currentWeightLbs, weightUnit, targetWeightLoss } = formData;

    if (!age || isNaN(age) || age <= 0) newErrors.age = 'Please enter a valid age.';
    if (heightUnit === 'cm' && (!heightCm || isNaN(heightCm) || heightCm <= 0)) newErrors.heightCm = 'Please enter a valid height in cm.';
    if (heightUnit === 'ft') {
        if (!heightFt || isNaN(heightFt) || heightFt < 0) newErrors.heightFt = 'Please enter valid feet.';
        // Inches can be 0, but not negative or non-numeric if provided
        if (heightIn && (isNaN(heightIn) || heightIn < 0)) newErrors.heightIn = 'Please enter valid inches (0-11).';
        if (heightIn >= 12) newErrors.heightIn = 'Inches must be less than 12.';
        if ((!heightFt || heightFt <= 0) && (!heightIn || heightIn <= 0)) newErrors.heightFt = 'Please enter a valid height.'; // Combined check if both are zero or invalid
    }
    if (weightUnit === 'kg' && (!currentWeightKg || isNaN(currentWeightKg) || currentWeightKg <= 0)) newErrors.currentWeightKg = 'Please enter a valid weight in kg.';
    if (weightUnit === 'lbs' && (!currentWeightLbs || isNaN(currentWeightLbs) || currentWeightLbs <= 0)) newErrors.currentWeightLbs = 'Please enter a valid weight in lbs.';
    if (!targetWeightLoss || isNaN(targetWeightLoss) || targetWeightLoss <= 0) newErrors.targetWeightLoss = 'Please enter a valid weight loss target.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate(formData); // Pass validated data up to App component
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <h2>Enter Your Details</h2>

      {/* Age */}
      <div className="form-group">
        <label htmlFor="age">Age (years):</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          min="1"
        />
        {errors.age && <p className="error-message">{errors.age}</p>}
      </div>

      {/* Sex */}
      <div className="form-group">
        <label>Sex:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="sex"
              value="Male"
              checked={formData.sex === 'Male'}
              onChange={handleChange}
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="sex"
              value="Female"
              checked={formData.sex === 'Female'}
              onChange={handleChange}
            /> Female
          </label>
        </div>
      </div>

      {/* Height */}
      <div className="form-group">
        <label>Height:</label>
        <div className="unit-toggle">
          <label>
            <input
              type="radio"
              name="heightUnit"
              value="cm"
              checked={formData.heightUnit === 'cm'}
              onChange={handleChange}
            /> cm
          </label>
          <label>
            <input
              type="radio"
              name="heightUnit"
              value="ft"
              checked={formData.heightUnit === 'ft'}
              onChange={handleChange}
            /> ft/in
          </label>
        </div>
        {formData.heightUnit === 'cm' ? (
          <div>
            <input
              type="number"
              id="heightCm"
              name="heightCm"
              placeholder="cm"
              value={formData.heightCm}
              onChange={handleChange}
              min="1"
            />
            {errors.heightCm && <p className="error-message">{errors.heightCm}</p>}
          </div>
        ) : (
          <div className="height-imperial">
            <input
              type="number"
              id="heightFt"
              name="heightFt"
              placeholder="ft"
              value={formData.heightFt}
              onChange={handleChange}
              min="0"
            />
             <input
              type="number"
              id="heightIn"
              name="heightIn"
              placeholder="in"
              value={formData.heightIn}
              onChange={handleChange}
              min="0"
              max="11"
            />
            {errors.heightFt && <p className="error-message">{errors.heightFt}</p>}
            {errors.heightIn && <p className="error-message">{errors.heightIn}</p>}
          </div>
        )}
      </div>

      {/* Current Weight */}
      <div className="form-group">
        <label>Current Weight:</label>
         <div className="unit-toggle">
          <label>
            <input
              type="radio"
              name="weightUnit"
              value="kg"
              checked={formData.weightUnit === 'kg'}
              onChange={handleChange}
            /> kg
          </label>
          <label>
            <input
              type="radio"
              name="weightUnit"
              value="lbs"
              checked={formData.weightUnit === 'lbs'}
              onChange={handleChange}
            /> lbs
          </label>
        </div>
        {formData.weightUnit === 'kg' ? (
           <div>
            <input
              type="number"
              id="currentWeightKg"
              name="currentWeightKg"
              placeholder="kg"
              value={formData.currentWeightKg}
              onChange={handleChange}
              step="0.1"
              min="1"
            />
            {errors.currentWeightKg && <p className="error-message">{errors.currentWeightKg}</p>}
           </div>
        ) : (
          <div>
            <input
              type="number"
              id="currentWeightLbs"
              name="currentWeightLbs"
              placeholder="lbs"
              value={formData.currentWeightLbs}
              onChange={handleChange}
              step="0.1"
              min="1"
            />
            {errors.currentWeightLbs && <p className="error-message">{errors.currentWeightLbs}</p>}
          </div>
        )}
      </div>

      {/* Activity Level */}
      <div className="form-group">
        <label htmlFor="activityLevel">Activity Level:</label>
        <select
          id="activityLevel"
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
        >
          <option value="1.2">Sedentary (little or no exercise)</option>
          <option value="1.375">Lightly Active (light exercise/sports 1-3 days/week)</option>
          <option value="1.55">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
          <option value="1.725">Very Active (hard exercise/sports 6-7 days a week)</option>
          <option value="1.9">Super Active (very hard exercise/physical job & exercise)</option>
        </select>
      </div>

       {/* Target Weight Loss */}
      <div className="form-group">
        <label htmlFor="targetWeightLoss">Target Weight Loss ({formData.weightUnit}):</label>
        <input
          type="number"
          id="targetWeightLoss"
          name="targetWeightLoss"
          value={formData.targetWeightLoss}
          onChange={handleChange}
          step="0.1"
          min="0.1"
        />
         {errors.targetWeightLoss && <p className="error-message">{errors.targetWeightLoss}</p>}
      </div>

      <button type="submit" className="calculate-button">Calculate</button>
    </form>
  );
}

export default InputForm;
