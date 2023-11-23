import { Form } from "react-router-dom";
import { useEffect, useState } from "react";

import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import logo from "../images/logo.png"

import "../styles/Login.css";
import { Button } from "./Button";



export function Login({ setIsLoggedIn }) {
    const [error, setError] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [check, setCheck] = useState(false);

    //Handles login process
    function handleSignIn(e) {
        e.preventDefault();

        if (userName !== "" && password !== "") {

            if (userName === "admin" && password === "password") {

                // Store login state in localStorage
                localStorage.setItem("isLoggedIn", "true");
                if (check) {
                    localStorage.setItem("userName", userName);
                    localStorage.setItem("password", password);
                } else {
                    localStorage.removeItem("userName", userName);
                    localStorage.removeItem("password", password);
                }
                setIsLoggedIn(true);

            } else {
                setError("Username and password do not match");
            }
        } else {
            setError("Username or password field is empty");
        }
    }

    useEffect(() => {
        // Check if username is already in localStorage
        const storedUserName = localStorage.getItem("userName");
        const storedPassword = localStorage.getItem("password");
        const storedCheckMark = localStorage.getItem("checked");
        if (storedCheckMark && storedUserName && storedPassword) {
            setUserName(storedUserName);
            setPassword(storedPassword);
            setCheck(storedCheckMark);
        }
    }, []);


    //hanlde checkbox
    function handleCheckbox(e) {

        setCheck(e.target.checked);
        localStorage.setItem("checked", (e.target.checked));
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
                                    <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />

                                </div>
                                <div className="passwordField">
                                    <KeyIcon />
                                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="checkbox"><input type="checkbox" checked={Boolean(check)} onChange={(e) => handleCheckbox(e)} />Remember me</div>
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



