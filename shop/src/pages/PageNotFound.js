import { Box, Typography } from '@mui/material';
import Logo from '../assets/oops.png';

const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      
      <Box component="img" src={Logo} sx={{ height: '23vh', width: 'auto' }} />
      <Typography variant="h1" color="primary">
        404
      </Typography>
      <Typography variant="h6" color="textSecondary">
        Page not found
      </Typography>
    </Box>
  );
};

export default PageNotFound;
