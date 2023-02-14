import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "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",
      },
      body: JSON.stringify({
        prompt: input,
        max_tokens: 60,
        n: 1,
        stop: ["\n"],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.choices[0].text);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Enter a prompt:
          <input type="text" value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}

export default App;
