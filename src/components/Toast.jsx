import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = {
    success: <CheckCircle size={16} />,
    error:   <XCircle size={16} />,
    info:    <AlertCircle size={16} />,
}

const COLORS = {
    success: { color: 'var(--emerald)', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
    error:   { color: 'var(--red)',     bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)' },
    info:    { color: 'var(--blue)',    bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' },
}

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const toast = useCallback((message, type = 'info') => {
        const id = Date.now()
        setToasts(t => [...t, { id, message, type }])
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000)
    }, [])

    const dismiss = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), [])

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <AnimatePresence>
                    {toasts.map(({ id, message, type }) => {
                        const c = COLORS[type]
                        return (
                            <motion.div
                                key={id}
                                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                                transition={{ duration: 0.25 }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                                    padding: '0.75rem 1rem',
                                    background: 'var(--bg-card)', border: `1px solid ${c.border}`,
                                    borderRadius: 'var(--radius-md)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                                    minWidth: 260, maxWidth: 360,
                                    color: c.color,
                                    backdropFilter: 'blur(12px)',
                                }}
                            >
                                {ICONS[type]}
                                <span style={{ flex: 1, fontSize: '0.825rem', fontWeight: 500, color: 'var(--text-primary)' }}>{message}</span>
                                <button onClick={() => dismiss(id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2, display: 'flex' }}>
                                    <X size={14} />
                                </button>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const ctx = useContext(ToastContext)
    if (!ctx) throw new Error('useToast must be used within ToastProvider')
    return ctx
}
