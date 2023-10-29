// App.js
import React from 'react';
import PostList from './PostList';
import './App.css'
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <h1 className='heading'>User's List</h1>
      <PostList />
      <Footer/>
    </div>
  );
}

export default App;
