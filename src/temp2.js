import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './Home.css';

// ... (previous imports)

function Main() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const logout = async () => {
        await signOut(auth);
        navigate("/");
    }

    const [age, setAge] = useState("");
    const [username, setUserName] = useState("");
    const [country, setCountry] = useState("");
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editMode, setEditMode] = useState(false); // Add edit mode state
    const [editableUser, setEditableUser] = useState({}); // User data for editing

    useEffect(() => {
        setIsLoading(true);

        fetchUserData()
            .then(() => {
                setIsLoading(false);
            });
    }, [user]);

    const fetchUserData = async () => {
        if (user) {
            const userUid = user.uid;
            const collectionRef = collection(db, "users");
            const q = query(collectionRef, where("uid", "==", userUid));

            try {
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setUserData([]);
                } else {
                    const userData = querySnapshot.docs.map((doc) => {
                        const data = doc.data();
                        return { ...data, id: doc.id };
                    });
                    setUserData(userData);
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
    };

    const addUserInfo = async (e) => {
        e.preventDefault();

        try {
            const user = auth.currentUser;
            if (!user) {
                console.error("User is not authenticated");
                return;
            }

            const userData = {
                age: age,
                username: username,
                country: country,
                uid: user.uid,
            };

            const userDocRef = doc(db, "users", user.uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                await setDoc(userDocRef, userData, { merge: true });
                console.log("Document updated with ID: ", user.uid);
            } else {
                await setDoc(userDocRef, userData);
                console.log("Document created with ID: ", user.uid);
            }
            toast.success('Successfully Added/Updated User Info!')
            fetchUserData();
            setEditMode(false); // Exit edit mode after submission
        } catch (e) {
            console.error("Error adding/updating document: ", e);
        }
    };

    const enterEditMode = () => {
        setEditableUser(userData[0]); // Set the user data for editing
        setEditMode(true); // Enter edit mode
    };

    const cancelEditMode = () => {
        setEditMode(false); // Cancel edit mode
    };

    return (
        <>
            <main>
                <Toaster />
                <section className="header">
                    <img src={logo} alt="Logo" />
                    <ul className="nav">
                        {user ? (
                            <>
                                <li>{user.displayName}</li>
                                <li className='signin' onClick={logout}>Logout</li>
                            </>
                        ) : ("")}
                    </ul>
                </section>
                <section className="form-container">
                    <h1 className="form-heading">Welcome</h1>
                    {isLoading ? (
                        <div className="loader">
                            Loading...
                        </div>
                    ) : (
                        userData.length > 0 ? (
                            <div className="submitted-data" key={userData[0].id}>
                                <p><strong>Username:</strong>&nbsp; {userData[0].username}</p>
                                <p><strong>Country:</strong>&nbsp; {userData[0].country}</p>
                                <p><strong>Age:</strong> &nbsp;{userData[0].age}</p>
                                <button
                                    className="edit-button"
                                    onClick={enterEditMode}
                                >
                                    Edit Account
                                </button>
                            </div>
                        ) : (
                            editMode ? (
                                <form className="myForm">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            className="input-field"
                                            placeholder="Enter Username"
                                            value={editableUser.username}
                                            onChange={(e) => setEditableUser({ ...editableUser, username: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            className="input-field"
                                            placeholder="Enter Country"
                                            value={editableUser.country}
                                            onChange={(e) => setEditableUser({ ...editableUser, country: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="age"
                                            name="age"
                                            className="input-field"
                                            placeholder="Enter Age"
                                            value={editableUser.age}
                                            onChange={(e) => setEditableUser({ ...editableUser, age: e.target.value })}
                                        />
                                    </div>
                                    <button type="button" className="submit-button" onClick={cancelEditMode}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="submit-button" onClick={addUserInfo}>
                                        Save
                                    </button>
                                </form>
                            ) : (
                                <button
                                    className="edit-button"
                                    onClick={() => setEditMode(true)}
                                >
                                    Edit Account
                                </button>
                            )
                        )
                    )}
                </section>
                {/* ... (rest of your component) */}
            </main>
        </>
    );
}

export default Main;
