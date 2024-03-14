import React, { useState, useEffect, useContext, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import "./loginPage.css";
import { GlobalContext } from "../GlobalContext";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {
    newfile,
    addUser,
    getAllProducts,
    getAllCategories,
} from "../ApiService";

function SignUp(): JSX.Element {
    const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
    const initialValues = {
        userName: "",
        firstName:"",
        lastName:"",
        email: "",
        password: "",
        confirmPassword: "",
        photo:"",
        googleUser:false
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [userError,setUserError] =useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const history = useHistory();
    const {connectedUser, setConnectedUser,setAllProducts, setAllCategories, allCities, setAllCities} = useContext(GlobalContext);
    useEffect(() => {    
        if(connectedUser !== undefined){ 
            fetchData();
            history.push("/products");
        } 
    }, [connectedUser]);
    async function fetchData(): Promise<void> {
        try {
            const products = await getAllProducts();
            const categories = await getAllCategories();
            const cities = (allCities == undefined || allCities.length == 0) ? await getAllCitiesInIsrael() : allCities;
            setAllProducts(products.data);
            setAllCategories(categories.data);
            setAllCities(cities);
        } catch(err) {
            console.log(err);
        }
    }
    interface City {
        name: string;
      }
      interface GoogleUser {
        access_token: string;
        // Add other properties as needed
      }
    async function getAllCitiesInIsrael() {
        try {
          const response = await axios.get('http://api.geonames.org/searchJSON?country=IL&username=liel&maxRows=100');
          // Extract the list of cities
          const israelCities: string[] = response.data.geonames.map((city: City) => city.name);
          return israelCities;
        } catch (error) {
          console.error(error);
          throw error; // Rethrow the error
        }
      }
   

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleDownload = async (): Promise<void> => {
        if (selectedFile && selectedFile!== null) {
            var guid= uuidv4();
            const fileExtension = selectedFile.name.split('.').pop();
            guid = guid + "." + fileExtension;
            formValues.photo=guid

            const formData = new FormData();
            formData.append('image', selectedFile, guid); 
            try{
                const res = await newfile(formData);
                return res
            }
            catch(error){
                console.error('Error uploading file:');
            }
          } else {
            console.error('No file selected.');
          }
      };
      const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        var preview = document.getElementById('preview') as HTMLImageElement;
        const file = event.target.files![0];
        if (file) {
            setSelectedFile(file);
            var reader = new FileReader();
    
            reader.onload = function(e) {
              preview.src = e.target!.result as string;
            };
    
            reader.readAsDataURL(file);
          } else {
            // Handle case where no file is selected
            preview.src = ""; // Clear the preview if no file is selected
          }
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        var flagError :boolean = await validate(formValues);
        if (flagError ==false){
            try {
                await handleDownload();
                setIsSubmit(true);
                const newUser = await addUser(formValues);
                localStorage.setItem("accessToken", newUser.headers.authorization);
                localStorage.setItem("refreshToken", newUser.headers.refreshtoken);
                localStorage.setItem('user', JSON.stringify(newUser.data));
                setConnectedUser(formValues);
                history.push("/products");
              } catch (error: any) {
                  if(error.response.status === 500){
                      setUserError("change user Name")
                  }
                console.error("Error adding user:", error);
              }            
        }
        
    };
    const handleClickLogin = () => {
        history.push('/');
      };

    const validate = (values: typeof initialValues): boolean => {
        let flag: boolean = false;
        const errors: {[key: string]: string} = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.userName) {
            errors.userName = "Username is required!";
            flag=true;
        }
        if (!values.email) {
            errors.email = "Email is required!";
            flag=true;
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
            flag=true;
        }
        if (!values.firstName) {
            errors.firstName = "First name is required!";
            flag=true;
        }
        if (!values.lastName) {
            errors.lastName = "Last name is required!";
            flag=true;
        }
        if (!values.password) {
            errors.password = "Password is required";
            flag=true;
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
            flag=true;
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Those passwords didn’t match. Try again.";
            flag=true;
        }
        setFormErrors(errors);
        return flag;
    };

    // function login(){
    //     useGoogleLogin({
    //         onSuccess: (codeResponse: any) => setGoogleUser(codeResponse),
    //         onError: (error) => console.log('Login Failed:', error)
    //     });
    // }

    // useEffect(() => {
    //     const fetchData = async (): Promise<void> => {
    //       try {
    //         if (googleUser !==null) {
    //           const response = await axios.get(
    //             `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
    //             {
    //               headers: {
    //                 Authorization: `Bearer ${googleUser?.access_token}`,
    //                 Accept: 'application/json'
    //               }
    //             }
    //           );
      
    //           if (response.data) {
    //             formValues.userName = response.data.email;
    //             formValues.firstName = response.data.given_name;
    //             formValues.lastName = response.data.family_name;
    //             formValues.email = response.data.email;
    //             formValues.password = response.data.email;
    //             formValues.confirmPassword = response.data.email;
    //             formValues.googleUser = true;
      
    //             const newUser = await addUser(formValues);
    //             setConnectedUser(formValues);
    //             console.log("add", newUser);
    //             history.push("/");
    //           }
    //         }
    //       } catch (error) {
    //         console.error("Error adding user:", error);
    //       }
    //     };
      
    //     fetchData();
      
    //   }, [googleUser]);
      
    


    return (
        <>
        <div className="bgImg">
            <div className="container_signup">
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
                        <img id="preview" src="" alt="Image Preview" style={{maxWidth: 200, maxHeight: 200}}></img>
                        {selectedFile!== null && <label>{selectedFile.name}</label>}
                        </div>
                        <p>{formErrors.confirmPassword}</p>
                        <button className="singbutton">Submit</button>
                    </div>
                </form>
                {/* <button onClick={login}>Sign in with Google 🚀 </button> */}
                <div className="text">
                    Already have an account? <span  onClick={handleClickLogin}>Login</span>
                </div>
            </div>
            </div>
        </>
    );
}

export default SignUp;
