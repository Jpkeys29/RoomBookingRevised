import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia, Container, Grid2 } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import imageUrlBuilder from "@sanity/image-url";
import client from "../sanityClient";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";
// import { Postings } from "./Postings";
import PostDetails from "./PostDetails";
import { PostRoom } from "./PostRoom";
import { CircularProgress } from "@mui/material";
import { BoxPostStyled, TypograStyled, StyledBox } from "./UserPostingStyles";
import { CardUserPostings } from "./postingCards/CardUserPostings";
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const UserPostings = () => {
  const [postingDetails, setPostingDetails] = useState([]);
  useEffect(() => {
    const fetchPostingDetails = async () => {
      let userId = auth?.currentUser?.uid;
      if (userId) {
        const query = '*[_type == "roomposting" && id == $userId]';
        const params = { userId: userId };
        const postsByAccount = await client.fetch(query, params);
        setPostingDetails(postsByAccount);
      }
    };
    fetchPostingDetails();
  }, [auth, auth?.currentUser]);

  const builder = imageUrlBuilder(client)
    const urlFor = (source) => {
        return builder.image(source).url()
    }
  
  return (
    <Box sx={{ width: '100%', height: '100%'}}> 
        {postingDetails > 0 &&
        (<TypograStyled variant="h5" gutterBottom align="center" paddingTop={2}>
          My Postings
        </TypograStyled>)
        }
      {/* <BoxPostStyled> */}
      

      <Grid2 container
      spacing={{ xs: 2, md: 3}}
      columns={{ xs: 4, sm: 8, md: 12}}
      sx={{backgroundColor: "#F5F5F5",
      justifyContent: 'center',
      padding: "15px",
      marginBottom: "20px",
    }}
    >
        {postingDetails.map((p, index) => (
          <Grid2 
          size={{ xs: 4, sm: 4, md: 4}}
          key={index}
          component={Link}
          to={`/postdetails?_id=${p._id}`}
          style={{ textDecoration:"none", color:"inherit"}}
          >
            <CardUserPostings userPostings={p} />
          </Grid2>
          ))} 
        </Grid2>
      {/* </BoxPostStyled> */}
      <PostRoom />
    </Box>
  );
}
