import { useState, useEffect,useContext } from "react";
import { useHistory } from "react-router-dom";
import "./loginPage.css";
import { GlobalContext } from "../GlobalContext";
import Image from './background.jpg'; // Import using relative path
import {
    addUser
  } from "../ApiService";

function SignUp() {
    const initialValues = {
        userName: "",
        firstName:"",
        lastName:"",
        email: "",
        password: "",
        confirmPassword: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [userError,setUserError] =useState("");
    const history = useHistory();
    const {setConnectedUser} = useContext(GlobalContext);

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
          
            
              // Status code is in the range 200-299 (success)
              setConnectedUser(formValues);
              console.log("add", newUser);
              history.push("/");
          } catch (error) {
              if(error.response.status == 500){
                  setUserError("change user Name")
              }
            console.error("Error adding user:", error);
          }
          

    
        // try {
        //     const newUser = await addUser(formValues);
        //     debugger
        //     if(newUser.status==500){
        //         setUserError("user name unavible")
        //     }
        //     setConnectedUser(formValues)
        //     console.log("add", newUser);
        //     history.push("/");
        // } catch (error) {
        //     console.error("Error adding user:", error);
        // }
    };
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
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.firstName) {
            errors.firstName = "First name is required!";
        }
        if (!values.lastName) {
            errors.lastName = "Lasr name is required!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Those passwords didn’t match. Try again.";
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
                    <h1>Sign Up</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">
                        <div className="field">
                            <label>UserName</label>
                            <input
                                type="text"
                                name="userName"
                                placeholder="Choose a username"
                                value={formValues.userName}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.userName}</p>
                        {userError!=="" && <p>change user name</p>}
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
                        <p>{formErrors.password}</p>
                        <div className="field">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.confirmPassword}</p>
                        <button className="singbutton">Submit</button>
                    </div>
                </form>
                <div className="text">
                    Already have an account? <span>Login</span>
                </div>
            </div>
            </div>
        </>
    );
}

export default SignUp;
