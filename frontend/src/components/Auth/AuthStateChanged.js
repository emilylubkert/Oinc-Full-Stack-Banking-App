import { useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { AuthContext } from '../../contexts/Auth/authContext'
import firebase from '../../contexts/Auth/firebaseConfig'
import { useNavigate } from 'react-router-dom'

const AuthStateChanged = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true)
  const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuth(user)
        user.getIdToken().then(token => {
          localStorage.setItem('token', token)
        })
        setIsLoading(false)
        console.log('current user', firebase.getCurrentUser())
      } else {
        setIsLoading(false)
        navigate('/')
      }
    })
  }, [])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return children
}

export { AuthStateChanged } 