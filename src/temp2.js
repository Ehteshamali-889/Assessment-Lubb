import React from 'react';
import Header from './components/Header';
import Intro from './components/Intro';
import './App.css';
import Features from './components/Features';
import Highlight from './components/Highlight';

function App() {
  return (
    <>
      <main>
        <section className="header">
          <img src={require("./images/logo.svg")} alt="Logo" />
          <ul className="nav">
            <li>Features</li>
            <li>Team</li>
            <li>Sign In</li>
          </ul>
        </section>
        <section className="intro">
          <img src={require("./images/illustration-intro.png")} alt="Intro Illustration" />
          <h1 className="introheading">All your files in one secure location, accessible anywhere.</h1>
          <p className="introdesc">Fylo stores all your most important files in one secure location. Access them wherever 
            you need, share and collaborate with friends, family, and co-workers.</p>
          <button className="btnget">Get Started</button>
        </section>
        <section className="highlight">
          {/* Add content for the Highlight section */}
        </section>
        <section className="under">
          <section className="features">
            {/* Add content for the Features section */}
          </section>
        </section>
        <section className="productive">
          <img src={require("./images/illustration-stay-productive.png")} alt="Stay Productive" className="productiveimg" />
          <section className="secondproductive">
            <h1 className="productiveheading">
              Stay productive, wherever you are
            </h1>
            <p className="firstpara">Never let location be an issue when accessing your files. Fylo has you covered for all of your file 
              storage needs.</p>
            <p className="firstpara">Securely share files and folders with friends, family and colleagues for live collaboration. No email 
              attachments required.</p>
            <button className="workbtn">See how Fylo works <img src={require("./images/icon-arrow.svg")} alt="Arrow" /> </button>
          </section>
        </section>
        <section className="testimonials">
          {/* Add content for the Testimonials section */}
        </section>
      </main>
    </>
  );
}

export default App;
