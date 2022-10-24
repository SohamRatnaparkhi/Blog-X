import React from "react";
// import "./Settings.css";

import { Input } from "web3uikit";
import { BsStars } from 'react-icons/bs'
import {useState, useRef} from  'react'
// import pfp1 from "../public/images";
// import pfp2 from "../public/images";
// import pfp3 from "../public/images";
// import pfp4 from "../public/images";
// import pfp5 from "../public/images";
import Image from "Next/image";
import { defaultImgs } from "./home/defaultImgs";


const styles = {
    pfp:"m-2 rounded-full border-2 border-white h-48 w-96",
    pfpOptions:"flex flex-row gap-4 justify-center pt-4 rounded-2xl  h-48 full rounded-full  ",
    header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center rounded-b-lg p-4`,
    pa:"p-4 w-full",
    save : "bg-blue-500 text-white rounded-full p-2 w-1/6 m-4 text-center",
    pfpOptionsSelected: "flex flex-row gap-4 justify-center pt-4 rounded-2xl  h-48 full ",
    profileBanner: "flex flex-row gap-4 justify-center pt-4   h-48  "
}


const Settings = () => {
    const pfp = ["/pfp1.png", "/pfp2.png", "/pfp3.png", "/pfp4.png", "/pfp5.png"];
    const [selectedPFP,setSelectedPFP] = useState();
    const inputFile = useRef(null);
    const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
   
    const onBannerClick = () => {
        inputFile.current.click();
    }
    const changeHandler = (e) => {
        const img = e.target.files[0];
        setSelectedFile(URL.createObjectURL(img));
    }

    return (
        <>
            <div className={styles.header}> Settings 
            <BsStars /> </div>
            <div className={styles.pa}>
            <Input
                label="Name"
                name="Namechange"
                width="90%"
                labelbgcolor="#141d26"
                
            />
            </div>
            
            <div className={styles.pa}>
            <Input
                label="Bio"
                name="biochange"
                width="90%"
                labelbgcolor="#141d26"

            />
            </div>
            <div className="pfp p-4">
                Profile Image ( Your NFTs)

                <div className={ styles.pfpOptions }>
                    {
                        pfp.map((e, i) => { 
                            return (
                                <div >
                                    <Image
                                        src={e}
                                        alt="pfp"
                                        className={
                                            selectedPFP === e ? styles.pfpOptionsSelected : styles.pfpOptions 
                                        }
                                        onClick={() => {setSelectedPFP(pfp[i]);}}
                                        height={80}
                                        width={80}
                                        
                                    />
                                    
                                </div>

                            )
                        })
                    }
                    
                </div>
                <div >
                    Profile Banner
                    <div className={styles.profileBanner}>
                        <img 
                            src={selectedFile}
                            onClick={onBannerClick}
                            className={styles.pfp}
                        />
                        <input

                            type="file"
                            name="file"
                            ref={inputFile}
                            onChange={changeHandler}
                            style={{display: "none"}}
                        />
                    </div>
                </div>
                <div className={styles.save}> Save </div>
                
            </div>
        </>
    )
}

export default Settings;