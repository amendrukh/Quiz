import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAlert} from "../alert/AlertContext";
import {usePlayer} from "../player/playerContext";
import {IValidatePlayerName} from "../models";
import {Category} from "./Category";

function Registration() {

    const {toggleVisible, toggleMessage} = useAlert();
    const [inputValue, setInputValue] = useState("");
    const {updatePlayerData} = usePlayer();

    const navigate = useNavigate();
    const goQuiz = () => navigate("/quiz", {replace: true});

    async function validatePlayerName({e, name}: IValidatePlayerName) {
        e.preventDefault();
        const pattern = /^[a-zA-Z]{2,10}$/;
        const validateName = (namePlayer: string, pattern: RegExp) => pattern.test(name);
        const modStr = (string: string) => string[0].toUpperCase() + string.slice(1);

        if (name === "") {
            toggleMessage("Enter your name");
            return toggleVisible();
        }

        if (!validateName(name, pattern)) {
            toggleMessage(`Please enter a valid name. Name must include only letters!`);
            return toggleVisible();
        }

        await updatePlayerData(modStr(name));

        await goQuiz();
    }

    return (
        <div>
            <form>
                <label>Enter your name:
                    <input placeholder={"John Deh.."} type="text" onChange={(e) => {
                        setInputValue(e.target.value);
                    }}/>
                </label>
                <Category/>
                <button onClick={(e) => validatePlayerName({e, name: inputValue})}>Start</button>
            </form>
        </div>
    )
}

export {Registration};