import {usePlayer} from "../../player/playerContext";
import {CustomLink} from "../CustomLink";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "./homePage.scss";

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
        <div className="container homePage">
            <div className="homePage__el">
                <div className="homePage__el-logo logo">
                    <div className="logo__title">Quiz
                        <span className="logo__title-subtitle">Mix</span>
                    </div>

                </div>

            </div>
            <div className="homePage__el">
                <div className="homePage__el-title">Are you ready?</div>
                <button className="homePage__el-btn">
                    <CustomLink to="/registration">YES</CustomLink>
                </button>
            </div>

        </div>
    )
}

export {HomePage};