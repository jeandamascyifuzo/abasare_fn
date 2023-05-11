import React, { useState } from "react";
import { Fade } from "react-reveal";
import { Link, useNavigate } from "react-router-dom";
import DashSideBar from "./sidebar/Sidebar";
import { FiEyeOff } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { removeUserSession, getUser } from "./utils/common";
import { axiosRequest, refreshPage } from "../api";
import { toast, ToastContainer } from "react-toastify";
import LoadingButton from "./LoadingButton";

const DashHeader = () => {
  const [changePassModel, setChangePassModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [menu, setMenu] = useState(false);
  const handleClick = () => setMenu(!menu);
  const [open, setOpen] = useState(false);
  const handleDropDown = () => setOpen(!open);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  const tooglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const user = getUser();
  const userName = user[0].name;
  const userEmail = user[0].email;

  const changePasswordModel = () => {
    let newState = !changePassModel;
    setChangePassModel(newState);
  };

  const handlerLogOut = () => {
    removeUserSession();
    navigate("/");
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    const url = `user/change/password/${userId}`;
    setLoading(true);
    axiosRequest
      .put(url, {
        password,
        confirmPassword,
      })
      .then((response) => {
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
        const result = response.data;
        const { message } = result;
        toast.success(message);
        setChangePassModel(false);
        setTimeout(() => {
          if (message === "Password Changed successful") {
            handlerLogOut();
          }
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "ERR_BAD_REQUEST") {
          toast.error(error.response.data.message);
        } else {
          toast.info(error.message);
          setTimeout(() => {
            setLoading(false);
            refreshPage();
          }, 2000);
        }
      });
  };

  return (
    <>
      <ToastContainer />
      {/* ====================== Start::  ChangePasswordModel =============================== */}
      <Fade right>
        <div
          className={`min-h-full w-screen z-50 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${
            changePassModel === true ? "block" : "hidden"
          }`}
        >
          <div className="bg-white w-1/2 shadow-2xl rounded-lg p-4 pb-8">
            <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
              <h1 className="font-bold text-sm text-center w-11/12">
                Do you really want to change Passward?
              </h1>
              <hr className=" bg-primary border-b w-full" />
            </div>
            <div className="card-body">
              <form>
                <div className="flex">
                  <div className="bg-gray-100 w-64 p-2 flex items-center rounded mb-6 mr-2">
                    <MdLockOutline className="text-gray-400 mr-2 " />
                    <input
                      placeholder="Enter New Password"
                      type={passwordShown ? "text" : "password"}
                      className="bg-gray-100 outline-none text-sm flex-1 text-gray-400"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <div className="text-gray-400 cursor-pointer onClick= {()=> handleShowPassword}">
                      {passwordShown ? (
                        <FaRegEye onClick={tooglePassword} />
                      ) : (
                        <FiEyeOff onClick={tooglePassword} />
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center rounded mb-6 ml-2">
                    <MdLockOutline className="text-gray-400 mr-2 " />
                    <input
                      placeholder="Confirm Password"
                      type={passwordShown ? "text" : "password"}
                      className="bg-gray-100 outline-none text-sm flex-1 text-gray-400"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                    <div className="text-gray-400 cursor-pointer onClick= {()=> handleShowPassword}">
                      {passwordShown ? (
                        <FaRegEye onClick={tooglePassword} />
                      ) : (
                        <FiEyeOff onClick={tooglePassword} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <button
                    className="btn btn-danger light shadow-none"
                    onClick={(e) => changePasswordModel(e.preventDefault())}
                  >
                    Cancel
                  </button>
                  {loading ? (
                    <LoadingButton />
                  ) : (
                    <button
                      className="btn btn-outline-danger btn-s shadow-none"
                      onClick={handleChangePass}
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fade>
      {/* =========================== End::  ChangePasswordModel =============================== */}

      <div className="z-20">
        <nav className="bg-white lg:w-[86%] 2xl:w-[90%]  px-4 2xl:pr-12 lg:px-6 py-8 fixed border-b ml-56 shadow-transparent z-20">
          <div className="flex flex-wrap justify-end items-center mx-auto max-w-screen-2xl">
            <div className="flex items-center lg:order-2 pr-6">
              <div className="flex flex-shrink-0 items-center space-x-4">
                <h4 className="text-[#eeb974]">{userName}</h4>
                <img
                  className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400 object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOxSS-sAygvA0cuD8YNoCqs5ZJUt3KmjHa0g&usqp=CAU"
                  alt="avatar"
                  onClick={handleDropDown}
                />
              </div>
            </div>
            <div
              className={
                !open
                  ? "hidden"
                  : "w-58 mt-64 rounded-lg shadow-lg border bg-white absolute justify-end right-10 mr-2"
              }
              onClick={handleDropDown}
            >
              <ul className="space-y-3 p-2">
                <li className="font-medium">
                  <span
                    href="#link"
                    className="flex text-black items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                  >
                    <div className="mr-2">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    {userEmail}
                  </span>
                </li>
                <hr className="text-white" />
                <li className="font-medium">
                  <button
                    className="flex text-black mr-4 items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                    onClick={() => {
                      changePasswordModel(setUserId(user[0]._id));
                    }}
                  >
                    <div className="mr-2">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                    Change Password
                  </button>
                </li>
                <hr className="text-white" />
                <li className="font-medium pb-2">
                  <button
                    className="flex text-black items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                    onClick={handlerLogOut}
                  >
                    <div className="mr-2 text-red-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </div>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <ul
            onClick={handleClick}
            className={!menu ? "hidden" : "bg-white cursor-pointer lg:hidden"}
          >
            <DashSideBar className="flex pt-4 h-[92%]" />
          </ul>
        </nav>
      </div>
    </>
  );
};

export default DashHeader;
