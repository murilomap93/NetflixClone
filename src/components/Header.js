import React from 'react';
import './Header.css';
export default props => {
    return (
        <header className={props.black ? "black" : ''}>
            <div className="header--logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png" />
            </div>
            <div className="header--user">
                <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" />
            </div>
        </header>
    );
}