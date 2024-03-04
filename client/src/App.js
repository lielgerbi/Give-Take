import React, { useState, useEffect, useContext } from "react";
import Template from "./template/Template";
import { Switch, Route ,BrowserRouter } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import { Redirect } from 'react-router';
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import LogIn from "./loginComps/LogIn";
import SignUp from "./loginComps/SignUp";
import HomePage from "./loginComps/HomePage"
import NewProduct from "./products/newProduct"
import {
  getAllProducts,
  getAllCategories,
  getAllCities
} from "./ApiService";


function App() {

  const { connectedUser, setConnectedUser, allProducts, setAllProducts,allCategories ,setAllCategories,allCities,setAllCities} = useContext(GlobalContext);
  useEffect(() => {
     fetchData()
  }, []);

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
        <Landing />
      </Route>
      <Route path="/products" exact>
        <ProductList />
      </Route>
      <Route path="/signUp" exact>
        <SignUp />
      </Route>
      <Route path="/logIn" exact>
        <LogIn />
      </Route>
      <Route path="/newProduct" exact>
        <NewProduct />
      </Route>
      <Route path="/home" exact>
        <HomePage />
      </Route>
      
    </Switch>
    </div>
    </BrowserRouter>
   

  );
}

export default App;
