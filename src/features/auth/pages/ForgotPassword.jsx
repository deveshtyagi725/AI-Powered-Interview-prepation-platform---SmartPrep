import React, { useState } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'
import { forgotPassword } from '../services/auth.api'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setError('Please enter a valid email address.')
            return
        }
        setLoading(true)
        try {
            await forgotPassword({ email })
            setSent(true)
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg-base)', padding: '1.5rem', position: 'relative', overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute', width: 500, height: 500, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
                top: '5%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none'
            }} />

            <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                style={{
                    width: '100%', maxWidth: 420,
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-xl)', padding: '2.5rem',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.4)', position: 'relative', zIndex: 1
                }}
            >
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: 10,
                        background: 'linear-gradient(135deg, var(--accent), #7c3aed)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 800, fontSize: 15, color: '#fff'
                    }}>A</div>
                    <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>InterviewAI</span>
                </div>

                <AnimatePresence mode="wait">
                    {!sent ? (
                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: 'var(--radius-md)', marginBottom: '1.25rem',
                                background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)'
                            }}>
                                <Mail size={22} />
                            </div>

                            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
                                Forgot password?
                            </h1>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
                                Enter your email and we'll send you a link to reset your password.
                            </p>

                            <AnimatePresence>
                                {error && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                        style={{
                                            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                                            borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem',
                                            fontSize: '0.825rem', color: '#f87171', marginBottom: '1rem', overflow: 'hidden'
                                        }}>
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Email address</label>
                                    <input
                                        type="email" value={email} placeholder="you@example.com"
                                        onChange={e => setEmail(e.target.value)} required
                                        style={{
                                            background: 'var(--bg-panel)', border: '1px solid var(--border)',
                                            borderRadius: 'var(--radius-md)', padding: '0.7rem 1rem',
                                            color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none',
                                            transition: 'border-color 0.2s',
                                        }}
                                        onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                    />
                                </div>

                                <motion.button
                                    whileHover={!loading ? { scale: 1.01 } : {}}
                                    whileTap={!loading ? { scale: 0.99 } : {}}
                                    type="submit" disabled={loading}
                                    style={{
                                        padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                        background: loading ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, var(--blue), #1d4ed8)',
                                        color: loading ? 'var(--text-muted)' : '#fff',
                                        border: 'none', borderRadius: 'var(--radius-md)',
                                        fontWeight: 600, fontSize: '0.9rem',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        boxShadow: loading ? 'none' : '0 4px 20px var(--blue-glow)',
                                    }}
                                >
                                    {loading ? (
                                        <><motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }} style={{ display: 'flex' }}><Loader2 size={16} /></motion.span> Sending...</>
                                    ) : 'Send reset link →'}
                                </motion.button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}
                        >
                            <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
                                style={{
                                    width: 64, height: 64, borderRadius: '50%',
                                    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--emerald)'
                                }}
                            >
                                <CheckCircle size={30} />
                            </motion.div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Check your inbox</h2>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                Password reset link has been sent to<br />
                                <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>
                            </p>
                            <div style={{
                                width: '100%', padding: '0.875rem', marginTop: '0.5rem',
                                background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)',
                                borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'rgba(16,185,129,0.9)', lineHeight: 1.5
                            }}>
                                Didn't receive it? Check your spam folder or{' '}
                                <button onClick={() => { setSent(false); setEmail('') }}
                                    style={{ background: 'none', border: 'none', color: 'var(--emerald)', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem', padding: 0 }}>
                                    try again
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center' }}>
                    <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                        <ArrowLeft size={14} /> Back to sign in
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default ForgotPassword
