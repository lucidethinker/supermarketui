import React from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Home = () => {
  const [loginStatus, setLoginStatus] = useState(Cookies.get("loginStatus"));
  const [loginUserType, setUserType] = useState(Cookies.get("loginUserType"));

  useEffect(() => {
    setLoginStatus(Cookies.get("loginStatus"));
    setUserType(Cookies.get("loginUserType"));
  }, [Cookies.get("loginStatus"), Cookies.get("loginUserType")]);
  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <div className="text-white text-4xl font-bold">
        {loginStatus == null && "SUPER MARKET MANAGEMENT SYSTEM "}
        {loginUserType == 0 && " WELCOME ADMIN"}
        {loginUserType == 1 && " WELCOME STAFF"}
      </div>
    </div>
  );
};

export default Home;
