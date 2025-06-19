import React, { createContext, useState, useContext, useEffect } from 'react'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { auth } from '../firebase/config'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Login com email e senha
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            return { success: true, user: userCredential.user }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    // Login com Google
    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            return { success: true, user: result.user }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    // Cadastro com email e senha
    const signup = async (email, password, displayName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            
            // Atualizar o perfil do usuário com o nome
            if (displayName) {
                await updateProfile(userCredential.user, {
                    displayName: displayName
                })
            }
            
            return { success: true, user: userCredential.user }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    // Logout
    const logout = async () => {
        try {
            await signOut(auth)
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    // Verificar estado da autenticação
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        user,
        loading,
        login,
        loginWithGoogle,
        signup,
        logout,
        isAuthenticated: !!user
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }
    return context
}