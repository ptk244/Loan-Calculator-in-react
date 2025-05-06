import { useState, useEffect } from 'react';
import { fetchExchangeRates } from '../utils/api';

export const useExchangeRates = (baseCurrency = 'USD') => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getRates = async () => {
      try {
        setLoading(true);
        const exchangeRates = await fetchExchangeRates(baseCurrency);
        setRates(exchangeRates);
        setError(null);
      } catch (err) {
        setError('Failed to fetch exchange rates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    getRates();
  }, [baseCurrency]);
  
  return { rates, loading, error };
};