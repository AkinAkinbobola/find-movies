import {Search} from "lucide-react";

const SearchBar = () => {
    return (
        <div className={"flex-grow bg-white rounded-md"}>
            <div className={"flex py-3 px-2 gap-2"}>
                <Search/>
                <input type={"text"} className={"bg-white w-full outline-none"} placeholder={"Search FindMovies"}/>
            </div>
        </div>
    );
};

export default SearchBar;