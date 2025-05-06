import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent'
import { Card, CardHeader, CardMedia } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Container, Image, Badge, ButtonStyled } from './Cardstyles'
import { Box, Button } from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../sanityClient'
import { useState } from 'react';
import SearchResults from '../SearchResults';
import Avatar from '@mui/material/Avatar';
import { TypograStyled } from '../HomeStyles';

export const CardPosting = ({roomPosting}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  const builder = imageUrlBuilder(client)
  const urlFor = (source) => {
    return builder.image(source).url()
  }

  const handleNextPic = () => {
    setCurrentIndex(prev => (prev < roomPosting?.images.length - 1 ? prev + 1 : 0));
  }; 

  return (
    <Container >
      <Card style={{position: 'relative'}}>
        {roomPosting.images?.length > 0 && (
          <CardMedia
          component="img"
          image={urlFor(roomPosting.images[currentIndex].asset?._ref)}
          loading='lazy'
          style={{ aspectRatio: '3/2' }}
          /> 
          )}
        <ButtonStyled onClick={e => {
          e.preventDefault();
          handleNextPic();
        }}>►</ButtonStyled>

        <CardContent>
          <Typography variant="subtitle2">
            {/* <Badge>NEW</Badge> 3 BEDS &bull; 2 BATHS */}
          </Typography>
          <Typography variant="h6" component="h2" noWrap>
            {roomPosting?.description}
          </Typography>
          {/* <Typography variant="body1" color="textSecondary" component="p">
            {roomPosting?.neighborhood}({roomPosting?.area})
          </Typography> */}
          <Typography variant="body1" color="textSecondary" component="p" fontSize= '18px'>
            ${roomPosting?.price}
          </Typography>
          <TypograStyled>
        <Typography>{roomPosting?.neighborhood}, </Typography>
        <Typography>{roomPosting?.area}</Typography>
        </TypograStyled>

        </CardContent>
      </Card>
        </Container>
  )
}

