import React, { useState } from 'react'

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

import { auth, provider,db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { collection, addDoc } from "firebase/firestore";
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


    const addTodo = async (e) => {
        e.preventDefault();  
       
        try {
            const docRef = await addDoc(collection(db, "users"), {
              age: age,    
              username: username,
              country: country,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }




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
                {/* <section className="todo-container">
                    <div className="todo">
                        <h1 className="header">
                            Todo-App
                        </h1>

                        <div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="What do you have to do today?"
                                    onChange={(e) => setTodo(e.target.value)}
                                />
                            </div>

                            <div className="btn-container">
                                <button
                                    type="submit"
                                    className="btn"
                                    onClick={addTodo}
                                >
                                    Submit
                                </button>
                            </div>

                        </div>

                        <div className="todo-content">
                            ...
                        </div>
                    </div>
                </section> */}
                <section className="form-container">
                    <h1 className="form-heading">Welcome</h1>
                    <form className="myForm">
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
                        <button type="submit" className="submit-button" onClick={addTodo}>
                            Submit
                        </button>
                    </form>
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