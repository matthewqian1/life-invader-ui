import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import AddCalories from './AddCalories';
import React from 'react';
import Login from './Login';
import Register from './Register';
import UserPage from './UserPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<AddCalories/>} path='/addCalories'></Route>
          <Route index element={<Login/>}></Route>
          <Route index element={<Register/>} path='/register'></Route>
          <Route index element={<UserPage/>} path='/user'></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
