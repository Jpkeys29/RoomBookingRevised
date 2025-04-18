// import { styled } from '@mui/material/styles';
import { styled, Card, Container, Typography, Box, Grid2} from '@mui/material';
import { Link } from 'react-router-dom';

export const BoxPostStyled = styled(Box)(({theme}) => ({
  flexGrow: 1,
  display: 'grid',
  gap:10, 
  marginTop: "3vh",
  marginBottom: "5vh",
  padding: "10px",
  backgroundColor: "#F5F5F5",
  textDecoration: "none",
  color: "inherit",

  [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
  },
  // [theme.breakpoints.up('lg')]: {
  //     gridTemplateColumns: 'repeat(4, 1fr)',
  // },
}))

export const TypograStyled = styled(Box)(({theme}) => ({
  display: "flex", 
  gap: 1, backgroundColor: "#E0E0E0", 
  borderRadius: "15px", 
  padding: "4px 8px", width:"210px", 
  color: "grey.700"

}))
  
export const StyledBox = styled(Box)(({ theme }) => ({
  height: '100vh',
  padding: theme.spacing(2),
}));

  