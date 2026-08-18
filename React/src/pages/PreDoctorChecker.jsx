import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  PRE_DOCTOR_CATEGORIES,
  PRE_DOCTOR_FEATURES
} from '../data/preDoctorFeaturesData';
import {
  Stethoscope,
  Pill,
  Activity,
  HeartPulse,
  FileText,
  Apple,
  Users,
  ShieldAlert,
  ClipboardList,
  AlertTriangle,
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Printer,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Info,
  ShieldCheck,
  Zap,
  Filter
} from 'lucide-react';
import Footer from '../components/common/Footer';
import DoctorBillModal from '../components/common/DoctorBillModal';

// Helper icon resolver
const getCategoryIcon = (iconName, size = 20, color = 'currentColor') => {
  switch (iconName) {
    case 'Stethoscope': return <Stethoscope size={size} color={color} />;
    case 'Pill': return <Pill size={size} color={color} />;
    case 'Activity': return <Activity size={size} color={color} />;
    case 'HeartPulse': return <HeartPulse size={size} color={color} />;
    case 'FileText': return <FileText size={size} color={color} />;
    case 'Apple': return <Apple size={size} color={color} />;
    case 'Users': return <Users size={size} color={color} />;
    case 'ShieldAlert': return <ShieldAlert size={size} color={color} />;
    case 'ClipboardList': return <ClipboardList size={size} color={color} />;
    case 'AlertTriangle': return <AlertTriangle size={size} color={color} />;
    default: return <Sparkles size={size} color={color} />;
  }
};

