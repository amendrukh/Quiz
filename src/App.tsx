import React from 'react';
import './styles/App.scss';
import {Routes, Route} from "react-router-dom";
import {Layout} from "./components/Layout";
import {HomePage} from "./components/HomePage/HomePage";
import {Registration} from "./components/Registration/Registration";
import {Quiz} from "./components/Quiz";
import {NotFoundPage} from "./components/NotFoundPage";
import {AlertProvider} from "./alert/AlertContext";
import {Alert} from "./alert/Alert";
import {PlayerProvider} from "./player/playerContext";
import {Category} from "./components/Category/Category";
import {Winner} from "./components/Winner";

function App() {
    return (
        <div className="App">
            <AlertProvider>
                <Alert/>
                <PlayerProvider>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<HomePage/>}/>
                            <Route path="registration"
                                   element={<Registration/>}/>
                            <Route path="quiz" element={<Quiz/>}></Route>
                            <Route path="quiz/winner" element={<Winner/>}></Route>
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
