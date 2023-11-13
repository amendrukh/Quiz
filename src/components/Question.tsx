import React, {useState, useMemo} from "react";
import {usePlayer} from "../player/playerContext";
import {QuestionProps, quizDataProps} from "../models";
import {heDecoder} from "../utils/decoder";

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

    return (
        <div>
            <div>{quizData.question}</div>
            <form>
                {quizData.answers.map((el, idItem) => (
                    <label key={`question_${idItem}`} htmlFor={id.toString()}>  {el}
                        <input id={id.toString()} name={el} type={"checkbox"} value={el} checked={selectedAnswer === el}
                               onChange={getChange}/>
                    </label>
                ))}
            </form>
        </div>
    )
}

export {Question};




