const loan = document.querySelector('#loan');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const calButton = document.querySelector('#calButton');
const cachedErrors = document.querySelector('#cachingErrors');
const loadingStyle = document.querySelector('.loading');
const results = document.querySelector('#results');

calButton.addEventListener('click', function (e) {
  let errors;
  if (isNaN(loan.value) || loan.value === '') {
    errors = 'loan value entered is not a number';
    displayErrors(errors);
  } else if (isNaN(interest.value) || interest.value === '') {
      errors = 'interest value entered is not a number';
      displayErrors(errors);
  } else if (isNaN(years.value) || years.value === '') {
      errors = 'years value entered is not a number';
      displayErrors(errors);
  } else if(loan.value <= 0 || interest.value <= 0 || years.value <= 0) {
      errors = 'Please only enter positive values';
      displayErrors(errors);
  } else{
      clearErrors();
      loading();
  }
  e.preventDefault();
})

function displayErrors(error) {
  cachedErrors.innerHTML = `<i class="fas fa-dot-circle"></i> ${error}`;
}
function clearErrors(error) {
  cachedErrors.innerHTML = '';
}

function loading() {
  loadingStyle.removeAttribute('hidden');
  results.innerHTML = '';
  setTimeout(calculations, 1500);
}

function calculations() {
  let numPeriodicPayments;
  let periodicInterest;
  let discountFactor;
  let monthlyPayments;

  //getting number of periodic payments
  numPeriodicPayments = years.value * 12;

  //getting periodic interest rate
  periodicInterest = interest.value / (100 * 12);

  //getting the discount factor
  let numerator;
  let denominator;

  numerator = ((1 + periodicInterest) ** numPeriodicPayments) - 1;
  denominator = periodicInterest * ((1 + periodicInterest) ** numPeriodicPayments);
  
  discountFactor = numerator/denominator;

  //total monthly payments 
  monthlyPayments = (loan.value / discountFactor).toFixed(2);

  displayResults(monthlyPayments);
}

function displayResults(pay) {
  loadingStyle.setAttribute('hidden','hidden');
  results.innerHTML = `<i class="fas fa-circle"></i> Your monthly payment on your loan is ${pay}`;
  loan.value = '';
  interest.value = '';
  years.value = '';
}


