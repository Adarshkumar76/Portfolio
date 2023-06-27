import React from 'react'
import './ContactMain.css'

function ContactMain() {
    return (
        <>
            <div className="main">
                <div className="top">
                    <h1>CONTACT ME</h1>
                    <div>
                        <img src="/contact.png" alt="contact" />
                    </div>
                </div>
                <hr />
                <div className="bottom">
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