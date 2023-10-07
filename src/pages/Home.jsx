import React from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loginStatus, setLoginStatus] = useState(Cookies.get("loginStatus"));
  const [loginUserType, setUserType] = useState(Cookies.get("loginUserType"));
  const navigate = useNavigate();

  useEffect(() => {
    setLoginStatus(Cookies.get("loginStatus"));
    setUserType(Cookies.get("loginUserType"));
  }, [Cookies.get("loginStatus"), Cookies.get("loginUserType")]);
  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <div className="text-white text-4xl font-bold">
        {loginStatus == null && "Super Market Managment System "}
        {loginUserType == 0 && " Welcome Admin"}
        {loginUserType == 1 && " Welcome Staff "}
      </div>
    </div>
  );
};

export default Home;
