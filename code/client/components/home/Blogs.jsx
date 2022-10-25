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
    const [blogArr, setblogArr] = useState();
    const { Moralis, account } = useMoralis();

    useEffect(() => {
        async function getblogs() {
            try {
                const Blogs = Moralis.Object.extend("Blogs");
                const query = new Moralis.Query(Blogs);
                if (profile) {
                    query.equalTo("UserAccount", account);
                }
                const results = await query.find();

                setblogArr(results);
                console.log(results);
            } catch (error) {
                console.error(error);
            }
        }
        getblogs();
    }, [profile]);

    return (
        <>
            {blogArr && blogArr.map((blog) => (
                <div className={style.blogs}>   
                    <div className={style.profile}>
                        <div className="flex-shrink-0">
                            <Image
                                className="rounded-full"
                                src={blog.attributes.UserImage}
                                alt=""
                                width={40}
                                height={40}
                            />
                        </div>
                        <div className={style.profilechars}>
                            <p className="font-bold">{blog.attributes.UserName}</p>
                            <p className="text-gray-500">{blog.attributes.UserAccount.slice(0, 10) + "...." + blog.attributes.UserAccount.slice(-4)}</p>
                        </div>
                    </div>
                    <div className="text-md text-gray-500 pt-2">
                        {blog.attributes.blogTxt}
                    </div>
                    <div className={style.engage}>
                        <div className="flex flex-row gap-2">
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-yellow-400" />
                                <p>{blog.attributes.Likes}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageCircle className="w-5 h-5 text-blue-500" />
                                <p>{blog.attributes.Comments}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <BiTransfer className="w-5 h-5 text-green-400" />
                                <p>{blog.attributes.Shares}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Matic className="w-5 h-5 text-matic-500" />
                            <p>{blog.attributes.Matic}</p>
                        </div>
                    </div>
                </div>
            )).reverse()}
        </>
    )
}
export default Blogs
