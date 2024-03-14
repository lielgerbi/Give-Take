import React, { useState, useEffect, useContext, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import "./loginPage.css";
import { GlobalContext } from "../GlobalContext";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import {
    newfile,
    updateUser
} from "../ApiService";

function HomePage(): JSX.Element {
    const { connectedUser, setConnectedUser } = useContext(GlobalContext);
    const storedUser = localStorage.getItem('user');
    const user = connectedUser && connectedUser._id ? connectedUser : JSON.parse(storedUser!);
    const initialValues = {
        userName: user.userName,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        photo: user.photo
    };
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [isSubmit, setIsSubmit] = useState(false);
    const history = useHistory();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    useEffect(() => {
        var preview = document.getElementById('preview') as HTMLImageElement;
        if (user.photo) {
            preview.src = process.env.REACT_APP_API_URL + '/' + user.photo;
        } else {
            preview.src = ""; // Clear the preview if no file is selected
        }

    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        handleDownload();
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

        try {
            const newUser = await updateUser(formValues);
            setConnectedUser(newUser.data);
            history.push("/products");
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const validate = (values: typeof initialValues): { [key: string]: string } => {
        const errors: { [key: string]: string } = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.userName) {
            errors.userName = "Username is required!";
        }
        if (!values.firstName) {
            errors.firstName = "First name is required!";
        }
        if (!values.lastName) {
            errors.lastName = "Last name is required!";
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

    const handleDownload = async (): Promise<void> => {
        if (selectedFile) {
            var guid = uuidv4();
            const fileExtension = selectedFile.name.split('.').pop();
            guid = guid + "." + fileExtension!;
            formValues.photo = guid;

            const formData = new FormData();
            formData.append('image', selectedFile, guid);

            try {
                const res = await newfile(formData);
                return res;
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.error('No file selected.');
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        var preview = document.getElementById('preview') as HTMLImageElement;
        const file = event.target.files![0];
        setSelectedFile(file);
        if (file) {
            var reader = new FileReader();

            reader.onload = function(e) {
                preview.src = e.target!.result as string;
            };

            reader.readAsDataURL(file);
        } else {
            preview.src = ""; // Clear the preview if no file is selected
        }
    };

    return (
        <>
            <div className="bgImg">
                <div className="container_login">
                    {Object.keys(formErrors).length === 0 && isSubmit && (
                        <div className="ui message success">
                            Signed in successfully
                        </div>
                    )}

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
                                {selectedFile !== null && <label>{selectedFile.name}</label>}
                            </div>
                            <button className="singbutton">update my details</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default HomePage;




// import { useState, useEffect,useContext } from "react";
// import { useHistory } from "react-router-dom";
// import "./loginPage.css";
// import { GlobalContext } from "../GlobalContext";
// import { v4 as uuidv4 } from 'uuid';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUpload } from '@fortawesome/free-solid-svg-icons';
// import {
//     newfile,
//     updateUser
//   } from "../ApiService";

// function HomePage() {
//     const { connectedUser,setConnectedUser} = useContext(GlobalContext);
//     const storedUser = localStorage.getItem('user');
//     const user = connectedUser && connectedUser._id ?connectedUser: JSON.parse(storedUser)
//     const initialValues = {
//         userName: user.userName,
//         email: user.email,
//         password: user.password,
//         firstName:user.firstName,
//         lastName:user.lastName,
//         photo : user.photo
//     };
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [formValues, setFormValues] = useState(initialValues);
//     const [formErrors, setFormErrors] = useState({});
//     const [isSubmit, setIsSubmit] = useState(false);
//     const history = useHistory();
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues({ ...formValues, [name]: value });
//     };
//     useEffect(() => {
//         var preview = document.getElementById('preview');
//         if (user.photo) {
//             preview.src = process.env.REACT_APP_API_URL+'/'+user.photo;
//           } else {
//             // Handle case where no file is selected
//             preview.src = ""; // Clear the preview if no file is selected
//           }

//     }, []);

//     const handleSubmit = async (e) => {
//          handleDownload();
//         e.preventDefault();
//         setFormErrors(validate(formValues));
//         setIsSubmit(true);
    
//         try {
//             const newUser = await updateUser(formValues);
//             setConnectedUser(newUser.data)
//             history.push("/landing");
//         } catch (error) {
//             console.error("Error adding user:", error);
//         }
//     };
    
//     const validate = (values) => {
//         const errors = {};
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//         if (!values.userName) {
//             errors.userName = "Username is required!";
//         }
//         if (!values.firstName) {
//             errors.firstName = "First name is required!";
//         }
//         if (!values.lastName) {
//             errors.lastName = "Lasr name is required!";
//         }
//         if (!values.email) {
//             errors.email = "Email is required!";
//         } else if (!regex.test(values.email)) {
//             errors.email = "This is not a valid email format!";
//         }
//         if (!values.password) {
//             errors.password = "Password is required";
//         } else if (values.password.length < 4) {
//             errors.password = "Password must be more than 4 characters";
//         } else if (values.password.length > 10) {
//             errors.password = "Password cannot exceed more than 10 characters";
//         }
    
//         return errors;
//     };

   
//    function editPost(){
//     history.push("/myPost");

//    }

//    const handleDownload = async () => {
//     if (selectedFile) {
//         var guid= uuidv4();
//         const fileExtension = selectedFile.name.split('.').pop();
//         guid = guid + "." + fileExtension;
//         formValues.photo=guid;

//         //const fileName =formValues.photo;
//         const formData = new FormData();
//         formData.append('image', selectedFile, guid); 
    
//         try{
//             const res = await newfile(formData);
//             return res
//         }
//         catch(error){
//             console.error('Error uploading file:');
//         }
//       } else {
//         console.error('No file selected.');
//       }
//   };
//   const handleFileChange = (event) => {
//     var preview = document.getElementById('preview');
//     const file = event.target.files[0];
//     setSelectedFile(file);
//     if (file) {
//         var reader = new FileReader();

//         reader.onload = function(e) {
//           preview.src = e.target.result;
//         };

//         reader.readAsDataURL(file);
//       } else {
//         // Handle case where no file is selected
//         preview.src = ""; // Clear the preview if no file is selected
//       }
// };
//     return (
//         <>
//         <div className="bgImg">
//             <div className="container_login">
//                 {Object.keys(formErrors).length === 0 && isSubmit && (
//                     <div className="ui message success">
//                         Signed in successfully
//                     </div>
//                 )  }

//                 <form onSubmit={handleSubmit}>
//                     <h1>User Details</h1>
//                     <div className="ui divider"></div>
//                     <div className="ui form">
//                         <div className="field">
//                             <label>Username</label>
//                             <input
//                                 type="text"
//                                 name="userName"
//                                 placeholder="Choose a username"
//                                 value={formValues.userName}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="name">
//                             <div className="field">
//                                 <label>First Name</label>
//                                 <input
//                                     type="text"
//                                     name="firstName"
//                                     placeholder="first name"
//                                     value={formValues.firstName}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <p>{formErrors.firstName}</p>
//                             <div className="field">
//                                 <label>Last Name</label>
//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     placeholder="last name"
//                                     value={formValues.lastName}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <p>{formErrors.lastName}</p>
//                         </div>
//                         <div className="field">
//                             <label>Password</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Password"
//                                 value={formValues.password}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <p>{formErrors.username}</p>
//                         <div className="field">
//                             <label>Email</label>
//                             <input
//                                 type="text"
//                                 name="email"
//                                 placeholder="Email"
//                                 value={formValues.email}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <p>{formErrors.email}</p>
//                         <div className="field">
//                             <label>Password</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Password"
//                                 value={formValues.password}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <p>{formErrors.password}</p>
//                         <div className="image-uploader-container">
//                         <label className="file-input-label">
//                             <input
//                             type="file"
//                             onChange={handleFileChange}
//                             className="file-input"
//                             />
//                             <FontAwesomeIcon icon={faUpload} className="upload-icon" />
//                             Choose File
//                         </label>
//                         <img id="preview" src="" alt="Image Preview"style={{maxWidth: 200,  maxheight: 200}}></img>
//                         {selectedFile!== null && <label>{selectedFile.name}</label>}
//                         </div>
//                         <button className="singbutton">update my details</button>
//                     </div>
//                 </form>
//                 <button onClick={() => editPost()}>edit my posts</button>

//             </div>
//             </div>
//         </>
//     );
// }

// export default HomePage;
