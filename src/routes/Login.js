
import { useEffect, useState } from "react";

import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import logo from "../images/logo.png"

import "../styles/Login.css";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/LoginAuthContext";
import { Spinner } from "../components/Spinner";


export function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [check, setCheck] = useState(false);
    const navigate = useNavigate();

    const {updateAuthInfo} = useAuth();

    //function to extract data from jwt token
    function extractDataFromJWT(token) {
        const [, payloadBase64] = token.split('.');
        const payloadString = atob(payloadBase64); // Decodes Base64
        const payload = JSON.parse(payloadString);
        return payload;
    }

    //Handles login process
    async function handleSignIn(e) {
        e.preventDefault();
        setIsLoading(true);

        if (userName && password) {
                try {

                    const res = await fetch("https://garbage-backend-service-kq2hras2oq-ey.a.run.app/users/authenticate", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({username: userName, password: password}),
                    });
                    if (!res.ok) {
                        throw new Error("Username and password do not match")
                    }
                    const data = await res.json();
                    
                
                    //extract username and role from jwt token
                    const jwtToken = data.token;
                    const extractedData = extractDataFromJWT(jwtToken);
            
                    // Update the user context with the token, username, and role
                    updateAuthInfo(data.token, extractedData.username, extractedData.role);
                    console.log(extractedData.role);
                    
                    
                    
                    navigate("/overview");

                    // Store login credentials in localStorage
                    if (check) {
                        localStorage.setItem("userName", userName);
                        localStorage.setItem("password", password);
                    } else {
                        localStorage.removeItem("userName", userName);
                        localStorage.removeItem("password", password);
                    }

                } catch (err) {
                    setError(err.message)
                } finally {
                    setIsLoading(false);
                }
            
        } else {
            setError("Username or password field is empty");
            setIsLoading(false);
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
        isLoading ? <Spinner /> :
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
                            <form onSubmit={(e) => handleSignIn(e)}>
                                <h2>Sign in</h2>
                                <div className="inputField">
                                    <PersonIcon data-testid="person-icon" />
                                    <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />

                                </div>
                                <div className="passwordField">
                                    <KeyIcon data-testid="key-icon" />
                                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="checkbox"><input type="checkbox" checked={Boolean(check)} onChange={(e) => handleCheckbox(e)} />Remember me</div>
                                <Button onClick={(e) => handleSignIn(e)} className="signIn">Sign In</Button>
                                <div className="errorMessage" data-testid="error-message">{error}</div>
                            </form>
                        </div>
                    </div>

                    <div className="header">

                        <h1>"Smart Waste Management Solution"</h1>
                    </div>
                    <div className="footer">
                        <h3>Smart waste bins are equipped with advanced sensors that detect fill levels and notify collection services in real-time. This optimizes collection routes, reducing fuel consumption and minimizing unnecessary pickups.</h3>
                    </div>
                </div>
            </div>
        </>
    )
}



