import React from "react";
import graphQl from "../assets/graphQl.png";

function Header(props) {
  return (
    <nav className={"navbar bg-light mb-4 p-0"}>
      <div className="container">
        <a href="/" className="navbar-brand">
          <div className="d-flex">
            <img src={graphQl} alt="logo-graphql" className={"mr-2"} />
            <div>ProjectMgmt</div>
          </div>
        </a>
      </div>
    </nav>
  );
}

export default Header;