import {usePlayer} from "../../player/playerContext";
import {CustomLink} from "../CustomLink";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "./homePage.scss";
import {Header} from "../Header/Header";

function HomePage() {
    const {playerData} = usePlayer();
    const location = useLocation();
    const navigate = useNavigate();
    const goCategory = () => navigate("/category", {replace: true, state: {player: true}});

    if (playerData.name) {
        return (
            <div>
                <div>We are glad to welcome you, {playerData.name}!
                    Are you ready to start the game?
                </div>
                <button onClick={goCategory}>
                    {/*<CustomLink to="/quiz">YES</CustomLink>*/}
                    YES
                </button>
                <button>
                    <CustomLink to="/registration">No, I'm not {playerData.name}</CustomLink>
                </button>
            </div>
        )
    }

    return (
        <>
            <Header/>
            <div className="container homePage">
                <div className="homePage__desc desc">
                    <div className="desc__title">Are you ready?</div>
                    <button className="desc__btn">
                        <CustomLink to="/registration">YES</CustomLink>
                    </button>
                </div>
            </div>
        </>
    )
}

export {HomePage};