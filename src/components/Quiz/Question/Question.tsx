import React, {useState, useMemo} from "react";
import {usePlayer} from "../../../player/playerContext";
import {QuestionProps, quizDataProps} from "../../../models";
import {heDecoder} from "../../../utils/decoder";
import {useRef} from "react";
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
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    function getChange(e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLabelElement>) {

        setSelectedAnswer("");

        const targetElement = e.target as HTMLElement;
        let inputEl = null;

        if (targetElement.nodeName === "INPUT") {
            inputEl = targetElement as HTMLInputElement;
            setSelectedAnswer(inputEl.name);
            generateUserResponse(quizData.idQuestion, inputEl.name);
        }

        if (targetElement.nodeName === "LABEL") {
            const labelEl = targetElement as HTMLLabelElement;
            inputEl = inputRefs.current.find((input) => input?.id === labelEl.htmlFor) as HTMLInputElement;
            setSelectedAnswer(inputEl.name);
            generateUserResponse(quizData.idQuestion, inputEl.name);
        }

    }

    function generateUserResponse(key: number, value: string) {
        updatePlayerInfo({...playerInfo, answers: {...playerInfo.answers, ...{[key]: value}}});
    }


    return (
        <>
            <div className="quiz__questions-question">{quizData.question}</div>
            <form className=" quiz__questions-answers answers">
                {quizData.answers.map((el, idItem) => (
                    <div className={selectedAnswer === el ? "answers__case checked" : "answers__case"}
                         key={`answersContainer-${idItem}`}>
                        <label onClick={(e) => getChange(e)}
                               className="answers__case-item answers__case-label"
                               key={`question_${idItem}`} htmlFor={idItem.toString()}> {el}
                        </label>
                        <input
                            className="answers__case-item answers__case-input" id={`${idItem}`}
                            ref={(ref) => (inputRefs.current[idItem] = ref)}
                            checked={selectedAnswer === el}
                            name={el} type={"checkbox"}
                            value={el}
                            onChange={(e) => getChange(e)}
                        />
                    </div>
                ))}
            </form>
        </>
    )
}

export {Question};




