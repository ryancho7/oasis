import React from "react";
import '../styles/Sidebar.css';

function SideBar({ groups, selectedGroup, onSelectGroup}) {

    return (
        <div className="sidebar">
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
        </div>
    )
}

export default SideBar;