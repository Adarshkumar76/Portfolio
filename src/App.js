import { Routes, Route } from "react-router-dom"
import Home from "./Screens/Home"
import About from "./Screens/About"
import Service from "./Screens/Service"
import Contact from "./Screens/ContactMe"
import Projects from "./Screens/Projects"
import NoPage from "./Screens/NoPage"
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Screens/Login"
import SignUp from "./Screens/SignUp"


function App() {

  const { isAuthenticated } = useAuth0();
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NoPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path={isAuthenticated ? "/service" : "/"} element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path={isAuthenticated ? "/projects" : "/"} element={<Projects />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App