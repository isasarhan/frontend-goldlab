"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import { useState } from "react";
import { IoIosHome } from "react-icons/io";
import { FaReceipt, FaUser, FaUsers } from "react-icons/fa6";
import { FaBalanceScale } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import ItemList from "./ItemList";

export default function OffCanvasMenu() {
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
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
        </button>
      </nav>
      <div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250 }} role="presentation">
            <List>
              <ListItem>
                <Link href="/" className="nav-link">
                  <ListItemButton>
                    <ListItemIcon>
                      <IoIosHome />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <FaUsers />
                  </ListItemIcon>

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      onClick={toggleDropdown}
                    >
                      Customers
                    </a>
                    <ul
                      className={`dropdown-menu${
                        isDropdownOpen ? " show" : ""
                      }`}
                    >
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
                </ListItemButton>
              </ListItem>
              <ItemList
                icon={<FaReceipt />}
                link={"/invoices"}
                text={"All Invoices"}
              />
              <ItemList
                icon={<FaReceipt />}
                link={"/invoices/add"}
                text={"New Invoice"}
              />
              <ItemList
                icon={<FaBalanceScale />}
                link={"/balances/"}
                text={"View Balances"}
              />
              <ItemList
                icon={<MdOutlinePayment />}
                link={"/payments/"}
                text={"New Payment"}
              />
              <ItemList
                icon={<MdOutlinePayment />}
                link={"/payments/add"}
                text={"All Payments"}
              />
            </List>
          </Box>
        </Drawer>
        <div></div>
      </div>
    </>
  );
}
