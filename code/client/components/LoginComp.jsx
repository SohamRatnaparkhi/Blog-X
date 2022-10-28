import React from 'react'
import { useMoralis } from 'react-moralis';
// import { ConnectButton, Icon } from 'web3uikit';
import { ConnectButton } from './home/ConnectButton';

const LoginComp = () => {
  return (
    <div>
      {/* <Icon fill="white" name="logo" width="64px" /> */}
      <ConnectButton />
    </div>
  )
}

export default LoginComp
