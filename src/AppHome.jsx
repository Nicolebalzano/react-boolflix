import axios from "axios"
import { useState, useEffect } from "react"
const AppHome = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [search, setSearch] = useState("");
    const [dataMovie, setDataMovie] = useState([]);
      const [dataSeries, setDataSeries] = useState([]);
     const fetchMovies =() => {
        if (!search.trim()) return;
        Promise.all([ axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`),
            axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${search}`)
        ]).then(([response1, response2]) => {
             const dataMovieList = response1.data.results;
            setDataMovie(dataMovieList)
            const dataSeriesList = response2.data.results;
            setDataSeries(dataSeriesList)})
        }
           
      
    useEffect(() => {
        if(search.trim()){
             fetchMovies()
        }
      
    }, [])
    
   
return (
    <div className="container mt-3">
    <input type="text" placeholder="Cerca il film..."
    value={search}
    onChange={(e) =>setSearch(e.target.value)}/>
    <div >    <button onClick={fetchMovies}>Cerca</button>
    <div className="d-flex justify-content-between flex-wrap m-3">
{[...dataSeries, ...dataMovie].map((curData, index) => (
    <div className="card col-3" key={index}>
      <img src={curData.backdrop_path ? `https://image.tmdb.org/t/p/w342/${curData.backdrop_path}` : "images-placeholder.png"} alt="Immagine copertina" />
            <h3 >Titolo:{curData.title} || {curData.name}</h3>
            <h4>Titolo Originale:{curData.original_title} || {curData.original_name}</h4>
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
        ))}</div>
    </div>

    </div>
)

}

export default AppHome 