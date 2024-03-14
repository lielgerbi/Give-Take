import React, { createContext, useState, ReactNode } from "react";

interface GlobalContextState {
  connectedUser: any;
  setConnectedUser: React.Dispatch<React.SetStateAction<any>>;
  allProducts: any[];
  setAllProducts: React.Dispatch<React.SetStateAction<any[]>>;
  allCategories: any[];
  setAllCategories: React.Dispatch<React.SetStateAction<any[]>>;
  allCities: any[];
  setAllCities: React.Dispatch<React.SetStateAction<any[]>>;
  editPost: any;
  setEditPost: React.Dispatch<React.SetStateAction<any>>;
}

export const GlobalContext = createContext<GlobalContextState>({
  connectedUser: undefined,
  setConnectedUser: () => {},
  allProducts: [],
  setAllProducts: () => {},
  allCategories: [],
  setAllCategories: () => {},
  allCities: [],
  setAllCities: () => {},
  editPost: undefined,
  setEditPost: () => {},
});

interface GlobalContextProviderProps {
  children: ReactNode;
}

const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
  const [connectedUser, setConnectedUser] = useState<any>();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [allCities, setAllCities] = useState<any[]>([]);
  const [editPost, setEditPost] = useState<any>();

  return (
    <GlobalContext.Provider
      value={{
        connectedUser,
        setConnectedUser,
        allProducts,
        setAllProducts,
        allCategories,
        setAllCategories,
        allCities,
        setAllCities,
        editPost,
        setEditPost,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;