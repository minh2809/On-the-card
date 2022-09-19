import Axios from 'axios'
import { useState } from 'react';
import './App.css';

function App() {

  const [joke, setJoke] = useState("")

  const getJoke = () => {
    // Axios.get("https://official-joke-api.appspot.com/random_joke").then((response) => {
    //   console.log(response)
    //   setJoke(response.data.setup + "..." + response.data.punchline)
      fetch("https://official-joke-api.appspot.com/random_joke").then((response) => response.json()).then((data)=> {
        setJoke(data.setup + "..." +data.punchline)
      })
    }

  return (
      <div> Hello Youtube <button onClick={getJoke}>get joke right now</button>
        {joke}
      </div>

    );
  }

  export default App;
