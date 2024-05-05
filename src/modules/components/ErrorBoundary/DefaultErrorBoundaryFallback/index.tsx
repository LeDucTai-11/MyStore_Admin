import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'src/appConfig/paths';
import { FallbackProps } from '../CustomErrorBoundary';

const DefaultErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
  showErrorMessage = false,
}) => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    resetErrorBoundary();
    navigate(PATHS.root);
  };

  const handleTryAgain = () => {
    resetErrorBoundary();
    window.location.reload();
  };

  return (
    <Container>
      <Box minHeight="70vh" pt={8} textAlign="center">
        <Typography variant="h2">Unfortunately, something went wrong.</Typography>
        <Typography mt={4}>
          Please refresh your browser. If the error continues, please contact our support team.
        </Typography>

        {showErrorMessage && (
          <Box mt={4}>
            <pre>{error?.message}</pre>
          </Box>
        )}

        <Stack direction="row" alignItems="center" justifyContent="center" mt={4} spacing={3}>
          <Button onClick={handleBackToHome}>Back to Home</Button>
          <Button onClick={handleTryAgain} variant="outlined">
            Try again
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default DefaultErrorFallback;
