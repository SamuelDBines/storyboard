import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Navigation from './components/navigation/navigation';

function App() {
  return (
    <div >
      <Navigation />
      <div className='app'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
