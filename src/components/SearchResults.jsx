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
import { useSearchParams } from "react-router-dom";
import client from "../sanityClient";
import { CardSearch } from "./postingCards/CardSearch";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { StyledContainer, StyledTypography, StyledBox, StyledGrid, StyledLink } from "./SearchResultStyles";
import { TypograStyled, BoxStyled, GridContaStyled } from "./UserPostingStyles";


const SearchResults = () => {
  const [posting, setPosting] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const area_short_name = searchParams.get("area_short_name"); // e.g., ?myParam=value
  const area_long_name = searchParams.get("area_long_name"); // e.g., ?myParam=value
  console.log("log in search results", area_long_name, area_short_name);
  const [ loading, setLoading ] = useState(false);
  const [ message, setMessage ] = useState("")
        

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
        setLoading(true);
        const query = `*[_type == "roomposting" && 
        ("${area_short_name}" match area || 
        "${area_long_name}" match neighborhood ||
        "${area_long_name}" match area || 
        "${area_short_name}" match neighborhood )]`;

        const results = await client.fetch(query);
        setLoading(false);
        console.log("results",results);
        console.log("results",area_short_name);
        setPosting(results);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching the data:", error);
      }
    };
    fetchPosting();
  }, []);

  return (
    <BoxStyled> 
      <StyledTypography>
        Results
      </StyledTypography>
      <GridContaStyled
      container
      spacing={{ xs: 2, md: 3}}
      columns={{ xs: 4, sm: 8, md: 12}}
      >
        { loading ? (
          <CircularProgress /> 
          ) : 
            posting.length === 0 ? (
              <>
            <p>No postings available 😞</p>
            </> 
        ) : (
          posting.map((p, index) => (
              <StyledLink 
              to={`/postdetails?_id=${p._id}`}
              key={index}
              >
                <CardSearch posting={p} />
              </StyledLink>
          ))
        )}
      </GridContaStyled
      >
    </BoxStyled>
  );
};

export default SearchResults;
