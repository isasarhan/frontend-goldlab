"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [id, setId] = useState();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getUser = () => {
    const user = JSON.parse(Cookies.get("currentUser")).data;
    setId(user.id);
  };
  const logout = () => {
    setIsLoggedIn(false)
    Cookies.remove("currentUser");
    router.refresh();
  };
  useEffect(() => {
    const user = Cookies.get("currentUser")
    if(user) setIsLoggedIn(true) 
  }, [id, isLoggedIn]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded={expanded ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link href="/" className="nav-link active">
                Home
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
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
          </ul>
          <div
            className={`collapse navbar-collapse ${expanded ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/invoices" className="nav-link active">
                  All Invoices
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/invoices/add" className="nav-link active">
                  New Invoice
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/balances/" className="nav-link active">
                  View Balances
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/payments/add" className="nav-link active">
                  New Payment
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/payments/" className="nav-link active">
                  All Payment
                </Link>
              </li>
            </ul>
          </div>
          <Link href={`/users/${id}`} className="nav-link active p-2">
            <FaRegUserCircle onClick={getUser} size="25px" />
          </Link>
          <button className="btn btn-dark  m-2">
            <Link href="/auth/register" className="nav-link ">
              Register
            </Link>
          </button>
          {
            isLoggedIn?<button className="btn btn-danger  m-2" onClick={logout}>
            Logout
          </button>:
          
          <button className="btn btn-success  m-2" >
            <Link href="/auth/login" className="nav-link ">
            Sign In</Link>
          </button>
          }
          
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
