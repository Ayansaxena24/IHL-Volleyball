import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import AlertDialogSlide from "./Modal";

function Admin() {
  const [scoreTeam1, setScoreTeam1] = useState(0);
  const [scoreTeam2, setScoreTeam2] = useState(0);
  const [captain1, setCaptain1] = useState("");
  const [captain2, setCaptain2] = useState("");

  const [submitDisabled, setSubmitDisabled] = useState(false);

  const incrementFunc = (id) => {
    console.log("incremented");
    if (id == 1) 
    {
        setScoreTeam1(prev => {
            handleScoreChange(prev+1, scoreTeam2);
            return prev + 1;
        });
    }
    else 
    {
        setScoreTeam2(prev => {
            handleScoreChange(scoreTeam1, prev+1);
            return prev+1;
        });
    }
  };

  const decrementFunc = (id) => {
    if (id == 1) 
    {
        setScoreTeam1(prev => {
            handleScoreChange(prev-1, scoreTeam2);
            return  prev - 1;
        });
        
    }
    else 
    {
        setScoreTeam2(prev => {
            handleScoreChange(scoreTeam1, prev-1);
            return prev - 1;
        });
        handleScoreChange();
    }
  };

  const handleSubmit = async () => {
    try {
        const {data} = await axios.post("https://ihl-volleyball.onrender.com/match", {
        id : "1",
        captain1,
        captain2,
        scoreTeam1,
        scoreTeam2,
        });
        console.log(data);
        console.log("submitted");
        setSubmitDisabled(true);
    } catch (error) {
        console.log({error, message: 'problem in handle submit'});
        setSubmitDisabled(false);
        
    }
    
  }

  const handleScoreChange = async (score1, score2) => {
    try {
        const {data} = await axios.patch("https://ihl-volleyball.onrender.com/match/1", {
        scoreTeam1: score1,
        scoreTeam2: score2,
        });
        console.log(data);
        console.log("score changed");
    } catch (error) {
        console.log({error, message: "problem in handleScoreChange"});
    }
    
  }


  const getCaptainName = async () => {
    try {
        const {data} = await axios.get("https://ihl-volleyball.onrender.com/match/1");
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

  const handleReset = () => {
    if (window.confirm("Do you really want to reset.")) {
        deleteMatch();
        window.location.reload();
        setSubmitDisabled(false);
    }
  }

  const deleteMatch = async () => {
    try {
        const {data} = await axios.delete('https://ihl-volleyball.onrender.com/match/1');
        console.log({data, message: 'deleted'});
    } catch (error) {
        setSubmitDisabled(false)
        console.log(error);
    }
    
  }

  const [open, setOpen] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    // Check if password is correct
    if (password === "ihlfinal") {
      setIsAdmin(true);
      setOpen(false);
    } else {
      // Show error message or handle incorrect password
      alert("Incorrect password");
    }
  };



  return (
    <div className="flex flex-col space-y-6 w-screen justify-between px-[8vw]">
      {isAdmin ? (
        <>
        <div className="justify-center flex flex-col items-center space-y-4">
        <p className="font-semibold text-3xl flex justify-center items-center mt-4">Enter Team Details</p>
        <div className="box">
        <h2>IET HOSTEL LEAGUE 2024</h2>
      </div>
        <div className="space-y-2 flex flex-col justify-center">
        <input
            type="text"
            value={captain1}
            onChange={(e) => setCaptain1(e.target.value)}
            placeholder="Enter Captain 1 Name"
            className="text-white pl-1"
          />
          <input
            type="text"
            value={captain2}
            onChange={(e) => setCaptain2(e.target.value)}
            placeholder="Enter Captain 2 Name"
            className="text-white pl-1"
          />
          </div>
          <button onClick={() => handleSubmit()} disabled={!captain1 || !captain2 || submitDisabled} className="mt-2">Submit</button>
          <button onClick={() => handleReset()} className="mt-2">Reset</button>

      </div>
     
      <div className="justify-center flex flex-col items-center">
        <h1>Details</h1>
        <div className="flex space-x-4">
          <p>{captain1}</p>
          <p>VS</p>
          <p>{captain2}</p>
        </div>
          


        <div className="flex space-x-2">
          <p>Points Team 1: </p>
          <p>{scoreTeam1}</p>
        </div>
        <div className="flex space-x-2">
        <button onClick={() => incrementFunc(1)} className="border-2 rounded-lg">+</button>
          <button onClick={() => decrementFunc(1)} className="border-2 rounded-lg" disabled={scoreTeam1<=0}>-</button>
        </div>
        <div className="flex space-x-2 mb-2">
          <p>Points Team 2: </p>
          <p>{scoreTeam2}</p>
        </div>
        <div className="flex space-x-2">
        <button onClick={() => incrementFunc(2)} className="border-2 rounded-lg">+</button>
          <button onClick={() => decrementFunc(2)} className="border-2 rounded-lg" disabled={scoreTeam2<=0}>-</button>
        </div>
      </div>
      </>
      ) : (
        <AlertDialogSlide
          open={open}
          onClose={handleModalClose}
          onLogin={handleLogin}
          onPasswordChange={handlePasswordChange}
        />
      )}
    </div>
  );
}

export default Admin;
