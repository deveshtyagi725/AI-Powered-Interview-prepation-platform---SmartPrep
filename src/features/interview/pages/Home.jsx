import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router'
import { useInterview } from '../hooks/useInterview.js'
import { Navbar, StatCard, SkeletonCard } from '../../../components/ui.jsx'

const STATS = [
    { value: '10K+', label: 'Questions Generated', icon: '⚡' },
    { value: '5K+', label: 'Resumes Analyzed', icon: '📄' },
    { value: '95%', label: 'Success Rate', icon: '🎯' },
]

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState('')
    const [selfDescription, setSelfDescription] = useState('')
    const [resumeFile, setResumeFile] = useState(null)
    const [fileError, setFileError] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const isValid = jobDescription.trim() && (resumeFile || selfDescription.trim())

    const validateFile = (file) => {
        if (!file) { setFileError('Please select a file'); setResumeFile(null); return false }
        if (file.type !== 'application/pdf') { setFileError('Only PDF files are allowed'); setResumeFile(null); return false }
        if (file.size > 5 * 1024 * 1024) { setFileError('File size must be less than 5MB'); setResumeFile(null); return false }
        setFileError(null); setResumeFile(file); return true
    }

    const handleFileChange = useCallback((e) => { validateFile(e.target.files[0]); e.target.value = '' }, [])
    const handleDrop = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); if (e.dataTransfer.files[0]) validateFile(e.dataTransfer.files[0]) }, [])
    const handleDragOver = useCallback((e) => { e.preventDefault(); setIsDragging(true) }, [])
    const handleDragLeave = useCallback((e) => { e.preventDefault(); setIsDragging(false) }, [])

    const handleGenerate = async () => {
        const data = await generateReport({ jobDescription: jobDescription.trim(), selfDescription: selfDescription.trim(), resumeFile })
        if (data?._id) navigate(`/interview/${data._id}`)
    }

    const scoreColor = (score) => score >= 80 ? 'var(--emerald)' : score >= 60 ? 'var(--amber)' : 'var(--red)'

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: '60px' }}>
            <Navbar />

            {/* Hero */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Glow orbs */}
                <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,25,110,0.1) 0%, transparent 65%)', top: '-10%', left: '30%', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)', top: '20%', right: '10%', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 960, margin: '0 auto', padding: '4rem 1.5rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            background: 'var(--accent-subtle)', border: '1px solid rgba(232,25,110,0.2)',
                            borderRadius: '2rem', padding: '0.35rem 1rem',
                            fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)',
                            marginBottom: '1.5rem', letterSpacing: '0.04em', textTransform: 'uppercase'
                        }}>
                            ✦ AI-Powered Interview Preparation
                        </div>
                        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
                            Land your <span style={{ color: 'var(--accent)' }}>dream job</span>
                            <br />with AI precision
                        </h1>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                            Upload your resume, paste the job description, and get a personalized interview strategy with technical questions, behavioral prep, and a day-by-day roadmap.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
                        style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}
                    >
                        {STATS.map((s, i) => (
                            <motion.div key={i} whileHover={{ y: -2 }} style={{
                                background: 'var(--bg-card)', border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-lg)', padding: '1rem 1.75rem',
                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                            }}>
                                <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.03em' }}>{s.value}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{s.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Main Form Card */}
            <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
                    style={{
                        background: 'var(--bg-card)', border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-xl)', overflow: 'hidden',
                        boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
                    }}
                >
                    <div style={{ display: 'flex', minHeight: 500 }}>
                        {/* Left — Job Description */}
                        <div style={{ flex: 1, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', borderRight: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--accent)', fontSize: '1rem' }}>💼</span>
                                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Target Job Description</span>
                                <span style={{ marginLeft: 'auto', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '0.15rem 0.5rem', borderRadius: 4, background: 'var(--accent-subtle)', color: 'var(--accent)', border: '1px solid rgba(232,25,110,0.2)' }}>Required</span>
                            </div>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <textarea
                                    value={jobDescription}
                                    onChange={e => setJobDescription(e.target.value.slice(0, 5000))}
                                    placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires React, TypeScript, system design...'`}
                                    style={{
                                        width: '100%', height: '100%', minHeight: 360,
                                        background: 'var(--bg-panel)', border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-md)', padding: '0.875rem 1rem',
                                        color: 'var(--text-primary)', fontSize: '0.85rem',
                                        resize: 'none', outline: 'none', lineHeight: 1.6,
                                        transition: 'border-color 0.2s',
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                />
                                <span style={{ position: 'absolute', bottom: '0.6rem', right: '0.75rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                    {jobDescription.length} / 5000
                                </span>
                            </div>
                        </div>

                        {/* Right — Profile */}
                        <div style={{ flex: 1, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1rem' }}>👤</span>
                                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Your Profile</span>
                            </div>

                            {/* Dropzone */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Upload Resume</span>
                                    <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '0.15rem 0.5rem', borderRadius: 4, background: 'rgba(16,185,129,0.08)', color: 'var(--emerald)', border: '1px solid rgba(16,185,129,0.2)' }}>Best Results</span>
                                </div>
                                <motion.label
                                    htmlFor="resume"
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    animate={{ borderColor: isDragging ? 'var(--accent)' : resumeFile ? 'var(--emerald)' : fileError ? 'var(--red)' : 'var(--border)' }}
                                    style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                                        padding: '1.5rem 1rem', cursor: 'pointer',
                                        background: isDragging ? 'var(--accent-subtle)' : resumeFile ? 'rgba(16,185,129,0.05)' : 'var(--bg-panel)',
                                        border: '2px dashed',
                                        borderRadius: 'var(--radius-md)', transition: 'all 0.2s',
                                    }}
                                >
                                    <span style={{ fontSize: '1.5rem' }}>{resumeFile ? '✅' : fileError ? '❌' : '📎'}</span>
                                    {resumeFile ? (
                                        <>
                                            <span style={{ fontSize: '0.825rem', fontWeight: 500, color: 'var(--emerald)' }}>{resumeFile.name}</span>
                                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{Math.round(resumeFile.size / 1024)} KB</span>
                                        </>
                                    ) : fileError ? (
                                        <span style={{ fontSize: '0.825rem', color: 'var(--red)' }}>{fileError}</span>
                                    ) : (
                                        <>
                                            <span style={{ fontSize: '0.825rem', fontWeight: 500 }}>Click to upload or drag & drop</span>
                                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PDF only · Max 5MB</span>
                                        </>
                                    )}
                                    <input ref={resumeInputRef} hidden type="file" id="resume" accept=".pdf" onChange={handleFileChange} />
                                </motion.label>
                            </div>

                            {/* OR divider */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                                <span>OR</span>
                                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                            </div>

                            {/* Self description */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Quick Self-Description</label>
                                <textarea
                                    onChange={e => setSelfDescription(e.target.value.slice(0, 1000))}
                                    placeholder="Briefly describe your experience, key skills, and years of experience..."
                                    style={{
                                        flex: 1, minHeight: 100,
                                        background: 'var(--bg-panel)', border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem',
                                        color: 'var(--text-primary)', fontSize: '0.85rem',
                                        resize: 'none', outline: 'none', lineHeight: 1.6, transition: 'border-color 0.2s',
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                />
                            </div>

                            {/* Info box */}
                            <div style={{
                                display: 'flex', gap: '0.6rem', padding: '0.75rem',
                                background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)',
                                borderRadius: 'var(--radius-md)',
                            }}>
                                <span style={{ fontSize: '0.8rem' }}>ℹ️</span>
                                <p style={{ fontSize: '0.775rem', color: 'rgba(139,184,255,0.8)', lineHeight: 1.5, margin: 0 }}>
                                    Either a <strong style={{ color: 'var(--text-primary)' }}>Resume</strong> or <strong style={{ color: 'var(--text-primary)' }}>Self Description</strong> is required.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '1rem 1.75rem', borderTop: '1px solid var(--border)',
                        background: 'rgba(255,255,255,0.01)',
                    }}>
                        <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>⚡ AI-Powered · Approx 30s</span>
                        <motion.button
                            whileHover={!(!isValid || loading) ? { scale: 1.02 } : {}}
                            whileTap={!(!isValid || loading) ? { scale: 0.98 } : {}}
                            onClick={handleGenerate}
                            disabled={!isValid || loading}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.7rem 1.5rem',
                                background: !isValid || loading ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, var(--accent), #c0134f)',
                                color: !isValid || loading ? 'var(--text-muted)' : '#fff',
                                border: 'none', borderRadius: 'var(--radius-md)',
                                fontSize: '0.875rem', fontWeight: 600,
                                cursor: !isValid || loading ? 'not-allowed' : 'pointer',
                                boxShadow: !isValid || loading ? 'none' : '0 4px 20px var(--accent-glow)',
                            }}
                        >
                            {loading ? (
                                <>
                                    <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                                    Generating...
                                </>
                            ) : <>✦ Generate Interview Strategy</>}
                        </motion.button>
                    </div>
                </motion.div>

                {/* Recent Reports */}
                <AnimatePresence>
                    {reports && reports.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            style={{ marginTop: '3rem' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Recent Interview Plans</h2>
                                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', background: 'var(--bg-panel)', padding: '0.15rem 0.6rem', borderRadius: '2rem', border: '1px solid var(--border)' }}>{reports.length} plans</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                                {reports.map((report, i) => (
                                    <motion.div
                                        key={report._id}
                                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                        whileHover={{ y: -3, borderColor: 'var(--border-hover)' }}
                                        onClick={() => navigate(`/interview/${report._id}`)}
                                        style={{
                                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                                            borderRadius: 'var(--radius-lg)', padding: '1.25rem',
                                            cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.6rem',
                                            transition: 'border-color 0.2s',
                                        }}
                                    >
                                        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>{report.title || 'Untitled Position'}</h3>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                                            {new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                            <div style={{ flex: 1, height: 4, background: 'var(--bg-panel)', borderRadius: 2, overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${report.matchScore}%`, background: scoreColor(report.matchScore), borderRadius: 2, transition: 'width 0.6s ease' }} />
                                            </div>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: scoreColor(report.matchScore), minWidth: 36 }}>{report.matchScore}%</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
    )
}

export default Home
