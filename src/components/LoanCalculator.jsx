import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Slider,
  Button,
  Paper,
  Grid,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination
} from '@mui/material';
import { useEmiCalculation } from '../hooks/useEmiCalculation';
import { useExchangeRates } from '../hooks/useExchangeRates';
import { useAppContext } from '../context/AppContext';

const LoanCalculator = () => {
  const { loanData, updateLoanData, emi, schedule } = useEmiCalculation();
  const { currency, setCurrency } = useAppContext();
  const { rates, loading } = useExchangeRates();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  
  const handlePrincipalChange = (event) => {
    updateLoanData({ principal: Number(event.target.value) });
  };
  
  const handleRateChange = (event) => {
    updateLoanData({ rate: Number(event.target.value) });
  };
  
  const handleDurationChange = (event) => {
    updateLoanData({ duration: Number(event.target.value) });
  };
  
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };
  
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  // Convert EMI to selected currency
  const convertedEmi = rates[currency] ? (emi * rates[currency]).toFixed(2) : emi.toFixed(2);
  
  const displayedSchedule = schedule.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Loan EMI Calculator
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Loan Amount"
              type="number"
              value={loanData.principal}
              onChange={handlePrincipalChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Interest Rate (%)"
              type="number"
              value={loanData.rate}
              onChange={handleRateChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Loan Duration (months)"
              type="number"
              value={loanData.duration}
              onChange={handleDurationChange}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Typography id="duration-slider" gutterBottom>
              Loan Duration: {loanData.duration} months
            </Typography>
            <Slider
              value={loanData.duration}
              onChange={(e, newValue) => updateLoanData({ duration: newValue })}
              aria-labelledby="duration-slider"
              valueLabelDisplay="auto"
              min={12}
              max={360}
              step={12}
            />
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Monthly EMI:
            </Typography>
            <Typography variant="h4" color="primary">
              $ {emi.toFixed(2)}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="currency-label">Convert to Currency</InputLabel>
              <Select
                labelId="currency-label"
                value={currency}
                label="Convert to Currency"
                onChange={handleCurrencyChange}
              >
                {loading ? (
                  <MenuItem value="USD">Loading currencies...</MenuItem>
                ) : (
                  Object.keys(rates).map((currencyCode) => (
                    <MenuItem key={currencyCode} value={currencyCode}>
                      {currencyCode}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            
            <Typography variant="h5" sx={{ mt: 2 }}>
              Converted EMI: {currency} {convertedEmi}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      
      <Typography variant="h5" gutterBottom>
        Amortization Schedule
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>EMI</TableCell>
              <TableCell>Principal</TableCell>
              <TableCell>Interest</TableCell>
              <TableCell>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedSchedule.map((row) => (
              <TableRow key={row.month}>
                <TableCell>{row.month}</TableCell>
                <TableCell>${row.emi}</TableCell>
                <TableCell>${row.principalPayment}</TableCell>
                <TableCell>${row.interestPayment}</TableCell>
                <TableCell>${row.remainingPrincipal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(schedule.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default LoanCalculator;