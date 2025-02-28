import { Drawer, styled } from "@mui/material";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";


const DrawerBar = styled(Box)({
    display: "block",
    padding: "10px",
    color: "#212529",
    fontSize : "20px",
    textDecoration: "none",
});

export const LinkStyle = styled(Link)(({theme}) => ({
    color: "#212529",
    textDecoration: "none",
    fontFamily: "Arial, sans-serif",
}));

const drawerWidth = 240;

export const StyledDrawer = styled(Drawer)(({theme}) => ({
    "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
},

}));

export function DrawerBarStyled({links, handleDrawerToggle}) {
    return(
    <Box>
        {links.map((link, i) => (
            <DrawerBar key={i}>
                <Link 
                to={link.to}
                style={{ textDecoration: "none", color: "inherit" }} 
                  >
                {link.name}
                </Link>
            </DrawerBar>
        )) }
    </Box>
    );
}

