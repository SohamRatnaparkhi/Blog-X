import React from "react";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import Blogs from "../../components/home/Blogs";
import { useMoralis } from "react-moralis";
import Widgets from "../../components/Widgets";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import { Star, Copy, MessageCircle } from "@web3uikit/icons";
import { BiTransfer } from "react-icons/bi";
import { useState } from "react";

const styles = {
  wrapper:
    "flex justify-center items-center h-screen w-screen bg-[#0f172a] text-white overflow-x-hidden",
  columns:
    "flex justify-between h-screen w-full text-center  text-white gap-0.5",
  sides: "basis-1/4 bg-slate-900 h-full overflow-y-auto",
  side2: "basis-3/4 bg-slate-900 h-full flex flex-row overflow-x-hidden  ",
  feed: "basis-2/3 bg-slate-800 h-full overflow-x-hidden overflow-y-auto",
  widgets: "basis-1/3 bg-slate-900 h-full overflow-x-hidden overflow-y-auto",
  blogs: `bg-[#fff] text-[#15202b] p-4 rounded-lg shadow-md text-left mt-4 flex flex-col`,
  profile: `flex items-center flex-row p-2`,
  profilechars: `flex-1 text-md font-bold`,
  engage: `flex flex-row justify-between items-center pt-4 pb-1 hower:shadow-md`,
  blogText: `text-md font-bold`,
};

class UserComment {
  constructor(name, commentText, ethAddress) {
    this.name = name;
    this.commentText = commentText;
    this.ethAddress = ethAddress;
  }
}

const Details = () => {
  const { isInitialized } = useMoralis();
  const { Moralis } = useMoralis();
  const router = useRouter();
  const { id } = router.query;
  const [b, setBlog] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (isInitialized) {
      console.log("Moralis initialized");
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    async function getblogs(id) {
      console.log(id + "in getblogs");
      try {
        const Blogs = Moralis.Object.extend("Blogs");
        const query = new Moralis.Query(Blogs);
        console.log(query);
        console.log(id);
        const blog = await query.get(id);
        console.log(blog);
        setBlog(blog);
      } catch (error) {
        console.error(error);
      }
    }
    getblogs(id);
  }, [id]);

  const getUser = async () => {
    const User = Moralis.Object.extend("User");
    const query = new Moralis.Query(User);
    query.equalTo("ethAddress", Moralis.User.current().attributes.ethAddress);
    const user = await query.first();
    return user;
  };

  const refreshData = () => router.replace(router.asPath);

  const handleCommentSubmit = async () => {
    if (comments) {
      const User = await getUser();
      const Blogs = Moralis.Object.extend("Blogs");
      const query = new Moralis.Query(Blogs);
      const blog = await query.get(id);
      let commentList = blog.get("BlogCommentsList");
      if (!commentList) {
        commentList = [];
        blog.set("BlogCommentsList", commentList);
        await blog.save();
      }
      commentList = blog.get("BlogCommentsList");
      commentList.push(
        new UserComment(
          User.attributes.name,
          comments,
          Moralis.User.current().attributes.ethAddress
        )
      );

      await blog.save();
      // alert("Comment added successfully");
      refreshData();
    } else {
      alert("Please enter a comment");
    }
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.columns}>
          <div className={styles.sides}>
            <Sidebar />
          </div>
          <div className={styles.side2}>
            <div className={styles.feed}>
              <br />
              <div className={styles.blogs}>
                <div>
                  <div className={styles.profile}>
                    <div className="flex-shrink-0">
                      <Image
                        className="rounded-full"
                        src={
                          b && b.attributes.UserImage
                            ? blog.attributes.UserImage
                            : "/pfp1.png"
                        }
                        alt=""
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className={styles.profilechars}>
                      <p className="font-bold">{b && b.attributes.UserName}</p>

                      <p className="text-gray-500">
                        {b && b.attributes.UserAccount}
                      </p>
                    </div>
                  </div>
                  <div className={styles.blogText}>
                    <div className={styles.blogText}>
                      {" "}
                      {b && b.attributes.blogTxt}{" "}
                    </div>

                    <img src={b && b.attributes.blogImg} alt="" />
                  </div>
                  <div className={styles.engage}>
                    <div className="flex flex-row gap-2">
                      <div className="flex items-center gap-1">
                        <Star
                          className="w-5 h-5 text-yellow-400"
                          onClick={() => {
                            incrementLikes(b.id);
                          }}
                        />
                        <p>{b && b.attributes.Likes}</p>
                        <p>{b && b.attributes.objectId}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5 text-blue-500" />

                        <p>
                          {b && b.attributes.Comments
                            ? b.attributes.Comments.length
                            : 0}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <BiTransfer
                          className="w-5 h-5 text-green-400"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              asPath + "blogs/" + b.id
                            );
                            alert(
                              "Copied to clipboard - " +
                                asPath +
                                "blogs/" +
                                b.id
                            );
                          }}
                        />
                        <p>{b && b.attributes.Shares}</p>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-1"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          b && b.attributes.UserAccount
                        );
                        alert("Copied to clipboard!");
                      }}
                    >
                      <Copy />
                    </div>
                  </div>
                  <div>
                    <p>{b && b.attributes.createdAt.toDateString()}</p>
                  </div>
                </div>
              </div>
              <div>
                <br />
                <br />
                <div>Comments Section</div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2 bg-white p-3 rounded-xl">
                    <div className="flex-shrink-0">
                      <Image
                        className="rounded-full"
                        src={
                          b && b.attributes.UserImage
                            ? b.attributes.UserImage
                            : "/pfp1.png"
                        }
                        alt=""
                        width={40}
                        height={40}
                      />
                    </div>
                    <textarea
                      onChange={(e) => {
                        setComments(e.target.value);
                      }}
                      className="w-full h-20 p-2 rounded-lg shadow-md"
                      placeholder="Write a comment..."
                    ></textarea>
                  </div>
                  <div
                    onClick={() => {
                      handleCommentSubmit(
                        b && b.attributes.UserAccount,
                        b && b.attributes.UserName
                      );
                    }}
                  >
                    submit
                  </div>
                </div>
                <div></div>
                <div>Comments are</div>
                <div>
                  {b && b.attributes.BlogCommentsList
                    ? b.attributes.BlogCommentsList.map((comment, i) => {
                        return (
                          <div className="flex flex-col gap-2 bg-white p-3 rounded-xl mt-4">
                            <div className="flex-shrink-0 flex flex-row">
                              <Image
                                className="rounded-full"
                                src={
                                  b && b.attributes.UserImage
                                    ? b.attributes.UserImage
                                    : "/pfp1.png"
                                }
                                alt=""
                                width={40}
                                height={40}
                              />
                              <div className="text-black">{comment.name}</div>
                              <div className="text-black">
                                {comment.ethAddress}
                              </div>
                            </div>
                            <div key={i} className="text-black">
                              {comment.commentText}
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
            <div className={styles.widgets}>
              <Widgets />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
