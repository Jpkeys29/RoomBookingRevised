import { styled, Box, Typography, Card, CardContent, Button, Container } from '@mui/material';

export const BoxStyled = styled(Box)({
    marginTop: "10%", textAlign: "center"
})

export const InputStyled = styled('input')({
    boxSizing: "border-box",
                border: "1px solid transparent",
                width: "40%",
                height: "60px",
                padding: "0 12px",
                borderRadius: "5px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                fontSize: "14px",
                outline: "none",
                textOverflow: "ellipses",
                marginTop: "40px",
})

export const ButtonStyled = styled(Button)({
    marginTop: "15px", 
    backgroundColor:"#243156", 
    textTransform:"none"

})