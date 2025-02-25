import styled from 'styled-components'

import { Card } from '@mui/material'
// import MUIRating from '@material-ui/lab/Rating'

export const Container = styled(Card)`
  max-width: 400px;
`

export const Image = styled.img`
  max-width: 100%;
  height: auto;
`

export const Badge = styled.span`
  display: inline-block;
  border-radius: 9999px;
  background: #b2f5ea;
  color: #234e52;
  padding: 0 8px;
  font-weight: bold;
`

export const RatingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

// export const Rating = styled(MUIRating)`
//   & .MuiRating-iconFilled {
//     color: #319795;
//   }
// `
