import React, { useState } from "react";
import { Link } from "react-router-dom";
import Counter from "./Counter";

export default function Home() {
  const [displayCounter, setDisplayCounter] = useState(false);
  if (displayCounter) return <Counter></Counter>;
  else {
    return (
      <div>
        <h1>HOME</h1>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </div>
    );
  }
}
