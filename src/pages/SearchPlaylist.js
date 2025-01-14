import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import Playlist from "./Playlist";
import '../styles/SearchPlaylist.css'

function SearchPlaylist({ groups, onSelectGroup, onSearchPlaylist }) {

    const { user } = useContext(AuthContext);

    const [ searchQuery, setSearchQuery ] = useState("");

    if(!user) {
        return (
            <div>Loading ...</div>
        )
    }

    const filteredGroups = Object.entries(groups).filter(([groupId, group]) => (
       group.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    ));

    return (
        <div className="search-dashboard">
            <div className="search-bar">
                <h1>Search for a Playlist</h1>
                <input 
                    type="text"
                    placeholder="Search for a group"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="playlist-grid">
                {filteredGroups.map(([groupId, group]) => (
                    <Playlist 
                        key={groupId} 
                        groupId={groupId}
                        group={group}
                        onSelectGroup={onSelectGroup}
                        onSearchPlaylist={onSearchPlaylist}
                    />
                ))}
            </div>
        </div>
    )
}

export default SearchPlaylist;