import React from "react";
import "./Loading.css";

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner w-6 h-6 text-teal-500 rotate">
        loaing................
      </div>
    </div>
  );
};

export default LoadingScreen;
