import { AxiosRequestConfig } from 'axios';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Movie } from 'types/movie';
import { Review } from 'types/review';
import { hasAnyRoles } from 'util/auth';
import { requestBackend } from 'util/requests';
import EmptyCard from './EmptyCard';
import MovieDetailCard from './MovieDetailCard';
import ReviewCard from './ReviewCard';
import { toast } from 'react-toastify';
import './styles.css';

type UrlParams = {
  movieId: string;
};

type FormData = {
  text: string;
};

const MovieDetails = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const { movieId } = useParams<UrlParams>();
  const [reviews, setReviews] = useState<Review[]>();
  const [isNewReview, setIsNewReview] = useState(false);
  const [movie, setMovie] = useState<Movie>();

  const getMovie = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setReviews(response.data);
    });
  }, [movieId, isNewReview]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  const onSubmit = (formData: FormData) => {
    setIsNewReview(false);

    const data = {
      movieId: movieId,
      ...formData,
    };
    console.log(data);

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      withCredentials: true,
      data,
    };

    requestBackend(params)
      .then(() => {
        setIsNewReview(true);
        setValue('text', '');
        toast.info('Sua avaliação foi salva com sucesso.');
      })
      .catch((error) => {
        toast.error('Não é permitido avaliações em branco!');
      });
  };

  return (
    <div className="movie-details-container">
      <div className="movie-details-container-content">
        <MovieDetailCard movie={movie} />

        {hasAnyRoles(['ROLE_MEMBER']) && (
          <div className="form-movie-details base-card">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  {...register('text', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className="form-control base-input"
                  placeholder="Deixe aqui a sua avaliação"
                  name="text"
                />
                <div className="invalid-feedback d-block">
                  {errors.text?.message}
                </div>
              </div>

              <div className="review-submit">
                <button className="btn btn-primary">
                  <h5>Salvar avaliação</h5>
                </button>
              </div>
            </form>
          </div>
        )}
        {reviews === undefined || reviews.length === 0 ? (
          <EmptyCard />
        ) : (
          <div className="card-list-review base-card">
            {reviews?.map((item) => (
              <ReviewCard
                user={item.user.name}
                review={item.text}
                key={item.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
