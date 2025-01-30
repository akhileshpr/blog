import React from "react";
import { Link } from "react-router-dom";
import { Box, Drawer, List, ListItem, ListItemText, Typography, Divider } from "@mui/material";
import Navbar from "./navbar";

const Sidebar = () => {
    const menu = [
        { name: "Profile", path: "/dashboard" },
        { name: "Post", path: "post" },
        { name: "Blogs", path: "blog" },
    ]
  return (
    <>
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
            
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ textAlign: "center", p: 2 }}>
              User
            </Typography>
            <Divider />
            <List>
              {menu.map((item) => (
                <ListItem button  key={item.name} component={Link} to={item.path}>
                  <ListItemText sx={{border:'1px solid black', borderRadius:'5px',padding:'0.5rem'}} primary={item.name} />
                </ListItem>
              ))}
              <ListItem>
                <Link to={'/home'} style={{border:'1px solid black', borderRadius:'5px',padding:'0.5rem', width:'100%',textDecoration:"none"}}>Return to Home</Link>
              </ListItem>
            </List>
          </Box>
        </Drawer>
    </>
  );
};

export default Sidebar;
