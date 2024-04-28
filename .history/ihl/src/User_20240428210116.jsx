import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function User() {
  const [scoreTeam1, setScoreTeam1] = useState(0);
  const [scoreTeam2, setScoreTeam2] = useState(0);
  const [captain1, seCaptain1] = useState("");
  const [captain2, setCaptain2] = useState("");

  //refresh page every two seconds
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 10000);
    return () => clearInterval(interval);
  },[]);

  
  const getCaptainName = async () => {
    try {
        const {data} = await axios.get("http://localhost:3001/match/1");
        console.log(data);
        setCaptain1(data?.captain1);
        setCaptain2(data?.captain2);
        setScoreTeam1(data?.scoreTeam1);
        setScoreTeam2(data?.scoreTeam2);
    } catch (error) {
        console.log({error, message: "problem in getCaptainName"});
    }
    
  }

  useEffect(() => {
    getCaptainName();
  },[])


  return (
    <div className="flex flex-col space-y-6 w-screen justify-between px-[8vw]">
      <div className="flex space-x-4">
        <div className="border-2 rounded-lg px-1">
          <h1>Team 1</h1>
          <div className="flex space-x-2">
            <p>Captain :</p>
            <p>{captain1}</p>
          </div>
          <div className="flex space-x-2">
            <p>Points : </p>
            <p>{scoreTeam1}</p>
          </div>
        </div>
        <div className="border-2 rounded-lg px-1">
          <h1>Team 2</h1>
          <div className="flex space-x-2">
            <p>Captain :</p>
            <p>{captain2}</p>
          </div>
          <div className="flex space-x-2">
            <p>Points : </p>
            <p>{scoreTeam2}</p>
          </div>
        </div>
      </div>
      <div className="box">
        <h2>IET HOSTEL LEAGUE 2024</h2>
      </div>
    </div>
  );
}

export default User;
