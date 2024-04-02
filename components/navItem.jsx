import Link from "next/link";
import React from "react";

const NavItem = ({href, name}) => {
  return (
    <li className="nav-item">
      <Link href={href} className="nav-link active">
        {name}
      </Link>
    </li>
  );
};

export default NavItem;
