import './App.css';
import Landing from './Components/Landing';
import Blogs from './Components/Blogs';
import AddBlog from './Components/AddBlog';
import React, { useState } from 'react';

const App = () => {
  const [display, setDisplay] = useState('landing');

  const changeDisplay = (val) => {
    setDisplay(val);
  };

  return (
    <div className='root'>
      {display === 'landing' ? (
        <Landing changeDisplay={changeDisplay} />
      ) : display === 'blogs' ? (
        <Blogs changeDisplay={changeDisplay} />
      ) : display === 'add' ? (
        <AddBlog changeDisplay={changeDisplay} />
      ) : (
        <div>Fatal Error: This Block Should Never Be Reached</div>
      )}
    </div>
  );
};

export default App;
