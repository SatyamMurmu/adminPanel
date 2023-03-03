import { useContext, createContext, useState, useReducer } from "react";
import authRdeucer from "../reducer/authReducer";

const AuthContext = createContext();
const AuthContextProvider = ({children}) => {
  
    const initialState={
        auth:false,
        msg:""
    }
    const authenticate=(auth,data)=>{
        dispatch({type:auth,payload:data})
       
        
    }
  const [state, dispatch] = useReducer(authRdeucer, initialState);
  return <AuthContext.Provider value={{...state,authenticate}}>{children}</AuthContext.Provider>;
};
const useAuthContext = () => {
  return useContext(AuthContext);
};
export { AuthContextProvider, useAuthContext };
