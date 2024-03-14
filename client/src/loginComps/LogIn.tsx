import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        var flagErrors = await validate(formValues);
        if(flagErrors==false){
            try {
                setIsSubmit(true);
                const user = await findUser(formValues.userName, formValues.password);
                localStorage.setItem("accessToken", user.headers.authorization);
                localStorage.setItem("refreshToken", user.headers.refreshtoken);
                localStorage.setItem('user', JSON.stringify(user.data));
                setConnectedUser(user.data);
                history.push("/products");
    
            } catch (error) {
                setUserNotExist(true);
                console.error("not find user:", error);
            }
        }
    };
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors, formValues, isSubmit]);

    const validate = (values: FormValues): boolean => {
        const errors: { [key: string]: string } = {};
        let flag: boolean = false;
        if (!values.userName) {
            flag = true;
            errors.userName = "Username is required!";
        }
        if (!values.password) {
            flag = true;
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            flag = true;
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            flag = true;
            errors.password = "Password cannot exceed more than 10 characters";
        }
        setFormErrors(errors);
        return flag
    };
    interface City {
      name: string;
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
    const handleClickSignup = () => {
        history.push('/signUp');
      };


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
                        <button type="submit" className="singbutton">Submit</button>
                    </div>
                </form>
                <div className="text">
                    New here? <span onClick={handleClickSignup} >SignUp</span>
                </div>
            </div>
        </div>
    );
}

export default LogIn;

