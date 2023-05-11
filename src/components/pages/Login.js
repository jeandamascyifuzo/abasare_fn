import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { axiosRequest } from "../../api";
import { setUserSession } from "../utils/common";
import Fade from "react-reveal/Fade";
import LoadingButton from "../LoadingButton";
const User_URL = "user/login";

const Login = () => {
  const [askAdminPermissionModel, setAskAdminPermissionModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const adminPermission = () => {
    let newState = !askAdminPermissionModel;
    setAskAdminPermissionModel(newState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axiosRequest
      .post(User_URL, {
        email: email,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        const result = res.data;
        const { message } = result;
        toast.success(message);
        setUserSession(res.data.token, res.data.user);
        setTimeout(() => {
          navigate("/boards");
        }, 2000);
      })
      .catch((error) => {
        const errMsg = error.response.data.message;
        toast.error(errMsg);
      });
  };

  return (
    <>
      <ToastContainer />
      {/* ====================== Start::  AskAdminPermissionModel =============================== */}
      <Fade right>
        <div
          className={`min-h-full w-screen z-50 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${
            askAdminPermissionModel === true ? "block" : "hidden"
          }`}
        >
          <div className="bg-white w-1/2 shadow-2xl rounded-lg p-4">
            <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
              <h1 className="font-bold text-sm text-center w-11/12">
                Request admin permission
              </h1>
              <hr className=" bg-primary border-b w-full -mb-6" />
            </div>
            <div className="card-body">
              <form className="-mb-10 px-8">
                <div>
                  <h2 className="text-base m-4">
                    If you want to join our Team, Call Admin or Text him{" "}
                  </h2>
                </div>
                <div className="w-full flex justify-between">
                  <button
                    className="btn btn-danger light shadow-none"
                    onClick={(e) => adminPermission(e.preventDefault())}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fade>
      {/* =========================== End::  AskAdminPermissionModel =============================== */}

      <section className="bg-gray-50">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <Link
            to="/"
            className="mb-6 flex items-center text-2xl font-semibold text-gray-900"
          >
            <img
              className="mr-2 h-8 w-8"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROL1kGWhRNsmGDSWPTCY8TOTflSENi9dr7pg&usqp=CAU"
              alt="logo"
            />
            Abasare
          </Link>
          <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleLogin}
              >
                <div>
                  <label
                    for="email"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div
                      className="text-gray-700 text-sm font-medium hover:underline"
                    >
                      Forgot password?
                    </div>
                  </div>
                </div>
                {!loading ? (
                  <LoadingButton />
                ) : (
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary light flex items-center svg-btn shadow-none w-full mx-auto"
                  >
                    Sign in
                  </button>
                )}
              </form>
                <p className="text-sm font-light text-gray-900">
                  Don’t have an account yet?{" "}
                  <button
                    className="text-gray-700 font-medium hover:underline"
                    onClick={adminPermission}
                  >
                    Sign up
                  </button>
                </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