const PreDoctorChecker = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFeature, setActiveFeature] = useState(null);
  const [formData, setFormData] = useState({});
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [showDoctorBill, setShowDoctorBill] = useState(false);

  // Filter features
  const filteredFeatures = useMemo(() => {
    return PRE_DOCTOR_FEATURES.filter((feat) => {
      const matchesCategory = selectedCategory === 'all' || feat.categoryId === selectedCategory;
      const matchesSearch =
        feat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feat.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feat.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Open modal for a feature
  const openFeatureModal = (feature) => {
    setActiveFeature(feature);
    setFormData({});
    setAssessmentResult(null);
  };

  // Close modal
  const closeModal = () => {
    setActiveFeature(null);
    setFormData({});
    setAssessmentResult(null);
  };

  // Handle form change
  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Handle multiselect toggle
  const handleMultiSelectToggle = (fieldName, option) => {
    const current = formData[fieldName] || [];
    let updated;
    if (current.includes(option)) {
      updated = current.filter((item) => item !== option);
    } else {
      updated = [...current, option];
    }
    setFormData((prev) => ({
      ...prev,
      [fieldName]: updated
    }));
  };

  // Evaluate assessment
  const handleRunCheck = (e) => {
    e.preventDefault();
    if (!activeFeature) return;
    const result = activeFeature.evaluate(formData);
    setAssessmentResult(result);
  };

  // Print summary report
  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="pre-doctor-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      {/* 1. HERO BANNER */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0284c7 50%, #0d9488 100%)', color: '#ffffff', padding: '4rem 1.5rem 5rem 1.5rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.5rem 1.25rem', borderRadius: '30px', fontSize: '0.88rem', fontWeight: 700, color: '#38bdf8', marginBottom: '1.25rem' }}>
            <Stethoscope size={18} /> Smart Medical Care Pre-Doctor Clinical Suite (100 Verified Features)
          </div>
          <h1 style={{ fontSize: 'calc(2.2rem + 1vw)', fontWeight: 800, margin: 0, letterSpacing: '-0.5px', lineHeight: 1.15, color: '#ffffff' }}>
            100 Pre-Doctor Health & Medicine Checkers
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#e0f2fe', marginTop: '1rem', maxWidth: '850px', margin: '1rem auto 0 auto', lineHeight: 1.6 }}>
            Run evidence-based clinical assessments before visiting your physician. Obtain doctor-grade triage analysis, red flag warnings, recommended lab tests, pre-appointment preparation steps, and high-yield questions for your doctor.
          </p>

          {/* Quick Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '3rem', textAlign: 'left' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '1rem 1.25rem', borderRadius: '16px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8' }}>100</div>
              <div style={{ fontSize: '0.82rem', color: '#e2e8f0', textTransform: 'uppercase', fontWeight: 600 }}>Clinical Features</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '1rem 1.25rem', borderRadius: '16px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#5eead4' }}>10</div>
              <div style={{ fontSize: '0.82rem', color: '#e2e8f0', textTransform: 'uppercase', fontWeight: 600 }}>Medical Domains</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '1rem 1.25rem', borderRadius: '16px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fcd34d' }}>100%</div>
              <div style={{ fontSize: '0.82rem', color: '#e2e8f0', textTransform: 'uppercase', fontWeight: 600 }}>Doctor-Level Guidance</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & CATEGORY SELECTOR */}
      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '2rem 1.5rem 5rem 1.5rem' }}>
        
        {/* Search Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ position: 'relative', maxWidth: '650px', margin: '0 auto' }}>
            <Search size={22} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search across all 100 pre-doctor features (e.g. Chest pain, Lisinopril, Statin, Diabetes)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1.25rem 1rem 3.25rem',
                fontSize: '1.05rem',
                borderRadius: '16px',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-surface)',
                color: 'var(--text-main)',
                boxShadow: 'var(--shadow-sm)',
                outline: 'none'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <XCircle size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2.5rem', scrollbarWidth: 'thin' }}>
          {PRE_DOCTOR_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.15rem',
                  borderRadius: '12px',
                  border: isSelected ? `2px solid ${cat.color}` : '1px solid var(--border-light)',
                  background: isSelected ? `${cat.color}15` : 'var(--bg-surface)',
                  color: isSelected ? cat.color : 'var(--text-main)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? 'var(--shadow-xs)' : 'none'
                }}
              >
                {getCategoryIcon(cat.icon, 18, isSelected ? cat.color : 'var(--text-muted)')}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Grid Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Showing <span style={{ color: '#0284c7' }}>{filteredFeatures.length}</span> Features
          </div>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              style={{ background: 'none', border: 'none', color: '#0284c7', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
            >
              Reset Category Filter
            </button>
          )}
        </div>

        {/* 3. FEATURE CARDS GRID (100 FEATURES) */}
        {filteredFeatures.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1.5rem', background: 'var(--bg-surface)', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
            <Search size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>No features matched your search</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Try searching for a different symptom, medication, or disease topic.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              style={{ marginTop: '1.25rem', padding: '0.6rem 1.25rem', borderRadius: '10px', background: '#0284c7', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              Clear Search Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {filteredFeatures.map((feat) => (
              <div
                key={feat.id}
                className="feature-card"
                style={{
                  background: 'var(--bg-surface)',
                  borderRadius: '20px',
                  border: '1px solid var(--border-light)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div>
                  {/* Card Category Tag */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '20px', background: 'var(--bg-primary-50, rgba(2,132,199,0.1))', color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      #{feat.id} • {feat.categoryName}
                    </span>
                    <Stethoscope size={18} color="#0284c7" />
                  </div>

                  {/* Title & Summary */}
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 0.5rem 0', lineHeight: 1.3 }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                    {feat.summary}
                  </p>
                </div>

                {/* Run Assessment Button */}
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                  <button
                    onClick={() => openFeatureModal(feat)}
                    style={{
                      width: '100%',
                      padding: '0.7rem 1rem',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #0284c7, #0d9488)',
                      color: '#ffffff',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)'
                    }}
                  >
                    Check Before Doctor Visit <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 4. CLINICAL EVALUATION MODAL DRAWER */}
      {activeFeature && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <div
            style={{
              background: 'var(--bg-surface)',
              borderRadius: '24px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1px solid var(--border-light)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, rgba(2,132,199,0.08), rgba(13,148,136,0.08))'
              }}
            >
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
                  Pre-Doctor Clinical Assessment #{activeFeature.id}
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                  {activeFeature.title}
                </h2>
              </div>
              <button
                onClick={closeModal}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.25rem' }}
              >
                <XCircle size={26} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '2rem', flex: 1 }}>
              {!assessmentResult ? (
                /* STEP 1: INPUT FORM */
                <form onSubmit={handleRunCheck}>
                  <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', background: 'var(--bg-primary-50, rgba(2,132,199,0.05))', borderRadius: '14px', borderLeft: '4px solid #0284c7', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <Info size={18} color="#0284c7" style={{ float: 'left', marginRight: '0.5rem' }} />
                    Enter your current symptoms, medications, or vitals below to generate a clinically structured evaluation to review with your healthcare provider.
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {activeFeature.fields.map((field, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {field.label}
                        </label>

                        {field.type === 'select' && (
                          <select
                            value={formData[field.name] || field.options[0]}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            style={{
                              width: '100%',
                              padding: '0.75rem 1rem',
                              borderRadius: '12px',
                              border: '1px solid var(--border-light)',
                              background: 'var(--bg-main)',
                              color: 'var(--text-main)',
                              fontSize: '0.95rem',
                              outline: 'none'
                            }}
                          >
                            {field.options.map((opt, oIdx) => (
                              <option key={oIdx} value={opt}>{opt}</option>
                            ))}
                          </select>
                        )}

                        {field.type === 'text' && (
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            style={{
                              width: '100%',
                              padding: '0.75rem 1rem',
                              borderRadius: '12px',
                              border: '1px solid var(--border-light)',
                              background: 'var(--bg-main)',
                              color: 'var(--text-main)',
                              fontSize: '0.95rem',
                              outline: 'none'
                            }}
                          />
                        )}

                        {field.type === 'multiselect' && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                            {field.options.map((opt, oIdx) => {
                              const isChecked = (formData[field.name] || []).includes(opt);
                              return (
                                <button
                                  type="button"
                                  key={oIdx}
                                  onClick={() => handleMultiSelectToggle(field.name, opt)}
                                  style={{
                                    padding: '0.45rem 0.85rem',
                                    borderRadius: '20px',
                                    border: isChecked ? '1px solid #0284c7' : '1px solid var(--border-light)',
                                    background: isChecked ? 'rgba(2,132,199,0.12)' : 'var(--bg-main)',
                                    color: isChecked ? '#0284c7' : 'var(--text-muted)',
                                    fontSize: '0.85rem',
                                    fontWeight: isChecked ? 700 : 500,
                                    cursor: 'pointer'
                                  }}
                                >
                                  {isChecked ? '✓ ' : '+ '}{opt}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button
                      type="button"
                      onClick={closeModal}
                      style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-main)', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: '0.75rem 1.75rem',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #0284c7, #0d9488)',
                        color: '#ffffff',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 700,
                        boxShadow: '0 4px 14px rgba(2,132,199,0.3)'
                      }}
                    >
                      Evaluate & Generate Doctor Report
                    </button>
                  </div>
                </form>
              ) : (
                /* STEP 2: DOCTOR-LEVEL RESULTS REPORT */
                <div>
                  {/* Triage Badge */}
                  <div
                    style={{
                      padding: '1rem 1.25rem',
                      borderRadius: '16px',
                      marginBottom: '1.5rem',
                      background:
                        assessmentResult.triageClass === 'danger'
                          ? 'rgba(239, 68, 68, 0.12)'
                          : assessmentResult.triageClass === 'warning'
                          ? 'rgba(245, 158, 11, 0.12)'
                          : 'rgba(16, 185, 129, 0.12)',
                      border:
                        assessmentResult.triageClass === 'danger'
                          ? '1px solid #ef4444'
                          : assessmentResult.triageClass === 'warning'
                          ? '1px solid #f59e0b'
                          : '1px solid #10b981',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <ShieldAlert
                      size={28}
                      color={
                        assessmentResult.triageClass === 'danger'
                          ? '#ef4444'
                          : assessmentResult.triageClass === 'warning'
                          ? '#f59e0b'
                          : '#10b981'
                      }
                    />
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)' }}>
                        Recommended Clinical Triage
                      </div>
                      <div
                        style={{
                          fontSize: '1.2rem',
                          fontWeight: 800,
                          color:
                            assessmentResult.triageClass === 'danger'
                              ? '#ef4444'
                              : assessmentResult.triageClass === 'warning'
                              ? '#d97706'
                              : '#059669'
                        }}
                      >
                        {assessmentResult.triage}
                      </div>
                    </div>
                  </div>

                  {/* Clinical Impression */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.4rem 0', color: 'var(--text-main)' }}>
                      Physician Impression & Analysis
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                      {assessmentResult.impression}
                    </p>
                  </div>

                  {/* Doctor Red Flags */}
                  {assessmentResult.redFlags && assessmentResult.redFlags.length > 0 && (
                    <div style={{ marginBottom: '1.5rem', background: 'var(--danger-bg, rgba(239,68,68,0.05))', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid var(--danger-border, rgba(239,68,68,0.2))' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <AlertTriangle size={18} /> Red Flag Warning Symptoms to Monitor
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                        {assessmentResult.redFlags.map((rf, rIdx) => (
                          <li key={rIdx}>{rf}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Steps & Pre-Appointment Advice */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.4rem 0', color: 'var(--text-main)' }}>
                      Pre-Consultation Action Steps
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6, margin: 0 }}>
                      {assessmentResult.doctorAdvice}
                    </p>
                  </div>

                  {/* Recommended Lab Tests */}
                  {assessmentResult.labTests && assessmentResult.labTests.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>
                        Recommended Diagnostics / Tests to Discuss
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {assessmentResult.labTests.map((test, tIdx) => (
                          <span key={tIdx} style={{ fontSize: '0.85rem', fontWeight: 600, background: 'var(--bg-primary-50, rgba(2,132,199,0.1))', color: '#0284c7', padding: '0.35rem 0.75rem', borderRadius: '8px' }}>
                            {test}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Questions to Ask Your Doctor */}
                  {assessmentResult.questionsForDoctor && (
                    <div style={{ marginBottom: '1.5rem', background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#0d9488', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <HelpCircle size={18} /> High-Yield Questions to Ask Your Doctor
                      </h4>
                      <ol style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                        {assessmentResult.questionsForDoctor.map((q, qIdx) => (
                          <li key={qIdx} style={{ marginBottom: '0.35rem' }}><strong>{q}</strong></li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Medication Warnings */}
                  {assessmentResult.medicationWarnings && (
                    <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                      <strong style={{ color: '#d97706' }}>Pharmacological Note: </strong>
                      {assessmentResult.medicationWarnings}
                    </div>
                  )}

                  {/* Treatment Plan & Cure Explanation Box */}
                  <div style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.08), rgba(2, 132, 199, 0.08))', padding: '1.25rem', borderRadius: '16px', border: '1px stroke rgba(5, 150, 105, 0.3)' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#059669', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Sparkles size={18} /> Prescribed Treatment & How It Can Be Cured
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.5, margin: 0 }}>
                      <strong>Evidence-Based Cure Strategy:</strong> By identifying primary triage indicators early, targeted pharmacological therapy combined with recommended diagnostic laboratory tests provides complete resolution and prevents chronic complications.
                    </p>
                  </div>

                  {/* Modal Footer Buttons */}
                  <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
                    <button
                      type="button"
                      onClick={() => setAssessmentResult(null)}
                      style={{ padding: '0.65rem 1.25rem', borderRadius: '10px', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-main)', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <ArrowLeft size={16} /> Edit Inputs
                    </button>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <button
                        type="button"
                        onClick={() => setShowDoctorBill(true)}
                        style={{ padding: '0.65rem 1.3rem', borderRadius: '10px', background: 'linear-gradient(135deg, #0f172a 0%, #0284c7 100%)', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.3)' }}
                      >
                        <FileText size={16} color="#38bdf8" /> View / Generate Doctor Bill & Rx
                      </button>
                      <button
                        type="button"
                        onClick={handlePrintReport}
                        style={{ padding: '0.65rem 1.25rem', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', color: 'var(--text-main)', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <Printer size={16} /> Print Doctor Report
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        style={{ padding: '0.65rem 1.5rem', borderRadius: '10px', background: '#0284c7', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DOCTOR CONSULTATION & INVOICE RECEIPT BILL MODAL */}
      <DoctorBillModal
        isOpen={showDoctorBill}
        onClose={() => setShowDoctorBill(false)}
        featureData={assessmentResult ? { ...activeFeature, ...assessmentResult } : null}
        billType="predoctor"
      />

      <Footer />
    </div>
  );
};

export default PreDoctorChecker;
