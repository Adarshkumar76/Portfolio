import React from 'react'
import './AboutMain.css'

function AboutMain() {
    return (
        <>
            <div className="main">

                <div className="top">
                    <h1>ABOUT</h1>
                    <div>
                        <img src="/about.png" alt="about" />
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <h3>WHO I AM</h3>
                    <div className="details">
                        <div>
                            <p>After graduating in 2022 with a Bachelor’s Degree (First Class Honours) in Multimedia Programming and Design, I spent the last one years working both as a freelance web developer and designer. I acquired project and time management skills, as well as the ability to communicate with team members and clients while effectively meeting milestones and deadlines.
                                <br />
                                <br />
                                As a freelance web developer and designer I collaborated with several graphic designers in Berlin and Melbourne, at the same time maintaining clients in Germany, Ireland, Australia and the UK.
                                <br />
                                <br />
                                I have worked on a multitude of web and print based projects for a range of clients providing Web Design (Photoshop, Illustrator, InDesign) and Development (HTML, CSS, JS, React js, WordPress, WooCommerce, Bootstrap, Responsive Layouts), Corporate Branding. During my Multimedia degree I studied Information Architecture, and therefore have a keen understanding of wireframes, sitemaps and user experience design which I put to good use on every project I work on.
                                <br />
                            </p>
                        </div>
                        <a href="/Resume.pdf" target="_blank"><button className="btn">Resume</button></a>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AboutMain