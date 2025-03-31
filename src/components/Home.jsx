import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import Post from "./Post";
import client from '../sanityClient'
import { Box, Button, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { BoxStyled, BoxPostStyled } from "./HomeStyles";
import { HomePosts } from "./HomePosts";
import { useQuery } from "@tanstack/react-query";
import imageUrlBuilder from '@sanity/image-url'
import { CircularProgress } from "@mui/material";


const useallRoomPostings = () => {
  const fetchAllPostings = async () => {
    const query = '*[_type == "roomposting"]';
    const postingDetails = await client.fetch(query);
    console.log(postingDetails)
    return postingDetails;
  };
  return useQuery({
    queryKey: ["posting"],
    queryFn: fetchAllPostings,
    enabled: true
  })
}

export const Home = ({message}) => {
  const [ currentIndex, setCurrentIndex ] = useState(0)
  const { data : roomPosting, error, isLoading} = useallRoomPostings();

  
  const handleNextPic = ({post}) => {
    setCurrentIndex(prev => (prev < post?.images.length - 1 ? prev + 1 : 0));
  }
  
  const builder = imageUrlBuilder(client)
  const urlFor = (source) => {
    if(!source) {
      console.log('No image source available');
      return "";
    }
    return builder.image(source).url()
  }
      
      return (
        <div style={{ height: "100vh", backgroundColor:"#F0F0F0" }}>
      <BoxStyled>
        <Typography>
          {message}
        </Typography>
        <div>
          <SearchBar />
        </div>
        <BoxPostStyled>
          {isLoading ?  
          <CircularProgress /> 
          : [...roomPosting]
          // .sort(() => Math.random() - 0.5)
          .slice(0, 9).map((post, i) => (
            <Card key={i}  >
              <CardHeader>
              </CardHeader>

              <CardMedia
              component="img"
              height="180"
              // image={urlFor(image.asset._ref)}
              image={urlFor(post?.images[currentIndex].asset._ref)}
              alt="room"
              />

              <Button
              onClick={handleNextPic}
              >Next ► </Button>


              <CardContent >
                <Typography variant="inherit" sx={{ fontWeight: "bold", fontSize: "20px" }}>${post.price} /mo</Typography>
                <Box
                  sx={{ display: "flex", gap: 1, backgroundColor: "#E0E0E0", borderRadius: "15px", padding: "4px 8px", width:"210px", color: "grey.700"}}
                  >
                  <Typography>{post.neighborhood},</Typography>
                  <Typography>{post.area}</Typography>
                </Box>
              </CardContent>
            </Card>
            ))}
        </BoxPostStyled>
      </BoxStyled>
    </div>
  );
};

