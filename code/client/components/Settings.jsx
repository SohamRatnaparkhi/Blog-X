import React from "react";
// import "./Settings.css";

import { Input } from "web3uikit";
import { BsStars } from 'react-icons/bs'
import { useState, useRef } from 'react'
import Image from "Next/image";
import { defaultImgs } from "./home/defaultImgs";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";

const styles = {
    pfp: "m-2 rounded-full border-2 border-white h-48 w-96",
    pfpOptions: "flex flex-row gap-4 justify-center pt-4 rounded-2xl  h-48 full rounded-full  ",
    header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center rounded-b-lg p-4`,
    pa: "p-4 w-full",
    save: "bg-blue-500 text-white rounded-full p-2 w-1/6 m-4 text-center",
    pfpOptionsSelected: "flex flex-row gap-4 justify-center pt-4 rounded-2xl  h-48 full ",
    profileBanner: "flex flex-row gap-4 justify-center pt-4   h-48  "
}


const Settings = (props) => {
    const pfp = ["/pfp1.png", "/pfp2.png", "/pfp3.png", "/pfp4.png", "/pfp5.png"];
    const [selectedPFP, setSelectedPFP] = useState(null);
    const inputFile = useRef(null);
    const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
    const [file, setFile] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [detailsSaved, setDetailsSaved] = useState(false);
    const router = useRouter();

    const onBannerClick = () => {
        inputFile.current.click();
    }

    const changeHandler = (e) => {
        const img = e.target.files[0];
        setFile(img);
        setSelectedFile(URL.createObjectURL(img));
    }

    const { Moralis } = useMoralis();

    const saveSettings = async () => {
        console.log("saving changed user details");
        console.log(Moralis);
        const User = await Moralis.Object.extend("_User");
        const query = new Moralis.Query(User); // create a new query
        const userDetails = await query.first(); // get the first user

        userDetails.set("username", username);
        userDetails.set("bio", bio);
        userDetails.set("pfp", selectedPFP);

        if (file) {
            const fileObj = new Moralis.File("banner.png", file);
            await fileObj.saveIPFS();
            userDetails.set("profileBanner", fileObj.ipfs());
        } else {
            userDetails.set("profileBanner", "");
        }

        console.log("user details saved successfully");

        await userDetails.save();
        setDetailsSaved(true);
        router.push("/profile");
        if(detailsSaved)
            alert("User details saved successfully");
    }

    return (
        <>  
            <div className={styles.header}> Settings
                <BsStars key={props.stars}/> </div>
            <div className={styles.pa}>
                <Input
                    label="Name"
                    name="Namechange"
                    width="90%"
                    labelbgcolor="#141d26"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className={styles.pa}>
                <Input
                    label="Bio"
                    name="biochange"
                    width="90%"
                    labelbgcolor="#141d26"
                    onChange={(e) => setBio(e.target.value)}
                />
            </div>
            <div className="pfp p-4">
                Profile Image ( Your NFTs)

                <div className={styles.pfpOptions}>
                    {
                        pfp.map((e, i) => {
                            return (
                                <div key={props.pfp}>
                                    <Image
                                        src={e}
                                        alt="pfp"
                                        className={
                                            selectedPFP === e ? styles.pfpOptionsSelected : styles.pfpOptions
                                        }
                                        onClick={() => { setSelectedPFP(pfp[i]); }}
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
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
                <div className={styles.save}
                    onClick={saveSettings} >
                    Save
                </div>

            </div>
        </>
    )
}

export default Settings;