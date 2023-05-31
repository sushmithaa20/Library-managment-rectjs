import React, { useState } from 'react';
import './NavBar.css'; // Import the CSS file for styles

function NavBar() {
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <nav>
      <ul className='navbar'>
        <li className={activeTab === 'Home' ? 'active' : ''} onClick={() => handleTabClick('Home')}>
          <a href="#">Home</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
