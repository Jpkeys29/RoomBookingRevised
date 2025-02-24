import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Post from "./Post";
import Box from "@mui/material/Box";
import client from '../sanityClient'

const Home = () => {
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
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(/banner.jpg)",
          // backgroundImage: 'url(/banner.jpg)',
          backgroundPosition: "center top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "50%",
          padding: 6,
        }}
      >
        <div>
          <SearchBar />
        </div>
      </Box>
      {/* {roomPosting.slice(0,6).map((posts, index) => {
        return(
            <Post key={index} postings={posts}/>
        )
      })} */}
    </div>
  );
};

export default Home;
