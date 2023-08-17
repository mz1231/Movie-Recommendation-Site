import React, { useState } from "react";
import axios from 'axios'
import "../css/Form.css"

function Form(){
    const [movieData, setMovieData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        
        
        const selectedServices = [];
        for (const key of formData.keys()) {
            selectedServices.push(key);
        }
        if (selectedServices.length === 0) {
            setErrorMessage("Select a service before clicking submit");
            return;
        }
        else {
            setErrorMessage("");
        }

        const selectedGenres = [];
        for (const key of formData.keys()) {
        if (key !== 'Netflix' && key !== 'Hulu' && key !== 'Apple TV') {
            selectedGenres.push(key);
        }
        }

        //making request to server
        try {
            // Making request to server using Axios
            const response = await axios.post("http://localhost:9000/testAPI", {
                services: selectedServices,
                genres: selectedGenres,
            });
            if (response.status === 200) {
              const data = response.data;
              setMovieData(data); // Update state with movie data
            }
        } 
        catch (error) {
            console.error("Error:", error);
        }

    };

    return (
        <>
            <div className="form-container">
                <form method="post" onSubmit={handleSubmit} className="styled-form">
                    <p>Select Streaming Service:</p>
                    <label className="service-label">
                        <input type="checkbox" name="Netflix" /> Netflix 
                    </label>
                    <label className="service-label">
                        <input type="checkbox" name="Hulu" /> Hulu
                    </label>
                    <label className="service-label">
                        <input type="checkbox" name="Apple TV" /> Apple TV
                    </label>

                    <p>Select Genres:</p>
                    <label className="genre-label">
                        <input type="checkbox" name="Action" /> Action
                    </label>
                    <label className="genre-label">
                        <input type="checkbox" name="Comedy" /> Comedy
                    </label>
                    <label className="genre-label">
                        <input type="checkbox" name="Drama" /> Drama
                    </label>

                    <button type="submit" className="submit-button">
                    Submit
                    </button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
            </div>

            <div className='flex-container App'>
                {movieData.map((item) =>
                <div className="movie_item">
                    <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} />
                    <div className="movie_name">
                        {item.original_title ? item.original_title : item.original_name}

                    </div>
                </div>
                )}
            </div>
            

        </>
    );
};

export default Form;





