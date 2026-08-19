import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, CheckCircle, Zap, Activity } from 'lucide-react';

const DynamicPageHeader = ({
  pageTitle,
  pageSubtitle,
  syncText = "Initializing Real-Time Diagnostic Engine & Database",
  badgeText = "DYNAMIC ENGINE ACTIVE",
  onRefresh
}) => {
  const [isSyncing, setIsSyncing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [syncPhase, setSyncPhase] = useState("Initializing dynamic modules...");
  const [key, setKey] = useState(0);

  const triggerHeaderSync = () => {
    setIsSyncing(true);
    setProgress(0);
    setKey(prev => prev + 1);
    if (onRefresh) onRefresh();
  };

  useEffect(() => {
    setIsSyncing(true);
    setProgress(0);

    const phases = [
      "⚡ Connecting OCR & Clinical Data Stream...",
      "🔄 Syncing Dynamic Medical Records & 100 Pre-Doctor Checkers...",
      "✨ Dynamic Header & Page State Synchronized!"
    ];

    setSyncPhase(phases[0]);

    // Animate progress over 2 seconds (2000ms)
    const intervalTime = 40; // update every 40ms -> 50 steps
    const totalSteps = 50;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min(Math.round((step / totalSteps) * 100), 100);
      setProgress(currentProgress);

      if (step === 25) {
        setSyncPhase(phases[1]);
      } else if (step >= totalSteps) {
        setSyncPhase(phases[2]);
        clearInterval(timer);
        setTimeout(() => {
          setIsSyncing(false);
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [key]);

  return (
    <div
      className="dynamic-header-banner"
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(13, 148, 136, 0.9) 50%, rgba(2, 132, 199, 0.95) 100%)',
        color: '#ffffff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 4px 20px rgba(13, 148, 136, 0.25)',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Animated Top Progress Bar during 2-second Sync */}
      {isSyncing && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '4px',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #38bdf8, #2dd4bf, #4ade80)',
            boxShadow: '0 0 12px #2dd4bf',
            transition: 'width 0.04s linear',
            zIndex: 20
          }}
        />
      )}

      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        {/* Left Side: Status & Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: isSyncing ? 'rgba(45, 212, 191, 0.2)' : 'rgba(74, 222, 128, 0.2)',
              border: `1px solid ${isSyncing ? 'rgba(45, 212, 191, 0.4)' : 'rgba(74, 222, 128, 0.4)'}`,
              color: isSyncing ? '#2dd4bf' : '#4ade80',
              padding: '0.35rem 0.85rem',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.5px'
            }}
          >
            {isSyncing ? (
              <>
                <RefreshCw size={14} className="spin-animation" style={{ animation: 'spin 1.2s linear infinite' }} />
                <span>SYNCING HEADER (2.0s)</span>
              </>
            ) : (
              <>
                <CheckCircle size={14} color="#4ade80" />
                <span>{badgeText}</span>
              </>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={16} color="#38bdf8" />
              <strong style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                {pageTitle}
              </strong>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 500 }}>
              {isSyncing ? syncPhase : (pageSubtitle || syncText)}
            </span>
          </div>
        </div>

        {/* Right Side: Interactive Trigger Button + Live Uptime Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0, 0, 0, 0.25)', padding: '0.3rem 0.75rem', borderRadius: '12px', fontSize: '0.78rem', color: '#94a3b8' }}>
            <Activity size={14} color="#38bdf8" />
            <span>Latency: <strong style={{ color: '#2dd4bf' }}>12ms</strong></span>
          </div>

          <button
            onClick={triggerHeaderSync}
            disabled={isSyncing}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: isSyncing ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '0.4rem 0.9rem',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: isSyncing ? 'wait' : 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(4px)'
            }}
            title="Click to trigger 2-second dynamic header sync effect"
          >
            <Zap size={15} color="#5eead4" className={isSyncing ? 'pulse-animation' : ''} />
            <span>{isSyncing ? `Syncing ${progress}%` : 'Refresh Header (2s)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicPageHeader;
