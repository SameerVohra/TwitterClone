import React, { useState } from "react";
import { Link } from "react-router-dom";
import Counter from "./Counter";
import "./css/home.css";

export default function Home() {
  const [displayCounter, setDisplayCounter] = useState(false);
  if (displayCounter) return <Counter></Counter>;
  else {
    return (
      <div id="navbar">
        <div id="logo">
          <h1>TWITTER</h1>
        </div>

        <div id="links">
          {" "}
          <Link id="Link" to="/">
            Home
          </Link>
          <Link id="Link" to="/contact">
            Contact
          </Link>
          <Link id="Link" to="/about">
            About
          </Link>
          <Link id="Link" to="/login">
            Login/SignUp
          </Link>
        </div>
      </div>
    );
  }
}
