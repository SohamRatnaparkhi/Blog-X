import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import { TweetProvider } from "../context/tweetApp";

const MyApp = ({ Component, pageProps }) => (
  <MoralisProvider
    appId={process.env.NEXT_PUBLIC_APP_ID}
    serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
    masterKey={process.env.NEXT_PUBLIC_MASTER_KEY}
  >
    <TweetProvider>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </TweetProvider>
  </MoralisProvider>
);

export default MyApp;
