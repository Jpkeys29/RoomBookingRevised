import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import { useTheme, useMediaQuery, Divider, List, Drawer, ListItem,
    ListItemButton,
    ListItemText,
    IconButton, Stack } from "@mui/material";
import { DrawerBarStyled, StyledDrawer, LinkStyle } from "./DrawerNavStyles";

export function DrawerNav({links}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const drawerWidth = 240;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(prev => !prev);
      };

    return (

        <Box 
        sx={{ 
          display: 'flex', alignItems:"center", fontSize:'20px', gap:3, ml:"auto"
        }} 
        >
        <Box>   
          {isMobile ? (
            <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
            <MenuIcon sx={{ fontSize: 40, color: 'black' }} />
          </IconButton>
          ) : (
            <Stack direction="row" gap={3} justifyContent="flex-end">
            {links.map((link, i) => (
                <LinkStyle key={i} to={link.to} onClick={link.onClick} >
                   {link.name} 
                 </LinkStyle>
            ))}
            </Stack>
          )}
          </Box>

        <StyledDrawer
          anchor="right"
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
        >
          <Box>
              <DrawerBarStyled links={links} handleDrawerToggle={handleDrawerToggle}>
              </DrawerBarStyled>
          </Box>
          </StyledDrawer>
        </Box>
    )
}