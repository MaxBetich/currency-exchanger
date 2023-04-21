import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchanger from './js/currency-calculator';

async function getExchangeRates(value, code) {
  const response = await CurrencyExchanger.getExchangeRates();
   if (response["result"] === "success") {
    convertCurrency(response["conversion_rates"], value, code);
  } else {
    return response;
  }
}

function convertCurrency(rates, value, code) {
  const exchangeRate = rates[code];
  console.log("this is the exchange rate ", exchangeRate);
  const convertedValue = value * exchangeRate;
  return convertedValue;
}

function printReturn(value, inputValue, inputCode) {
  // console.log("this is the return function");
  // console.log(value);
  let responseDiv = document.getElementById("response");
  responseDiv.innerText = null;
  let pTag = document.createElement("p");
  pTag.append(`The value of ${inputValue} USD is currently equivalent to ${value} ${inputCode}.`);
  responseDiv.append(pTag);
}

function printError(response) {
  // console.log("this is the error function");
  // console.log(response);
  let responseDiv = document.getElementById("response");
  responseDiv.innerText = null;
  let pTag = document.createElement("p");
  pTag.append(response);
  responseDiv.append(pTag);
}

async function handleFormSubmission(event) {
  event.preventDefault();
  const inputValue = parseFloat(document.getElementById("input-value").value);
  const inputCode = document.getElementById("code").value;
  const returnValue = await getExchangeRates(inputValue, inputCode);
  if (returnValue != Number) {
    printError(returnValue);
  } else {
    printReturn(returnValue, inputValue, inputCode);
  }
}

window.addEventListener("load", function() {
  this.document.querySelector("form").addEventListener("submit", handleFormSubmission);
});