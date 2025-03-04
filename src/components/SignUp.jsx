import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import CssBaseline from "@mui/material/CssBaseline"
import FormControlLabel from "@mui/material/FormControlLabel"
import Divider from "@mui/material/Divider"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import MuiCard from "@mui/material/Card"
import { styled } from "@mui/material/styles"
import ForgotPassword from "./ForgotPassword"
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "./CustomIcons"
import { auth } from "../firebase/config"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { CardStyled, SignInContainer, BoxStyled, TypographyStyled} from "./SignUpStyles"

export default function SignUp({ setUser }) {
  const [emailError, setEmailError] = React.useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("")
  const [passwordError, setPasswordError] = React.useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    })
    let email = data.get("email")
    let password = data.get("password")
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log("user", user)
        setUser(user)
      })
    navigate('/')
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log("error", error)
      })
  }

  const validateInputs = () => {
    const email = document.getElementById("email")
    const password = document.getElementById("password")

    let isValid = true

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true)
      setEmailErrorMessage("Please enter a valid email address.")
      isValid = false
    } else {
      setEmailError(false)
      setEmailErrorMessage("")
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true)
      setPasswordErrorMessage("Password must be at least 6 characters long.")
      isValid = false
    } else {
      setPasswordError(false)
      setPasswordErrorMessage("")
    }

    return isValid
  }

  const handleGoogleSignUp = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user)
      })
      .catch((error) => {
        console.log(error)
      })
      navigate('/') 
  }

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <TypographyStyled
          component="h1"
          variant="h4"
        >
          Sign Up{" "}
        </TypographyStyled>

        <BoxStyled
          component="form"
          onSubmit={handleSubmit}
          noValidate
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="SignUpEmail"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
              sx={{ ariaLabel: "email" }}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Link
                component="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: "baseline" }}
              >
                Forgot your password?
              </Link>
            </Box>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="SignUpPassword"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <ForgotPassword open={open} handleClose={handleClose} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
            sx={{backgroundColor: "#243156"}}
          >
            Register
          </Button>
          <Typography sx={{ textAlign: "center" }}>
          </Typography>
        </BoxStyled>
        <Divider>or</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            onClick={() => handleGoogleSignUp()}
            startIcon={<GoogleIcon />}
            sx={{backgroundColor: "#243156"}}
          >
            Sign Up with Google
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  )
}
