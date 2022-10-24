import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Feed from "../components/home/Feed";
import Widgets from "../components/Widgets";
import TweetBox from "../components/home/TweetBox";

const styles = {
  wrapper:
    "flex justify-center items-center h-screen w-screen bg-black text-white overflow-x-hidden",
  columns:
    "flex justify-between h-screen w-full text-center  text-white gap-0.5",
  sides: "basis-1/4 bg-slate-900 h-full",
  side2: "basis-3/4 bg-slate-900 h-full flex flex-row overflow-x-hidden overflow-y-auto ",
  feed: "basis-5/6 bg-slate-800 h-full",
  widgets: "basis-1/4 bg-slate-900 h-full"
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
                <TweetBox/>
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
