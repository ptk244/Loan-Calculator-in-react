import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Pagination,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useExchangeRates } from '../hooks/useExchangeRates';

const ExchangeRateTable = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const { rates, loading, error } = useExchangeRates(baseCurrency);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  
  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };
  
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1); // Reset to first page when searching
  };
  
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  // Filter currencies based on search
  const filteredCurrencies = Object.keys(rates).filter(
    currency => currency.toLowerCase().includes(search.toLowerCase())
  );
  
  // Paginate the results
  const displayedCurrencies = filteredCurrencies.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Live Exchange Rates
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
          <FormControl fullWidth sx={{ flex: 1 }}>
            <InputLabel id="base-currency-label">Base Currency</InputLabel>
            <Select
              labelId="base-currency-label"
              value={baseCurrency}
              label="Base Currency"
              onChange={handleBaseCurrencyChange}
              disabled={loading}
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
          
          <TextField
            fullWidth
            sx={{ flex: 2 }}
            label="Search Currency"
            value={search}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {loading ? (
          <Typography variant="body1">Loading exchange rates...</Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Currency</TableCell>
                    <TableCell align="right">Exchange Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedCurrencies.map((currencyCode) => (
                    <TableRow key={currencyCode}>
                      <TableCell>{currencyCode}</TableCell>
                      <TableCell align="right">{rates[currencyCode]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination
                count={Math.ceil(filteredCurrencies.length / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </Paper>
      
      <Typography variant="body2" color="textSecondary">
        Data provided by ExchangeRate-API. Rates are updated daily.
      </Typography>
    </Box>
  );
};

export default ExchangeRateTable;