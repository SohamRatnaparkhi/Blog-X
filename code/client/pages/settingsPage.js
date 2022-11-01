import React from 'react'
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import Settings from '../components/Settings';

const styles = {
  wrapper:
    "flex justify-center items-center h-screen w-screen bg-[#0f172a] text-white overflow-x-hidden",
  columns:
    "flex justify-between h-screen w-full text-center  text-white gap-0.5",
  sides: "basis-1/4 bg-slate-900 h-full sticky top-5",
  side2: "basis-3/4 bg-slate-900 h-full flex flex-row overflow-x-hidden overflow-y-auto ",
  feed: "basis-2/3 bg-slate-800 h-full",
  widgets: "basis-1/3 bg-slate-900 h-full"
};

const HomeComp = () => {
  return (
    <div>
        <div className={styles.wrapper}>
          <div className={styles.columns}>
            <div className={styles.sides}>
              <Sidebar />
            </div>
            <div className={styles.side2}>
              <div className={styles.feed}>
                <Settings />
              </div>
              <div className={styles.widgets}>
                <Widgets />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default HomeComp
