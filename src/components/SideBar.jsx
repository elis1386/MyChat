import React from "react";
import ChatList from "./ChatLists";
import  NavBar from "./NavBar"
import Search from "./Search";

const SideBar = () => {
  return (
    <div className="sidebar">
      <NavBar />
      <Search />
      <ChatList />
    </div>
  );
};

export default SideBar;
