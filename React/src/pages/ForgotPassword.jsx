import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import Alert from '../components/common/Alert';
import Footer from '../components/common/Footer';
import { KeyRound, Mail, Lock, CheckCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [otpDebug, setOtpDebug] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setLoading(true);

    try {
      const res = await authService.forgotPassword({ email });
      setLoading(false);

      if (res.data.success) {
        setInfoMessage(res.data.message);
        if (res.data.otpDebug) setOtpDebug(res.data.otpDebug);
        setStep(2);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to send password reset code.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    if (newPassword.length < 6) {
      return setError('New password must be at least 6 characters long.');
    }

    setLoading(true);

    try {
      const res = await authService.resetPassword({ email, otp, newPassword });
      setLoading(false);

      if (res.data.success) {
        alert('Password updated successfully! Please log in with your new password.');
        navigate('/login');
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to reset password.');
    }
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '460px', background: 'var(--bg-surface)', borderRadius: '24px', padding: '2.5rem', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-light)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
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
              <KeyRound size={28} />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Reset Password</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
              {step === 1 ? 'Enter your registered email to receive a reset OTP code' : 'Enter the 6-digit code and your new password'}
            </p>
          </div>

          {infoMessage && <Alert type="info" message={infoMessage} />}
          {error && <Alert type="danger" message={error} />}

          {otpDebug && (
            <div style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)', color: 'var(--success-text)', padding: '0.85rem 1rem', borderRadius: '12px', fontSize: '0.88rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={18} />
              <span>
                <strong>Dev Reset OTP:</strong> <code style={{ fontSize: '1.05rem', background: 'var(--bg-surface)', padding: '2px 8px', borderRadius: '6px', fontWeight: 800, color: '#10b981', border: '1px solid var(--border-light)' }}>{otpDebug}</code>
              </span>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOTP}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Registered Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    style={{ width: '100%', paddingLeft: '2.6rem' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ width: '100%', padding: '0.85rem', background: 'linear-gradient(135deg, #0284c7, #0d9488)', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', cursor: loading ? 'wait' : 'pointer', marginTop: '0.5rem', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)' }}
              >
                {loading ? <span className="spinner"></span> : 'Send Reset Code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  6-Digit Reset Code
                </label>
                <input
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.75rem', fontSize: '1.2rem', fontWeight: 800, textAlign: 'center', letterSpacing: '0.3em' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    style={{ width: '100%', paddingLeft: '2.6rem', paddingRight: '2.6rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px'
                    }}
                    title={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Confirm New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ width: '100%', paddingLeft: '2.6rem', paddingRight: '2.6rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px'
                    }}
                    title={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ width: '100%', padding: '0.85rem', background: 'linear-gradient(135deg, #0284c7, #0d9488)', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', cursor: loading ? 'wait' : 'pointer', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)' }}
              >
                {loading ? <span className="spinner"></span> : 'Update Password'}
              </button>
            </form>
          )}

          <div style={{ textAlign: 'center', marginTop: '1.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
            <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: '#0284c7', fontWeight: 600, textDecoration: 'none' }}>
              <ArrowLeft size={16} /> Back to Sign In
            </Link>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
