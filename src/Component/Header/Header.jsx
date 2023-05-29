import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaTimes, FaBars } from 'react-icons/fa';
import './Header.css'
import LoginButton from '../Login';
import LogoutButton from '../Logout';
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
    const navRef = useRef();

    const showNaveBar = () => {
        navRef.current.classList.toggle("responsive");
    }

    const { user, isAuthenticated } = useAuth0();


    return (
        <header>
            <nav>
                <div className="left"><Link to="/">Adarsh's Portfolio</Link></div>
                <div className="right" ref={navRef}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/service">Services</Link></li>
                        <li><Link to="/contact">Contact Me</Link></li>
                        {
                            isAuthenticated && <li>Hello, {user.name}</li>
                        }
                        {
                            isAuthenticated ? (<li><LogoutButton /></li>) : (<li><LoginButton /></li>)
                        }
                    </ul>

                    <button onClick={showNaveBar} className='nav-btn nav-close'>
                        <FaTimes />
                    </button>
                </div>
                <button onClick={showNaveBar} className='nav-btn'>
                    <FaBars />
                </button>
            </nav>
        </header>
    )
}

export default Header