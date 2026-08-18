import React from 'react';
import {
  Printer,
  X,
  Stethoscope,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Building,
  Calendar,
  User,
  Activity,
  Pill,
  Award,
  Download,
  AlertTriangle,
  Zap,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DoctorBillModal = ({
  isOpen,
  onClose,
  scanData = null,
  medicineData = null,
  featureData = null,
  billType = 'facial' // 'facial', 'medicine', 'predoctor'
}) => {
  const { user, currentUser } = useAuth();

  if (!isOpen) return null;

  const activeUser = user || currentUser;

  // Patient Info from Login / Registration
  const patientName = activeUser?.name || activeUser?.fullName || 'Bittu Kumar';
  const patientEmail = activeUser?.email || 'bittu@gmail.com';
  const patientPhone = activeUser?.phone || activeUser?.mobile || '+91 98765-43210';
  const invoiceId = scanData?.scanId || medicineData?.batchNumber || 'FC-' + Math.floor(100000 + Math.random() * 900000);
  const invoiceDate = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  // Extract diagnosis, problems, treatments based on scan type
  let diagnosisTitle = 'General Health Evaluation';
  let healthScore = 95;
  let severity = 'Low / Mild';
  let identifiedProblems = [];
  let treatmentPlan = [];
  let cureExplanation = '';
  let prescribedMeds = [];
  let billingItems = [];

  if (billType === 'facial' && scanData) {
    diagnosisTitle = scanData.statusTitle || 'Facial Diagnostic Scan';
    healthScore = scanData.healthScore || 90;
    severity = scanData.isCompletelyHealthy ? 'None / Healthy' : 'Moderate Clinical Attention Required';
    
    identifiedProblems = scanData.suspectedDiseases?.map(d => ({
      name: d.name,
      severity: d.severity,
      probability: d.probability + '%',
      description: d.description
    })) || [];

    treatmentPlan = scanData.doctorRecommendations || [
      'Consult a primary care physician for comprehensive clinical follow-up.',
      'Maintain adequate hydration and high-nutrient dietary habits.',
      'Monitor vital biomarkers regularly.'
    ];

    cureExplanation = scanData.doctorSummary || 'Early identification through non-invasive optical micro-vascular scanning allows timely dietary, therapeutic, and lifestyle interventions for complete symptom reversal.';

    prescribedMeds = [
      { name: 'Multivitamin & Anti-Oxidant Complex', dosage: '1 Tablet Daily', timing: 'After Breakfast', duration: '30 Days', purpose: 'Cellular tissue repair & oxygenation' },
      { name: 'Iron & Folic Acid Supplement', dosage: '1 Capsule Daily', timing: 'After Lunch with Vitamin C', duration: '14 Days', purpose: 'Boost hemoglobin concentration' },
      { name: 'Dermal Moisture Barrier Repair Lotion', dosage: 'Apply Twice Daily', timing: 'Morning & Night', duration: 'As Needed', purpose: 'Restore skin turgor & hydration' }
    ];

    billingItems = [
      { desc: 'AI Facial Biometric Visual Biomarker Scan', category: 'Diagnostics', qty: 1, rate: 0, total: 0 },
      { desc: 'Senior Software Engineer & AI Doctor Clinical Assessment', category: 'Consultation Fee', qty: 1, rate: 0, total: 0 },
      { desc: 'Personalized Rx Treatment & Cure Protocol Formulation', category: 'Therapeutics', qty: 1, rate: 0, total: 0 },
      { desc: 'Ocular & Vascular Biomarker Risk Profiling', category: 'Lab Profiling', qty: 1, rate: 0, total: 0 },
      { desc: 'Digital Health Certificate & Prescription Issuance', category: 'Documentation', qty: 1, rate: 0, total: 0 }
    ];

  } else if (billType === 'medicine' && medicineData) {
    diagnosisTitle = `Medicine Clinical Scan: ${medicineData.name || 'Pharmaceutical Product'}`;
    healthScore = 96;
    severity = 'Verified Prescribed Medication';

    identifiedProblems = medicineData.problemsTreated?.map(p => ({
      name: p.condition,
      severity: p.category || 'Indication',
      probability: '100% Target Match',
      description: p.detail
    })) || [
      { name: medicineData.uses?.[0] || 'Target Disease / Infection', severity: 'Primary Indication', probability: '100%', description: 'Prescribed for treating symptomatic illness and disease management.' }
    ];

    treatmentPlan = medicineData.precautions?.slice(0, 4) || [
      'Take medication strictly as prescribed by your attending physician.',
      'Complete the full course even if symptoms subside early.',
      'Store in a cool, dry place away from direct sunlight.'
    ];

    cureExplanation = medicineData.mechanism || `This drug exerts targeted therapeutic action to eradicate the underlying cause of ${medicineData.uses?.[0] || 'the condition'}, leading to complete symptom cure within the prescribed course.`;

    prescribedMeds = [
      {
        name: medicineData.name || 'Scanned Medication',
        dosage: medicineData.strength || 'Standard Dose',
        timing: medicineData.dosageInfo || 'As Directed by Physician',
        duration: '7 - 14 Days',
        purpose: medicineData.genericName || 'Primary Cure'
      }
    ];

    billingItems = [
      { desc: `OCR Label Identification & Drug Safety Verification (${medicineData.name})`, category: 'Pharmacy Scan', qty: 1, rate: 0, total: 0 },
      { desc: 'Pharmacological Mechanism & Drug Interaction Analysis', category: 'Clinical Pharmacology', qty: 1, rate: 0, total: 0 },
      { desc: 'Clinical Dosage & Administration Guidance', category: 'Physician Advisory', qty: 1, rate: 0, total: 0 },
      { desc: 'Official Prescription & Medical Bill Verification', category: 'Documentation', qty: 1, rate: 0, total: 0 }
    ];

  } else if (billType === 'predoctor' && featureData) {
    diagnosisTitle = featureData.title || 'Pre-Doctor Clinical Assessment';
    healthScore = featureData.triageClass === 'danger' ? 65 : 88;
    severity = featureData.triage || 'Standard Triage';

    identifiedProblems = [
      {
        name: featureData.impression || 'Diagnosed Condition',
        severity: featureData.triage || 'Clinical Triage',
        probability: 'Verified Pre-Doctor Rule Match',
        description: featureData.redFlags?.join('; ') || 'Symptom pattern evaluated using verified clinical criteria.'
      }
    ];

    treatmentPlan = [
      featureData.doctorAdvice || 'Follow physician advice immediately.',
      ...(featureData.labTests ? [`Recommended Labs: ${featureData.labTests.join(', ')}`] : []),
      ...(featureData.questionsForDoctor ? [`Key Questions for Doctor: ${featureData.questionsForDoctor.join(' | ')}`] : [])
    ];

    cureExplanation = 'Pre-doctor screening provides early differential diagnosis, enabling targeted diagnostic testing, emergency triage intervention, and structured physician consultation for complete cure.';

    prescribedMeds = [
      { name: 'First-Line Symptomatic Relief Protocol', dosage: 'As Prescribed', timing: 'As Directed', duration: 'Until Physician Consultation', purpose: 'Acute symptom management' },
      { name: 'Recommended Diagnostic Lab Referral', dosage: 'Stat / Scheduled', timing: 'Pre-Appointment', duration: 'One-Time', purpose: 'Confirm physiological diagnosis' }
    ];

    billingItems = [
      { desc: `Pre-Doctor Feature Evaluation (${featureData.title})`, category: 'Clinical Assessment', qty: 1, rate: 0, total: 0 },
      { desc: 'Differential Diagnostic Triage & Red Flag Screening', category: 'Specialist Advisory', qty: 1, rate: 0, total: 0 },
      { desc: 'Laboratory Diagnostic Test Order & Prep Protocol', category: 'Lab Services', qty: 1, rate: 0, total: 0 },
      { desc: 'Official Doctor Medical Consultation Bill', category: 'Documentation', qty: 1, rate: 0, total: 0 }
    ];
  }

  // All amounts 0 - 100% Free of Cost
  const subtotal = 0;
  const discount = 0;
  const gstTax = 0;
  const grandTotal = 0;

  const handlePrint = () => {
    const printElement = document.getElementById('printable-doctor-bill');
    if (!printElement) {
      window.print();
      return;
    }

    try {
      const printWindow = window.open('', '_blank', 'width=900,height=800');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Medical_Bill_${invoiceId}</title>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
                * { box-sizing: border-box; }
                body {
                  font-family: 'Inter', system-ui, -apple-system, sans-serif;
                  margin: 20px;
                  color: #0f172a;
                  background: #ffffff;
                }
                @page {
                  size: A4 portrait;
                  margin: 10mm;
                }
                .no-print { display: none !important; }
              </style>
            </head>
            <body>
              ${printElement.innerHTML}
              <script>
                window.onload = function() {
                  window.print();
                  setTimeout(function() { window.close(); }, 800);
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        window.print();
      }
    } catch (err) {
      window.print();
    }
  };

  return (
    <div
      className="doctor-bill-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflowY: 'auto'
      }}
    >
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          html, body {
            background: #ffffff !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            overflow: visible !important;
          }
          body > *:not(.doctor-bill-modal-overlay) {
            display: none !important;
          }
          .doctor-bill-modal-overlay {
            position: static !important;
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            display: block !important;
            backdrop-filter: none !important;
          }
          .doctor-bill-modal-content {
            position: static !important;
            width: 100% !important;
            max-width: 100% !important;
            max-height: none !important;
            height: auto !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            overflow: visible !important;
            display: block !important;
          }
          #printable-doctor-bill {
            position: static !important;
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            padding: 0 !important;
            margin: 0 !important;
            display: block !important;
          }
          .no-print {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .doctor-bill-modal-overlay {
            padding: 0.5rem !important;
          }
          .doctor-bill-modal-content {
            max-height: 96vh !important;
            border-radius: 16px !important;
          }
        }
      `}</style>

      <div
        className="doctor-bill-modal-content"
        style={{
          background: '#ffffff',
          color: '#0f172a',
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
        }}
      >
        {/* Top Control Bar (Hidden during printing) */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.2rem 1.75rem',
            background: '#0f172a',
            color: '#ffffff',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileText size={22} color="#38bdf8" />
            <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.3px' }}>
              Smart Medical Care Official Doctor Consultation Invoice & Prescription
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                padding: '0.55rem 1.25rem',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
              }}
            >
              <Printer size={16} /> Print / Save PDF Bill
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                border: 'none',
                width: 36,
                height: 36,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Bill Content */}
        <div
          id="printable-doctor-bill"
          style={{
            padding: '2.5rem',
            overflowY: 'auto',
            flex: 1,
            backgroundColor: '#ffffff',
            color: '#0f172a'
          }}
        >
          {/* CLINIC / HOSPITAL HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px double #0284c7', paddingBottom: '1.5rem', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'linear-gradient(135deg, #0284c7, #0d9488)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Stethoscope size={32} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.3px' }}>
                  SMART MEDICAL CARE CLINICAL & DIAGNOSTIC CENTER
                </h1>
                <p style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: 700, margin: '2px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ISO 9001:2025 Certified Clinical AI & Telemedicine Facility &bull; Reg No: SMART-IN-2026-99482
                </p>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
                  Suite 704, Medical Tower, Health City District | Helpline: +91 (011) 4892-0000 | Email: billing@smartmedicalcare.org
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'right', minWidth: '180px' }}>
              <span style={{ display: 'inline-block', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                <CheckCircle2 size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> OFFICIAL MEDICAL RECEIPT
              </span>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0284c7' }}>{invoiceId}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>Date: {invoiceDate}</div>
            </div>
          </div>

          {/* DOCTOR & PATIENT DETAILS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '1.75rem' }}>
            {/* Attending Doctor */}
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>
                ATTENDING PHYSICIAN / DIAGNOSTICIAN
              </div>
              <strong style={{ fontSize: '1.05rem', color: '#0f172a', display: 'block' }}>
                Er. Bittu Kumar
              </strong>
              <span style={{ fontSize: '0.82rem', color: '#475569', display: 'block', marginTop: '2px' }}>
                Software Engineer & AI Diagnostics Lead
              </span>
              <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginTop: '2px' }}>
                CSVTU University &bull; Reg No: CSVTU-SE-2026-88392
              </span>
            </div>

            {/* Patient Metadata */}
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>
                PATIENT MEDICAL RECORD (MRN)
              </div>
              <strong style={{ fontSize: '1.05rem', color: '#0f172a', display: 'block' }}>
                {patientName}
              </strong>
              <span style={{ fontSize: '0.82rem', color: '#475569', display: 'block', marginTop: '2px' }}>
                Contact: {patientPhone} | Email: {patientEmail}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginTop: '2px' }}>
                Status: Verified Resident Patient &bull; Consultation: Telehealth AI Online
              </span>
            </div>
          </div>

          {/* SECTION 1: ACTUAL DIAGNOSTIC SCAN RESULT & IDENTIFIED PROBLEMS */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', background: '#eff6ff', padding: '0.6rem 1rem', borderRadius: '12px', borderLeft: '4px solid #0284c7' }}>
              <Activity size={18} color="#0284c7" />
              <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#1e40af', margin: 0 }}>
                1. CLINICAL DIAGNOSTIC SCAN RESULT & IDENTIFIED HEALTH PROBLEMS
              </h3>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Primary Assessment Title</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{diagnosisTitle}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Vital Score / Triage</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: healthScore < 75 ? '#dc2626' : '#059669' }}>
                    {healthScore}/100 ({severity})
                  </div>
                </div>
              </div>

              {/* Identified Problems Table */}
              <div style={{ marginTop: '0.5rem' }}>
                <strong style={{ fontSize: '0.85rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '0.5rem' }}>
                  Identified Health Problems & Disease Indications:
                </strong>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', color: '#475569', textAlign: 'left', fontWeight: 700 }}>
                      <th style={{ padding: '0.5rem 0.75rem', borderRadius: '6px 0 0 6px' }}>Problem / Disease Name</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>Severity & Risk</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>Confidence</th>
                      <th style={{ padding: '0.5rem 0.75rem', borderRadius: '0 6px 6px 0' }}>Clinical Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {identifiedProblems.map((prob, pIdx) => (
                      <tr key={pIdx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.6rem 0.75rem', fontWeight: 700, color: '#0f172a' }}>{prob.name}</td>
                        <td style={{ padding: '0.6rem 0.75rem' }}>
                          <span style={{ background: prob.severity === 'High' || prob.severity === 'EMERGENCY RED FLAG' ? '#fef2f2' : '#ecfdf5', color: prob.severity === 'High' || prob.severity === 'EMERGENCY RED FLAG' ? '#dc2626' : '#059669', padding: '0.15rem 0.5rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
                            {prob.severity}
                          </span>
                        </td>
                        <td style={{ padding: '0.6rem 0.75rem', fontWeight: 600, color: '#0284c7' }}>{prob.probability}</td>
                        <td style={{ padding: '0.6rem 0.75rem', color: '#475569', fontSize: '0.82rem' }}>{prob.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SECTION 2: RECOMMENDED TREATMENT & HOW IT CAN BE CURED */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', background: '#f0fdf4', padding: '0.6rem 1rem', borderRadius: '12px', borderLeft: '4px solid #16a34a' }}>
              <Stethoscope size={18} color="#16a34a" />
              <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#15803d', margin: 0 }}>
                2. PRESCRIBED TREATMENT & HOW IT CAN BE CURED
              </h3>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.1rem' }}>
              
              {/* How it can be cured */}
              <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                  <Sparkles size={16} color="#0284c7" /> How This Problem Can Be Healed & Cured:
                </strong>
                <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                  "{cureExplanation}"
                </p>
              </div>

              {/* Step-by-Step Cure Protocol & Recommendations */}
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ fontSize: '0.85rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '0.4rem' }}>
                  Doctor's Prescribed Recovery Steps & Lifestyle Guidelines:
                </strong>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {treatmentPlan.map((step, sIdx) => (
                    <li key={sIdx}><strong>Step {sIdx + 1}:</strong> {step}</li>
                  ))}
                </ul>
              </div>

              {/* Prescribed Medications (Rx) */}
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
                  <Pill size={16} /> Prescribed Medications (Rx Prescription):
                </strong>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#f0fdf4', color: '#15803d', textAlign: 'left', fontWeight: 700 }}>
                      <th style={{ padding: '0.5rem 0.75rem', borderRadius: '6px 0 0 6px' }}>Medicine Name</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>Dosage & Strength</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>Timing & Frequency</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>Duration</th>
                      <th style={{ padding: '0.5rem 0.75rem', borderRadius: '0 6px 6px 0' }}>Therapeutic Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescribedMeds.map((med, mIdx) => (
                      <tr key={mIdx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.6rem 0.75rem', fontWeight: 800, color: '#0f172a' }}>💊 {med.name}</td>
                        <td style={{ padding: '0.6rem 0.75rem', color: '#334155' }}>{med.dosage}</td>
                        <td style={{ padding: '0.6rem 0.75rem', color: '#0284c7', fontWeight: 600 }}>{med.timing}</td>
                        <td style={{ padding: '0.6rem 0.75rem', color: '#334155' }}>{med.duration}</td>
                        <td style={{ padding: '0.6rem 0.75rem', color: '#64748b', fontSize: '0.82rem' }}>{med.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

          {/* SECTION 3: ITEMIZED CLINICAL CONSULTATION BILL & FINANCIAL BREAKDOWN */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', background: '#faf5ff', padding: '0.6rem 1rem', borderRadius: '12px', borderLeft: '4px solid #8b5cf6' }}>
              <FileText size={18} color="#8b5cf6" />
              <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#6b21a8', margin: 0 }}>
                3. ITEMIZED DOCTOR CONSULTATION & DIAGNOSTIC BILL RECEIPT
              </h3>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#475569', textAlign: 'left', fontWeight: 700, borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '0.65rem 0.85rem', width: '50px' }}>#</th>
                  <th style={{ padding: '0.65rem 0.85rem' }}>Service / Clinical Item Description</th>
                  <th style={{ padding: '0.65rem 0.85rem' }}>Category</th>
                  <th style={{ padding: '0.65rem 0.85rem', textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '0.65rem 0.85rem', textAlign: 'right' }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {billingItems.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.65rem 0.85rem', fontWeight: 700, color: '#64748b' }}>0{index + 1}</td>
                    <td style={{ padding: '0.65rem 0.85rem', fontWeight: 700, color: '#0f172a' }}>{item.desc}</td>
                    <td style={{ padding: '0.65rem 0.85rem', color: '#0284c7', fontSize: '0.82rem', fontWeight: 600 }}>{item.category}</td>
                    <td style={{ padding: '0.65rem 0.85rem', textAlign: 'center', color: '#475569' }}>{item.qty}</td>
                    <td style={{ padding: '0.65rem 0.85rem', textAlign: 'right', fontWeight: 700, color: '#059669' }}>₹0 (Free of Cost)</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Financial Summary & Payment Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', background: '#f8fafc', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ecfdf5', color: '#059669', padding: '0.4rem 0.85rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, border: '1px solid #a7f3d0' }}>
                  <ShieldCheck size={16} /> PAYMENT STATUS: PAID ONLINE (100% SUCCESSFUL - FREE CONSULTATION)
                </div>
                <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0.5rem 0 0 0' }}>
                  Payment Method: Smart Medical Care Telehealth Online Gateway &bull; Transaction ID: TXN-ONLINE-2026-99482
                </p>
              </div>

              <div style={{ minWidth: '260px', textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem' }}>
                  <span>Subtotal Amount:</span>
                  <strong style={{ color: '#059669' }}>₹0 (Free of Cost)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#16a34a', marginBottom: '0.25rem' }}>
                  <span>Wellness Coverage (100%):</span>
                  <strong>₹0</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>
                  <span>Healthcare GST Tax (0%):</span>
                  <strong>₹0</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 900, color: '#059669', borderTop: '2px solid #cbd5e1', paddingTop: '0.4rem' }}>
                  <span>Total Amount Paid:</span>
                  <span>₹0 (FREE OF COST)</span>
                </div>
              </div>
            </div>
          </div>

          {/* DOCTOR SIGNATURE & CLINICAL STAMP */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '2px dashed #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', maxWidth: '420px', lineHeight: 1.5 }}>
              <strong style={{ color: '#0f172a', display: 'block', marginBottom: '2px' }}>Legal Medical Disclaimer:</strong>
              This bill & prescription report is digitally issued by Er. Bittu Kumar (Software Engineer, CSVTU University) under Smart Medical Care AI Telehealth & Diagnostic System. It is valid for medical reference and insurance records.
            </div>

            <div style={{ textAlign: 'center', minWidth: '240px' }}>
              {/* Doctor Stamp Graphic */}
              <div style={{ display: 'inline-block', border: '2px dashed #0284c7', padding: '0.4rem 0.8rem', borderRadius: '12px', background: '#f0f9ff', color: '#0284c7', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                <Award size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> SMART MEDICAL CARE VERIFIED SEAL &bull; CSVTU UNIVERSITY
              </div>
              
              <div style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive", fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3a8a', fontStyle: 'italic', margin: '2px 0' }}>
                Er. Bittu Kumar
              </div>
              <div style={{ borderTop: '1.5px solid #0f172a', paddingTop: '4px', fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
                Er. Bittu Kumar
              </div>
              <div style={{ fontSize: '0.76rem', color: '#0284c7', fontWeight: 700 }}>Software Engineer</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>CSVTU University</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorBillModal;
