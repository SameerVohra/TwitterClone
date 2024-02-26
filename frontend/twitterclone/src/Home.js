import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>HOME</h1>
      <Link to="/contact">Contact</Link>
      <Link to="/about">About</Link>
    </div>
  );
}
