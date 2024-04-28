import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
 

  return (
    <div className="flex flex-col space-y-20 w-screen justify-between px-[8vw]">
      <div className="flex space-x-1">
        <div className="border-2 rounded-lg px-3 hover:shadow-lg hover:shadow-violet-500 ease-in-out duration-300">
      {isAdmin ? (
        <Admin />
      ) : (
        <AlertDialogSlide
          open={open}
          onClose={handleModalClose}
          onLogin={handleLogin}
          onPasswordChange={handlePasswordChange}
        />
      )}

        </div>
        <div className="border-2 rounded-lg px-3 hover:shadow-lg hover:shadow-violet-500 ease-in-out duration-300">
        <Link to="/user"><h1>User</h1></Link>
        </div>
      </div> 
      <div className="box">
        <h2>IET HOSTEL LEAGUE 2024</h2>
      </div>
    </div>
  );
}

export default Home;
