import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAlert} from "../alert/AlertContext";
import {usePlayer} from "../player/playerContext";
import {IValidatePlayerName} from "../models";
import {Category} from "./Category";


function Registration() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined | null>(undefined);
    const {updatePlayerData} = usePlayer();

function validatePlayerName({e, name}: IValidatePlayerName) {
        e.preventDefault();

        const playerName = name;
        console.log(playerName)

        setInputValue(playerName);
        const pattern = /^[a-zA-Z]{2,10}$/;
        const validateName = (playerName: string, pattern: RegExp) => pattern.test(playerName);
        setErrorMessage(null);

        if (name === "") {
         return  setErrorMessage("Enter your name")
        }

        if (!validateName(name, pattern)) {
            return  setErrorMessage("Please enter a valid name. Name must include only letters!")
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
        <div>
            <form>
                <label>Enter your name:
                    <input placeholder={"John Deh.."} type="text" onBlur={(e) => {
                        validatePlayerName({e, name: e.target.value});
                    }}/>
                    {errorMessage && <span>{errorMessage}</span>}
                </label>
                <Category/>
                <button onClick={(e) => submit(e)}>Start</button>
            </form>
        </div>
    )
}

export {Registration};