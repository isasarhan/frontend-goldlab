"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Dashboard from "./dashboard/dashboard";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AdminDashboard({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [id, setId] = React.useState();
  const router = useRouter();
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
    Cookies.remove("currentUser");
    router.refresh();
  };
  const getUser = () => {
    const user = JSON.parse(Cookies.get("currentUser")).data;
    setId(user.id);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
      <div>
        <Dashboard />

        { children }
      </div>

    // <Box sx={{ display: "flex" }}>
    //   <CssBaseline />
    //   <AppBar 
    //     position="fixed"
    //     open={open}
    //     style={{ backgroundColor: "#0077b6" }}
    //   >
    //     <Toolbar className="justify-content-between ">
    //       <div className="d-flex  flex-row align-items-center ">
    //         <IconButton
    //           color="inherit"
    //           aria-label="open drawer"
    //           onClick={handleDrawerOpen}
    //           edge="start"
    //           sx={{ mr: 2, ...(open && { display: "none" }) }}
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //         <Typography variant="h6" noWrap component="div">
    //           Gold Lab Management System
    //         </Typography>
    //       </div>
    //       <div className="d-flex  flex-row align-items-center ">
    //         <Link href={`/users/${id}`} className="nav-link active p-2">
    //           <FaRegUserCircle onClick={getUser} size="25px" />
    //         </Link>
    //         <button className="btn btn-dark me-2">
    //           <Link href="/auth/register" className="nav-link ">
    //             Register
    //           </Link>
    //         </button>
           
    //           <button className="btn btn-danger md-2 me-2" onClick={logout}>
    //             Logout
    //           </button>
            
    //           <button className="btn btn-success md-2">
    //             <Link href="/auth/login" className="nav-link ">
    //               Sign In
    //             </Link>
    //           </button>
            
    //       </div>
    //     </Toolbar>
    //   </AppBar>
    //   <Drawer
    //     sx={{
    //       width: drawerWidth,
    //       flexShrink: 0,
    //       "& .MuiDrawer-paper": {
    //         width: drawerWidth,
    //         boxSizing: "border-box",
    //       },
    //     }}
    //     variant="persistent"
    //     anchor="left"
    //     open={open}
    //   >
    //     <DrawerHeader>
    //       <IconButton onClick={handleDrawerClose}>
    //         {theme.direction === "ltr" ? (
    //           <ChevronLeftIcon />
    //         ) : (
    //           <ChevronRightIcon />
    //         )}
    //       </IconButton>
    //     </DrawerHeader>
    //     <Divider />
    //     <MainMenu />
    //   </Drawer>
    //   <Main open={open}>
    //     <DrawerHeader />
    //     {children}
    //   </Main>
    // </Box>
  );
}
