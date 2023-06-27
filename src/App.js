import { Routes, Route } from "react-router-dom"
import Home from "./Screens/Home"
import About from "./Screens/About"
import Service from "./Screens/Service"
import Contact from "./Screens/ContactMe"
import Projects from "./Screens/Projects"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/projects" element={<Projects/>} />
      </Routes>
    </div>
  )
}

export default App