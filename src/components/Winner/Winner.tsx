import React, {ReactNode, useState} from "react";
import {usePlayer} from "../../player/playerContext";
import {heDecoder} from "../../utils/decoder";
import {IQuestion} from "../../models";
import {useLocation} from "react-router-dom";
import "./winner.scss"
import {useRef, useEffect} from "react";
import PerfectScrollbar from "perfect-scrollbar";


function Winner() {
    const location = useLocation();
    const questions = location.state?.questions;
    const {playerInfo} = usePlayer();
    const [isActive, setIsActive] = useState(false);



    const scrollContainerRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        if (scrollContainerRef.current) {
            const ps = new PerfectScrollbar(scrollContainerRef.current, {
                suppressScrollX: true,
                wheelSpeed: 0.5
            });

            return () => {
                ps.destroy();
            };
        }
    }, []);


    function generateStatePlayer(points: number) {
        switch (points) {
            case 100:
            case 90:
                return (
                    <div className={!isActive ? "winner__main-el info active" : "winner__main-el info"}>
                        {!isActive &&
                            <>
                                <div className="info__item info__title">Congrats!</div>
                                <div className="info__item info__score">{points}% Score</div>
                                <div className="info__item info__desc">
                                    <p>Your exceptional score of {points} points truly showcases
                                        your knowledge and skills. Keep up the excellent work!"</p>
                                </div>
                            </>}
                    </div>
                )

            case 80:
            case 70:
                return (
                    <div className={!isActive ? "winner__main-el info active" : "winner__main-el info"}>
                        {!isActive &&
                            <>
                                <div className="info__item info__title">Congrats!</div>
                                <div className="info__item info__score">{points}% Score</div>
                                <div className="info__item info__desc">
                                    <p>Your dedication is evident, and I encourage you to continue striving for success
                                        in future
                                        endeavors.</p>
                                </div>
                            </>}
                    </div>
                )
            case 60:
            case 50:
                return (
                    <div className={!isActive ? "winner__main-el info active" : "winner__main-el info"}>
                        {!isActive &&
                            <>
                                <div className="info__item info__title">Congratulations on achieving a passing grade!
                                </div>
                                <div className="info__item info__score">{points}% Score</div>
                                <div className="info__item info__desc">
                                    <p>Your commitment has paid off, and you've reached a commendable milestone.</p>
                                    <p>Keep building on
                                        this
                                        foundation for even greater achievements.</p>
                                </div>
                            </>}
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

    const playerAnswerStyle = (correctAnswer: string, playerAnswer: string) => {
        console.log(playerAnswer)
        return {
            color: correctAnswer === playerAnswer ? "#004643" : "#e11e1e",
            fontSize: playerAnswer === undefined ? '2rem' : '1rem',
        }
    };


    return (
        <div className="winner container">
            <div className="winner__main">
                {generateStatePlayer(playerInfo.points)}
                <div ref={scrollContainerRef} style={{maxHeight: "450px", overflow: 'auto'}}
                     className={isActive ? "winner__main-el quizStory active" : "winner__main-el quizStory"}>
                    <div className="quizStory__title">Quiz Story</div>
                    {isActive && questions.map((el: IQuestion, index: number): ReactNode => (
                        <div className="quizStory__story-desc story" key={`question_${index}`}>
                            <div className="story__question">{heDecoder(el.question)}</div>
                            <div className="story__checkAnswers checkAnswers">
                                <div
                                    className="story__checkAnswers-item checkAnswers__correct">{heDecoder(el.correct_answer)}</div>
                                <div style={playerAnswerStyle(el.correct_answer, playerInfo.answers[index])}
                                     className="story__checkAnswers-item checkAnswers__player">
                                    {playerInfo.answers[index] === undefined ? "—" : `${playerInfo.answers[index]}`}
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