import { styled, Box, Typography, Card, CardContent, Button, Container } from '@mui/material';

export const ContainerStyled = styled(Container)({
    display: "flex",
    justifyContent: "center", 
    alignItems: "center" 
})

export const CardStyled = styled(Card)({
    width: 500, 
    maxWidth: 600, 
    height: 600, 
    marginTop: "25px" 
})

export const TypographyStyled = styled(Typography)({
    color: "text.secondary",
    mb: 1.5 
})

// export const ButtonDeleteStyled = styled(Button)({
//     color: "error.main",
//     mb: 1.5
// })

