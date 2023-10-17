import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProvider from './UserProvider';
import Header from './Header';
import Search from './Search';
import Genre from './Genre';
import ShowCards from './ShowCards';
import Footer from './Footer';
import Lists from './Lists';
import Details from './Details';
import Register from './Register';
import Login from './Login';

function App() {
  return (
    <Router>
      <UserProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/Home" element={<div> <Search /> <Genre /> <ShowCards /> </div>} />
            <Route path="/Lists" element={<Lists />} />
            <Route path="/Detsails" element={<Details />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
          <Footer />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
