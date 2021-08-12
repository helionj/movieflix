package com.devsuperior.movieflix.dto;

import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;

public class ReviewDTOResponse extends ReviewDTO{


	private static final long serialVersionUID = 1L;
	
	private UserDTO user;
	
	public ReviewDTOResponse() {}


	
	public ReviewDTOResponse(Long id, String text, Long movieId, User user) {
		super(id, text, movieId);
		this.user = new UserDTO(user);
	}



	public ReviewDTOResponse(Review entity) {
		super(entity);
		setUser(new UserDTO(entity.getUser()));
	}


	public UserDTO getUser() {
		return user;
	}


	public void setUser(UserDTO user) {
		this.user = user;
	}
	
	

}
