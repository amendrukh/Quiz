import axios from "axios";
import {IQuestion} from "../models";

export async function getData(question:IQuestion[], setQuestion:any) {
        try {
            const response = await axios.get("https://opentdb.com/api.php?amount=10");
            setQuestion(response.data.results)
            console.log(question)
            console.log(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке вопросов:", error);
        }
}