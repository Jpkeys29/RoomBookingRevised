import { styled, Box, Typography, Card, Grid2 } from '@mui/material';

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
    flexGrow: 1,
    display: 'grid',
    // gridTemplateColumns: 'repeat(3, 1fr)',
    gap:15, marginTop: "20vh",
    padding: "20px",
    backgroundColor: "#F5F5F5",

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