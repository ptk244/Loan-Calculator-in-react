export const calculateEMI = (principal, rate, duration) => {
    // Convert annual interest rate to monthly and decimal form
    const monthlyRate = rate / 12 / 100;
    
    // Calculate EMI using formula: EMI = [P × R × (1+R)^N]/[(1+R)^N-1]
    const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, duration);
    const denominator = Math.pow(1 + monthlyRate, duration) - 1;
    
    return numerator / denominator;
  };
  
  export const generateAmortizationSchedule = (principal, rate, duration) => {
    const monthlyRate = rate / 12 / 100;
    const emi = calculateEMI(principal, rate, duration);
    const schedule = [];
    
    let remainingPrincipal = principal;
    
    for (let month = 1; month <= duration; month++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      const principalPayment = emi - interestPayment;
      remainingPrincipal -= principalPayment;
      
      schedule.push({
        month,
        emi: emi.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        remainingPrincipal: Math.max(0, remainingPrincipal).toFixed(2)
      });
    }
    
    return schedule;
  };