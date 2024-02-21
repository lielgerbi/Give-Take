import React, { useState, useEffect, useContext } from "react";
import Template from "./template/Template";
import { Switch, Route ,BrowserRouter } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import { Redirect } from 'react-router';
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import LogIn from "./loginComps/LogIn";
import SignUp from "./loginComps/SignUp";
import NewProduct from "./products/newProduct"
import {
  getAllProducts,
  getAllCategories
} from "./ApiService";


function App() {

  const { connectedUser, setConnectedUser, allProducts, setAllProducts,allCategories ,setAllCategories} = useContext(GlobalContext);
  useEffect(() => {
     fetchData()
  }, []);

  async function fetchData(){
    try{
        const products = await getAllProducts();
        const categories = await getAllCategories();
        setAllProducts(products.data);
        setAllCategories(categories.data);
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
      
    </Switch>
    </div>
    </BrowserRouter>
   

  );
}

export default App;
