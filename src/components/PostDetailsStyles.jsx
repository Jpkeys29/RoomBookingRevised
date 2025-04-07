import { styled, Box, Typography, Card, CardContent, Button, Container, ImageList, ImageListItem  } from '@mui/material';

export const ContainerStyled = styled(Container)({
    display: "flex",
    justifyContent: "center", 
    alignItems: "center" 
})

export const CardStyled = styled(Card)({
    width: 1000, 
    maxWidth: 1000, 
    height: 1000, 
    marginTop: "25px",
    elevation : 3,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
})

export const TypographyStyled = styled(Typography)({
    color: "text.secondary",
    mb: 1.5 
})

// export const ButtonDeleteStyled = styled(Button)({
//     color: "error.main",
//     mb: 1.5
// })

