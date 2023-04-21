import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchanger from './js/currency-calculator';

async function getExchangeRates(value, code) {
  const response = await CurrencyExchanger.getExchangeRates();
  if (response["conversion_rates"]) {
    convertCurrency(response["conversion_rates"], value, code);
  } else {
    return response;
  }
}

function convertCurrency(rates, value, code) {
  const exchangeRate = rates[code];
  const convertedValue = value * exchangeRate;
  return convertedValue;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputValue = parseInt(document.getElementById("input-value").value);
  const inputCode = document.getElementById("code").value;
  const returnValue = getExchangeRates(inputValue, inputCode);
  if (returnValue != Number) {
    printError(returnValue);
  } else {
    printReturn(returnValue);
  }
}