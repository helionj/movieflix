package com.devsuperior.movieflix.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.MovieDTOGenre;
import com.devsuperior.movieflix.dto.ReviewDTOResponse;
import com.devsuperior.movieflix.services.MovieService;

@RestController
@RequestMapping(value= "/movies")
public class MovieController {
	
	@Autowired
	private MovieService service;
	
	@GetMapping
	public ResponseEntity<Page<MovieDTO>> findByGenre(Pageable pageable, 
			@RequestParam(value ="genreId", defaultValue = "0")Long genreId){
		
		Page<MovieDTO> list = service.find(genreId, pageable);
		return ResponseEntity.ok(list);
		
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<MovieDTOGenre> findById(@PathVariable Long id){
		
		MovieDTOGenre dto = service.findById(id);
		return ResponseEntity.ok(dto);
		
	}
	
	@GetMapping(value = "/{id}/reviews")
	public ResponseEntity<List<ReviewDTOResponse>>findReviewsByMovie(@PathVariable Long id){
		List<ReviewDTOResponse> dtos = service.findReviwesByMovie(id);
		return ResponseEntity.ok(dtos);
		
	}

}
