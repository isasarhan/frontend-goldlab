"use client"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Link from 'next/link';
import { useState } from 'react';

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
    <nav className="navbar navbar-expand-lg  p-3">
      <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="true"
            aria-label="Toggle navigation"
            onClick={toggleDrawer(true)}
          >
            <span className="navbar-toggler-icon"></span>
          </button></nav>
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
      <ListItem >
                <Link href="/" className="nav-link active">
                  Home
                </Link>
                </ListItem>
                <ListItem >

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  onClick={toggleDropdown}
                >
                  Customers
                </a>

                <ul className={`dropdown-menu${isDropdownOpen ? " show" : ""}`}>
                  <li>
                    <Link href="/customers/add" className="dropdown-item">
                      New
                    </Link>
                  </li>
                  <li>
                    <Link href="/customers" className="dropdown-item">
                      View All
                    </Link>
                  </li>
                </ul>
              </li>
              </ListItem>
              <ListItem >
                <Link href="/invoices" className="nav-link active">
                  All Invoices
                </Link>
              </ListItem>
              <ListItem >
                <Link href="/invoices/add" className="nav-link active">
                  New Invoice
                </Link>
              </ListItem>
              <ListItem >
                <Link href="/balances/" className="nav-link active">
                  View Balances
                </Link>
              </ListItem>
              <ListItem >
                <Link href="/payments/add" className="nav-link active">
                  New Payment
                </Link>
              </ListItem>
              <ListItem >
                <Link href="/payments/" className="nav-link active">
                  All Payment
                </Link>
              </ListItem>
              </List>
            </Box>
      </Drawer>
      <div>
        
      </div>
    </div>
    </>
  );
}
