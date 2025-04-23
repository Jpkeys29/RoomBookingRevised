import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Home } from "./components/Home";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { SearchBar } from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { AccountForm } from "./components/AccountForm";
import { auth } from "./firebase/config";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { PostRoom } from "./components/PostRoom";
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
import {AccountUser} from "./components/AccountUser";
import PostDetails from "./components/PostDetails";
import { DrawerNav } from "./components/DrawerNav";
import { NavBar } from "./components/NavBar";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { UserPostings } from "./components/UserPostings";
import { useNavigate } from "react-router";

const useUserDetails = ({userId}) => {
  const fetchUserDetails = async () => {
    if (!userId) throw new Error('User ID is undefined');
    const userDetails = await client.getDocument(userId);
    if (!userDetails) {
      throw new Error(`No user found with ID: ${userId}`);
    }
    return userDetails;
  };
  return ( useQuery({
    queryKey: ["userInfo", userId],
    queryFn: fetchUserDetails,
    enabled: !!userId
  }))
}
 
export const App = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();

   const links = [
   {name: "Post a Room", to: "/post",},
   {name: "Account", to: "/account",},
   {name: "Logout", onClick:()=>handleLogOut()},
  ];

  const { data : userLoginDetails, error, isTryingToLoad } = useUserDetails({userId : user?.uid});

  function UserDetails({auth, client}) {
    const userId = auth?.currentUser.uid;
  };
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleLogOut = async () => {
    await signOut(auth);
    setUser(null)
    navigate('/')
  };


  return (
    <div>
      <Box sx={{ display: 'flex'}}>
        <NavBar links={links}/>
        <DrawerNav  links={links}/>
      </Box>

      <Box 
      sx={{ paddingTop: "50px", marginTop:"50px" }}
      >
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
              user ? (userLoginDetails ? (
                  <AccountUser
                  userDetails={userLoginDetails}
                  setUserDetails={setUserDetails}
                  />
                  ) : (<AccountForm />)) : 
                  (<SignIn setUser={setUser} />)}
            />
          <Route
            path="post"
            element={
              user ? (< UserPostings />) :
              (<SignIn />)}
            />
        </Routes>
      </main>
      </Box>  
    </div>
  );
}

