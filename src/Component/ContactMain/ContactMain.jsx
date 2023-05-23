import React from 'react'
import { FiMap } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import './ContactMain.css'

function ContactMain() {
    return (
        <>
            <div className="main">
                <div className="top">
                    <h1>CONTACT</h1>
                    <div>
                        <img src="/contact.png" alt="contact" />
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7151.018966374255!2d84.19153286278645!3d26.342378457582694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993ab7a9d94c765%3A0xb7d80c43302ddf3d!2sBaraipatti%20Durga%20temple!5e0!3m2!1sen!2sin!4v1684814219506!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <hr />
                    <div className="box">
                        <div className="card">
                            <FiMap size='40px'
                            />
                            <h3>Address</h3>
                            <p>Baraipatti, Kilpur, Nautan
                                <br />
                                Siwan, (Bihar) 841243.
                            </p>
                        </div>
                        <div className="card">
                            <FiPhoneCall size='40px'
                            />
                            <h3>Phone</h3>
                            <p>Adarsh Kumar Singh
                                <br />
                                +91 7643043113
                            </p>
                        </div>
                        <div className="card">
                            <MdEmail size='40px'
                            />
                            <h3>Email</h3>
                            <p>Adarsh Kumar Singh
                                <br />
                                adarshku5478953@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactMain