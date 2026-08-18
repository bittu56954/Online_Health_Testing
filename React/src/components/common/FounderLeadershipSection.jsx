import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Award,
  Terminal,
  Code2,
  Cpu,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Layers,
  GraduationCap,
  Briefcase,
  HeartPulse,
  Eye,
  ChevronRight
} from 'lucide-react';
import bittuKumarImg from '../../assets/bittu_kumar.jpg';

const FounderLeadershipSection = () => {
  const [activeTab, setActiveTab] = useState('bio');
  const [cliCommand, setCliCommand] = useState('bittu --info');
  const [cliOutput, setCliOutput] = useState(null);

  const runCli = (cmd) => {
    setCliCommand(cmd);
    if (cmd === 'bittu --info') {
      setCliOutput({
        name: 'Bittu Kumar',
        role: 'Founder, Software Engineer & Lead Architect',
        project: 'Smart Medical Care Platform',
        expertise: ['Full Stack MERN Architecture', 'AI & OCR System Design', 'Digital Health Vaults', 'Clinical Triage Systems'],
        status: 'Active Leadership & System Innovation 2026'
      });
    } else if (cmd === 'bittu --skills') {
      setCliOutput({
        languages: ['JavaScript (ES6+)', 'Node.js', 'HTML5/CSS3', 'Python', 'SQL'],
        frameworks: ['React.js', 'Vite', 'Express.js', 'Tailwind CSS', 'Context API'],
        databases: ['MongoDB', 'Mongoose ORM', 'Redis', 'Cloud Persistence'],
        architecture: ['RESTful APIs', 'JWT Security', 'Tesseract OCR', 'Biometric AI', 'System Design']
      });
    } else if (cmd === 'bittu --vision') {
      setCliOutput({
        mission: 'Designing state-of-the-art digital health diagnostic platforms and medicine management tools accessible to everyone.',
        coreValues: ['Technical Excellence', 'Patient Privacy & Security', 'Scalable MERN Architecture', 'Healthcare Empowerment']
      });
    }
  };

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #090d16 0%, #0d1322 100%)',
        padding: '5rem 1.5rem',
        color: '#f8fafc',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(244, 63, 94, 0.15)',
        borderBottom: '1px solid rgba(244, 63, 94, 0.15)'
      }}
    >
      {/* Subtle background glow effect */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* HEADER TITLE AREA */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              fontSize: '0.85rem',
              fontWeight: 800,
              color: '#f43f5e',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '0.6rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Sparkles size={16} /> FOUNDER & LEADERSHIP
          </div>
          <h2
            style={{
              fontSize: 'calc(2.2rem + 1vw)',
              fontWeight: 900,
              margin: 0,
              letterSpacing: '-1px',
              background: 'linear-gradient(90deg, #ff4b72 0%, #f43f5e 50%, #fb7185 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(244, 63, 94, 0.3)'
            }}
          >
            The Founder & Technical Architect
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: '#94a3b8',
              marginTop: '0.8rem',
              maxWidth: '750px',
              margin: '0.8rem auto 0 auto',
              lineHeight: 1.65
            }}
          >
            Meet Bittu Kumar—Software Engineer, Full-Stack Architect, and Creator of Smart Medical Care, driving the mission to deliver intelligent digital health scanners, optical medicine label recognition, and secure health management systems.
          </p>
        </div>

        {/* MAIN CARD CONTAINER */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(244, 63, 94, 0.25)',
            borderRadius: '28px',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(244, 63, 94, 0.1)',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 340px) 1fr',
            gap: '3rem',
            alignItems: 'start'
          }}
          className="founder-card-grid"
        >
          {/* LEFT COLUMN: AVATAR & SOCIAL LINKS */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            
            {/* Glowing Circular Avatar with Bittu Kumar Photo */}
            <div
              style={{
                position: 'relative',
                width: '210px',
                height: '210px',
                borderRadius: '50%',
                padding: '5px',
                background: 'linear-gradient(135deg, #f43f5e 0%, #38bdf8 50%, #f59e0b 100%)',
                boxShadow: '0 0 35px rgba(244, 63, 94, 0.35)',
                marginBottom: '1.75rem'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <img
                  src={bittuKumarImg}
                  alt="Bittu Kumar - Founder & Lead Software Architect"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top'
                  }}
                />
              </div>
            </div>

            {/* Platform Status Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(244, 63, 94, 0.4)',
                padding: '0.55rem 1.1rem',
                borderRadius: '30px',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
              }}
            >
              <span
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 10px #10b981'
                }}
              />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                SMART MEDICAL CARE LEAD ARCHITECT
              </span>
            </div>

            {/* Social Icons Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                title="GitHub Profile"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#e2e8f0',
                  transition: 'all 0.25s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f43f5e';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#e2e8f0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Github size={19} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Profile"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#e2e8f0',
                  transition: 'all 0.25s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#0284c7';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#e2e8f0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Linkedin size={19} />
              </a>

              <a
                href="mailto:contact@smartmedicalcare.org"
                title="Send Email"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#e2e8f0',
                  transition: 'all 0.25s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#10b981';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#e2e8f0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Mail size={19} />
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: NAVIGATION TABS & TAB CONTENT */}
          <div>
            {/* TABS NAVIGATION HEADER */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                paddingBottom: '0.5rem',
                marginBottom: '1.75rem',
                overflowX: 'auto'
              }}
            >
              <button
                onClick={() => setActiveTab('bio')}
                style={{
                  padding: '0.65rem 1.15rem',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: activeTab === 'bio' ? '#f43f5e' : '#94a3b8',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'bio' ? '3px solid #f43f5e' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <GraduationCap size={18} /> Bio Profile
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                style={{
                  padding: '0.65rem 1.15rem',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: activeTab === 'skills' ? '#f43f5e' : '#94a3b8',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'skills' ? '3px solid #f43f5e' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Cpu size={18} /> Skills & Tech Stack
              </button>

              <button
                onClick={() => {
                  setActiveTab('cli');
                  runCli('bittu --info');
                }}
                style={{
                  padding: '0.65rem 1.15rem',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: activeTab === 'cli' ? '#f43f5e' : '#94a3b8',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'cli' ? '3px solid #f43f5e' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Terminal size={18} /> Founder's CLI
              </button>

              <button
                onClick={() => setActiveTab('vision')}
                style={{
                  padding: '0.65rem 1.15rem',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: activeTab === 'vision' ? '#f43f5e' : '#94a3b8',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'vision' ? '3px solid #f43f5e' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Eye size={18} /> Vision Statement
              </button>
            </div>

            {/* TAB CONTENT 1: BIO PROFILE */}
            {activeTab === 'bio' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    color: '#f43f5e',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.3rem'
                  }}
                >
                  FOUNDER, CHIEF SOFTWARE ARCHITECT & FULL-STACK DEVELOPER
                </span>
                
                <h3
                  style={{
                    fontSize: '2.1rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    marginBottom: '1.25rem',
                    letterSpacing: '-0.5px'
                  }}
                >
                  BITTU KUMAR
                </h3>

                <p
                  style={{
                    fontSize: '0.98rem',
                    color: '#cbd5e1',
                    lineHeight: 1.75,
                    marginBottom: '1.25rem'
                  }}
                >
                  Bittu Kumar is a Senior Software Engineer and Lead Full-Stack Architect who conceptualized and built the <strong>Smart Medical Care</strong> platform with the vision of providing accessible, reliable, and intelligent digital healthcare solutions.
                </p>

                <p
                  style={{
                    fontSize: '0.98rem',
                    color: '#cbd5e1',
                    lineHeight: 1.75,
                    marginBottom: '1.75rem'
                  }}
                >
                  He engineered the platform's end-to-end MERN stack architecture, integrating optical character recognition (OCR) for medicine label analysis, real-time facial biometric vitality scanning, 100 pre-doctor diagnostic checkers, digital medicine cabinet vaulting, and JWT security controls.
                </p>

                {/* HASHTAG BADGES GRID */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {[
                    '#SmartMedicalCare',
                    '#SoftwareEngineering',
                    '#FullStackArchitect',
                    '#MERNStack',
                    '#AIHealthScanner',
                    '#OCRMedicineLabel',
                    '#PreDoctorChecker',
                    '#DigitalHealthVault'
                  ].map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'rgba(244, 63, 94, 0.12)',
                        border: '1px solid rgba(244, 63, 94, 0.3)',
                        color: '#f43f5e',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        padding: '0.35rem 0.85rem',
                        borderRadius: '20px'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: SKILLS & TECH STACK */}
            {activeTab === 'skills' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                  TECHNICAL COMPETENCY & DOMAIN EXPERTISE
                </span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', marginBottom: '1.25rem' }}>
                  Engineering & Architecture Stack
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.1rem', borderRadius: '16px' }}>
                    <div style={{ fontWeight: 800, color: '#38bdf8', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Code2 size={18} /> Frontend Stack
                    </div>
                    <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                      React.js, Vite, HTML5, CSS3, Tailwind CSS, Responsive UI, Context API
                    </p>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.1rem', borderRadius: '16px' }}>
                    <div style={{ fontWeight: 800, color: '#f43f5e', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Cpu size={18} /> Backend Architecture
                    </div>
                    <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                      Node.js, Express.js, REST APIs, Microservices, JWT Auth, Node OCR Engine
                    </p>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.1rem', borderRadius: '16px' }}>
                    <div style={{ fontWeight: 800, color: '#10b981', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Layers size={18} /> Databases & Cloud
                    </div>
                    <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                      MongoDB, Mongoose ORM, Redis Caching, Cloud Persistence, Security Encryption
                    </p>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.1rem', borderRadius: '16px' }}>
                    <div style={{ fontWeight: 800, color: '#f59e0b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <BookOpen size={18} /> System Innovation
                    </div>
                    <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                      Healthcare Data Analytics, MERN System Design, Optical OCR Algorithms, Security Controls
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: FOUNDER'S CLI */}
            {activeTab === 'cli' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                  INTERACTIVE SYSTEM TERMINAL
                </span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', marginBottom: '1.25rem' }}>
                  Founder's CLI Execution
                </h3>

                <div
                  style={{
                    background: '#090d16',
                    borderRadius: '16px',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    padding: '1.25rem',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.88rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    <button
                      onClick={() => runCli('bittu --info')}
                      style={{ background: 'rgba(255,255,255,0.1)', color: '#38bdf8', border: '1px solid rgba(255,255,255,0.15)', padding: '0.3rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      bittu --info
                    </button>
                    <button
                      onClick={() => runCli('bittu --skills')}
                      style={{ background: 'rgba(255,255,255,0.1)', color: '#f43f5e', border: '1px solid rgba(255,255,255,0.15)', padding: '0.3rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      bittu --skills
                    </button>
                    <button
                      onClick={() => runCli('bittu --vision')}
                      style={{ background: 'rgba(255,255,255,0.1)', color: '#10b981', border: '1px solid rgba(255,255,255,0.15)', padding: '0.3rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      bittu --vision
                    </button>
                  </div>

                  <div style={{ color: '#4ade80', marginBottom: '0.75rem' }}>
                    <span style={{ color: '#f43f5e' }}>bittu@architect:~$</span> {cliCommand}
                  </div>

                  {cliOutput && (
                    <pre style={{ margin: 0, color: '#e2e8f0', whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '0.84rem' }}>
                      {JSON.stringify(cliOutput, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: VISION STATEMENT */}
            {activeTab === 'vision' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                  CORE MISSION & HEALTHCARE VALUES
                </span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', marginBottom: '1.25rem' }}>
                  Vision for Digital Health & System Excellence
                </h3>

                <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', padding: '1.5rem', borderRadius: '18px', marginBottom: '1.25rem' }}>
                  <p style={{ color: '#fef3c7', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>
                    "Our vision for Smart Medical Care is to empower every individual with instant, non-invasive digital health screening, verified pharmaceutical OCR identification, and comprehensive pre-doctor clinical guidance."
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={18} color="#f43f5e" /> Non-Invasive Digital Diagnostics
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={18} color="#f43f5e" /> Full-Stack Security & Privacy
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={18} color="#f43f5e" /> Real-Time OCR & Biometric AI
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={18} color="#f43f5e" /> Comprehensive Pre-Doctor Guidance
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default FounderLeadershipSection;

