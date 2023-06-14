import React, { useContext } from "react";
import Pug from "../image/pug.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <article className="navbar">
      <span className="logo">MyChat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </article>
  );
};

export default NavBar
