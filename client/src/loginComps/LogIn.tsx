import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import "./loginPage.css";
import {
    findUser,
    getAllProducts,
    getAllCategories,
} from "../ApiService";
import axios from 'axios';

interface FormValues {
    userName: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    confirmPassword?: string;
    googleUser: boolean;
}

function LogIn(): JSX.Element {
  const history = useHistory();
    const initialValues: FormValues = {
        userName: "",
        password: "",
        googleUser: false
    };
    const [ googleUser, setGoogleUser ] = useState<boolean>();;
    // const [ profile, setProfile ] = useState<any[]>([]);
    const [formValues, setFormValues] = useState<FormValues>(initialValues);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [userNotExist , setUserNotExist] = useState<boolean>(false);
    const { connectedUser, setConnectedUser, setAllProducts, setAllCategories, allCities, setAllCities } = useContext(GlobalContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    useEffect(() => {
        if(connectedUser !== undefined){ 
            fetchData();
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
            history.push("landing");
        } catch(err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        try {
            const user = await findUser(formValues.userName, formValues.password);
            localStorage.setItem("accessToken", user.headers.authorization);
            localStorage.setItem("refreshToken", user.headers.refreshtoken);
            localStorage.setItem('user', JSON.stringify(user.data));
            setConnectedUser(user.data);

        } catch (error) {
            setUserNotExist(true);
            console.error("not find user:", error);
        }
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors, formValues, isSubmit]);

    const validate = (values: FormValues): { [key: string]: string } => {
        const errors: { [key: string]: string } = {};
        if (!values.userName) {
            errors.userName = "Username is required!";
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

    const login = useGoogleLogin({
        // onSuccess: (codeResponse: GoogleLoginResponse) => setGoogleUser(codeResponse),
        // onError: (error: Error) => console.log('Login Failed:', error)
    });
    interface City {
      name: string;
      // Add other properties if available in your data
    }
    async function getAllCitiesInIsrael() {
      try {
        const response = await axios.get('http://api.geonames.org/searchJSON?country=IL&username=liel&maxRows=100');
      
        // Extract the list of cities
        const israelCities: string[] = response.data.geonames.map((city: City) => city.name);
        return israelCities;
      } catch (error) {
        console.error(error);
        throw error; // Rethrow the error if needed
      }
    }
  
    // const handleGoogleUser = async () => {
    //     try {
    //         if (googleUser) {
    //             const response = await axios.get(
    //                 `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${googleUser.access_token}`,
    //                         Accept: 'application/json'
    //                     }
    //                 }
    //             );
    //             if (response.data) {
    //                 formValues.userName = response.data.email;
    //                 formValues.firstName = response.data.given_name;
    //                 formValues.lastName = response.data.family_name;
    //                 formValues.email = response.data.email;
    //                 formValues.password = response.data.email;
    //                 formValues.confirmPassword = response.data.email;
    //                 formValues.googleUser = true;
    //                 const user = await findUser(formValues.userName, formValues.password);
    //                 localStorage.setItem("accessToken", user.headers.authorization);
    //                 localStorage.setItem("refreshToken", user.headers.refreshtoken);
    //                 localStorage.setItem('user', JSON.stringify(user.data));
    //                 setConnectedUser(user.data);
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Error adding user:", error);
    //     }
    // };

    // useEffect(() => {
    //     handleGoogleUser();
    // }, [googleUser]);

    return (
        <div className="bgImg">
            <div className="container_login">
                <form onSubmit={handleSubmit}>
                    <h1>Log In</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">
                        <div className="field">
                            <label>userName</label>
                            <input
                                type="text"
                                name="userName"
                                placeholder="userName"
                                value={formValues.userName}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.userName}</p>
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
                        {userNotExist &&<p>not find</p>}
                        <button className="singbutton">Submit</button>
                    </div>
                </form>
                {/* <button onClick={login}>Sign in with Google 🚀 </button> */}
                <div className="text">
                    Already have an account? <span>Login</span>
                </div>
            </div>
        </div>
    );
}

export default LogIn;



// import { useState, useEffect,useContext } from "react";
// import { useHistory } from "react-router-dom";
// import { GlobalContext } from "../GlobalContext";
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import "./loginPage.css";
// import {
//     findUser,
//     getAllProducts,
//     getAllCategories,
//   } from "../ApiService";
//   import axios from 'axios';

// function LogIn() {
//     const initialValues = {
//         userName: "",
//         password: "",
//     };
//     const [ googleUser, setGoogleUser ] = useState([]);
//     //todo
//     const [ profile, setProfile ] = useState([]);
//     const [formValues, setFormValues] = useState(initialValues);
//     const [formErrors, setFormErrors] = useState({});
//     const [isSubmit, setIsSubmit] = useState(false);
//     const [userNotExist , setUserNotExist] = useState(false);
//     const { connectedUser, setConnectedUser, allProducts, setAllProducts,allCategories ,setAllCategories,allCities,setAllCities} = useContext(GlobalContext);
//     const history = useHistory();
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues({ ...formValues, [name]: value });
//     };
//       useEffect(() => {
//      if(connectedUser!== undefined){ 
//         fetchData()
//      } 
//   }, [connectedUser]);

// //   async function getAllCitiesInIsrael() {
// //     try {
// //       const response = await axios.get('http://api.openweathermap.org/data/2.5/find', {
// //         params: {
// //           q: 'Israel',
// //           type: 'like',
// //           sort: 'population',
// //           cnt: 30,  // Adjust the count as needed
// //           APPID: '3959e282f06b8ec89d75e2fde6c36672',  // Replace with your API key
// //         },
// //       });
  
// //       // Extract the list of cities
// //       const israelCities = response.data.list.map(city => city.name);
// //       debugger
  
// //       return israelCities;
// //     } catch (error) {
// //       console.error(error);
// //       throw error; // Rethrow the error if needed
// //     }
// //   }
//   async function getAllCitiesFromRestApi() {
//     try {
//       // Axios request using async/await
//       const response = await axios({
//         method: 'get',
//         url: 'https://countriesnow.space/api/v0.1/countries',
//       });
//       let israelCities =[]
//       debugger
//       if(response.data.data ){
//         // Handle the response data here
//       console.log(response.data.data);
      
//       // If you want to filter cities for a specific country (e.g., Israel)
//       israelCities = response.data.data
//         .filter(item => item.country === "Israel")
//         .map(item => item.cities);
//       }
      
//       return israelCities
//       // return israelCities;
//     } catch (error) {
//       // Handle errors here
//       console.error(error);
//     }
//   }

//   async function getAllCitiesInIsrael() {
//     try {
//       const response = await axios.get('http://api.geonames.org/searchJSON?country=IL&username=liel&maxRows=100', {
//       });
  
//       // Extract the list of cities
//       const israelCities = response.data.geonames.map(city => city.name);
//       debugger
  
//       return israelCities;
//     } catch (error) {
//       console.error(error);
//       throw error; // Rethrow the error if needed
//     }
//   }
// //   async function getAllCitiesInIsrael() {
// //     try {
// //       const response = await axios.get('http://api.openweathermap.org/data/2.5/find', {
// //         params: {
// //           q: 'Israel',
// //           type: 'like',
// //           sort: 'population',
// //           cnt: 30,  // Adjust the count as needed
// //           APPID: 'YOUR_OPENWEATHERMAP_API_KEY',  // Replace with your API key
// //         },
// //       });
  
// //       // Extract the list of cities
// //       const israelCities = response.data.list.map(city => city.name);
// //       debugger
// //       return israelCities;
// //     } catch (error) {
// //       console.error(error);
// //       throw error; // Rethrow the error if needed
// //     }
// //   }
//   async function fetchData(){
//     try{
//         const products = await getAllProducts();
//         const categories = await getAllCategories();
//         const cities = (( allCities==undefined || allCities.length==0 )? await getAllCitiesInIsrael() : allCities);
//         setAllProducts(products.data);
//         setAllCategories(categories.data);
//         setAllCities(cities);
//         history.push("landing");
//     }
//     catch(err){
//       console.log(err);
//     }

//   }

//     const handleSubmit = async (e) => {
//         debugger
//         e.preventDefault();
//         setFormErrors(validate(formValues));
//         setIsSubmit(true);
//         try {
//             const user = await findUser(formValues.userName ,formValues.password);
//              // Save tokens to local storage
//             localStorage.setItem("accessToken", user.headers.authorization);
//             localStorage.setItem("refreshToken", user.headers.refreshtoken);
//              // Store user data in localStorage
//             localStorage.setItem('user', JSON.stringify(user.data));
//             // Save connected user
//             setConnectedUser(user.data)
//         } catch (error) {
//             setUserNotExist(true)
//             console.error("not find user:", error);
//         }
//     };

//     useEffect(() => {
//         console.log(formErrors);
//         if (Object.keys(formErrors).length === 0 && isSubmit) {
//             console.log(formValues);
//         }
//     }, [formErrors, formValues, isSubmit]);
//     const validate = (values) => {
//         const errors = {};
//         if (!values.userName) {
//             errors.userName = "Username is required!";
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
//     const login = useGoogleLogin({
//         onSuccess: (codeResponse) => setGoogleUser(codeResponse),
//         onError: (error) => console.log('Login Failed:', error)
//     });

//     // log out function to log the user out of google and set the profile array to null
//     const logOut = () => {
//         googleLogout();
//         setProfile(null);
//     }

//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             if (googleUser) {
//               const response = await axios.get(
//                 `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
//                 {
//                   headers: {
//                     Authorization: `Bearer ${googleUser.access_token}`,
//                     Accept: 'application/json'
//                   }
//                 }
//               );
      
//               if (response.data) {
//                 formValues.userName = response.data.email;
//                 formValues.firstName = response.data.given_name;
//                 formValues.lastName = response.data.family_name;
//                 formValues.email = response.data.email;
//                 formValues.password = response.data.email;
//                 formValues.confirmPassword = response.data.email;
//                 formValues.googleUser = true;
      
//                 const user = await findUser(formValues.userName ,formValues.password);
//                 // Save tokens to local storage
//                localStorage.setItem("accessToken", user.headers.authorization);
//                localStorage.setItem("refreshToken", user.headers.refreshtoken);
//                 // Store user data in localStorage
//                localStorage.setItem('user', JSON.stringify(user.data));
//                // Save connected user
//                setConnectedUser(user.data)
//               }
//             }
//           } catch (error) {
//             console.error("Error adding user:", error);
//           }
//         };
      
//         fetchData(); 
      
//       }, [googleUser]);

//     return (
//         <>
//         <div className="bgImg">
//             <div className="container_login">
//                 <form onSubmit={handleSubmit}>
//                     <h1>Log In</h1>
//                     <div className="ui divider"></div>
//                     <div className="ui form">
//                         <div className="field">
//                             <label>userName</label>
//                             <input
//                                 type="text"
//                                 name="userName"
//                                 placeholder="userName"
//                                 value={formValues.userName}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <p>{formErrors.userName}</p>
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
//                         {userNotExist &&<p>not find</p>}
//                         <button className="singbutton">Submit</button>
//                     </div>
//                 </form>
//                 <button onClick={login}>Sign in with Google 🚀 </button>
//                 <div className="text">
//                     Already have an account? <span>Login</span>
//                 </div>
//             </div>
//             </div>
//         </>
//     );
// }

// export default LogIn