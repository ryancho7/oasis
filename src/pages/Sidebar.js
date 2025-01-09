import React, { useContext, useState } from "react";
import '../styles/Sidebar.css';
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../AuthContext";
import { IoIosAddCircleOutline } from "react-icons/io";

function SideBar({ groups, selectedGroup, onSelectGroup, handleCreateGroup, handleSignOut }) {

    const { user } = useContext(AuthContext);

    const [ newGroupName, setNewGroupName ] = useState("");

    if(!user) {
        return (
            <p>Loading user ...</p>
        )
    }

    return (
        <div className="sidebar">
            <h1>Welcome, {user.displayName}</h1>
            <div className="sidebar-body">
                <div className="main-content">
                    <hr className="line"/>
                    <h3 className="group-list-header">Your Playlists</h3>
                    <ul className="group-list">
                        {Object.keys(groups).map((groupId) => (
                            <li 
                            key={groupId}
                            className={`group-item ${selectedGroup === groupId ? "active" : ""}`}
                            onClick={() => onSelectGroup(groupId)}
                            >
                                {groups[groupId].name}
                            </li>
                        ))}
                    </ul>
                    <hr className="line"/>
                    <div className="create-group-section">
                        <input
                            type="text"
                            className="create-group-input"
                            placeholder="Create New Group"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                        />
                        <IoIosAddCircleOutline
                            className="add-icon"
                            onClick={() => {
                                if (newGroupName.trim()) {
                                    handleCreateGroup(newGroupName);
                                    setNewGroupName("");
                                }
                            }}
                            title="Create new group"
                        />
                    </div>
                </div>
                <div className="user-options">
                    <div className="user-profile">
                        <FaRegUser />
                        {user.displayName}
                    </div>
                    <FaSignOutAlt 
                        className="signout-icon" onClick={handleSignOut}
                        title="Sign Out"
                    />
                </div>
            </div>
        </div>
    )
}

export default SideBar;