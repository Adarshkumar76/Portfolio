import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaTimes, FaBars } from 'react-icons/fa';
import './Header.css'

function Header() {
    const navRef = useRef();

    const showNaveBar = () => {
        navRef.current.classList.toggle("responsive");
    }

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