// App.js

import React from 'react';
import Header from './components/layout/Header/Header';
import axios from 'axios'

function App() {
  const token = import.meta.env.VITE_APP_TOKEN
  
  console.log(token)

  return (
    <>
      <Header />
      <div>
        hello world
      </div>
    </>
  );
}

export default App;
