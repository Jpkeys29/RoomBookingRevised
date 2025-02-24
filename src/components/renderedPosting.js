import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia, Container } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import imageUrlBuilder from "@sanity/image-url";
import client from "../sanityClient";
import { auth } from "../firebase/config";
import CardPosting from "./postingCards/Card";
import { Link } from "react-router-dom";

function RenderedPosting() {
  const [postingDetails, setPostingDetails] = useState([]);
  useEffect(() => {
    const fetchPostingDetails = async () => {
      let userId = auth?.currentUser?.uid;
      if (userId) {
        const postingDetails = await client.fetch();
        const query = '*[_type == "roomposting" && id == $userId]';
        const params = { userId: userId };
        const postsByAccount = await client.fetch(query, params);
        // console.log(postsByAccount);
        setPostingDetails(postsByAccount);
      }
    };
    fetchPostingDetails();
  }, [auth, auth?.currentUser]);
  return (
    <Box
    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      // sx={{
      //   display: "flex",
      //   justifyContent: "center",
      //   flexDirection: "row",
      //   alignItems: "center",
      //   height: "100vh",
      //   gap: "16px",
      //   backgroundPosition: "center top",
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      //   height: "50%",
      //   padding: 3,
      // }}
    >
      
      <Box >
        <Typography variant="h5" gutterBottom align="center" paddingTop={2}>
          My Postings
        </Typography>
        <Box
        paddingTop={2}
        minHeight="45vh"
        >
        <Grid container spacing={2} justifyContent="center">
        {postingDetails.map((p, index) => (
          <Grid size={4} key={index}  xs={12} sm={6} md={4} >
            <Box
              key={index}
              component={Link}
              sx={{ textDecoration: "none", color: "inherit" }}
              to={`/postdetails?_id=${p._id}`}
              >
              <CardPosting posting={p} />
            </Box>
          </Grid>
        ))}
        </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default RenderedPosting;
