import { styled, Box, Typography, Card, Grid2 } from '@mui/material';

export const BoxWrapperStyled = styled(Box)(() => ({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  }))

export const SearchBarStyled = styled(Box)(({theme}) => ({
    backgroundImage:
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(/banner.jpg)",
    backgroundPosition: "center top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "40vh",
    padding: 20,
    marginBottom: 40,
}))

export const TypograStyled = styled(Box)(({theme}) => ({
    display: "flex", 
    gap: 1, backgroundColor: "#E0E0E0", 
    borderRadius: "15px", 
    padding: "4px 8px", width:"180px", 
    color: "grey.700"

}))
