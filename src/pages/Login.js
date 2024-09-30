import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import illustration from "images/login-illustration.svg";
import logo from "images/logo.svg";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { useAuth } from "context/AuthProvider";
import axios from "axios";

const LoginPage = () => {
  const { login, form, setForm } = useAuth();

  const logoLinkUrl = "#";
  const illustrationImageSrc = illustration;
  const headingText = "Sign In";
  const socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign In With Google",
      url: "https://google.com",
    },
    {
      iconImageSrc: twitterIconImageSrc,
      text: "Sign In With Twitter",
      url: "https://twitter.com",
    },
  ];
  const submitButtonText = "Sign In";
  const forgotPasswordUrl = "#";
  const signupUrl = "#";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the login function from useAuth
    await login();
  };

  return (
    <AnimationRevealPage>
      <div className="min-h-screen bg-[#3C096C] text-white font-medium flex justify-center -m-8 font-mono">
        <div className="max-w-[1000px] m-0 sm:mx-20 sm:my-16 bg-white bg-opacity-0 text-gray-900 shadow-lg sm:rounded-xl flex justify-center flex-1">
          <div className=" p-20 sm:p-12">
            <h1 className="flex justify-center text-[20px] font-bold">Welcome to E-Commerce</h1>
            <div className="mt-12 flex flex-col items-center">
              <h2 className="text-lg xl:text-lg font-bold">
                {headingText}
              </h2>
              <div className="w-full mt-8">
                <div className="flex flex-row gap-2 items-center">
                  {socialButtons.map((socialButton, index) => (
                    <div className="border-2 border-gray-900">
                      <a
                        key={index}
                        href={socialButton.url}
                        className="w-full p-4 max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hover:bg-gray-200 hover:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <img
                            src={socialButton.iconImageSrc}
                            className="icon w-6 h-6"
                            alt=""
                          />
                          <span className="text">{socialButton.text}</span>
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
                <div className="my-12 text-center cursor-default relative">
                  <div className="px-2 text-white text-[17px] tracking-wide font-medium">
                    Or Sign in with your e-mail
                  </div>
                </div>
                <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0"
                  />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  />
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <LoginIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </button>
                </form>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  <a
                    href={forgotPasswordUrl}
                    className="border-b border-gray-500 border-dotted"
                  >
                    Forgot Password ?
                  </a>
                </p>
                <p className="mt-8 text-sm text-gray-600 text-center">
                  Dont have an account?{" "}
                  <a
                    href={signupUrl}
                    className="border-b border-gray-500 border-dotted"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
          {/* <div className="sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center">
            <div
              className={`m-12 xl:m-16 w-[100px] max-w-sm bg-contain bg-center bg-no-repeat`}
              style={{ backgroundImage: `url("${illustrationImageSrc}")` }}
            ></div>
          </div> */}
        </div>
      </div>
    </AnimationRevealPage>
  );
};

export default LoginPage;
