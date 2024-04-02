"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import OffCanvasMenu from "./mainMenu";
import NavItem from "./navItem";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [id, setId] = useState();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const getUser = () => {
    const user = JSON.parse(Cookies.get("currentUser")).data;
    setId(user.id);
  };
  const logout = () => {
    setIsLoggedIn(false);
    Cookies.remove("currentUser");
    router.refresh();
  };
  useEffect(() => {
    const user = Cookies.get("currentUser");
    if (user) setIsLoggedIn(true);
  }, [id, isLoggedIn]);

  return (
    <div>
      
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
        <div className="container-fluid">
          <OffCanvasMenu />
          <ul className="navbar-nav"></ul>
          <div
            className={`collapse navbar-collapse ${expanded ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <NavItem href="/" name={"Home"} />

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
                  <li className="nav-item">
                    <Link href="/customers/add" className="dropdown-item">
                      New
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/customers" className="dropdown-item">
                      View All
                    </Link>
                  </li>
                </ul>
              </li>
              <NavItem href="/invoices" name={"All Invoices"} />
              <NavItem href="/invoices/add" name={"New Invoice"} />
              <NavItem href="/balances" name={"View Balances"} />
              <NavItem href="/payments/add" name={"New Payment"} />
              <NavItem href="/supply/add" name={"Add Supply"} />
              <NavItem href="/supplier/add" name={"Add Supplier"} />
              <NavItem href="/inventory" name={"Update Inventory"} />
            </ul>
          </div>
          <Link href={`/users/${id}`} className="nav-link active p-2">
            <FaRegUserCircle onClick={getUser} size="25px" />
          </Link>
          <button className="btn btn-dark me-2">
            <Link href="/auth/register" className="nav-link ">
              Register
            </Link>
          </button>
          {isLoggedIn ? (
            <button className="btn btn-danger md-2" onClick={logout}>
              Logout
            </button>
          ) : (
            <button className="btn btn-success md-2">
              <Link href="/auth/login" className="nav-link ">
                Sign In
              </Link>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
