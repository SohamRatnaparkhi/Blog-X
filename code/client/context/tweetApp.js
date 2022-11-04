import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { tweetAddress, tweetABI } from "./constants";
import { Await } from "react-router";

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(tweetAddress, tweetABI, signerOrProvider);

export const TweetContext = React.createContext();

export const TweetProvider = ({ children }) => {
  const [currentAccount, setcurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [allTweet, setAllTweet] = useState([]);
  const [myTweet, setMyTweet] = useState([]);

  const [allAddress, setAllAddress] = useState([]);
  //connect metamask
  const checkIfWalletIsConnect = async () => {
    if (!window.ethereum) return setError("Please install metamask");

    const account = await window.ethereum.request({ method: "eth_accounts" });

    if (account.length) {
      setcurrentAccount(account[0]);
      console.log(account[0]);
    } else {
      setError("Please install metamask & connect, reload");
    }
  };
  const created = false;
  //interacting with smart contract

  const tweets = async (message) => {
    try {
      //connecting with smart contract
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      //const createTweet = await contract.createTweet(message);
      //await createTweet.wait();
      contract
        .createTweet(message)
        .then((tx) => {
          router.push("Bcblogs");
        })
        .catch((err) => {
          console.log(err);
        });
      //router.push("/Bcblogs");
      created = true;
      console.log(createTweet);
    } catch (error) {
      setError("Something wrong creating list");
    }
  };

  const getTweet = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const getAllAddress = await contract.getAddress();
      setAllAddress(getAllAddress);
      console.log(getAllAddress);

      getAllAddress.map(async (el) => {
        const getSingleData = await contract.getTweetData(el);
        allTweet.push(getTweet);
        console.log(getSingleData);
      });

      const allMessage = await contract.getMessage();
      setMyTweet(allMessage);
    } catch (error) {
      setError("Something wrong Getting Data");
    }
  };

  return (
    <TweetContext.Provider
      value={{
        checkIfWalletIsConnect,
        tweets,
        getTweet,
        currentAccount,
        error,
        allTweet,
        myTweet,
        allAddress,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
