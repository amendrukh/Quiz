import {useAlert} from "./AlertContext";

export function Alert() {
    const {visible, toggleVisible, message} = useAlert();

    if (!visible) return null;

    return (
        <div>
            <h2>{message}</h2>
            <button onClick={toggleVisible}>OK</button>
        </div>
    )
}