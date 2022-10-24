import { useState, useContext, useRef } from 'react'
import { List, Home, User, Phone,Image } from '@web3uikit/icons'
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs'
import { RiFileGifLine, RiBarChartHorizontalFill } from 'react-icons/ri'
import { IoMdCalendar } from 'react-icons/io'
import { MdOutlineLocationOn } from 'react-icons/md'
import {Icon, Twitter} from 'web3uikit'
import {Matic} from '@web3uikit/icons'


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
  const [tweetMessage, setTweetMessage] = useState('')
  const inputFile = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  
  const onImageClick = () => {
    inputFile.current.click()
  }
  
  const changeHandler = (event) => {
    const img = event.target.files[0]
    setSelectedFile(URL.createObjectURL(img))
  }

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
                style={{display: 'none'}}
              />
            <Image className={style.icon} />

            {/* These are icons for other features, will be used afterwards */}
              {/* <RiFileGifLine className={style.icon} />
              <RiBarChartHorizontalFill className={style.icon} />
              <BsEmojiSmile className={style.icon} />
              <IoMdCalendar className={style.icon} />
              <MdOutlineLocationOn className={style.icon} /> */}
               
               
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

            <button
              type='submit'
              disabled={!tweetMessage}
              onClick={event => postTweet(event)}
              className={`${style.submitmatic} ${
                tweetMessage ? style.activeSubmit : style.inactiveSubmit
              }`}
            >
              <Matic fontSize='20px'/>
            </button>
            
            
          </div>
        </form>
      </div>
    </div>
  )
}

export default TweetBox