import React, {useState} from 'react';
import './Header.css';
import { useUser } from './UserProvider'; 
import { Link } from 'react-router-dom';


const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useUser(); 


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  console.log('User in Header:', user);




  return (

    <header className="header">
      <div className="logo">Banana Binge</div>
      <nav className="nav">
      <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About</Link></li>
          {user ? (
        <li onClick={toggleDropdown} className="dropdown-toggle">
          Hello, {user.name}
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/Profile">My Profile</Link></li>
              <li><Link to="/WishList">Wish List</Link></li>
              <li><Link to="/Logout">Logout</Link></li>

            </ul>
          )}
        </li>
      ) : (
        <li><Link to="/login">Login</Link></li>
      )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;