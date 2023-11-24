import {ICategory} from "../models";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";

interface ICategories {
    trivia_categories: ICategory[],
    loading: boolean,
    error: string
}

export function useCategory(): ICategories {
    const [trivia_categories, setTrivia_categories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const apiUrl = "https://opentdb.com/api_category.php";

    async function fetchCategories(url: string) {

        try {
            setError("");
            setLoading(true);

            const response = await axios.get(url);
            setTrivia_categories(response.data.trivia_categories);

            setLoading(false);
        } catch (e) {
            const error = e as AxiosError;

            setLoading(false);
            setError(error.message);

            setTrivia_categories([]);
        }
    }

    useEffect(() => {
        fetchCategories(apiUrl).then(response => response);
    }, []);


    return {trivia_categories, loading, error};

}
