import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router"
import React from 'react'
import { motion } from 'framer-motion'

const Protected = ({ children }) => {
    const { loading, user } = useAuth()

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
                >
                    <div style={{
                        width: 40, height: 40, border: '3px solid var(--border)',
                        borderTopColor: 'var(--accent)', borderRadius: '50%',
                        animation: 'spin 0.7s linear infinite'
                    }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Loading...</span>
                </motion.div>
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            </div>
        )
    }

    if (!user) return <Navigate to="/login" />
    return children
}

export default Protected
