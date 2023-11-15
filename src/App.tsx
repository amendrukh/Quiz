import React, {useState} from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import {Layout} from "./components/Layout";
import {HomePage} from "./components/HomePage";
import {useQuestions} from "./api/questions";
import {Registration} from "./components/Registration";
import {Quiz} from "./components/Quiz";
import {Winner} from "./components/Winner";
import {NotFoundPage} from "./components/NotFoundPage";
import {AlertProvider} from "./alert/AlertContext";
import {Alert} from "./alert/Alert";
import {PlayerProvider, usePlayer} from "./player/playerContext";
import {Category} from "./components/Category";

function App() {
    // const {questions, loading, error} = useQuestions();

    // if (questions.length === 0) {
    //     return null;
    // }

    return (
        <div>
            <AlertProvider>
                <Alert/>
                {/*{loading && <div>Loading...</div>}*/}
                {/*{error && <div>Error</div>}*/}
                <PlayerProvider>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<HomePage/>}/>
                            <Route path="registration"
                                   element={<Registration/>}/>
                            <Route path="quiz" element={<Quiz/>}></Route>
                            {/*<Route path="quiz/winner" element={<Winner questions={questions}/>}></Route>*/}
                            <Route path="*" element={<NotFoundPage/>}/>
                            <Route path="category" element={<Category/>}></Route>
                        </Route>
                    </Routes>
                </PlayerProvider>
            </AlertProvider>
        </div>
    );
}

export default App;
