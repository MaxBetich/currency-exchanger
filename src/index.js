import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchanger from './js/currency-calculator';

async function getExchangeRates(value, code) {
  const response = await CurrencyExchanger.getExchangeRates();
   if (response["result"] === "success") {
    const newCurrency = convertCurrency(response["conversion_rates"], value, code);
    return newCurrency;
  } else {
    //console.log("this is the failure response", response);
    return response;
  }
}

function convertCurrency(rates, value, code) {
  const exchangeRate = rates[code];
  const convertedValue = value * exchangeRate;
  return convertedValue;
}

function printReturn(value, inputValue, inputCode) {
  let responseDiv = document.getElementById("response");
  responseDiv.innerText = null;
  let pTag = document.createElement("p");
  pTag.append(`The value of ${inputValue} USD is currently equivalent to ${value} ${inputCode}.`);
  responseDiv.append(pTag);
}

function printError(response) {
  console.log("this is the error function");
  console.log(response);
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
  //console.log("this is the returnValue", returnValue);
  if (Number.isFinite(returnValue)) {
    printReturn(returnValue, inputValue, inputCode);
  } else {
    printError(returnValue);
  }
}

window.addEventListener("load", function() {
  this.document.querySelector("form").addEventListener("submit", handleFormSubmission);
});