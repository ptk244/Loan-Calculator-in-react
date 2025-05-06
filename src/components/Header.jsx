import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'EXCHANGE RATES (LIVE)', path: '/exchange-rates' },
    { name: 'ABOUT', path: '/about' },
    { name: 'ERROR PAGE', path: '/error-example' }
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Loan Calculator
        </Typography>
        
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {navItems.map((item) => (
                <MenuItem 
                  key={item.name} 
                  component={RouterLink} 
                  to={item.path}
                  onClick={handleClose}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex' }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={RouterLink}
                to={item.path}
                sx={{ color: 'white', mx: 1 }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        )}
        
        <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;