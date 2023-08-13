import React, { Component } from "react";

const Form = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        
        
        const selectedServices = [];
        for (const key of formData.keys()) {
            selectedServices.push(key);
        }

        //making request to server
        fetch("http://localhost:9000/testAPI", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: selectedServices }) 
        })
        .then(res => res.text())
        .then(res => console.log({ apiResponse: res }));

    };

    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <p>Select Streaming Service:</p>
                <label>
                    Netflix: <input type="checkbox" name="Netflix"/>
                </label>
                <label>
                    Hulu: <input type="checkbox" name="Hulu"/>
                </label>
                <label>
                    AppleTV: <input type="checkbox" name="AppleTV"/>
                </label>
                <button type="submit">Submit form</button>
            </form>
        </>
    );
};

export default Form;





