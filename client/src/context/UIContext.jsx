import { createContext, useContext } from "react";

export const UIContext = createContext();

export const useUIContext = () => useContext(UIContext);
