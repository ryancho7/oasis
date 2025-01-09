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
            <ul>
                {group.websites.map((website) => (
                    <li key={website}>
                        <div className="website-info">
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {website}
                            </a>
                            <p>{group.name}</p>
                            <p>Public</p>
                            <MdOutlinePlaylistRemove 
                                className="remove-icon" 
                                size={30}
                                onClick={() => handleRemoveWebsite(selectedGroup, website)}/>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="add-website-bar">
                <input
                    type="text"
                    placeholder="Add a Website"
                    value={websiteToAdd}
                    onChange={(e) => setWebsiteToAdd(e.target.value)}
                />
                <MdOutlinePlaylistAdd size={30} onClick={() => handleAddWebsite(selectedGroup, websiteToAdd)}/>
            </div>
        </div>
    );
}

export default Dashboard;


// import { signOut } from "firebase/auth";
// import { auth, db } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../AuthContext";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { v4 as uuidv4 } from "uuid";

// function Dashboard() {

//     const { user, loading } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const userRef = user ? doc(db, "users", user.uid) : null;

//     const [ groups, setGroups ] = useState({});
//     const [ newGroup, setNewGroup ] = useState("");
//     const [ selectedGroups, setSelectedGroups ] = useState([]);
//     const [ newWebsite, setNewWebsite ] = useState("");

//     useEffect(() => {
//         const fetchGroups = async () => {
//             if (user) {
//                 try {
//                     const userSnap = await getDoc(userRef);
//                     if (userSnap.exists()) {
//                         const userData = userSnap.data();
//                         setGroups(userData.groups || {});
//                     }
//                 } catch (error) {
//                     console.error("Error fetching groups: ", error);
//                 }
//             }
//         };
    
//         fetchGroups();
//     }, [userRef, user]);
    



//     return (
//         <div>
//             <h1>Welcome {user.displayName}</h1>
//             <p>Email: {user.email}</p>
//             <button onClick={handleSignOut}>Sign Out</button>

//             <h2>Your Groups</h2>

//             <div>
//                 <input
//                     type="text"
//                     value={newGroup}
//                     onChange={(e) => setNewGroup(e.target.value)}
//                 />
//                 <button onClick={handleCreateGroup}>Create New Group</button>
//             </div>

//             {Object.keys(groups).map((groupId) => (
//                 <div key={groupId}>
//                     <h3>{groups[groupId].name}</h3>
//                     <ul>
//                         {groups[groupId].websites.map((website) => (
//                             <li key={website}>
//                                 <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
//                                 <button onClick={() => handleRemoveWebsiteFromGroups(groupId, website)}>Remove</button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}

//             <div>
//                 <select 
//                     multiple={true} 
//                     value={selectedGroups}
//                     onChange={(e) => setSelectedGroups(Array.from(e.target.selectedOptions, (option) => option.value))}
//                 >
//                     {Object.keys(groups).map((groupId) => (
//                         <option key={groupId} value={groupId}>
//                             {groups[groupId].name}
//                         </option>
//                     ))}
//                 </select>
//                 <input 
//                     type="text"
//                     value={newWebsite}
//                     onChange={(e) => setNewWebsite(e.target.value)}
//                 />
//                 <button onClick={handleAddWebsiteToGroups}>Add Website</button>
//             </div>
//         </div>
//     )
// }

// export default Dashboard;