import { createContext } from "react";


export const CardContext = createContext([[], () => {}]); // Default as an empty array and a noop function



export const Visibility = createContext(false);
export const Coordinate = createContext({})
