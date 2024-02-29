import axios from "axios";
import React, { useState } from "react";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleFormData = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:3000/registration", {
      username: username,
      password: password,
    });
    console.log(response);
  };
  return (
    <div>
      <h1>Registration: </h1>
      <form onSubmit={handleFormData}>
        <label>Username: </label>
        <input type="text" value={username} onChange={handleUsername}></input>
        <br></br>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePassword}
        ></input>
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}
