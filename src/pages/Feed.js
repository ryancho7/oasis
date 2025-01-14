import React, { useEffect, useState } from "react";
import '../styles/Feed.css';
import { collection } from "firebase/firestore";
import { db } from "../firebase";

function Feed() {

    const [ allGroups, setAllGroups ] = useState([]);

    useEffect(() => {
        const fetchAllGroups = async () => {
            try {
                const usersCollection = collection(db, "users");
                
            } catch (error) {
                console.log("Error fetching all groups:", error);
            }
        }
    }, []);

    return (
        <div>This is the start of the feed</div>
    )
}

export default Feed;