import axios from "axios"
import { useState, useEffect } from "react"
const AppHome = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
     const fetchMovies =() => {
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`)
        .then((resp) => {
            const dataList = resp.data.results;
            setData(dataList)})
        }
    useEffect(() => {
       fetchMovies()
    }, [])
   
return (
    <>
    <input type="text" placeholder="Cerca il film..."
    value={search}
    onChange={(e) =>setSearch(e.target.value)}/>
    <div>    <button onClick={fetchMovies}>Cerca</button>
{data.map((curData, index) => (
    <div key={index}>
            <h3 >Titolo:{curData.title}</h3>
            <h4>Titolo Originale:{curData.original_title}</h4>
<h5>
  Lingua Originale: {curData.original_language === "en" ? (
    <img src="american-flag.jpeg" className="lang-flag" alt="Bandiera Americana" />
  ) : curData.original_language === "it" ? (
    <img src="italian-flag.jpeg" className="lang-flag" alt="Bandiera Italiana" />
  ) : (
    curData.original_language
  )}
</h5>
            <p>Votazione: {curData.vote_average}</p>
            </div>
        ))}
    </div>

    </>
)

}

export default AppHome 