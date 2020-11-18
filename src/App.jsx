import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'

const App = () => {

  const [ data, setData] =useState([])

  const [input, setInput] = useState('')

  useEffect( () => {
    
    handleFetch()  

  }, [])

  const handleFetch = () => {

    fetch('http://localhost:8090')
    .then( (res) => { return res.json()})
    .then( (res) => {
      setData(res)
    })
  }

  const handleDelete = (user) => {
    const fetchOptions = {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user) 
    }

    fetch('http://localhost:8090/delete', fetchOptions )
    .then( () => {
      console.log('item deleted' + user.name)
      handleFetch()
    })
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    const fetchOptions = {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'name': input}) 
    }

    fetch('http://localhost:8090/create', fetchOptions)
    .then(res => res.json())
    .then(res => {
      handleFetch();
    })
  }


  return (
    <div className="App">
      <h1>The Nology Team</h1>
      {data.map(doc => <p>{doc.name} <button onClick= {() => handleDelete(doc)}>Delete</button></p> )}
      <form>   
        <label>Team Member Name </label>
        <input type='text' onChange={(e) => setInput(e.target.value)}/>
        <button onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}

export default App;
