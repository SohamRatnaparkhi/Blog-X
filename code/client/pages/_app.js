import '../styles/globals.css'
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from 'web3uikit';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      masterKey={process.env.NEXT_PUBLIC_MASTER_KEY}
    >
      <NotificationProvider>
      <Component {...pageProps} />
      </NotificationProvider>
    </MoralisProvider>
    </>
  )
}

export default MyApp
