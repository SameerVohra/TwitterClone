import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom"; // Added useNavigate

export default function ViewPosts() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true); // Changed isLoading to setLoading
  const [apiError, setApiError] = useState(false);
  const navigate = useNavigate(); // Added useNavigate

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      (async () => {
        try {
          const response = await axios.get("http://localhost:3000/posts", {
            headers: {
              authorization: "Bearer " + localStorage.getItem("jwtToken"),
            },
          });
          setApiData(response.data);
          setLoading(false);
        } catch (error) {
          setApiError(true);
        }
      })();
    } else {
      navigate("/login"); // Used useNavigate to navigate to login page
    }
  }, []);
  if (apiError) return <h1>Something went wrong</h1>;
  if (loading) return <h1>LOADING.................</h1>;
  const result = apiData.map((data) => <h1 key={data.id}>{data.title}</h1>);

  return (
    <div>
      <h1>POSTS:-</h1>
      {result}
    </div>
  );
}
