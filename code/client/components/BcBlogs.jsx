import React, { useEffect, useContext, useState } from 'react'
import Data from "../components/Data";
import Image from 'next/image'
import { TweetContext } from "../context/tweetApp";
import { useRouter } from 'next/router';
import { Star, Matic, MessageCircle } from '@web3uikit/icons'
import { BiTransfer } from 'react-icons/bi'
import { BsStars } from 'react-icons/bs'



const style = {
    blogs: `bg-[#fff] text-[#15202b] p-4 rounded-lg shadow-md text-left mt-4 flex flex-col`,
    profile: `flex items-center flex-row p-2`,
    profilechars: `flex-1 text-md font-bold`,
    engage: `flex flex-row justify-between items-center pt-4 pb-1 hower:shadow-md bg-[#fff] text-[#15202b] p-4 rounded-lg shadow-md text-left mt-4 flex flex-col`,
    blogText: `text-md font-bold`,
    wrapper: `flex-[2] border-r border-l border-[#38444d]`,
    header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center rounded-b-lg p-4`,
    headerTitle: `text-xl font-bold items-center`,
}

const BcBlogs = () => {

    const [message, setMessage] = useState("");
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

    return (
        <div className='bg-slate-800 pb-4'>
            <div className={style.wrapper}>
                <div className={style.header}>
                    <div className={style.headerTitle}>Block Chain Blogs</div>
                    <BsStars />
                </div>

                <div>
                    <div >
                        <div className={style.blogText}>
                            <div>
                                {myTweet
                                    .map((el, i) => (
                                        <div className={style.blogs}>
                                            <div className={style.profile}>
                                                <div className="flex-shrink-0">
                                                    <Image
                                                        className="rounded-full"
                                                        src={"/pfp1.png"}
                                                        alt=""
                                                        width={40}
                                                        height={40}
                                                    />
                                                </div>
                                                <div className={style.profilechars}>
                                                    <p className="font-bold">Username</p>
                                                    <p className="text-gray-500">Metamask id</p>
                                                </div>
                                            </div>
                                            <p>{el.slice(0, 40)}..</p>
                                            <div className={style.engage}>
                                                <div className="flex items-center gap-1">
                                                    <Matic className="w-5 h-5 text-matic-500" />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    .reverse()}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BcBlogs

