import React, {ReactNode} from "react";

interface IValidatePlayerName {
    e: React.ChangeEvent
    name: string
}

interface IQuestion {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

interface ICategory {
    id : number,
    name: string
}

interface QuestionProps {
    question: IQuestion,
    id: number
}

interface quizDataProps {
    idQuestion: number,
    question: string,
    answers: string[]
}


interface IPlayer {
    name: string | undefined,
    answers: { [key: number]: string },
    points: number;
}

interface ILocalStorage {
    key: string,
    name: string | undefined,
}

interface IQuiz {
    questions: IQuestion[] | [],
}

interface IPlayerContext {
    playerData: ILocalStorage, //local
    updatePlayerData: (text: string) => void, //local
    playerInfo: IPlayer, //obj
    updatePlayerInfo: (object: IPlayer) => void,
    category: string | undefined,
    updateCategory: (category:string) => void//obj

}

interface IAlertProvider {
    children?: ReactNode;
}

export type {
    IValidatePlayerName, IQuestion, QuestionProps, quizDataProps, IPlayer, ILocalStorage, IQuiz, IPlayerContext,
    IAlertProvider, ICategory
}