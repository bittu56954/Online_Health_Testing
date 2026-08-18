import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/common/Alert';
import Footer from '../components/common/Footer';
import { ShieldCheck, Mail, RefreshCw, KeyRound, CheckCircle, Send } from 'lucide-react';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOTP, resendOTP } = useAuth();

  const targetEmail = location.state?.email || localStorage.getItem('mediscan_pending_email') || '';
  const initialOtpDebug = location.state?.otpDebug || '';

  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const [otpDebug, setOtpDebug] = useState(initialOtpDebug);
  const [infoMessage, setInfoMessage] = useState(location.state?.message || 'Verification OTP code has been dispatched directly to your email address.');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer

  useEffect(() => {
    if (!targetEmail) {
      navigate('/login');
    }
  }, [targetEmail, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto-focus next input box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split('');
      setOtpDigits(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const fullOtp = otpDigits.join('');

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    if (fullOtp.length !== 6) {
      return setError('Please enter the full 6-digit numeric verification code.');
    }

    setLoading(true);
    const res = await verifyOTP(targetEmail, fullOtp);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  const handleResend = async () => {
    setError('');
    setResending(true);
    const res = await resendOTP(targetEmail);
    setResending(false);

    if (res.success) {
      setInfoMessage(res.message);
      if (res.otpDebug) setOtpDebug(res.otpDebug);
      setTimeLeft(600);
      setOtpDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div
          style={{
            width: '100%',
            maxWidth: '480px',
            background: 'var(--bg-surface)',
            borderRadius: '24px',
            padding: '2rem 1.25rem',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-light)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #0284c7, #0d9488)',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                boxShadow: '0 6px 20px rgba(2, 132, 199, 0.3)'
              }}
            >
              <ShieldCheck size={32} />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Email Verification
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.4rem', lineHeight: 1.5 }}>
              We sent a 6-digit OTP code to <br />
              <strong style={{ color: 'var(--text-main)', wordBreak: 'break-all' }}>{targetEmail}</strong>
            </p>
          </div>

          {infoMessage && <Alert type="info" message={infoMessage} />}
          {error && <Alert type="danger" message={error} />}

          {otpDebug && (
            <div
              style={{
                background: 'var(--success-bg)',
                border: '1px solid var(--success-border)',
                color: 'var(--success-text)',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                fontSize: '0.88rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              <CheckCircle size={20} />
              <span>
                <strong>Dev OTP Code:</strong>{' '}
                <code style={{ fontSize: '1.1rem', background: 'var(--bg-surface)', padding: '3px 10px', borderRadius: '6px', fontWeight: 800, color: '#10b981', border: '1px solid var(--border-light)' }}>
                  {otpDebug}
                </code>
              </span>
            </div>
          )}

          <form onSubmit={handleVerify}>
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center', marginBottom: '0.75rem' }}>
                Enter 6-Digit OTP Code
              </label>

              <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', width: '100%' }} onPaste={handlePaste}>
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    style={{
                      width: 'clamp(36px, 12vw, 48px)',
                      height: 'clamp(46px, 14vw, 56px)',
                      fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
                      fontWeight: 800,
                      textAlign: 'center',
                      borderRadius: '12px',
                      border: digit ? '2px solid #0284c7' : '1px solid var(--border-light)',
                      background: 'var(--bg-input)',
                      color: 'var(--text-main)',
                      boxShadow: digit ? '0 0 10px rgba(2, 132, 199, 0.2)' : 'none',
                      outline: 'none',
                      padding: 0,
                      boxSizing: 'border-box',
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
              <span>Code expires: <strong style={{ color: 'var(--text-main)' }}>{formatTimer(timeLeft)}</strong></span>
              <button
                type="button"
                onClick={handleResend}
                disabled={resending || timeLeft > 540}
                style={{
                  background: 'none',
                  border: 'none',
                  color: resending ? 'var(--text-muted)' : '#0284c7',
                  cursor: resending ? 'wait' : 'pointer',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <RefreshCw size={14} className={resending ? 'spinner' : ''} /> {resending ? 'Resending...' : 'Resend Code'}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || fullOtp.length !== 6}
              style={{
                width: '100%',
                padding: '0.9rem',
                background: fullOtp.length === 6 ? 'linear-gradient(135deg, #0284c7, #0d9488)' : 'var(--border-light)',
                color: fullOtp.length === 6 ? '#ffffff' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: loading || fullOtp.length !== 6 ? 'not-allowed' : 'pointer',
                boxShadow: fullOtp.length === 6 ? '0 4px 14px rgba(2, 132, 199, 0.35)' : 'none',
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Verifying...
                </>
              ) : (
                <>
                  <Send size={18} /> Verify Code & Access Account
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyOTP;
