import { Movie } from 'types/movie';
import './styles.css'
type Props = {
    movie: Movie
}
const MovieCard = ({movie}: Props) => {
    return (
        <div className= "movie-card-container base-card">
            <div className= "movie-card-image-container">
              <img src={movie.imgUrl} alt={movie.title} />
            </div>
            <div className="movie-card-info-container">
                <h1>{movie.title}</h1>
                <h2>{movie.year}</h2>
                <p>{movie.subTitle}</p>
            </div>
        </div>
    ); 
}

export default MovieCard;