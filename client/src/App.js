import React, { useState, useEffect, useContext } from "react";
import { useHistory  } from "react-router-dom";
import Template from "./template/Template";
import { Switch, Route ,BrowserRouter } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import { Redirect } from 'react-router';
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import UserProducts from "./products/UserProducts"
import LogIn from "./loginComps/LogIn";
import SignUp from "./loginComps/SignUp";
import HomePage from "./loginComps/HomePage"
import NewProduct from "./products/newProduct";
import EditProducts from "./products/EditProducts"
import 'antd/dist/reset.css';
import {
  getAllProducts,
  getAllCategories,
  getAllCities
} from "./ApiService";


function App() {
  const history = useHistory();
  const { connectedUser, setConnectedUser, allProducts, setAllProducts,allCategories ,setAllCategories,allCities,setAllCities} = useContext(GlobalContext);
  const storedUser = localStorage.getItem('user')
  useEffect(() => {
    // Check if user data exists in localStorage
    ;

    if (storedUser) {
      // Parse the stored user data
      const userData = JSON.parse(storedUser);
      setConnectedUser(userData);
      fetchData()
    }
  }, []);
  // useEffect(() => {
  //   if(connectedUser == undefined ){
       
  //   }
   
  // }, []);

  // useEffect(() => {
  //   // Redirect to the login page
  //   history.push('/logIn');
  // }, [history]);

  async function fetchData(){
    try{
        const products = await getAllProducts();
        const categories = await getAllCategories();
        const cities = await getAllCities()
        console.log(products);
        setAllProducts(products.data);
        setAllCategories(categories.data);
        setAllCities(cities.data);
        setConnectedUser(undefined)
    }
    catch(err){
      console.log(err);
    }

  }
  

  return (
   
    <BrowserRouter >
     <div>
       <Template></Template>
    <Switch>
      <Route path="/" exact>
        <LogIn />
      </Route>
      <Route path="/products" exact>
        <ProductList />
      </Route>
      <Route path="/signUp" exact>
        <SignUp />
      </Route>
      <Route path="/landing" exact>
        <Landing />
      </Route>
      <Route path="/newProduct" exact>
        <NewProduct />
      </Route>
      <Route path="/home" exact>
        <HomePage />
      </Route>
      <Route path="/myPost" exact>
        <UserProducts />
      </Route>
      <Route path="/editPost" exact>
        <EditProducts />
      </Route>
      
    </Switch>
    </div>
    </BrowserRouter>
   

  );
}

export default App;
