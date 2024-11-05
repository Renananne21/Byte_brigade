import { useState } from "react";
import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function SignUp() {

  const [accountType, setAccountType] = useState("organizer");

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
  };
  
  return (
    <div className=" signUpPage">
      <div className="signUpHeader">
        <Navbar></Navbar>
        <h3>Join our TicketGO Platform!</h3>
      </div>
      <div className="createAccount">
       
      <div className="accountType">        
        <button onClick={() => handleAccountTypeChange("organizer")}>
          Event Organizer
        </button>
        <button onClick={() => handleAccountTypeChange("personal")}>
          Personal Account
        </button>
      </div>

        <div className="createEventOrganizer">
          <form action="">
            <div className="businessname">
              <div className="align"><label htmlFor="businessname">Business Name:</label></div>
              <input type="text" Id="businessname" required />
            </div>
            <div className="contactname">
              <div className="align"><label htmlFor="contactname">Contact Name:</label></div>
              <input type="text" for="contactname" required />
            </div>
            <div className="contactphone">
              <div className="align"><label htmlFor="contactphone">Contact Phone:</label></div>
              <input type="tel" for="cantactphone" required />
            </div>
            <div className="contactemail">
              <div className="align"><label htmlFor="email">Contact Email:</label></div>
              <input type="email" for="contactemail" required />
            </div>
            <button type="submit" className="createAccountbtn">Create Account</button>
          </form>
        </div>
        <div className="createAccountPersonal">
          <form action="">
            <div className="name">
              <div className="align"><label htmlFor="name">Name:</label></div>
              <input type="text" Id="name" required />
            </div>
            <div className="phone">
              <div className="align"><label htmlFor="phone">Phone:</label></div>
              <input type="tel" for="phone" required />
            </div>
            <div className="email">
              <div className="align"><label htmlFor="email">Email:</label></div>
              <input type="email" for="email" required />
            </div>

            <button type="submit" className="createAccountbtn">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;