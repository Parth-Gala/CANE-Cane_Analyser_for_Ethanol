import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "../assets/logo.png";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { FaWhatsapp, FaGithub } from "react-icons/fa";
// import { AuthContext } from "../context/AuthContext";
import { RiAccountCircleFill } from "react-icons/ri";
// import Cookies from "js-cookie";
import { BiSolidHelpCircle } from "react-icons/bi";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showoption, setshowoption] = useState(false);
  // const { user, dispatch } = useContext(AuthContext);
  // const usernameCookie = Cookies.get("username");
  // const handleLogout = () => {
  //   // Cookies.remove("username");
  //   // dispatch({ type: "LOGOUT" });
  //   // console.log("logout clicked");
  // };
  function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
      <Link
        to={to}
        {...props}
        className={
          isActive
            ? " text-designColor font-semibold"
            : " text-base font-normal text-gray-500 tracking-wide cursor-pointer hover:text-designColor duration-300"
        }
      >
        {children}
      </Link>
    );
  }

  return (
    <div className="w-full h-18 mx-auto  my-0 sticky top-0 z-50 bg-bodyColor flex justify-between items-center font-titleFont">
      <div className="flex flex-row justify-center items-center ">
        <Link to="/" className=" inline">
          <img src={logo} alt="logo" className=" w-18 h-16 p-2" />
        </Link>
        <Link to="/" className=" inline">
          <p className=" mdl:text-4xl text-designColor text-2xl">
            CANE
          </p>
        </Link>
      </div>

      <div>
        <div>
            <span
              onClick={() => setShowMenu(!showMenu)}
              className="text-3xl  md:hidden w-14 h-14 inline-flex items-center justify-center rounded-full text-designColor cursor-pointer"
            >
              <FiMenu />
            </span>
        </div>
          <div>
            <ul className="hidden md:inline-flex items-center gap-10 mr-4">
              <li>
                <CustomLink to="/">Home</CustomLink>
              </li>
              <li>
                <CustomLink to="/maps">Detect Field</CustomLink>
              </li>
              <li>
                <CustomLink to="/upload">Analyze Image</CustomLink>
              </li>
              <li>
                <CustomLink to="/help">
                  <BiSolidHelpCircle className="text-[#a0a0a0] inline text-xl hover:text-designColor" />
                  Help
                </CustomLink>
              </li>
              <div className=" ">
                <div
                  className=" font-semibold hover:text-designColor cursor-pointer flex flex-row items-center"
                  onClick={() => setshowoption(!showoption)}
                >
                  Parth
                  <RiAccountCircleFill className="inline text-xl text-center m-1" />
                </div>

                {showoption && (
                  <div className="absolute right-3 bg-white rounded-md  border shadow-md">
                    <ul className="flex flex-col gap-2 p-2">
                      <li className="text-base font-normal text-gray-500 tracking-wide cursor-pointer hover:text-designColor duration-300 border-b-[1px] border-b-gray-600">
                        Profile
                      </li>
                      <li className="text-base font-normal text-gray-500 tracking-wide cursor-pointer hover:text-designColor duration-300 border-b-[1px] border-b-gray-600">
                        Alerts
                      </li>
                      <li className="text-base font-normal text-gray-500 tracking-wide cursor-pointer hover:text-designColor duration-300 border-b-[1px] border-b-gray-600">
                        Settings
                      </li>
                      <li
                        className="text-base font-normal text-gray-500 tracking-wide cursor-pointer hover:text-designColor duration-300 border-b-[1px] border-b-gray-600"
                     
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </ul>

            {showMenu && (
              <div className="w-[80%] h-screen overflow-scroll absolute top-0 -left-3 bg-gray-800 p-4 scrollbar-hide z-50">
                <div className="flex flex-col gap-8 py-2">
                  <div>
                    <div className="flex flex-row  gap-4 items-center">
                      <img src={logo} alt="logo" className=" w-16 h-16" />
                      <p className=" mdl:text-4xl text-white text-2xl">
                       CANE
                      </p>
                    </div>
                    <p className="text-sm text-gray-400 mt-2 pt-6 border-t-[1px] border-t-gray-600">
                    Our app utilizes machine learning to revolutionize sugarcane ethanol production, offering precise field detection for efficient harvesting. We prioritize user satisfaction, delivering innovative solutions for sustainable and profitable ethanol production
                    </p>
                  </div>
                  <ul className="flex flex-col gap-4 pl-4 ">
                    <div className=" font-semibold hover:text-designColor cursor-pointer flex flex-row items-center text-white">
                      Hello Parth ! !
                    </div>
                    <li
                      className="text-base font-normal text-gray-500 tracking-wide cursor-pointer hover:text-designColor duration-300 border-b-[1px] border-b-gray-600"
                      onClick={() => setshowoption(!showoption)}
                    >
                      <CustomLink to="/explore">Profile</CustomLink>
                    </li>
                    {showoption && (
                      <ul className="flex flex-col gap-2 p-2">
                        <li className="text-base font-normal text-gray-500 tracking-wide cursor-pointer hover:text-designColor duration-300 border-b-[1px] border-b-gray-600">
                          Edit Profile
                        </li>
                        <li className="text-base font-normal text-gray-500 tracking-wide cursor-pointer hover:text-designColor duration-300 border-b-[1px] border-b-gray-600">
                          Alerts
                        </li>

                        <li className="text-base font-normal text-gray-500 tracking-wide cursor-pointer hover:text-designColor duration-300 border-b-[1px] border-b-gray-600">
                          Settings
                        </li>
                        <li
                          className="text-base font-normal text-gray-500 tracking-wide cursor-pointer hover:text-designColor duration-300 border-b-[1px] border-b-gray-600"
                        
                        >
                          Logout
                        </li>
                      </ul>
                    )}
                    <li className="text-base font-normal text-gray-500 tracking-wide cursor-pointer hover:text-designColor duration-300 border-b-[1px] border-b-gray-600">
                      <CustomLink to="/">Home</CustomLink>
                    </li>

                    <li className="text-base font-normal text-gray-500 tracking-wide cursor-pointer hover:text-designColor duration-300 border-b-[1px] border-b-gray-600">
                      <CustomLink to="/maps">Detect Field</CustomLink>
                    </li>
                  
                    <li className="text-base font-normal text-gray-500 tracking-wide cursor-pointer hover:text-designColor duration-300 border-b-[1px] border-b-gray-600">
                      <CustomLink to="/upload">Analyse Image</CustomLink>
                    </li>
                  </ul>
                  <div className="flex flex-col xl:flex-row gap-3  justify-between">
                    <h2 className="text-base text-white uppercase font-titleFont mt-3">
                      Find us on
                    </h2>
                    <div className="flex gap-4">
                      <span className="bannerIcon">
                        <FaWhatsapp
                          onClick={() =>
                            window.open(
                              "https://wa.me/+919819615731?text=Hi%20Parth,%20I%20would%20like%20to%20connect%20with%20you."
                            )
                          }
                        />
                      </span>
                      <span className="bannerIcon">
                        <FaGithub
                          onClick={() =>
                            window.open(
                              "https://discordapp.com/users/parthgala6703"
                            )
                          }
                        />
                      </span>
                    </div>
                  </div>
                  <span
                    onClick={() => setShowMenu(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-designColor duration-300 text-2xl cursor-pointer"
                  >
                    <MdClose />
                  </span>
                </div>
                <div className="w-full">
                  <p className=" text-center text-gray-500 text-sm">
                    © 2023 All rights reserved by Parth Gala
                  </p>
                </div>
              </div>
            )}
          </div>
          <></>
          {/* // <ul className=" hidden md:inline-flex items-center gap-10 mr-4">
          //   <li className=" bg-blue-300 rounded-2xl p-2 text-base font-normal text-gray-700 tracking-wide cursor-pointer hover:text-black hover:border-black hover:border-[1px] duration-200">
          //     <CustomLink to="/register">Register</CustomLink>
          //   </li>
          //   <li className="border-[1px] border-designColor rounded-2xl p-2 text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor hover:border-black hover:border-[1px] duration-300">
          //     <CustomLink to="/login">Login</CustomLink>
          //   </li>
          // </ul> */}
      </div>
    </div>
  );
};

export default Navbar;
