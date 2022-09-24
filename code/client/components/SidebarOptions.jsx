import React from 'react'
import { useState } from 'react'

const styles = {
    // wrapper: 'flex flex-row justify-center items-center cursor-pointer',
    wrapper: 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
    inactive: 'hover:bg-slate-700 font-normal hover:font-bold py-2 text-lg rounded-2xl',
    active: 'bg-cyan-700 font-bold py-2 rounded-2xl px-4 text-lg',
    icon: 'flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white',
}

const SidebarOptions = ({ option, icon_url = "vercel.svg", isActive, setSelected}) => {
    return (
        <div>
            <div className={styles.wrapper}
                onClick={() => {
                    setSelected(option)
                    console.log(option)
                }}>
                <div className={styles.icon}>
                    {/* <Image src={ icon_url }></Image> */}
                    o
                </div>
                
                <div className={isActive ? styles.active : styles.inactive}>
                    {option}
                </div>
            </div>
        </div>
    )
}

export default SidebarOptions
