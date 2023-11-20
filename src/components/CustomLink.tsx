import {Link, useMatch} from "react-router-dom";
import React from "react";

interface IAlertProvider {
    to:string
    children: React.ReactNode;
}

export const CustomLink = ({children,  to, ...props}:IAlertProvider) => {
    const match = useMatch(to)
    return (
        <Link to={to}
              style ={{color: match ? "#004643" : "white"}}
              {...props}>
            {children}
        </Link>
    )
}