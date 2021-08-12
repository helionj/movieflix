package com.devsuperior.movieflix.dto;

import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;

public class MovieDTOGenre extends MovieDTO{


	private static final long serialVersionUID = 1L;
	
	private GenreDTO genre;
	
	public MovieDTOGenre() {}

	public MovieDTOGenre(Long id, String title, String subTitle, Integer year, String imgUrl, String synopsis, Genre genre) {
		super(id, title, subTitle, year, imgUrl, synopsis);
		this.genre = new GenreDTO(genre);
		
	}

	public MovieDTOGenre(Movie entity) {
		super(entity);
		genre = new GenreDTO(entity.getGenre());
	}

	public GenreDTO getGenre() {
		return genre;
	}

	public void setGenre(GenreDTO genre) {
		this.genre = genre;
	}
	
	

}
