import React from 'react'
import { useMoralis } from 'react-moralis';
// import { ConnectButton, Icon } from 'web3uikit';
import { ConnectButton } from './home/ConnectButton';

const LoginComp = () => {
  return (
    <div className='flex flex-col sm:flex-row'>
      <div className='basis-1/3 text-center'>
        
      </div>
      <div className='basis-1/3 text-center mt-20'>
        <div className='text-3xl font-bold hover:underline-offset-4 hover:text-4xl hover:pb-8 pb-5'>BlogX</div>
        <ConnectButton />
      </div>
      <div className='basis-1/3 text-center'>
        
      </div>
    </div>
  )
}

export default LoginComp
