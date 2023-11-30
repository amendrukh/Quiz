import {useAlert} from "./AlertContext";
import "./alert.scss"
import React from "react";

export function Alert({children}: { children?: React.ReactNode }) {
    const {visible, toggleVisible, message} = useAlert();

    // if (!visible) return null;

    if (!visible) {
        return (
            <>{children}</>
        )
    }

    return (
        <div className="alert">
            <div className="alert__main">
                <div className="alert__main-item alert__main-message">{message}</div>
                <button className="alert__main-item alert__main-btn btn" onClick={toggleVisible}>OK</button>
            </div>
        </div>

    )
}