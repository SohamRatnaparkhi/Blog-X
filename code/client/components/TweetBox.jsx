import { useState, useRef } from 'react'
import { Image, Matic } from '@web3uikit/icons'
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs'
import { RiFileGifLine, RiBarChartHorizontalFill } from 'react-icons/ri'
import { IoMdCalendar } from 'react-icons/io'
import { MdOutlineLocationOn } from 'react-icons/md'
import { Icon, Twitter } from 'web3uikit'
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const style = {
  wrapper: `sticky border-b-2 border-b-indigo-500 flex flex-row pt-2 p-8 pb-0 rounded-2xl`,
  tweetBoxLeft: `mr-4`,
  tweetBoxRight: `flex-1 p-4 bg-slate-800 rounded-2xl`,
  profileImage: `w-16 h-16 rounded-full mt-6 ml-1 mr-0`,
  inputField: `w-full h-full outline-none bg-transparent text-lg pb-0 py-3 px-2 border-b-2 border-b-indigo-500 `,
  formLowerContainer: `flex`,
  iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
  icon: `mr-2 w-7 h-7 m-2 hover:bg-[#15202b] rounded-full p-1 cursor-pointer`,
  submitGeneral: `text-xl font-bold py-2 hover: cursor-pointer font-normal hover:font-bold text-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full my-2 mx-4 mt-3 pl-3`,
  submitmatic: 'py-2 hover: cursor-pointer font-normal hover:font-bold text-center bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full my-2 mx-4 mt-3 pl-3',
  inactiveSubmit: `bg-[#196195] text-[#95999e]`,
  activeSubmit: `bg-[#1d9bf0] text-white`,

}

function TweetBox() {
  const { Moralis, isInitialized } = useMoralis();
  
  const [tweetMessage, setTweetMessage] = useState()
  const inputFile = useRef(null)
  const [file, setFile] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  
  var user;
  const onImageClick = () => {
    inputFile.current.click()
  }

  try {
    user = Moralis.User.current();
    
  } catch (error) {
    console.log(error)
  }

  const changeHandler = (event) => {
    const img = event.target.files[0]
    setFile(img)
    setSelectedFile(URL.createObjectURL(img))
  }
  
  async function saveBlog() {
    const Blogs = Moralis.Object.extend("Blogs");

    const newBlog = new Blogs();

    newBlog.set("blogTxt", tweetMessage);
    newBlog.set("UserAccount", user.attributes.ethAddress);
    newBlog.set("UserName", user.attributes.username);
    newBlog.set("Likes", 0);

    if (file) {
      const data = file;
      const fileobj = new Moralis.File(file.name, data);
      await fileobj.saveIPFS();
      newBlog.set("tweetImg", fileobj.ipfs());
    } else { 
      newBlog.set("tweetImg", "");
    }
    await newBlog.save();
    window.location.reload();

  }

  const postToMatic = (event) => {
    console.log("random");
  }


  return (
    <div className={style.wrapper}>
      <div className={style.tweetBoxLeft}>
        <img src="https://pbs.twimg.com/profile_images/771597667403038720/Y57U3bvY_400x400.jpg"
          alt="profile image"
          className={style.profileImage}
        />
      </div>
      <div className={style.tweetBoxRight}>
        <form>
          <textarea
            onChange={e => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            className={style.inputField}
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
                style={{ display: 'none' }}
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
              className={`${style.submitGeneral} ${tweetMessage ? style.activeSubmit : style.inactiveSubmit
                }`}
            >
              Hit it!
            </div>

            <button
              type='submit'
              disabled={!tweetMessage}
              onClick={event => postToMatic(event)}
              className={`${style.submitmatic} ${tweetMessage ? style.activeSubmit : style.inactiveSubmit
                }`}
            >
              <Matic fontSize='20px' />
            </button>


          </div>
        </form>
      </div>
    </div>
  )
}

export default TweetBox