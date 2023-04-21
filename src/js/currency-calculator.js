export default class CurrencyExchanger {

  static async getExchangeRates() {
    let urlString = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;
    try {
      const response = await fetch(urlString);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}