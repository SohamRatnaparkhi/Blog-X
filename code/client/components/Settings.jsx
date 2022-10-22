import React from "react";
// import "./Settings.css";
import { useState, useref } from "react";
import { Input } from "web3uikit";
// import pfp1 from "../public/images";
// import pfp2 from "../public/images";
// import pfp3 from "../public/images";
// import pfp4 from "../public/images";
// import pfp5 from "../public/images";
import Image from "Next/image";

const styles = {
    pfp:"rounded-2xl",
    pfpOptions:"flex flex-row gap-4 justify-center pt-4"
}


const Settings = () => {
    const pfp = ["/pfp1.png", "/pfp2.png", "/pfp3.png", "/pfp4.png", "/pfp5.png"];
    const [SelectedPFP, setSelectedPFP] = useState();
    return (
        <>
            <div className="pageIdentify mt-4"> Settings </div>
            <div className="settingsPage"></div>
            <Input
                label="Name"
                name="Namechange"
                width="90%"
                labelbgcolor="#141d26"
            />

            <Input
                label="Bio"
                name="biochange"
                width="90%"
                labelbgcolor="#141d26"

            />
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
                                        className={styles.pfp}
                                        height={80}
                                        width={80}
                                        onClick={() => { setSelectedPFP(pfp[i]); }}
                                    ></Image>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Settings;