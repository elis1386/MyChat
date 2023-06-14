import React from "react";
import SideBar from "./SideBar";
import Chat from "./Chat";

const Home = () => {
  return (
    <div className='home'>
    <div className="container">
      <SideBar/>
      <Chat/>
    </div>
  </div>
  );
};
export default Home;
