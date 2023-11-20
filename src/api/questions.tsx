import axios, {AxiosError} from "axios";
import {IQuestion} from "../models";
import {useEffect, useState} from "react";
import {usePlayer} from "../player/playerContext";

interface IQuestions {
    questions: IQuestion[],
    loading: boolean,
    error: string
}

export function useQuestions(): IQuestions {
    const {category} = usePlayer();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const apiUrl = category === undefined ? `https://opentdb.com/api.php?amount=10`
        : `https://opentdb.com/api.php?amount=10&category=${category}`;

    async function fetchQuestions(url:string) {

        try {
            setError("");
            setLoading(true);

            const response = await axios.get(url);

            setQuestions(response.data.results)
            setLoading(false);

        } catch (e) {
            const error = e as AxiosError;

            setLoading(false);
            setError(error.message);
            setQuestions([])
        }
    }

    useEffect(() => {
            fetchQuestions(apiUrl).then(response => response);
    }, [])

    return {questions, loading, error}
}