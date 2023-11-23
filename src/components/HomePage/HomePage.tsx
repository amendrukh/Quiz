import {usePlayer} from "../../player/playerContext";
import {CustomLink} from "../CustomLink";
import React from "react";
import {useNavigate} from "react-router-dom";
import "./homePage.scss";
import {Header} from "../Header/Header";

function HomePage() {
    const {playerData} = usePlayer();
    const navigate = useNavigate();
    const goCategory = () => navigate("/category", {replace: true, state: {player: true}});

    if (playerData.name) {
        return (
            <div className="homePage">
                <div className="homePage__alert">
                    <div className="homePage__alert-message">We are glad to welcome you, {playerData.name}!
                        <p>Are you ready to start the game?</p>
                    </div>
                    <div className="homePage__main-btns">
                        <button className="homePage__main-btn btn" onClick={goCategory}>YES</button>
                        <button className="homePage__main-btn btn">
                            <CustomLink to="/registration" className="link">No, I'm not {playerData.name}</CustomLink>
                        </button>
                    </div>

                </div>
            </div>

        )
    }

    return (
        <div className="homePage">
            <div className="homePage__header">
                <Header/>
            </div>
            <div className="homePage__main">
                <div className="homePage__main-title">Are you ready?</div>
                <button className="homePage__main-btn btn">
                    <CustomLink to="/registration" className="link">YES</CustomLink>
                </button>
            </div>
        </div>
    )
}

export {HomePage};