import React from "react";
import { BsBox } from "react-icons/bs";
import { IoPlayCircleSharp } from "react-icons/io5";
import '../styles/Playlist.css';

function Playlist({ groupId, group, onSelectGroup, onSearchPlaylist }) {
    return (
        <div className="playlist-card">
            <BsBox size={150} color="white"/>
            <div className="footer">
                <div className="group-name">{group.name}</div>
                <IoPlayCircleSharp 
                    size={30} 
                    // color="white" 
                    className="play-icon"
                    onClick={() => {
                        onSelectGroup(groupId);
                        onSearchPlaylist(false);
                    }}
                />
            </div>
        </div>
    )
}

export default Playlist;