import { useEffect, useState } from "react";
import MoviesList from "./components/MoviesList";
import './App.css'
import SkeletonLoader from './loading-skeleton/SkeletonLoader'
import AddMovie from './components/AddMovie'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formIsShown, setFormIsShown] = useState(false)

  useEffect(()=>{
    fetchMovies()
  },[])
async function fetchMovies() {
      setIsLoading(true)
      setError(null)
  try {
      const response = await fetch('https://reactnote-b8c86-default-rtdb.firebaseio.com/movies.json')
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
        const data = await response.json()
         const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies)  
     
  } catch (error) {
    setError(error.message)
  }

  setIsLoading(false)
}
async function addMoviesHandler(movie) {
  await fetch('https://reactnote-b8c86-default-rtdb.firebaseio.com/movies.json',{
    method: 'POST',
    body: JSON.stringify(movie)
  });
  // const data = await res.json();
  // console.log(data);
  setFormIsShown(false)
  fetchMovies()

}

  let content = <p>No Notes Found</p>

if (movies.length > 0) {
  content = <MoviesList movies={movies} />
}
if (error) {
  content = <p>{error}</p>
}
if (isLoading) {
  content = <SkeletonLoader />
}
function showMovieform() {
  setFormIsShown(prevCheck => !prevCheck)
}

  return (
        <>
          <h1>React Notes</h1>
          {formIsShown && <section className="dark--bg"> <AddMovie onAddMovie={addMoviesHandler} /> </section>}
          
          <section className="contents">{content}</section>
          <div className="ReLoad">
            <button onClick={fetchMovies}>↺</button>
          </div>
          <div className="addBtn">
            <button onClick={showMovieform}> + </button>
          </div>
          <div className="copyright">By 
            <a href="https://github.com/fahimeshti">@fahimeshti</a>
          </div>
        </>
  );
}

export default App;
