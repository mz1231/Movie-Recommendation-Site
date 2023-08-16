import React, { useState } from "react";


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

        //making request to server
        const response = await fetch("http://localhost:9000/testAPI", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: selectedServices }) 
        });
        if (response.ok) {
            const data = await response.json();
            setMovieData(data); // Update state with movie data
          } 

    };

    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <p>Select Streaming Service:</p>
                <label>
                    Netflix: <input type="checkbox" name="Netflix" />
                </label>
                <label>
                    Hulu: <input type="checkbox" name="Hulu" />
                </label>
                <label>
                    Apple TV: <input type="checkbox" name="Apple TV" />
                </label>
                <button type="submit">Submit form</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>

            <div className='flex-container'>
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





