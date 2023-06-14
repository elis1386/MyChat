import React, { useContext, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log(doc.data());
      });
    } catch (error) {}
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };



  const handleSelect = async () => {
    const combainId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chats", combainId));

      if (!response.exists()) {
        await setDoc(doc(db, "chats", combainId), { messages: [] });
      }
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combainId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combainId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", user.uid), {
        [combainId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combainId + ".date"]: serverTimestamp(),
      });
    } catch (error) {}

    setUser(null);
    setUserName("");
  };

  return (
    <section className="search">
      <article className="searchForm">
        <input
          type="text"
          placeholder="find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </article>
      {error && <span>User not found</span>}
      {user && (
        <article className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="photo" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </article>
      )}
    </section>
  );
};

export default Search;
