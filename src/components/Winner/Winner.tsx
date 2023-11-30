import React, {ReactNode, useState} from "react";
import {usePlayer} from "../../player/playerContext";
import {heDecoder} from "../../utils/decoder";
import {IQuestion} from "../../models";
import {useLocation} from "react-router-dom";
import "./winner.scss"

function Winner() {
    const location = useLocation();
    const questions = location.state?.questions;
    const {playerInfo} = usePlayer();
    const [isActive, setIsActive] = useState(false);

    function generateStatePlayer(points: number) {
        switch (points) {
            case 100:
            case 90:
                return (
                    <div>
                        <div>Congrats!</div>
                        <div>{points}% Score</div>
                        <div>Your exceptional score of {points} points truly showcases
                            your knowledge and skills. Keep up the excellent work!"
                        </div>
                    </div>
                )

            case 80:
            case 70:
                return (
                    <div>
                        <div>Congrats!</div>
                        <div>{points}% Score</div>
                        <div>Your dedication is evident, and I encourage you to continue striving for success in future
                            endeavors.
                        </div>
                    </div>
                )
            case 60:
            case 50:
                return (
                    <div>
                        <div>Congratulations on achieving a passing grade!</div>
                        <div>{points}% Score</div>
                        <div>Your commitment has paid off, and you've reached a commendable milestone. Keep building on
                            this
                            foundation for even greater achievements.
                        </div>
                    </div>
                )
            default:
                return (
                    <div className={!isActive ? "winner__main-el info active" : "winner__main-el info"}>
                        {!isActive &&
                            <>
                                <div className="info__item info__title">Too bad!</div>
                                <div className="info__item info__score"><span>{points}%</span> Score</div>
                                <div className="info__item info__desc">
                                    <p>While the result is below the passing threshold, remember that every experience
                                        is an
                                        opportunity to learn and improve. </p>
                                    <p>Take this as a stepping stone for growth, and best of luck in your
                                        future endeavors. </p>
                                    <p>You have the potential to overcome challenges and succeed!</p>
                                </div>
                                <div className="info__item info__progress">You
                                    attempt <span>{questions.length} questions</span> and from
                                    that <span>{playerInfo.points / 10} answer</span> is correct.
                                </div>
                            </>}
                    </div>
                )
        }
    }


    return (
        <div className="winner container">
            <div className="winner__main">
                {generateStatePlayer(playerInfo.points)}
                <div className={isActive ? "winner__main-el quizStory active" : "winner__main-el quizStory"}>
                    {isActive && questions.map((el: IQuestion, index: number): ReactNode => (
                        <div className="quizStory__story-desc story" key={`question_${index}`}>
                            <div className="story__question">{heDecoder(el.question)}</div>
                            <div className="story__checkAnswers checkAnswers">
                                <div className="story__checkAnswers-item checkAnswers__correct">Correct
                                    answer: {heDecoder(el.correct_answer)}</div>
                                <div className="story__checkAnswers-item checkAnswers__player">
                                    {playerInfo.answers[index] === undefined ? "You did not answer the question " : `Player answer: ${playerInfo.answers[index]}`}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="winner__main-el infoBtn">
                    <button className="btn"
                            onClick={() => setIsActive(prev => !prev)}>{isActive ? "Close" : "Show"}</button>
                </div>
            </div>

        </div>
    )
}

export {Winner};