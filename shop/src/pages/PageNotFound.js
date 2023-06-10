import { Box, Typography } from '@mui/material';
import Logo from '../assets/oops.png';
import { useTranslation } from "react-i18next";

const PageNotFound = () => {
  const { t } = useTranslation();

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
      
      <Box component="img" src={Logo} sx={{ height: '25vh', width: 'auto' }} />
      <Typography variant="h1" color="primary" pt={1}>
        {t('404')}
      </Typography>
      <Typography variant="h6" color="textSecondary">
        {t('Page not found')}
      </Typography>
    </Box>
  );
};

export default PageNotFound;
