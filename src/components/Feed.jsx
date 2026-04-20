import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUserFeed } from "../utils/feedSlice";

export default function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  console.log("feed at feed",feed);
  
  async function handleGetFeed() {
    try {
      const res = await axios.get(
        "http://localhost:7777/feed?page=1&limit=4",

        { withCredentials: true },
      );
      console.log("feed res", res);

      dispatch(addUserFeed(res.data.users));
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleGetFeed();
  }, []);

  return (
    <div className="w-full ">
      {feed? feed.map((el) => {
           return <Card data={el} />;
          }):null}
    </div>
  );
}
