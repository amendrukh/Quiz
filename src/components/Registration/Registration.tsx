import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {usePlayer} from "../../player/playerContext";
import {IValidatePlayerName} from "../../models";
import {Categories} from "../Category/Categories";
import {Header} from "../Header/Header";
import "./registration.scss"
import {Loader} from "../Loader/Loader";
import {useCategory} from "../../api/category";

function Registration() {
    const {loading} = useCategory();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined | null>(undefined);
    const {updatePlayerData} = usePlayer();
    const location = useLocation();
    const isLogin = location.state?.player;

    console.log(isLogin)

    function validatePlayerName({e, name}: IValidatePlayerName) {
        e.preventDefault();

        setInputValue(name);

        const pattern = /^[a-zA-Z]{2,10}$/;
        const validateName = (playerName: string, pattern: RegExp) => pattern.test(playerName);

        setErrorMessage(null);

        if (name === "") {
            return setErrorMessage("Enter your name")
        }

        if (!validateName(name, pattern)) {
            return setErrorMessage("Name must include only letters!..")
        }

    }

    function submit(e: React.MouseEvent) {
        e.preventDefault();
        const modStr = (playerName: string) => playerName[0].toUpperCase() + playerName.slice(1);
        const goQuiz = () => navigate("/quiz", {replace: true});


        if (isLogin) {
            return goQuiz();
        }

        if (errorMessage === undefined || typeof errorMessage === "string") {
            return null;
        }
        updatePlayerData(modStr(inputValue));
        return goQuiz();
    }
    // "registration__main-form form"
    return (
        <>
            {loading && <Loader/>}
            {!loading &&
                <div className="registration">
                    <div className="registration__header">
                        <Header/>
                    </div>
                    <div className="registration__main">
                        <form className={!isLogin ? "registration__main-form form" : "registration__main-form form isLogin"}>
                            {!isLogin && <div className="form__item playerName">
                                <label className="playerName__label">Enter your name:</label>
                                <div className="playerName__desc">
                                    <input className="playerName__desc-item playerName__input"
                                           placeholder={"John Deh.."} type="text"
                                           onBlur={(e) => {
                                               validatePlayerName({e, name: e.target.value});
                                           }}
                                    />
                                    {errorMessage &&
                                        <div className="playerName__desc-item playerName__errorMessage">
                                            <div className="playerName__errorMessage-item">
                                                <span
                                                    className="playerName__errorMessage-item-text">{errorMessage}</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>}
                            <div className="form__item category">
                                <div className="category__label">Select Category:</div>
                                <div className="category__selection">
                                    <Categories/>
                                </div>

                            </div>
                        </form>
                        <div className="registration__main-btn" onClick={(e) => submit(e)}>
                            <button className="btn">Start</button>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export {Registration};