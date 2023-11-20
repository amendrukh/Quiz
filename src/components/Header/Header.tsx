import "./header.scss";
import React from "react";

function Header() {
    return (
        <div className="header">
            <div className="header__icon icon">
                <div className="icon__title">Quiz
                    <span className="icon__subtitle">Mix</span>
                </div>
            </div>
        </div>
    )
}

export {Header};