import React from 'react';
import ReviewCard from './ReviewCard';


const Review = () => {
  return  (
  <div>
	<div className='container'>
	<div className="col orange lighten-4 z-depth-1">
	<div className="row ">
		<div className='col s6'>
			<h1 className='girlNextDoor'>Nome</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</div>
		<div className='col s6'>
			<img alt='City' className='responsive-img'src="https://www.urbanarts.com.br/imagens/produtos/026863/0/Ampliada/paisagem.jpg" />    	    
		</div>
	</div>
	</div>


	<ReviewCard />
	
	</div>


	<footer className="page-footer orange lighten-3">
		<div className="container">
		    <h5 className="black-text">Leave your Review</h5>
            <div className="black-text input-field">
				<textarea id="textarea1" className="black-text materialize-textarea"></textarea>
	          	<label className='black-text' for="textarea1">My opnion</label>
        	</div>
			<div className="input-field col reviewStars">
  				<select className="browser-default orange lighten-4">
				    <option value="1">★</option>
				    <option value="2">★★</option>
				    <option value="3">★★★</option>
				    <option value="4">★★★★</option>
					<option value="5">★★★★★</option>
				  </select>
			</div>
        	<button className="btn deep-orange darken-4 z-depth-5 waves-effect waves-light" type="submit" name="action">review</button>	    	
	    </div>
    	<div className="footer-copyright"></div>
    </footer> 



  </div>
    );
}

export default Review;