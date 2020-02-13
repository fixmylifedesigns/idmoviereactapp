import React, { useState, useEffect } from "react";
import Cards from "./material-ui/cards";
import axios from "axios";
import SearchBar from "./material-ui/searchbar";
export default function Searchdbpage(props) {
  const [posts, setPosts] = useState();
  const [search, setSearch] = useState(
    props.history.location.search.replace("?search=", "")
  );

  const handleChange = e => {
    setSearch({
      [e.target.name]: e.target.value
    });
    console.log(search);
  };

  useEffect(() => {
    if (search !== "") {
      postSearch();
    }
  }, [search]);

  const postSearch = () => {
    axios
      .post("https://iqmoviedb.herokuapp.com/api/moviesdb", { search: search })
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        width: "90%",
        margin: "auto"
      }}
    >
      <div style={{ margin: "20px" }}>
        <SearchBar handleChange={handleChange} postSearch={postSearch} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        {!posts ? (
          <div style={{ margin: "auto" }}>
            <h1>Help us build our movie collection today</h1>
            <h3>Simply search through the MovieDB database for your favorite movies and add them to our collection</h3>
          </div>
        ) : (
          posts &&
          posts.results.map(post => <Cards post={post} moviedb={true} />)
        )}
      </div>
    </div>
  );
}
