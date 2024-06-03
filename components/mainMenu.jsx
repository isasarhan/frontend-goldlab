"use client";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { IoIosHome } from "react-icons/io";
import { FaReceipt, FaUserPlus, FaUsers } from "react-icons/fa6";
import { TbPackages } from "react-icons/tb";

import { FaBalanceScale } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import ItemList from "./ItemList";
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
          open={open}
        />
        <Divider textAlign="left">Customers</Divider>
        <ItemList
          icon={<FaUsers color="#0177B6" />}
          link={"/customers/"}
          text={"Customers"}
          open={open}
        />
        <ItemList
          icon={<FaUserPlus color="#0177B6" />}
          link={"/customers/add"}
          text={"Add Customer"}
          open={open}
        />
        <ItemList
          icon={<FaBalanceScale color="#0177B6" />}
          link={"/balances/"}
          text={"View Balances"}
          open={open}
        />
        <Divider />
        <Divider textAlign="left">Invoices</Divider>

        <ItemList
          icon={<FaReceipt color="#0177B6" />}
          link={"/invoices"}
          text={"All Invoices"}
          open={open}
        />
        <ItemList
          icon={<FaReceipt color="#0177B6" />}
          link={"/invoices/add"}
          text={"New Invoice"}
          open={open}
        />

        <Divider />
        <Divider textAlign="left">Payments</Divider>

        <ItemList
          icon={<MdOutlinePayment color="#0177B6" />}
          link={"/payments/"}
          text={"New Payment"}
          open={open}
        />
        <ItemList
          icon={<MdOutlinePayment color="#0177B6" />}
          link={"/payments/add"}
          text={"All Payments"}
          open={open}
        />
        <Divider />
        <Divider textAlign="left">Supplies</Divider>

        <ItemList
          icon={<FiPackage color="#0177B6" />}
          link={"/supply/add"}
          text={"Add Supply"}
          open={open}
        />
        <ItemList
          icon={<FaUserPlus color="#0177B6" />}
          link={"/supplier/add"}
          text={"Add Supplier"}
          open={open}
        />
        <ItemList
          icon={<TbPackages color="#0177B6" />}
          link={"/inventory"}
          text={"Update Inventory"}
          open={open}
        />
        <Divider />
      </List>
    </>
  );
}
