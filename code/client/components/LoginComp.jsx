import React from 'react'
import { useMoralis } from 'react-moralis';
// import { ConnectButton, Icon } from 'web3uikit';
import { ConnectButton } from './home/ConnectButton';

const LoginComp = () => {
  return (
    <div className='mt-20 ml-20'>
      <div>
        <ConnectButton />
      </div>
    </div>
  )
}

export default LoginComp
