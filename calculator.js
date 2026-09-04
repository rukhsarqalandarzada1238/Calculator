const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');

let expression = ""; 

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === '⌫') {
      expression = expression.slice(0, -1);
      display.textContent = expression || '0';

    } else if (value === 'AC') {
      expression = "";
      display.textContent = '0';

    } else if (value === '±') {
    
      if (expression) {
        let parts = expression.split(/([+\-x/])/);
        let last = parts[parts.length - 1];
        if (!isNaN(last)) {
          last = (parseFloat(last) * -1).toString();
          parts[parts.length - 1] = last;
          expression = parts.join('');
          display.textContent = expression;
        }
      }

    } else if (value === '=') {
      try {
        let safeExpression = expression.replace(/x/g, '*').replace(/÷/g, '/');
        let result = eval(safeExpression);
        display.textContent = result;
        expression = result.toString();
      } catch {
        display.textContent = "Error";
        expression = "";
      }

    } else {
      expression += value;
      display.textContent = expression;
    }
  });
});
