import { Movie } from 'types/movie';
import './styles.css';

type Props = {
  movie?: Movie;
};

const MovieDetailCard = ({ movie }: Props) => {
  return (
    <div className="movie-detail-card-container base-card">
      <div className="movie-detail-card-image-container">
        <img src={movie ? movie.imgUrl : ''} alt={movie ? movie.title : ''} />
      </div>
      <div className="movie-detail-card-info-container">
        <h1 className="movie-detail-card-info-container-title">
          {movie ? movie.title : ''}
        </h1>
        <h2 className="movie-detail-card-info-container-year">
          {movie ? movie.year : ''}
        </h2>
        <p className="movie-detail-card-info-container-subtitle">
          {movie ? movie.subTitle : ''}
        </p>
        <div className="movie-detail-card-synopsis">
          <p>{movie ? movie.synopsis : ''}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailCard;
