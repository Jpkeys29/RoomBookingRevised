import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import client from '../sanityClient'
import { Box, Button, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { TypograStyled, SearchBarStyled } from "./HomeStyles";
import { useQuery } from "@tanstack/react-query";
import imageUrlBuilder from '@sanity/image-url'
import { CircularProgress } from "@mui/material";
import { CardPosting } from "./postingCards/Card";
import { StyledContainer, StyledTypography, StyledBox, StyledGrid, StyledLink } from "./SearchResultStyles";
import { BoxStyled, GridContaStyled } from "./UserPostingStyles";


const useallRoomPostings = () => {
  const fetchAllPostings = async () => {
    const query = '*[_type == "roomposting"]';
    const postingDetails = await client.fetch(query);
    return postingDetails;
  };
  return useQuery({
    queryKey: ["posting"],
    queryFn: fetchAllPostings,
    enabled: true
  })
}

export const Home = ({message}) => {
  const { data : allRoomPostings, error, isLoading} = useallRoomPostings();
      
  return (
      <BoxStyled>
        <SearchBarStyled>
          <Box sx={{ marginTop: -10 }}>
            <SearchBar />
          </Box >
        </SearchBarStyled>

        <GridContaStyled
        container
        spacing={{ xs: 2, md: 3}}
        columns={{ xs: 4, sm: 8, md: 12}}
        >
          {isLoading ?
          <CircularProgress /> 
          : [...allRoomPostings]
          // .sort(() => Math.random() - 0.5)
          .slice(0, 9).map((post, i) => (
            <StyledLink
            key={i}
            to={`/postdetails?_id=${post._id}`}
            >
              <CardPosting  roomPosting={post}/>  
            </StyledLink>
          ))}
        </GridContaStyled>
      </BoxStyled>
  );
};

