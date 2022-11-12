import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { Star, Copy, MessageCircle } from '@web3uikit/icons'
import { BiTransfer } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import Link from 'next/link'
import styles from './Blogs.module.css'

const style = {
    blogs: `bg-[#fff] text-[#15202b] p-4 rounded-lg shadow-md text-left mt-4 flex flex-col`,
    profile: `flex items-center flex-row p-2`,
    profilechars: `flex-1 text-md font-bold`,
    engage: `flex flex-row justify-between items-center pt-4 pb-1 hower:shadow-md`,
    blogText: `text-md font-bold`,
}

const Blogs = ({ profile }) => {
    const [blogArr, setblogArr] = useState();
    const { Moralis, account } = useMoralis();
    const currentUser = Moralis.User.current();
    const router = useRouter();
    const { asPath } = useRouter();
    // console.log(account)
    useEffect(() => {
        async function getblogs() {
            try {
                const Blogs = Moralis.Object.extend("Blogs");
                const query = new Moralis.Query(Blogs);
                // console.log(profile)
                if (profile == true) {
                    // console.log(Blogs.attribute.UserAccount)
                    console.log(account)
                    query.equalTo("UserAccount", currentUser.attributes.ethAddress);
                }
                const results = await query.find();

                setblogArr(results);
                // console.log(results);
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
        // console.log(id);
        const blog = await query.get(id);
        blog.increment("Likes");
        await blog.save();
        refreshData();
    }
    return (
        <>
            {blogArr && blogArr.map((blog) => (
                <div key={blog._id} className={style.blogs}>
                    <div>
                        <div className={style.profile}>
                            <div className="flex-shrink-0">
                                <Image
                                    className="rounded-full"
                                    src={blog.attributes.UserImage ? blog.attributes.UserImage : "/pfp1.png"}
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
                            <Link href={'/blog/' + blog.id} key={blog.id} >
                                <div className={styles.blog_text}> {blog.attributes.blogTxt} </div>
                            </Link>

                            <img src={blog.attributes.blogImg} alt="" />
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
                                    <p>{blog && blog.attributes.BlogCommentsList ? blog.attributes.BlogCommentsList.length : 0}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <BiTransfer className="w-5 h-5 text-green-400" onClick={() => {
                                        navigator.clipboard.writeText(asPath + 'blogs/' + blog.id);
                                        alert("Copied to clipboard - " + asPath + 'blogs/' + blog.id);
                                    }} />
                                    <p>{blog.attributes.Shares}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <AiFillDelete className="w-5 h-5" onClick={() => {
                                        const isDeletion = window.confirm("Are you sure you want to delete this blog?");
                                        if (isDeletion) {
                                            const Blogs = Moralis.Object.extend("Blogs");
                                            const query = new Moralis.Query(Blogs);
                                            query.get(blog.id).then((object) => {
                                                object.destroy().then((response) => {
                                                    console.log(response);
                                                    window.location.reload();
                                                }, (error) => {
                                                    console.log(error);
                                                });
                                            });
                                        }
                                    }} />
                                </div>
                            </div>
                            <div className="flex items-center gap-1" onClick={() => {
                                navigator.clipboard.writeText(blog.attributes.UserAccount);
                                alert("Copied to clipboard!");
                            }}>
                                <Copy />
                            </div>
                        </div>
                        <div>
                            <p>{blog.attributes.createdAt.toDateString()}</p>
                        </div>
                    </div>
                </div>
            )).reverse()
            }
        </>
    )
}

export default Blogs