import React, { useContext, useState, useEffect } from "react"
import { auth } from "./fire"
import {db} from "./fire"

const AuthContext = React.createContext()


export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [userid, setUserid] = useState()
 
  async function signup(email, password,nameofuser) {

    return auth.createUserWithEmailAndPassword(email, password).then(cred=>{
     return db.collection("users").doc(cred.user.uid).set({
        name:nameofuser
      })
    })
  }

 function login(email, password) {
   
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
  function userState(user) {
    setUser(user)
  
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    userState,
    user,

  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}