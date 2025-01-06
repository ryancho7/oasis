import React from "react";

function Dashboard({ selectedGroup, groups }) {
    if (!selectedGroup) {
        return <p>Select a group to view its contents.</p>;
    }

    const group = groups[selectedGroup];

    return (
        <div className="dashboard">
            <h2>{group.name}</h2>
            <ul>
                {group.websites.map((website) => (
                    <li key={website}>
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            {website}
                        </a>
                    </li>
                ))}
            </ul>
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
    

//     const handleCreateGroup = async () => {
//         if(!newGroup.trim()) return;

//         const groupId = uuidv4(); // unique id for group
//         const newGroupData = {
//             [groupId] : {
//                 name: newGroup,
//                 websites: [],
//             }
//         }

//         try {
//             await updateDoc(userRef, {
//                 groups: {...groups, ...newGroupData},
//             });
//             // update local state
//             setGroups((prevGroups) => ({ ...prevGroups, ...newGroupData}));
//             setNewGroup("");
//         } catch (error) {
//             console.log("Error in creating group: ", error);
//         }
//     }

//     const handleAddWebsiteToGroups = async () => {
//         if(!newWebsite.trim() || selectedGroups.length === 0) return;

//         const updatedGroups = { ...groups };

//         selectedGroups.forEach((groupId) => {
//             updatedGroups[groupId] = {
//                 ...updatedGroups[groupId],
//                 websites: [ ...updatedGroups[groupId].websites, newWebsite]
//             }
//         });

//         // update firestore
//         try {
//             await updateDoc(userRef, {
//                 groups: updatedGroups
//             });
//             // updated local state
//             setGroups(updatedGroups);
//             setNewWebsite("");
//             setSelectedGroups([]);
//         } catch (error) {
//             console.log("Error adding website to groups: ", error);
//         }
//     }

//     const handleRemoveWebsiteFromGroups = async (groupId, website) => {
//         const updatedGroup = {
//             ...groups[groupId],
//             websites: groups[groupId].websites.filter((w) => w !== website),
//         };
//         const updatedGroups = { ...groups, [groupId]: updatedGroup };
//         try {
//             await updateDoc(userRef, {
//                 groups: updatedGroups,
//             });
//             setGroups(updatedGroups);
//         } catch (error) {
//             console.log("Error in removing website: ", error);
//         }
//     }

//     const handleSignOut = async () => {
//         try {
//             setGroups({});
//             await signOut(auth);
//             navigate("/");
//             console.log("Signed out");
//         } catch (error) {
//             console.log("Error signing out: ", error);
//         }
//     }

//     if(loading) {
//         return <p>Loading ...</p>
//     }

//     if(!user) {
//         navigate("/");
//         return null;
//     }

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