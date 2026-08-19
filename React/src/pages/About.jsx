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
