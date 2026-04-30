import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUserFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constant";

export default function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  // console.log("feed at feed",feed);
  const currentUser = feed[0];

  async function handleGetFeed() {
    try {
      const res = await axios.get(
        `${BASE_URL}/feed?page=1&limit=10`,

        { withCredentials: true },
      );
      // console.log("feed res", res);

      dispatch(addUserFeed(res.data.users));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (feed.length === 0) {
      handleGetFeed();
    }
  }, [feed.length]);


  

  if (feed.length === 0) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <div className="w-full ">
      <Card data={currentUser} />;
    </div>
  );
}
