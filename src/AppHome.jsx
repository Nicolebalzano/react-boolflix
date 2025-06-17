import axios from "axios"
import { useState, useEffect } from "react"
const AppHome = () => {
    const apiKey = import.meta.env.VITE_API_URL;
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`)
        .then((resp) => console.log(resp))
    }, [])


}

export default AppHome 