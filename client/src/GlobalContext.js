import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
    const [connectedUser, setConnectedUser] = useState();
    const [allProducts, setAllProducts] = useState([]);
  

    return (
        <GlobalContext.Provider value={{
            connectedUser: connectedUser, setConnectedUser: setConnectedUser,
            allProducts: allProducts, setAllProducts: setAllProducts,
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;