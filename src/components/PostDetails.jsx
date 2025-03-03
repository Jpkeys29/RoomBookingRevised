import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import client from "../sanityClient";
import { useState } from "react";
import {Box,Card,CardContent,CardMedia,Container,Typography,Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import imageUrlBuilder from "@sanity/image-url";
import Divider from "@mui/material/Divider";
import ContactForm from "./ContactForm";
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";
import { ContainerStyled, CardStyled, TypographyStyled } from "./PostDetailsStyles";

export default function PostDetails({user}) {
  const [postDetails, setPostDetails] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const [editMode, setEditMode ] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const builder = imageUrlBuilder(client);
  const urlFor = (source) => {
    return builder.image(source).url();
  };
  const _id = searchParams.get("_id");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSinglePosting = async () => {
      let posting = await client.getDocument(_id);
      setPostDetails(posting);
      console.log("posting", posting, _id);
    };
    fetchSinglePosting();
  }, []);

  const deletePosting = async (_id) => {
    try {
      await client.delete(_id);
      navigate("/");
      console.log(`Posting with ID ${_id} deleted successfully.`);
      setPostDetails({});
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  const updatePosting = async (updatedData) => {
    try {
      const { _id, ...rest } = updatedData;
      const updatedPosting = await client.patch(_id).set(rest).commit();

      console.log(
        `Posting with _id ${_id} updated successfully.`,
        updatedPosting
      );
      setPostDetails(updatedPosting);
      navigate('/post')
    } catch (error) {
      console.log("Error", error);
    }
  };

  const onNewDescription = (e) => {
    // console.log(e)
    setNewDescription(e.target.value);
  };

  // console.log(postDetails?.images);

  return (
    <ContainerStyled>
      <CardStyled>
        <CardMedia 
        component='img'
        sx={{ height: 190 }}
        image={postDetails?.images?.[0].asset && urlFor(postDetails.images[0].asset)}
        />
        <CardContent>
          <Grid container spacing={2}>
          {!editMode && 
          <Typography variant="h6" component="h2" noWrap>
            {postDetails?.description}
          </Typography>
          }
          {user && <Button onClick={(e) => setEditMode(!editMode)}><EditIcon/> </Button> }
          {editMode && 
          <>
          <TextField
            name="description"
            value={newDescription.description}
            onChange={onNewDescription}
            variant="standard" 
            />
            
          <Button 
            onClick={() =>updatePosting({
              _id: postDetails._id,
              description: newDescription,
            })
          }
          disabled={!postDetails}
          >
            Update
          </Button>
            </>
          }
          </Grid>

          <Divider />
          <TypographyStyled
            variant="body1"
            component="p"
          >
            {postDetails?.neighborhood}
          </TypographyStyled>
          <TypographyStyled 
          component="div"
           >
            {postDetails?.area}
          </TypographyStyled>
          <TypographyStyled
            variant="body1"
            component="p"
          >
            ${postDetails?.price}
          </TypographyStyled>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", mb: 1.5 }}
            component="p"
          >
            {postDetails?.availability}
          </Typography>
          <TypographyStyled
            variant="body1"
            component="p"
          >
            {postDetails?.amenities}
          </TypographyStyled>

        {user ? 
        (
          <ContactForm/>
          ) :
          (
            <Link
            to={'/account'}
            >
          <Typography variant="h6" style={{ textDecoration:"none"}}>Contact</Typography>     
          </Link>
        )
      }
        </CardContent>
        <Divider />
        { user && 
        <Button
          sx={{ color: "error.main", mb: 1.5 }}
          onClick={() => deletePosting(postDetails._id)}
        >
          Delete Posting
        </Button>
        }
      </CardStyled>
    </ContainerStyled>
  );
}
