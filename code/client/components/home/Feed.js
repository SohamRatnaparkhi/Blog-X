import {BsStars } from 'react-icons/bs'
import TweetBox from './TweetBox'

const style = {


    wrapper: ` flex-[2] border-r border-l border-[#38444d]  `,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center  rounded-b-lg p-2`,
  headerTitle: `text-xl font-bold`,
}


function Feed(){
    return(
        
        <div className={style.wrapper}>
            <div className={style.header}>
                <div className={style.headerTitle}>Home</div>
                <BsStars />
            </div>
            <TweetBox />
      </div>


    )
}

export default Feed