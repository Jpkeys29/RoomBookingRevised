import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import Home from "./components/Home";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Account from "./components/Account";
import Post from "./components/Post";
import { auth } from "./firebase/config";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { onAuthStateChanged, signOut } from "firebase/auth";
import PostRoom from "./components/PostRoom";
import {
  Toolbar,
  useMediaQuery,
  useTheme,
  Stack,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ThreeDRotation from "@mui/icons-material/ThreeDRotation";
import SvgIcon from "@mui/material/SvgIcon";
import Button from "@mui/material/Button";
import HouseIcon from "@mui/icons-material/House";
import MenuIcon from "@mui/icons-material/Menu";
import client from "./sanityClient";
import RenderedAccount from "./components/renderedAccount";
import RenderedPosting from "./components/renderedPosting";
import PostDetails from "./components/PostDetails";
import { DrawerNav } from "./components/DrawerNav";

function App() {
  // console.log(auth?.currentUser?.uid)
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  // const [ loadingMessage, setLoadingMessage ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);


   const links = [
   {name: "Post a Room", to: "/post",},
   {name: "Account", to: "/account",},
   {name: "Logout", to: "/",},
  ];
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      // console.log(auth?.currentUser?.uid)
      let userId = auth?.currentUser?.uid;
      if (userId) {
        const userdetails = await client.getDocument(userId);
        console.log(userdetails);
        setUserDetails(userdetails);
      }
    };
    fetchUserDetails();
  }, [auth, auth?.currentUser]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleLogOut = async () => {
    await signOut(auth);
  };



  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <AppBar 
          position="sticky"
          sx={{ backgroundColor: "transparent", height: "75px", top: 0, border: "2px solid red"}}
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

              <Box sx={{ display: "flex", alignItems: "center", gap: 3, ml:"auto" }}>
                <DrawerNav links={links}/>
              </Box>

            </Box> 
          </Toolbar>
        </AppBar>
      </Box>
        
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="searchbar" element={<SearchBar />} />
          <Route path="searchresults" element={<SearchResults />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="postdetails" element={<PostDetails user={user} />} />
          <Route
            path="account"
            element={
              user ? (
                userDetails ? (
                  <RenderedAccount
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                  />
                ) : (
                  <Account />
                )
              ) : (
                <>
                  <SignIn setUser={setUser} />
                </>
              )
            }
          />
          <Route
            path="post"
            element={
              user ? (
                <>
                  <RenderedPosting /> <PostRoom />
                </>
              ) : (
                <>
                  <SignIn />

                  {/* <SignUp /> */}
                </>
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
