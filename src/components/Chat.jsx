import React, { useContext } from "react";
import Cam from "../image/cam.png";
import Add from "../image/add.png";
import More from "../image/more.png";
import MessageList from "./MessageList";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <section className="chat">
      <article className="chatInfo">
        <span className="">{data.user.displayName}</span>
        <figure className="chatIcons">
          <img src={Cam} alt="" className="h-6 coursor-pointer" />
          <img src={Add} alt="" className="h-6 coursor-pointer" />
          <img src={More} alt="" className="h-6 coursor-pointer" />
        </figure>
      </article>
      <MessageList />
      <Input />
    </section>
  );
};

export default Chat;
