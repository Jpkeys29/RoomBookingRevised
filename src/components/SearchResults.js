import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid2";
import Post from "./Post";
import { useSearchParams } from "react-router-dom";
import client from "../sanityClient";
import CardPosting from "./postingCards/Card";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";

const SearchResults = () => {
  const [posting, setPosting] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const area_short_name = searchParams.get("area_short_name"); // e.g., ?myParam=value
  const area_long_name = searchParams.get("area_long_name"); // e.g., ?myParam=value
  console.log("log in search results", area_long_name, area_short_name);

  function findCommonWords(str1, str2) {
    // Split strings into arrays of words
    const words1 = str1.toLowerCase().split(/\W+/);
    const words2 = str2.toLowerCase().split(/\W+/);

    // Find common words using a Set for faster lookups
    const commonWords = words1.filter((word) => words2.includes(word));

    // Remove duplicates by converting the result to a set and back to an array
    return [...new Set(commonWords)];
  }

  useEffect(() => {
    const fetchPosting = async () => {
      try {
        const query = `*[_type == "roomposting" && ("${area_short_name}" match area || "${area_long_name}" match neighborhood || "${area_long_name}" match area || "${area_short_name}" match neighborhood )]`;

        const results = await client.fetch(query);
        console.log("results", results);
        setPosting(results);
      } catch (error) {
        console.log("Error fetching the data:", error);
      }
    };
    fetchPosting();
  }, []);

  return (
    <Container> 
      <Typography variant="h5" gutterBottom align="center">
        Search Results
      </Typography>
      <Box
      height="100vh"
      padding={2}
      >
      <Grid
       container
       justifyContent='center'
       alignItems="center"
       rowSpacing={4}
       columnSpacing={{ md: 4 }}
       xs={12} sm={6} md={4}
      >
        {posting.length === 0 ? (
          <p>Loading...</p>
        ) : (
          posting.map((p, index) => (
            <Grid item xs={12} md={4} key={p._id}>
              {console.log (JSON.stringify(p, null, 2))}
              <Link
              to={`/postdetails?_id=${p._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardPosting posting={p} />
              </Link>
            </Grid>
          ))
        )}
      </Grid>
      </Box>
    </Container>
  );
};

export default SearchResults;
