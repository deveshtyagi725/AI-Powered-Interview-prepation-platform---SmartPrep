import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()
    const { loading, handleRegister } = useAuth()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate('/')
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg-base)', padding: '1.5rem', position: 'relative', overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute', width: 500, height: 500, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
                top: '10%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none'
            }} />

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    width: '100%', maxWidth: 420,
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-xl)', padding: '2.5rem',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.4)', position: 'relative', zIndex: 1
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: 10,
                        background: 'linear-gradient(135deg, var(--accent), #7c3aed)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 800, fontSize: 15, color: '#fff'
                    }}>A</div>
                    <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>InterviewAI</span>
                </div>

                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
                    Create account
                </h1>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Start your AI-powered interview prep
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                        { label: 'Username', type: 'text', value: username, setter: setUsername, placeholder: 'johndoe' },
                        { label: 'Email', type: 'email', value: email, setter: setEmail, placeholder: 'you@example.com' },
                        { label: 'Password', type: 'password', value: password, setter: setPassword, placeholder: '••••••••' },
                    ].map(({ label, type, value, setter, placeholder }) => (
                        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{label}</label>
                            <input
                                type={type} value={value} placeholder={placeholder}
                                onChange={e => setter(e.target.value)} required
                                style={{
                                    background: 'var(--bg-panel)', border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-md)', padding: '0.7rem 1rem',
                                    color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none',
                                    transition: 'border-color 0.2s',
                                }}
                                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                            />
                        </div>
                    ))}

                    <motion.button
                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                        type="submit" disabled={loading}
                        style={{
                            marginTop: '0.5rem', padding: '0.8rem',
                            background: loading ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, var(--accent), #c0134f)',
                            color: loading ? 'var(--text-muted)' : '#fff',
                            border: 'none', borderRadius: 'var(--radius-md)',
                            fontWeight: 600, fontSize: '0.9rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            boxShadow: loading ? 'none' : '0 4px 20px var(--accent-glow)',
                        }}
                    >
                        {loading ? 'Creating account...' : 'Get started →'}
                    </motion.button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 500 }}>Sign in</Link>
                </p>
            </motion.div>
        </div>
    )
}

export default Register
