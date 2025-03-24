import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import Post from "./Post";
import client from '../sanityClient'
import { Box, Card, CardContent, Typography } from "@mui/material";
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
    <div style={{ height: "100vh" }}>
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
              <Card key={i} >
                <CardContent>
                  <Typography>{post.area}</Typography>
                  {/* <Typography>{post.images?.[0]._key}</Typography> */}
                  <Typography>${post.price}</Typography>
                </CardContent>
              </Card>
            ))}
        </BoxPostStyled>
      </BoxStyled>
    </div>
  );
};

