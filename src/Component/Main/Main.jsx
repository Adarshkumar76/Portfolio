import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import './Main.css'

function Main() {
  return (
    <>
      <section className="firstSection">
        <div className="leftSection">
          Hii, My Name is <span className="name">Adarsh</span>
          <div>and i am a</div>
          <TypeAnimation
            sequence={[
              'Web Developer',
              2000,
              'FrontEnd Developer',
              2000,
              'React-Native Developer',
              2000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ fontSize: '1em', display: 'inline-block', color: 'rgb(156, 110, 250)', fontWeight: '600' }}
          />
          <div className="buttons">
            <a href="/Resume.pdf" target="_blank"  rel="noreferrer" download='Resume.pdf'><button className="btn">Download Resume</button></a>
            <a href="https://github.com/Adarshkumar76" target="_blank"  rel="noreferrer"><button className="btn">Visit GitHub</button></a>
          </div>
        </div>
        <div className="rightSection">
          <img src="/dev.png" alt="Developer img" />
        </div>
      </section>
      <hr />
    </>
  )
}

export default Main