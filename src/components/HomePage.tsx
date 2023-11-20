import {usePlayer} from "../player/playerContext";
import {CustomLink} from "./CustomLink";
import React from "react";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

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
        <div>
            <div>Are you ready?</div>
            <button>
                <CustomLink to="/registration">YES</CustomLink>
            </button>
        </div>
    )
}

export {HomePage};