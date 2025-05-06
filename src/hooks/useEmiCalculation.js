import { useState, useEffect } from 'react';
import { calculateEMI, generateAmortizationSchedule } from '../utils/calculations';

export const useEmiCalculation = () => {
  const [loanData, setLoanData] = useState({
    principal: 100000,
    rate: 5,
    duration: 60 // 5 years in months
  });
  
  const [emi, setEmi] = useState(0);
  const [schedule, setSchedule] = useState([]);
  
  useEffect(() => {
    const { principal, rate, duration } = loanData;
    const calculatedEmi = calculateEMI(principal, rate, duration);
    setEmi(calculatedEmi);
    
    const amortizationSchedule = generateAmortizationSchedule(principal, rate, duration);
    setSchedule(amortizationSchedule);
  }, [loanData]);
  
  const updateLoanData = (newData) => {
    setLoanData(prev => ({ ...prev, ...newData }));
  };
  
  return {
    loanData,
    updateLoanData,
    emi,
    schedule
  };
};