"use client";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { useState } from "react";
import { IoIosHome } from "react-icons/io";
import { FaReceipt, FaUser, FaUserPlus, FaUsers } from "react-icons/fa6";
import { GoPackage } from "react-icons/go";
import { TbPackages } from "react-icons/tb";

import { FaBalanceScale } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import ItemList from "./ItemList";
import NavItem from "./navItem";
import { FiPackage } from "react-icons/fi";

export default function MainMenu() {
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
        <List>
          
          <ItemList
            icon={<IoIosHome color="#0177B6" />}
            link={"/"}
            text={"Home"}
          />
          <Divider textAlign="left">Customers</Divider>
          <ItemList
            icon={<FaUsers color="#0177B6" />}
            link={"/customers/"}
            text={"Customers"}
          />
          <ItemList
            icon={<FaUserPlus color="#0177B6" />}
            link={"/customers/add"}
            text={"Add Customer"}
          />
          <ItemList
            icon={<FaBalanceScale color="#0177B6" />}
            link={"/balances/"}
            text={"View Balances"}
          />
          <Divider />
          <Divider textAlign="left">Invoices</Divider>

          <ItemList
            icon={<FaReceipt color="#0177B6" />}
            link={"/invoices"}
            text={"All Invoices"}
          />
          <ItemList
            icon={<FaReceipt color="#0177B6" />}
            link={"/invoices/add"}
            text={"New Invoice"}
          />

          <Divider />
          <Divider textAlign="left">Payments</Divider>

          <ItemList
            icon={<MdOutlinePayment color="#0177B6" />}
            link={"/payments/"}
            text={"New Payment"}
          />
          <ItemList
            icon={<MdOutlinePayment color="#0177B6" />}
            link={"/payments/add"}
            text={"All Payments"}
          />
          <Divider />
          <Divider textAlign="left">Supplies</Divider>

          <ItemList
            icon={<FiPackage color="#0177B6" />}
            link={"/supply/add"}
            text={"Add Supply"}
          />
          <ItemList
            icon={<FaUserPlus color="#0177B6" />}
            link={"/supplier/add"}
            text={"Add Supplier"}
          />
          <ItemList
            icon={<TbPackages color="#0177B6" />}
            link={"/inventory"}
            text={"Update Inventory"}
          />
          <Divider />
        </List>
    </>
  );
}
