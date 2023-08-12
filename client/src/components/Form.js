import React, { Component } from "react";

const Form = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        //making request to server
        fetch("http://localhost:9000/testAPI", { method: form.method, body: formData })
          .then(res => res.text())
          .then(res => console.log({ apiResponse: res }));

    };

    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <p>Select Streaming Service:</p>
                <label>
                    Netflix: <input type="checkbox" name="netflix" />
                </label>
                <label>
                    Hulu: <input type="checkbox" name="Hulu" />
                </label>
                <label>
                    AppleTV: <input type="checkbox" name="AppleTV" />
                </label>
                <button type="submit">Submit form</button>
            </form>
        </>
    );
};

export default Form;





