import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent'
import { CardMedia } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Container, Image, Badge, ButtonStyled } from './Cardstyles'
import { Box } from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../sanityClient'
import { useState } from 'react';
import { TypograStyled } from '../HomeStyles';
import * as React from 'react';

export const CardSearch = ({posting})  => {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(posting);

  const builder = imageUrlBuilder(client)
  const urlFor = (source) => {
      return builder.image(source).url()
  }

  const handleNextPic = () => {
    setCurrentIndex(prev => (prev < posting?.images.length - 1 ? prev + 1 : 0));
  }; 

  return (
    <Container  style={{position: 'relative'}}>
      <CardContent  >
        {posting && posting.images && posting.images.length !== 0 &&
        <CardMedia
        component="img"
        image={urlFor(posting.images[currentIndex].asset?._ref)}
        loading='lazy'
        style={{ aspectRatio: '3/2'}}
        /> 
        }
        <ButtonStyled onClick={e => {
          e.preventDefault();
          handleNextPic();
        }}>►</ButtonStyled>
        <CardContent>
          <Typography variant="h6" component="h2" noWrap>
            {posting?.description}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p" fontSize= '18px'>
            ${posting?.price}
          </Typography>
          <TypograStyled>
            <Typography>{posting?.neighborhood}, </Typography>
            <Typography>{posting?.area}</Typography>
          </TypograStyled>
        </CardContent>
      </CardContent>
    </Container>
  )
}



