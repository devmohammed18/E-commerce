import { createContext } from "react";
import { typeGlobalContext } from "../type/type";


export const GlobalContext=createContext<typeGlobalContext | undefined>(undefined)