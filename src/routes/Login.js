import { Form } from "react-router-dom";

import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import logo from "../images/logo.png"

import "../styles/Login.css";

export function Login({ setIsLoggedIn }) {
    return (
        <>

            <div className="background-container">
            </div>
            <div className="content-container">

                <div className="container">
                    <div className="leftContainer">
                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                        <h3>Welcome back!</h3>
                        <p>What's up Saran Singh aka KERALA GUY</p>
                    </div>
                    <div className="signInContainer">             
                        <Form>
                            <h2>Sign in</h2>
                            <div className="inputField">
                                <PersonIcon />
                                <input type="text" placeholder="Username" required />

                            </div>
                            <div className="passwordField">
                                <KeyIcon />
                                <input type="password" placeholder="Password" required />
                            </div>
                            <button>Sign In</button>
                        </Form>
                    </div>
                </div>
                {/* <div className="footer">

                    <p>"Empowering a Sustainable Tomorrow: Our Smart Waste Management Solution, where Innovation Meets Responsibility. Seamlessly Connecting Communities and Businesses to Effortlessly Manage, Monitor, and Minimize Waste. Together, Let's Build a Greener, Cleaner Future, One Smart Bin at a Time."</p>
                </div> */}
            </div>
        </>

    )

}


