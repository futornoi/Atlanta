import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.scss';
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";

export const homePath = 'home'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={homePath} element={<Home/>}/>
      <Route path={`${homePath}/:login`} element={<Profile/>}/>
      <Route path="/" element={<Navigate replace to={homePath}/>}/>
      <Route path="*" element={<h2>Not found</h2>}/>
    </Routes>
  </BrowserRouter>
);

export default App;
