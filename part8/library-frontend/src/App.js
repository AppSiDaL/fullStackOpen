import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Route, Routes, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import Recomendations from './components/Recomendations'
import { useSubscription, useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from "./queries"
import { gql } from '@apollo/client'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('phonenumbers-user'))
    if (user) {
      setToken(user)
    }
  }, []);
  const pandign = {
    margin: 5
  }

  if (!token) {
    return (
      <div>
        <div>
          <Link style={pandign} to="/authors">Authors</Link>
          <Link style={pandign} to="/books">Books</Link>
          <Link style={pandign} to="/login">Login</Link>
        </div>
        <Notify errorMessage={errorMessage} />
        <Routes>
          <Route path='/authors' element={<Authors />} />
          <Route path='/books' element={<Books />} />
          <Route path='/login' element={<LoginForm setToken={setToken} setError={notify} />} />
        </Routes>
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  return (
    <div>
      <div>
        <Link style={pandign} to="/authors">Authors</Link>
        <Link style={pandign} to="/books">Books</Link>
        <Link style={pandign} to="/add">Add</Link>
        <Link style={pandign} to="/recomendations">recomendations</Link>
        <button onClick={logout}>logout</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <Routes>
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
        <Route path='/recomendations' element={<Recomendations />} />
      </Routes>
    </div>
  )
}

export default App
