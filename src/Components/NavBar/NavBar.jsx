import React, { useState } from 'react';
import './NavBar.css'; 

function NavBar() {
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <nav>
      <ul className='navbar'>
        <li className={activeTab === 'Home' ? 'active' : ''} onClick={() => handleTabClick('Home')}>
          <a href="#">Library Managment System</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
