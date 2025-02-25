import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import imageUrlBuilder from "@sanity/image-url";
import client from "../sanityClient";
import { Link } from "react-router-dom";

const RenderedAccount = ({ userDetails }) => {
  const builder = imageUrlBuilder(client);

  const urlFor = (source) => {
    return builder.image(source);
  };
  console.log(urlFor(userDetails.image));

  return (
    <Card
      sx={{
        maxWidth: 550,
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        p: 4,
      }}
    >
      <CardHeader
        title="My Account"
        titleTypographyProps={{ align: "center", variant: "h5" }}
      />
      <CardMedia
        component="img"
        height="140"
        image={urlFor(userDetails.image)}
        alt="profile image"
        sx={{
          width: 130,
          height: 130,
          margin: "auto",
          borderRadius: "50%",
        }}
      />
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Name: {userDetails.name}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Email: {userDetails.email}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Gender: {userDetails.gender}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Occupation: {userDetails.occupation}
        </Typography>
        <Link 
        to={'/post'}
        style={{ textDecoration:"none", color:"inherit"}}
        >
          <Typography variant="h5" >My Postings</Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RenderedAccount;
