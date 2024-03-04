import { useState, useEffect,useContext } from "react";
import { useHistory } from "react-router-dom";
import "./loginPage.css";
import { GlobalContext } from "../GlobalContext";
import Image from './background.jpg'; // Import using relative path
import {
    addUser
  } from "../ApiService";

function SignUp() {
    const { connectedUser,setConnectedUser} = useContext(GlobalContext);
    const initialValues = {
        userName: connectedUser? connectedUser.userName:"",
        email: connectedUser? connectedUser.email: "",
        password: connectedUser? connectedUser.password: "",
        firstName:connectedUser? connectedUser.firstName: "",
        lastName:connectedUser? connectedUser.lastName: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const history = useHistory();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    
        try {
            const newUser = await addUser(formValues);
            setConnectedUser(formValues)
            console.log("add", newUser);
            history.push("/");
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };
    useEffect(() => {
        console.log("home")
        console.log(connectedUser)
        console.log("data set to - ")
        console.log(initialValues)
    }, [connectedUser]);
   
    useEffect(() => {
        
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors, formValues, isSubmit]);
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.userName) {
            errors.userName = "Username is required!";
        }
        if (!values.firstName) {
            errors.firstName = "First name is required!";
        }
        if (!values.lastName) {
            errors.lastName = "Lasr name is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
    
        return errors;
    };

   
   
    return (
        <>
        <div className="bgImg">
            <div className="container_login">
                {Object.keys(formErrors).length === 0 && isSubmit && (
                    <div className="ui message success">
                        Signed in successfully
                    </div>
                )  }

                <form onSubmit={handleSubmit}>
                    <h1>User Details</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">
                        <div className="field">
                            <label>Username</label>
                            <input
                                type="text"
                                name="userName"
                                placeholder="Choose a username"
                                value={formValues.userName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="name">
                            <div className="field">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="first name"
                                    value={formValues.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <p>{formErrors.firstName}</p>
                            <div className="field">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="last name"
                                    value={formValues.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <p>{formErrors.lastName}</p>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.username}</p>
                        <div className="field">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.email}</p>
                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.password}</p>
                        <button className="singbutton">update my details</button>
                    </div>
                </form>
            </div>
            </div>
        </>
    );
}

export default SignUp;
