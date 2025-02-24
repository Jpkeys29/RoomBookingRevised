import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import client from "../sanityClient";
import { auth } from "../firebase/config"
import axios from "axios";
import { Buffer } from 'buffer';

const Account = () => {
  const [userProfile, setUserProfile] = useState({
    id: "",
    name: "",
    email: "",
    photo: "",
    gender: "",
    occupation: "",
  })

  const navigate = useNavigate()

  const uploadImageToSanity = async (base64String, fileName = 'image.png') => {
    try{
      const response = await client.assets.upload('image', base64String, { 
        contentType: "png",filename: fileName    // Specify the filename for the uploaded image(passing file to sanity)
        });
        return response 
    } catch (error) { console.error('Image upload failed:', error.message); throw error; }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(userProfile,auth.currentUser.uid)
    let image_upload_response = await uploadImageToSanity(userProfile.photo)
    console.log("image_upload_response", image_upload_response)
      await client.createOrReplace({_id:auth.currentUser.uid , _type:"accountdetails",id: auth.currentUser.uid, name:userProfile.name, email:userProfile.email, gender:userProfile.gender, occupation:userProfile.occupation,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: image_upload_response._id
        }}
    })
    window.location.reload();  //refreshing page 
  }

  const handleChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value })
  }

  const handleRadioButton = (e) => {
    const { name, value } = e.target
    setUserProfile({
      ...userProfile,
      [name]: value,
    })
  }

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserProfile((prev) => ({
          ...prev,
          photo: file,
        }))
      }
      reader.readAsDataURL(file)
    }
  }
  
  console.log("userProfile", userProfile)

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: 440, height: 600 }} variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            textAlign: "center",
          }}
        >
          Account{" "}
        </Typography>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            gap: 2,
            width: 400,
          }}
        >
          <FormControl>
            <FormLabel>Name</FormLabel>
            <TextField
              onChange={handleChange}
              id="name"
              type="name"
              name="name"
              placeholder="name"
              autoComplete="name"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: "name" }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              onChange={handleChange}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: "email" }}
            />
          </FormControl>

          <FormLabel>Photo</FormLabel>
          {userProfile.photo ? (
            <img
              src={userProfile.photo}
              alt="Uploaded Preview"
              style={{ width: 56, height: 56, borderRadius: "50%" }}
            />
          ) : (
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          )}
          <Button variant="outlined" component="label">
            Upload Photo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleUploadPhoto}
            />
          </Button>

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              value={userProfile.gender}
              onChange={handleRadioButton}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Occupation
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="occupation"
              value={userProfile.occupation}
              onChange={handleRadioButton}
            >
              <FormControlLabel
                value="professional"
                control={<Radio />}
                label="Professional"
              />
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            Create
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Account
