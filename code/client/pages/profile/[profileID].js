import React from "react";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import Blogs from "../../components/home/Blogs";
import { useMoralis } from "react-moralis";
import Widgets from "../../components/Widgets";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from 'next/image'
import { Star, Copy, MessageCircle } from '@web3uikit/icons'
import { BiTransfer } from 'react-icons/bi'
import { useState } from "react";
import Link from 'next/link'

const styles = {
  wrapper:
    "flex justify-center items-center h-screen w-screen bg-[#0f172a] text-white overflow-x-hidden",
  columns:
    "flex justify-between h-screen w-full text-center  text-white gap-0.5",
  sides: "basis-1/4 bg-slate-900 h-full overflow-y-auto",
  side2: "basis-3/4 bg-slate-900 h-full flex flex-row overflow-x-hidden  ",
  feed: "basis-2/3 bg-slate-800 h-full overflow-x-hidden overflow-y-auto",
  widgets: "basis-1/3 bg-slate-900 h-full overflow-x-hidden overflow-y-auto",
  blogs: `bg-[#fff] text-[#15202b] p-4 rounded-lg shadow-md text-left mt-4 flex flex-col`,
    profile: `flex items-center flex-row p-2`,
    profilechars: `flex-1 text-md font-bold`,
    engage: `flex flex-row justify-between items-center pt-4 pb-1 hower:shadow-md`,
    blogText: `text-md font-bold`,
};

const profileID = () => {
  const { isInitialized } = useMoralis();
  const { Moralis, account } = useMoralis();
  const router = useRouter();
  const { UserAccount } = router.query;
  const [b, setBlog] = useState(null);

  useEffect(() => {
    if (isInitialized) {
      console.log("Moralis initialized");
    } else {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    async function getblogs(UserAccount) {
      console.log(UserAccount + "in getblogs");
      try {
        const Blogs = Moralis.Object.extend("Blogs");
        const query = new Moralis.Query(Blogs);
        console.log(query);
        console.log(UserAccount);
        const blog = await query.get(UserAccount);
        console.log(blog);
        setBlog(blog);
      } catch (error) {
        console.error(error);
      }
    }
    getblogs(UserAccount);
  }, [UserAccount]);

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.columns}>
          <div className={styles.sides}>
            <Sidebar />
          </div>
          <div className={styles.side2}>
            <div className={styles.feed}>
              Profile Slug: {UserAccount}
              <br />
                
           

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

export default profileID;
