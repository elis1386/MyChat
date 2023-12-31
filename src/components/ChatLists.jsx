import React, { useContext, useEffect, useState } from "react";
import Pug from "../image/pug.png";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <section className="chats">
      {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
        <article
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}>
          <img
            src={chat[1].userInfo.photoURL}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="userChatInfo">
            <span className="">{chat[1].userInfo.displayName}</span>
            <p className="">{chat[1].lastMessage?.text}</p>
          </div>
        </article>
      ))}
    </section>
  );
};
export default ChatList;
