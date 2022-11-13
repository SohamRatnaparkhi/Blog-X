import React from "react";
import { useMoralis } from "react-moralis";
// import { ConnectButton, Icon } from 'web3uikit';
import Image from "next/image";
import { ConnectButton } from "./home/ConnectButton";

const LoginComp = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="basis-1/3 text-center"></div>
      <div className="basis-1/3 text-center mt-20">
        <div className="text-3xl font-bold hover:underline-offset-4 hover:text-4xl hover:pb-8 pb-5 mt-20">
          <img
            src="/brandLogo_removebg2.png"
            className="mx-auto "
            alt="Blog-X"
            srcset=""
          />
        </div>
        <div className="">
          <ConnectButton />
        </div>
        <div className="py-4 px-2 bg-[#fff3cd] text-black mt-8 mx-4 rounded-3xl">
        You will require <b>Metamask</b>  to Log into our Platform.
      </div>
      </div>
      <div className='basis-1/3 text-center'>

      </div>
    </div>
  );
};

export default LoginComp;
