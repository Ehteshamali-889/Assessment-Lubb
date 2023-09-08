import React, { useEffect, useState } from 'react'

import './Home.css';

import logo from '../images/logo.svg';
import illustration from '../images/illustration-intro.png';
import access from '../images/icon-access-anywhere.svg';
import security from '../images/icon-security.svg';
import collab from '../images/icon-collaboration.svg';
import file from '../images/icon-any-file.svg';

import productive from '../images/illustration-stay-productive.png';
import arrow from '../images/icon-arrow.svg';

import location from '../images/icon-location.svg';
import phone from '../images/icon-phone.svg';
import email from '../images/icon-email.svg';


import fb from '../images/facebook.png';
import twitter from '../images/twitter.png';
import insta from '../images/instagram.png';


import quote from '../images/bg-quotes.png';
import profile1 from '../images/profile-1.jpg';
import profile2 from '../images/profile-2.jpg';
import profile3 from '../images/profile-3.jpg';

import { auth, provider, db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { collection, addDoc, getDocs, where, query } from "firebase/firestore";

function Main() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const logout = async () => {
        await signOut(auth);
        navigate("/");
    }

    const [age, setAge] = useState("")
    const [username, setUserName] = useState("")
    const [country, setCountry] = useState("")
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState(null); // To store the submitted data

    const addTodo = async (e) => {
        e.preventDefault();

        try {
            const user = auth.currentUser; // Assuming you have an authentication system set up
            if (!user) {
                console.error("User is not authenticated");
                return;
            }

            const userData = {
                age: age,
                username: username,
                country: country,
                uid: user.uid, // Add the user's UID to the document data
            };

            const docRef = await addDoc(collection(db, "users"), userData);
            console.log("Document written with ID: ", docRef.id);

            // Store the submitted data and set the form submission flag to true
            setSubmittedData(userData);
            setIsFormSubmitted(true); // Set isFormSubmitted to true after successful submission
            fetchPost();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };



    const [userData, setUserData] = useState(null);

    const fetchPost = async () => {
        const user = auth.currentUser;
        console.log("user", user);

        if (user) {
            const userUid = user.uid;
            console.log('userid', userUid);

            const collectionRef = collection(db, "users");
            console.log("collectionRef", collectionRef);

            // Create a query that filters documents by the user's UID
            const q = query(collectionRef, where("uid", "==", userUid));

            try {
                const querySnapshot = await getDocs(q);
                console.log("queryout", querySnapshot);

                const userData = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return { ...data, id: doc.id };
                });

                console.log("User Data:", userData);

                // Update your state or do something with the user's data
                setUserData(userData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
    };














    return (
        <>
            <main>
                <section className="header">
                    <img src={logo} alt="Logo" />
                    <ul className="nav">
                        {user ? (
                            <>
                                <li>{user.displayName}</li>
                                {/* <li>{user.email}</li> */}
                                <li className='signin' onClick={logout}>Logout</li>
                            </>

                        ) : ("")}

                    </ul>
                </section>
                <section className="form-container">
                    <h1 className="form-heading">Welcome</h1>

                    {/* Conditionally render the form or the submitted data */}
                    {!isFormSubmitted ? (
                        <form className="myForm">
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="input-field"
                                    placeholder="Enter Username"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    className="input-field"
                                    placeholder="Enter Country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="age"
                                    name="age"
                                    className="input-field"
                                    placeholder="Enter Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="submit-button" onClick={addTodo}>
                                Submit
                            </button>
                        </form>
                    ) : (
                        ""

                    )}
                    {userData ? (
                        userData.map((user) => (
                            <div className="submitted-data" key={user.id}>
                                <p><strong>Username:</strong>&nbsp; {user.username}</p>
                                <p><strong>Country:</strong>&nbsp; {user.country}</p>
                                <p><strong>Age:</strong> &nbsp;{user.age}</p>
                            </div>
                        ))
                    ) : (
                        <p>No user data available.</p>
                    )}

                </section>





                <section className="footer">
                    <section>
                        <img src={logo} alt="Logo" className="footericon" />
                        <section className="footerbottom">
                            <section className="location">
                                <img src={location} alt="Location Icon" className="locationicon" />
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                    dolore magna aliqua
                                </p>
                            </section>
                            <section className="infohub">
                                <section className="info">
                                    <img src={phone} alt="Phone Icon" className="infoicon" />
                                    <p>+1-543-123-4567</p>
                                </section>
                                <section className="info secondinfo">
                                    <img src={email} alt="Email Icon" className="infoicon" />
                                    <p>example@fylo.com</p>
                                </section>
                            </section>
                            <section className="navmenu">
                                <ul>
                                    <li className="navitembottom">About Us</li>
                                    <li className="navitembottom">Jobs</li>
                                    <li className="navitembottom">Press</li>
                                    <li className="navitembottom">Blog</li>
                                </ul>
                            </section>
                            <section className="navmenu secondnavmenu">
                                <ul>
                                    <li className="navitembottom">Contact Us</li>
                                    <li className="navitembottom">Terms</li>
                                    <li className="navitembottom">Privacy</li>
                                </ul>
                            </section>
                            <section className="sociallinks">
                                <img alt="Facebook" src={fb} className="icons" />
                                <img alt="Twitter" src={twitter} className="icons" />
                                <img alt="Instagram" src={insta} className="icons" />
                            </section>
                        </section>
                    </section>
                </section>
            </main>
        </>
    )
}

export default Main