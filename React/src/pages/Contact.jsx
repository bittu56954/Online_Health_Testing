import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Sparkles,
  MessageSquare,
  Building,
  HeartPulse
} from 'lucide-react';
import Footer from '../components/common/Footer';
import { useToast } from '../context/ToastContext';

const Contact = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'general',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (showToast) {
        showToast('Your message has been sent successfully! Our team will reply shortly.', 'success');
      }
    }, 800);
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      
      {/* HERO BANNER */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d9488 50%, #0284c7 100%)', color: '#ffffff', padding: '4.5rem 1.5rem 5.5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(8px)', padding: '0.4rem 1.1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, color: '#5eead4', marginBottom: '1.25rem' }}>
            <Sparkles size={16} /> We Are Here to Assist You
          </div>
          <h1 style={{ fontSize: 'calc(2.3rem + 1vw)', fontWeight: 800, margin: 0, letterSpacing: '-0.5px', color: '#ffffff' }}>
            Get in Touch with Smart Medical Care
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#e0f2fe', marginTop: '0.75rem', lineHeight: 1.6, maxWidth: '700px', margin: '0.75rem auto 0 auto' }}>
            Have questions about OCR scanner performance, technical integration, or pharmaceutical data indexing? Reach out to our technical support team.
          </p>
        </div>
      </section>

      {/* CONTENT BODY */}
      <main style={{ flex: 1, maxWidth: '1240px', width: '100%', margin: '0 auto', padding: '3rem 1.5rem 5rem 1.5rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          
          {/* Left Column: Contact Form */}
          <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={22} color="#0284c7" /> Send Us a Direct Message
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.75rem' }}>
              Fill out the form below and our medical tech support team will respond within 24 hours.
            </p>

            {submitted ? (
              <div style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)', padding: '2rem', borderRadius: '18px', textAlign: 'center', color: 'var(--success-text)' }}>
                <CheckCircle2 size={48} style={{ marginBottom: '0.75rem' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Message Received!</h3>
                <p style={{ fontSize: '0.95rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
                  Thank you for reaching out, <strong>{formData.name}</strong>. A support ticket has been created and dispatched to your email address.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', category: 'general', subject: '', message: '' }); }}
                  style={{ marginTop: '1.25rem', padding: '0.6rem 1.25rem', background: '#0d9488', color: '#ffffff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your Email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Phone (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter Your Mobile No"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Inquiry Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    >
                      <option value="general">General Information</option>
                      <option value="scanner">OCR Scanner Issue</option>
                      <option value="account">Account & Verification</option>
                      <option value="feedback">Product Feedback</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Subject Line *</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Enter Your Purpose"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Detailed Message *</label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    placeholder="Provide details about your query or feedback..."
                    value={formData.message}
                    onChange={handleChange}
                    style={{ width: '100%', resize: 'vertical' }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    background: 'linear-gradient(135deg, #0284c7, #0d9488)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: loading ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)'
                  }}
                >
                  {loading ? <span className="spinner"></span> : <><Send size={18} /> Transmit Inquiry Message</>}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ background: 'var(--bg-surface)', borderRadius: '20px', padding: '1.75rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'var(--info-bg)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>Support Email</h4>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.92rem', color: '#0284c7', fontWeight: 600 }}>support@smartmedicalcare.org</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface)', borderRadius: '20px', padding: '1.75rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'var(--success-bg)', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>Helpline Hotline</h4>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.92rem', color: '#0d9488', fontWeight: 600 }}>+1 (800) 555-SMARTCARE</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface)', borderRadius: '20px', padding: '1.75rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'var(--warning-bg)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>Support Operating Hours</h4>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.88rem', color: 'var(--text-muted)' }}>Mon – Fri: 9:00 AM – 8:00 PM EST</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', borderRadius: '20px', padding: '1.5rem', color: 'var(--danger-text)' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 0.4rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertTriangle size={18} color="#ef4444" /> Medical Emergency Notice
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.5 }}>
                Do not submit emergency medical inquiries through this web form. If you or someone around you is experiencing acute poisoning or drug overdose, dial your local emergency services (911 / 112) immediately.
              </p>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Contact;
