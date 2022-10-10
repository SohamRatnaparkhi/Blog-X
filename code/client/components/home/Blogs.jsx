import React from 'react'
import Image from 'next/image'
import { Star, Matic, MessageCircle } from '@web3uikit/icons'
import { BiTransfer } from 'react-icons/bi'


const style = {
    blogs: `bg-[#fff] text-[#15202b] p-4 rounded-lg shadow-md text-left mt-4 flex flex-col`,
    profile: `flex items-center flex-row p-2`,
    profilechars: `flex-1 text-md font-bold`,
    engage: `flex flex-row justify-between items-center pt-4 pb-1`,
}


const Blogs = () => {
    return (
        <div>
            <div className='px-4 py-2'>
                <div className={style.blogs}>
                    <div className={style.profile}>
                        <div className={style.profilechars}>Soham R</div>
                        <div className={style.profilechars}>abcx12.....0h</div>
                        <Image
                            src="/favicon.ico"
                            alt="Picture of the author"
                            width={30}
                            height={30}
                        />
                    </div>
                    <div className={style.content}>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo velit aliquam hic omnis, voluptas facilis minus quia porro animi, recusandae, sapiente numquam. Tempora asperiores eligendi earum accusamus, debitis sint delectus, aut laudantium necessitatibus enim odit recusandae fugit hic mollitia voluptate optio ex placeat quasi, dolores impedit doloremque consequatur assumenda! Repellat, totam! In eveniet assumenda a perspiciatis ipsam, reiciendis qui laudantium nostrum natus quis illo ex odio sapiente distinctio dolore eligendi provident modi quos repellat maxime animi, corporis excepturi hic? Delectus iste, aspernatur hic nostrum explicabo quo, sint quam corporis eius iure voluptates nihil dicta atque sed architecto eum at tempora.
                        </p>
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
    )
}

export default Blogs
