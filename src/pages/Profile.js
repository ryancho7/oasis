import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { AuthContext } from "../AuthContext";
import '../styles/Profile.css';
import SideBar from "./Sidebar";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import SearchPlaylist from "./SearchPlaylist";
import Feed from "./Feed";

function Profile() {
    const { user, loading } = useContext(AuthContext);

    const navigate = useNavigate();
    const userRef = user ? doc(db, "users", user.uid) : null;

    const [ groups, setGroups ] = useState({});
    const [ selectedGroup, setSelectedGroup ] = useState(null);
    const [ searchPlaylist, setSearchPlaylist ] = useState(false);
    const [ viewingFeed, setViewingFeed ] = useState(false);

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
    },[user, selectedGroup, userRef]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.log("Error signing out:", error);
        }
    };

    const handleCreateGroup = async (groupName) => {
        if(!groupName.trim()) return;

        const groupId = uuidv4();
        const newGroup = {
            [groupId] : {
                name: groupName,
                websites: [],
            }
        }

        // send to firestore
        try {
            await updateDoc(userRef, {
                groups: { ...groups, ...newGroup},
            });
            // update local state
            setGroups((prevGroups) => ({ ...prevGroups, ...newGroup}));
        } catch (error) {
            console.log("Error creating group:", error);
        }

    }

    const handleRemoveWebsite = async (groupId, website) => {
        const updatedGroup = {
            ...groups[groupId],
            websites: groups[groupId].websites.filter((w) => w !== website)
        };

        const updatedGroups = { ...groups, [groupId]: updatedGroup };
        // update firestore + local state
        try {
            await updateDoc(userRef, {
                groups: updatedGroups
            });
            setGroups(updatedGroups);
        } catch (error) {
            console.log("Error removing website:", error);
        }
    }

    const handleAddWebsite = async (groupId, website) => {
        const updatedGroups = {
            ...groups,
            [groupId]: {
                ...groups[groupId],
                websites: [ ...groups[groupId].websites, website]
            }
        }

        try {
            await updateDoc(userRef, {
                groups: updatedGroups
            });
            setGroups(updatedGroups);
        } catch (error) {
            console.log("Error adding website to groups: ", error);
        }
    }

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
                    searchQuery={searchPlaylist}
                    onSearchPlaylist={setSearchPlaylist}
                    handleCreateGroup={handleCreateGroup}
                    handleSignOut={handleSignOut}
                    viewingFeed={viewingFeed}
                    onViewingFeed={setViewingFeed}
                />
            </div>
            {searchPlaylist ? (
                <div className="dashboard-component">
                    <SearchPlaylist 
                        groups={groups}
                        onSelectGroup={setSelectedGroup}
                        onSearchPlaylist={setSearchPlaylist}
                    />
                </div>
            ) : viewingFeed ? (
                <div className="search-playlist-component">
                    <Feed />
                </div>
            ) : (
                <div className="search-playlist-component">
                    <Dashboard 
                        selectedGroup={selectedGroup}
                        groups={groups}
                        handleRemoveWebsite={handleRemoveWebsite}
                        handleAddWebsite={handleAddWebsite}
                    />
                </div>
            )}
        </div>
    )
}

export default Profile;
