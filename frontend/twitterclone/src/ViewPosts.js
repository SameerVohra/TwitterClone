import React, { useEffect, useState } from "react";
import axios from "axios";
export default function ViewPosts() {
  const [apiData, setApiData] = useState([]);
  const [loading, isLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
        );

        console.log(response.data);
        setApiData(response.data);
        console.log(apiData);
        isLoading(false);
      } catch (error) {
        setApiError(true);
      }
    })();
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
