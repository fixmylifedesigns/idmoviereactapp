import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./material-ui/cards";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import DateRange from "./material-ui/daterange"

export default function Homepage() {
  const [posts, setPosts] = useState();
  const [filter, setFilter] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [homeText, setHomeText] = useState("There are no movies added")
  const today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    renderPosts();
  }, [refresh]);

  const renderPosts = () => {
    axios
      .get("https://iqmoviedb.herokuapp.com/api/")
      .then(res => {
        // console.log(res.data);
        setPosts(res.data);
        setRefresh(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log(filter);

  const filterPosts = (start, end) => {
    let entry = {
      start: start,
      end: end
    };
    axios
      .post("https://iqmoviedb.herokuapp.com/api/filter", entry)
      .then(newres => {
        console.log(newres.data);
        setPosts(newres.data);
        setFilter(true);
        setHomeText("No movies added for those dates")
      })
      .catch(err => {
        console.log(err);
      });
  };
  const fixedFilter = (num1, num2) => {
    filterPosts(
      moment()
        .add(num1, "days")
        .format("YYYY-MM-DD"),
      moment()
        .add(num2, "days")
        .format("YYYY-MM-DD")
    );
  };

  return (
    <div
      style={{
        width: "90%",
        margin: "auto"
      }}
    >
      <h1>Favorite movies</h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap"
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => fixedFilter(0, 1)}
          className="filterButtons"
        >
          coming out today
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => fixedFilter(1, 2)}
          className="filterButtons"

        >
          coming out tomorrow
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => fixedFilter(1, 9)}
          className="filterButtons"

        >
          coming out next week
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="filterButtons"
          onClick={() => fixedFilter(10, 60)}
        >
          coming out next month
        </Button>
        <DateRange filterPosts={filterPosts}/>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap"
        }}
      >
        {posts && posts.length == 0 ? (
          <div style={{ margin: "auto" }}>
            <h2>{homeText}</h2>
            <button
              style={{
                borderRadius: "25px",
                width: "300px",
                height: "100px",
                background: "#282C34"
              }}
            >
              <Link
                to="/search"
                style={{
                  fontSize: "20px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Search Movie DB
              </Link>
            </button>
          </div>
        ) : (
          posts &&
          posts
            .sort((a, b) => b.id - a.id)
            .map(post => <Cards post={post} setRefresh={setRefresh} />)
        )}
      </div>
    </div>
  );
}
