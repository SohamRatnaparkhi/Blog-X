import { useState, useContext } from 'react'

import { BsCardImage, BsEmojiSmile } from 'react-icons/bs'
import { RiFileGifLine, RiBarChartHorizontalFill } from 'react-icons/ri'
import { IoMdCalendar } from 'react-icons/io'
import { MdOutlineLocationOn } from 'react-icons/md'


const style = {
  wrapper: ` border-b-2 border-b-indigo-500 flex flex-row  px-4 py-2 rounded-2xl p-8`,
  tweetBoxLeft: `mr-4`,
  tweetBoxRight: `flex-1`,
  profileImage: `height-12 w-12 rounded-full`,
  inputField: `w-full h-full outline-none bg-transparent text-lg pb-0 py-3 px-2`,
  formLowerContainer: `flex`,
  iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
  icon: `mr-2 w-7 h-7 m-2`,
  submitGeneral: `text-xl font-bold py-2 hover: cursor-pointer font-normal hover:font-bold text-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full my-2 mx-4 mt-3 pl-3`,
  inactiveSubmit: `bg-[#196195] text-[#95999e]`,
  activeSubmit: `bg-[#1d9bf0] text-white`,
  
}

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState('')
  
    const postTweet = (event) =>{
            event.preventDefault()
        console.log(tweetMessage)
    }
  
  return (
    <div className={style.wrapper}>
      <div className={style.tweetBoxLeft}>
      <img src = "https://pbs.twimg.com/profile_images/771597667403038720/Y57U3bvY_400x400.jpg" 
            alt = "profile image" 
            className= {style.profileImage}
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
          <div className={style.formLowerContainer}>
            <div className={style.iconsContainer}>
              <BsCardImage className={style.icon} />
              <RiFileGifLine className={style.icon} />
              <RiBarChartHorizontalFill className={style.icon} />
              <BsEmojiSmile className={style.icon} />
              <IoMdCalendar className={style.icon} />
              <MdOutlineLocationOn className={style.icon} />
            </div>
            <button
              type='submit'
              disabled={!tweetMessage}
              onClick={event => postTweet(event)}
              
              className={`${style.submitGeneral} ${
                tweetMessage ? style.activeSubmit : style.inactiveSubmit
              }`}
            >
              Hit it!
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TweetBox