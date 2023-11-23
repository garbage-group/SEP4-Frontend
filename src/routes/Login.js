import { Form } from "react-router-dom";
import { useEffect, useState } from "react";

import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import logo from "../images/logo.png"

import "../styles/Login.css";
import { Button } from "../components/Button";
import { Password } from "@mui/icons-material";



export function Login({ setIsLoggedIn }) {
    const [error, setError] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // Check if user is already logged in from localStorage
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
        if (storedIsLoggedIn === "true") {
            setIsLoggedIn(true);
        }
    }, [setIsLoggedIn]);

    //Handles login process
    function handleSignIn(e) {
        e.preventDefault();

        if(userName !== "" && password !== ""){

            if(userName === "admin" && password === "password"){
                setIsLoggedIn(true);
                // Store login state in localStorage
                localStorage.setItem("isLoggedIn", "true");
            } else {
                setError("Username and password do not match");
            }
        } else {
            setError("Username or password field is empty");
        }
    }

    return (
        <>
            <div className="page-container">

                <div className="background-container">
                </div>
                <div className="content-container">

                    <div className="container">
                        <div className="leftContainer">
                            <div>
                                <img src={logo} alt="logo" />
                            </div>
                            <h3>Welcome back!</h3>
                            <h5>Smart Waste Management system</h5>
                            <p>Waste & material traceability solution for sustainable facilities</p>
                        </div>
                        <div className="signInContainer">
                            <Form onSubmit={(e) => handleSignIn(e)}>
                                <h2>Sign in</h2>
                                <div className="inputField">
                                    <PersonIcon />
                                    <input type="text" placeholder="Username" required onChange={(e) => setUserName(e.target.value)}/>

                                </div>
                                <div className="passwordField">
                                    <KeyIcon />
                                    <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <Button onClick={(e) => handleSignIn(e)} className="signIn">Sign In</Button>
                                <div className="errorMessage">{error}</div>
                            </Form>
                        </div>
                    </div>
                    {/* <div className="footer">

                    <p>"Empowering a Sustainable Tomorrow: Our Smart Waste Management Solution, where Innovation Meets Responsibility. Seamlessly Connecting Communities and Businesses to Effortlessly Manage, Monitor, and Minimize Waste. Together, Let's Build a Greener, Cleaner Future, One Smart Bin at a Time."</p>
                </div> */}
                </div>
            </div>
        </>

    )

}

