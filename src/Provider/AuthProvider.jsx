/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from 'react'
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth'
import axios from 'axios'
import { auth } from '../Firebase/firebase.config'
import useAxiosCommon from '../Hooks/useAxiosCommon'
export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const axiosCommon= useAxiosCommon()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const resetPassword = email => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    const logOut = async () => {
        setLoading(true)
        await axios.get(`${''}/logout`, {
            withCredentials: true,
        })
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }
   // Get token from server
//    const getToken = async email => {
//     const { data } = await axios.post(
//       `${import.meta.env.VITE_API_URL}/jwt`,
//       { email },
//       { withCredentials: true }
//     )
//     return data
//   }

    // onAuthStateChange
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
            // if (currentUser) {
            //     // get token and store client
            //     const userInfo = { email: currentUser.email };
            //     axiosCommon.post('/jwt', userInfo)
            //         .then(res => {
            //             if (res.data.token) {
            //                 localStorage.setItem('access-token', res.data.token);
            //                 setLoading(false);
            //             }
            //         })
            // }
            // else {
            //     // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
            //     localStorage.removeItem('access-token');
            //     setLoading(false);
            // }
        })
        return () => {
            return unsubscribe()
        }
    }, [axiosCommon])

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        resetPassword,
        logOut,
        updateUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthProvider