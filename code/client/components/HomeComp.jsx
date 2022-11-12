import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./home/Feed";
import Widgets from "./Widgets";
import Navbar from "./Navbar";

const styles = {
  wrapper:
    "flex justify-center items-center h-screen w-screen bg-[#0f172a] text-white overflow-x-hidden",
  columns:
    "flex justify-between h-screen w-full text-center  text-white gap-0.5",
  sides: "basis-1/4 bg-slate-900 h-full overflow-y-auto",
  side2: "basis-3/4 bg-slate-900 h-full flex flex-row overflow-x-hidden  ",
  feed: " sticky top-2 basis-2/3 bg-slate-800 h-full overflow-x-hidden overflow-y-auto px-4",
  widgets: "basis-1/3 bg-slate-900 h-full overflow-x-hidden overflow-y-auto",
};

const HomeComp = () => {
  return (
    <div className="flex flex-col ">
      <div>
        <Navbar currentPage={"home"} />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.columns}>
          <div className={styles.sides}>
            <Sidebar />
          </div>
          <div className={styles.side2}>
            <div className={styles.feed}>
              <Feed profile={false} />
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

export default HomeComp;
