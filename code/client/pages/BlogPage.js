import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Feed from "../components/home/Feed";
import Widgets from "../components/Widgets";
import TweetBox from "../components/TweetBox";

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

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog-x</title>
        <meta name="description" content="Blog-x" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.wrapper}>
          <div className={styles.columns}>
            <div className={styles.sides}>
              <Sidebar />
            </div>
            <div className={styles.side2}>
              <div className={styles.feed}>
                <TweetBox />
              </div>
              <div className={styles.widgets}>
                <Widgets />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
