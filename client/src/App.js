import React, {  useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get')
      .then((response) => {
        // console.log(response.data);
        setMovieReviewList(response.data);
      })
  })

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: review,
    }).then(() => {
      alert("Successful Insert");
    });
  }; 

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div className='app__form'>
        <div>
          <lable>Movie Name:</lable>
          <input 
            type='text' 
            name='movieName' 
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />
        </div>
        <div>
          <lable>Review:</lable>
          <input 
            type='text' 
            name='review' 
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </div>
        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((value) => {
          return (
            <div>
              <h3>Movie Name: {value.movieName}</h3>
              <h4>Review: {value.movieReview}</h4>
            </div>
          )
        })}

      </div>
    </div>
  );
}

export default App;
