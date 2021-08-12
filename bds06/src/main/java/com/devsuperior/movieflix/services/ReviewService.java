package com.devsuperior.movieflix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.dto.ReviewDTOResponse;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repository.MovieRepository;
import com.devsuperior.movieflix.repository.ReviewRepository;

@Service
public class ReviewService {
	
	@Autowired
	private ReviewRepository repository;
	
	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	private AuthService authService;
	
	
	@Transactional
	public ReviewDTOResponse insert(ReviewDTO dto) {
		Review entity = new Review();
		Movie movie = movieRepository.getOne(dto.getMovieId());
		User user = authService.authenticated();
		entity.setMovie(movie);
		entity.setText(dto.getText());
		entity.setUser(user);
		entity = repository.save(entity);
		return new ReviewDTOResponse(entity);
	}
	
	
	
	

}
