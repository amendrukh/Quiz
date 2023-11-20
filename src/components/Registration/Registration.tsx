import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {usePlayer} from "../../player/playerContext";
import {IValidatePlayerName} from "../../models";
import {Category} from "../Category/Category";
import {Header} from "../Header/Header";
import "./registration.scss"


function Registration() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined | null>(undefined);
    const {updatePlayerData} = usePlayer();

function validatePlayerName({e, name}: IValidatePlayerName) {
        e.preventDefault();

        setInputValue(name);

        const pattern = /^[a-zA-Z]{2,10}$/;
        const validateName = (playerName: string, pattern: RegExp) => pattern.test(playerName);

        setErrorMessage(null);

        if (name === "") {
         return  setErrorMessage("Enter your name")
        }

        if (!validateName(name, pattern)) {
            return  setErrorMessage("Name must include only letters!..")
        }

    }

    function submit(e: React.MouseEvent) {
        e.preventDefault();
        const modStr = (playerName: string) => playerName[0].toUpperCase() + playerName.slice(1);
        const goQuiz = () => navigate("/quiz", {replace: true});

        if (errorMessage === undefined || typeof errorMessage === "string") {
            return null;
        }
        updatePlayerData(modStr(inputValue));
        return goQuiz();
    }

    return (
        <>
            <Header/>
            <div className="container registration">
                <form className="registration__form form">
                    <div className="form__item">
                        <label className="form__item-label">Enter your name:  </label>
                        <div className="form__item-playerName playerName">
                            <input  className="playerName__input" placeholder={"John Deh.."} type="text" onBlur={(e) => {
                                validatePlayerName({e, name: e.target.value});
                            }}/>
                                {errorMessage && <span className="playerName__errorMessage">{errorMessage}</span>}
                        </div>
                    </div>

                    <div className="form__item">
                        <Category/>
                    </div>
                    <button className="form__btn" onClick={(e) => submit(e)}>Start</button>
                </form>
            </div>
        </>
    )
}

export {Registration};