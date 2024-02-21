import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
    const [connectedUser, setConnectedUser] = useState();
    const [allProducts, setAllProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
   

    return (
        <GlobalContext.Provider value={{
            connectedUser: connectedUser, setConnectedUser: setConnectedUser,
            allProducts: allProducts, setAllProducts: setAllProducts,
            allCategories: allCategories, setAllCategories: setAllCategories,
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;