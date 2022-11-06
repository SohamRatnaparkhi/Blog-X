import React from "react";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import Blogs from "../../components/home/Blogs";
import { useMoralis } from "react-moralis";
import Widgets from "../../components/Widgets";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useState } from "react";

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

const Details = () => {
  const { isInitialized } = useMoralis();
  const { Moralis, account } = useMoralis();
  const router = useRouter();
  const { id } = router.query;
  const [b, setBlog] = useState(null);

  useEffect(() => {
    if (isInitialized) {
      console.log("Moralis initialized");
    } else {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    async function getblogs(id) {
      console.log(id + "in getblogs");
      try {
        const Blogs = Moralis.Object.extend("Blogs");
        const query = new Moralis.Query(Blogs);
        console.log(query);
        console.log(id);
        const blog = await query.get(id);
        console.log(blog);
        setBlog(blog);
      } catch (error) {
        console.error(error);
      }
    }
    getblogs(id);
  }, [id]);

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.columns}>
          <div className={styles.sides}>
            <Sidebar />
          </div>
          <div className={styles.side2}>
            <div className={styles.feed}>
              {id}
              <br />
              <div >{b && b.attributes.blogTxt}</div>
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

export default Details;
