

import React from 'react';
import './index.css';

const Logo = () => {
    return (
        <div className="logo-container">
            <div className="logo-item">
                <img src='assets/Logo.png' alt='logo' className='logo'/>
            </div>
            <div className="profile-item">
                <img src='assets/profile.png' alt='profile' className='profile'/>
            </div>
        </div>
    )
}

export default Logo;
