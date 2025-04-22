import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../firebase/config";
import client from "../sanityClient";
import PostDetails from "./PostDetails";
import { BoxStyled, CardStyled, ButtonCreateStyled } from "./PostRoomStyles";
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel, Select, Backdrop, CircularProgress, Snackbar, Alert } from "@mui/material";

export const PostRoom = () => {
  const [roomPosting, setRoomPosting] = useState({
    id: "",
    area: "",
    neighborhood: "",
    description: "",
    price: "",
    photo: [],
    availability: "",
    amenities: "",
  });

  const [photosArray, setPhotoArray] = useState([]);
  const [ select, setSelect] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const uploadImageToSanity = async (base64String, fileName = "image.png") => {
    try {
      const response = await client.assets.upload("image", base64String, {
        contentType: "png",
        filename: fileName, // Specify the filename for the uploaded image(passing file to sanity)
      });
      return response;
    } catch (error) {
      console.error("Image upload failed:", error.message);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!roomPosting.area || !roomPosting.description) {
      alert('Type area');
      return;
    } 

    setLoading(true);
    try {
    let images = [];
    for (const pic of roomPosting.photo) {
      const image_upload_response = await uploadImageToSanity(pic);
      let image = {
        _key: uuidv4(),
        _type: "image",
        asset: {
          _type: "reference",
          _ref: image_upload_response._id,
        },
      };
      images.push(image);
    } 
    // After all images are uploaded, create or replace the document
    await client.createOrReplace({
      _id: uuidv4(),
      _type: "roomposting",
      id: auth.currentUser.uid,
      area: roomPosting.area,
      neighborhood: roomPosting.neighborhood,
      price: roomPosting.price,
      availability: roomPosting.availability,
      description: roomPosting.description,
      amenities: roomPosting.amenities,
      images: images,
    });
    setSuccess(true);
    navigate('/');
  } catch (error) {
    console.error('Error submitting:', error);
    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
  };

  const handleSelectArea = (e) => {
    setSelect(e.target.value);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoomPosting({ ...roomPosting, [name]: value });
  };

  const handleUploadPhoto = (e) => {
    const fileReaders = [];
    const files = e.target.files;
    if (files.length > 0) {
      console.log(files);

      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        fileReaders.push(reader);

        reader.onloadend = () => {
          setPhotoArray([...photosArray, file]);
          console.log("photosArray", photosArray);
          setRoomPosting((prev) => ({
            ...prev,
            photo: [...photosArray, file], 
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <BoxStyled>
      <CardStyled>
        <CardHeader
          title={
            <Typography variant="h5" color="textPrimary" align="center">
              Post a Room
            </Typography>
          }
        />
        <CardContent component="form">
          <FormControl fullWidth>
            <FormLabel>Area </FormLabel>
            <Select
            value={roomPosting.area || ""}
            onChange={(e) => setRoomPosting({ ...roomPosting, area: e.target.value })}
            >
              <MenuItem value="Manhattan" onClick={handleSelectArea}>Manhattan</MenuItem>
              <MenuItem value="Brooklyn" onClick={handleSelectArea}>Brooklyn</MenuItem>
              <MenuItem value="Queens" onClick={handleSelectArea}>Queens</MenuItem>
              <MenuItem value="Bronx" onClick={handleSelectArea}>Bronx</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Neighborhood</FormLabel>
            <TextField
              name="neighborhood"
              value={roomPosting.neighborhood}
              onChange={handleInputChange}
              variant="outlined"
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Description</FormLabel>
            <TextField
              name="description"
              value={roomPosting.description}
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={3}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Price</FormLabel>
            <TextField
              name="price"
              value={roomPosting.price}
              onChange={handleInputChange}
              variant="outlined"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Photos</FormLabel>
            {roomPosting.photo &&
              roomPosting.photo[0] &&
              roomPosting.photo.map((p, i) => (
                <img
                key={i}
                  src={p}
                  loading="lazy"
                  alt="Uploaded Preview"
                  style={{ width: 70, height: 60 }}
                />
              ))}
            <Button variant="outlined" component="label">
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleUploadPhoto}
              />
            </Button>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Availability</FormLabel>
            <TextField
              name="availability"
              value={roomPosting.availability}
              onChange={handleInputChange}
              variant="outlined"
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Amenities</FormLabel>
            <TextField
              name="amenities"
              value={roomPosting.amenities}
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={3}
            />
          </FormControl>
          
          <ButtonCreateStyled
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Create'}
          </ButtonCreateStyled>

          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading} 
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        </CardContent>
      </CardStyled>
    </BoxStyled>
  );
};

