import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth/authContext'
import firebase from '../../contexts/Auth/firebaseConfig'
import { useNavigate } from 'react-router-dom'

const AuthStateChanged = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true)
  const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    firebase.getCurrentUser(user => {
    //   console.log('my anonymous function', user)
      if (user) {
        setAuth(user)
        user.getIdToken().then(token => {
        //   console.log('settingtoken authstatechanged')
          localStorage.setItem('token', token)
        })
        setIsLoading(false)
        // navigate('/')
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