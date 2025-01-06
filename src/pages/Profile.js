import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { AuthContext } from "../AuthContext";
import '../styles/Profile.css';
import SideBar from "./Sidebar";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [ groups, setGroups ] = useState({});
    const [ selectedGroup, setSelectedGroup ] = useState(null);

    // Redirect user if they are logged out
    useEffect(() => {
        if (!loading && !user) {
            navigate("/");
        }
    }, [user, loading, navigate]);

    // fetch groups from firestore
    useEffect(() => {
        const fetchGroups = async () => {
            if(user) {
                try {
                    const userRef = doc(db, "users", user.uid);
                    const userSnap = await getDoc(userRef);
                    if(userSnap.exists()) {
                        const userData = userSnap.data();
                        setGroups(userData.groups || {});
                        if(!selectedGroup) {
                            const firstGroupId = Object.keys(userData.groups || {})[0];
                            if(firstGroupId) setSelectedGroup(firstGroupId);
                        }
                    }
                } catch (error) {
                    console.log("Error fetching groups: ", error);
                }
            }
        }
        fetchGroups();
    },[user, selectedGroup]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-page">
            <div className="sidebar-component">
                <SideBar 
                    groups={groups}
                    selectedGroup={selectedGroup}
                    onSelectGroup={setSelectedGroup}
                />
            </div>
            <div className="dashboard-component">
                <Dashboard 
                    selectedGroup={selectedGroup}
                    groups={groups}
                />
            </div>
        </div>
    )
}

export default Profile;
