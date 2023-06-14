import React, { useState } from "react";
import Add from "../image/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then( async (downloadURL) => {
          try {
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", response.user.uid), {}); 
            navigate("/");
          } catch (error) {
            setError(true);
            setLoading(false);
            console.log(error);
          }
        });
      });
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="formContainer">
    <div className="formWrapper">
      <span className="logo">MyChat</span>
      <span className="title">Register</span>
      <form onSubmit={handleSubmit}>
        <input required type="text" placeholder="display name" />
        <input required type="email" placeholder="email" />
        <input required type="password" placeholder="password" />
        <input required style={{ display: "none" }} type="file" id="file" />
        <label htmlFor="file">
          <img src={Add} alt="" />
          <span>Add an avatar</span>
        </label>
        <button disabled={loading}>Sign up</button>
        {loading && "Uploading and compressing the image please wait..."}
        {error && <span>Something went wrong</span>}
      </form>
      <p>
        You do have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  </div>
  );
};
export default Register;
