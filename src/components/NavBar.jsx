import { Box, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import { DrawerNav } from "./DrawerNav";
import MenuIcon from "@mui/icons-material/Menu";
import SvgIcon from "@mui/material/SvgIcon";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

export function NavBar({links}) {
    return(
        <AppBar 
          position="fixed"
          sx={{ backgroundColor: "white", height: "75px", top: 0, zIndex: 1}}
          >
          <Toolbar sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Box display="flex" alignItems="center" >
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
                >
                <Typography>
                  <HouseIcon sx={{ color: "black", fontSize: "50px" }} />
                </Typography>
                <Typography variant="h4" color="black">
                  RoomyeNYC
                </Typography>
              </Link>
            </Box> 

            <Box 
            sx={{ mr:5, ml: "auto"}}
            >
              <DrawerNav links={links}/>
            </Box>
          </Toolbar>
        </AppBar>
    )
}
