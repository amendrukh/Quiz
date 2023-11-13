import React, {ReactNode, useContext, useState} from "react";

interface IAlertContext {
    visible?: boolean,
    toggleVisible: () => void,
    message: string,
    toggleMessage: (text: string) => void

}
const AlertContext = React.createContext<IAlertContext>({toggleVisible: () => {}, message: "", toggleMessage: () => ""});

export const useAlert = () => {
    return useContext(AlertContext)
}

interface IAlertProvider {
    children?: ReactNode;
}

export const AlertProvider = ({children}: IAlertProvider) => {
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState("");
    const toggleAlert = () => setAlert(prev => !prev);
    const toggleMessage = (text:string) => setMessage(text)

    return (
        <AlertContext.Provider value={{
            visible: alert,
            toggleVisible: toggleAlert,
            message: message,
            toggleMessage: toggleMessage

        }}>
            {children}
        </AlertContext.Provider>
    )
}