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

function SearchBar() {
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

    const nycBounds = {
      low: {
          latitude: 40.4774,
          longitude: -74.2591
        },
        high: {
            latitude: 40.9176,
            longitude: -73.7004,
          },
        };
      if (address.length !== 0) {
          let formatted_address = address[0].formatted_address;
          let placeLat = address[0].geometry.location.lat();
          let placeLng = address[0].geometry.location.lng();
        
          if (
            placeLat >= nycBounds.low.latitude && placeLat <= nycBounds.high.latitude &&
            placeLng >= nycBounds.low.longitude && placeLng <= nycBounds.high.longitude
          ) {
            setArea({ short_name: formatted_address, long_name: formatted_address })
          } else {
              setMessage("Type a New York City borough");    
            }
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
      // locationRestriction: {
      //     rectangle: {
      //         low: {latitude: 40.4774, longitude: -74.2591},
      //         high: {latitude: 40.9176, longitude: -73.7004}
      //       }
      //     }                   
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
            type="tex"
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


export default SearchBar
