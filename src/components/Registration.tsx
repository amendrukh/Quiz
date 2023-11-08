import {useState} from "react";
import {IPlayer} from "../models";

export function GetStart() {
    const [player, setPlayer] = useState<IPlayer>({name: "", answers: []});
    console.log(player)

    return (
        <div>
            <form>
                <label>Enter your name
                    <input type="text" onChange={(e) => setPlayer({ ...player, name: e.target.value })} />
                </label>
            </form>
        </div>
    )
}