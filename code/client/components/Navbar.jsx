import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/router";

const Navbar = (currentPage = "home") => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");

  const { asPath } = useRouter();
  const page = asPath.split("/")[1];
  const mapping = {
    "": "Home",
    profile: "Profile",
  };

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("#ffffff");
        setTextColor("#000000");
      } else {
        setColor("#ffffff");
        setTextColor("#ffffff");
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);

  console.log(mapping[page]);

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="sticky top-0 left-0  w-full  ease-in duration-300"
    >
      <div className="max-w-full h-25 bg-black m-auto flex justify-between items-center p-4 text-white">
        <Link href="/">
          <h1 style={{ color: `${textColor}` }} className="font-bold text-2xl">
            Blog-X
          </h1>
        </Link>
        <ul style={{ color: `${textColor}` }} className="hidden sm:flex">
          <li className="p-4">
            <div className="cursor-pointer flex items-center hover:border border-gray-500 rounded-[0.4rem] p-1     group">
              {mapping[page]}
            </div>
          </li>

          <li className="p-4">
            <div className="flex items-center bg-[#243340] p-2 rounded-3xl">
              <BiSearch className="text-[#8899a6] mr-2" />
              <input
                placeholder="Search Blog-X"
                type="text"
                className="bg-transparent outline-none"
              />
            </div>
          </li>
          <li className="p-4">
            <Link href="/#gallery">Publish</Link>
          </li>
          <li className="p-4">
            <div className="cursor-pointer flex items-center hover:border border-gray-500 rounded-[0.4rem] p-1     group">
              <CiUser className="w-[1.5rem] h-[1.5rem] sm:w-[1.2rem] hover:h-[1.2rem] text-gray-500 " />
              <MdKeyboardArrowDown className="group-hover:w-[1rem]  group-hover:h-[1rem] text-gray-500" />
            </div>
          </li>
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? (
            <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
          }
        >
          <ul>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/">Home</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/Bcblogs">Blockchain feed</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/profile">Profile</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <div className="flex items-center bg-[#243340] p-2 rounded-3xl">
                <BiSearch className="text-[#8899a6] mr-2" />
                <input
                  placeholder="Search Blog-X"
                  type="text"
                  className="bg-transparent outline-none"
                />
              </div>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/contact">Contact Us </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
