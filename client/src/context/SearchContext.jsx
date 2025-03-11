/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

// eslint-disable-next-line react/prop-types
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
