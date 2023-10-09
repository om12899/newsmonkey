import Navbar from "./components/Navbar";
import NewsComponent from "./components/NewsComponent";
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes, Route } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
        <Route exact path="/" element={<NewsComponent key="general" category = {'general'}  country = {'in'} pageSize = {5}/>}></Route>
        <Route exact path="/home" element={<NewsComponent key="general" category = {'general'}  country = {'in'} pageSize = {5}/>}></Route>
        <Route exact path="/business" element={<NewsComponent key="business" category = {'business'}  country = {'in'} pageSize = {5}/>}></Route>
      <Route exact path="/entertainment" element={<NewsComponent key="" category = {'entertainment'}  country = {'in'} pageSize = {5}/>}></Route>
      <Route exact path="/general"element={<NewsComponent key="general" category = {'general'}  country = {'in'} pageSize = {5}/>}></Route>
      <Route exact path="/health" element={<NewsComponent key="health" category = {'health'}  country = {'in'} pageSize = {5}/>}></Route>
      <Route exact path="/science" element={<NewsComponent key="science" category = {'science'}  country = {'in'} pageSize = {5}/>}></Route>
      <Route exact path="/sports" element={<NewsComponent key="sports" category = {'sports'}  country = {'in'} pageSize = {5}/>}></Route>
      <Route exact path="/technology" element={<NewsComponent key="technology" category = {'technology'}  country = {'in'} pageSize = {5}/>}></Route>
      <Route exact path='*' element={<ErrorPage/>}/>

        </Routes>
      </Router>    </div>
  );
}

export default App;
