import React, { useState } from 'react';
import {
  ScanLine,
  ShieldCheck,
  Zap,
  Activity,
  Stethoscope,
  HeartPulse,
  Database,
  Lock,
  Cpu,
  Server,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileText,
  UserCheck,
  Bell,
  Clock,
  Search,
  BookOpen,
  Camera,
  Download,
  Info
} from 'lucide-react';

const ProjectUserGuideSection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [openStep, setOpenStep] = useState(null);

  const toggleStep = (idx) => {
    setOpenStep(openStep === idx ? null : idx);
  };

  return (
    <section
      style={{
        padding: '5rem 1.5rem',
        background: 'var(--bg-main)',
        color: 'var(--text-main)',
        borderTop: '1px solid var(--border-light)'
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* MAIN SECTION HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--info-bg)',
              color: 'var(--info-text)',
              border: '1px solid var(--info-border)',
              padding: '0.4rem 1.1rem',
              borderRadius: '30px',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '1rem'
            }}
          >
            <Sparkles size={16} /> Complete Project & System User Architecture Guide
          </div>
          <h2
            style={{
              fontSize: 'calc(2rem + 1vw)',
              fontWeight: 800,
              color: 'var(--text-main)',
              margin: 0,
              letterSpacing: '-0.5px'
            }}
          >
            Full Project Overview, Working Architecture & User Guide
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '1.1rem',
              maxWidth: '850px',
              margin: '0.8rem auto 0 auto',
              lineHeight: 1.7
            }}
          >
            A comprehensive, 360-degree guide detailing <strong>what features exist</strong>, <strong>how the full-stack system processes data</strong>, and <strong>step-by-step instructions on how users interact with the platform</strong>.
          </p>
        </div>

        {/* SECTION TAB NAVIGATION */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={() => setActiveTab('features')}
            style={{
              padding: '0.85rem 1.6rem',
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              border: activeTab === 'features' ? 'none' : '1px solid var(--border-light)',
              background: activeTab === 'features' ? '#0d9488' : 'var(--bg-surface)',
              color: activeTab === 'features' ? '#ffffff' : 'var(--text-main)',
              boxShadow: activeTab === 'features' ? '0 8px 20px rgba(13, 148, 136, 0.3)' : 'var(--shadow-xs)',
              transition: 'all 0.2s ease'
            }}
          >
            <Layers size={20} /> 1. All Project Modules & Features
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            style={{
              padding: '0.85rem 1.6rem',
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              border: activeTab === 'architecture' ? 'none' : '1px solid var(--border-light)',
              background: activeTab === 'architecture' ? '#0284c7' : 'var(--bg-surface)',
              color: activeTab === 'architecture' ? '#ffffff' : 'var(--text-main)',
              boxShadow: activeTab === 'architecture' ? '0 8px 20px rgba(2, 132, 199, 0.3)' : 'var(--shadow-xs)',
              transition: 'all 0.2s ease'
            }}
          >
            <Cpu size={20} /> 2. System Architecture & Workflow
          </button>

          <button
            onClick={() => setActiveTab('userguide')}
            style={{
              padding: '0.85rem 1.6rem',
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              border: activeTab === 'userguide' ? 'none' : '1px solid var(--border-light)',
              background: activeTab === 'userguide' ? '#8b5cf6' : 'var(--bg-surface)',
              color: activeTab === 'userguide' ? '#ffffff' : 'var(--text-main)',
              boxShadow: activeTab === 'userguide' ? '0 8px 20px rgba(139, 92, 246, 0.3)' : 'var(--shadow-xs)',
              transition: 'all 0.2s ease'
            }}
          >
            <UserCheck size={20} /> 3. Step-by-Step User Manual
          </button>
        </div>

        {/* TAB 1: ALL FEATURES IN THIS PROJECT */}
        {(activeTab === 'overview' || activeTab === 'features') && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Complete Module Inventory
              </span>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.3rem' }}>
                What Modules and Features Are Included in This Project?
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
              
              {/* Feature 1 */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '22px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'rgba(13, 148, 136, 0.15)', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <ScanLine size={28} />
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                  1. Optical OCR Medicine Label Scanner
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
                  Uploads a photo or captures a live camera image to automatically read medicine names, strengths, expiry dates, batch numbers, dosage guidance, and side effects using optical baseline extraction.
                </p>
              </div>

              {/* Feature 2 */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '22px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'rgba(2, 132, 199, 0.15)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Activity size={28} />
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                  2. AI Face Health & Disease Scanner
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
                  Runs real-time face mesh scanning algorithms on live webcam camera feeds. Analyzes facial skin tone, sclera tint, tissue pallor, and fatigue indicators to generate anemia risk profiles, jaundice alerts, dehydration scores, and stress index reports.
                </p>
              </div>

              {/* Feature 3 */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '22px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Stethoscope size={28} />
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                  3. 100 Pre-Doctor Health Diagnostic Suite
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
                  100 clinical triage assessment checkers categorized into 10 key domains (Symptom Triage, Drug Safety, Chronic Disease, Organ Systems, Lab Readiness, Food-Drug Interactions, Special Populations, Red Flag Emergencies, Doctor Prep, and Side Effects).
                </p>
              </div>

              {/* Feature 4 */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '22px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Database size={28} />
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                  4. Digital Medicine Cabinet ("My Medicines")
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
                  Allows users to securely save all scanned and manually added medicines into a personal MongoDB digital vault. Features category filters (Antibiotics, Analgesics, Painkillers), stock statuses, and expiry date tracking.
                </p>
              </div>

              {/* Feature 5 */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '22px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Bell size={28} />
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                  5. Automatic Expiry & Dosage Reminders
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
                  Automated medicine expiry threshold notification system that highlights item statuses (Safe, 30-Day Warning, Expired) and assists users with timely dosage schedules.
                </p>
              </div>

              {/* Feature 6 */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '22px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Lock size={28} />
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                  6. MERN JWT Auth & Profile Security
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
                  JWT authentication, bcrypt password hashing, patient profile management, emergency contacts, blood group logging, and dark/light themes for full-stack security.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: SYSTEM ARCHITECTURE & HOW IT WORKS */}
        {(activeTab === 'overview' || activeTab === 'architecture') && (
          <div style={{ animation: 'fadeIn 0.3s ease', marginTop: activeTab === 'overview' ? '4rem' : '0' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Full-Stack Technical Pipeline
              </span>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.3rem' }}>
                How Does the System Work at an Underlying Technical Level?
              </h3>
            </div>

            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '2.5rem', boxShadow: 'var(--shadow-sm)', marginBottom: '2.5rem' }}>
              
              {/* Architecture Steps Flow */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '12px', background: '#0d9488', color: '#ffffff', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>
                    01
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    User Image / Video Capture
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                    The React frontend canvas API and file upload handler capture the uploaded photo or live camera feed to inspect raw pixel frames.
                  </p>
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '12px', background: '#0284c7', color: '#ffffff', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>
                    02
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    OCR & Neural Feature Extraction
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                    The Optical Character Recognition (OCR) engine parses text strings from images, while the landmark model extracts 68-point facial mesh coordinates.
                  </p>
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '12px', background: '#8b5cf6', color: '#ffffff', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>
                    03
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    MongoDB & Medical Knowledge Matching
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                    The Node.js Express backend API processes requests and matches queries against an indexed pharmaceutical MongoDB database (indications, dosage, side-effects, interactions).
                  </p>
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '12px', background: '#10b981', color: '#ffffff', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>
                    04
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    JWT Secured State & UI Rendering
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                    Verified JSON payloads return to React state, rendering real-time interactive reports, alert banners, and diagnostic cards on screen.
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 3: STEP-BY-STEP USER GUIDE */}
        {(activeTab === 'overview' || activeTab === 'userguide') && (
          <div style={{ animation: 'fadeIn 0.3s ease', marginTop: activeTab === 'overview' ? '4rem' : '0' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '1px' }}>
                User Onboarding & Workflow
              </span>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.3rem' }}>
                Step-by-Step User Manual
              </h3>
            </div>

            {/* Accordion / Step-by-Step Guide list */}
            <div style={{ maxWidth: '950px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Step 1 */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-xs)' }}>
                <button
                  onClick={() => toggleStep(1)}
                  style={{ width: '100%', padding: '1.35rem 1.75rem', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-main)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#0d9488', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      1
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                        Step 1: Register Account & Log In
                      </h4>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sign Up & JWT Authentication Access</span>
                    </div>
                  </div>
                  {openStep === 1 ? <ChevronUp size={22} color="#0d9488" /> : <ChevronDown size={22} color="var(--text-muted)" />}
                </button>

                {openStep === 1 && (
                  <div style={{ padding: '0 1.75rem 1.5rem 1.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    <p style={{ margin: '0 0 0.8rem 0' }}>
                      <strong>Action:</strong> Click <strong>Register</strong> in the top navigation bar to enter your name, email, and password. Log in after account creation.
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Result:</strong> Unlocks full access to the protected Dashboard and Medicine Scanner, securing your personal health vault.
                    </p>
                  </div>
                )}
              </div>

              {/* Step 2 */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-xs)' }}>
                <button
                  onClick={() => toggleStep(2)}
                  style={{ width: '100%', padding: '1.35rem 1.75rem', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-main)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#0284c7', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      2
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                        Step 2: Scan Medicine Strip / Packaging
                      </h4>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Optical OCR Medicine Identification</span>
                    </div>
                  </div>
                  {openStep === 2 ? <ChevronUp size={22} color="#0284c7" /> : <ChevronDown size={22} color="var(--text-muted)" />}
                </button>

                {openStep === 2 && (
                  <div style={{ padding: '0 1.75rem 1.5rem 1.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    <p style={{ margin: '0 0 0.8rem 0' }}>
                      <strong>Action:</strong> Navigate to <strong>Scan Medicine</strong> (or click 'Scan Medicine Now' on the Home page). Upload a photo of your medicine strip/bottle or select a sample preset.
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Result:</strong> The OCR engine decodes the text and displays drug names, standard dosages, usage guidance, expiry statuses, and side effects. Click <strong>"Add to My Cabinet"</strong> to save it.
                    </p>
                  </div>
                )}
              </div>

              {/* Step 3 */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-xs)' }}>
                <button
                  onClick={() => toggleStep(3)}
                  style={{ width: '100%', padding: '1.35rem 1.75rem', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-main)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#8b5cf6', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      3
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                        Step 3: Run AI Face Health & Disease Scan
                      </h4>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Facial Vitality & Health Metric Evaluation</span>
                    </div>
                  </div>
                  {openStep === 3 ? <ChevronUp size={22} color="#8b5cf6" /> : <ChevronDown size={22} color="var(--text-muted)" />}
                </button>

                {openStep === 3 && (
                  <div style={{ padding: '0 1.75rem 1.5rem 1.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    <p style={{ margin: '0 0 0.8rem 0' }}>
                      <strong>Action:</strong> On the <strong>Dashboard</strong> page under 'AI Face Health Scanner', click <strong>"Start Live Face Camera"</strong>. Keep your face centered within the oval frame for 5 seconds.
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Result:</strong> The AI scanner calculates facial color pallor, fatigue ratings, eye clarity, and hydration scores, displaying them in real-time visual bars.
                    </p>
                  </div>
                )}
              </div>

              {/* Step 4 */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-xs)' }}>
                <button
                  onClick={() => toggleStep(4)}
                  style={{ width: '100%', padding: '1.35rem 1.75rem', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-main)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#f59e0b', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      4
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                        Step 4: Access 100 Pre-Doctor Diagnostic Checkers
                      </h4>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Clinical Domain Triage & Red Flag Warnings</span>
                    </div>
                  </div>
                  {openStep === 4 ? <ChevronUp size={22} color="#f59e0b" /> : <ChevronDown size={22} color="var(--text-muted)" />}
                </button>

                {openStep === 4 && (
                  <div style={{ padding: '0 1.75rem 1.5rem 1.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    <p style={{ margin: '0 0 0.8rem 0' }}>
                      <strong>Action:</strong> Open <strong>Pre-Doctor Checker</strong> from the top menu. Select your symptom or health category (Chest Pain, Hypertension, Drug Interaction, Lab Prep, etc.) and complete the form.
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Result:</strong> The platform compiles doctor-grade triage assessments, urgency ratings (Normal, Caution, Immediate Emergency), and a doctor discussion checklist.
                    </p>
                  </div>
                )}
              </div>

              {/* Step 5 */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-xs)' }}>
                <button
                  onClick={() => toggleStep(5)}
                  style={{ width: '100%', padding: '1.35rem 1.75rem', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-main)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#10b981', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      5
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                        Step 5: Manage Medicine Vault & Track Expiries
                      </h4>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cabinet Inventory & Automated Reminders</span>
                    </div>
                  </div>
                  {openStep === 5 ? <ChevronUp size={22} color="#10b981" /> : <ChevronDown size={22} color="var(--text-muted)" />}
                </button>

                {openStep === 5 && (
                  <div style={{ padding: '0 1.75rem 1.5rem 1.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    <p style={{ margin: '0 0 0.8rem 0' }}>
                      <strong>Action:</strong> Go to <strong>My Medicines</strong> to catalog your home medicine inventory. Add daily dose schedules under the <strong>Reminders</strong> page.
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Result:</strong> Expired items will be highlighted in red, and the system will generate timely dosage alerts.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProjectUserGuideSection;
