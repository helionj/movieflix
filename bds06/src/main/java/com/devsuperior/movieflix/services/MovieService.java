package com.devsuperior.movieflix.services;

import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.MovieDTOGenre;
import com.devsuperior.movieflix.dto.ReviewDTOResponse;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.repository.MovieRepository;
import com.devsuperior.movieflix.repository.ReviewRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class MovieService {

	@Autowired
	private MovieRepository repository;
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Transactional(readOnly = true)
	public Page<MovieDTO>find(Long genreId, Pageable pageable){
		
		Page<Movie> page = repository.find(genreId, pageable);
		return page.map(x -> new MovieDTO(x));
	}
	
	@Transactional(readOnly = true)
	public MovieDTOGenre findById(Long id) {
		Optional<Movie> obj = repository.findById(id);
		Movie entity = obj.orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado"));
		return new MovieDTOGenre(entity);
		
	}
	
	@Transactional(readOnly = true)
	public List<ReviewDTOResponse> findReviwesByMovie(Long movieId) {
		List<Review> list = reviewRepository.findReviewsByMovie(movieId);
		return list.stream().map(x -> new ReviewDTOResponse(x)).collect(Collectors.toList());	
	}
}
