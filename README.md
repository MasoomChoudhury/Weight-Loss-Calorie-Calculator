# Personalized Weight Loss Planner & Calorie Calculator (React App)

Hi there! This is a simple React web application I built as part of my learning process. It helps estimate daily calorie needs for weight loss based on user inputs.

## Project Goal

The main goal was to create a single-page application using React that takes user details (age, sex, height, weight, activity level) and calculates:

*   Basal Metabolic Rate (BMR) using the Mifflin-St Jeor Equation.
*   Total Daily Energy Expenditure (TDEE / Maintenance Calories).
*   A recommended daily calorie target for weight loss (based on a 500 kcal deficit).
*   An estimated timeframe to reach a target weight loss goal.
*   Estimated daily exercise times (walking/running) to burn the deficit calories.

## How to Run This Project

1.  **Clone or download the code.**
2.  **Navigate to the project directory:**
    ```bash
    cd weight-loss-planner
    ```
3.  **Install dependencies:** (You might need Node.js and npm installed first)
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm start
    ```
    This should automatically open the app in your default web browser at `http://localhost:3000`.

## What I Learned Building This

This project was a great hands-on experience! Here are some key things I learned:

*   **React Fundamentals:**
    *   Setting up a React project using `create-react-app`.
    *   Creating functional components (`App.js`, `InputForm.js`, `ResultsDisplay.js`).
    *   Using the `useState` Hook to manage component state (like form inputs and calculation results).
    *   Passing data and functions between components using props (`onCalculate` function, `results` data).
    *   Conditional rendering (showing the results section only after calculation).
    *   Handling user events (like input changes `onChange` and form submission `onSubmit`).
*   **Form Handling:**
    *   Creating controlled form inputs in React.
    *   Implementing basic client-side form validation to ensure required fields are filled and numeric inputs are valid.
    *   Displaying simple error messages to the user.
    *   Handling different input types (text, number, radio buttons, select dropdowns).
*   **JavaScript Logic:**
    *   Implementing mathematical formulas (Mifflin-St Jeor, TDEE).
    *   Performing unit conversions (lbs to kg, ft/in to cm).
    *   Using `parseFloat` and `parseInt` for calculations.
    *   Handling potential edge cases (like minimum calorie target, division by zero).
*   **Basic CSS:**
    *   Applying styles to components using a separate CSS file (`App.css`).
    *   Using Flexbox for basic layout organization.
    *   Making the layout somewhat responsive using media queries.
*   **Project Structure:**
    *   Organizing code into separate, reusable components.
    *   Cleaning up default files from `create-react-app`.

Overall, it was challenging but rewarding to see the different parts come together into a working application!
