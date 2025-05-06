import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useAppContext } from './context/AppContext';
import Header from './components/Header';
import LoanCalculator from './components/LoanCalculator';
import ExchangeRateTable from './components/ExchangeRateTable';
import ErrorPage from './components/ErrorPage';
import './App.css';

function App() {
  const { darkMode } = useAppContext();
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Routes>
            <Route path="/" element={<LoanCalculator />} />
            <Route path="/exchange-rates" element={<ExchangeRateTable />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

const About = () => {
  return (
    <Box>
      <h1>About This App</h1>
      <p>
        This Loan Calculator App is a modern, single-page web application built using React JS and Material UI. 
        It allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule, 
        and see real-time currency conversions of their EMI using live exchange rates.
      </p>
      <h2>Technologies Used</h2>
      <ul>
        <li>React (Hooks, Routing, Context API)</li>
        <li>Material UI for styling and responsive components</li>
        <li>Axios for API calls</li>
        <li>Exchange Rate API for real-time currency conversion</li>
      </ul>
    </Box>
  );
};

export default App;