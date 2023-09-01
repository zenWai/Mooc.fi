import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";

const App = () => {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/newbook" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
