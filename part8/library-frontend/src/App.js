import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import {useEffect, useState} from "react";
import LoginForm from "./components/LoginForm";
import {useApolloClient, useQuery, useMutation, useSubscription} from "@apollo/client";
import {ALL_BOOKS, BOOK_ADDED} from "./queries";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  console.log('inside updateCache')
  console.log(query)
  console.log(addedBook)
  console.log(cache)
  cache.updateQuery(query, ({ allBooks } ) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'));
  }, []);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)
      console.log('Received data: ', data);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })
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
