import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import Feed from "../components/home/Feed";
import Widgets from "../components/Widgets";

const styles = {
  wrapper:
    "flex justify-center items-center h-screen w-screen bg-balck text-white overflow-x-hidden",
  columns:
    "flex justify-between h-full w-full text-center  text-white gap-0.5 h-screen",
  sides: "basis-1/4 bg-slate-900 h-screen",
  feed: "basis-1/2 bg-slate-800 h-screen",
};

export default function Home() {
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
            <h1 className={styles.sides}>
              <Sidebar />
            </h1>
            <h1 className={styles.feed}>
              <Feed />
            </h1>
            <h1 className={styles.sides}>
              <Widgets />
            </h1>
          </div>
        </div>
      </main>
    </>
  );
}
