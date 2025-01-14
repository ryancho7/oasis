import React, { useContext, useState } from "react";
import '../styles/Dashboard.css';
import { FaUsers } from "react-icons/fa6";
import { AuthContext } from "../AuthContext";
import { MdOutlinePlaylistRemove, MdOutlinePlaylistAdd  } from "react-icons/md";

function Dashboard({ selectedGroup, groups, handleRemoveWebsite, handleAddWebsite }) {

    const { user } = useContext(AuthContext);

    const [ websiteToAdd, setWebsiteToAdd ] = useState("");

    if(!user) {
        return (
            <p>Loading...</p>
        )
    }

    if (!selectedGroup) {
        return <p>Select a group to view its contents.</p>;
    }

    const group = groups[selectedGroup];

    const handleSubmit = () => {
        if(websiteToAdd.trim()) {
            handleAddWebsite(selectedGroup, websiteToAdd);
            setWebsiteToAdd("");
        }
    };

    return (
        <div className="dashboard">
            <h3 className="playlist-privacy">Public Playlist</h3>
            <h1 className="group-name">{group.name}</h1>
            <div className="playlist-data-bar">
                <FaUsers />
                <div className="user-name">
                    {user.displayName}
                </div>
                
                <span className="dot">•</span>
                <div className="group-size">{groups[selectedGroup].websites.length} websites, {groups[selectedGroup].websites.length*5} minutes</div>
            </div>
            <div className="headers">
                <h3 className="url">URL</h3>
                <div className="other-headers">
                    <h3>Link Category</h3>
                    <h3>Privacy</h3>
                    <h3>Options</h3>
                </div>
            </div>
            <hr className="line"/>
            <ul>
                {group.websites.map((website) => (
                    <li key={website}>
                        <div className="website-info">
                            <a href={website} target="_blank" rel="noopener noreferrer" className="link">
                                {website}
                            </a>
                            <div className="columns">
                                <p>{group.name}</p>
                                <p>Public</p>
                                <MdOutlinePlaylistRemove 
                                    className="remove-icon" 
                                    size={30}
                                    onClick={() => handleRemoveWebsite(selectedGroup, website)}/>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="add-website-bar">
                <input
                    className="add-website"
                    type="text"
                    placeholder="Add a Website"
                    value={websiteToAdd}
                    onChange={(e) => setWebsiteToAdd(e.target.value)}
                />
                <MdOutlinePlaylistAdd size={30} onClick={handleSubmit}/>
            </div>
        </div>
    );
}

export default Dashboard;