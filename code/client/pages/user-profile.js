import React from 'react'
import Head from "next/head";
import LoginComp from "../components/LoginComp";
import { useMoralis } from "react-moralis";
import router from 'next/router';
import Profile from './profile';

const Login = () => {
  
  const routeToProfile = () => {
    router.push('/profile');
  }

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
          isAuthenticated ? (<Profile/>) : (<LoginComp />)
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

export default Login
