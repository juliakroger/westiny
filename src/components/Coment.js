import React from 'react';

const Coment = () => {
	return (
		<div className="coment">
		<div className="container">
		    <h5 className="black-text">Leave your Review</h5>
            <div className="black-text input-field">
				<textarea id="textarea1" className="black-text materialize-textarea"></textarea>
	          	<label className='black-text' htmlFor="textarea1">My opnion</label>
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
    	</div>
	);
}


export default Coment;