const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const historyDisplay = document.getElementById('history-display');
let currentInput = '0';
let previousInput = '';
let operator = '';
let history = [];


buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;

    if (value === 'clear') {
      clearDisplay();
    } else if (value === '=') {
      calculate();
    } else if (['+', '-', '*', '/'].includes(value)) {
      handleOperator(value);
    } else {
      handleNumber(value);
    }
  });
});


function handleNumber(value) {
  if (currentInput === '0') {
    currentInput = value;
  } else {
    currentInput += value;
  }
  updateDisplay();
}

function handleOperator(op) {
  if (operator !== '') {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '0';
}


function calculate() {
  let result;
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  try {
    switch (operator) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/':
        if (num2 === 0) {
          throw new Error("Divisão por zero!");
        }
        result = num1 / num2;
        break;
      default: return;
    }

    currentInput = result.toString();
    updateDisplay();
    addToHistory(`${previousInput} ${operator} ${num2} = ${result}`);
    previousInput = '';
    operator = '';

  } catch (error) {
    updateDisplay("Erro: " + error.message);
    currentInput = '0';
    previousInput = '';
    operator = '';
  }

}

function clearDisplay() {
  currentInput = '0';
  previousInput = '';
  operator = '';
  updateDisplay();
  history = []; // Limpa o histórico
  historyDisplay.textContent = ''; // Limpa a exibição do histórico
}

function updateDisplay(value = currentInput) {
  display.textContent = value;
}

function addToHistory(operation){
    history.push(operation);
    historyDisplay.textContent = history.join('\n');
}

document.getElementById('history').addEventListener('click',()=>{
    //Mostrar ou esconder o histórico
    historyDisplay.style.display = historyDisplay.style.display === 'none' ? 'block' : 'none';
});