import axios from "axios";
import { options } from '../utils/constant';
import { useDispatch } from "react-redux";
import { getTrailerMovie } from '../redux/movieSlice';
import { useEffect } from "react";


const useMovieById = async (movieId) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getMovieById = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options);

        console.log(res.data.results);
        const trailer = res?.data?.results?.filter((item) => {
          return item.type === "Trailer";
        })
        // Filters the video results to extract only those of type "Trailer". Could be multiple, so it returns an array.
        dispatch(getTrailerMovie(trailer.length > 0 ? trailer[0] : res.data.results[0]));
        //Dispatches an action to save the trailer to Redux state:
// If a trailer exists, use the first trailer.
// If no trailer is found, fallback to the first video in the list.


      } catch (error) {
        console.log(error);
      }
    }
    getMovieById();
  },[])

}

export default useMovieById;