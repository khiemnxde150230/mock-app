import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState();

    const onSetUser = (value) => {
        localStorage.setItem("token", JSON.stringify(value.token));
        localStorage.setItem("user", JSON.stringify(value.data));
        sessionStorage.setItem("token", JSON.stringify(value.token));
        sessionStorage.setItem("user", JSON.stringify(value.data));
        setUser(value.data);
    }
    
    return (
        <UserContext.Provider value={{
            user,
            onSetUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
};

export default UserContextProvider;