import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import {useEffect, useState} from "react";
import LoginForm from "./components/LoginForm";
import {useApolloClient} from "@apollo/client";

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'));
  }, []);
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
        />
      </div>
    )
  }

  return (
    <div>
      <NavBar />
      <button onClick={logout}>logout</button>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/newbook" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
