import { styled, Box, Typography, Card } from '@mui/material';

export const BoxStyled = styled(Box)(({theme}) => ({
    backgroundImage:
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(/banner.jpg)",
    backgroundPosition: "center top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "50%",
    padding: 6,
}))

export const BoxPostStyled = styled(Box)(({theme}) => ({
    display: 'grid',
     gridTemplateColumns: 'repeat(3, 1fr)',
      gap:4, marginTop: "20vh" 
}))