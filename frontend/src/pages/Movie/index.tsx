import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import MovieCard from './MovieCard';
import MovieFilter, { GenreFilterData } from './MovieFilter';
import './styles.css';

type ControlComponentsData = {
  activePage: number;
  filterData: GenreFilterData;
};
const Movies = () => {
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: {
        genre: null,
      },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const [page, setPage] = useState<SpringPage<Movie>>();

  const handleSubmitFilter = (data: GenreFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/movies',
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: controlComponentsData.filterData.genre?.id,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);
  return (
    <div className="movie-container">
      <div className="movie-container-content">
        <div className="movie-filter">
          <MovieFilter onSubmitFilter={handleSubmitFilter} />
        </div>

        <div className="row">
          {page?.content.map((item) => (
            <div
              key={item.id}
              className="col-sm-6 col-xl-3 movie-list-container"
            >
              <Link to={`/movies/${item.id}/reviews`}>
                <MovieCard movie={item} />
              </Link>
            </div>
          ))}
        </div>
        <div className="movie-pagination">
          <Pagination
            forcePage={page?.number}
            pageCount={page ? page?.totalPages : 0}
            range={3}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
