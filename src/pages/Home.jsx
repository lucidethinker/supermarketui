import Cookies from "js-cookie";
import React from "react";
import { useEffect, useState } from "react";

const Home = () => {
  const [loginUserType, setUserType] = useState(Cookies.get("loginUserType"));

  useEffect(() => {
    setUserType(Cookies.get("loginUserType"));
  }, [Cookies.get("loginUserType")]);

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <div className="text-white text-4xl font-bold">
        {loginUserType == 0 && "Welcome Admin"}{" "}
        {loginUserType > 0 && "Welcome Staff"}
      </div>
    </div>
  );
};

export default Home;
