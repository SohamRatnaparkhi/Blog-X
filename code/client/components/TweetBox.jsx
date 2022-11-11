import { useState, useRef, useContext, useEffect } from "react";
import { Image, Matic } from "@web3uikit/icons";
import { BsCardImage, BsEmojiSmile } from "react-icons/bs";
import {
  RiFileGifLine,
  RiBarChartHorizontalFill,
  RiCoinsLine,
} from "react-icons/ri";
import { IoMdCalendar } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { Icon, Twitter } from "web3uikit";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useRouter } from "next/router";
import { TweetContext } from "../context/tweetApp";
import Data from "../components/Data";
import uploadImg from "./ImageUpload";

const style = {
  wrapper: `sticky border-b-2 border-b-indigo-500 flex flex-row pt-2 p-8 pb-0 rounded-2xl`,
  tweetBoxLeft: `mr-4`,
  tweetBoxRight: `flex-1 p-4 bg-slate-800 rounded-2xl`,
  profileImage: `w-16 h-16 rounded-full mt-6 ml-1 mr-0`,
  inputField: `w-full h-full box-content outline-none bg-transparent text-lg pb-0 py-3 px-2 border-b-2 border-b-indigo-500 `,
  formLowerContainer: `flex`,
  iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
  icon: `mr-2 w-7 h-7 m-2 hover:bg-[#15202b] rounded-full p-1 cursor-pointer`,
  submitGeneral: `text-xl font-bold py-2 hover: cursor-pointer font-normal hover:font-bold text-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full my-2 mx-4 mt-3 pl-3`,
  submitmatic:
    "py-2 hover: cursor-pointer font-normal hover:font-bold text-center bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full my-2 mx-4 mt-3 pl-3",
  inactiveSubmit: `bg-[#196195] text-[#95999e]`,
  activeSubmit: `bg-[#1d9bf0] text-white`,
};

function TweetBox() {
  const { Moralis, isInitialized } = useMoralis();
  const router = useRouter();
  const [tweetMessage, setTweetMessage] = useState();
  const inputFile = useRef(null);
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const {
    checkIfWalletIsConnect,
    tweets,
    getTweet,
    currentAccount,
    error,
    allTweet,
    myTweet,
    allAddress,
  } = useContext(TweetContext);

  useEffect(() => {
    checkIfWalletIsConnect();
    getTweet();
    tweets();
  }, []);

  var user;
  const onImageClick = () => {
    inputFile.current.click();
  };

  try {
    user = Moralis.User.current();
  } catch (error) {
    console.log(error);
  }

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  async function saveBlog() {
    const Blogs = Moralis.Object.extend("Blogs");

    const newBlog = new Blogs();

    newBlog.set("blogTxt", tweetMessage);
    newBlog.set("UserAccount", user.attributes.ethAddress);
    newBlog.set("UserName", user.attributes.username);
    newBlog.set("Likes", 0);

    if (file) {
      const data = file;
      let url = await uploadImg(data, setImageUrl);
      if (!imageUrl) {
        if (url) {
          console.log("setting url");
          newBlog.set("blogImg", url);
          console.log("url set = " + url);
        } else {
          console.log("error");
          return;
        }
      }
      // console.log("filePath", imageUrl);
      // newBlog.set("tweetImg", imageUrl);
    } else {
      newBlog.set("tweetImg", "");
    }
    await newBlog.save();
    router.push("/");
  }

  return (
    <div>
      <div className={style.wrapper}>
        <div className={style.tweetBoxLeft}>
          <img
            src="/pfp2.png"
            alt="profile image"
            className={style.profileImage}
          />
        </div>
        <div className={style.tweetBoxRight}>
          <form>
            <textarea
              onChange={(e) => setTweetMessage(e.target.value)}
              value={tweetMessage}
              placeholder="What's happening?"
              className={style.inputField}
              rows="10"
            />
            {selectedFile && (
              <img src={selectedFile} alt="selected file" className="w-full" />
            )}

            <div className={style.formLowerContainer}>
              <div className={style.iconsContainer} onClick={onImageClick}>
                <input
                  type="file"
                  name="file"
                  ref={inputFile}
                  onChange={changeHandler}
                  style={{ display: "none" }}
                />
                <Image className={style.icon} />

                {/* These are icons for other features, will be used afterwards */}
                {/* <RiFileGifLine className={style.icon} />
              <RiBarChartHorizontalFill className={style.icon} />
              <BsEmojiSmile className={style.icon} />
              <IoMdCalendar className={style.icon} />
              <MdOutlineLocationOn className={style.icon} /> */}
              </div>
              <div
                // disabled={!tweetMessage}
                onClick={saveBlog}
                className={`${style.submitGeneral} ${
                  tweetMessage ? style.activeSubmit : style.inactiveSubmit
                }`}
              >
                Hit it!
              </div>

              <div
                type="submit"
                //disabled={!tweetMessage}
                onClick={() => {
                  tweets(tweetMessage);
                }}
                className={`${style.submitmatic} ${
                  tweetMessage ? style.activeSubmit : style.inactiveSubmit
                }`}
              >
                <Matic fontSize="20px" />
              </div>
              <div>
                <Data
                  allTweet={allTweet}
                  allAddress={allAddress}
                  myTweet={myTweet}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="py-4 px-2 bg-[#fff3cd] text-black mt-8 mx-4 rounded-3xl">
        If you want to publish your blogs in decentralized network, then use the{" "}
        <b>Matic button</b> else use the <b>Hit it</b> button.
      </div>
    </div>
  );
}

export default TweetBox;
