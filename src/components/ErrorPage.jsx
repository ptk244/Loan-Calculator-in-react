import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          textAlign: 'center',
          maxWidth: 600,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          The page you are looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/"
          sx={{ mt: 2 }}
        >
          Go to Home Page
        </Button>
      </Paper>
    </Box>
  );
};

export default ErrorPage;
