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
      });
  }, []);

  const submitReview = () => {

    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: review,
    });

    // Set the movie list
    setMovieReviewList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review }
    ]);
  }; 

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  }

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div className='app__form'>
        <div className='app__input'>
          <lable>Movie Name:</lable>
          <input 
            type='text' 
            name='movieName' 
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />
        </div>
        <div className='app__input'>
          <lable>Review:</lable>
          <input 
            type='text' 
            name='review' 
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </div>
        <button className='submit-btn' onClick={submitReview}>Submit</button>

        <div className='app__card'>
          {movieReviewList.map((value) => {
            return (
              <div className='app__cards'>
                <h3>{value.movieName}</h3>
                <p>Review: {value.movieReview}</p>

                <div>
                  <input className='update-input' id='updateInput' type='text' />
                  <button className='delete-btn'>Edit</button>
                  <button onClick={() => {deleteReview(value.movieName)}} className='delete-btn'>Delete</button>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  );
}

export default App;
