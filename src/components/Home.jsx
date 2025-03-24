import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import Post from "./Post";
import client from '../sanityClient'
import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { BoxStyled, BoxPostStyled } from "./HomeStyles";
import { HomePosts } from "./HomePosts";


export const Home = ({message}) => {
  const [roomPosting, setRoomPosting] = useState([]);

  useEffect(() => {
    const fetchRoomPosting = async () => {
      const query = '*[_type == "roomposting"]';
      const postsGeneral = await client.fetch(query);
      console.log(postsGeneral);
      setRoomPosting(postsGeneral);
    };
    fetchRoomPosting();
  }, []);

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
          {[...roomPosting]
          .sort(() => Math.random() - 0.5)
          .slice(0, 9).map((post, i) => (
              <Card key={i}  >
                <CardHeader>

                </CardHeader>
                <CardMedia
                component="img"
                height="180"
                image={post.images?.[0]._key}
                alt="room"
                />
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

