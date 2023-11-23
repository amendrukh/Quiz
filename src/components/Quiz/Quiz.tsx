import React, {useState} from "react";
import {useAlert} from "../../alert/AlertContext";
import {usePlayer} from "../../player/playerContext";
import {useNavigate} from "react-router-dom";
import {Question} from "../Question";
import {QuizButtonType} from "../../enums/quiz-button-type.enum";
import {useQuestions} from "../../api/questions";
import "../Quiz/quiz.scss"

function Quiz() {
    const {questions, loading, error} = useQuestions();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const {toggleVisible, toggleMessage} = useAlert();
    const {playerInfo, updatePlayerInfo} = usePlayer();
    const navigate = useNavigate();
    const goWinner = () => navigate("winner", {replace: true, state: {questions}});

    // if (questions.length === 0) {
    //     return null;
    // }
    const initialQuestion = questions[currentQuestion];

    function warningMessage() {
        if (playerInfo.answers[currentQuestion] !== undefined) return;
        toggleMessage("You left the question unanswered. But you can come back and give an answer.");
        toggleVisible();
    }


    function updatePoints() {
        let tempPoints = 0;
        for (const index in questions) {
            if (questions[index].correct_answer === playerInfo.answers[index]) {
                tempPoints += 10;
            }
        }

        if (playerInfo.points !== tempPoints) {
            updatePlayerInfo({...playerInfo, points: tempPoints});

        }
    }

    function changeQuestion(e: React.MouseEvent<HTMLButtonElement>, type: QuizButtonType) {
        e.preventDefault();

        if (type === QuizButtonType.Prev) {
            if (currentQuestion === 0) return;
            setCurrentQuestion(prev => prev - 1);
            playerInfo.answers[currentQuestion - 1] = "";
        } else {
            updatePoints();
            if (currentQuestion === questions.length - 1) {
                return goWinner();
            }
            setCurrentQuestion(prev => prev + 1);
        }
        return updatePoints();
    }

    return (
        <div className="quiz">
            {loading && <div className="quiz__loader">
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>}
            {error && <div className="quiz__error">Error..</div>}
            {questions.length !==0 &&
                <div className="quiz__main">
                {/*<div>{playerInfo.points} - {playerInfo.answers[currentQuestion]}</div>*/}
                <button className="quiz__main-item quiz__main-btn" onClick={(e) => {
                    changeQuestion(e, QuizButtonType.Prev);
                    warningMessage();
                }}>&lt; Previous
                </button>
                <div className="quiz__main-item quiz__main-question">
                    {questions &&
                        <Question key={`question-${currentQuestion}`} question={initialQuestion} id={currentQuestion}/>}
                </div>
                <button className="quiz__main-item quiz__main-btn" onClick={(e) => {
                    warningMessage();
                    changeQuestion(e, QuizButtonType.Next);
                }}>
                    {currentQuestion !== questions.length - 1 ? "Next" : "Submit"}
                </button>
            </div>}

        </div>
    )
}

export {Quiz};

