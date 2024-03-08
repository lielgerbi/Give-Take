import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
    const [connectedUser, setConnectedUser] = useState();
    const [allProducts, setAllProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [allCities, setAllCities] = useState([]);
    const [editPost , setEditPost] = useState()
   

    return (
        <GlobalContext.Provider value={{
            connectedUser: connectedUser, setConnectedUser: setConnectedUser,
            allProducts: allProducts, setAllProducts: setAllProducts,
            allCategories: allCategories, setAllCategories: setAllCategories,
            allCities: allCities, setAllCities: setAllCities,
            editPost :editPost , setEditPost: setEditPost

        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;