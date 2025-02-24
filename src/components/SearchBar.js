import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api"
import { useRef, useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import Button from "@mui/material/Button"

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
  console.log(isLoaded)

  const handleOnPlacesChanged = () => {
    let address = inputref.current.getPlaces()
    console.log(address)
    let locality = null
    if (address.length !== 0) {
      let formatted_address = address[0].formatted_address
      // let find_locality = address_components.filter((item) => item.types.includes("locality"))
      // let short_name = find_locality[0]?.short_name
      // let long_name = find_locality[0]?.long_name
      setArea({ short_name: formatted_address, long_name: formatted_address })
    }
  }

  const handleSearch = () => {
    console.log("Area object:", area)
    if (area && area.short_name && area.long_name) {
      const searchUrl = `searchresults?area_short_name=${area.short_name}&area_long_name=${area.long_name}`
      navigate(searchUrl)
    } else {
      setArea({ short_name: "", long_name: "" })
    }
  }

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
      >
        Search
      </Button>
    </div>
  )
}

export default SearchBar
