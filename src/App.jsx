import './App.css';
import React, { useEffect, useState } from 'react'

const App = () => {

  const [ data, setData] =useState([])

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')

  useEffect( () => {
    
    handleFetch()  

  }, [])

  const handleFetch = () => {

    fetch('https://nameless-wildwood-48294.herokuapp.com/')
    .then( (res) => { return res.json()})
    .then( (res) => {
      setData(res)
    })
  }

  const handleDelete = (golf) => {
    const fetchOptions = {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(golf) 
    }

    fetch('https://nameless-wildwood-48294.herokuapp.com/delete', fetchOptions )
    .then( () => {
      console.log('item deleted' + golf.name)
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
      body: JSON.stringify({'name': name, 'location': location, 'price': price}) 
    }

    fetch('https://nameless-wildwood-48294.herokuapp.com/create', fetchOptions)
    .then(res => res.json())
    .then(res => {
      handleFetch();
    })
  }

  const getJsxContent = data.map((doc, index) => {
    return(
        <div className='storedCourse' key={index}>
          <p>{doc.name}</p>
          <p>{doc.location}</p>
          <p>{doc.price}</p>
          <button onClick= {() => handleDelete(doc)}>Delete</button>
        </div>
      )
    })

  return (
    <div className="App">
      <h1>Add your Dream Golf Courses</h1>
      {getJsxContent}
      <form>        
        <fieldset> 
          <label>Name </label>
          <input type='text' onChange={(e) => setName(e.target.value)}/>
          <label>Location </label>
          <input type='text' onChange={(e) => setLocation(e.target.value)}/>
          <label>Price </label>
          <input type='text' onChange={(e) => setPrice(e.target.value)}/>
        </fieldset>  
        <button className='createBtn' onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}

export default App;
