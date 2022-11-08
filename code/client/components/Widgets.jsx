import { BiSearch } from 'react-icons/bi'
import { news} from '../Assests/static'
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useWeb3Transfer } from "react-moralis";


const style = {
    wrapper: `flex-[1] p-4 font-normal overflow-y-auto`,
    searchBar: `flex items-center bg-[#243340] p-2 rounded-3xl`,
    searchIcon: `text-[#8899a6] mr-2`,
    inputBox: `bg-transparent outline-none`,
    section: `bg-[#192734] my-6 rounded-xl overflow-hidden`,
    title: `p-2 font-bold text-lg`,
    showMore: `p-2 text-[#1d9bf0] text-sm cursor-pointer hover:bg-[#22303c]`,
    item: `flex items-center p-3 my-2 hover:bg-[#22303c] cursor-pointer`,
    newsItemLeft: `flex-1`,
    newsItemCategory: `text-[#8899a6] text-xs font-semibold`,
    newsItemTitle: `text-sm font-bold`,
    newsItemRight: `w-1/5 ml-3`,
    newsItemImage: `rounded-xl h-14 w-14 object-cover`,
    followAvatarContainer: `w-1/6`,
    followAvatar: `rounded-full h-[40px] w-[40px]`,
    profileDetails: `flex-1`,
    name: `font-bold`,
    handle: `text-[#8899a6]`,
    followButton: `bg-white text-black px-3 py-1 rounded-full text-xs font-bold`,
}

function Widgets() {

    const { Moralis, user, isInitialized, account, isAuthenticated, isWeb3Enabled, isWeb3EnableLoading } = useMoralis();
    const [recieverId, setRecieverId] = useState("");
    const [value, setValue] = useState(0);
    const [currentUser, setCurrentUser] = useState(user);

    useEffect(() => {
        if (isInitialized) {
            console.log("Moralis initialized");
            setCurrentUser(Moralis.User.current());
        } else {
            router.push('/');
        }
    }, []);


    const router = useRouter();

    const { fetch, error, isFetching } = useWeb3Transfer({
        type: "native",
        amount: Moralis.Units.ETH(value),
        receiver: recieverId,
    });

    const transferMatics = async () => {
        // const amnt = Number(prompt("Enter the amount of MATIC to transfer"));

        // console.log(currentUser.attributes.ethAddress);
        const amnt = value;
        if (recieverId === currentUser.attributes.ethAddress) {
            alert("You can't transfer to yourself");
        }

        if (amnt === null || amnt === 0) {
            console.log("Enter a valid amount");
            return;
        }
        setValue(amnt);

        const options = {
            type: "native",
            amount: value,
            receiver: recieverId,
        }
        console.log(options);
        if (!isWeb3Enabled) {
            await Moralis.enableWeb3();
        }
        fetch({
            onSuccess: () => {
                alert("Transaction Successful");
            },
            oneError: (error) => {
                console.log(error);
            },
            onComplete: () => {
                console.log("Transaction Completed");
            },
            throwOnError: true,
        });
    }

    return (
        <div className={style.wrapper}>
            <div className={style.searchBar}>
                <BiSearch className={style.searchIcon} />
                <input
                    placeholder='Search Blog-X'
                    type='text'
                    className={style.inputBox}
                />
            </div>
            <div className={style.section}>
                <div className="matic-transfer-form">
                    <div className="text-xl p-2 font-bold ">Transfer Ethers/Matics </div>
                    <div className="form-input my-4">
                        <div className='h-10'>
                            <input type="text" className='bg-white rounded-md text-sm w-5/6 py-2 px-4 text-black font-bold' value={recieverId} onChange={(e) => {
                                setRecieverId(e.target.value)
                            }} placeholder="Enter reciever address" />
                        </div>
                        <br />
                        <div className='h-10'>
                            <input type="text" className='bg-white rounded-md text-sm w-5/6 py-2 px-4 text-black font-bold' value={value} onChange={(e) => {
                                if (e.target.value === "") {
                                    setValue(0);
                                } else {
                                    setValue(e.target.value)
                                }
                            }} placeholder="Enter amount" />
                        </div>
                        <br />
                        <div className='h-10 w-1/2 m-auto'>
                            <button className='bg-blue-500 text-white rounded-md text-xl w-full py-2 px-4 ' onClick={transferMatics}>Transfer </button>
                        </div>
                    </div>
                </div>
                <div className={style.showMore} onClick={() => {
                    setRecieverId("");
                    setValue(0);
                }}>Reset all values</div>
            </div>
            <div className={style.section}>
                <div className={style.title}>What's happening</div>
                {news.map((item, index) => (
                    <div key={index} className={style.item}>
                        <div className={style.newsItemLeft}>
                            <div className={style.newsItemCategory}>{item.category}</div>
                            <div className={style.newsItemTitle}>{item.title}</div>
                        </div>
                        <div className={style.newsItemRight}>
                            <img
                                src={item.image}
                                alt={item.category}
                                className={style.newsItemImage}
                            />
                        </div>
                    </div>
                ))}
                <div className={style.showMore}>Show more</div>
            </div>
        </div>
    )
}

export default Widgets