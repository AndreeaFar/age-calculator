const btn = document.querySelector('button');
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const spanDay = document.getElementById('days');
const spanMonth = document.getElementById('months');
const spanYear = document.getElementById('years');

function changeDashes() {
  const currentDate = new Date();

  // Get the entered birthdate from the input
  const birthDay = parseInt(dayInput.value);
  const birthMonth = parseInt(monthInput.value) - 1;
  const birthYear = parseInt(yearInput.value);

  // Create a new date with the entered birthdate
  const birthDate = new Date(birthYear, birthMonth, birthDay);

  // Calculate the age
  let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageInMonths = currentDate.getMonth() - birthDate.getMonth();
  let ageInDays = currentDate.getDate() - birthDate.getDate();

  // Display the age
  spanYear.textContent = ageInYears;
  spanMonth.textContent = ageInMonths;
  spanDay.textContent = ageInDays;
}

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Check required fields
function checkRequired(inputArr) {
  let isEmptyInput = false;

  inputArr.forEach((input) => {
    if (input.value === '') {
      showError(input, `This field is required`);
      isEmptyInput = true;
    }
  });

  return isEmptyInput;
}

// Check inputs validation
function checkValid(input, min, max, message) {
  if (input.value < min || input.value > max) {
    showError(input, `${message}`);
    return false;
  }

  return true;
}

// Calculate age
function calculate(e) {
  e.preventDefault();

  const areEmptyInputs = checkRequired([dayInput, monthInput, yearInput]);
  const isValidDay = checkValid(dayInput, 0, 31, 'Must be a valid day');
  const isValidMonth = checkValid(monthInput, 0, 12, 'Must be a valid month');
  const isValidYear = checkValid(yearInput, 0, 2024, 'Must be in the past');

  if (areEmptyInputs || !isValidDay || !isValidMonth || !isValidYear) return;

  changeDashes();
}

// Event Listeners
btn.addEventListener('click', calculate);
