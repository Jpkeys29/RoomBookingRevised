import { styled, Box, Typography, Card, Stack, CardContent, Button, Container } from '@mui/material';


export const CardStyled = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(1),
    gap: theme.spacing(2),
    margin: "auto",
    border: '2px solid',
    borderColor: theme.palette.grey[300],
    boxShadow: theme.shadows[5],
    [theme.breakpoints.up("sm")]: {
      maxWidth: "450px",
      padding: theme.spacing(1),
      gap: theme.spacing(1),
      paddingBottom: theme.spacing(5),
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "600px",
      padding: theme.spacing(4),
      gap: theme.spacing(4),
      paddingBottom: theme.spacing(5),
    },
    paddingBottom: theme.spacing(5),
  }))
  
  export const SignInContainer = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(2),
    position: 'relative',
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      zIndex: -1,
      inset: 0,
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
    },
  }))

  export const TypographyStyled = styled(Typography)(({theme}) => ({
    width: "100%", 
    fontSize: "clamp(2rem, 10vw, 2.15rem)", 
    textAlign: "center" 
  }))
  