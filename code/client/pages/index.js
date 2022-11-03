import Head from "next/head";
import { useMoralis } from "react-moralis";
import HomeComp from "../components/HomeComp";
import LoginComp from "../components/LoginComp";

const styles = {
  logout: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-2xl mx-7 mt-10',
};

export default function Home() {
  const { isAuthenticated, Moralis } = useMoralis();
  return (
    <>
      <Head>
        <title>Blog-x</title>
        <meta name="description" content="Blog-x" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {
          isAuthenticated ? (<HomeComp />) : (<LoginComp />)
        }
        <div className="logout"
          onClick={() => {
            Moralis.User.logOut().then(() => {
              window.location.reload();
            });
          }}>
        </div>
      </main>
    </>
  );
}
