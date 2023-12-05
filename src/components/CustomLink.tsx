import {Link, useMatch} from "react-router-dom";
import React from "react";

interface IAlertProvider {
    to:string
    className?: string
    children: React.ReactNode;
}

 export const CustomLink = ({children,  to, className, ...props}:IAlertProvider) => {

    const match = useMatch(to);
     // const color = () => match ? "#004643" : "white";
    return (
        <Link to={to}
              className={`${className}`}
              {...props}>
            {children}
        </Link>
    )
}