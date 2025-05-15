import { styled } from '@mui/material/styles';
import { Container, Typography, Box, Grid2} from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  height: '100vh',
  padding: theme.spacing(2),
}));

export const StyledGrid = styled((props) => (
    <Grid2 
    container 
    rowSpacing={4}
    columnSpacing={{ md: 4 }}
    {...props} 
    />
    ))(({ theme }) => ({
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      overflowY: 'auto',
      padding: theme.spacing(2),
  
      // Optional: if you want a max width layout
      maxWidth: '1200px',
      margin: '0 auto',
  
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
      },
    })
  );

  export const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
    display: 'block', // ensures it takes full width inside the card
  });




  
  

