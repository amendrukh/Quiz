import React, {useContext, useState} from "react";
import useLocalStorage from "use-local-storage";
import {IPlayer, ILocalStorage, IPlayerContext, IAlertProvider} from "../models";

const PlayerContext = React.createContext<IPlayerContext>({
    playerData: {
        key: "player",
        name: undefined
    },
    updatePlayerData: () => {
    },
    playerInfo: {
        name: undefined,
        answers: {},
        points: 0,
    },
    updatePlayerInfo: () => {
    },
});


const usePlayer = () => {
    return useContext(PlayerContext);
}

const PlayerProvider = ({children}: IAlertProvider) => {
    const [playerName, setPlayerName] = useLocalStorage<ILocalStorage>("player", {
        key: "player",
        name: undefined,
    });

    const [player, setPlayer] = useState<IPlayer>({name: playerName.name, answers: {}, points: 0});

    const updatePlayerData = (name: string) => setPlayerName({...playerName, name: name});
    const updatePlayerInfo = (object: IPlayer) => setPlayer(object);

    return (
        <PlayerContext.Provider value={
            {
                playerData: playerName,
                updatePlayerData: updatePlayerData,
                playerInfo: player,
                updatePlayerInfo: updatePlayerInfo
            }
        }>
            {children}
        </PlayerContext.Provider>
    );
};

export {usePlayer, PlayerProvider};
