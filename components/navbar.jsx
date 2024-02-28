"use client";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/" className="nav-link active">
                Home
              </Link>
            </li>
          </ul>
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

          <button className="btn btn-outline-success" type="button">
            Refresh
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
