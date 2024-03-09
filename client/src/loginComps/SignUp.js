import { useState, useEffect,useContext } from "react";
import { useHistory } from "react-router-dom";
import "./loginPage.css";
import { GlobalContext } from "../GlobalContext";
import { v4 as uuidv4 } from 'uuid';
import Image from './background.jpg'; // Import using relative path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import {
    newfile,
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
        photo:""
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [userError,setUserError] =useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const history = useHistory();
    const {setConnectedUser} = useContext(GlobalContext);
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleDownload = async () => {
        if (selectedFile) {
            var guid= uuidv4();
            const fileExtension = selectedFile.name.split('.').pop();
            guid = guid + "." + fileExtension;
            formValues.photo=guid

            //const fileName =formValues.photo;
            const formData = new FormData();
            formData.append('image', selectedFile, guid); 
            for (var key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }
            try{
                 const res = await newfile(formData)
                console.log('File uploaded. Server response:');
                return res
            }
            catch(error){
                console.error('Error uploading file:');
            }
          } else {
            console.error('No file selected.');
          }
      };
      const handleFileChange = (event) => {
        var preview = document.getElementById('preview');
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            var reader = new FileReader();
    
            reader.onload = function(e) {
              preview.src = e.target.result;
            };
    
            reader.readAsDataURL(file);
          } else {
            // Handle case where no file is selected
            preview.src = ""; // Clear the preview if no file is selected
          }
    };
    const handleSubmit = async (e) => {
        handleDownload();
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        try {
            const newUser = await addUser(formValues);
              setConnectedUser(formValues);
              console.log("add", newUser);
              history.push("/");
          } catch (error) {
              if(error.response.status == 500){
                  setUserError("change user Name")
              }
            console.error("Error adding user:", error);
          }
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
                        <div className="image-uploader-container">
                        <label className="file-input-label">
                            <input
                            type="file"
                            onChange={handleFileChange}
                            className="file-input"
                            />
                            <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                            Choose File
                        </label>
                        <img id="preview" src="" alt="Image Preview"style={{maxWidth: 200,  maxheight: 200}}></img>
                        {selectedFile!== null && <label>{selectedFile.name}</label>}
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
