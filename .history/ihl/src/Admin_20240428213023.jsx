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
        const {data} = await axios.post("http://localhost:3001/match", {
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
        const {data} = await axios.patch("http://localhost:3001/match/1", {
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

  const handleReset = () => {
    if (window.confirm("Are you really want to reset.")) {
        deleteMatch();
        window.location.reload();
        setSubmitDisabled(false);
    }
  }

  const deleteMatch = async () => {
    try {
        const {data} = await axios.delete('http://localhost:3001/match/1');
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
    if (password === "adminpassword") {
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
