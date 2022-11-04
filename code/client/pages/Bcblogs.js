import React, { useEffect, useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import BcFeed from "../components/BcFeed";
import Widgets from "../components/Widgets";
import { TweetContext } from "../context/tweetApp";
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import Data from "../components/Data";

const styles = {
  wrapper:
    "flex justify-center items-center h-screen w-screen bg-[#0f172a] text-white overflow-x-hidden",
  columns:
    "flex justify-between h-screen w-full text-center  text-white gap-0.5",
  sides: "basis-1/4 bg-slate-900 h-full overflow-y-auto",
  side2: "basis-3/4 bg-slate-900 h-full flex flex-row overflow-x-hidden  ",
  feed: "basis-2/3 bg-slate-800 h-full overflow-x-hidden overflow-y-auto",
  widgets: "basis-1/3 bg-slate-900 h-full overflow-x-hidden overflow-y-auto",
};

const Bcblogs = () => {
  const [message, setMessage] = useState("");
  const {
    checkIfWalletIsConnect,
    tweets,
    getTweet,
    currentAccount,
    error,
    allTweet,
    myTweet,
    allAddress,
  } = useContext(TweetContext);

  useEffect(() => {
    checkIfWalletIsConnect();
    getTweet();
    tweets();
  }, []);
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.columns}>
          <div className={styles.sides}>
            <Sidebar />
          </div>
          <div className={styles.side2}>
            <div className={styles.feed}>
              <div>
                <h2>Tweets</h2>
                <div>
                  {myTweet
                    .map((el, i) => (
                      <div>
                        <p>{el.slice(0, 40)}..</p>
                      </div>
                    ))
                    .reverse()}
                </div>
              </div>
            </div>
            <div className={styles.widgets}>
              <Widgets />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bcblogs;
