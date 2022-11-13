import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import { TweetProvider } from "../context/tweetApp";
import Navbar from "../components/Navbar";

const MyApp = ({ Component, pageProps }) => (
  <MoralisProvider
    appId={process.env.NEXT_PUBLIC_APP_ID}
    serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
    masterKey={process.env.NEXT_PUBLIC_MASTER_KEY}
  >
    <TweetProvider>
      <NotificationProvider>
        <div className="layout overflow-x-hidden bg-[#0e121e] overflow-x-hidden h-screen">
          {/* <div className="flex flex-row justify-between h-15 w-full overflow-x-hidden pb-2 gap-2">
            <div className="basis-1/3">BlogX</div>
            <div className="basis-2/3">Search bar/publish</div>
            <div className="basis-1/3">profile</div>
          </div> */}
          {/* <div className="pt-2 bg-[#0f172a]"></div> */}
          <div className="">
            <Component {...pageProps} />
          </div>
        </div>
      </NotificationProvider>
    </TweetProvider>
  </MoralisProvider>
);

export default MyApp;
