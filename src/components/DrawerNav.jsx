import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, useMediaQuery, Divider, List, Drawer, ListItem,
    ListItemButton,
    ListItemText,
    IconButton, Stack } from "@mui/material";

export function DrawerNav({links}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const drawerWidth = 240;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
      };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
          <Divider>
            <List>
              {links?.map((link, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemButton component={Link}  to={link.to} sx={{ textAlign: "center" }}>
                    <ListItemText primary={link.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Divider>

        <Box >
          <Drawer
          anchor="right"
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
          </Drawer>
        </Box>
      </Box>
      );
    

    return (

        <Box sx={{ display: 'flex', alignItems:"center", fontSize:'20px', gap:3, ml:"auto"}} >

            {!isMobile && (
              <Stack direction="row" gap={3} justifyContent="flex-end">
                {links.map((link, i) => (
                  <Link
                  key={i}
                  style={{
                    color: "#212529",
                    textDecoration: "none",
                    fontFamily: "Arial, sans-serif",
                  }}
                  to={link.to}
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            )}
          
            {isMobile && (
            <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
    )
}