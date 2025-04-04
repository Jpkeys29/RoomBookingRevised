import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import Post from "./Post";
import client from '../sanityClient'
import { Box, Button, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { BoxStyled, BoxPostStyled, TypograStyled } from "./HomeStyles";
import { HomePosts } from "./HomePosts";
import { useQuery } from "@tanstack/react-query";
import imageUrlBuilder from '@sanity/image-url'
import { CircularProgress } from "@mui/material";
import { CardPosting } from "./postingCards/Card";

const useallRoomPostings = () => {
  const fetchAllPostings = async () => {
    const query = '*[_type == "roomposting"]';
    const postingDetails = await client.fetch(query);
    // console.log(postingDetails)
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
    <div style={{ height: "100vh", backgroundColor:"#F5F5F5" }}>
      <BoxStyled>
        <div>
          <SearchBar />
        </div>
        <BoxPostStyled>
          {isLoading ?  
          <CircularProgress /> 
          : [...allRoomPostings]
          // .sort(() => Math.random() - 0.5)
          .slice(0, 9).map((post, i) => (
            <CardPosting  key={i}  roomPosting={post}/>  
          ))}
        </BoxPostStyled>
      </BoxStyled>
    </div>
  );
};

