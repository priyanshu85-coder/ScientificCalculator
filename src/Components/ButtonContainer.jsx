import styles from "./ButtonDisplay.module.css";

const ButtonContainer = ({ onButtonClick }) => {
  const buttonNames = [
    "1",
    "2",
    "3",
    "C",
    "4",
    "5",
    "6",
    "+",
    "7",
    "8",
    "9",
    "-",
    "0",
    ".",
    "=",
    "*",
    "log10",
    "sqrt",
    "←",
    "/",
    "exp",
    "π",
    "e",
    "sin",
    "cos",
    "tan",
    "(",
    ")",
  ];

  return (
    <div className={styles.buttonContainer}>
      {buttonNames.map((buttonName) => (
        <button
          key={buttonName}
          className={styles.button}
          onClick={() => onButtonClick(buttonName)}
        >
          {buttonName}
        </button>
      ))}
    </div>
  );
};

export default ButtonContainer;
