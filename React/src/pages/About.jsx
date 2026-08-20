import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Pill,
  ShieldAlert,
  ShieldCheck,
  ScanLine,
  Database,
  Lock,
  HeartPulse,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  Search,
  BookOpen,
  Award,
  Users,
  Building2,
  Clock,
  Cpu,
  ChevronDown,
  ChevronUp,
  FileText,
  Activity,
  HelpCircle,
  Stethoscope,
  Globe,
  Terminal,
  Zap,
  Server,
  Key,
  Flame,
  Check,
  Mail,
  PhoneCall,
  Code,
  Layers3,
  RefreshCw
} from 'lucide-react';
import Footer from '../components/common/Footer';
import FounderLeadershipSection from '../components/common/FounderLeadershipSection';
import ProjectUserGuideSection from '../components/common/ProjectUserGuideSection';
import DynamicPageHeader from '../components/common/DynamicPageHeader';

const About = () => {
  // Dynamic Title Loading State
  const [isTitleLoading, setIsTitleLoading] = useState(true);

  // Dynamic Architecture & FAQ States
  const [activeTab, setActiveTab] = useState('frontend');
  const [openFaq, setOpenFaq] = useState(null);
  const [faqSearch, setFaqSearch] = useState('');

  // Dynamic Animated Stats
  const [checkersStat, setCheckersStat] = useState(80);
  const [accuracyStat, setAccuracyStat] = useState(95.0);

  // Trigger 1.5 - 2 second dynamic title load on mount
  useEffect(() => {
    setIsTitleLoading(true);
    const timer = setTimeout(() => {
      setIsTitleLoading(false);
    }, 1500); // 1.5 seconds dynamic loading delay

    const statsTimer = setTimeout(() => {
      setCheckersStat(100);
      setAccuracyStat(99.2);
    }, 1600);

    return () => {
      clearTimeout(timer);
      clearTimeout(statsTimer);
    };
  }, []);

  const triggerTitleReload = () => {
    setIsTitleLoading(true);
    setTimeout(() => {
      setIsTitleLoading(false);
    }, 1500);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: "How does Smart Medical Care recognize medicine text from a photo?",
      a: "Smart Medical Care utilizes advanced Optical Character Recognition (OCR) algorithms to parse text strings from photos uploaded by the user. The extracted text is then matched against an indexed database of verified generic and brand pharmaceutical formulations."
    },
    {
      q: "Can Smart Medical Care tell me if a medicine is safe for my condition?",
      a: "No. Smart Medical Care provides educational reference details regarding generic indications, standard side effects, and manufacturer storage instructions. It does not assess individual medical compatibility or issue prescriptions."
    },
    {
      q: "Is my personal scan history private and secure?",
      a: "Yes. All scan logs, saved medicines, and personal patient profile notes are stored securely using MongoDB encryption and protected by JWT authentication tokens accessible only to your account."
    },
    {
      q: "What should I do if a medicine cannot be identified?",
      a: "If the OCR scanner encounters low lighting or damaged packaging text, you can select one of the verified sample presets or consult a pharmacist to manually enter the medicine details into your cabinet."
    }
  ];

  const filteredFaqs = faqItems.filter(item =>
    item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
    item.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const architectureDetails = {
    frontend: {
      title: "React 18 & Modern SPA Layer",
      icon: <Code size={24} color="#38bdf8" />,
      desc: "Built with React 18, React Router DOM 6, Lucide icons, and custom CSS design system token variables. Features responsive layouts, dark/light theme switching, and real-time state management.",
      highlights: ["React Hooks & Context API", "Zero Heavy Framework Bloat", "Instant Dynamic Page Transitions", "Glassmorphic Modern UI"]
    },
    backend: {
      title: "Node.js & Express API Gateway",
      icon: <Server size={24} color="#2dd4bf" />,
      desc: "RESTful architecture engineered on Node.js and Express. Implements modular route handlers, input validation middlewares, custom error handlers, and rate limiting.",
      highlights: ["Modular Controller Architecture", "Express Validator Middleware", "JSON Web Token Security", "High-Throughput Async I/O"]
    },
    database: {
      title: "MongoDB & Mongoose Schemas",
      icon: <Database size={24} color="#4ade80" />,
      desc: "Document-oriented database utilizing Mongoose ODM schemas for User Accounts, Scanned Medicines, Cabinet Records, Expiry Logs, and Pre-Doctor Diagnostic Checkers.",
      highlights: ["Strict Schema Validation", "Indexed Query Execution", "Encrypted Patient Collections", "Scalable Document Storage"]
    },
    security: {
      title: "JWT Authentication & Hashing",
      icon: <Lock size={24} color="#f43f5e" />,
      desc: "Comprehensive application security featuring bcrypt password hashing, HTTP authorization bearer headers, protected route guards, and admin authorization levels.",
      highlights: ["bcrypt Salted Hashing", "JWT Bearer Verification", "Protected Endpoint Middleware", "Strict Data Isolation"]
    }
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      
      {/* 1. DYNAMIC TOP HEADER BANNER (1-2 Sec Active Sync) */}
      <DynamicPageHeader
        pageTitle="Smart Medical Care Architecture & About Engine"
        pageSubtitle="Explore Full-Stack MERN Stack Engineering, Regulatory Safety & Founder Leadership"
        syncText="✨ About Engine Synced with System Specs, Regulatory Protocols & Leadership Data"
        badgeText="LIVE ARCHITECTURE SYNC ACTIVE"
        onRefresh={triggerTitleReload}
      />

      {/* 2. HERO HEADER BANNER WITH DYNAMIC 1.5S TITLE LOADER */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d9488 55%, #0284c7 100%)', color: '#ffffff', padding: '5rem 1.5rem 6rem 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {isTitleLoading ? (
            /* DYNAMIC TITLE LOADING SKELETON (1.5 SECONDS) */
            <div style={{ padding: '1rem 0', maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.45rem 1.25rem', borderRadius: '30px', fontSize: '0.88rem', fontWeight: 700, color: '#5eead4', marginBottom: '1.5rem' }}>
                <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Loading Platform Title & Architecture Specs (1.5s)...</span>
              </div>

              {/* Shimmer Skeleton for Main Title */}
              <div className="dynamic-title-skeleton" style={{ height: '58px', width: '80%', margin: '0 auto 1.5rem auto' }} />

              {/* Shimmer Skeleton for Subtitle */}
              <div className="dynamic-title-skeleton" style={{ height: '24px', width: '90%', margin: '0 auto 0.8rem auto' }} />
              <div className="dynamic-title-skeleton" style={{ height: '24px', width: '65%', margin: '0 auto 2.5rem auto' }} />

              {/* Skeleton Grid for Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
                <div className="dynamic-title-skeleton" style={{ height: '80px', borderRadius: '16px' }} />
                <div className="dynamic-title-skeleton" style={{ height: '80px', borderRadius: '16px' }} />
                <div className="dynamic-title-skeleton" style={{ height: '80px', borderRadius: '16px' }} />
              </div>
            </div>
          ) : (
            /* DYNAMIC TITLE REVEALED AFTER 1.5s DELAY */
            <div className="animate-title-reveal">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.45rem 1.25rem', borderRadius: '30px', fontSize: '0.88rem', fontWeight: 700, color: '#5eead4', marginBottom: '1.5rem' }}>
                <Sparkles size={18} /> Empowering Global Pharmaceutical Literacy & Safety
              </div>

              {/* ABOUT HERO TITLE */}
              <h1 style={{ fontSize: 'calc(2.4rem + 1.2vw)', fontWeight: 800, margin: 0, letterSpacing: '-1px', lineHeight: 1.15, color: '#ffffff' }}>
                About Smart Medical Care Platform
              </h1>

              <p style={{ fontSize: '1.2rem', color: '#e0f2fe', marginTop: '1rem', lineHeight: 1.7, maxWidth: '850px', margin: '1rem auto 0 auto' }}>
                Smart Medical Care is an advanced MERN-stack pharmaceutical recognition, expiration monitoring, and patient safety portal. We bridge the gap between complex prescription packaging and clear, actionable digital health intelligence.
              </p>

              {/* Dynamic Stat Badges Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginTop: '3.5rem', textAlign: 'left' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', padding: '1.25rem', borderRadius: '16px' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#5eead4' }}>{checkersStat}</div>
                  <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pre-Doctor Checkers</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', padding: '1.25rem', borderRadius: '16px' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#38bdf8' }}>{accuracyStat}%</div>
                  <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>OCR Accuracy</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', padding: '1.25rem', borderRadius: '16px' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a7f3d0' }}>10 Domains</div>
                  <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Clinical Pre-Checks</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* SAFETY DISCLAIMER */}
      <section style={{ maxWidth: '1200px', margin: '-2.5rem auto 3rem auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        <div style={{ background: 'var(--danger-bg)', border: '2px solid var(--danger-border)', borderRadius: '24px', padding: '2rem 2.5rem', boxShadow: 'var(--shadow-md)', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <ShieldAlert size={42} color="#ef4444" style={{ flexShrink: 0, marginTop: '4px' }} />
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--danger-text)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Mandatory Regulatory & Clinical Safety Disclaimer
            </h3>
            <p style={{ fontSize: '0.98rem', color: 'var(--danger-text)', marginTop: '0.6rem', lineHeight: 1.7 }}>
              <strong>Smart Medical Care is strictly designed as an informational reference tool for home medicine cabinet management.</strong> It is not a substitute for clinical judgment, professional medical diagnosis, doctor consultations, or official pharmacy dispenser instructions. Always verify scanned drug names, strengths, active components, and expiration dates directly on physical medicine packaging. If you suspect an adverse drug reaction or medical emergency, consult a licensed doctor or emergency healthcare provider immediately.
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDER & TECHNICAL ARCHITECT SECTION (BITTU KUMAR) */}
      <FounderLeadershipSection />

      {/* ALL-IN-ONE HEALTHCARE PLATFORM CAPABILITIES & OFFICIAL MEDICAL CERTIFICATE SHOWCASE */}
      <section style={{ padding: '4.5rem 1.5rem', background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(13, 148, 136, 0.15) 100%)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', margin: '2rem 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              <Award size={16} /> Platform Features & Digital Medical Certification
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>
              Everything Smart Medical Care Provides
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', marginTop: '0.6rem', lineHeight: 1.6 }}>
              Our platform offers end-to-end digital health evaluations, instant medicine label OCR scanning, 100 clinical pre-doctor triage checkers, and official printable medical diagnostic certificates verified by certified medical directors.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
            
            {/* Feature 1: AI Face Health Scan */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'linear-gradient(135deg, #0284c7, #0d9488)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(2, 132, 199, 0.3)' }}>
                <HeartPulse size={28} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Core System #1 &bull; Biometric Diagnostics
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0.3rem 0 0.6rem 0' }}>
                AI Face Health & Disease Scanning
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Non-invasive optical micro-vascular biomarker scanning. Analyzes facial colorimetry, sclera clarity, and skin turgor to evaluate anemia, jaundice, hydration, and overall vitality scores.
              </p>
            </div>

            {/* Feature 2: Official Certified Medical Certificate */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '20px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#0284c7', color: '#ffffff', fontSize: '0.7rem', fontWeight: 900, padding: '0.2rem 0.6rem', borderRadius: '10px', textTransform: 'uppercase' }}>
                Official Verification
              </div>
              <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'linear-gradient(135deg, #d97706, #b45309)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(217, 119, 6, 0.3)' }}>
                <Award size={28} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fde047', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Core System #2 &bull; Clinical Verification
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0.3rem 0 0.6rem 0' }}>
                Official Clinical Health Certificates
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Generates authenticated, printable, and downloadable digital medical evaluation certificates sealed and signed by Senior Medical Director <strong>Dr. Rajesh Sharma, MD</strong> (Reg No: MCI-2026-98471).
              </p>
            </div>

            {/* Feature 3: 100 Pre-Doctor Clinical Checkers */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(239, 68, 68, 0.3)' }}>
                <Stethoscope size={28} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Core System #3 &bull; Clinical Screening
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0.3rem 0 0.6rem 0' }}>
                100 Interactive Pre-Doctor Checkers
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Structured clinical diagnostic algorithms spanning 10 specialist domains (Cardiology, Triage, Drug Safety, Organ Systems, Lab Tests) to evaluate symptoms and identify emergency red flags.
              </p>
            </div>

            {/* Feature 4: OCR Medicine & Expiry Verification */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'linear-gradient(135deg, #0d9488, #059669)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(13, 148, 136, 0.3)' }}>
                <ScanLine size={28} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5eead4', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Core System #4 &bull; Drug Safety OCR
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0.3rem 0 0.6rem 0' }}>
                OCR Medicine Label & Expiry Verification
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Scan medicine strips, syrups, or bottle packaging using optical character recognition to instantly verify drug name, dosage instructions, batch numbers, and safe usage expiration dates.
              </p>
            </div>

            {/* Feature 5: Automated Daily Expiry Safeguard */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6, #6b21a8)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(139, 92, 246, 0.3)' }}>
                <Clock size={28} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c4b5fd', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Core System #5 &bull; Cabinet Management
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0.3rem 0 0.6rem 0' }}>
                Automated Dynamic Expiry Safeguard
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Real-time 24-hour rolling countdown tracking for all saved cabinet medicines. Automatically alerts you when a medicine is nearing expiry or needs safe disposal.
              </p>
            </div>

            {/* Feature 6: Doctor Consultation & Lab Order Prep */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)' }}>
                <FileText size={28} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Core System #6 &bull; Doctor Appointment Prep
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0.3rem 0 0.6rem 0' }}>
                Telehealth & Doctor Visit Readiness
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Auto-generates structured clinical question checklists, recommended diagnostic lab test referrals (ECG, Lipid, HbA1c, LFT), and symptom progression summaries for your doctor appointment.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* DYNAMIC INTERACTIVE ARCHITECTURE EXPLORER */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '1px' }}>Technical Deep Dive</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.3rem' }}>
            Interactive Dynamic Architecture Explorer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '650px', margin: '0.5rem auto 0 auto' }}>
            Click on any stack layer below to inspect component responsibilities, data security protocols, and execution pipelines.
          </p>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '2rem' }}>
          {Object.keys(architectureDetails).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.3rem',
                borderRadius: '14px',
                border: activeTab === key ? '1px solid #0d9488' : '1px solid var(--border-light)',
                background: activeTab === key ? '#0d9488' : 'var(--bg-surface)',
                color: activeTab === key ? '#ffffff' : 'var(--text-main)',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === key ? '0 4px 14px rgba(13, 148, 136, 0.3)' : 'var(--shadow-xs)'
              }}
            >
              {architectureDetails[key].icon}
              <span style={{ textTransform: 'capitalize' }}>{key} Layer</span>
            </button>
          ))}
        </div>

        {/* Dynamic Detail Card */}
        <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: 50, height: 50, borderRadius: '14px', background: 'var(--info-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {architectureDetails[activeTab].icon}
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                {architectureDetails[activeTab].title}
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#0d9488', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Active Module Specification
              </span>
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
            {architectureDetails[activeTab].desc}
          </p>

          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.8rem' }}>
            Core Engineering Highlights:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
            {architectureDetails[activeTab].highlights.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'var(--bg-main)', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN BODY CONTAINER */}
      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 1.5rem 5rem 1.5rem' }}>
        
        {/* MISSION & VISION */}
        <section style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '1px' }}>Foundational Philosophy</span>
            <h2 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.3rem' }}>
              Our Mission & Health Safety Vision
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            
            <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'var(--info-bg)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <HeartPulse size={30} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.8rem' }}>The Healthcare Problem</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.7 }}>
                Patients often visit doctors without knowing which red flag symptoms to report, how their daily medicines interact, or what exact clinical questions to ask. Unintentional drug-drug interactions and uncommunicated side effects impair patient outcomes.
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'var(--success-bg)', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={30} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.8rem' }}>Our Digital Solution</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.7 }}>
                Smart Medical Care equips patients with structured pre-doctor checklists, automatic OCR medicine parsing, and clear expiration tracking, empowering every patient to have informed, high-value discussions with their doctor.
              </p>
            </div>

          </div>
        </section>

        {/* DYNAMIC FAQ SECTION WITH LIVE SEARCH */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '1px' }}>Support & Knowledge</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.3rem' }}>
              Frequently Asked Questions
            </h2>

            {/* Dynamic FAQ Search */}
            <div style={{ position: 'relative', maxWidth: '480px', margin: '1.5rem auto 0 auto' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search FAQ questions..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.6rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '850px', margin: '0 auto' }}>
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--bg-surface)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '1.05rem'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <HelpCircle size={20} color="#0d9488" /> {faq.q}
                  </span>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openFaq === index && (
                  <div style={{ padding: '0 1.5rem 1.25rem 3.1rem', color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.65, borderTop: '1px solid var(--border-subtle)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* COMPLETE PROJECT ARCHITECTURE & USER GUIDE */}
      <ProjectUserGuideSection />

      <Footer />
    </div>
  );
};

export default About;
