import {usePlayer} from "../player/playerContext";
import {CustomLink} from "./CustomLink";

function HomePage() {
    const {playerData} = usePlayer();

    if (playerData.name) {
        return (
            <div>
                <div>We are glad to welcome you, {playerData.name}!
                    Are you ready to start the game?
                </div>
                <button>
                    <CustomLink to="/quiz">YES</CustomLink>
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