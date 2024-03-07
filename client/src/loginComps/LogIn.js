import { useState, useEffect,useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import "./loginPage.css";
import {
    findUser,
     refreshAccessToken,
    getAllProducts,
    getAllCategories,
    getAllCities
  } from "../ApiService";
import { genComponentStyleHook } from "antd/es/theme/internal";

function LogIn() {
    const initialValues = {
        userName: "",
        password: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [userNotExist , setUserNotExist] = useState(false);
    const { connectedUser, setConnectedUser, allProducts, setAllProducts,allCategories ,setAllCategories,allCities,setAllCities} = useContext(GlobalContext);
    const history = useHistory();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
      useEffect(() => {
     if(connectedUser!== undefined){ 
        fetchData()
     } 
  }, [connectedUser]);



  async function fetchData(){
    try{
        const products = await getAllProducts();
        const categories = await getAllCategories();
        const cities = await getAllCities()
        setAllProducts(products.data);
        setAllCategories(categories.data);
        setAllCities(cities.data);
        history.push("landing");
    }
    catch(err){
      console.log(err);
    }

  }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        try {
            const user = await findUser(formValues.userName ,formValues.password);
             // Save tokens to local storage
            localStorage.setItem("accessToken", user.headers.authorization);
            localStorage.setItem("refreshToken", user.headers.refreshtoken);
            // Save connected user
            setConnectedUser(user.data)
        } catch (error) {
            setUserNotExist(true)
            console.error("not find user:", error);
        }
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors, formValues, isSubmit]);
    const validate = (values) => {
        const errors = {};
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

    return (
        <>
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
                <div className="text">
                    Already have an account? <span>Login</span>
                </div>
            </div>
            </div>
        </>
    );
}

export default LogIn;
