import React, { useEffect, useContext } from "react";
import Header from "./template/Header";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import UserProducts from "./products/UserProducts";
import LogIn from "./loginComps/LogIn";
import SignUp from "./loginComps/SignUp";
import HomePage from "./loginComps/HomePage";
import NewProduct from "./products/newProduct";
import EditProducts from "./products/EditProducts";
import "antd/dist/reset.css";
import axios from "axios";
import {
  getAllProducts,
  getAllCategories,
} from "./ApiService";

function App() {
  const {
    setConnectedUser,
    setAllProducts,
    setAllCategories,
    setAllCities,
    allCities,
  } = useContext(GlobalContext);
  const storedUser = localStorage.getItem("user");
  useEffect(() => {
    // Check if user data exists in localStorage
    if (storedUser) {
      // Parse the stored user data
      const userData = JSON.parse(storedUser);
      setConnectedUser(userData);
      debugger
      fetchData();
    }
  }, []);


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
  async function fetchData() {
    try {
      debugger
      const products = await getAllProducts();
      const categories = await getAllCategories();
      const cities =
        allCities === undefined || allCities.length === 0
          ? await getAllCitiesInIsrael()
          : allCities;
      setAllProducts(products.data);
      setAllCategories(categories.data);
      setAllCities(cities);
      setConnectedUser(undefined);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <BrowserRouter>
      <div>
        <Header />
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



// import React, { useEffect, useContext } from "react";
// import Header from "./template/Header";
// import { Switch, Route ,BrowserRouter } from "react-router-dom";
// import { GlobalContext } from "./GlobalContext";
// import Landing from "./landing/Landing";
// import ProductList from "./products/ProductList";
// import UserProducts from "./products/UserProducts"
// import LogIn from "./loginComps/LogIn";
// import SignUp from "./loginComps/SignUp";
// import HomePage from "./loginComps/HomePage"
// import NewProduct from "./products/newProduct";
// import EditProducts from "./products/EditProducts"
// import 'antd/dist/reset.css';
// import axios from 'axios';
// import {
//   getAllProducts,
//   getAllCategories,
// } from "./ApiService";


// function App() {
//   const {setConnectedUser,setAllProducts, setAllCategories, setAllCities,allCities} = useContext(GlobalContext);
//   const storedUser = localStorage.getItem('user')
//   useEffect(() => {
//     // Check if user data exists in localStorage
//     if (storedUser) {
//       // Parse the stored user data
//       const userData = JSON.parse(storedUser);
//       setConnectedUser(userData);
//       fetchData()
//     }
//   }, []);


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
//   async function fetchData(){
//     try{
//         const products = await getAllProducts();
//         const categories = await getAllCategories();
//         debugger
//         const cities = (( allCities==undefined || allCities.length==0 ) ? await getAllCitiesInIsrael() : allCities);
//         console.log(cities)
//         debugger
//         setAllProducts(products.data);
//         setAllCategories(categories.data);
//         setAllCities(cities);
//         setConnectedUser(undefined)
//     }
//     catch(err){
//       console.log(err);
//     }

//   }
  

//   return (
   
//     <BrowserRouter >
//       <div>
//       <Header></Header>
//     <Switch>
//       <Route path="/" exact>
//         <LogIn />
//       </Route>
//       <Route path="/products" exact>
//         <ProductList />
//       </Route>
//       <Route path="/signUp" exact>
//         <SignUp />
//       </Route>
//       <Route path="/landing" exact>
//         <Landing />
//       </Route>
//       <Route path="/newProduct" exact>
//         <NewProduct />
//       </Route>
//       <Route path="/home" exact>
//         <HomePage />
//       </Route>
//       <Route path="/myPost" exact>
//         <UserProducts />
//       </Route>
//       <Route path="/editPost" exact>
//         <EditProducts />
//       </Route>
      
//     </Switch>
//     </div>
//     </BrowserRouter>
   

//   );
// }

// export default App;
