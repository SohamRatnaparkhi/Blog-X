import { BsStars } from "react-icons/bs";
import TweetBox from "../TweetBox";
import Blogs from "./Blogs";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d] m-2`,
  header: ` top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center rounded-b-lg p-4`,
  headerTitle: `text-xl font-bold items-center`,
};

function Feed({ profile }) {
  return (
    <div className="bg-slate-800 pb-4">
      <div className={style.wrapper}>
        {/* <div className={style.header}>
          <div className={style.headerTitle}>Home</div>
          <BsStars />
        </div> */}
        {/* <TweetBox /> */}
      </div>

      <div>
        <Blogs profile={profile} />
      </div>
    </div>
  );
}

export default Feed;
