import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInterview } from '../hooks/useInterview.js'
import { useParams, useNavigate } from 'react-router'
import { Navbar, SectionHeader } from '../../../components/ui.jsx'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical', icon: '⚙️', key: 'technicalQuestions' },
    { id: 'behavioral', label: 'Behavioral', icon: '💬', key: 'behavioralQuestions' },
    { id: 'roadmap', label: 'Roadmap', icon: '🗺️', key: 'preparationPlan' },
]

const SEVERITY = {
    high:   { color: 'var(--red)',     bg: 'rgba(239,68,68,0.08)',    border: 'rgba(239,68,68,0.2)',    label: 'High' },
    medium: { color: 'var(--amber)',   bg: 'rgba(245,158,11,0.08)',   border: 'rgba(245,158,11,0.2)',   label: 'Med' },
    low:    { color: 'var(--emerald)', bg: 'rgba(16,185,129,0.08)',   border: 'rgba(16,185,129,0.2)',   label: 'Low' },
}

// ── Question Card ─────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}
            style={{
                background: 'var(--bg-panel)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)', overflow: 'hidden',
                transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
            <div
                onClick={() => setOpen(o => !o)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.9rem 1rem', cursor: 'pointer', userSelect: 'none' }}
            >
                <span style={{
                    flexShrink: 0, fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)',
                    background: 'var(--accent-subtle)', border: '1px solid rgba(232,25,110,0.2)',
                    borderRadius: 4, padding: '0.15rem 0.4rem', marginTop: 2
                }}>Q{index + 1}</span>
                <p style={{ flex: 1, margin: 0, fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.5, color: 'var(--text-primary)' }}>{item.question}</p>
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ color: open ? 'var(--accent)' : 'var(--text-muted)', marginTop: 2, flexShrink: 0 }}>▾</motion.span>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden', borderTop: '1px solid var(--border)' }}
                    >
                        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                            {[
                                { tag: 'Intention', tagColor: '#a78bfa', tagBg: 'rgba(167,139,250,0.08)', tagBorder: 'rgba(167,139,250,0.2)', text: item.intention },
                                { tag: 'Model Answer', tagColor: 'var(--emerald)', tagBg: 'rgba(16,185,129,0.08)', tagBorder: 'rgba(16,185,129,0.2)', text: item.answer },
                            ].map(({ tag, tagColor, tagBg, tagBorder, text }) => (
                                <div key={tag} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: tagColor, background: tagBg, border: `1px solid ${tagBorder}`, borderRadius: 4, padding: '0.15rem 0.5rem', width: 'fit-content' }}>{tag}</span>
                                    <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{text}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ── Roadmap Day ───────────────────────────────────────────────────────────────
const RoadmapDay = ({ day, index, total }) => (
    <motion.div
        initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
        style={{ display: 'flex', gap: '1.25rem', paddingBottom: '1.5rem', position: 'relative' }}
    >
        {/* Timeline line */}
        {index < total - 1 && (
            <div style={{ position: 'absolute', left: 19, top: 32, bottom: 0, width: 2, background: 'linear-gradient(to bottom, var(--accent), rgba(232,25,110,0.05))' }} />
        )}
        {/* Dot */}
        <div style={{ flexShrink: 0, width: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
            <div style={{
                width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--accent)',
                background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1,
            }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
            </div>
        </div>
        {/* Content */}
        <div style={{ flex: 1, paddingTop: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-subtle)', border: '1px solid rgba(232,25,110,0.2)', padding: '0.1rem 0.5rem', borderRadius: '2rem' }}>Day {day.day}</span>
                <h3 style={{ margin: 0, fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-primary)' }}>{day.focus}</h3>
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {day.tasks.map((task, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                        <span style={{ flexShrink: 0, width: 5, height: 5, borderRadius: '50%', background: 'var(--text-muted)', marginTop: 7 }} />
                        {task}
                    </li>
                ))}
            </ul>
        </div>
    </motion.div>
)

// ── Loading Skeleton ──────────────────────────────────────────────────────────
const LoadingScreen = () => (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 60 }}>
        <Navbar />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', gap: '1.5rem' }}>
            <div style={{ width: 220, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[1, 2, 3].map(i => <div key={i} style={{ height: 44, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', animation: 'shimmer 1.5s infinite', backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, var(--bg-card) 25%, rgba(255,255,255,0.03) 50%, var(--bg-card) 75%)' }} />)}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[1, 2, 3, 4].map(i => <div key={i} style={{ height: 80, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', animation: 'shimmer 1.5s infinite', backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, var(--bg-card) 25%, rgba(255,255,255,0.03) 50%, var(--bg-card) 75%)' }} />)}
            </div>
            <div style={{ width: 240, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[1, 2].map(i => <div key={i} style={{ height: 120, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', animation: 'shimmer 1.5s infinite', backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, var(--bg-card) 25%, rgba(255,255,255,0.03) 50%, var(--bg-card) 75%)' }} />)}
            </div>
        </div>
        <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    const navigate = useNavigate()

    if (loading || !report) return <LoadingScreen />

    const scoreColor = report.matchScore >= 80 ? 'var(--emerald)' : report.matchScore >= 60 ? 'var(--amber)' : 'var(--red)'

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 60 }}>
            <Navbar />

            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>

                {/* ── Left Nav ── */}
                <motion.nav
                    initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    style={{
                        width: 220, flexShrink: 0, background: 'var(--bg-card)',
                        border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
                        padding: '1.25rem 0.75rem', display: 'flex', flexDirection: 'column',
                        gap: '0.25rem', position: 'sticky', top: 76,
                    }}
                >
                    <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', padding: '0 0.5rem', marginBottom: '0.25rem' }}>Sections</span>

                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveNav(item.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.6rem',
                                width: '100%', padding: '0.65rem 0.75rem',
                                background: activeNav === item.id ? 'var(--accent-subtle)' : 'none',
                                border: 'none', borderRadius: 'var(--radius-sm)',
                                color: activeNav === item.id ? 'var(--accent)' : 'var(--text-secondary)',
                                fontSize: '0.85rem', fontWeight: activeNav === item.id ? 600 : 400,
                                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => { if (activeNav !== item.id) { e.currentTarget.style.background = 'var(--bg-panel)'; e.currentTarget.style.color = 'var(--text-primary)' } }}
                            onMouseLeave={e => { if (activeNav !== item.id) { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-secondary)' } }}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--text-muted)', background: 'var(--bg-panel)', padding: '0.1rem 0.4rem', borderRadius: 4 }}>
                                {item.id === 'roadmap' ? report.preparationPlan?.length : item.id === 'technical' ? report.technicalQuestions?.length : report.behavioralQuestions?.length}
                            </span>
                        </button>
                    ))}

                    <div style={{ flex: 1 }} />

                    {/* Download Resume */}
                    <motion.button
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => getResumePdf(interviewId)}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            marginTop: '1rem', padding: '0.7rem',
                            background: 'linear-gradient(135deg, var(--accent), #c0134f)',
                            color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
                            fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                            boxShadow: '0 4px 16px var(--accent-glow)',
                        }}
                    >
                        ✦ Download Resume
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/')}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            marginTop: '0.5rem', padding: '0.6rem',
                            background: 'none', color: 'var(--text-secondary)',
                            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
                            fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                        ← New Strategy
                    </motion.button>
                </motion.nav>

                {/* ── Center Content ── */}
                <motion.main
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    style={{
                        flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-lg)', padding: '1.75rem',
                        maxHeight: 'calc(100vh - 100px)', overflowY: 'auto',
                    }}
                >
                    <AnimatePresence mode="wait">
                        {activeNav === 'technical' && (
                            <motion.section key="technical" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <SectionHeader title="Technical Questions" count={report.technicalQuestions?.length} countLabel="questions" />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {report.technicalQuestions?.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
                                </div>
                            </motion.section>
                        )}
                        {activeNav === 'behavioral' && (
                            <motion.section key="behavioral" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <SectionHeader title="Behavioral Questions" count={report.behavioralQuestions?.length} countLabel="questions" />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {report.behavioralQuestions?.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
                                </div>
                            </motion.section>
                        )}
                        {activeNav === 'roadmap' && (
                            <motion.section key="roadmap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <SectionHeader title="Preparation Roadmap" count={report.preparationPlan?.length} countLabel="days" />
                                <div style={{ paddingLeft: '0.25rem' }}>
                                    {report.preparationPlan?.map((day, i) => (
                                        <RoadmapDay key={day.day} day={day} index={i} total={report.preparationPlan.length} />
                                    ))}
                                </div>
                            </motion.section>
                        )}
                    </AnimatePresence>
                </motion.main>

                {/* ── Right Sidebar ── */}
                <motion.aside
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                    style={{
                        width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column',
                        gap: '1rem', position: 'sticky', top: 76,
                    }}
                >
                    {/* Match Score */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', alignSelf: 'flex-start' }}>Match Score</span>
                        <div style={{ position: 'relative', width: 96, height: 96 }}>
                            <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: 'rotate(-90deg)' }}>
                                <circle cx="48" cy="48" r="40" fill="none" stroke="var(--border)" strokeWidth="6" />
                                <motion.circle
                                    cx="48" cy="48" r="40" fill="none"
                                    stroke={scoreColor} strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 40}`}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                                    animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - report.matchScore / 100) }}
                                    transition={{ duration: 1.2, ease: 'easeOut' }}
                                />
                            </svg>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>{report.matchScore}</span>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>/ 100</span>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: scoreColor, fontWeight: 500, margin: 0 }}>
                            {report.matchScore >= 80 ? '🟢 Strong match' : report.matchScore >= 60 ? '🟡 Good match' : '🔴 Needs work'}
                        </p>
                    </div>

                    {/* Skill Gaps */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Skill Gaps</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {report.skillGaps?.map((gap, i) => {
                                const s = SEVERITY[gap.severity] || SEVERITY.low
                                return (
                                    <motion.span
                                        key={i} whileHover={{ scale: 1.05 }}
                                        style={{
                                            fontSize: '0.75rem', fontWeight: 500, padding: '0.3rem 0.65rem',
                                            borderRadius: 'var(--radius-sm)', border: `1px solid ${s.border}`,
                                            background: s.bg, color: s.color, cursor: 'default',
                                        }}
                                    >
                                        {gap.skill}
                                    </motion.span>
                                )
                            })}
                        </div>
                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {Object.entries(SEVERITY).map(([key, s]) => (
                                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                                    {s.label} priority
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.aside>
            </div>

            <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
        </div>
    )
}

export default Interview
