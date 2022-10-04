import React from 'react'
import { useState } from 'react'
import SidebarOptions from './SidebarOptions'

const styles = {
    container: 'overflow-y-auto py-4 px-10 bg-gray-50 rounded-2xl bg-[#192734]  m-4',
    title: 'text-4xl font-bold py-4 hover:underline cursor-pointer font-normal hover:font-bold',
    option: 'flex flex-col justify-center items-center py-2 hover:bg-slate-700 cursor-pointer mx-12 rounded-2xl' ,
    publish: 'text-2xl font-bold py-4 hover: cursor-pointer font-normal hover:font-bold text-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-2xl mx-7 mt-10',
}

const Sidebar = () => {
    const [selected, setSelected] = useState('Home')
    return (
        <div>
            <div className={ styles.container }>
                <div className={ styles.title }>Blog-X</div>        
                <hr />
                <br />
                <SidebarOptions 
                    option="Home"
                    icon_url="vercel.svg"
                    isActive={Boolean(selected === 'Home')}
                    setSelected={setSelected}
                />
                <SidebarOptions 
                    option="Explore"
                    icon_url="vercel.svg"
                    isActive={Boolean(selected === 'Explore')}
                    setSelected={setSelected}
                />
                <SidebarOptions 
                    option="Most Veiwed"
                    icon_url="vercel.svg"
                    isActive={Boolean(selected === 'Most Veiwed')}
                    setSelected={setSelected}
                />
                <SidebarOptions 
                    option="Constact Us"
                    icon_url="vercel.svg"
                    isActive={Boolean(selected === 'Constact Us')}
                    setSelected={setSelected}
                />
                
                
            </div>
                <div className={ styles.publish } >
                    Publish blog
                </div>
        </div>
    )
}

export default Sidebar
