import axios from 'axios';

const API_KEY = 'fc54c69f112cedd9df0c48b7'; // Replace with your actual API key

export const fetchExchangeRates = async (baseCurrency = 'USD') => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
    );
    return response.data.conversion_rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};