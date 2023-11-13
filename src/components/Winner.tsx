import React, {ReactNode, useState} from "react";
import {usePlayer} from "../player/playerContext";
import {heDecoder} from "../utils/decoder";
import {IQuestion, IQuiz} from "../models";

function Winner({questions}: IQuiz) {
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
                    <div>
                        <div>Too bad!</div>
                        <div>{points}% Score</div>
                        <div>While the result is below the passing threshold, remember that every experience is an
                            opportunity
                            to learn and improve. Take this as a stepping stone for growth, and best of luck in your
                            future
                            endeavors. You have the potential to overcome challenges and succeed
                        </div>
                    </div>
                )
        }
    }

    return (
        <>
            {generateStatePlayer(playerInfo.points)}
            <div>You attempt {questions.length} questions and from that {playerInfo.points / 10} answer is correct.
                <button onClick={() => setIsActive(prev => !prev)}>{isActive ? "Close" : "Show"}</button>
            </div>
            {isActive && questions.map((el: IQuestion, index: number): ReactNode => (
                <div key={`question_${index}`}>
                    <div>{heDecoder(el.question)}</div>
                    <div>
                        <div>Correct answer: {heDecoder(el.correct_answer)}</div>
                        <div>
                            {playerInfo.answers[index] === undefined ? "You didn`t answer the question " : `Player answer: ${playerInfo.answers[index]}`}
                        </div>

                    </div>
                </div>
            ))}
        </>
    )
}

export {Winner};