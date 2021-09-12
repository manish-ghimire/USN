import React from "react";
import "./button.css";


export const Button =({
    children,
    onClick,
    className
}) => {
 return(
        <button className={className} onClick={onClick}>
            {children}
        </button>
    )
};
