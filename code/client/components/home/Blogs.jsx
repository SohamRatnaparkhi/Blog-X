import React from 'react'
import Image from 'next/image'
import { Star, Matic, MessageCircle } from '@web3uikit/icons'
import { BiTransfer } from 'react-icons/bi'
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";


const style = {
    blogs: `bg-[#fff] text-[#15202b] p-4 rounded-lg shadow-md text-left mt-4 flex flex-col`,
    profile: `flex items-center flex-row p-2`,
    profilechars: `flex-1 text-md font-bold`,
    engage: `flex flex-row justify-between items-center pt-4 pb-1`,
}


const Blogs = ({ profile }) => {
    const [tweetArr, setTweetArr] = useState();
    const { Moralis, account } = useMoralis();

    useEffect(() => {
        async function getTweets() {
            try {
                const Blogs = Moralis.Object.extend("Blogs");
                const query = new Moralis.Query(Blogs);
                if (profile) {
                    query.equalTo("UserAccount", account);
                }
                const results = await query.find();

                setTweetArr(results);
                console.log(results);
            } catch (error) {
                console.error(error);
            }
        }
        getTweets();
    }, [profile]);

    return (
        <div className='outchecker'>
            {tweetArr?.map((e) => {
                <div className='checker'>
                    <div className='px-4 py-2'>
                        <div className={style.blogs}>
                            <div className={style.profile}>
                                <div className={style.profilechars}>{e.attributes.UserName}</div>
                                <div className={style.profilechars}>{e.attributes.UserAccount}</div>
                                <Image
                                    src="/favicon.ico"
                                    alt="Picture of the author"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <div className={style.content}>
                                
                                    hi i am a blog
                                    {
                                        console.log(e.attributes.blogTxt)
                                    }
                                    {e.attributes.blogTxt}
                                
                            </div>
                            <div className={style.engage}>
                                <div className="star hover:bg-gray-300 p-1 rounded-2xl">
                                    <Star />
                                </div>
                                <div className="comment hover:bg-gray-300 p-1 rounded-2xl">
                                    <MessageCircle />
                                </div>
                                <div className="share hover:bg-gray-300 p-1 rounded-2xl">
                                    <BiTransfer />
                                </div>
                                <div className="matic hover:bg-gray-300 p-1 rounded-2xl">
                                    <Matic />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }).reverse()}
        </div>
    )
}


export default Blogs
