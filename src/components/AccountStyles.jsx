import { styled, Box, Typography, Card, CardContent } from '@mui/material';

export const CardStyled = styled(Card)({
    width: 440,
    height: 600
})

export const BoxStyled = styled(Box) ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
})

export const TypographyStyled = styled(Typography)({
    width: "100%",
    fontSize: "clamp(2rem, 10vw, 2.15rem)",
    textAlign: "center",
})

export const CardContentStyled = styled(CardContent) ({
    display: "flex",
    flexDirection: "column",
    // width: "50%",
    gap: 2,
    width: 400,
})



