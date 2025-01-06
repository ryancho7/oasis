import React, { useEffect } from "react";
import { auth, googleProvider, db } from '../firebase'
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "../styles/Home.css";

function Home() {
    
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.currentUser) {
          navigate("/dashboard");
        }
      }, [navigate]);

    const loginWithGoogle = async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const loggedInUser = result.user;
    
          // add user to firebase
          const userRef = doc(db, "users", loggedInUser.uid);
          const userSnap = await getDoc(userRef);

          if(userSnap.exists()) {
            console.log("User already exists: ", userSnap.data());
            navigate("/profile");
          } else {
            await setDoc(userRef, {
                name: loggedInUser.displayName,
                email: loggedInUser.email,
                photoURL: loggedInUser.photoURL,
                lastLogin: new Date(),
              });
            console.log("User added to firebase");
            // navigate to dashboard
            navigate("/profile");
          }
        } catch (error) {
          console.log("Error during login: ", error);
          alert("Something went wrong ...");
        }
    }
    
    return (
        <div className="homepage">
            <div className="welcome-section">
                <h1 className="">Welcome to the OASIS</h1>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>
            </div>
            <div className="login-section">
                <h1>Let's Get Started</h1>
                <h3>USER LOGIN</h3>
                <button className="home-page-button" onClick={loginWithGoogle}><FcGoogle className="google-icon" size={24}/>Continue with Google</button>
            </div>
        </div>
    );
}

export default Home;
