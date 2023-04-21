import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchanger from './js/currency-calculator';

async function getExchangeRates(value, code) {
  const response = await CurrencyExchanger.getExchangeRates();
  if (response["conversion_rates"]) {
    convertCurrency(response["conversion_rates"], value, code);
  } else {
    printError(response);
  }
}