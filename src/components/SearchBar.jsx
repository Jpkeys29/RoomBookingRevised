import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api"
import { useRef, useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import Button from "@mui/material/Button"

const libraries = ["places"]

// function SearchBar() {
//   const inputref = useRef(null)
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPS_API_KEY,
//     libraries,
//   })

//   const requestLocation = async () => {
//     try {
//       const response = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           "includedTypes": [
//             "apartment_building", "apartment_complex", "condominium_complex", "street_address"
//           ],
//           "locationRestriction": {
//             "circle": {
//               "center": {
//                 "latitude": 40.6958,
//                 "longitude": -73.9171
//               },
//               "radius": 500.0
//             }
//           }
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(data); 
//     } catch (error) {
//       console.error("Error fetching location:", error);
//     }
// };


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
        console.log("Your search sucks!");    
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

  return (
    <div style={{ marginTop: "10%", textAlign: "center" }}>
      {isLoaded && (
        <StandaloneSearchBox
          onLoad={(ref) => (inputref.current = ref)}
          onPlacesChanged={handleOnPlacesChanged}
        >
          <input
            type="tex"
            placeholder="Type location"
            style={{
              boxSizing: "border-box",
              border: "1px solid transparent",
              width: "40%",
              height: "60px",
              padding: "0 12px",
              borderRadius: "5px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              fontSize: "14px",
              outline: "none",
              textOverflow: "ellipses",
              marginTop: "40px",
            }}
          />
        </StandaloneSearchBox>
      )}

      <Button
        variant="contained"
        size="large"
        sx={{ marginTop: "15px", backgroundColor:"#243156", textTransform:"none" }}
        onClick={handleSearch}
        disabled={isLoading}
      >
       Search
      </Button>
    </div>
  )
}

export default SearchBar
