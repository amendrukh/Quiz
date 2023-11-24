import {usePlayer} from "../../player/playerContext";
import {useLocation, useNavigate} from "react-router-dom";
import {useCategory} from "../../api/category";
import Select from 'react-select';
import AsyncSelect from "react-select/async";

interface IOption {
    label: string;
    value: string;
}

export function Categories() {
    const {trivia_categories} = useCategory();
    const {updateCategory} = usePlayer();
    const location = useLocation();
    const isLogin = location.state?.player;

    const navigate = useNavigate();
    const goQuiz = () => navigate("/quiz", {replace: true});

    // const [...options]: IOption[] = trivia_categories.map(item => ({
    //     label: item.name,
    //     value: item.id.toString()
    // }));
    //
    // const defaultOption = options.map((item, index) => {
    //     if (index === 0) {
    //         return item.label
    //     }
    // })
    // console.log(defaultOption[0])
    //
    //
    // const handleChange = (option: IOption | null) => {
    //     if (option)
    //         updateCategory(option?.value);
    //
    // }
    //
    // if (options.length === 0) {
    //     return null;
    // }
    //
    // return (
    //     <>
    //         <Select options={options} onChange={handleChange}/>
    //         {isLogin &&
    //             <button onClick={goQuiz}>Start game</button>}
    //     </>
    // )
    if (trivia_categories.length === 0) {
            return null;
        }

    const loadOption = (searchValue: string, callback: (options: IOption[]) => void) => {
        const [...options]: IOption[] = trivia_categories.map(item => ({
            label: item.name,
            value: item.id.toString()
        }));

        const filterCategory = (inputValue: string) => {
            return options.filter((i) =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
        };
        callback(filterCategory(searchValue));
    }

    return (
        <>
            <AsyncSelect loadOptions={loadOption} defaultOptions/>
        </>
    )
}