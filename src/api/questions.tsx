import axios, {AxiosError} from "axios";
import {IQuestion} from "../models";
import {useEffect, useState} from "react";

interface IQuestions {
    questions: IQuestion[],
    loading: boolean,
    error: string
}

export function useQuestions(): IQuestions {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchQuestions() {
        try {
            setError("");
            setLoading(true);
            const response = await axios.get("https://opentdb.com/api.php?amount=10");
            console.log(response)
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
        fetchQuestions().then(response => response)
    }, [])

    return {questions, loading, error}
}