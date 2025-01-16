import React, { useContext, useEffect, useState } from "react";
import '../styles/Feed.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../AuthContext";

function Feed() {

    const [ allGroups, setAllGroups ] = useState({});

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchAllGroups = async () => {
            try {
                const usersCollection = collection(db, "users");
                const usersSnapshot = await getDocs(usersCollection);

                const allUserGroups = {};

                usersSnapshot.forEach((doc) => {
                    const userData = doc.data();
                    const userGroups = userData.groups;
                    // add to all groups
                    allUserGroups[doc.id] = {
                        name: userData.name || "Unknown User",
                        groups: userGroups
                    }
                });
                setAllGroups(allUserGroups);
            } catch (error) {
                console.log("Error fetching all groups:", error);
            }
        }
        fetchAllGroups();
    }, []);

    if(!user) {
        return <div>Loading ... </div>
    }

    return (
        <div className="public-feed">
            <h1>Welcome to the Public Feed</h1>
            <h3>Check out playlists made by other users</h3>
            <div>
                {Object.keys(allGroups).length === 0 ? (
                    <div>No groups found</div>
                ) : (
                    Object.entries(allGroups).flatMap(([userId, { name, groups }]) => (
                        Object.entries(groups).map(([groupsId, group]) => (
                            
                            <div key={groupsId}>
                                <li key={groupsId}>{group.name}</li>
                                <p>Created by: {name}</p>
                            </div>
                        ))
                    ))
                )}
            </div>
        </div>
    )
}

export default Feed;