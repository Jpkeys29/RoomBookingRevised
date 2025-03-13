import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
  Autocomplete
} from "@react-google-maps/api"
import { useRef, useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import Button from "@mui/material/Button"
import { use } from "react"
import { Typography } from "@mui/material"
import { BoxStyled, InputStyled, ButtonStyled } from "./SearchBarStyles";

const libraries = ["places"]

export const SearchBar = () => {
  const inputref = useRef(null)
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPS_API_KEY,
    libraries,
  })
  const [area, setArea] = useState({ short_name: "", long_name: "" })
  const navigate = useNavigate()
  const [ isLoading, setIsLoading ] = useState(false);
  const [ message, setMessage ] = useState("");
        
  const handleOnPlacesChanged = () => {
    let address = inputref.current.getPlaces()
    console.log(address)

    const LocationRestriction = () => (
      {
        rectangle : {
          low : { "latitude": 40.477398, "longitude": -74.259087},
          high : { "latitude": 40.91618, "longitude": -73.70018}
        }
      }
    ) 

    if (address && address.length > 0) {
      setArea(address[0]);
    } else {
      console.log("Type a New York City borough")
    }
  };

  const handleSearch = () => {
    try {
      if (area && area.short_name && area.long_name) {
        const searchUrl = `searchresults?area_short_name=${area.short_name}&area_long_name=${area.long_name}`
        navigate(searchUrl)
        } else {
          setArea({ short_name: "", long_name: "" })
          setIsLoading(false);
          }
        } catch (error) {
          console.error(error);
      }
    };  

    return (
      <BoxStyled >
        <Typography color="white" fontSize="1.5rem">
          {message}
        </Typography>
        {isLoaded && (
          <StandaloneSearchBox
          onLoad={(ref) => (inputref.current = ref)}
          onPlacesChanged={handleOnPlacesChanged}
          >
            <InputStyled
            type="text"
              placeholder="Type location"
              />
          </StandaloneSearchBox>
        )}
        
        <ButtonStyled
          variant="contained"
          size="large"
          onClick={handleSearch}
          disabled={isLoading}
          >
          Search
        </ButtonStyled>
      </BoxStyled>
    )
};


