import React, {useState, useEffect} from 'react';
import './Header.css';
import { useUser, setUser } from './UserProvider'; 
import { Link } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useUser(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/profile'); // Replace with your server route
        if (response.status === 200) {
          const data = await response.json();
          setUser(data.user); // Set the user in the context
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (!user) {
      // If user data is not available, fetch it
      fetchUserData();
    }
  }, [user]);




  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  console.log('User in Header:', user);

  return (

    <header className="header">
      <div className="logo">Banana Binge</div>
      <nav className="nav">
      <ul>
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/About">About</Link></li>
          {user ? (
        <li onClick={toggleDropdown} className="dropdown-toggle">
          Hello, {user.name}
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li><Link to="http://localhost:3000/api/profile">My Profile</Link></li>
              <li><Link to="/wishlist">Wish List</Link></li>
              <li><Link to="/logout">Logout</Link></li>
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