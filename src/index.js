import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchanger from './js/currency-calculator';

async function getExchangeRates(inputCode, value, code) {
  const response = await CurrencyExchanger.getExchangeRates(inputCode);
  if (response["result"] === "success") {
    const newCurrency = convertCurrency(response["conversion_rates"], value, code);
    return newCurrency;
  } else {
    return response;
  }
}

function convertCurrency(rates, value, code) {
  const exchangeRate = rates[code];
  const convertedValue = value * exchangeRate;
  return convertedValue;
}

function printReturn(value, inputValue, inputCode, outputCode) {
  let responseDiv = document.getElementById("response");
  responseDiv.innerText = null;
  let pTag = document.createElement("p");
  pTag.append(`The value of ${inputValue} ${inputCode} is currently equivalent to ${value} ${outputCode}.`);
  responseDiv.append(pTag);
}

function printError(response) {
  let responseDiv = document.getElementById("response");
  responseDiv.innerText = null;
  let pTag = document.createElement("p");
  if (Object.is(response, NaN)) {
    pTag.append("The ISO 4217 code you have entered either does not exist, or is not supported by this application. Please check the currency code and try again.");
  } else {
    pTag.append(response);
  }
  responseDiv.append(pTag);
}

async function handleFormSubmission(event) {
  event.preventDefault();
  const inputValue = parseFloat(document.getElementById("input-value").value);
  const inputCode = document.getElementById("input-code").value;
  const outputCode = document.getElementById("output-code").value;
  const returnValue = await getExchangeRates(inputCode, inputValue, outputCode);
  if (Number.isFinite(returnValue)) {
    printReturn(returnValue, inputValue, inputCode, outputCode);
  } else {
    printError(returnValue);
  }
}

window.addEventListener("load", function() {
  this.document.querySelector("form").addEventListener("submit", handleFormSubmission);
});