import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import Post from "./Post";
import client from '../sanityClient'
import { Typography } from "@mui/material";
import { BoxStyled } from "./HomeStyles";

const Home = ({message}) => {
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
      </BoxStyled>
    </div>
  );
};

export default Home;
