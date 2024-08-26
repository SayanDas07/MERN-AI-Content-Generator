import React from 'react'
import axios from 'axios'
import { useMutation } from "@tanstack/react-query";
import Markdown from 'react-markdown';


const makeRequestAPI = async (prompt) => {
  const res = await axios.post("http://localhost:8000/generate", { prompt });
  console.log(res.data);
  return res.data;
}

function App() {
  const [prompt, setPrompt] = React.useState('')

  const mutation = useMutation({
    mutationFn: makeRequestAPI,
    mutationKey: ["gemini-api-request"],
  });

  const submitHandler = (e) => {
    e.preventDefault()
    mutation.mutate(prompt)
  }
  
  return (
    <div className="App">
      <div className="card">
        <h1 className="card-title">AI Content Generator</h1>
        <p>Enter a prompt and let AI craft unique content for you.</p>
        <form className="App-form" onSubmit={submitHandler}>
          <label htmlFor="prompt">Enter your prompt:</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write a content about..."
            className="App-input"
          />
          <button className="App-button" type="submit">
            Generate Content
          </button>
        </form>
        <section className="App-response">
          {mutation.isPending && <p>Generating your content...</p>}
          {mutation.isError && <p className="error">{mutation.error.message}</p>}
          {mutation.isSuccess && (
            <div className="card response-card">
              <Markdown className="markdown-content">{mutation.data}</Markdown>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default App
