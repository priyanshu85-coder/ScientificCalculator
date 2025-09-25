// Import necessary libraries
import Display from "./Components/Display";
import styles from "./App.module.css";
import ButtonContainer from "./Components/ButtonContainer";
import { useState } from "react";
import { create, all } from "mathjs";

// Create an instance of mathjs
const math = create(all);

function App() {
  let [calVal, setCalVal] = useState(""); // Holds the input or result

  const onButtonClick = (buttonText) => {
    if (buttonText === "C") {
      setCalVal(""); // Clear the display
    } else if (buttonText === "=") {
      try {
        // Before evaluating, convert degrees to radians for sin, cos, tan, etc.
        let expression = calVal;

        // Check if the expression contains sin, cos, tan, sinh, cosh, tanh and convert degrees to radians
        expression = expression.replace(
          /sin\(([^)]+)\)/g,
          (_, val) => `sin(${math.unit(val, "deg")})`
        );
        expression = expression.replace(
          /cos\(([^)]+)\)/g,
          (_, val) => `cos(${math.unit(val, "deg")})`
        );
        expression = expression.replace(
          /tan\(([^)]+)\)/g,
          (_, val) => `tan(${math.unit(val, "deg")})`
        );

        // Evaluate the expression using mathjs
        const result = math.evaluate(expression);
        setCalVal(result); // Show result when "=" is clicked
      } catch (error) {
        setCalVal("Error"); // In case of an invalid expression
      }
    } else if (
      buttonText === "sin" ||
      buttonText === "cos" ||
      buttonText === "tan"
    ) {
      // Add trigonometric functions (sin, cos, tan, etc.) to the expression
      const newDisplayValue = `${buttonText}(${calVal})`; // Add function to the current input
      setCalVal(newDisplayValue);
    } else if (buttonText === "sqrt") {
      // Square root function
      const result = math.sqrt(calVal);
      setCalVal(result);
    } else if (buttonText === "log") {
      // Use natural logarithm function
      const result = math.log(calVal); // Natural log (ln)
      setCalVal(result);
    } else if (buttonText === "log10") {
      // Logarithm base 10
      const result = math.log10(calVal);
      setCalVal(result);
    } else if (buttonText === "exp") {
      // Exponential function
      const result = math.exp(calVal);
      setCalVal(result);
    } else if (buttonText === "π") {
      // Add pi constant
      setCalVal(calVal + math.pi);
    } else if (buttonText === "e") {
      // Add e constant
      setCalVal(calVal + math.e);
    } else if (buttonText === ".") {
      // Add decimal point, ensure only one decimal point is added
      if (!calVal.includes(".")) {
        setCalVal(calVal + ".");
      }
    } else if (buttonText === "←") {
      // Remove one character from the end (backspace functionality)
      setCalVal(calVal.slice(0, -1));
    } else if (buttonText === "(" || buttonText === ")") {
      // Handle bracket buttons
      setCalVal(calVal + buttonText);
    } else {
      const newDisplayValue = calVal + buttonText; // Append the clicked button to display value
      setCalVal(newDisplayValue); // Update the display with the current input
    }
  };

  return (
    <div className={styles.calculator}>
      <h1 className={styles.heading}>Scientific Calculator</h1>
      <Display displayValue={calVal}></Display>{" "}
      {/* Display the current value */}
      <ButtonContainer onButtonClick={onButtonClick}></ButtonContainer>{" "}
      {/* Handle button clicks */}
    </div>
  );
}

export default App;
