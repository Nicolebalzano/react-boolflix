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
 
      const getStar = (voteAverage) => {
   const fullStarsCount =  Math.round(voteAverage / 2)
    return Array.from({length : 5}, (star, index) => (
      index < fullStarsCount ? 
        <i key={index} className="fa-solid fa-star"></i> : 
      <i key={index} className="fa-regular fa-star"></i>
    ))
  }

  
return (
 <>
      <header className="d-flex bg-dark justify-content-between align-items-center sticky-top">
        <h1 className="text-danger mx-4">BOOLFLIX</h1>
    <div className="nav-bar d-flex"><input type="search" placeholder="Cerca il film..."
    value={search}
    onChange={(e) =>setSearch(e.target.value)}
    className="form-control mx-1"/>
    <button onClick={fetchMovies} className="btn btn-outline-danger">Cerca</button></div></header> 
    <div className="row row-cols-5 d-flex mt-5 align-items-stretch justify-content-center">
{[...dataSeries, ...dataMovie].map((curData, index) => (
    <div className="col m-1" key={index}>
      <div className="card">
      <img src={curData.backdrop_path ? `https://image.tmdb.org/t/p/w1280/${curData.backdrop_path}` : "images-placeholder.png"} alt="Immagine copertina" className="object-fit-cover img-fluid  h-100"/>
            <div className="card-info">
              <h3 >Titolo:{curData.title} {curData.name}</h3>
            <h4>Titolo Originale:{curData.original_title}  {curData.original_name}</h4>
<h5>
  Lingua Originale: {curData.original_language === "en" ? (
    <img src="american-flag.jpeg" className="lang-flag" alt="Bandiera Americana" />
  ) : curData.original_language === "it" ? (
    <img src="italian-flag.jpeg" className="lang-flag" alt="Bandiera Italiana" />
  ) : (
    curData.original_language
  )}
</h5>
            <p>Votazione: {getStar(curData.vote_average)} </p>
          </div>
            </div>
          
            </div>   
        ))} </div> 
   

</>
)

}

export default AppHome 