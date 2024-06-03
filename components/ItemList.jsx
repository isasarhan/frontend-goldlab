import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import React from "react";

const ItemList = ({ link, text, icon, open }) => {
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }} LinkComponent={Link} to={link}>
       
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export default ItemList;
