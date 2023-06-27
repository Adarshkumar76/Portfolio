import React from 'react'
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
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7151.018966374255!2d84.19153286278645!3d26.342378457582694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993ab7a9d94c765%3A0xb7d80c43302ddf3d!2sBaraipatti%20Durga%20temple!5e0!3m2!1sen!2sin!4v1684814219506!5m2!1sen!2sin" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='map'></iframe>
                    </div>
                    <hr />
                    <div className="form-heading">
                    <h1>CONTACT FORM</h1>
                    </div>
                    <div className="container">
                        <div className="contact-form">
                            <form action='https://formspree.io/f/xpzeennp' method='POST' className='contact-inputs'>
                                <input type='text' name='username' placeholder='Name' autoComplete='off' required/>
                                <input type='email' name='email' placeholder='Email' autoComplete='off' required/>
                                <input type='text' name='Phone' placeholder='Mobile No.' autoComplete='off' required/>
                                <textarea name='message' cols="30" rows="6" placeholder='Message' autoComplete='off' required />
                                <input className='btn' type='submit' value="Send" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactMain