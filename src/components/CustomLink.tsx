import {Link, useMatch} from "react-router-dom";
import React from "react";
import {IQuestion} from "../models";

interface IAlertProvider {
    to:string
    children: React.ReactNode;
}

export const CustomLink = ({children,  to, ...props}:IAlertProvider) => {
    const match = useMatch(to)
    return (
        <Link to={to}
              style ={{color: match ? "white" : "red"}}
              {...props}>
            {children}
        </Link>
    )
}