import React, { useState } from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";


const Controller = () => {
  const [userDetails, setUserDetails] = useState({
    "email_address": "",
    "first_name": "",
    "last_name": "",
    "mobile_number": "",
    "password": ""
  });
  const [token, setToken] = useState(false);
  const baseUrl = "/api/v1/";
  // function logInHandler() {
  //   setToken(true);
  // }

  return (
    <Router>
      <div className="main-container">
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} setUserDetails={setUserDetails} userDetails={userDetails} setToken = {setToken} token={token} baseUrl={baseUrl}  />}
        />
        <Route
          path="/movie/:id"
          render={(props) => <Details {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/bookshow/:id"
          render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/confirm/:id"
          render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
        />
      </div>
    </Router>


  );
};

export default Controller;
