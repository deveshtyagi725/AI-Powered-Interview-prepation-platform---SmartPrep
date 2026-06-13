import React from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'

// ── Navbar ────────────────────────────────────────────────────────────────────
export const Navbar = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 2rem', height: '60px',
                background: 'rgba(5,8,16,0.8)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--border)',
            }}
        >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: 'linear-gradient(135deg, var(--accent), #7c3aed)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: 800, color: '#fff'
                }}>A</div>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.02em' }}>
                    InterviewAI
                </span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {user && (
                    <>
                        <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--accent), #7c3aed)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.8rem', fontWeight: 700, color: '#fff',
                            marginRight: '0.25rem'
                        }}>
                            {user.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <button onClick={handleLogout} style={{
                            background: 'none', border: '1px solid var(--border)',
                            color: 'var(--text-secondary)', borderRadius: 'var(--radius-sm)',
                            padding: '0.35rem 0.75rem', fontSize: '0.8rem',
                            transition: 'all 0.2s',
                        }}
                            onMouseEnter={e => { e.target.style.borderColor = 'var(--border-hover)'; e.target.style.color = 'var(--text-primary)' }}
                            onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-secondary)' }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </motion.nav>
    )
}

// ── StatCard ──────────────────────────────────────────────────────────────────
export const StatCard = ({ value, label, icon, color = 'var(--accent)' }) => (
    <motion.div
        whileHover={{ y: -2 }}
        style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem',
            display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1,
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
            <span style={{ color, fontSize: '1.1rem' }}>{icon}</span>
        </div>
        <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{value}</span>
    </motion.div>
)

// ── SkeletonLoader ────────────────────────────────────────────────────────────
export const Skeleton = ({ width = '100%', height = '1rem', borderRadius = 'var(--radius-sm)', style = {} }) => (
    <div style={{
        width, height, borderRadius,
        background: 'linear-gradient(90deg, var(--bg-panel) 25%, rgba(255,255,255,0.04) 50%, var(--bg-panel) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        ...style
    }} />
)

export const SkeletonCard = () => (
    <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', padding: '1.25rem',
        display: 'flex', flexDirection: 'column', gap: '0.75rem'
    }}>
        <Skeleton height="0.9rem" width="60%" />
        <Skeleton height="0.75rem" width="90%" />
        <Skeleton height="0.75rem" width="75%" />
    </div>
)

// ── PrimaryButton ─────────────────────────────────────────────────────────────
export const PrimaryButton = ({ children, onClick, disabled, style = {}, ...props }) => (
    <motion.button
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        onClick={onClick}
        disabled={disabled}
        style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            padding: '0.7rem 1.5rem',
            background: disabled
                ? 'rgba(255,255,255,0.05)'
                : 'linear-gradient(135deg, var(--accent) 0%, #c0134f 100%)',
            color: disabled ? 'var(--text-muted)' : '#fff',
            border: 'none', borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem', fontWeight: 600,
            cursor: disabled ? 'not-allowed' : 'pointer',
            boxShadow: disabled ? 'none' : '0 4px 20px var(--accent-glow)',
            transition: 'box-shadow 0.2s',
            ...style
        }}
        {...props}
    >
        {children}
    </motion.button>
)

// ── GhostButton ───────────────────────────────────────────────────────────────
export const GhostButton = ({ children, onClick, style = {}, ...props }) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            padding: '0.7rem 1.5rem',
            background: 'transparent',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem', fontWeight: 500,
            cursor: 'pointer',
            transition: 'border-color 0.2s, background 0.2s',
            ...style
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        {...props}
    >
        {children}
    </motion.button>
)

// ── SectionHeader ─────────────────────────────────────────────────────────────
export const SectionHeader = ({ title, count, countLabel }) => (
    <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        marginBottom: '1.5rem', paddingBottom: '1rem',
        borderBottom: '1px solid var(--border)'
    }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{title}</h2>
        {count !== undefined && (
            <span style={{
                fontSize: '0.75rem', color: 'var(--text-secondary)',
                background: 'var(--bg-panel)', padding: '0.15rem 0.6rem',
                borderRadius: '2rem', border: '1px solid var(--border)'
            }}>{count} {countLabel}</span>
        )}
    </div>
)

// ── shimmer keyframe injection ────────────────────────────────────────────────
const style = document.createElement('style')
style.innerHTML = `@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`
document.head.appendChild(style)
