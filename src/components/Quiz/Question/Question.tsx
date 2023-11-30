import React, {useState, useMemo} from "react";
import {usePlayer} from "../../../player/playerContext";
import {QuestionProps, quizDataProps} from "../../../models";
import {heDecoder} from "../../../utils/decoder";
import "./question.scss"

function Question({question, id}: QuestionProps) {
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const {playerInfo, updatePlayerInfo} = usePlayer();

    const quizData: quizDataProps = {
        idQuestion: id,
        question: heDecoder(question.question),
        answers: useMemo(() => {
            let questionResponses = question.incorrect_answers.concat(question.correct_answer);
            if (!playerInfo.answers[id]) {
                questionResponses = questionResponses.sort(() => Math.random() - 0.5);
            }
            return questionResponses.map((el) => heDecoder(el));
        }, [question.incorrect_answers, question.correct_answer])
    };

    function getChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, id} = e.target;
        setSelectedAnswer(name);
        generateUserResponse(+id, name);
    }

    function generateUserResponse(key: number, value: string) {
        updatePlayerInfo({...playerInfo, answers: {...playerInfo.answers, ...{[key]: value}}});

    }
    console.log(playerInfo)
    return (
        <>
            <div className="quiz__questions-question">{quizData.question}</div>
            <form className="quiz__questions-answers answers">
                {quizData.answers.map((el, idItem) => (
                    <label className={selectedAnswer === el ? "answers__label checked" : "answers__label"} key={`question_${idItem}`} htmlFor={id.toString()}>
                        <input className="answers__input" id={id.toString()} name={el} type={"checkbox"} value={el} checked={selectedAnswer === el}
                               onChange={getChange}/>
                        {el}
                    </label>
                ))}
            </form>
        </>
    )
}

export {Question};




