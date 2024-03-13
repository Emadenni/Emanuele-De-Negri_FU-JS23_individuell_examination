import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import React, { useEffect, useState } from "react";


import "../pages/profile.scss";
const Profile = () => {
 

  
  return (
    <section className="profile-wrapper">
      <div className="inProfile">
        <Header />
      </div>
      <Login />
    </section>
  );
};

export default Profile;
