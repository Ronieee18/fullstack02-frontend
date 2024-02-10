import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome} from '@fortawesome/free-solid-svg-icons'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <button onClick={handleToggleSidebar}>Close</button>
    <div className={`sidebar ${isOpen ? 'open' : 'hidden'}`}>
      
      {/* Add your sidebar content here */}
      <div className='flex flex-col'>
        <FontAwesomeIcon icon={faHome}/>
        <p className='text-[13px]'>Home</p>
        </div>
    </div>
    </>
  );
}

export default Sidebar;