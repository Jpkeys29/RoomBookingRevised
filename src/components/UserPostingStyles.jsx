import { styled, Card, Container, Typography, Box, Grid2} from '@mui/material';
import { Link } from 'react-router-dom';

export const BoxStyled = styled(Box)(({ theme }) => ({
  width: '100%', 
  height: '100%'
}));

export const GridContaStyled = styled(Grid2)(({theme}) => ({
  backgroundColor: "#F5F5F5",
  justifyContent: 'center',
  padding: "15px",
  marginBottom: "20px",
}))

export const TypograStyled = styled(Box)(({theme}) => ({
  display: "flex", 
  gap: 1, backgroundColor: "#E0E0E0", 
  borderRadius: "15px", 
  padding: "4px 8px", width:"210px", 
  color: "grey.700"

}))
  

  