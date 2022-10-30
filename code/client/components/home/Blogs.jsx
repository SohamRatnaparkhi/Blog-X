import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { Star, Matic, MessageCircle } from '@web3uikit/icons'
import { BiTransfer } from 'react-icons/bi'
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";


const style = {
    blogs: `bg-[#fff] text-[#15202b] p-4 rounded-lg shadow-md text-left mt-4 flex flex-col`,
    profile: `flex items-center flex-row p-2`,
    profilechars: `flex-1 text-md font-bold`,
    engage: `flex flex-row justify-between items-center pt-4 pb-1 hower:shadow-md`,
    blogText: `text-md font-bold`,
}



const Blogs = ({ profile}) => {
    const [blogArr, setblogArr] = useState();
    const { Moralis, account } = useMoralis();
    const currentUser = Moralis.User.current();
    const router = useRouter();
    console.log(account)
    useEffect(() => {
        async function getblogs() {
            try {
                const Blogs = Moralis.Object.extend("Blogs");
                const query = new Moralis.Query(Blogs);
                console.log(profile)
                if (profile == true) {
                    // console.log(Blogs.attribute.UserAccount)
                    console.log(account)
                    query.equalTo("UserAccount", currentUser.attributes.ethAddress);
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

    const refreshData = () => router.replace(router.asPath);

    const incrementLikes = async (id) => {
        const Blogs = Moralis.Object.extend("Blogs");
        const query = new Moralis.Query(Blogs);
        console.log(id);
        const blog = await query.get(id);
        blog.increment("Likes");
        await blog.save();
        refreshData();
    }

    return (
        <>
            {blogArr && blogArr.map((blog) => (
                <div key={profile.id} className={style.blogs}>   
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
                    <div className={style.blogText}>
                    {blog.attributes.blogTxt}
                    <img src={blog.attributes.tweetImg} alt="" />
                    </div>
                    <div className={style.engage}>
                        <div className="flex flex-row gap-2">
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-yellow-400" 
                                onClick={() => { incrementLikes(blog.id); }} />
                                <p>{blog.attributes.Likes}</p>
                                <p>{blog.attributes.objectId}</p>
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
                        <div>
                            <p>{blog.attributes.createdAt.toDateString()}</p>
                        </div>
                </div>
            )).reverse()}
        </>
    )
}
export default Blogs
