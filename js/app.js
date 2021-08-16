// Theme toggle
const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');
const solarButton = document.getElementById('solar');
const switcher = document.querySelectorAll('.themes');
const toggley = document.querySelectorAll('.toggley');
let activeBtn = document.querySelector('.active');

const body = document.body;

// Apply the cached theme on reload
const theme = localStorage.getItem('theme');
const isSolar = localStorage.getItem('isSolar');

if (theme) {
	// if there is an existing theme SVGAnimatedEnumeration, then well add that theme to the body of the document
	body.classList.add(theme);
	isSolar && body.classList.add('solar');
}

// Theme 1
darkButton.addEventListener('click', () => {
	if (!body.classList.contains(dark)) {
		body.classList.add('dark');
		body.classList.remove('light');
		body.classList.remove('solar');
		localStorage.setItem('theme', 'dark');
	}
});
// Theme 2
lightButton.addEventListener('click', () => {
	// body.classList.replace('light', 'dark');
	body.classList.remove('dark');
	body.classList.remove('solar');
	body.classList.add('light');
	localStorage.setItem('theme', 'light');
});

// Theme 3
solarButton.addEventListener('click', () => {
	body.classList.remove('dark');
	body.classList.remove('light');
	body.classList.add('solar');
	localStorage.removeItem('theme', 'solar');
});

// Loop through the toggle and add/remove the active class
switcher.forEach((toggle) => {
	toggle.addEventListener('click', () => {
		// removes the original active class from element
		activeBtn.classList.remove('active');
		// adds the class on the button that has been clicked
		toggle.classList.add('active');
		// making activeBtn equal to tipBtn allows you to add and remove the active class
		activeBtn = toggle;
	});
});

// Calculator
const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const equalsBtn = document.querySelector('.calculator__equals');
const resetBtn = document.querySelector('.calculator__reset');
const display = document.querySelector('.calculator__display');
const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
const deleteBtn = document.querySelector('.calculator__delete');

keys.addEventListener('click', (event) => {
	if (!event.target.closest('button')) return;
	// target the number buttons that are being clicked
	const key = event.target;
	// obtain the value of the key being clicked
	const keyValue = key.textContent;
	// gets the value of the number in the display
	const displayValue = display.textContent;
	// destructuring the type variable
	const { type } = key.dataset;
	const { previousKeyType } = calculator.dataset;

	// Is this a number key?
	if (type === 'number') {
		// if the previousKeyType key was an operator, we want to refresh the display
		if (displayValue === '0' || previousKeyType === 'operator') {
			display.textContent = keyValue;
		} else {
			// concatenates the value clicked with the value being displayed
			display.textContent = displayValue + keyValue;
		}
	}

	// Is this an operator key
	// Detect if the previous key an operator key
	if (type === 'operator') {
		const operatorKeys = keys.querySelectorAll('[data-type="operator"');
		// allows one operator button to be selected at any one time
		operatorKeys.forEach((el) => {
			el.dataset.state = '';
		});
		key.dataset.state = 'selected';

		// saves the first number that is clicked
		calculator.dataset.firstNumber = displayValue;
		// saves the operator that is clicked
		calculator.dataset.operator = key.dataset.key;
	}

	if (type === 'equal') {
		// Perform a calculation
		const firstNumber = calculator.dataset.firstNumber;
		const operator = calculator.dataset.operator;
		const secondNumber = displayValue;
		// displays the calculation of the first and second numbers
		display.textContent = calculate(firstNumber, operator, secondNumber);
	}

	// Delete Button
	if (type === 'delete') {
		const deleteNum = display.textContent;
		const deletedNum = deleteNum.slice(0, -1);
		display.textContent = deletedNum;
	}

	// set it to type because the type will be the previousKeyType
	calculator.dataset.previousKeyType = type;
});

function calculate(firstNumber, operator, secondNumber) {
	firstNumber = parseInt(firstNumber);
	secondNumber = parseInt(secondNumber);

	if (operator === 'plus') return firstNumber + secondNumber;
	if (operator === 'minus') return firstNumber - secondNumber;
	if (operator === 'times') return firstNumber * secondNumber;
	if (operator === 'divide') return firstNumber / secondNumber;
}

resetBtn.addEventListener('click', () => {
	display.textContent = '';
});
