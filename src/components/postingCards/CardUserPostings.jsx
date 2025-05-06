import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent'
import { Card, CardHeader, CardMedia } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Container, Image, Badge, ButtonStyled } from './Cardstyles'
import { Box, Button } from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../sanityClient'
import { useState } from 'react';
import { CircularProgress } from "@mui/material";
import { TypograStyled } from '../HomeStyles';

export const CardUserPostings = ({userPostings}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
  const builder = imageUrlBuilder(client)
  const urlFor = (source) => {
    return builder.image(source).url()
  }

  const handleNextPic = () => {
    setCurrentIndex(prev => (prev < userPostings?.images.length - 1 ? prev + 1 : 0));
  };  
    
  return (
      <Card style={{position: 'relative'}}>        
          {/* <CircularProgress />  */}
        {userPostings.images?.length > 0 && (
            <CardMedia
            component="img"
            image={urlFor(userPostings.images[currentIndex].asset?._ref)}
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
            {userPostings?.description}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p" fontSize= '18px'>
            ${userPostings?.price}
          </Typography>
          <TypograStyled>
            <Typography>{userPostings?.neighborhood}, </Typography>
            <Typography>{userPostings?.area}</Typography>
          </TypograStyled>
        </CardContent>
    </Card>
  )
}



