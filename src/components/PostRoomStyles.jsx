import { styled, Box, Typography, Card, CardContent, Button } from '@mui/material';


export const BoxStyled = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "#f5f5f5",
    p: 2,
    boxShadow: 10,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '& hover': {
        transform: 'scale(1.05)',
    },
})

export const CardStyled = styled(Card)(({ theme }) => ({
    width: 500,
    padding: theme.spacing(3),
    boxShadow: theme.shadows[3], // base shadow
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  
    // '&:hover': {
    //   transform: 'scale(1.03)',              // subtle zoom-in
    //   boxShadow: theme.shadows[8],           // stronger shadow on hover
    // },
  }));

export const ButtonCreateStyled = styled(Button)({
    marginTop: "15px",
    backgroundColor: "#243156",
    textTransform: "none",
})

