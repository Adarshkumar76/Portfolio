import React from 'react'
import './ServiceMain.css'
import { Link } from 'react-router-dom'

function ServiceMain() {
    return (
        <>
            <div className="main">
                <div className="top">
                    <h1>SERVICES</h1>
                    <div>
                        <img src="/service.png" alt="service" />
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="box">
                        <div className="ServiceCard">
                            <img src="/Front.png" alt="FrontEnt" />
                            <h2>FrontEnt Development</h2>
                            <Link to="/contact"><button className="btn">Contact</button></Link>
                        </div>
                        <div className="ServiceCard">
                            <img src="/mern-stack.png" alt="MERN" />
                            <h2>MERN Development</h2>
                            <Link to="/contact"><button className="btn">Contact</button></Link>
                        </div>
                        <div className="ServiceCard">
                            <img src="/react-native.png" alt="React-Native" />
                            <h2>React-Native Development</h2>
                            <Link to="/contact"><button className="btn">Contact</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceMain