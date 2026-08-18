// Pre-Doctor Medicine & Disease Clinical Features Database (100 Features across 10 Clinical Domains)

export const PRE_DOCTOR_CATEGORIES = [
  { id: 'all', label: 'All 100 Features', icon: 'Sparkles', color: '#0284c7' },
  { id: 'symptoms', label: '1. Symptom & Triage Checkers', icon: 'Stethoscope', color: '#ef4444' },
  { id: 'drug_safety', label: '2. Drug & Medicine Safety', icon: 'Pill', color: '#8b5cf6' },
  { id: 'chronic', label: '3. Chronic Disease Pre-Checks', icon: 'Activity', color: '#059669' },
  { id: 'organ_systems', label: '4. Specialized Organ Systems', icon: 'HeartPulse', color: '#d97706' },
  { id: 'labs', label: '5. Lab & Diagnostic Readiness', icon: 'FileText', color: '#2563eb' },
  { id: 'lifestyle', label: '6. Food & Drug Interactions', icon: 'Apple', color: '#16a34a' },
  { id: 'population', label: '7. Age & Special Population', icon: 'Users', color: '#ec4899' },
  { id: 'emergency', label: '8. Emergency & Red Flags', icon: 'ShieldAlert', color: '#dc2626' },
  { id: 'prep', label: '9. Doctor Consultation Prep', icon: 'ClipboardList', color: '#0d9488' },
  { id: 'side_effects', label: '10. Side Effects & Compatibility', icon: 'AlertTriangle', color: '#ca8a04' }
];

export const PRE_DOCTOR_FEATURES = [
  // ==========================================
  // DOMAIN 1: SYMPTOM & TRIAGE CHECKERS (1 - 10)
  // ==========================================
  {
    id: 1,
    categoryId: 'symptoms',
    categoryName: 'Symptom & Triage Checkers',
    title: 'Chest Pain & Cardiovascular Red Flag Triage',
    summary: 'Evaluates acute vs non-cardiac chest discomfort before seeing a physician.',
    fields: [
      { name: 'painType', label: 'Describe the Chest Pain', type: 'select', options: ['Pressure / Squeezing / Heavy', 'Sharp / Stabbing / Worse with breathing', 'Burning / Acid-like', 'Dull ache'] },
      { name: 'radiating', label: 'Does pain spread to Left Arm, Neck, or Jaw?', type: 'select', options: ['Yes', 'No'] },
      { name: 'associated', label: 'Associated Symptoms', type: 'multiselect', options: ['Shortness of breath', 'Cold sweating', 'Nausea / Vomiting', 'Dizziness', 'None'] },
      { name: 'duration', label: 'Duration of episode', type: 'select', options: ['Under 5 mins', '5-30 mins', 'Constant for hours', 'Intermittent days'] }
    ],
    evaluate: (data) => {
      const isRedFlag = data.painType === 'Pressure / Squeezing / Heavy' || data.radiating === 'Yes' || (data.associated && data.associated.includes('Cold sweating'));
      if (isRedFlag) {
        return {
          triage: 'EMERGENCY RED FLAG',
          triageClass: 'danger',
          impression: 'High clinical suspicion for Acute Coronary Syndrome (ACS) or Severe Cardiac Ischemia.',
          redFlags: ['Pressure/squeezing pain radiating to jaw/arm', 'Diaphoresis (cold sweat) with shortness of breath'],
          doctorAdvice: 'Do NOT drive yourself. Call Emergency Medical Services (911/112) or go immediately to the nearest Emergency Department.',
          labTests: ['Stat 12-Lead ECG', 'High-Sensitivity Troponin I/T', 'CK-MB', 'Chest X-Ray', 'Echocardiogram'],
          questionsForDoctor: ['Could this pain be related to my coronary arteries?', 'Should I take an Aspirin right now if not contraindicated?'],
          medicationWarnings: 'Do not take NSAIDs (like Ibuprofen) if cardiac chest pain is suspected. Aspirin 325mg chewed may be indicated under emergency guidance.'
        };
      }
      return {
        triage: 'STANDARD PRE-DOCTOR EVALUATION',
        triageClass: 'warning',
        impression: 'Likely Musculoskeletal, Gastroesophageal (GERD), or Pleuritic Chest Discomfort.',
        redFlags: ['Worsening shortness of breath', 'Pain spreading to back or arms'],
        doctorAdvice: 'Schedule a primary care appointment within 24-48 hours. Keep a daily log of triggers and relief with food or rest.',
        labTests: ['Baseline ECG', 'Lipid Panel', 'Hs-CRP', 'Upper GI Evaluation if reflux suspected'],
        questionsForDoctor: ['Could my stomach acid or chest wall muscles be causing this pain?', 'Do I need an exercise stress test?'],
        medicationWarnings: 'Avoid overuse of antacids if pain persists without relief.'
      };
    }
  },
  {
    id: 2,
    categoryId: 'symptoms',
    categoryName: 'Symptom & Triage Checkers',
    title: 'Dyspnea & Shortness of Breath Evaluator',
    summary: 'Assesses respiratory distress severity and airway urgency prior to clinic visit.',
    fields: [
      { name: 'onset', label: 'Onset Speed', type: 'select', options: ['Sudden (minutes to hours)', 'Gradual over weeks/months'] },
      { name: 'orthopnea', label: 'Difficulty breathing when lying flat?', type: 'select', options: ['Yes (needs multiple pillows)', 'No'] },
      { name: 'wheezing', label: 'Wheezing or Stridor Sound?', type: 'select', options: ['High-pitched wheezing', 'Stridor / Barking sound', 'No sound'] },
      { name: 'oxygenSat', label: 'Pulse Oximeter Reading (if available)', type: 'text', placeholder: 'e.g. 96%' }
    ],
    evaluate: (data) => {
      const satVal = parseInt(data.oxygenSat) || 98;
      const isUrgent = data.onset === 'Sudden (minutes to hours)' || data.orthopnea === 'Yes (needs multiple pillows)' || satVal < 93;
      return {
        triage: isUrgent ? 'URGENT CLINICAL EVALUATION' : 'ROUTINE CONSULTATION',
        triageClass: isUrgent ? 'danger' : 'info',
        impression: isUrgent ? 'Possible Asthma/COPD Exacerbation, Pulmonary Embolism, or Congestive Heart Failure.' : 'Mild Bronchial Reactivity or Deconditioning.',
        redFlags: ['SpO2 below 92%', 'Inability to speak full sentences', 'Cyanosis (bluish lips)'],
        doctorAdvice: isUrgent ? 'Seek urgent care or emergency room immediately.' : 'Schedule a consultation with a Pulmonologist or General Practitioner.',
        labTests: ['Spirometry / Pulmonary Function Test', 'Chest X-Ray (PA & Lateral)', 'B-type Natriuretic Peptide (BNP)', 'D-Dimer (if PE suspected)'],
        questionsForDoctor: ['Do I need a rescue bronchodilator inhaler?', 'Could fluid retention around my lungs be causing this?'],
        medicationWarnings: 'Beta-blockers can worsen asthma/wheezing. Mention all medications to your physician.'
      };
    }
  },
  {
    id: 3,
    categoryId: 'symptoms',
    categoryName: 'Symptom & Triage Checkers',
    title: 'Severe Headache & Neurological Warning Check',
    summary: 'Distinguishes primary headaches (Migraine/Tension) from red flag secondary intracranial issues.',
    fields: [
      { name: 'onset', label: 'How fast did peak intensity arrive?', type: 'select', options: ['Thunderclap (instant 10/10 within seconds)', 'Gradual over hours'] },
      { name: 'neuro', label: 'Neurological symptoms present?', type: 'multiselect', options: ['Vision loss / Double vision', 'Facial drooping', 'Arm weakness', 'Stiff neck & fever', 'None'] },
      { name: 'pattern', label: 'Headache Pattern', type: 'select', options: ['First / Worst headache of life', 'Recurrent familiar headache', 'New headache after age 50'] }
    ],
    evaluate: (data) => {
      const isThunderclap = data.onset === 'Thunderclap (instant 10/10 within seconds)' || (data.neuro && data.neuro.length > 0 && !data.neuro.includes('None')) || data.pattern === 'First / Worst headache of life';
      return {
        triage: isThunderclap ? 'EMERGENCY NEUROLOGICAL RED FLAG' : 'STANDARD CONSULTATION',
        triageClass: isThunderclap ? 'danger' : 'success',
        impression: isThunderclap ? 'Critical exclusion required for Subarachnoid Hemorrhage, Stroke, Meningitis, or Temporal Arteritis.' : 'Likely Migraine without Aura or Tension Headache.',
        redFlags: ['Thunderclap onset', 'Stiff neck with high fever', 'Focal neurological deficits (weakness/vision loss)'],
        doctorAdvice: isThunderclap ? 'Proceed immediately to Emergency Care for Neuroimaging.' : 'Maintain a 14-day headache diary noting food triggers and stress.',
        labTests: ['Non-contrast Brain CT / MRI', 'Lumbar Puncture (if SAH/Meningitis suspected)', 'Erythrocyte Sedimentation Rate (ESR for Temporal Arteritis)'],
        questionsForDoctor: ['Is my headache a primary migraine or does it require brain imaging?', 'What abortive medication (Triptans) is safest for me?'],
        medicationWarnings: 'Avoid medication overuse headache (rebound headache) from taking NSAIDs or Triptans >10 days/month.'
      };
    }
  },
  {
    id: 4,
    categoryId: 'symptoms',
    categoryName: 'Symptom & Triage Checkers',
    title: 'Abdominal Pain & Acute Abdomen Pre-Check',
    summary: 'Maps abdominal pain quadrant location to clinical urgency (Appendicitis, Cholecystitis, Ulcer).',
    fields: [
      { name: 'location', label: 'Pain Location', type: 'select', options: ['Right Lower Quadrant (RLQ)', 'Right Upper Quadrant (RUQ)', 'Epigastric (Upper Middle)', 'Left Lower Quadrant (LLQ)', 'Generalized Diffuse'] },
      { name: 'rebound', label: 'Pain when pressure is released (Rebound Tenderness)?', type: 'select', options: ['Yes (Severe pain on quick release)', 'No'] },
      { name: 'feverVomiting', label: 'Fever or persistent vomiting present?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isAppendicitis = data.location === 'Right Lower Quadrant (RLQ)' && (data.rebound === 'Yes (Severe pain on quick release)' || data.feverVomiting === 'Yes');
      const isCholecystitis = data.location === 'Right Upper Quadrant (RUQ)' && data.feverVomiting === 'Yes';
      const isUrgent = isAppendicitis || isCholecystitis || data.rebound === 'Yes (Severe pain on quick release)';
      return {
        triage: isUrgent ? 'URGENT SURGICAL / CLINICAL EVALUATION' : 'ROUTINE GI CONSULTATION',
        triageClass: isUrgent ? 'danger' : 'warning',
        impression: isAppendicitis ? 'Suspected Acute Appendicitis requiring immediate surgical review.' : isCholecystitis ? 'Suspected Acute Cholecystitis / Gallstones.' : 'Functional Dyspepsia or Irritable Bowel Syndrome.',
        redFlags: ['Rebound tenderness', 'Inability to keep liquids down for 24h', 'High fever with abdominal rigidity'],
        doctorAdvice: isUrgent ? 'Do NOT eat or drink anything (NPO) and proceed to urgent care.' : 'Avoid greasy foods and keep a pain-food log.',
        labTests: ['Abdominal Ultrasound', 'CT Abdomen & Pelvis', 'Complete Blood Count (WBC Count)', 'Serum Lipase & Amylase'],
        questionsForDoctor: ['Do I require abdominal ultrasound or CT scan?', 'Should I stop taking blood thinners or NSAIDs prior to examination?'],
        medicationWarnings: 'Do not take strong laxatives or heating pads over suspected appendicitis.'
      };
    }
  },
  {
    id: 5,
    categoryId: 'symptoms',
    categoryName: 'Symptom & Triage Checkers',
    title: 'High Fever & Sepsis Pre-Check',
    summary: 'Evaluates systemic inflammatory response and infection danger signs.',
    fields: [
      { name: 'temp', label: 'Body Temperature (°F / °C)', type: 'text', placeholder: 'e.g. 102.5°F' },
      { name: 'heartRate', label: 'Heart Rate (BPM if known)', type: 'text', placeholder: 'e.g. 110' },
      { name: 'confusion', label: 'Altered mental state or extreme weakness?', type: 'select', options: ['Yes', 'No'] },
      { name: 'shivering', label: 'Rigors / Uncontrollable severe shaking chills?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isSepsisRisk = data.confusion === 'Yes' || data.shivering === 'Yes' || (parseInt(data.heartRate) > 100);
      return {
        triage: isSepsisRisk ? 'CRITICAL SEPSIS RED FLAG' : 'STANDARD FEVER EVALUATION',
        triageClass: isSepsisRisk ? 'danger' : 'success',
        impression: isSepsisRisk ? 'High risk of severe bacterial infection or systemic bacteremia/sepsis.' : 'Likely viral upper respiratory infection or self-limiting fever.',
        redFlags: ['Confusion / Lethargy', 'Rapid shallow breathing (>22 bpm)', 'Persistent fever >103°F unresponsive to Antipyretics'],
        doctorAdvice: isSepsisRisk ? 'Emergency Medical Attention Required immediately.' : 'Hydrate thoroughly, rest, and monitor temp every 4 hours.',
        labTests: ['Blood Cultures x 2', 'Serum Lactate', 'Complete Blood Count with Differential', 'Urinalysis & Urine Culture', 'Procalcitonin'],
        questionsForDoctor: ['Is my fever bacterial or viral?', 'What antipyretic dosing schedule is appropriate for my liver/kidneys?'],
        medicationWarnings: 'Ensure Acetaminophen dose does not exceed 3,000mg in 24 hours to prevent hepatotoxicity.'
      };
    }
  },
  {
    id: 6,
    categoryId: 'symptoms',
    categoryName: 'Symptom & Triage Checkers',
    title: 'Persistent Cough & Respiratory Infection Evaluator',
    summary: 'Checks cough duration, sputum character, and underlying lung vulnerability.',
    fields: [
      { name: 'duration', label: 'Cough Duration', type: 'select', options: ['Under 2 weeks (Acute)', '2 to 8 weeks (Subacute)', 'Over 8 weeks (Chronic)'] },
      { name: 'sputum', label: 'Sputum Appearance', type: 'select', options: ['Clear / White', 'Yellow / Green thick', 'Blood-tinged / Hemoptysis', 'Dry hacking (No sputum)'] },
      { name: 'nightSweats', label: 'Associated Night Sweats or Unexplained Weight Loss?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isHemoptysis = data.sputum === 'Blood-tinged / Hemoptysis' || data.nightSweats === 'Yes' || data.duration === 'Over 8 weeks (Chronic)';
      return {
        triage: isHemoptysis ? 'URGENT PULMONARY PRE-CHECK' : 'ROUTINE OUTPATIENT CARE',
        triageClass: isHemoptysis ? 'danger' : 'info',
        impression: isHemoptysis ? 'Requires exclusion of Bronchiectasis, Tuberculosis, COPD, or Bronchogenic Mass.' : 'Post-viral bronchial hyperresponsiveness or Cough Variant Asthma.',
        redFlags: ['Coughing up fresh blood', 'Drenching night sweats', 'Unintentional weight loss'],
        doctorAdvice: 'Schedule clinical evaluation. Bring a timeline of when cough triggers occur (night vs exercise).',
        labTests: ['Chest X-ray PA/Lateral', 'Sputum Acid-Fast Bacilli (AFB) & Gram Stain', 'High-Resolution CT Chest (if chronic)'],
        questionsForDoctor: ['Could my cough be a side effect of ACE-inhibitor blood pressure medication?', 'Do I need a chest imaging exam?'],
        medicationWarnings: 'Dextromethorphan cough suppressants should not be used if productive purulent cough is present.'
      };
    }
  },
  {
    id: 7,
    categoryId: 'symptoms',
    categoryName: 'Symptom & Triage Checkers',
    title: 'Dizziness, Vertigo & Syncope Pre-Check',
    summary: 'Differentiates true rotatory vertigo (Inner ear) from presyncope/orthostatic hypotension.',
    fields: [
      { name: 'type', label: 'Describe the sensation', type: 'select', options: ['Room spinning around me (Vertigo)', 'Lightheaded / Feeling like fainting (Presyncope)', 'Unsteadiness on feet (Ataxia)', 'Vague floating feeling'] },
      { name: 'triggers', label: 'Triggered by head movement?', type: 'select', options: ['Yes (Turning in bed / Looking up)', 'No (Constant regardless of position)', 'Triggered by standing up fast'] },
      { name: 'passedOut', label: 'Did you lose consciousness / blackout?', type: 'select', options: ['Yes (Syncope episode)', 'No'] }
    ],
    evaluate: (data) => {
      const isSyncope = data.passedOut === 'Yes' || (data.type === 'Unsteadiness on feet (Ataxia)' && data.triggers === 'No (Constant regardless of position)');
      return {
        triage: isSyncope ? 'URGENT CARDIAC / NEURO LOGICAL EVALUATION' : 'STANDARD ENT / GENERAL CONSULT',
        triageClass: isSyncope ? 'danger' : 'warning',
        impression: isSyncope ? 'Possible Cardiac Arrhythmia, Orthostatic Hypotension, or Central Cerebellar Pathology.' : 'Likely Benign Paroxysmal Positional Vertigo (BPPV) or Labyrinthitis.',
        redFlags: ['Syncope (fainting) with exertion', 'Double vision, slurred speech, or limb numbness'],
        doctorAdvice: isSyncope ? 'Seek urgent evaluation with ECG and blood pressure check.' : 'Avoid sudden posture changes. Consider canalith repositioning manoeuvres (Epley manoeuvre).',
        labTests: ['12-Lead ECG & Holter Monitor', 'Orthostatic Vital Signs', 'Dix-Hallpike Test', 'Audiometry'],
        questionsForDoctor: ['Is my dizziness originating from my inner ear or my heart rhythm?', 'Are any of my current prescription pills causing low blood pressure?'],
        medicationWarnings: 'Avoid driving or operating machinery until vertigo cause is diagnosed.'
      };
    }
  },
  {
    id: 8,
    categoryId: 'symptoms',
    categoryName: 'Symptom & Triage Checkers',
    title: 'Joint Inflammation & Arthralgia Pre-Check',
    summary: 'Evaluates acute monoarthritis (Gout/Septic) vs chronic polyarthritis (RA/OA).',
    fields: [
      { name: 'jointsAffected', label: 'Number of Joints Affected', type: 'select', options: ['Single Joint (Monoarticular)', '2-4 Joints (Oligoarticular)', '5+ Joints (Polyarticular)'] },
      { name: 'warmthRedness', label: 'Is the joint hot, red, and swollen?', type: 'select', options: ['Yes (Severe heat & swelling)', 'No (Mild aching)'] },
      { name: 'morningStiffness', label: 'Morning Stiffness Duration', type: 'select', options: ['Over 1 hour', 'Under 30 minutes', 'None'] }
    ],
    evaluate: (data) => {
      const isSepticOrGout = data.jointsAffected === 'Single Joint (Monoarticular)' && data.warmthRedness === 'Yes (Severe heat & swelling)';
      const isRA = data.jointsAffected === '5+ Joints (Polyarticular)' && data.morningStiffness === 'Over 1 hour';
      return {
        triage: isSepticOrGout ? 'URGENT RHEUMATOLOGY / ER EVALUATION' : 'STANDARD RHEUMATOLOGY CONSULT',
        triageClass: isSepticOrGout ? 'danger' : 'info',
        impression: isSepticOrGout ? 'Rule out Septic Arthritis (Emergency) or Acute Gouty Arthritis.' : isRA ? 'High clinical index for Inflammatory Polyarthritis (Rheumatoid Arthritis).' : 'Degenerative Osteoarthritis.',
        redFlags: ['Single hot swollen joint with inability to bear weight', 'Fever with joint pain'],
        doctorAdvice: isSepticOrGout ? 'Seek immediate orthopedic/ER evaluation for joint fluid aspiration.' : 'Keep a diary of joint swelling and morning stiffness duration.',
        labTests: ['Synovial Fluid Analysis (Gram stain, crystal polarimetry)', 'Serum Uric Acid', 'Rheumatoid Factor (RF) & Anti-CCP', 'ESR & CRP'],
        questionsForDoctor: ['Do I need joint aspiration to test for crystals or infection?', 'Are disease-modifying anti-rheumatic drugs (DMARDs) indicated?'],
        medicationWarnings: 'Do not start Uric Acid lowering drugs (Allopurinol) during an acute gout flare without physician supervision.'
      };
    }
  },
  {
    id: 9,
    categoryId: 'symptoms',
    categoryName: 'Symptom & Triage Checkers',
    title: 'Unexplained Weight Loss & B-Symptom Evaluator',
    summary: 'Screens for systemic illness, malignancy, or endocrine disorders.',
    fields: [
      { name: 'amount', label: 'Weight Loss Amount', type: 'select', options: ['> 5% of body weight in 6 months', 'Minor fluctuating 1-2 kg', 'Unsure'] },
      { name: 'dietChanged', label: 'Were you intentionally dieting or exercising?', type: 'select', options: ['No (Unintentional while eating normally)', 'Yes (Calorie reduction)'] },
      { name: 'otherSymptoms', label: 'Associated B-Symptoms', type: 'multiselect', options: ['Drenching Night Sweats', 'Persistent Low Fever', 'Swollen Lymph Nodes', 'Increased Appetite + Tremors', 'None'] }
    ],
    evaluate: (data) => {
      const isWarning = data.amount === '> 5% of body weight in 6 months' && data.dietChanged === 'No (Unintentional while eating normally)';
      return {
        triage: isWarning ? 'COMPREHENSIVE MEDICAL WORKUP REQUIRED' : 'ROUTINE MONITORING',
        triageClass: isWarning ? 'danger' : 'success',
        impression: isWarning ? 'Significant unintentional weight loss warrants systemic evaluation (Occult Malignancy, Hyperthyroidism, Malabsorption, Diabetes Mellitus).' : 'Non-pathological weight variation.',
        redFlags: ['Unintentional loss of >5% body weight', 'Painless enlarged lymph nodes', 'Drenching night sweats'],
        doctorAdvice: 'Schedule a thorough physical exam. Bring a list of changes in appetite and bowel habits.',
        labTests: ['Complete Blood Count', 'Comprehensive Metabolic Panel (CMP)', 'TSH & Free T4', 'HbA1c', 'CT Chest/Abdomen/Pelvis (if clinical indication)', 'Age-appropriate Cancer Screenings (Colonoscopy, Mammogram, PSA)'],
        questionsForDoctor: ['What blood markers or imaging should we run to investigate this weight loss?', 'Could an occult GI or endocrine issue be responsible?'],
        medicationWarnings: 'Do not consume appetite stimulants without identifying the underlying medical etiology.'
      };
    }
  },
  {
    id: 10,
    categoryId: 'symptoms',
    categoryName: 'Symptom & Triage Checkers',
    title: 'Fatigue & Anemia Screen Pre-Check',
    summary: 'Evaluates causes of chronic tiredness (Iron deficiency, B12, Thyroid, Sleep Apnea).',
    fields: [
      { name: 'fatigueDuration', label: 'Duration of Fatigue', type: 'select', options: ['Under 1 month', '1 to 6 months', 'Greater than 6 months'] },
      { name: 'paleSkin', label: 'Pale inner eyelids or cold hands/feet?', type: 'select', options: ['Yes', 'No'] },
      { name: 'snoring', label: 'Loud snoring or waking up gasping for air?', type: 'select', options: ['Yes', 'No'] },
      { name: 'dietaryPattern', label: 'Dietary Preference', type: 'select', options: ['Strict Vegan / Vegetarian', 'Omnivore', 'Restricted diet'] }
    ],
    evaluate: (data) => {
      const isAnemiaOrApnea = data.paleSkin === 'Yes' || data.snoring === 'Yes' || data.dietaryPattern === 'Strict Vegan / Vegetarian';
      return {
        triage: 'PRE-CONSULTATION WORKUP INDICATED',
        triageClass: 'info',
        impression: isAnemiaOrApnea ? 'Suspected Iron Deficiency Anemia, Vitamin B12 Deficiency, Hypothyroidism, or Obstructive Sleep Apnea.' : 'General Chronic Fatigue Syndrome or Lifestyle Burden.',
        redFlags: ['Shortness of breath on mild exertion', 'Palpitations', 'Black tarry stools (suggesting GI blood loss)'],
        doctorAdvice: 'Schedule primary care visit with laboratory blood work orders.',
        labTests: ['CBC with Red Cell Indices (MCV, MCH)', 'Serum Ferritin & Iron Panel', 'Vitamin B12 & Serum Folate', 'TSH', 'Polysomnography (Sleep Study if Apnea suspected)'],
        questionsForDoctor: ['Should I get a full iron and ferritin blood panel?', 'Could my diet or sleep quality be causing cellular hypoxia?'],
        medicationWarnings: 'Do not take high-dose oral iron supplements before blood testing as it may distort serum iron readings.'
      };
    }
  },

  // ==========================================
  // DOMAIN 2: DRUG & MEDICINE SAFETY (11 - 20)
  // ==========================================
  {
    id: 11,
    categoryId: 'drug_safety',
    categoryName: 'Drug & Medicine Safety',
    title: 'Polypharmacy Interaction Risk Matrix',
    summary: 'Screens list of 4+ daily medications for cumulative toxicity and metabolic overload.',
    fields: [
      { name: 'medCount', label: 'Total Number of Daily Medications', type: 'select', options: ['1 - 3 Medications', '4 - 7 Medications', '8+ Medications (Severe Polypharmacy)'] },
      { name: 'prescribers', label: 'Prescribed by multiple different doctors?', type: 'select', options: ['Yes (Multiple specialists)', 'No (Single GP)'] },
      { name: 'otcUsage', label: 'Take OTC supplements or pain relievers daily?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isHighRisk = data.medCount === '8+ Medications (Severe Polypharmacy)' || data.prescribers === 'Yes (Multiple specialists)';
      return {
        triage: isHighRisk ? 'COMPREHENSIVE PHARMACY RECONCILIATION NEEDED' : 'ROUTINE MED RECONCILIATION',
        triageClass: isHighRisk ? 'danger' : 'success',
        impression: isHighRisk ? 'High vulnerability to drug-drug interactions, prescribing cascades, and adverse drug events.' : 'Moderate polypharmacy profile; low immediate risk.',
        redFlags: ['New unaddressed symptoms after starting a new prescription', 'Dizziness when standing'],
        doctorAdvice: 'Bring ALL physical medicine bottles (including OTC pills & herbal teas) to your next doctor visit in a single bag.',
        labTests: ['Comprehensive Metabolic Panel (Renal & Hepatic clearance)', 'Therapeutic Drug Level Monitoring (if taking Digoxin/Theophylline/Lithium)'],
        questionsForDoctor: ['Are any of my medications redundant or can any be safely deprescribed?', 'Do any of my pills interact through Cytochrome P450 pathways?'],
        medicationWarnings: 'Never discontinue a prescribed medication abruptly without consulting your treating physician.'
      };
    }
  },
  {
    id: 12,
    categoryId: 'drug_safety',
    categoryName: 'Drug & Medicine Safety',
    title: 'Renal Impairment Medicine Dosage Safety',
    summary: 'Checks if medications require dose adjustments based on Kidney Function (eGFR / Creatinine).',
    fields: [
      { name: 'egfr', label: 'Estimated Glomerular Filtration Rate (eGFR)', type: 'select', options: ['Normal (> 60 mL/min)', 'Mildly Reduced (45-59)', 'Moderate Impairment (30-44)', 'Severe Impairment (< 30 mL/min)', 'Unsure'] },
      { name: 'medTypes', label: 'Are you taking any of these medications?', type: 'multiselect', options: ['Metformin', 'NSAIDs (Ibuprofen / Naproxen)', 'ACE-Inhibitors / ARBs', 'Novel Oral Anticoagulants (DOACs)', 'Gentamicin / Vancomycin', 'None'] }
    ],
    evaluate: (data) => {
      const isRenalRisk = (data.egfr.includes('Moderate') || data.egfr.includes('Severe')) && data.medTypes && (data.medTypes.includes('Metformin') || data.medTypes.includes('NSAIDs (Ibuprofen / Naproxen)'));
      return {
        triage: isRenalRisk ? 'CRITICAL RENAL DOSE REVISION NEEDED' : 'STANDARD KIDNEY SAFETY REVIEW',
        triageClass: isRenalRisk ? 'danger' : 'info',
        impression: isRenalRisk ? 'Metformin and NSAIDs can cause severe Lactic Acidosis or Nephrotoxicity in impaired eGFR.' : 'Kidney function permits standard medication dosing.',
        redFlags: ['Decreased urine output', 'Fluid accumulation in legs (edema)', 'Nausea & metallic taste'],
        doctorAdvice: 'Obtain an updated Serum Creatinine test before your clinic visit.',
        labTests: ['Serum Creatinine & eGFR', 'Urine Albumin-to-Creatinine Ratio (UACR)', 'Serum Electrolytes (Potassium, Sodium)'],
        questionsForDoctor: ['Does my kidney function require dose reduction for my daily pills?', 'Should I avoid NSAID pain relievers entirely?'],
        medicationWarnings: 'NSAIDs restrict renal afferent arteriole blood flow and can precipitate acute kidney injury.'
      };
    }
  },
  {
    id: 13,
    categoryId: 'drug_safety',
    categoryName: 'Drug & Medicine Safety',
    title: 'Hepatic Safety & Liver Function Med Check',
    summary: 'Evaluates drug hepatotoxicity risk for patients with elevated ALT/AST or Liver disease.',
    fields: [
      { name: 'liverCondition', label: 'Do you have known Liver Disease?', type: 'select', options: ['Fatty Liver (NAFLD / NASH)', 'Cirrhosis', 'Hepatitis B / C', 'No known liver issues'] },
      { name: 'acetaminophenDose', label: 'Daily Paracetamol / Acetaminophen intake', type: 'select', options: ['None / Occasional', '1000mg - 2000mg per day', 'Over 3000mg per day'] },
      { name: 'alcoholUse', label: 'Alcohol Consumption', type: 'select', options: ['None', 'Moderate (1-2 drinks/day)', 'Heavy / Regular (>3 drinks/day)'] }
    ],
    evaluate: (data) => {
      const isHepatotoxic = (data.liverCondition !== 'No known liver issues' || data.alcoholUse.includes('Heavy')) && data.acetaminophenDose === 'Over 3000mg per day';
      return {
        triage: isHepatotoxic ? 'URGENT HEPATOTOXICITY ALERT' : 'ROUTINE LIVER SAFETY CHECK',
        triageClass: isHepatotoxic ? 'danger' : 'warning',
        impression: isHepatotoxic ? 'Extreme risk of drug-induced liver injury (DILI) and hepatocyte necrosis.' : 'Acceptable hepatic clearance profile.',
        redFlags: ['Jaundice (yellowing of skin/eyes)', 'Dark tea-colored urine', 'Right upper abdomen fullness'],
        doctorAdvice: isHepatotoxic ? 'Stop high-dose paracetamol immediately and see a physician.' : 'Ensure annual liver enzyme monitoring.',
        labTests: ['Liver Function Tests (ALT, AST, ALP, Total Bilirubin)', 'Prothrombin Time / INR', 'Serum Albumin'],
        questionsForDoctor: ['Are any of my prescribed drugs processed heavily by hepatic CYP450 enzymes?', 'What is my maximum safe daily dose of analgesics?'],
        medicationWarnings: 'St. John’s Wort, Statins, and certain Anti-fungals can interact with hepatic enzymes.'
      };
    }
  },
  {
    id: 14,
    categoryId: 'drug_safety',
    categoryName: 'Drug & Medicine Safety',
    title: 'NSAID & Gastric Ulcer Toxicity Pre-Check',
    summary: 'Assesses GI bleeding and ulceration risk from chronic NSAID pain relief.',
    fields: [
      { name: 'nsaidFreq', label: 'NSAID Usage Frequency (Ibuprofen, Naproxen, Diclofenac)', type: 'select', options: ['Daily / Continuous', '3-4 times a week', 'Occasional / Rare'] },
      { name: 'ulcerHistory', label: 'History of Stomach Ulcers or Acid Reflux?', type: 'select', options: ['Yes (Past peptic ulcer / GI bleed)', 'Yes (GERD only)', 'No'] },
      { name: 'coMedication', label: 'Are you also taking Blood Thinners or Steroids?', type: 'select', options: ['Yes (Aspirin / Warfarin / Steroids)', 'No'] }
    ],
    evaluate: (data) => {
      const isHighGIRisk = (data.nsaidFreq === 'Daily / Continuous' && data.ulcerHistory.includes('Past peptic ulcer')) || (data.coMedication.includes('Yes'));
      return {
        triage: isHighGIRisk ? 'HIGH GI BLEEDING RISK ALERT' : 'MODERATE NSAID SAFETY PROFILE',
        triageClass: isHighGIRisk ? 'danger' : 'success',
        impression: isHighGIRisk ? 'Synergistic gastric mucosal ulceration and high gastrointestinal bleeding potential.' : 'Low immediate mucosal erosion risk.',
        redFlags: ['Black tarry stools (Melena)', 'Coffee-ground vomitus', 'Sharp burning epigastric pain'],
        doctorAdvice: 'Discuss co-prescribing a Proton Pump Inhibitor (Omeprazole) or switching to COX-2 selective NSAIDs (Celecoxib).',
        labTests: ['Complete Blood Count (Hemoglobin / Hematocrit)', 'H. Pylori Stool Antigen Test', 'Fecal Occult Blood Test'],
        questionsForDoctor: ['Should I take a stomach protective pill alongside my pain medication?', 'Is Acetaminophen or Topical Gel a safer alternative for my joint pain?'],
        medicationWarnings: 'Never take NSAIDs on an empty stomach. Always consume with food or milk.'
      };
    }
  },
  {
    id: 15,
    categoryId: 'drug_safety',
    categoryName: 'Drug & Medicine Safety',
    title: 'QT Prolongation & Cardiac Arrhythmia Med Check',
    summary: 'Evaluates risk of Torsades de Pointes from combined QT-prolonging drugs.',
    fields: [
      { name: 'qtDrugs', label: 'Are you taking any of these drug classes?', type: 'multiselect', options: ['Fluoroquinolone Antibiotics (Cipro/Levo)', 'Macrolides (Azithromycin)', 'Antipsychotics (Haloperidol/Quetiapine)', 'SSRIs / Antidepressants (Citalopram)', 'Antiarrhythmics (Amiodarone/Sotalol)', 'None'] },
      { name: 'palpitations', label: 'Do you experience sudden flutterings or racing heart?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const hasMultipleQT = data.qtDrugs && data.qtDrugs.length >= 2;
      return {
        triage: hasMultipleQT ? 'URGENT QT PROLONGATION RISK' : 'STANDARD DRUG MONITORING',
        triageClass: hasMultipleQT ? 'danger' : 'info',
        impression: hasMultipleQT ? 'Additive prolongation of cardiac ventricular repolarization (QTc interval > 470ms risk).' : 'Single QT drug profile; minimal additive risk.',
        redFlags: ['Sudden fainting without warning', 'Severe heart racing (Palpitations)'],
        doctorAdvice: 'Request a baseline 12-lead ECG to measure corrected QTc interval.',
        labTests: ['12-Lead ECG QTc Measurement', 'Serum Potassium & Magnesium levels'],
        questionsForDoctor: ['Do my current prescription drugs interact to prolong my QTc interval?', 'Are my serum electrolyte levels optimal for cardiac conduction?'],
        medicationWarnings: 'Hypokalemia significantly increases the risk of drug-induced cardiac arrhythmias.'
      };
    }
  },
  {
    id: 16,
    categoryId: 'drug_safety',
    categoryName: 'Drug & Medicine Safety',
    title: 'Anticoagulant & OTC Bleeding Hazard Evaluator',
    summary: 'Checks bleeding complications for patients on Warfarin, Aspirin, or DOACs.',
    fields: [
      { name: 'bloodThinner', label: 'Current Blood Thinner', type: 'select', options: ['Warfarin (Coumadin)', 'DOAC (Apixaban / Rivaroxaban / Dabigatran)', 'Aspirin / Clopidogrel', 'None'] },
      { name: 'otcHerbals', label: 'Take OTC supplements (Ginkgo, Vitamin E, Fish Oil, Garlic)?', type: 'select', options: ['Yes', 'No'] },
      { name: 'bruising', label: 'Unusual spontaneous bruising or nosebleeds?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isBleedRisk = data.bloodThinner !== 'None' && (data.otcHerbals === 'Yes' || data.bruising === 'Yes');
      return {
        triage: isBleedRisk ? 'URGENT HEMORRHAGIC RISK PRE-CHECK' : 'ROUTINE INR / DOAC MONITORING',
        triageClass: isBleedRisk ? 'danger' : 'warning',
        impression: isBleedRisk ? 'Potentiated antiplatelet/anticoagulant effect increasing internal bleeding hazard.' : 'Stable anticoagulant therapy.',
        redFlags: ['Spontaneous hematomas', 'Gingival bleeding >10 mins', 'Hematuria (pink/red urine)'],
        doctorAdvice: isBleedRisk ? 'Stop unverified herbal supplements and notify your doctor.' : 'Maintain regular INR checks if on Warfarin.',
        labTests: ['Prothrombin Time / INR (for Warfarin)', 'Anti-Factor Xa Assay (for DOACs)', 'Platelet Count'],
        questionsForDoctor: ['What is my target INR range?', 'Which over-the-counter pain medications are safe with my blood thinner?'],
        medicationWarnings: 'Herbal supplements like Ginkgo Biloba, St. John’s Wort, and Garlic extracts inhibit platelet aggregation.'
      };
    }
  },
  {
    id: 17,
    categoryId: 'drug_safety',
    categoryName: 'Drug & Medicine Safety',
    title: 'Antibiotic Stewardship & Resistance Pre-Check',
    summary: 'Evaluates appropriate antibiotic use, course completion, and resistance patterns.',
    fields: [
      { name: 'antibioticName', label: 'Antibiotic Name / Purpose', type: 'text', placeholder: 'e.g. Amoxicillin for throat' },
      { name: 'symptomDuration', label: 'Symptom duration before antibiotic', type: 'select', options: ['Under 3 days', '3 to 7 days', 'Over 10 days'] },
      { name: 'leftoverUse', label: 'Is this a leftover antibiotic from a past illness?', type: 'select', options: ['Yes', 'No (Newly prescribed by doctor)'] }
    ],
    evaluate: (data) => {
      const isMisuse = data.leftoverUse === 'Yes' || data.symptomDuration === 'Under 3 days';
      return {
        triage: isMisuse ? 'ANTIBIOTIC MISUSE WARNING' : 'APPROPRIATE STEWARDSHIP REVIEW',
        triageClass: isMisuse ? 'danger' : 'success',
        impression: isMisuse ? 'Self-prescribing leftover antibiotics for acute viral infections promotes antimicrobial resistance and microbiome disruption.' : 'Legitimate bacterial antibiotic protocol.',
        redFlags: ['Severe watery diarrhea (Possible C. difficile infection)', 'Allergic skin rash or facial swelling'],
        doctorAdvice: 'Never take leftover antibiotics. Allow a doctor to confirm bacterial infection via culture before taking antibiotics.',
        labTests: ['C-Reactive Protein (CRP)', 'Bacterial Culture & Sensitivity (Throat/Urine/Sputum)', 'Complete Blood Count'],
        questionsForDoctor: ['Is my infection bacterial or viral?', 'Do I need probiotics during or after this antibiotic course?'],
        medicationWarnings: 'Always complete the full prescribed course even if symptoms resolve early, unless advised otherwise by a doctor.'
      };
    }
  },
  {
    id: 18,
    categoryId: 'drug_safety',
    categoryName: 'Drug & Medicine Safety',
    title: 'Medication Expiration & Degradation Risk Checker',
    summary: 'Assesses chemical breakdown safety risks for expired tablets, liquid syrups, and eye drops.',
    fields: [
      { name: 'formulation', label: 'Medicine Formulation', type: 'select', options: ['Solid Tablets / Capsules', 'Liquid Syrups / Suspensions', 'Eye Drops / Ointments', 'Injectables / Insulin'] },
      { name: 'monthsExpired', label: 'Months past printed expiration date', type: 'select', options: ['Under 1 month', '1 to 6 months', 'Over 6 months expired'] },
      { name: 'storageCondition', label: 'Storage location', type: 'select', options: ['Bathroom cabinet (High humidity/heat)', 'Cool dry place', 'Direct sunlight'] }
    ],
    evaluate: (data) => {
      const isHighRiskDegradation = data.formulation === 'Eye Drops / Ointments' || data.formulation === 'Injectables / Insulin' || data.monthsExpired === 'Over 6 months expired' || data.storageCondition === 'Bathroom cabinet (High humidity/heat)';
      return {
        triage: isHighRiskDegradation ? 'EXPIRED MEDICATION DISCARD ALERT' : 'POTENCY MONITORING',
        triageClass: isHighRiskDegradation ? 'danger' : 'warning',
        impression: isHighRiskDegradation ? 'High risk of bacterial contamination (eye drops), toxic degradation products (Tetracycline toxicity), or therapeutic loss (Insulin degradation).' : 'Slight loss of potency; low acute toxicity risk.',
        redFlags: ['Cloudiness or precipitate in liquid medicines', 'Eye irritation or infection after drop usage'],
        doctorAdvice: 'Safely dispose of expired medications at a pharmacy drug drop-off box. Request a fresh refill prescription.',
        labTests: ['Not applicable - pharmaceutical chemistry risk'],
        questionsForDoctor: ['Can you issue a fresh prescription refill for my degraded medicine?', 'What is the recommended storage temperature for this specific formulation?'],
        medicationWarnings: 'Expired Tetracyclines degrade into toxic compounds causing Renal Fanconi Syndrome.'
      };
    }
  },
  {
    id: 19,
    categoryId: 'drug_safety',
    categoryName: 'Drug & Medicine Safety',
    title: 'Sedative & CNS Depression Multi-Drug Evaluator',
    summary: 'Screens hazardous combining of Opioids, Benzodiazepines, Muscle Relaxants, & Alcohol.',
    fields: [
      { name: 'sedativesTaken', label: 'Select all CNS Depressants currently taken', type: 'multiselect', options: ['Opioid Painkillers (Tramadol/Codeine/Morphine)', 'Benzodiazepines (Alprazolam/Diazepam)', 'Sedating Antihistamines (Diphenhydramine)', 'Muscle Relaxants', 'Alcohol', 'None'] }
    ],
    evaluate: (data) => {
      const count = data.sedativesTaken ? data.sedativesTaken.filter(x => x !== 'None').length : 0;
      return {
        triage: count >= 2 ? 'CRITICAL CNS DEPRESSION DANGER' : 'LOW SEDATION RISK',
        triageClass: count >= 2 ? 'danger' : 'success',
        impression: count >= 2 ? 'Synergistic central nervous system and respiratory center depression (FDA Black Box Warning).' : 'Single agent profile; acceptable respiratory drive.',
        redFlags: ['Extreme drowsiness / Difficulty waking', 'Shallow slow breathing (<10 breaths/min)', 'Slurred speech'],
        doctorAdvice: count >= 2 ? 'Contact prescribing physician immediately to adjust overlapping sedatives. Ensure Naloxone kit availability if on high-dose opioids.' : 'Take sedatives strictly at bedtime.',
        labTests: ['Arterial Blood Gas (ABG if severe hypoventilation)', 'Pulse Oximetry'],
        questionsForDoctor: ['Are my pain relievers and sleep medications safe to take in the same 24-hour period?', 'Should my dose be reduced to prevent daytime sedation?'],
        medicationWarnings: 'Combining Opioids and Benzodiazepines carries a profound risk of fatal respiratory arrest.'
      };
    }
  },
  {
    id: 20,
    categoryId: 'drug_safety',
    categoryName: 'Drug & Medicine Safety',
    title: 'Steroid Tapering & Adrenal Withdrawal Safety Check',
    summary: 'Prevents acute adrenal crisis from abrupt discontinuation of systemic Corticosteroids.',
    fields: [
      { name: 'steroidDuration', label: 'Corticosteroid Usage Duration (Prednisone / Dexamethasone)', type: 'select', options: ['Under 2 weeks', '2 to 4 weeks', 'Over 1 month continuous'] },
      { name: 'stoppingPlan', label: 'Are you stopping abruptly or tapering?', type: 'select', options: ['Stopping abruptly (Cold turkey)', 'Gradual step-down schedule'] },
      { name: 'symptoms', label: 'Current symptoms', type: 'multiselect', options: ['Severe fatigue / Weakness', 'Dizziness when standing', 'Nausea / Vomiting', 'None'] }
    ],
    evaluate: (data) => {
      const isAdrenalCrisisRisk = data.steroidDuration !== 'Under 2 weeks' && data.stoppingPlan === 'Stopping abruptly (Cold turkey)';
      return {
        triage: isAdrenalCrisisRisk ? 'URGENT ADRENAL INSUFFICIENCY ALERT' : 'SAFE STEROID TAPER PROTOCOL',
        triageClass: isAdrenalCrisisRisk ? 'danger' : 'info',
        impression: isAdrenalCrisisRisk ? 'High risk of Acute Adrenal Crisis due to hypothalamic-pituitary-adrenal (HPA) axis suppression.' : 'Physiologic steroid withdrawal managed properly.',
        redFlags: ['Profound hypotension / fainting', 'Severe abdominal pain', 'High fever without infection'],
        doctorAdvice: isAdrenalCrisisRisk ? 'Do NOT stop steroids abruptly. Contact your doctor immediately for an explicit dose-tapering schedule.' : 'Follow the step-down tablet calendar closely.',
        labTests: ['Morning Serum Cortisol (8 AM)', 'ACTH Stimulation Test', 'Serum Electrolytes (Sodium, Potassium)'],
        questionsForDoctor: ['What is my personalized step-down taper calendar?', 'Do I need a stress-dose steroid adjustment during acute illness?'],
        medicationWarnings: 'Steroids taken longer than 14 days suppress endogenous adrenal cortisol production.'
      };
    }
  },

  // ==========================================
  // DOMAIN 3: CHRONIC DISEASE PRE-CHECKS (21 - 30)
  // ==========================================
  {
    id: 21,
    categoryId: 'chronic',
    categoryName: 'Chronic Disease Pre-Checks',
    title: 'Hypertension BP Trend & Medication Review',
    summary: 'Evaluates blood pressure logs against AHA/ACC guidelines before clinic consultation.',
    fields: [
      { name: 'systolic', label: 'Average Systolic BP (Top Number)', type: 'text', placeholder: 'e.g. 145' },
      { name: 'diastolic', label: 'Average Diastolic BP (Bottom Number)', type: 'text', placeholder: 'e.g. 92' },
      { name: 'medAdherence', label: 'Do you miss BP pills?', type: 'select', options: ['Never (100% compliant)', 'Occasionally (1-2 pills/week)', 'Frequently miss pills'] },
      { name: 'symptoms', label: 'Associated symptoms', type: 'multiselect', options: ['Occipital morning headache', 'Blurred vision', 'Chest tightness', 'None'] }
    ],
    evaluate: (data) => {
      const sys = parseInt(data.systolic) || 120;
      const dia = parseInt(data.diastolic) || 80;
      const isCrisis = sys >= 180 || dia >= 120;
      const isStage2 = sys >= 140 || dia >= 90;
      return {
        triage: isCrisis ? 'HYPERTENSIVE CRISIS EMERGENCY' : isStage2 ? 'STAGE 2 HYPERTENSION REVIEW' : 'WELL-CONTROLLED BP',
        triageClass: isCrisis ? 'danger' : isStage2 ? 'warning' : 'success',
        impression: isCrisis ? 'Risk of acute end-organ damage (Hypertensive Encephalopathy / Stroke / Aortic Dissection).' : isStage2 ? 'Suboptimal blood pressure control requiring medication titrations.' : 'Target blood pressure achieved.',
        redFlags: ['Systolic > 180 or Diastolic > 120', 'Sudden visual changes or severe headache'],
        doctorAdvice: isCrisis ? 'Seek immediate ER care.' : 'Bring a 7-day home BP diary logged twice daily (morning & evening).',
        labTests: ['Serum Creatinine & eGFR', 'Urinalysis for Microalbuminuria', '12-Lead ECG', 'Serum Electrolytes'],
        questionsForDoctor: ['Should my medication dose be stepped up or should a second agent be added?', 'Am I experiencing white-coat hypertension?'],
        medicationWarnings: 'Avoid OTC decongestants (Pseudoephedrine) as they elevate systemic vascular resistance.'
      };
    }
  },
  {
    id: 22,
    categoryId: 'chronic',
    categoryName: 'Chronic Disease Pre-Checks',
    title: 'Diabetes HbA1c & Hypoglycemia Warning Check',
    summary: 'Evaluates glycemic stability, HbA1c target attainment, and low blood sugar alarms.',
    fields: [
      { name: 'lastHba1c', label: 'Most Recent HbA1c (%)', type: 'text', placeholder: 'e.g. 8.4%' },
      { name: 'hypoFreq', label: 'Frequency of Hypoglycemia (<70 mg/dL)', type: 'select', options: ['Multiple times a week', 'Rarely / Never', 'Unsure (Feel shaky/sweaty)'] },
      { name: 'footSensation', label: 'Numbness or tingling in toes/feet?', type: 'select', options: ['Yes (Diabetic Neuropathy symptoms)', 'No'] }
    ],
    evaluate: (data) => {
      const hba1c = parseFloat(data.lastHba1c) || 7.0;
      const isUncontrolled = hba1c > 8.5 || data.hypoFreq === 'Multiple times a week';
      return {
        triage: isUncontrolled ? 'GLYCEMIC INSTABILITY PRE-CHECK' : 'ROUTINE DIABETES REVIEW',
        triageClass: isUncontrolled ? 'danger' : 'success',
        impression: isUncontrolled ? 'High microvascular complication risk or dangerous hypoglycemia unawareness.' : 'Acceptable glycemic control profile.',
        redFlags: ['Blood glucose < 55 mg/dL unresponsive to 15g Fast Carbs', 'Fruity breath odor with confusion (DKA alert)'],
        doctorAdvice: 'Bring your glucose meter log or Continuous Glucose Monitor (CGM) report to your appointment.',
        labTests: ['HbA1c test', 'Urine Albumin-to-Creatinine Ratio (UACR)', 'Comprehensive Lipid Panel', 'Comprehensive Diabetic Foot & Monofilament Exam'],
        questionsForDoctor: ['Is my HbA1c within my personalized target (<7.0%)?', 'Should I switch to an SGLT2 inhibitor or GLP-1 receptor agonist for kidney/cardiac protection?'],
        medicationWarnings: 'Sulfonylureas (Glimepiride/Glibenclamide) carry a high risk of prolonged hypoglycemia in elderly patients.'
      };
    }
  },
  {
    id: 23,
    categoryId: 'chronic',
    categoryName: 'Chronic Disease Pre-Checks',
    title: 'Asthma & COPD Exacerbation Score Evaluator',
    summary: 'Assesses airway obstruction control based on GINA/GOLD clinical standards.',
    fields: [
      { name: 'nightWaking', label: 'Nighttime waking due to coughing/wheezing', type: 'select', options: ['2+ times per week', '1-2 times per month', 'Never'] },
      { name: 'rescueUse', label: 'Rescue Inhaler (Salbutamol/Albuterol) usage', type: 'select', options: ['Daily / Multiple times a day', '2-3 times per week', 'Rarely'] },
      { name: 'pefr', label: 'Peak Expiratory Flow Rate (% of personal best)', type: 'select', options: ['Under 60% (Red Zone)', '60-80% (Yellow Zone)', '80-100% (Green Zone)', 'Not measured'] }
    ],
    evaluate: (data) => {
      const isUncontrolled = data.nightWaking === '2+ times per week' || data.rescueUse.includes('Daily') || data.pefr.includes('Under 60%');
      return {
        triage: isUncontrolled ? 'UNCONTROLLED ASTHMA / COPD FLARE' : 'STABLE AIRWAY CONTROL',
        triageClass: isUncontrolled ? 'danger' : 'success',
        impression: isUncontrolled ? 'High risk of acute severe bronchial exacerbation requiring systemic corticosteroids.' : 'Optimal bronchodilator control.',
        redFlags: ['PEFR < 50% personal best', 'Silent chest (no air movement heard)', 'Inability to speak in sentences'],
        doctorAdvice: 'Bring all current inhalers to check inhalation device technique with your clinician.',
        labTests: ['Spirometry with Post-Bronchodilator Reversibility', 'Fractional Exhaled Nitric Oxide (FeNO)', 'Blood Eosinophil Count'],
        questionsForDoctor: ['Do I need to step up to a Combination Inhaled Corticosteroid (ICS-LABA)?', 'Is my inhaler spacer technique correct?'],
        medicationWarnings: 'Relying solely on short-acting beta-agonists (SABA) without inhaled steroids increases asthma mortality.'
      };
    }
  },
  {
    id: 24,
    categoryId: 'chronic',
    categoryName: 'Chronic Disease Pre-Checks',
    title: 'Hypothyroidism / Hyperthyroidism Symptom Check',
    summary: 'Evaluates thyroid hormone dosage efficacy (Levothyroxine / Methimazole).',
    fields: [
      { name: 'condition', label: 'Thyroid Status', type: 'select', options: ['Hypothyroidism (Underactive)', 'Hyperthyroidism (Overactive)', 'Thyroid Nodule / Post-Surgery', 'Undiagnosed'] },
      { name: 'symptomCluster', label: 'Primary Symptoms Experienced', type: 'select', options: ['Cold intolerance, weight gain, constipation, dry skin', 'Heat intolerance, tremors, palpitations, weight loss', 'Neck lump or trouble swallowing', 'None'] },
      { name: 'medTiming', label: 'How do you take your Levothyroxine?', type: 'select', options: ['First thing in morning with water, 30-60 mins before breakfast', 'With breakfast or coffee', 'At bedtime', 'Not taking thyroid med'] }
    ],
    evaluate: (data) => {
      const isSuboptimal = data.medTiming === 'With breakfast or coffee' || (data.symptomCluster !== 'None' && data.condition !== 'Undiagnosed');
      return {
        triage: isSuboptimal ? 'THYROID DOSING REVISION INDICATED' : 'STABLE THYROID STATUS',
        triageClass: isSuboptimal ? 'warning' : 'success',
        impression: isSuboptimal ? 'Malabsorption or inadequate replacement therapy resulting in TSH target deviation.' : 'Balanced thyroid metabolic state.',
        redFlags: ['Rapid irregular heartbeat (Atrial Fibrillation risk in Hyperthyroidism)', 'Extreme lethargy with hypothermia (Myxedema risk)'],
        doctorAdvice: 'Coffee, calcium pills, and iron supplements impair Levothyroxine absorption by up to 50%. Separate by 4 hours.',
        labTests: ['Serum TSH (Thyroid Stimulating Hormone)', 'Free T4 & Free T3', 'Anti-TPO Antibodies (for Hashimoto’s evaluation)'],
        questionsForDoctor: ['Is my TSH within the narrow target range (0.5 - 2.5 mIU/L)?', 'Are my supplements interfering with my Levothyroxine absorption?'],
        medicationWarnings: 'Always take Levothyroxine on a completely empty stomach with a full glass of water.'
      };
    }
  },
  {
    id: 25,
    categoryId: 'chronic',
    categoryName: 'Chronic Disease Pre-Checks',
    title: 'Chronic Kidney Disease (CKD) Stage & Med Review',
    summary: 'Monitors CKD progression markers and nephrotoxic drug avoidance.',
    fields: [
      { name: 'ckdStage', label: 'Known CKD Stage', type: 'select', options: ['Stage 1-2 (Mild, eGFR >60)', 'Stage 3a/3b (Moderate, eGFR 30-59)', 'Stage 4-5 (Severe/ESRD, eGFR <30)', 'Unknown'] },
      { name: 'swelling', label: 'Pitting edema in ankles/legs or facial puffiness?', type: 'select', options: ['Yes', 'No'] },
      { name: 'potassiumDiet', label: 'Do you take potassium-sparing drugs (Spironolactone) or high potassium diet?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isSevere = data.ckdStage.includes('Stage 4-5') || (data.swelling === 'Yes' && data.ckdStage.includes('Stage 3'));
      return {
        triage: isSevere ? 'NEPHROLOGY CONSULTATION REQUIRED' : 'ROUTINE CKD MONITORING',
        triageClass: isSevere ? 'danger' : 'info',
        impression: isSevere ? 'Progressive decline in renal filtration capacity requiring strict dietary & pharmacological management.' : 'Stable renal insufficiency.',
        redFlags: ['Hyperkalemia symptoms (Muscle weakness, cardiac arrhythmia)', 'Uremic pericarditis / shortness of breath'],
        doctorAdvice: 'Maintain strict blood pressure control (<130/80 mmHg) to slow nephron loss.',
        labTests: ['Serum Creatinine & eGFR', 'Blood Urea Nitrogen (BUN)', 'Urine Albumin-to-Creatinine Ratio (UACR)', 'Serum Potassium, Calcium, Phosphate, Parathyroid Hormone (PTH)'],
        questionsForDoctor: ['Is an SGLT2 inhibitor (Dapagliflozin/Empagliflozin) appropriate to slow my CKD progression?', 'Do I need a renal dietitian consultation?'],
        medicationWarnings: 'Strictly avoid contrast dyes and over-the-counter NSAIDs.'
      };
    }
  },
  {
    id: 26,
    categoryId: 'chronic',
    categoryName: 'Chronic Disease Pre-Checks',
    title: 'Gout & Uric Acid Flare Assessment',
    summary: 'Evaluates acute hyperuricemic joint attacks vs long-term urate lowering therapy.',
    fields: [
      { name: 'jointLocation', label: 'Joint experiencing acute pain', type: 'select', options: ['Big Toe (1st MTP Joint - Podagra)', 'Ankle / Knee', 'Finger / Wrist', 'No acute joint pain right now'] },
      { name: 'uricAcidLevel', label: 'Last known Serum Uric Acid level', type: 'text', placeholder: 'e.g. 8.2 mg/dL' },
      { name: 'allopurinolUse', label: 'Are you currently taking Allopurinol / Febuxostat daily?', type: 'select', options: ['Yes (Taking daily)', 'No (Only take pain meds during flares)'] }
    ],
    evaluate: (data) => {
      const uricVal = parseFloat(data.uricAcidLevel) || 6.0;
      const isUncontrolled = uricVal > 6.8 || (data.jointLocation !== 'No acute joint pain right now' && data.allopurinolUse === 'No (Only take pain meds during flares)');
      return {
        triage: isUncontrolled ? 'GOUT MANAGEMENT OPTIMIZATION NEEDED' : 'WELL-CONTROLLED URATE TARGET',
        triageClass: isUncontrolled ? 'warning' : 'success',
        impression: isUncontrolled ? 'Persistent hyperuricemia above monosodium urate crystallization threshold (6.0 mg/dL).' : 'Serum uric acid below saturation target.',
        redFlags: ['Tophaceous deposits (chalky lumps under skin)', 'Fever with joint redness (Rule out septic joint)'],
        doctorAdvice: 'Urate-lowering therapy must aim for target <6.0 mg/dL (<360 umol/L) to dissolve existing crystals.',
        labTests: ['Serum Uric Acid level', 'Renal function panel', 'Joint fluid polarising light microscopy'],
        questionsForDoctor: ['Should my Allopurinol dose be titrated up to lower my uric acid below 6.0 mg/dL?', 'Should I take prophylactic low-dose Colchicine while starting Allopurinol?'],
        medicationWarnings: 'Never stop or start Allopurinol during an acute flare without concomitant anti-inflammatory cover.'
      };
    }
  },
  {
    id: 27,
    categoryId: 'chronic',
    categoryName: 'Chronic Disease Pre-Checks',
    title: 'Heart Failure Fluid Retention & Weight Tracker',
    summary: 'Monitors congestive heart failure decompensation signs (New York Heart Association class).',
    fields: [
      { name: 'dailyWeightGain', label: 'Weight change over past 3 days', type: 'select', options: ['Gained > 2-3 lbs in 24h (or 5 lbs in a week)', 'Stable weight', 'Weight loss'] },
      { name: 'breathlessness', label: 'Breathlessness level', type: 'select', options: ['At rest', 'With minimal walking', 'Only on heavy exertion', 'None'] },
      { name: 'legEdema', label: 'Ankle / Leg Swelling', type: 'select', options: ['Pitting edema up to knees / thighs', 'Mild ankle edema', 'No swelling'] }
    ],
    evaluate: (data) => {
      const isDecompensating = data.dailyWeightGain.includes('Gained') || data.breathlessness === 'At rest' || data.legEdema.includes('up to knees');
      return {
        triage: isDecompensating ? 'ACUTE HEART FAILURE DECOMPENSATION ALERT' : 'STABLE NYHA HEART FAILURE',
        triageClass: isDecompensating ? 'danger' : 'success',
        impression: isDecompensating ? 'Systemic venous congestion and pulmonary edema risk requiring immediate diuretic adjustment.' : 'Euvolemic heart failure state.',
        redFlags: ['Inability to lie flat without severe suffocation', 'Rapid weight gain >3 lbs overnight'],
        doctorAdvice: isDecompensating ? 'Contact your cardiologist or heart failure clinic today. Diuretic dose (Furosemide) elevation may be needed.' : 'Maintain strict fluid (<2L/day) and sodium (<2g/day) restriction.',
        labTests: ['NT-proBNP / BNP', 'Serum Electrolytes (Sodium, Potassium)', 'Serum Creatinine', 'Echocardiogram (EF assessment)'],
        questionsForDoctor: ['Does my diuretic dose need a temporary adjustment?', 'Am I on all 4 pillars of heart failure therapy (ARNI, Beta-blocker, MRA, SGLT2i)?'],
        medicationWarnings: 'Avoid NSAIDs completely as they induce sodium retention and exacerbate heart failure.'
      };
    }
  },
  {
    id: 28,
    categoryId: 'chronic',
    categoryName: 'Chronic Disease Pre-Checks',
    title: 'GERD & Acid Reflux Medication Pre-Check',
    summary: 'Evaluates long-term Proton Pump Inhibitor (PPI) safety and esophageal dysplasia red flags.',
    fields: [
      { name: 'ppiDuration', label: 'PPI Usage Duration (Omeprazole / Pantoprazole / Esomeprazole)', type: 'select', options: ['Under 8 weeks', '6 months to 2 years', 'Over 2 years continuous'] },
      { name: 'dysphagia', label: 'Difficulty or pain when swallowing food (Dysphagia)?', type: 'select', options: ['Yes (Food feels stuck)', 'No'] },
      { name: 'refluxFrequency', label: 'Heartburn frequency', type: 'select', options: ['Daily', '2-3 times/week', 'Occasional'] }
    ],
    evaluate: (data) => {
      const isAlarm = data.dysphagia === 'Yes';
      const isLongTermPPI = data.ppiDuration === 'Over 2 years continuous';
      return {
        triage: isAlarm ? 'URGENT ENDOSCOPY WORKUP INDICATED' : isLongTermPPI ? 'PPI STEP-DOWN / NUTRIENT REVIEW' : 'STANDARD REFLUX CONTROL',
        triageClass: isAlarm ? 'danger' : isLongTermPPI ? 'warning' : 'success',
        impression: isAlarm ? 'Alarm symptom requiring exclusion of Esophageal Stricture or Adenocarcinoma.' : isLongTermPPI ? 'Long-term PPI risks include Magnesium/B12 deficiency, bone fractures, and C. diff.' : 'Uncomplicated Gastroesophageal Reflux.',
        redFlags: ['Dysphagia (difficulty swallowing)', 'Odynophagia (painful swallowing)', 'Persistent vomiting / anemia'],
        doctorAdvice: isAlarm ? 'Schedule urgent upper GI endoscopy (EGD).' : 'Discuss tapering to H2-blockers or lowest effective PPI dose.',
        labTests: ['Serum Magnesium & Vitamin B12', 'Bone Mineral Density (DEXA scan if prolonged PPI)', 'Upper Endoscopy (EGD)'],
        questionsForDoctor: ['Do I need an upper endoscopy to screen for Barrett’s Esophagus?', 'Can I step down my PPI dose to prevent micronutrient malabsorption?'],
        medicationWarnings: 'Abruptly stopping PPIs causes rebound acid hypersecretion. Taper down over 2-4 weeks.'
      };
    }
  },
  {
    id: 29,
    categoryId: 'chronic',
    categoryName: 'Chronic Disease Pre-Checks',
    title: 'Osteoporosis & Fracture Risk Pre-Check',
    summary: 'Evaluates FRAX bone fracture probability and Bisphosphonate drug safety.',
    fields: [
      { name: 'age', label: 'Age', type: 'text', placeholder: 'e.g. 68' },
      { name: 'pastFracture', label: 'History of fragility fracture after age 50?', type: 'select', options: ['Yes (Wrist, Spine, or Hip fracture from minor fall)', 'No'] },
      { name: 'bisphosphonateYears', label: 'Bisphosphonate Therapy Duration (Alendronate / Zoledronic acid)', type: 'select', options: ['None', '1 to 3 years', 'Over 5 years continuous'] }
    ],
    evaluate: (data) => {
      const isHighFractureRisk = data.pastFracture === 'Yes' || data.bisphosphonateYears === 'Over 5 years continuous';
      return {
        triage: isHighFractureRisk ? 'BONE DENSITY & DRUG HOLIDAY EVALUATION' : 'ROUTINE OSTEOPOROSIS SCREENING',
        triageClass: isHighFractureRisk ? 'warning' : 'info',
        impression: isHighFractureRisk ? 'High 10-year major osteoporotic fracture probability or risk of atypical femoral fracture / ONJ from prolonged bisphosphonates.' : 'Standard skeletal maintenance profile.',
        redFlags: ['Thigh / Groin dull aching pain (Pre-warning for atypical femoral fracture)', 'Jaw pain / non-healing dental extraction site'],
        doctorAdvice: 'Patients on bisphosphonates >5 years require a re-evaluation for a potential "drug holiday".',
        labTests: ['DEXA Bone Density Scan (T-score)', 'Serum 25-hydroxy Vitamin D', 'Serum Calcium & Alkaline Phosphatase'],
        questionsForDoctor: ['What is my DEXA T-score at the lumbar spine and femoral neck?', 'Should I pause my bisphosphonate pill after 5 years of treatment?'],
        medicationWarnings: 'Alendronate must be swallowed with a full glass of plain water while remaining upright for 30 minutes to prevent severe esophagitis.'
      };
    }
  },
  {
    id: 30,
    categoryId: 'chronic',
    categoryName: 'Chronic Disease Pre-Checks',
    title: 'Depressive & Anxiety Mood Tracker Pre-Doctor Review',
    summary: 'Screens PHQ-9 and GAD-7 clinical indicators for psychiatric consultation.',
    fields: [
      { name: 'phqScore', label: 'Little interest/pleasure or feeling down/hopeless over past 2 weeks?', type: 'select', options: ['Nearly every day', 'More than half the days', 'Several days', 'Not at all'] },
      { name: 'gadScore', label: 'Feeling nervous, anxious, or unable to stop worrying?', type: 'select', options: ['Nearly every day', 'More than half the days', 'Several days', 'Not at all'] },
      { name: 'selfHarm', label: 'Thoughts of self-harm or ending your life?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      if (data.selfHarm === 'Yes') {
        return {
          triage: 'CRITICAL MENTAL HEALTH RED FLAG',
          triageClass: 'danger',
          impression: 'Immediate crisis support and emergency psychological evaluation required.',
          redFlags: ['Active suicidal ideation or intent'],
          doctorAdvice: 'Call or text 988 Suicide & Crisis Lifeline immediately or proceed to the nearest Emergency Room.',
          labTests: ['TSH & Free T4 (Rule out thyroid depression)', 'Serum Vitamin B12 & D'],
          questionsForDoctor: ['What immediate crisis safety plan can we establish?'],
          medicationWarnings: 'SSRIs may temporarily increase agitation in the first 1-2 weeks of initialization.'
        };
      }
      const isModerateSevere = data.phqScore === 'Nearly every day' || data.gadScore === 'Nearly every day';
      return {
        triage: isModerateSevere ? 'PSYCHIATRIC / PSYCHOLOGY CONSULTATION RECOMMENDED' : 'MILD SYMPTOM MONITORING',
        triageClass: isModerateSevere ? 'warning' : 'success',
        impression: isModerateSevere ? 'Screening positive for Moderate-to-Severe Major Depressive Episode or Generalized Anxiety Disorder.' : 'Sub-clinical emotional distress.',
        redFlags: ['Inability to perform activities of daily living', 'Severe insomnia'],
        doctorAdvice: 'Complete a detailed PHQ-9 questionnaire to discuss with your primary care provider or therapist.',
        labTests: ['TSH, Vitamin D3, Vitamin B12, Complete Blood Count'],
        questionsForDoctor: ['Would Psychotherapy (CBT), Pharmacotherapy (SSRI/SNRI), or a combination be best for me?', 'What are the expected side effects during the initial 4 weeks of therapy?'],
        medicationWarnings: 'Never stop antidepressants abruptly due to severe SSRI Discontinuation Syndrome (brain zaps, vertigo, anxiety).'
      };
    }
  },

  // ==========================================
  // DOMAIN 4: SPECIALIZED ORGAN SYSTEMS (31 - 40)
  // ==========================================
  {
    id: 31,
    categoryId: 'organ_systems',
    categoryName: 'Specialized Organ Systems',
    title: 'Cardiovascular ASCVD 10-Year Risk Pre-Check',
    summary: 'Calculates atherosclerotic cardiovascular risk markers (Cholesterol, Smoking, BP).',
    fields: [
      { name: 'totalCholesterol', label: 'Total Cholesterol (mg/dL)', type: 'text', placeholder: 'e.g. 230' },
      { name: 'hdlCholesterol', label: 'HDL "Good" Cholesterol (mg/dL)', type: 'text', placeholder: 'e.g. 42' },
      { name: 'smoker', label: 'Current Cigarette Smoker?', type: 'select', options: ['Yes', 'No'] },
      { name: 'statinUser', label: 'Currently on Statin therapy (Atorvastatin/Rosuvastatin)?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const tc = parseInt(data.totalCholesterol) || 200;
      const hdl = parseInt(data.hdlCholesterol) || 50;
      const isHighASCVD = tc > 240 || hdl < 40 || (data.smoker === 'Yes' && data.statinUser === 'No');
      return {
        triage: isHighASCVD ? 'ASCVD RISK REDUCTION PROTOCOL INDICATED' : 'OPTIMAL LIPID PROFILE',
        triageClass: isHighASCVD ? 'warning' : 'success',
        impression: isHighASCVD ? 'Elevated 10-year risk for myocardial infarction or ischemic stroke.' : 'Low estimated cardiovascular disease burden.',
        redFlags: ['Xanthomas (fatty deposits under skin/eyelids)', 'Family history of premature heart attack <55 years'],
        doctorAdvice: 'Schedule lipid panel and calculate explicit Pooled Cohort Equation score.',
        labTests: ['Fasting Lipid Panel (TC, HDL, LDL, Triglycerides)', 'Apolipoprotein B (ApoB)', 'Lipoprotein(a) [Lp(a)]', 'Coronary Artery Calcium (CAC) Scan'],
        questionsForDoctor: ['Should I start a Moderate or High-Intensity Statin?', 'What is my target LDL-C level (<70 mg/dL)?'],
        medicationWarnings: 'Report unexplained muscle aches (Myalgia) after starting statins to your doctor.'
      };
    }
  },
  {
    id: 32,
    categoryId: 'organ_systems',
    categoryName: 'Specialized Organ Systems',
    title: 'Dermatological Lesion & Melanoma ABCDE Alert',
    summary: 'Screens skin moles and lesions for malignant melanoma red flags.',
    fields: [
      { name: 'asymmetry', label: 'Asymmetry: Is one half unlike the other half?', type: 'select', options: ['Yes', 'No'] },
      { name: 'border', label: 'Border: Irregular, scalloped, or poorly defined edges?', type: 'select', options: ['Yes', 'No'] },
      { name: 'color', label: 'Color: Varied shades of brown, black, red, or white?', type: 'select', options: ['Yes', 'No'] },
      { name: 'diameterEvolution', label: 'Diameter > 6mm OR Evolving in size/shape/bleeding?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const positiveABCDE = [data.asymmetry, data.border, data.color, data.diameterEvolution].filter(x => x === 'Yes').length;
      return {
        triage: positiveABCDE >= 2 ? 'URGENT DERMATOLOGY BIOPSY EVALUATION' : 'ROUTINE MOLE MONITORING',
        triageClass: positiveABCDE >= 2 ? 'danger' : 'info',
        impression: positiveABCDE >= 2 ? 'High clinical suspicion for Dysplastic Nevus or Cutaneous Malignant Melanoma.' : 'Benign pigmented nevus.',
        redFlags: ['Rapidly growing black lesion', 'Spontaneous bleeding or ulceration of mole'],
        doctorAdvice: positiveABCDE >= 2 ? 'Schedule a Dermatologist visit promptly for Dermoscopy and Excisional Biopsy.' : 'Perform monthly self-skin exams using the ABCDE guide.',
        labTests: ['Dermoscopic Examination', 'Full-Thickness Excisional Skin Biopsy', 'Histopathology'],
        questionsForDoctor: ['Does this lesion require dermoscopic evaluation or excisional biopsy?', 'Should I undergo a full-body total skin exam?'],
        medicationWarnings: 'Do not attempt to scratch, freeze, or chemically burn moles off at home.'
      };
    }
  },
  {
    id: 33,
    categoryId: 'organ_systems',
    categoryName: 'Specialized Organ Systems',
    title: 'Gastrointestinal Bowel Habit Change & IBD Check',
    summary: 'Screens chronic diarrhea, constipation, and Inflammatory Bowel Disease (Crohn’s/UC).',
    fields: [
      { name: 'habitChange', label: 'Primary Bowel Change', type: 'select', options: ['Chronic watery diarrhea (>4 weeks)', 'Severe chronic constipation', 'Alternating diarrhea and constipation', 'Normal'] },
      { name: 'bloodInStool', label: 'Visible blood or mucus in stool?', type: 'select', options: ['Yes (Bright red or dark maroon blood)', 'No'] },
      { name: 'nocturnalDiarrhea', label: 'Waking up from sleep to pass stool?', type: 'select', options: ['Yes (Nocturnal bowel movements)', 'No'] }
    ],
    evaluate: (data) => {
      const isIBD = data.bloodInStool.includes('Yes') || data.nocturnalDiarrhea === 'Yes';
      return {
        triage: isIBD ? 'URGENT GASTROENTEROLOGY WORKUP' : 'FUNCTIONAL GI CONSULTATION',
        triageClass: isIBD ? 'danger' : 'warning',
        impression: isIBD ? 'High suspicion for Inflammatory Bowel Disease (Ulcerative Colitis / Crohn’s) or GI Bleed.' : 'Likely Irritable Bowel Syndrome (IBS-D / IBS-C) or Dietary Intolerance.',
        redFlags: ['Hematochezia (blood in stool)', 'Nocturnal diarrhea waking patient', 'Unexplained fever and weight loss'],
        doctorAdvice: isIBD ? 'Schedule GI specialist visit for Colonoscopy.' : 'Try a 2-week Low-FODMAP diet trial.',
        labTests: ['Fecal Calprotectin', 'Stool Routine, Culture, & Ova/Parasites', 'Colonoscopy with Ileal Biopsies', 'Complete Blood Count & ESR'],
        questionsForDoctor: ['Should we test Fecal Calprotectin to differentiate IBD from IBS?', 'Do I require a diagnostic colonoscopy?'],
        medicationWarnings: 'Avoid overuse of Loperamide (Imodium) if infectious or inflammatory colitis is suspected.'
      };
    }
  },
  {
    id: 34,
    categoryId: 'organ_systems',
    categoryName: 'Specialized Organ Systems',
    title: 'Ophthalmological Red Eye & Vision Alert Check',
    summary: 'Differentiates viral conjunctivitis from acute angle-closure glaucoma and keratitis.',
    fields: [
      { name: 'painSeverity', label: 'Eye Pain Level', type: 'select', options: ['Severe deep aching ocular pain', 'Mild gritty discomfort / itching', 'No pain'] },
      { name: 'visionChange', label: 'Vision Changes', type: 'select', options: ['Sudden blurry vision / Halos around lights', 'Normal vision'] },
      { name: 'pupilAppearance', label: 'Pupil reaction', type: 'select', options: ['Fixed mid-dilated pupil', 'Normal responsive pupil'] }
    ],
    evaluate: (data) => {
      const isGlaucoma = data.painSeverity.includes('Severe deep') || data.visionChange.includes('Halos') || data.pupilAppearance.includes('Fixed mid-dilated');
      return {
        triage: isGlaucoma ? 'EMERGENCY OPHTHALMOLOGY RED FLAG' : 'ROUTINE OPHTHALMIC EVALUATION',
        triageClass: isGlaucoma ? 'danger' : 'success',
        impression: isGlaucoma ? 'High risk of Acute Angle-Closure Glaucoma or Corneal Ulcer (Risk of irreversible blindness).' : 'Likely Allergic or Viral Conjunctivitis.',
        redFlags: ['Severe eye pain with headache & nausea', 'Halos around light sources', 'Corneal cloudiness'],
        doctorAdvice: isGlaucoma ? 'Proceed immediately to an Eye ER or Ophthalmologist for Intraocular Pressure (IOP) reduction.' : 'Use preservative-free artificial tears and warm compresses.',
        labTests: ['Tonometry (Intraocular Pressure measurement)', 'Slit-Lamp Fluorescein Examination', 'Gonioscopy'],
        questionsForDoctor: ['What is my intraocular pressure reading in both eyes?', 'Is this pink eye contagious or allergic?'],
        medicationWarnings: 'NEVER use topical steroid eye drops without slit-lamp confirmation by an eye specialist (Risk of fungal keratitis / glaucoma).'
      };
    }
  },
  {
    id: 35,
    categoryId: 'organ_systems',
    categoryName: 'Specialized Organ Systems',
    title: 'ENT Recurrent Sinusitis & Otitis Review',
    summary: 'Assesses chronic rhinosinusitis with nasal polyps vs acute bacterial infection.',
    fields: [
      { name: 'sinusDuration', label: 'Sinus Congestion Duration', type: 'select', options: ['Under 10 days', 'Double sickening (Worse after 5 days of improvement)', 'Greater than 12 weeks'] },
      { name: 'discharge', label: 'Nasal Discharge & Facial Pressure', type: 'select', options: ['Thick purulent green/yellow with facial pain', 'Clear watery discharge', 'None'] },
      { name: 'smellLoss', label: 'Loss of smell (Anosmia) or nasal blockage?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isBacterialOrChronic = data.sinusDuration === 'Double sickening (Worse after 5 days of improvement)' || data.sinusDuration === 'Greater than 12 weeks';
      return {
        triage: isBacterialOrChronic ? 'ENT SPECIALIST / ANTIBIOTIC EVALUATION' : 'SUPPORTIVE VIRAL CARE',
        triageClass: isBacterialOrChronic ? 'warning' : 'info',
        impression: isBacterialOrChronic ? 'Acute Bacterial Rhinosinusitis or Chronic Rhinosinusitis with Nasal Polyposis.' : 'Viral Upper Respiratory Tract Infection (Common Cold).',
        redFlags: ['Periorbital swelling or redness around eye', 'Severe frontal headache with fever'],
        doctorAdvice: 'Use isotonic saline nasal rinses twice daily to improve mucociliary clearance.',
        labTests: ['CT Scan of Paranasal Sinuses (Non-contrast)', 'Nasal Endoscopy', 'Allergy Skin Prick Panel'],
        questionsForDoctor: ['Do I require an intranasal corticosteroid spray (Mometasone/Fluticasone)?', 'Are nasal polyps obstructing my sinus drainage pathways?'],
        medicationWarnings: 'Do not use OTC topical decongestant sprays (Oxymetazoline) for >3-5 consecutive days to avoid Rhinitis Medicamentosa.'
      };
    }
  },
  {
    id: 36,
    categoryId: 'organ_systems',
    categoryName: 'Specialized Organ Systems',
    title: 'Urological Dysuria & Prostate Symptom Check',
    summary: 'Calculates International Prostate Symptom Score (IPSS) and UTI indicators.',
    fields: [
      { name: 'dysuria', label: 'Burning pain during urination (Dysuria)?', type: 'select', options: ['Yes', 'No'] },
      { name: 'hesitancy', label: 'Weak stream, hesitancy, or nocturnal urination (Nocturia 2+ times)?', type: 'select', options: ['Yes (Multiple symptoms)', 'No'] },
      { name: 'feverFlank', label: 'High fever or back / flank pain?', type: 'select', options: ['Yes (Flank pain present)', 'No'] }
    ],
    evaluate: (data) => {
      const isPyelonephritis = data.dysuria === 'Yes' && data.feverFlank.includes('Yes');
      const isBPH = data.hesitancy.includes('Yes');
      return {
        triage: isPyelonephritis ? 'URGENT PYELONEPHRITIS / SEPSIS RISK' : isBPH ? 'UROLOGICAL BPH CONSULTATION' : 'ROUTINE UTI EVALUATION',
        triageClass: isPyelonephritis ? 'danger' : isBPH ? 'warning' : 'info',
        impression: isPyelonephritis ? 'Complicated UTI / Upper Tract Pyelonephritis requiring prompt antimicrobial therapy.' : isBPH ? 'Benign Prostatic Hyperplasia (BPH) bladder outlet obstruction.' : 'Uncomplicated Lower UTI (Cystitis).',
        redFlags: ['Costovertebral angle (CVA) tenderness / Flank pain', 'Inability to pass urine (Acute Urinary Retention)'],
        doctorAdvice: isPyelonephritis ? 'Seek urgent outpatient or ER care for urine culture and IV/oral antibiotics.' : 'Limit nighttime fluid intake after 8 PM.',
        labTests: ['Urinalysis with Microscopy & Urine Culture', 'Prostate-Specific Antigen (PSA)', 'Renal & Bladder Ultrasound with Post-Void Residual (PVR)'],
        questionsForDoctor: ['Would an Alpha-1 Blocker (Tamsulosin) or 5-Alpha Reductase Inhibitor (Finasteride) relieve my symptoms?', 'Do I need a urine culture before starting antibiotics?'],
        medicationWarnings: 'Anticholinergic medications can trigger acute urinary retention in patients with enlarged prostates.'
      };
    }
  },
  {
    id: 37,
    categoryId: 'organ_systems',
    categoryName: 'Specialized Organ Systems',
    title: 'Neurological Tremor & Movement Pre-Check',
    summary: 'Distinguishes Essential Tremor (Action) from Parkinsonian Resting Tremor.',
    fields: [
      { name: 'tremorType', label: 'When does the tremor occur?', type: 'select', options: ['When hands are resting in lap (Resting Tremor)', 'When writing, holding a cup, or reaching for objects (Action/Intention Tremor)', 'Only when feeling anxious'] },
      { name: 'asymmetry', label: 'Is the tremor asymmetrical (one side worse than the other)?', type: 'select', options: ['Yes', 'No'] },
      { name: 'otherSigns', label: 'Associated movement symptoms', type: 'multiselect', options: ['Slowness of movement (Bradykinesia)', 'Stiff muscles (Rigidity)', 'Balance trouble / Frequent falls', 'None'] }
    ],
    evaluate: (data) => {
      const isParkinsonism = data.tremorType.includes('Resting') || (data.otherSigns && data.otherSigns.includes('Slowness of movement (Bradykinesia)'));
      return {
        triage: isParkinsonism ? 'NEUROLOGY MOVEMENT DISORDER CONSULT' : 'STANDARD EVALUATION',
        triageClass: isParkinsonism ? 'warning' : 'info',
        impression: isParkinsonism ? 'Clinical features suggestive of Parkinson’s Disease or Parkinsonism syndrome.' : 'Likely Essential Tremor or Enhanced Physiological Tremor.',
        redFlags: ['Rapidly progressive postural instability / falls', 'Early dementia or autonomic dysfunction'],
        doctorAdvice: 'Record a 30-second video of your hands at rest and while holding a sheet of paper to show your neurologist.',
        labTests: ['DaTscan (Dopamine Transporter SPECT Imaging)', 'Serum TSH & Ceruloplasmin (Rule out Wilson’s disease)', 'Brain MRI'],
        questionsForDoctor: ['Is my tremor an Essential Tremor or Parkinsonian resting tremor?', 'Would a trial of Propranolol, Primidone, or Levodopa be appropriate?'],
        medicationWarnings: 'Certain anti-nausea pills (Metoclopramide) and antipsychotics can induce Drug-Induced Parkinsonism.'
      };
    }
  },
  {
    id: 38,
    categoryId: 'organ_systems',
    categoryName: 'Specialized Organ Systems',
    title: 'Allergic Rhinitis & Anaphylaxis Risk Evaluator',
    summary: 'Evaluates seasonal allergy severity vs systemic IgE-mediated anaphylaxis threats.',
    fields: [
      { name: 'allergySymptoms', label: 'Current Allergy Symptoms', type: 'multiselect', options: ['Sneezing / Itchy Nose', 'Watery Eyes', 'Hives / Urticaria (Itchy red wheals)', 'Lip / Tongue swelling', 'Wheezing / Throat tightness', 'None'] }
    ],
    evaluate: (data) => {
      const isAnaphylaxis = data.allergySymptoms && (data.allergySymptoms.includes('Lip / Tongue swelling') || data.allergySymptoms.includes('Wheezing / Throat tightness'));
      return {
        triage: isAnaphylaxis ? 'CRITICAL ANAPHYLAXIS RED FLAG' : 'ROUTINE ALLERGY CARE',
        triageClass: isAnaphylaxis ? 'danger' : 'success',
        impression: isAnaphylaxis ? 'Acute systemic IgE-mediated Anaphylactic Shock hazard.' : 'Seasonal or Perennial Allergic Rhinitis.',
        redFlags: ['Airway compromise / Stridor / Swollen tongue', 'Drop in blood pressure / Dizziness'],
        doctorAdvice: isAnaphylaxis ? 'Administer Auto-Injectable Epinephrine (EpiPen) immediately and call 911.' : 'Use non-sedating 2nd generation antihistamines (Cetirizine/Loratadine).',
        labTests: ['Serum Tryptase (Post-anaphylaxis)', 'Specific IgE Blood Test (RAST)', 'Skin Prick Allergy Panel'],
        questionsForDoctor: ['Do I need a prescription for an Epinephrine Auto-Injector (EpiPen)?', 'Am I a candidate for Allergy Immunotherapy (Sublingual / Injections)?'],
        medicationWarnings: 'First-generation antihistamines (Diphenhydramine) cause cognitive impairment and drowsiness; 2nd gen is preferred.'
      };
    }
  },
  {
    id: 39,
    categoryId: 'organ_systems',
    categoryName: 'Specialized Organ Systems',
    title: 'Hematological Easy Bruising & Bleeding Screen',
    summary: 'Evaluates vascular fragility vs severe thrombocytopenia or coagulopathy.',
    fields: [
      { name: 'bruiseSize', label: 'Bruise Appearance', type: 'select', options: ['Large unexplained hematomas (>5 cm)', 'Tiny pinpoint red spots (Petechiae)', 'Small scattered bruises on limbs', 'Normal after minor bumps'] },
      { name: 'bleedingSites', label: 'Multiple active bleeding sites?', type: 'select', options: ['Yes (Nosebleeds + Gum bleeding + Heavy periods)', 'No'] },
      { name: 'familyHistory', label: 'Family history of bleeding disorders (Hemophilia / von Willebrand)?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isSevereCoagulopathy = data.bruiseSize.includes('Petechiae') || data.bruiseSize.includes('Large unexplained') || data.bleedingSites.includes('Yes');
      return {
        triage: isSevereCoagulopathy ? 'URGENT HEMATOLOGY EVALUATION' : 'ROUTINE BLOOD SCREEN',
        triageClass: isSevereCoagulopathy ? 'danger' : 'info',
        impression: isSevereCoagulopathy ? 'Suspected Thrombocytopenia (ITP), Platelet Dysfunction, or Coagulation Factor Deficiency.' : 'Senile purpura or capillary fragility.',
        redFlags: ['Petechiae rash (non-blanching pinpoint dots)', 'Spontaneous intracranial or joint hemorrhage'],
        doctorAdvice: 'Avoid contact sports and discontinue all elective antiplatelet supplements until blood tests are reviewed.',
        labTests: ['Complete Blood Count with Peripheral Blood Smear', 'Prothrombin Time (PT) & Activated Partial Thromboplastin Time (aPTT)', 'von Willebrand Factor Antigen', 'Fibrinogen'],
        questionsForDoctor: ['What is my absolute platelet count?', 'Should we test for von Willebrand Disease or underlying autoimmune thrombocytopenia?'],
        medicationWarnings: 'Avoid Aspirin and NSAIDs entirely when platelet counts are low (<50,000/uL).'
      };
    }
  },
  {
    id: 40,
    categoryId: 'organ_systems',
    categoryName: 'Specialized Organ Systems',
    title: 'Endocrine Metabolic Syndrome Screen',
    summary: 'Assesses insulin resistance criteria (Waist circumference, Triglycerides, HDL, BP).',
    fields: [
      { name: 'waist', label: 'Waist Circumference', type: 'select', options: ['Men > 40 inches (102 cm) / Women > 35 inches (88 cm)', 'Below threshold'] },
      { name: 'bpStatus', label: 'Blood Pressure > 130/85 or on BP medication?', type: 'select', options: ['Yes', 'No'] },
      { name: 'triglycerides', label: 'Fasting Triglycerides > 150 mg/dL OR Glucose > 100 mg/dL?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const criteriaCount = [data.waist.includes('Men > 40'), data.bpStatus === 'Yes', data.triglycerides === 'Yes'].filter(Boolean).length;
      return {
        triage: criteriaCount >= 2 ? 'METABOLIC SYNDROME INTERVENTION' : 'LOW METABOLIC RISK',
        triageClass: criteriaCount >= 2 ? 'warning' : 'success',
        impression: criteriaCount >= 2 ? 'Meets clinical criteria for Metabolic Syndrome (5x increased Type 2 Diabetes risk & 2x CVD risk).' : 'Healthy cardiometabolic parameters.',
        redFlags: ['Acanthosis Nigricans (darkened velvety skin patches on neck/axilla indicating severe hyperinsulinemia)'],
        doctorAdvice: 'Adopt a Mediterranean-style whole-food diet and aim for 150 minutes of weekly moderate aerobic exercise.',
        labTests: ['Fasting Plasma Glucose & Fasting Insulin (HOMA-IR)', 'Comprehensive Lipid Profile', 'HbA1c', 'High-Sensitivity CRP'],
        questionsForDoctor: ['Am I in a pre-diabetic state?', 'Would Metformin or a GLP-1 medication help reverse my metabolic parameters?'],
        medicationWarnings: 'Lifestyle modification is the primary therapeutic backbone for metabolic syndrome reversal.'
      };
    }
  },

  // ==========================================
  // DOMAIN 5: LAB & DIAGNOSTIC READINESS (41 - 50)
  // ==========================================
  {
    id: 41,
    categoryId: 'labs',
    categoryName: 'Lab & Diagnostic Readiness',
    title: 'Fasting Blood Sugar & Lipid Profile Prep',
    summary: 'Guidelines on 10-12 hour fasting protocol, hydration, and medication timing.',
    fields: [
      { name: 'fastingHours', label: 'Hours Fasted So Far', type: 'select', options: ['Under 8 hours', '8 to 12 hours (Optimal)', 'Over 14 hours (Excessive)'] },
      { name: 'waterIntake', label: 'Did you drink plain water during fast?', type: 'select', options: ['Yes (Plain water allowed)', 'No (Avoided all liquids)'] },
      { name: 'blackCoffee', label: 'Consumed coffee, tea, or creamers?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isInvalid = data.fastingHours === 'Under 8 hours' || data.blackCoffee === 'Yes';
      return {
        triage: isInvalid ? 'RE-SCHEDULE LAB FAST PROTOCOL' : 'READY FOR VENIPUNCTURE',
        triageClass: isInvalid ? 'warning' : 'success',
        impression: isInvalid ? 'Recent caloric or caffeine ingestion will artificially elevate Triglycerides and Glucose readings.' : 'Proper fasting compliance achieved.',
        redFlags: ['Dizziness or severe hypoglycemia while fasting'],
        doctorAdvice: 'Plain unflavored water is encouraged while fasting to keep veins hydrated for easier phlebotomy.',
        labTests: ['Fasting Blood Glucose', 'Lipid Panel (Total Cholesterol, HDL, LDL, Triglycerides)'],
        questionsForDoctor: ['Should I take my morning chronic blood pressure medication before drawing blood?'],
        medicationWarnings: 'Diabetic medications (Insulin/Sulfonylureas) should usually be delayed until AFTER blood is drawn and meal is eaten.'
      };
    }
  },
  {
    id: 42,
    categoryId: 'labs',
    categoryName: 'Lab & Diagnostic Readiness',
    title: 'Liver Function Test (LFT) Symptom Pre-Check',
    summary: 'Interprets elevated ALT, AST, Alkaline Phosphatase, & Bilirubin enzyme patterns.',
    fields: [
      { name: 'altAst', label: 'ALT / AST Elevation Ratio (if known)', type: 'select', options: ['ALT higher than AST (Hepatocellular pattern)', 'AST > 2x ALT (Alcoholic / Toxic pattern)', 'Alkaline Phosphatase dominant (Cholestatic pattern)', 'Unsure / Pending'] },
      { name: 'jaundice', label: 'Yellow eyes/skin or dark urine?', type: 'select', options: ['Yes', 'No'] },
      { name: 'supplements', label: 'Taking herbal supplements (Kava, Kratom, High-dose Vit A)?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isJaundice = data.jaundice === 'Yes' || data.supplements === 'Yes';
      return {
        triage: isJaundice ? 'HEPATOLOGY CLINICAL EVALUATION' : 'ROUTINE LFT INTERPRETATION',
        triageClass: isJaundice ? 'danger' : 'info',
        impression: isJaundice ? 'Acute liver inflammation or biliary obstruction requiring detailed diagnostic workup.' : 'Mild asymptomatic transaminitis.',
        redFlags: ['Jaundice', 'Abdominal ascites', 'Encephalopathy / Confusion'],
        doctorAdvice: 'Discontinue all non-essential herbal products immediately prior to re-testing.',
        labTests: ['Repeated LFTs', 'Viral Hepatitis Panel (Hep A, B, C)', 'Abdominal Ultrasound (Liver & Gallbladder)', 'Gamma-Glutamyl Transferase (GGT)'],
        questionsForDoctor: ['Is my liver enzyme elevation hepatocellular or cholestatic in nature?', 'Do I need an abdominal ultrasound to check for fatty liver or gallstones?'],
        medicationWarnings: 'Avoid consuming alcohol for at least 48 hours prior to liver enzyme blood testing.'
      };
    }
  },
  {
    id: 43,
    categoryId: 'labs',
    categoryName: 'Lab & Diagnostic Readiness',
    title: 'Kidney Function (BUN/Creatinine) Readiness',
    summary: 'Interprets Blood Urea Nitrogen to Creatinine ratio and hydration status.',
    fields: [
      { name: 'creatinineValue', label: 'Serum Creatinine Level (mg/dL)', type: 'text', placeholder: 'e.g. 1.4' },
      { name: 'bunRatio', label: 'BUN / Creatinine Ratio (if known)', type: 'select', options: ['> 20:1 (Prerenal Azotemia / Dehydration)', '10-15:1 (Intrinsic Renal)', 'Unsure'] },
      { name: 'supplements', label: 'Taking Creatine powder or heavy protein supplements?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const creat = parseFloat(data.creatinineValue) || 0.9;
      const isElevated = creat > 1.3 || data.bunRatio.includes('> 20:1');
      return {
        triage: isElevated ? 'RENAL WORKUP / HYDRATION REVIEW' : 'NORMAL KIDNEY MARKERS',
        triageClass: isElevated ? 'warning' : 'success',
        impression: isElevated ? 'Potential prerenal dehydration or nephron filtration reduction.' : 'Healthy renal clearance.',
        redFlags: ['Anuria (no urine production for 12 hours)', 'Severe peripheral edema'],
        doctorAdvice: 'High intake of Creatine body-building supplements can falsely elevate serum creatinine readings without true kidney damage.',
        labTests: ['Repeat Serum Creatinine & BUN', 'Cystatin C (More accurate GFR marker)', '24-Hour Urine Creatinine Clearance'],
        questionsForDoctor: ['Is my elevated creatinine due to dehydration or true kidney nephron loss?', 'Would a Cystatin C test provide a more accurate GFR?'],
        medicationWarnings: 'Ensure adequate hydration prior to blood draws.'
      };
    }
  },
  {
    id: 44,
    categoryId: 'labs',
    categoryName: 'Lab & Diagnostic Readiness',
    title: 'Complete Blood Count (CBC) Infection Pre-Check',
    summary: 'Decodes White Blood Cell count (Leukocytosis vs Leukopenia) and differential.',
    fields: [
      { name: 'wbcCount', label: 'Total WBC Count (x10^3/uL)', type: 'text', placeholder: 'e.g. 14.5' },
      { name: 'differential', label: 'Primary Elevated Cell Type (if known)', type: 'select', options: ['High Neutrophils (Bacterial pattern)', 'High Lymphocytes (Viral pattern)', 'High Eosinophils (Allergy / Parasite pattern)', 'Low WBC / Leukopenia', 'Unsure'] },
      { name: 'fever', label: 'Fever or infection symptoms present?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const wbc = parseFloat(data.wbcCount) || 7.0;
      const isHigh = wbc > 11.0 || wbc < 4.0;
      return {
        triage: isHigh ? 'CLINICAL INFECTION / IMMUNE EVALUATION' : 'NORMAL BLOOD COUNT',
        triageClass: isHigh ? 'warning' : 'success',
        impression: isHigh ? 'Active inflammatory, infectious, or bone marrow leukocytic response.' : 'Physiological leukocyte range.',
        redFlags: ['WBC > 30.0 or WBC < 1.0 (Febrile Neutropenia alert)', 'Presence of Immature Blasts on smear'],
        doctorAdvice: 'A CBC must always be correlated with physical clinical examination.',
        labTests: ['CBC with Differential', 'Peripheral Blood Smear', 'C-Reactive Protein (CRP)'],
        questionsForDoctor: ['Does my neutrophil count indicate a bacterial infection requiring antibiotics?', 'Do I need a repeat CBC after infection recovery?'],
        medicationWarnings: 'Corticosteroids cause demargination of neutrophils, raising WBC counts without active infection.'
      };
    }
  },
  {
    id: 45,
    categoryId: 'labs',
    categoryName: 'Lab & Diagnostic Readiness',
    title: 'Thyroid Panel (TSH, FT4, FT3) Pre-Consult Guide',
    summary: 'Pre-test preparation and interference check (Biotin supplement warning).',
    fields: [
      { name: 'biotinUse', label: 'Taking Biotin (Vitamin B7 / Hair & Nail supplements)?', type: 'select', options: ['Yes (Taken in past 3-5 days)', 'No'] },
      { name: 'timeOfDraw', label: 'Scheduled blood draw time', type: 'select', options: ['Early Morning (8 AM - 10 AM)', 'Afternoon / Evening'] }
    ],
    evaluate: (data) => {
      const isBiotinInterference = data.biotinUse.includes('Yes');
      return {
        triage: isBiotinInterference ? 'PAUSE BIOTIN 3 DAYS BEFORE BLOOD TEST' : 'READY FOR THYROID PANEL',
        triageClass: isBiotinInterference ? 'danger' : 'success',
        impression: isBiotinInterference ? 'Biotin causes severe immuno-assay interference, falsely mirroring Graves Disease (Low TSH, High FT4).' : 'Valid thyroid assay condition.',
        redFlags: ['Severe cardiac palpitations during thyroid testing'],
        doctorAdvice: 'Stop taking all Biotin-containing supplements (>1 mg/day) for at least 72 hours before drawing thyroid blood tests.',
        labTests: ['TSH', 'Free T4', 'Free T3', 'Thyroid Peroxidase (TPO) Antibodies'],
        questionsForDoctor: ['Could my supplement regimen have distorted my recent thyroid lab numbers?', 'What is my exact TSH value?'],
        medicationWarnings: 'TSH exhibits diurnal variation; early morning blood draws are most consistent.'
      };
    }
  },
  {
    id: 46,
    categoryId: 'labs',
    categoryName: 'Lab & Diagnostic Readiness',
    title: 'Vitamin D & B12 Deficiency Pre-Check',
    summary: 'Evaluates neurological and bone symptoms associated with low 25-OH Vit D & B12.',
    fields: [
      { name: 'b12Level', label: 'Serum B12 (pg/mL if known)', type: 'text', placeholder: 'e.g. 180' },
      { name: 'vitDLevel', label: 'Serum 25-OH Vitamin D (ng/mL if known)', type: 'text', placeholder: 'e.g. 16' },
      { name: 'symptoms', label: 'Symptoms experienced', type: 'multiselect', options: ['Pins & needles in feet (Paresthesia)', 'Memory fog', 'Bone / Muscle pain', 'None'] }
    ],
    evaluate: (data) => {
      const b12 = parseFloat(data.b12Level) || 400;
      const vitD = parseFloat(data.vitDLevel) || 35;
      const isDeficient = b12 < 200 || vitD < 20 || (data.symptoms && data.symptoms.includes('Pins & needles in feet (Paresthesia)'));
      return {
        triage: isDeficient ? 'MICRONUTRIENT REPLACEMENT INDICATED' : 'ADEQUATE VITAMIN STORES',
        triageClass: isDeficient ? 'warning' : 'success',
        impression: isDeficient ? 'Deficiency detected; risk of Subacute Combined Degeneration of Spinal Cord (B12) or Osteomalacia (Vit D).' : 'Optimal vitamin levels.',
        redFlags: ['Ataxic gait / difficulty walking', 'Severe megaloblastic anemia'],
        doctorAdvice: 'Vitamin B12 absorption requires Intrinsic Factor; patients on Metformin or PPIs have reduced B12 absorption.',
        labTests: ['Serum 25-Hydroxy Vitamin D', 'Serum B12', 'Methylmalonic Acid (MMA - sensitive B12 marker)', 'Homocysteine'],
        questionsForDoctor: ['Do I need therapeutic Ergocalciferol (50,000 IU Vit D) or B12 Intramuscular injections?', 'Should we test Methylmalonic Acid to confirm borderline B12 deficiency?'],
        medicationWarnings: 'Long-term PPI acid suppression inhibits dietary B12 cleavage from proteins.'
      };
    }
  },
  {
    id: 47,
    categoryId: 'labs',
    categoryName: 'Lab & Diagnostic Readiness',
    title: 'Cardiac Biomarker & ECG Preparation',
    summary: 'Pre-procedure protocol for stress testing, ECG, and Troponin evaluations.',
    fields: [
      { name: 'testType', label: 'Type of Cardiac Diagnostic', type: 'select', options: ['Exercise Stress Test (Treadmill)', 'Echocardiogram', 'Holter Monitor (24-48h)', 'Coronary CT Angiography'] },
      { name: 'caffeineStatus', label: 'Have you avoided caffeine for 24h (if stress test)?', type: 'select', options: ['Yes', 'No', 'Not a stress test'] }
    ],
    evaluate: (data) => {
      const isCaffeineConflict = data.testType.includes('Stress Test') && data.caffeineStatus === 'No';
      return {
        triage: isCaffeineConflict ? 'CANCEL CAFFEINE BEFORE STRESS TEST' : 'CARDIOVASCULAR DIAGNOSTIC READY',
        triageClass: isCaffeineConflict ? 'danger' : 'success',
        impression: isCaffeineConflict ? 'Caffeine blocks Adenosine receptors, invalidating Pharmacological / Exercise Stress Tests.' : 'Proper diagnostic preparation.',
        redFlags: ['Acute chest pain while preparing for stress test'],
        doctorAdvice: 'Avoid caffeine, chocolate, and decaf coffee for 24 hours prior to Adenosine / Regadenoson stress imaging.',
        labTests: ['12-Lead ECG', 'Treadmill Stress Echo', 'Nuclear Myocardial Perfusion Imaging'],
        questionsForDoctor: ['Should I hold my Beta-blocker medication on the morning of my exercise stress test?', 'What clothing and shoes should I wear?'],
        medicationWarnings: 'Beta-blockers prevent reaching target heart rate during treadmill testing.'
      };
    }
  },
  {
    id: 48,
    categoryId: 'labs',
    categoryName: 'Lab & Diagnostic Readiness',
    title: 'Urine Routine & Microscopic Sample Protocol',
    summary: 'Instructions for midstream clean-catch urine specimen collection.',
    fields: [
      { name: 'technique', label: 'Sample collection method', type: 'select', options: ['Midstream clean-catch (Discard first stream, collect middle)', 'First stream collected', 'Uncleansed specimen'] },
      { name: 'timeToLab', label: 'Time from collection to lab processing', type: 'select', options: ['Under 1 hour (or refrigerated)', 'Over 2 hours at room temperature'] }
    ],
    evaluate: (data) => {
      const isContaminated = data.technique !== 'Midstream clean-catch (Discard first stream, collect middle)' || data.timeToLab.includes('Over 2 hours');
      return {
        triage: isContaminated ? 'RE-COLLECT URINE CLEAN CATCH SAMPLE' : 'VALID URINE SPECIMEN',
        triageClass: isContaminated ? 'warning' : 'success',
        impression: isContaminated ? 'High risk of squamous epithelial cell contamination or bacterial overgrowth giving false positive UTI results.' : 'High-fidelity urine specimen.',
        redFlags: ['Gross hematuria (visible blood clots in urine)'],
        doctorAdvice: 'Always cleanse urethral meatus with antiseptic wipe, discard initial 10-20 mL of urine, and collect midstream.',
        labTests: ['Urinalysis Dipstick', 'Urine Microscopy (WBC, RBC, Casts)', 'Urine Culture & Sensitivity'],
        questionsForDoctor: ['Does my urine show epithelial contamination requiring a repeat sample?', 'Are nitrites and leukocyte esterase positive?'],
        medicationWarnings: 'Phenazopyridine (Pyridium) turns urine bright orange and distorts colorimetric dipstick testing.'
      };
    }
  },
  {
    id: 49,
    categoryId: 'labs',
    categoryName: 'Lab & Diagnostic Readiness',
    title: 'Stool Occult Blood & Endoscopy Prep Protocol',
    summary: 'Dietary restrictions (Avoiding Vitamin C / Red Meat) before FIT / FOBT stool tests.',
    fields: [
      { name: 'testType', label: 'Type of GI Screening Test', type: 'select', options: ['Fecal Immunochemical Test (FIT)', 'Guaiac Fecal Occult Blood (gFOBT)', 'Screening Colonoscopy'] },
      { name: 'dietaryPreps', label: 'Consumed Red Meat, NSAIDs, or Vit C >250mg in past 3 days?', type: 'select', options: ['Yes', 'No', 'Not applicable (FIT test)'] }
    ],
    evaluate: (data) => {
      const isGuaiacInterference = data.testType.includes('Guaiac') && data.dietaryPreps === 'Yes';
      return {
        triage: isGuaiacInterference ? 'PAUSE RED MEAT / VIT C FOR 3 DAYS' : 'READY FOR STOOL / ENDOSCOPY SCREEN',
        triageClass: isGuaiacInterference ? 'warning' : 'success',
        impression: isGuaiacInterference ? 'False positive (red meat peroxidase) or false negative (Vit C antioxidant) risk on Guaiac test.' : 'Proper preparation compliance.',
        redFlags: ['Severe dehydration during bowel prep for colonoscopy'],
        doctorAdvice: 'FIT tests are human-hemoglobin specific and do not require dietary restrictions, unlike older Guaiac FOBT.',
        labTests: ['FIT Stool Test', 'Diagnostic Colonoscopy'],
        questionsForDoctor: ['Is FIT stool testing or screening Colonoscopy recommended for my age group?', 'When should I pause blood thinners before endoscopy?'],
        medicationWarnings: 'Iron supplements turn stool black and must be paused 5 days prior to colonoscopy.'
      };
    }
  },
  {
    id: 50,
    categoryId: 'labs',
    categoryName: 'Lab & Diagnostic Readiness',
    title: 'Allergy IgE & Skin Prick Testing Prep',
    summary: 'Mandatory 7-day antihistamine washout period before allergy skin testing.',
    fields: [
      { name: 'antihistamineUse', label: 'Have you taken Antihistamines in the past 7 days?', type: 'select', options: ['Yes (Cetirizine / Loratadine / Diphenhydramine taken)', 'No (Stopped >7 days ago)'] }
    ],
    evaluate: (data) => {
      const isSuppressed = data.antihistamineUse.includes('Yes');
      return {
        triage: isSuppressed ? 'HOLD ANTIHISTAMINES 7 DAYS BEFORE TEST' : 'READY FOR ALLERGY SKIN PRICK TEST',
        triageClass: isSuppressed ? 'danger' : 'success',
        impression: isSuppressed ? 'Antihistamines suppress histamine wheal-and-flare response, causing 100% false negative skin test results.' : 'Skin mast cells reactive and testable.',
        redFlags: ['Severe asthma flare when stopping antihistamines'],
        doctorAdvice: 'Stop all oral H1 & H2 antihistamines for 5 to 7 days before skin prick testing. (Specific Serum IgE blood tests do not require washout).',
        labTests: ['Percutaneous Skin Prick Panel', 'Serum Allergen-Specific IgE (ImmunoCAP)'],
        questionsForDoctor: ['Which of my current daily pills are antihistamines that need a washout period?', 'Can we do blood IgE testing if I cannot stop my antihistamines?'],
        medicationWarnings: 'Topical steroid creams on the back or arms also suppress skin prick reactivity.'
      };
    }
  },

  // ==========================================
  // DOMAIN 6: FOOD & DRUG INTERACTIONS (51 - 60)
  // ==========================================
  {
    id: 51,
    categoryId: 'lifestyle',
    categoryName: 'Food & Drug Interactions',
    title: 'Grapefruit & CYP3A4 Drug Toxicity Checker',
    summary: 'Screens hazardous inhibition of intestinal Cytochrome P450 3A4 by Grapefruit juice.',
    fields: [
      { name: 'grapefruitIntake', label: 'Grapefruit or Grapefruit Juice consumption', type: 'select', options: ['Daily / Frequent', 'Occasional', 'None'] },
      { name: 'medList', label: 'Are you taking any of these CYP3A4 substrate drugs?', type: 'multiselect', options: ['Statins (Atorvastatin / Simvastatin)', 'Calcium Channel Blockers (Amlodipine / Nifedipine)', 'Immunosuppressants (Tacrolimus / Cyclosporine)', 'Anxiolytics (Buspirone)', 'None'] }
    ],
    evaluate: (data) => {
      const isToxicityRisk = data.grapefruitIntake !== 'None' && data.medList && !data.medList.includes('None');
      return {
        triage: isToxicityRisk ? 'CRITICAL DRUG-FOOD TOXICITY WARNING' : 'NO INTERACTION DETECTED',
        triageClass: isToxicityRisk ? 'danger' : 'success',
        impression: isToxicityRisk ? 'Grapefruit furanocoumarins irreversibly inhibit intestinal CYP3A4, causing up to 300-500% increase in blood drug levels (Statins/Amlodipine).' : 'Safe dietary overlap.',
        redFlags: ['Severe muscle pain & dark tea urine (Rhabdomyolysis from Statin toxicity)', 'Severe hypotension / dizziness (Amlodipine)'],
        doctorAdvice: isToxicityRisk ? 'Avoid Grapefruit entirely while on these medications. Separate dosing times does NOT prevent interaction.' : 'Enjoy fruit in moderation.',
        labTests: ['Serum Creatine Kinase (CK for statin toxicity)', 'Blood Pressure monitoring'],
        questionsForDoctor: ['Can I switch to Rosuvastatin or Pravastatin which are not metabolized by CYP3A4?', 'Is orange or apple juice a safe alternative?'],
        medicationWarnings: 'Grapefruit’s enzyme inhibition lasts up to 24-72 hours after consumption.'
      };
    }
  },
  {
    id: 52,
    categoryId: 'lifestyle',
    categoryName: 'Food & Drug Interactions',
    title: 'Alcohol & Medication Hepatotoxicity & Sedation',
    summary: 'Evaluates disulfiram-like reactions, CNS depression, and GI mucosal bleeding.',
    fields: [
      { name: 'alcoholUnits', label: 'Alcohol Intake', type: 'select', options: ['Heavy (>3 drinks/day)', 'Moderate (1-2 drinks)', 'Occasional social'] },
      { name: 'medClass', label: 'Concomitant Medication', type: 'select', options: ['Metronidazole / Tinidazole (Disulfiram reaction)', 'Acetaminophen / Paracetamol', 'Opioids / Benzodiazepines', 'NSAIDs / Aspirin', 'None'] }
    ],
    evaluate: (data) => {
      const isDisulfiram = data.medClass.includes('Metronidazole');
      const isSevereSedation = data.medClass.includes('Opioids');
      const isTox = isDisulfiram || isSevereSedation || (data.alcoholUnits === 'Heavy (>3 drinks/day)' && data.medClass.includes('Acetaminophen'));
      return {
        triage: isTox ? 'HAZARDOUS ALCOHOL-DRUG INTERACTION' : 'SAFE MODERATE INTENSITY',
        triageClass: isTox ? 'danger' : 'info',
        impression: isDisulfiram ? 'Severe Disulfiram-like reaction (Severe flushing, vomiting, tachycardia, hypotension).' : isSevereSedation ? 'Potentially fatal respiratory depression.' : 'Acceptable metabolic profile.',
        redFlags: ['Severe throbbing headache, facial flushing, vomiting after alcohol on Metronidazole', 'Extreme respiratory slowing'],
        doctorAdvice: 'Strictly avoid all alcohol during and for 48 hours AFTER completing Metronidazole therapy.',
        labTests: ['Liver Function Tests', 'Blood Alcohol Concentration'],
        questionsForDoctor: ['How many days after finishing my antibiotic can I safely drink alcohol?'],
        medicationWarnings: 'Alcohol co-ingestion with extended-release opioids causes dangerous "dose-dumping".'
      };
    }
  },
  {
    id: 53,
    categoryId: 'lifestyle',
    categoryName: 'Food & Drug Interactions',
    title: 'Sodium Intake & Hypertension Med Blunting',
    summary: 'Assesses dietary sodium interference with Antihypertensive drugs and Diuretics.',
    fields: [
      { name: 'dailySodium', label: 'Estimated Daily Salt / Sodium Intake', type: 'select', options: ['High (> 3,000 mg sodium / High processed food)', 'Moderate (2,000 - 3,000 mg)', 'Low (< 1,500 mg)'] },
      { name: 'bpMeds', label: 'Taking ACE-Inhibitors, ARBs, or Diuretics?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isBlunted = data.dailySodium.includes('High') && data.bpMeds === 'Yes';
      return {
        triage: isBlunted ? 'DIETARY SODIUM MEDICATION INTERFERENCE' : 'SODIUM BALANCED PROFILE',
        triageClass: isBlunted ? 'warning' : 'success',
        impression: isBlunted ? 'Excess sodium blunts the therapeutic efficacy of ACE-inhibitors and Thiazide diuretics.' : 'Dietary sodium aligns with AHA guidelines.',
        redFlags: ['Refractory hypertension despite multiple medications'],
        doctorAdvice: 'Reducing sodium to <1,500 mg/day can lower systolic BP by 5-8 mmHg, equivalent to an additional BP pill.',
        labTests: ['24-Hour Urinary Sodium Excretion'],
        questionsForDoctor: ['Is my high salt intake neutralizing my blood pressure medication?'],
        medicationWarnings: 'Avoid salt substitutes containing Potassium Chloride if taking ACE-inhibitors (Risk of severe hyperkalemia).'
      };
    }
  },
  {
    id: 54,
    categoryId: 'lifestyle',
    categoryName: 'Food & Drug Interactions',
    title: 'High-Potassium Food & ACE-Inhibitor Hyperkalemia',
    summary: 'Evaluates lethal arrhythmia risk from Potassium accumulation (Bananas, Salt Substitutes + Lisinopril).',
    fields: [
      { name: 'potassiumMeds', label: 'Taking Lisinopril, Enalapril, Losartan, or Spironolactone?', type: 'select', options: ['Yes', 'No'] },
      { name: 'potassiumDiet', label: 'High Potassium intake (Bananas, Avocados, Salt Substitutes, K-Supplements)?', type: 'select', options: ['Yes (Daily high consumption)', 'Moderate', 'No'] }
    ],
    evaluate: (data) => {
      const isHyperkalemiaRisk = data.potassiumMeds === 'Yes' && data.potassiumDiet.includes('Yes');
      return {
        triage: isHyperkalemiaRisk ? 'SERUM POTASSIUM & ARRHYTHMIA ALERT' : 'STABLE POTASSIUM DIET',
        triageClass: isHyperkalemiaRisk ? 'danger' : 'success',
        impression: isHyperkalemiaRisk ? 'Decreased renal aldosterone excretion combined with high dietary potassium creates severe Hyperkalemia risk (>5.5 mEq/L).' : 'Normal potassium homeostatic range.',
        redFlags: ['Muscle weakness / Flaccid paralysis', 'Palpitations / Cardiac arrest risk'],
        doctorAdvice: 'Avoid potassium-based fake salt substitutes (NoSalt / Nu-Salt) if taking RAAS-inhibitors or Spironolactone.',
        labTests: ['Serum Potassium level', '12-Lead ECG (Looking for Peaked T-waves)'],
        questionsForDoctor: ['What is my baseline serum potassium level?', 'Should I restrict high-potassium foods while on Lisinopril?'],
        medicationWarnings: 'Hyperkalemia can cause sudden fatal cardiac arrhythmias without prior warning symptoms.'
      };
    }
  },
  {
    id: 55,
    categoryId: 'lifestyle',
    categoryName: 'Food & Drug Interactions',
    title: 'Caffeine & Anxiolytic / Cardiac Med Interaction',
    summary: 'Assesses caffeine antagonism of Benzodiazepines and tachycardic amplification.',
    fields: [
      { name: 'caffeineCups', label: 'Daily Coffee / Energy Drink Intake', type: 'select', options: ['High (>4 cups / >400mg caffeine)', 'Moderate (1-2 cups)', 'None'] },
      { name: 'medList', label: 'Concomitant Medications', type: 'multiselect', options: ['Anxiolytics (Alprazolam / Lorazepam)', 'Bronchodilators (Theophylline)', 'Stimulants (Methylphenidate / Adderall)', 'None'] }
    ],
    evaluate: (data) => {
      const isHighCaffeine = data.caffeineCups.includes('High') && data.medList && !data.medList.includes('None');
      return {
        triage: isHighCaffeine ? 'CAFFEINE DRUG ANTAGONISM ALERT' : 'ACCEPTABLE CAFFEINE INTAKE',
        triageClass: isHighCaffeine ? 'warning' : 'success',
        impression: isHighCaffeine ? 'Caffeine directly opposes adenosine sedation (neutralizing anti-anxiety meds) and potentiates Theophylline toxicity.' : 'Normal central nervous system tone.',
        redFlags: ['Severe tremors, tachycardia, insomnia, panic attacks'],
        doctorAdvice: 'Taper caffeine consumption gradually to avoid adenosine withdrawal headaches.',
        labTests: ['Serum Theophylline level (if taking Theophylline)'],
        questionsForDoctor: ['Is my caffeine intake triggering my anxiety or neutralizing my sleeping pills?'],
        medicationWarnings: 'Caffeine impairs sleep architecture and exacerbates cardiac arrhythmias.'
      };
    }
  },
  {
    id: 56,
    categoryId: 'lifestyle',
    categoryName: 'Food & Drug Interactions',
    title: 'Vitamin K & Warfarin (Coumadin) Consistency Check',
    summary: 'Evaluates green leafy vegetable intake consistency to maintain stable INR.',
    fields: [
      { name: 'warfarinUser', label: 'Are you taking Warfarin (Coumadin)?', type: 'select', options: ['Yes', 'No'] },
      { name: 'vitKDiet', label: 'Green Leafy Vegetable Intake (Spinach, Kale, Broccoli)', type: 'select', options: ['Highly fluctuating week-to-week', 'Consistently low', 'Consistently high', 'Varies wildly'] }
    ],
    evaluate: (data) => {
      const isFluctuating = data.warfarinUser === 'Yes' && (data.vitKDiet.includes('fluctuating') || data.vitKDiet.includes('wildly'));
      return {
        triage: isFluctuating ? 'UNSTABLE INR DIETARY ALERT' : 'STABLE WARFARIN DIET',
        triageClass: isFluctuating ? 'danger' : 'success',
        impression: isFluctuating ? 'Fluctuating Vitamin K intake overrides hepatic clotting factor synthesis, causing erratic INR spikes or subtherapeutic clot risk.' : 'Stable dietary Vitamin K balance.',
        redFlags: ['Sudden INR drop < 1.5 (Stroke risk) or INR > 4.5 (Bleeding risk)'],
        doctorAdvice: 'Do NOT eliminate greens! The key is CONSISTENCY. Eat the same relative amount of Vitamin K every week.',
        labTests: ['Weekly Prothrombin Time (PT) / INR'],
        questionsForDoctor: ['Should my Warfarin dose be adjusted for my current diet?', 'Would a DOAC (Apixaban) which requires NO dietary restrictions be better for me?'],
        medicationWarnings: 'Vitamin K1 directly antagonizes Warfarin’s inhibition of VKORC1 enzyme.'
      };
    }
  },
  {
    id: 57,
    categoryId: 'lifestyle',
    categoryName: 'Food & Drug Interactions',
    title: 'Dietary Fibre & Thyroid Med Absorption Safety',
    summary: 'Checks high-fibre bran, soy, and meal timing impacts on Levothyroxine.',
    fields: [
      { name: 'fibreSupplements', label: 'Take Psyllium Husk, Soy, or High Fibre right after morning pills?', type: 'select', options: ['Yes (Within 30 mins of Levothyroxine)', 'No (Separated by >2 hours)'] }
    ],
    evaluate: (data) => {
      const isMalabsorbed = data.fibreSupplements.includes('Yes');
      return {
        triage: isMalabsorbed ? 'LEVOTHYROXINE BINDING INTERFERENCE' : 'OPTIMAL GUT ABSORPTION',
        triageClass: isMalabsorbed ? 'warning' : 'success',
        impression: isMalabsorbed ? 'Dietary fibre and soy unspecifically adsorb Levothyroxine in the intestinal lumen, causing fecal excretion.' : 'Uninhibited drug absorption.',
        redFlags: ['Persistent hypothyroid symptoms despite high Levothyroxine dose'],
        doctorAdvice: 'Separate high-fibre meals, dietary bran, and soy products by at least 2 to 4 hours from your Levothyroxine dose.',
        labTests: ['Serum TSH'],
        questionsForDoctor: ['Is my fibre supplement responsible for my elevated TSH?'],
        medicationWarnings: 'Always take Levothyroxine with plain water on an empty stomach.'
      };
    }
  },
  {
    id: 58,
    categoryId: 'lifestyle',
    categoryName: 'Food & Drug Interactions',
    title: 'Milk / Calcium & Tetracycline Chelation Safety',
    summary: 'Prevents insoluble polyvalent cation chelation of Antibiotics (Doxycycline/Ciprofloxacin).',
    fields: [
      { name: 'antibioticType', label: 'Antibiotic Prescribed', type: 'select', options: ['Doxycycline / Tetracycline', 'Ciprofloxacin / Levofloxacin', 'Other antibiotic', 'None'] },
      { name: 'dairyTiming', label: 'Do you consume Milk, Yogurt, or Calcium Antacids with pills?', type: 'select', options: ['Yes (Within 2 hours)', 'No (Separated by 2-4 hours)'] }
    ],
    evaluate: (data) => {
      const isChelated = (data.antibioticType.includes('Doxycycline') || data.antibioticType.includes('Ciprofloxacin')) && data.dairyTiming.includes('Yes');
      return {
        triage: isChelated ? 'ANTIBIOTIC CHELATION INACTIVATION ALERT' : 'PROPER ANTIBIOTIC DOSING',
        triageClass: isChelated ? 'danger' : 'success',
        impression: isChelated ? 'Calcium, Iron, and Aluminum cations chelate antibiotic molecules into insoluble complexes, preventing systemic absorption.' : 'Full antibacterial bio-availability.',
        redFlags: ['Treatment failure / Worsening bacterial infection'],
        doctorAdvice: 'Separate dairy products, calcium-fortified juices, and antacids by at least 2 hours BEFORE or 4 hours AFTER taking Tetracyclines or Fluoroquinolones.',
        labTests: ['Not applicable - absorption chemistry'],
        questionsForDoctor: ['How many hours should I wait between my calcium supplement and my antibiotic?'],
        medicationWarnings: 'Chelated antibiotics pass straight through the gut into stool without curing the infection.'
      };
    }
  },
  {
    id: 59,
    categoryId: 'lifestyle',
    categoryName: 'Food & Drug Interactions',
    title: 'Fasting / Meal Timing & Diabetic Med Safety',
    summary: 'Prevents severe hypoglycemia during religious or intermittent fasting.',
    fields: [
      { name: 'fastingType', label: 'Fasting Protocol', type: 'select', options: ['Intermittent Fasting (16:8)', 'Religious Fasting (Dawn to Dusk)', 'None'] },
      { name: 'diabeticMeds', label: 'Taking Sulfonylureas or Insulin?', type: 'select', options: ['Yes (Insulin or Glimepiride)', 'No (Metformin only)'] }
    ],
    evaluate: (data) => {
      const isHypoHazard = data.fastingType !== 'None' && data.diabeticMeds.includes('Yes');
      return {
        triage: isHypoHazard ? 'FASTING HYPOGLYCEMIA RISK ADVISORY' : 'SAFE FASTING PROTOCOL',
        triageClass: isHypoHazard ? 'danger' : 'success',
        impression: isHypoHazard ? 'High risk of severe insulin-induced hypoglycemia during non-eating windows.' : 'Low hypoglycemia potential.',
        redFlags: ['Sweating, tremors, confusion, loss of consciousness during fast'],
        doctorAdvice: 'Consult your doctor BEFORE starting any fast. Doses of Sulfonylureas and basal/prandial insulin MUST be adjusted.',
        labTests: ['Frequent Blood Glucose Self-Monitoring / CGM'],
        questionsForDoctor: ['How should I reduce my insulin dose on fasting days?', 'Should I pause my Sulfonylurea pill while fasting?'],
        medicationWarnings: 'Always break a fast immediately if blood sugar drops below 70 mg/dL.'
      };
    }
  },
  {
    id: 60,
    categoryId: 'lifestyle',
    categoryName: 'Food & Drug Interactions',
    title: 'Tobacco & Cytochrome P450 Drug Metabolism',
    summary: 'Evaluates polycyclic aromatic hydrocarbon induction of CYP1A2 (Theophylline, Olanzapine).',
    fields: [
      { name: 'smokingStatus', label: 'Tobacco / Cigarette Smoking Status', type: 'select', options: ['Active Smoker (>10 cigarettes/day)', 'Recent Quitter', 'Non-Smoker'] },
      { name: 'cyp1a2Drugs', label: 'Taking Olanzapine, Clozapine, or Theophylline?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isInductionRisk = data.smokingStatus === 'Active Smoker (>10 cigarettes/day)' && data.cyp1a2Drugs === 'Yes';
      const isQuittingRisk = data.smokingStatus === 'Recent Quitter' && data.cyp1a2Drugs === 'Yes';
      return {
        triage: (isInductionRisk || isQuittingRisk) ? 'CYP1A2 METABOLIC DOSING REVISION NEEDED' : 'NORMAL METABOLIC CLEARANCE',
        triageClass: (isInductionRisk || isQuittingRisk) ? 'warning' : 'success',
        impression: isInductionRisk ? 'Cigarette smoke induces CYP1A2 enzymes, lowering drug blood levels by up to 50%.' : isQuittingRisk ? 'Quitting smoke stops enzyme induction, causing drug levels to SPIKE to toxic concentrations.' : 'Standard enzyme baseline.',
        redFlags: ['Toxicity symptoms after quitting smoking (Sedation, tremors, confusion)'],
        doctorAdvice: 'If you plan to stop smoking, inform your doctor immediately so drug doses (Clozapine/Olanzapine) can be reduced.',
        labTests: ['Serum Drug Levels (Clozapine / Theophylline)'],
        questionsForDoctor: ['Does my smoking habit require a higher medication dose?', 'Will my drug dose need to be lowered when I quit smoking?'],
        medicationWarnings: 'It is the hydrocarbon smoke—not nicotine patches—that induces hepatic CYP1A2 enzymes.'
      };
    }
  },

  // ==========================================
  // DOMAIN 7: AGE & SPECIAL POPULATION (61 - 70)
  // ==========================================
  {
    id: 61,
    categoryId: 'population',
    categoryName: 'Age & Special Population',
    title: 'Geriatric Beers Criteria Medication Risk Check',
    summary: 'Screens potentially inappropriate medications (PIMs) in adults age 65+ per AGS guidelines.',
    fields: [
      { name: 'patientAge', label: 'Patient Age', type: 'text', placeholder: 'e.g. 72' },
      { name: 'pimsTaken', label: 'Select all medications taken', type: 'multiselect', options: ['First-gen Antihistamines (Diphenhydramine)', 'Benzodiazepines (Diazepam/Alprazolam)', 'Z-drugs (Zolpidem/Zopiclone)', 'Long-acting Sulfonylureas (Glibenclamide)', 'Anticholinergics (Oxybutynin)', 'None'] }
    ],
    evaluate: (data) => {
      const age = parseInt(data.patientAge) || 70;
      const countPIM = data.pimsTaken ? data.pimsTaken.filter(x => x !== 'None').length : 0;
      const isHighBeersRisk = age >= 65 && countPIM >= 1;
      return {
        triage: isHighBeersRisk ? 'HIGH GERIATRIC BEERS CRITERIA RISK' : 'SAFE GERIATRIC PROFILE',
        triageClass: isHighBeersRisk ? 'danger' : 'success',
        impression: isHighBeersRisk ? 'Identified Potentially Inappropriate Medication (PIM) associated with falls, cognitive impairment, delirium, and urinary retention.' : 'Appropriate age-adjusted pharmacotherapy.',
        redFlags: ['Sudden confusion / Delirium', 'Falls or fractures', 'Severe dry mouth & constipation'],
        doctorAdvice: 'Request a comprehensive geriatric medication review to substitute safer alternatives (e.g. Melatonin instead of Zolpidem).',
        labTests: ['Cognitive assessment (MMSE / MoCA)', 'Fall risk assessment'],
        questionsForDoctor: ['Is this pill listed on the AGS Beers Criteria for elderly safety?', 'Can we substitute a non-sedating alternative?'],
        medicationWarnings: 'Elderly patients have reduced hepatic blood flow and renal clearance, increasing drug half-lives.'
      };
    }
  },
  {
    id: 62,
    categoryId: 'population',
    categoryName: 'Age & Special Population',
    title: 'Pediatric Weight-Based Dosage Pre-Check',
    summary: 'Prevents toxic overdose by verifying mg/kg dosing vs adult standard doses.',
    fields: [
      { name: 'childWeight', label: 'Child Weight (kg)', type: 'text', placeholder: 'e.g. 15 kg' },
      { name: 'medicationName', label: 'Medication Name (e.g. Paracetamol / Ibuprofen)', type: 'text', placeholder: 'e.g. Paracetamol syrup' },
      { name: 'doseGiven', label: 'Dose given per administration (mL or mg)', type: 'text', placeholder: 'e.g. 5 mL (120mg/5mL)' }
    ],
    evaluate: (data) => {
      const weight = parseFloat(data.childWeight) || 15;
      return {
        triage: 'PEDIATRIC DOSAGE VERIFICATION',
        triageClass: 'info',
        impression: `Standard pediatric Paracetamol dose is 10-15 mg/kg every 4-6 hours (Max 60 mg/kg/day). For ${weight} kg child, recommended single dose is ${Math.round(weight * 12.5)} mg.`,
        redFlags: ['Accidental double dosing', 'Lethargy or persistent vomiting'],
        doctorAdvice: 'ALWAYS use the calibrated dosing syringe or cup provided with the liquid bottle. NEVER use kitchen spoons.',
        labTests: ['Pediatric clinical evaluation'],
        questionsForDoctor: ['What is the exact weight-based milliliter dose for my child?', 'What is the maximum number of doses in 24 hours?'],
        medicationWarnings: 'Infant drops and Children’s liquid suspensions often have DIFFERENT concentrations. Always check the label!'
      };
    }
  },
  {
    id: 63,
    categoryId: 'population',
    categoryName: 'Age & Special Population',
    title: 'Pregnancy FDA Drug Category & Teratogen Check',
    summary: 'Screens teratogenic risks (Category D/X, PLLR) during trimester development.',
    fields: [
      { name: 'trimester', label: 'Pregnancy Status / Trimester', type: 'select', options: ['1st Trimester (Organogenesis)', '2nd Trimester', '3rd Trimester', 'Planning Pregnancy'] },
      { name: 'medClasses', label: 'Taking any of these high-risk drug classes?', type: 'multiselect', options: ['ACE-Inhibitors / ARBs (Lisinopril/Losartan)', 'Valproic Acid / Carbamazepine', 'Isotretinoin (Accutane)', 'Warfarin', 'NSAIDs (Ibuprofen in 3rd trimester)', 'None'] }
    ],
    evaluate: (data) => {
      const isTeratogen = data.medClasses && (data.medClasses.includes('Isotretinoin (Accutane)') || data.medClasses.includes('ACE-Inhibitors / ARBs (Lisinopril/Losartan)') || data.medClasses.includes('Valproic Acid / Carbamazepine') || data.medClasses.includes('NSAIDs (Ibuprofen in 3rd trimester)'));
      return {
        triage: isTeratogen ? 'CRITICAL TERATOGEN PREGNANCY ALERT' : 'SAFE MATERNAL MEDICINE REVIEW',
        triageClass: isTeratogen ? 'danger' : 'success',
        impression: isTeratogen ? 'HIGH TERATOGENIC RISK: Potential neural tube defects, renal dysgenesis, or premature closure of ductus arteriosus.' : 'Low teratogenic risk profile.',
        redFlags: ['Vaginal bleeding', 'Severe abdominal cramping'],
        doctorAdvice: isTeratogen ? 'STOP teratogenic drug immediately and contact your Obstetrician today.' : 'Take 400 mcg daily Prenatal Folic Acid.',
        labTests: ['Obstetric Ultrasound', 'Fetal Echocardiogram (if exposed to teratogen)'],
        questionsForDoctor: ['Is my medication safe under the FDA Pregnancy and Lactation Labeling Rule (PLLR)?', 'What is the safest alternative pill for my condition during pregnancy?'],
        medicationWarnings: 'NSAIDs in the 3rd trimester cause premature closure of the fetal ductus arteriosus and oligohydramnios.'
      };
    }
  },
  {
    id: 64,
    categoryId: 'population',
    categoryName: 'Age & Special Population',
    title: 'Lactation & Breastfeeding Medication Transfer',
    summary: 'Evaluates Milk-to-Plasma ratio (M/P) and infant safety during nursing.',
    fields: [
      { name: 'infantAge', label: 'Infant Age', type: 'select', options: ['Pre-term / Newborn (< 2 months)', '3 to 6 months', 'Older (> 6 months)'] },
      { name: 'medicationName', label: 'Prescription Medication Taken', type: 'text', placeholder: 'e.g. Sertraline / Codeine' }
    ],
    evaluate: (data) => {
      const isCodeineRisk = data.medicationName.toLowerCase().includes('codeine') || data.medicationName.toLowerCase().includes('tramadol');
      return {
        triage: isCodeineRisk ? 'CRITICAL INFANT OPIOID LACTATION DANGER' : 'LACTATION SAFETY EVALUATION',
        triageClass: isCodeineRisk ? 'danger' : 'info',
        impression: isCodeineRisk ? 'Ultra-rapid CYP2D6 metabolizer mothers excrete dangerous Morphine levels into breast milk, causing infant respiratory arrest.' : 'Low infant relative dose excretion.',
        redFlags: ['Infant excessive sleepiness (>4 hours without waking to feed)', 'Limpness or breathing difficulty in infant'],
        doctorAdvice: 'Codeine and Tramadol are CONTRAINDICATED during breastfeeding by the FDA.',
        labTests: ['Infant clinical observation'],
        questionsForDoctor: ['What is the Relative Infant Dose (RID %) for this medication?', 'Should I pump and dump breastmilk during treatment?'],
        medicationWarnings: 'Always take medications immediately AFTER breastfeeding to minimize peak drug concentration in milk.'
      };
    }
  },
  {
    id: 65,
    categoryId: 'population',
    categoryName: 'Age & Special Population',
    title: 'Post-Menopausal HRT & Thrombosis Pre-Check',
    summary: 'Evaluates Hormone Replacement Therapy risks (VTE, Breast Cancer, Stroke).',
    fields: [
      { name: 'hrtType', label: 'HRT Regimen', type: 'select', options: ['Combined Oral Estrogen + Progestin', 'Estrogen-only (Post-Hysterectomy)', 'Transdermal Patch', 'None'] },
      { name: 'yearsUsed', label: 'Duration of HRT Usage', type: 'select', options: ['Under 5 years', 'Over 5 years continuous'] },
      { name: 'vteRisk', label: 'Personal history of Blood Clots, Stroke, or Breast Cancer?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isVteRisk = data.vteRisk === 'Yes' || (data.hrtType.includes('Combined Oral') && data.yearsUsed === 'Over 5 years continuous');
      return {
        triage: isVteRisk ? 'HIGH HRT COMPLICATION RISK' : 'ROUTINE HRT MONITORING',
        triageClass: isVteRisk ? 'danger' : 'info',
        impression: isVteRisk ? 'Elevated risk of Venous Thromboembolism (DVT/PE), Ischemic Stroke, and Invasive Breast Cancer.' : 'Acceptable short-term symptom relief profile.',
        redFlags: ['Unilateral leg swelling / calf pain', 'Breast lump or nipple discharge'],
        doctorAdvice: 'Transdermal estrogen patches bypass hepatic first-pass metabolism and carry a lower venous thromboembolism risk than oral estrogen.',
        labTests: ['Annual Screening Mammogram', 'Pelvic Ultrasound (if post-menopausal bleeding occurs)'],
        questionsForDoctor: ['Should I transition from oral HRT to a transdermal patch?', 'What is my recommended duration for tapering off HRT?'],
        medicationWarnings: 'Unopposed oral estrogen in women with an intact uterus leads to Endometrial Hyperplasia and Cancer.'
      };
    }
  },
  {
    id: 66,
    categoryId: 'population',
    categoryName: 'Age & Special Population',
    title: 'Adolescent Acne & Isotretinoin (Accutane) Monitoring',
    summary: 'Tracks iPLEDGE compliance, lipid panels, LFTs, and mood monitoring.',
    fields: [
      { name: 'isotretinoinDose', label: 'Isotretinoin Current Dose', type: 'text', placeholder: 'e.g. 40 mg daily' },
      { name: 'ipledgeCompliance', label: 'iPLEDGE pregnancy test & 2 forms of contraception compliant?', type: 'select', options: ['Yes (100% compliant)', 'No / Unsure', 'Not female / Not applicable'] },
      { name: 'sideEffects', label: 'Side effects experienced', type: 'multiselect', options: ['Severe dry lips/skin', 'Depressive mood / Suicidal thoughts', 'Severe headaches / Vision changes', 'None'] }
    ],
    evaluate: (data) => {
      const isCritical = data.sideEffects && (data.sideEffects.includes('Depressive mood / Suicidal thoughts') || data.sideEffects.includes('Severe headaches / Vision changes'));
      return {
        triage: isCritical ? 'URGENT ISOTRETINOIN SIDE EFFECT ALERT' : 'ROUTINE ISOTRETINOIN MONITORING',
        triageClass: isCritical ? 'danger' : 'success',
        impression: isCritical ? 'Risk of Pseudotumor Cerebri (Intracranial Hypertension) or Severe Retinoid Depressive Episode.' : 'Expected mucocutaneous retinoid side effects.',
        redFlags: ['Severe persistent headache with nausea (Pseudotumor Cerebri)', 'Active suicidal ideation'],
        doctorAdvice: isCritical ? 'Contact your Dermatologist immediately.' : 'Apply lip balm and moisturizing cream continuously.',
        labTests: ['Monthly Pregnancy Test (for females)', 'Fasting Lipid Profile (Triglycerides)', 'Liver Function Tests (ALT/AST)'],
        questionsForDoctor: ['Are my serum triglycerides within safe limits?', 'Is my cumulative target dose (120-150 mg/kg) on track?'],
        medicationWarnings: 'NEVER take Tetracycline antibiotics while taking Isotretinoin (Risk of permanent brain swelling).'
      };
    }
  },
  {
    id: 67,
    categoryId: 'population',
    categoryName: 'Age & Special Population',
    title: 'Elderly Fall & Sedative Risk Checker',
    summary: 'Evaluates orthostatic hypotension, gait ataxia, and sedative-induced hip fracture risks.',
    fields: [
      { name: 'fallHistory', label: 'Have you fallen in the past 6 months?', type: 'select', options: ['Yes (1 or more falls)', 'No'] },
      { name: 'sedatingPills', label: 'Taking Sleep pills, Muscle relaxants, or Blood pressure pills?', type: 'select', options: ['Yes (Taking 2+ fall-risk pills)', 'Yes (Taking 1 pill)', 'No'] }
    ],
    evaluate: (data) => {
      const isFallRisk = data.fallHistory === 'Yes' && data.sedatingPills.includes('Taking 2+');
      return {
        triage: isFallRisk ? 'HIGH FALL & FRACTURE HAZARD ALERT' : 'MODERATE FALL RISK',
        triageClass: isFallRisk ? 'danger' : 'warning',
        impression: isFallRisk ? 'Profound risk of recurrent falls resulting in Subdural Hematoma or Femoral Neck Fracture.' : 'Standard age-related gait assessment.',
        redFlags: ['Inability to stand from a chair without assistance', 'Head injury after fall while on blood thinners'],
        doctorAdvice: 'Conduct a home safety inspection (remove throw rugs, add bathroom grab bars, improve lighting).',
        labTests: ['Timed Up and Go (TUG) Test', 'Orthostatic Blood Pressure Measurement', 'Vitamin D level'],
        questionsForDoctor: ['Can we reduce my evening blood pressure or sleep pills to prevent nighttime falls?'],
        medicationWarnings: 'Postural blood pressure drops >20 mmHg upon standing indicate high fall danger.'
      };
    }
  },
  {
    id: 68,
    categoryId: 'population',
    categoryName: 'Age & Special Population',
    title: 'Renal Dose Adjustment in Aging Adults',
    summary: 'Calculates Cockcroft-Gault CrCl for physiological age-related GFR decline.',
    fields: [
      { name: 'age', label: 'Age', type: 'text', placeholder: 'e.g. 78' },
      { name: 'weight', label: 'Weight (kg)', type: 'text', placeholder: 'e.g. 62' },
      { name: 'serumCreatinine', label: 'Serum Creatinine (mg/dL)', type: 'text', placeholder: 'e.g. 1.1' }
    ],
    evaluate: (data) => {
      const age = parseInt(data.age) || 75;
      const wt = parseFloat(data.weight) || 60;
      const cr = parseFloat(data.serumCreatinine) || 1.0;
      const crcl = Math.round(((140 - age) * wt) / (72 * cr));
      const isImpaired = crcl < 50;
      return {
        triage: isImpaired ? 'REDUCED DRUG CLEARANCE CAPACITY' : 'NORMAL AGE-ADJUSTED CLEARANCE',
        triageClass: isImpaired ? 'warning' : 'success',
        impression: `Estimated Creatinine Clearance is ~${crcl} mL/min. Normal serum creatinine in elderly often hides reduced muscle mass and low GFR.`,
        redFlags: ['Accumulation toxicity from renally-cleared drugs (Gabapentin, Digoxin, Allopurinol)'],
        doctorAdvice: 'Always calculate explicit Creatinine Clearance (CrCl) rather than relying solely on serum creatinine in elderly patients.',
        labTests: ['Serum Creatinine', '24-Hour Urine Creatinine Clearance'],
        questionsForDoctor: ['Is my Gabapentin or Allopurinol dose reduced for my estimated renal clearance of ~' + crcl + ' mL/min?'],
        medicationWarnings: 'Serum creatinine can appear "normal" (1.0 mg/dL) in frail elderly due to severe sarcopenia, masking renal decline.'
      };
    }
  },
  {
    id: 69,
    categoryId: 'population',
    categoryName: 'Age & Special Population',
    title: 'Pediatric Fever & Reye’s Syndrome Hazard Check',
    summary: 'Strict warning against Aspirin usage in children with viral infections.',
    fields: [
      { name: 'childAge', label: 'Child Age', type: 'text', placeholder: 'e.g. 6 years old' },
      { name: 'viralIllness', label: 'Has Influenza (Flu) or Chickenpox (Varicella)?', type: 'select', options: ['Yes', 'No', 'Unsure (Fever & runny nose)'] },
      { name: 'aspirinGiven', label: 'Was Aspirin or Salicylate-containing syrup (Pepto-Bismol) given?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isReyesHazard = data.viralIllness !== 'No' && data.aspirinGiven === 'Yes';
      return {
        triage: isReyesHazard ? 'EMERGENCY REYE’S SYNDROME HAZARD' : 'SAFE PEDIATRIC FEVER CARE',
        triageClass: isReyesHazard ? 'danger' : 'success',
        impression: isReyesHazard ? 'CRITICAL REYE’S SYNDROME HAZARD: Acute encephalopathy and fatty liver failure triggered by Aspirin in pediatric viral illness.' : 'Appropriate fever management.',
        redFlags: ['Pernicious vomiting, lethargy, confusion, seizures in child'],
        doctorAdvice: isReyesHazard ? 'Proceed immediately to Pediatric Emergency Department.' : 'Use Paracetamol or Ibuprofen for pediatric fever relief.',
        labTests: ['Serum Ammonia', 'Liver Function Tests', 'Blood Glucose'],
        questionsForDoctor: ['What antipyretics are safe for my child’s viral fever?'],
        medicationWarnings: 'NEVER give Aspirin or Bismuth Subsalicylate (Pepto-Bismol) to anyone under age 19 with viral symptoms.'
      };
    }
  },
  {
    id: 70,
    categoryId: 'population',
    categoryName: 'Age & Special Population',
    title: 'Pregnancy Preeclampsia Symptom Warning Check',
    summary: 'Evaluates gestational hypertension, proteinuria, and preeclampsia danger signs.',
    fields: [
      { name: 'gestationalGest', label: 'Gestational Age', type: 'select', options: ['Over 20 weeks pregnant', 'Under 20 weeks', 'Postpartum (<6 weeks)'] },
      { name: 'bpReading', label: 'Blood Pressure Reading', type: 'text', placeholder: 'e.g. 148/94' },
      { name: 'preeclampsiaSigns', label: 'Select symptoms experienced', type: 'multiselect', options: ['Severe frontal headache unresponsive to Paracetamol', 'Visual disturbances (Flashing lights/spots)', 'Right upper quadrant stomach pain', 'Sudden swelling of face and hands', 'None'] }
    ],
    evaluate: (data) => {
      const sys = parseInt(data.bpReading) || 120;
      const isPreeclampsia = data.gestationalGest !== 'Under 20 weeks' && (sys >= 140 || (data.preeclampsiaSigns && data.preeclampsiaSigns.length > 0 && !data.preeclampsiaSigns.includes('None')));
      return {
        triage: isPreeclampsia ? 'EMERGENCY PREECLAMPSIA RED FLAG' : 'NORMAL PREGNANCY BP',
        triageClass: isPreeclampsia ? 'danger' : 'success',
        impression: isPreeclampsia ? 'High suspicion for Preeclampsia with Severe Features (Risk of Eclamptic seizures, HELLP syndrome, Placental Abruption).' : 'Normotensive pregnancy.',
        redFlags: ['BP >= 160/110 mmHg', 'Seizures (Eclampsia)', 'Visual scotoma / blurry spots'],
        doctorAdvice: isPreeclampsia ? 'Proceed immediately to Labor & Delivery Triage or ER for Magnesium Sulfate and antihypertensives.' : 'Monitor home BP weekly.',
        labTests: ['Urine Protein-to-Creatinine Ratio', 'Platelet Count', 'AST / ALT', 'Serum Lactate Dehydrogenase (LDH)'],
        questionsForDoctor: ['Do I need low-dose Aspirin (81mg) for preeclampsia prophylaxis?', 'Is my baby’s growth on track on ultrasound?'],
        medicationWarnings: 'ACE-inhibitors and ARBs are strictly contraindicated in pregnancy.'
      };
    }
  },

  // ==========================================
  // DOMAIN 8: EMERGENCY RED FLAGS (71 - 80)
  // ==========================================
  {
    id: 71,
    categoryId: 'emergency',
    categoryName: 'Emergency Red Flags',
    title: 'Stroke & FAST Symptoms Alert Check',
    summary: 'Evaluates acute focal neurological deficits using the AHA FAST stroke scale.',
    fields: [
      { name: 'faceDroop', label: 'Face Drooping: One side of face droops when smiling?', type: 'select', options: ['Yes', 'No'] },
      { name: 'armWeakness', label: 'Arm Weakness: One arm drifts downward when raised?', type: 'select', options: ['Yes', 'No'] },
      { name: 'speechDifficulty', label: 'Speech Difficulty: Slurred or strange speech?', type: 'select', options: ['Yes', 'No'] },
      { name: 'timeOnset', label: 'Time when symptoms started', type: 'select', options: ['Under 3 hours', '3 to 4.5 hours', 'Over 4.5 hours / Woke up with it'] }
    ],
    evaluate: (data) => {
      const fastPositive = data.faceDroop === 'Yes' || data.armWeakness === 'Yes' || data.speechDifficulty === 'Yes';
      return {
        triage: fastPositive ? 'CRITICAL STROKE CODE RED - CALL 911' : 'NON-STROKE NEUROLOGICAL EVAL',
        triageClass: fastPositive ? 'danger' : 'info',
        impression: fastPositive ? 'ACUTE ISCHEMIC / HEMORRHAGIC STROKE SUSPECTED. Thrombolytic window (tPA / Tenecteplase) is time-critical!' : 'No immediate FAST stroke signs.',
        redFlags: ['Facial droop', 'Arm drift', 'Slurred speech'],
        doctorAdvice: fastPositive ? 'CALL 911 IMMEDIATELY. Note exact time of onset. Do NOT give food, water, or Aspirin.' : 'Consult a neurologist.',
        labTests: ['Stat Non-Contrast Brain CT', 'CT Angiography Head & Neck', 'Blood Glucose (Rule out severe hypoglycemia)'],
        questionsForDoctor: ['Is the patient eligible for IV thrombolysis or Endovascular Thrombectomy?'],
        medicationWarnings: 'Do NOT administer Aspirin before a Brain CT rules out intracranial hemorrhage!'
      };
    }
  },
  {
    id: 72,
    categoryId: 'emergency',
    categoryName: 'Emergency Red Flags',
    title: 'Acute Coronary Syndrome (ACS) Warning Check',
    summary: 'Evaluates ST-elevation myocardial infarction (STEMI) symptoms.',
    fields: [
      { name: 'crushingPain', label: 'Crushing sub-sternal chest discomfort?', type: 'select', options: ['Yes', 'No'] },
      { name: 'radiation', label: 'Radiation to neck, jaw, back, or left shoulder?', type: 'select', options: ['Yes', 'No'] },
      { name: 'autonomic', label: 'Cold diaphoresis, dyspnea, or sense of impending doom?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isACS = data.crushingPain === 'Yes' || (data.radiation === 'Yes' && data.autonomic === 'Yes');
      return {
        triage: isACS ? 'CRITICAL ACS / MYOCARDIAL INFARCTION - CALL 911' : 'CARDIAC PRE-CHECK',
        triageClass: isACS ? 'danger' : 'info',
        impression: isACS ? 'HIGH SUSPICION FOR MYOCARDIAL INFARCTION (HEART ATTACK).' : 'Low probability of acute cardiac ischemia.',
        redFlags: ['Crushing chest pressure', 'Cold diaphoresis', 'Syncope'],
        doctorAdvice: isACS ? 'CALL 911 IMMEDIATELY. Chew 325mg non-enteric coated Aspirin if available and not allergic.' : 'Schedule routine outpatient cardiac workup.',
        labTests: ['Stat 12-Lead ECG (within 10 minutes)', 'High-Sensitivity Troponin I/T'],
        questionsForDoctor: ['Does the ECG show ST-elevation requiring emergency Cardiac Catheterization (PCI)?'],
        medicationWarnings: 'Time is Muscle! Door-to-Balloon time target is <90 minutes.'
      };
    }
  },
  {
    id: 73,
    categoryId: 'emergency',
    categoryName: 'Emergency Red Flags',
    title: 'Anaphylactic Shock Early Warning Check',
    summary: 'Recognizes multi-organ acute allergic collapse.',
    fields: [
      { name: 'airway', label: 'Stridor, throat tightness, or tongue edema?', type: 'select', options: ['Yes', 'No'] },
      { name: 'skin', label: 'Diffuse hives, flushing, or angioedema?', type: 'select', options: ['Yes', 'No'] },
      { name: 'circulatory', label: 'Dizziness, fainting, or blood pressure drop?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isAnaphylaxis = (data.airway === 'Yes' || data.circulatory === 'Yes') && data.skin === 'Yes';
      return {
        triage: isAnaphylaxis ? 'CRITICAL ANAPHYLACTIC SHOCK - USE EPIPEN & CALL 911' : 'ALLERGY SCREEN',
        triageClass: isAnaphylaxis ? 'danger' : 'info',
        impression: isAnaphylaxis ? 'ANAPHYLACTIC SHOCK: Impending airway obstruction and vascular collapse.' : 'Localized allergic reaction.',
        redFlags: ['Throat closure', 'Low blood pressure', 'Wheezing'],
        doctorAdvice: isAnaphylaxis ? 'Inject Epinephrine 0.3mg IM into outer thigh IMMEDIATELY. Call 911.' : 'Take oral antihistamines.',
        labTests: ['Serum Tryptase'],
        questionsForDoctor: ['Do I need an observation period for biphasic anaphylaxis reaction?'],
        medicationWarnings: 'Epinephrine is the ONLY first-line life-saving treatment for anaphylaxis. Antihistamines are insufficient!'
      };
    }
  },
  {
    id: 74,
    categoryId: 'emergency',
    categoryName: 'Emergency Red Flags',
    title: 'Sepsis Danger Signals Check',
    summary: 'Evaluates qSOFA score (Quick Sequential Organ Failure Assessment).',
    fields: [
      { name: 'respRate', label: 'Respiratory Rate > 22 breaths per minute?', type: 'select', options: ['Yes', 'No', 'Unsure (Breathing very fast)'] },
      { name: 'mentalState', label: 'Altered Mental Status / Confusion?', type: 'select', options: ['Yes', 'No'] },
      { name: 'sysBp', label: 'Systolic Blood Pressure < 100 mmHg?', type: 'select', options: ['Yes', 'No', 'Unsure (Fainting/Weak)'] }
    ],
    evaluate: (data) => {
      const qSofaCount = [data.respRate.includes('Yes'), data.mentalState === 'Yes', data.sysBp.includes('Yes')].filter(Boolean).length;
      return {
        triage: qSofaCount >= 2 ? 'CRITICAL SEPSIS WARNING - PROCEED TO ER' : 'INFECTION EVALUATION',
        triageClass: qSofaCount >= 2 ? 'danger' : 'info',
        impression: qSofaCount >= 2 ? 'HIGH RISK OF SEPSIS & SEPTIC SHOCK (qSOFA score >= 2).' : 'Low immediate sepsis probability.',
        redFlags: ['Confusion', 'Rapid breathing', 'Mottled skin'],
        doctorAdvice: qSofaCount >= 2 ? 'Proceed to Emergency Department IMMEDIATELY for IV antibiotics and fluid resuscitation.' : 'See primary care doctor.',
        labTests: ['Stat Blood Cultures x2', 'Serum Lactate', 'CBC & Metabolic Panel'],
        questionsForDoctor: ['What is the infection source (Urine, Lungs, Abdomen, Skin)?'],
        medicationWarnings: 'Sepsis requires early goal-directed therapy within the first 1 hour.'
      };
    }
  },
  {
    id: 75,
    categoryId: 'emergency',
    categoryName: 'Emergency Red Flags',
    title: 'Acute Appendicitis & Peritoneal Signs Check',
    summary: 'Screens McBurney’s point tenderness, Rovsing sign, & guarding.',
    fields: [
      { name: 'migratingPain', label: 'Pain started near belly button then moved to Right Lower Abdomen?', type: 'select', options: ['Yes', 'No'] },
      { name: 'guarding', label: 'Abdomen feels hard/rigid like a board?', type: 'select', options: ['Yes', 'No'] },
      { name: 'anorexia', label: 'Loss of appetite & nausea?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isAppendicitis = data.migratingPain === 'Yes' && (data.guarding === 'Yes' || data.anorexia === 'Yes');
      return {
        triage: isAppendicitis ? 'URGENT SURGICAL EMERGENCY - ACUTE APPENDICITIS' : 'GI EVALUATION',
        triageClass: isAppendicitis ? 'danger' : 'info',
        impression: isAppendicitis ? 'SUSPECTED ACUTE APPENDICITIS. Risk of rupture and peritonitis.' : 'Nonspecific abdominal pain.',
        redFlags: ['Right lower quadrant rebound pain', 'Abdominal rigidity', 'Fever'],
        doctorAdvice: isAppendicitis ? 'Go to ER. Do NOT eat or drink anything (Keep NPO for surgery).' : 'See general practitioner.',
        labTests: ['CT Abdomen & Pelvis with IV Contrast', 'Complete Blood Count (WBC)'],
        questionsForDoctor: ['Does the patient require laparoscopic appendectomy?'],
        medicationWarnings: 'Do NOT give laxatives or heating pads over suspected appendicitis (Risk of rupture).'
      };
    }
  },
  {
    id: 76,
    categoryId: 'emergency',
    categoryName: 'Emergency Red Flags',
    title: 'Meningitis Triad Pre-Doctor Check',
    summary: 'Screens Kernig/Brudzinski signs, nuchal rigidity, & petechial rash.',
    fields: [
      { name: 'stiffNeck', label: 'Stiff Neck: Inability to touch chin to chest?', type: 'select', options: ['Yes', 'No'] },
      { name: 'feverPhotophobia', label: 'High Fever & extreme sensitivity to light (Photophobia)?', type: 'select', options: ['Yes', 'No'] },
      { name: 'petechiae', label: 'Purple/red non-blanching spotty skin rash?', type: 'select', options: ['Yes (Meningococcal rash)', 'No'] }
    ],
    evaluate: (data) => {
      const isMeningitis = data.stiffNeck === 'Yes' && data.feverPhotophobia === 'Yes';
      return {
        triage: isMeningitis ? 'CRITICAL MENINGITIS EMERGENCY - CALL 911' : 'FEVER WORKUP',
        triageClass: isMeningitis ? 'danger' : 'info',
        impression: isMeningitis ? 'SUSPECTED ACUTE BACTERIAL MENINGITIS OR MENINGOCOCCEMIA.' : 'Viral syndrome without meningismus.',
        redFlags: ['Nuchal rigidity', 'Photophobia', 'Non-blanching petechial rash'],
        doctorAdvice: isMeningitis ? 'Emergency Department transport immediately. Droplet isolation precautions.' : 'Routine clinical visit.',
        labTests: ['Lumbar Puncture (CSF Analysis)', 'Blood Cultures', 'Head CT before LP'],
        questionsForDoctor: ['Should empirical IV Ceftriaxone + Vancomycin + Dexamethasone be started immediately?'],
        medicationWarnings: 'Empirical IV antibiotics must NOT be delayed if lumbar puncture is delayed!'
      };
    }
  },
  {
    id: 77,
    categoryId: 'emergency',
    categoryName: 'Emergency Red Flags',
    title: 'Deep Vein Thrombosis (DVT) & PE Alert',
    summary: 'Calculates Wells’ Criteria for DVT and Pulmonary Embolism.',
    fields: [
      { name: 'calfSwelling', label: 'Unilateral calf swelling (>3 cm difference) & tenderness?', type: 'select', options: ['Yes', 'No'] },
      { name: 'riskFactors', label: 'Recent long flight, surgery, immobilization, or active cancer?', type: 'select', options: ['Yes', 'No'] },
      { name: 'chestPainDyspnea', label: 'Sudden shortness of breath or sharp chest pain on inspiration?', type: 'select', options: ['Yes (PE signs)', 'No'] }
    ],
    evaluate: (data) => {
      const isDVT = data.calfSwelling === 'Yes' && data.riskFactors === 'Yes';
      const isPE = isDVT || data.chestPainDyspnea.includes('Yes');
      return {
        triage: isPE ? 'URGENT DVT / PULMONARY EMBOLISM EVALUATION' : 'ROUTINE VENOUS EVAL',
        triageClass: isPE ? 'danger' : 'info',
        impression: isPE ? 'HIGH PROBABILITY FOR VENOUS THROMBOEMBOLISM (DVT / PE).' : 'Low DVT clinical probability.',
        redFlags: ['Asymmetrical leg swelling', 'Hemoptysis', 'Sharp pleuritic chest pain'],
        doctorAdvice: isPE ? 'Proceed to Emergency Care for Venous Duplex Doppler Ultrasound and CT Pulmonary Angiogram.' : 'Elevate legs and stay active.',
        labTests: ['D-Dimer Assay', 'Venous Duplex Ultrasound Leg', 'CT Pulmonary Angiography (CTPA)'],
        questionsForDoctor: ['What is my Wells Score?', 'Do I require therapeutic anticoagulation (Heparin / DOAC)?'],
        medicationWarnings: 'Do NOT massage a swollen tender calf (Risk of dislodging thrombus to lungs).'
      };
    }
  },
  {
    id: 78,
    categoryId: 'emergency',
    categoryName: 'Emergency Red Flags',
    title: 'Acute Glaucoma Intraocular Pressure Alert',
    summary: 'Evaluates acute red eye, hazy cornea, & fixed mid-dilated pupil.',
    fields: [
      { name: 'eyePainHeadache', label: 'Severe eye pain accompanied by headache & vomiting?', type: 'select', options: ['Yes', 'No'] },
      { name: 'halos', label: 'Seeing rainbow-colored halos around lights?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isGlaucoma = data.eyePainHeadache === 'Yes' && data.halos === 'Yes';
      return {
        triage: isGlaucoma ? 'EMERGENCY OPHTHALMIC GLAUCOMA ALERT' : 'EYE EVALUATION',
        triageClass: isGlaucoma ? 'danger' : 'info',
        impression: isGlaucoma ? 'ACUTE ANGLE-CLOSURE GLAUCOMA: Sudden spike in intraocular pressure (>40 mmHg).' : 'Non-emergent ocular discomfort.',
        redFlags: ['Severe eye pain', 'Steamy/hazy cornea', 'Fixed mid-dilated pupil'],
        doctorAdvice: isGlaucoma ? 'Emergency Eye Clinic or ER immediately to prevent optic nerve atrophy and permanent blindness.' : 'Schedule routine eye check.',
        labTests: ['Stat Tonometry', 'Gonioscopy'],
        questionsForDoctor: ['Does the patient require emergency Timolol/Acetazolamide drops or Laser Peripheral Iridotomy?'],
        medicationWarnings: 'Anticholinergic and antihistamine pills can precipitate acute angle closure.'
      };
    }
  },
  {
    id: 79,
    categoryId: 'emergency',
    categoryName: 'Emergency Red Flags',
    title: 'Diabetic Ketoacidosis (DKA) Danger Pre-Check',
    summary: 'Recognizes Kussmaul breathing, fruity breath, & severe hyperglycemia.',
    fields: [
      { name: 'bloodGlucose', label: 'Blood Glucose Reading (mg/dL)', type: 'text', placeholder: 'e.g. 380' },
      { name: 'breathSymptoms', label: 'Fruity breath odor, deep rapid breathing, or nausea/vomiting?', type: 'select', options: ['Yes', 'No'] },
      { name: 'urineKetones', label: 'Urine Ketones present on dipstick?', type: 'select', options: ['Yes (Moderate/Large ketones)', 'No', 'Not tested'] }
    ],
    evaluate: (data) => {
      const bg = parseInt(data.bloodGlucose) || 150;
      const isDKA = (bg > 250 && data.breathSymptoms === 'Yes') || data.urineKetones.includes('Yes');
      return {
        triage: isDKA ? 'CRITICAL DIABETIC KETOACIDOSIS (DKA) EMERGENCY' : 'HYPERGLYCEMIA CHECK',
        triageClass: isDKA ? 'danger' : 'info',
        impression: isDKA ? 'DIABETIC KETOACIDOSIS (DKA) SUSPECTED: Severe metabolic acidosis, anion gap elevation, and dehydration.' : 'Hyperglycemia without acute ketoacidosis.',
        redFlags: ['Glucose > 250 mg/dL with ketones', 'Kussmaul hyperventilation', 'Altered sensorium'],
        doctorAdvice: isDKA ? 'Proceed to ER immediately for IV regular insulin and isotonic saline fluid resuscitation.' : 'Administer corrective insulin bolus.',
        labTests: ['Stat Arterial / Venous Blood Gas (pH & Bicarbonate)', 'Serum Beta-Hydroxybutyrate (Ketones)', 'Anion Gap & Electrolytes'],
        questionsForDoctor: ['What is the patient’s anion gap and serum potassium level?'],
        medicationWarnings: 'Never withhold basal insulin even when nauseous or vomiting!'
      };
    }
  },
  {
    id: 80,
    categoryId: 'emergency',
    categoryName: 'Emergency Red Flags',
    title: 'Severe Hypertensive Crisis Alert',
    summary: 'Distinguishes Hypertensive Urgency vs Emergency (End-organ damage).',
    fields: [
      { name: 'bpReading', label: 'Blood Pressure Reading', type: 'text', placeholder: 'e.g. 195/115' },
      { name: 'organDamage', label: 'Select any active symptoms', type: 'multiselect', options: ['Chest pain / Shortness of breath', 'Severe headache / Confusion', 'Blurred vision / Blind spots', 'Hematuria (blood in urine)', 'None'] }
    ],
    evaluate: (data) => {
      const sys = parseInt(data.bpReading) || 140;
      const isEmergency = sys >= 180 && (data.organDamage && data.organDamage.length > 0 && !data.organDamage.includes('None'));
      const isUrgency = sys >= 180 && (!data.organDamage || data.organDamage.includes('None'));
      return {
        triage: isEmergency ? 'CRITICAL HYPERTENSIVE EMERGENCY - ER' : isUrgency ? 'URGENT HYPERTENSIVE URGENCY WORKUP' : 'BP EVALUATION',
        triageClass: isEmergency ? 'danger' : isUrgency ? 'warning' : 'success',
        impression: isEmergency ? 'HYPERTENSIVE EMERGENCY: Acute end-organ failure (Encephalopathy, Aortic Dissection, Acute Kidney Injury).' : isUrgency ? 'HYPERTENSIVE URGENCY: Severe BP elevation without acute end-organ damage.' : 'Acceptable BP range.',
        redFlags: ['BP > 180/120 with headache, chest pain, or vision loss'],
        doctorAdvice: isEmergency ? 'Transport to ER immediately for titratable IV antihypertensives (Labetalol/Nicardipine).' : 'Adjust oral medication under clinical supervision.',
        labTests: ['ECG', 'Troponin', 'Serum Creatinine', 'Fundoscopic Eye Exam', 'Head CT (if neurological)'],
        questionsForDoctor: ['What is the target rate of BP reduction (Max 25% drop in 1st hour)?'],
        medicationWarnings: 'Rapidly dropping BP too fast in hypertensive urgency can precipitate cerebral ischemic stroke!'
      };
    }
  },

  // ==========================================
  // DOMAIN 9: DOCTOR CONSULTATION PREPARATION (81 - 90)
  // ==========================================
  {
    id: 81,
    categoryId: 'prep',
    categoryName: 'Doctor Consultation Prep',
    title: 'Pre-Appointment Clinical Question Generator',
    summary: 'Generates high-yield evidence-based questions tailored to your symptoms.',
    fields: [
      { name: 'mainConcern', label: 'Primary Health Concern', type: 'text', placeholder: 'e.g. Chronic knee pain / New blood pressure pill' },
      { name: 'goal', label: 'Consultation Goal', type: 'select', options: ['Get a clear diagnosis', 'Review medication side effects', 'Discuss surgical vs non-surgical options', 'Get a second opinion'] }
    ],
    evaluate: (data) => {
      return {
        triage: 'DOCTOR CONSULTATION PREPARATION READY',
        triageClass: 'info',
        impression: `Tailored preparation plan for addressing "${data.mainConcern || 'Health Concern'}".`,
        redFlags: ['Forgetting key symptom timelines', 'Not reporting OTC supplements'],
        doctorAdvice: 'Write down your top 3 questions on paper or phone before entering the exam room.',
        labTests: ['Relevant history dossier'],
        questionsForDoctor: [
          `What is the most likely underlying cause of my ${data.mainConcern || 'symptoms'}?`,
          `Are there any alternative non-pharmacological or lifestyle options available?`,
          `What specific symptoms should prompt me to contact your office or go to urgent care?`,
          `When should I schedule a follow-up appointment to check progress?`
        ],
        medicationWarnings: 'Always ask: "How will this new prescription interact with my existing medications?"'
      };
    }
  },
  {
    id: 82,
    categoryId: 'prep',
    categoryName: 'Doctor Consultation Prep',
    title: 'Prescription Review & Refill Organizer',
    summary: 'Organizes pill dosages, refill dates, and drug reconciliation lists.',
    fields: [
      { name: 'pillCount', label: 'Number of active prescription bottles', type: 'text', placeholder: 'e.g. 5' },
      { name: 'refillNeeded', label: 'Any prescriptions running low (<7 days remaining)?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      return {
        triage: 'MEDICATION RECONCILIATION PREP',
        triageClass: 'success',
        impression: 'Organized medication summary ready for physician review.',
        redFlags: ['Running out of essential medications (Beta-blockers, Insulin, Anticonvulsants)'],
        doctorAdvice: 'Request 90-day mail-order refills for chronic stable medications to save costs.',
        labTests: ['Therapeutic Drug Level Monitoring if indicated'],
        questionsForDoctor: ['Can my prescriptions be consolidated to a single daily dosing schedule?', 'Are generic equivalents available for my brand-name medications?'],
        medicationWarnings: 'Never permit a lapse in chronic daily medications.'
      };
    }
  },
  {
    id: 83,
    categoryId: 'prep',
    categoryName: 'Doctor Consultation Prep',
    title: 'Symptom Timeline & Trigger Log Builder',
    summary: 'Structures symptom onset, frequency, intensity (1-10), & relief factors.',
    fields: [
      { name: 'symptomName', label: 'Symptom Name', type: 'text', placeholder: 'e.g. Migraine / Stomach ache' },
      { name: 'durationDays', label: 'How long has this been occurring?', type: 'text', placeholder: 'e.g. 3 weeks' },
      { name: 'severityScale', label: 'Severity (1 to 10)', type: 'select', options: ['Mild (1-3)', 'Moderate (4-6)', 'Severe (7-9)', 'Unbearable (10)'] }
    ],
    evaluate: (data) => {
      return {
        triage: 'CLINICAL SYMPTOM LOG GENERATED',
        triageClass: 'info',
        impression: `Structured clinical timeline created for ${data.symptomName || 'symptoms'} over ${data.durationDays || 'recent duration'}.`,
        redFlags: ['Rapid progression in severity from 3 to 9 in short timeframe'],
        doctorAdvice: 'Doctors rely heavily on chronological history (OPQRST method: Onset, Provocation, Quality, Radiation, Severity, Time).',
        labTests: ['Symptom-guided diagnostic panel'],
        questionsForDoctor: ['Does the chronological pattern of my symptoms suggest an autoimmune, infectious, or metabolic cause?'],
        medicationWarnings: 'Log precise times when medications were taken relative to symptom spikes.'
      };
    }
  },
  {
    id: 84,
    categoryId: 'prep',
    categoryName: 'Doctor Consultation Prep',
    title: 'Medical History & Allergy Summary Card',
    summary: 'Compiles chronic diagnoses, past surgeries, & true drug allergies (Anaphylaxis vs GI intolerance).',
    fields: [
      { name: 'allergies', label: 'Known Drug Allergies & Reaction Type', type: 'text', placeholder: 'e.g. Penicillin (Hives), Aspirin (Asthma)' },
      { name: 'surgeries', label: 'Past Surgeries / Hospitalizations', type: 'text', placeholder: 'e.g. Appendectomy 2018' }
    ],
    evaluate: (data) => {
      return {
        triage: 'PATIENT MEDICAL SUMMARY CARD',
        triageClass: 'success',
        impression: 'Comprehensive medical history ready for electronic health record (EHR) integration.',
        redFlags: ['Mislabeling simple side effects (nausea) as true IgE allergies'],
        doctorAdvice: 'Differentiate true IgE allergic reactions (anaphylaxis, hives) from minor drug intolerances (stomach upset).',
        labTests: ['ImmunoCAP IgE testing if allergy history unclear'],
        questionsForDoctor: ['Is my recorded Penicillin allergy a true allergy or an childhood intolerance that can be delabeled?'],
        medicationWarnings: 'Always carry a wallet card listing severe anaphylactic drug allergies.'
      };
    }
  },
  {
    id: 85,
    categoryId: 'prep',
    categoryName: 'Doctor Consultation Prep',
    title: 'Family History Risk Factor Profiler',
    summary: 'Evaluates hereditary risks (Premature CAD, Colon Cancer, Diabetes, BRCA).',
    fields: [
      { name: 'firstDegreeHistory', label: 'Family history in parents or siblings', type: 'multiselect', options: ['Heart Attack before age 55', 'Colon Cancer', 'Breast / Ovarian Cancer', 'Type 2 Diabetes', 'Stroke', 'None'] }
    ],
    evaluate: (data) => {
      const hasHighRisk = data.firstDegreeHistory && data.firstDegreeHistory.length > 0 && !data.firstDegreeHistory.includes('None');
      return {
        triage: hasHighRisk ? 'HEREDITARY RISK PRE-CHECK POSITIVE' : 'AVERAGE POPULATION RISK',
        triageClass: hasHighRisk ? 'warning' : 'success',
        impression: hasHighRisk ? 'Identified first-degree familial predisposition requiring early diagnostic screening.' : 'Standard age-appropriate screening guidelines.',
        redFlags: ['Multiple family members with same cancer type under age 50'],
        doctorAdvice: 'If first-degree relative had colon cancer, screening colonoscopy starts 10 years earlier than their age of diagnosis.',
        labTests: ['Genetic Risk Panels (BRCA1/2, Lynch Syndrome)', 'Early Screening Mammogram / Colonoscopy / Lp(a)'],
        questionsForDoctor: ['Should I begin cancer or cardiac screening earlier based on my family history?', 'Is genetic counseling recommended for my family tree?'],
        medicationWarnings: 'Familial Hypercholesterolemia often requires early statin intervention.'
      };
    }
  },
  {
    id: 86,
    categoryId: 'prep',
    categoryName: 'Doctor Consultation Prep',
    title: 'Specialist Matching (Symptom-to-Doctor Finder)',
    summary: 'Directs symptoms to Cardiology, Gastroenterology, Neurology, Endocrine, or Rheumatology.',
    fields: [
      { name: 'systemFocus', label: 'Primary Symptom Cluster', type: 'select', options: ['Joint pain + Morning stiffness (Rheumatology)', 'Palpitations + Breathlessness (Cardiology)', 'Chronic diarrhea + Abdominal pain (Gastroenterology)', 'Tremors + Memory loss (Neurology)', 'Hormone imbalance + Weight changes (Endocrinology)'] }
    ],
    evaluate: (data) => {
      return {
        triage: 'SPECIALIST REFERRAL DIRECTIVE',
        triageClass: 'info',
        impression: `Recommended Sub-Specialty Referral: ${data.systemFocus.split('(')[1]?.replace(')', '') || 'General Internal Medicine'}.`,
        redFlags: ['Bypassing primary care when symptoms are systemic'],
        doctorAdvice: 'Ask your primary care doctor for a referral letter to the appropriate specialist with relevant lab tests attached.',
        labTests: ['Specialist-specific baseline panel'],
        questionsForDoctor: ['Do I need a formal referral letter for insurance coverage to see this specialist?'],
        medicationWarnings: 'Ensure all sub-specialists have access to your complete unified medication list.'
      };
    }
  },
  {
    id: 87,
    categoryId: 'prep',
    categoryName: 'Doctor Consultation Prep',
    title: 'Side Effect vs Disease Symptom Distinguisher',
    summary: 'Determines if a new symptom is an adverse drug reaction (ADR) or disease progression.',
    fields: [
      { name: 'newSymptom', label: 'New Symptom Experienced', type: 'text', placeholder: 'e.g. Dry cough / Ankle swelling' },
      { name: 'timingRelation', label: 'Did symptom start shortly after starting a new pill?', type: 'select', options: ['Yes (Within days to weeks of new pill)', 'No (Symptom preceded medication)'] }
    ],
    evaluate: (data) => {
      const isADR = data.timingRelation.includes('Yes');
      return {
        triage: isADR ? 'SUSPECTED ADVERSE DRUG REACTION (ADR)' : 'DISEASE PROGRESSION EVALUATION',
        triageClass: isADR ? 'warning' : 'info',
        impression: isADR ? 'High temporal correlation with recent drug initiation. Suspected Adverse Drug Reaction.' : 'Symptom likely represents underlying primary disease state.',
        redFlags: ['Severe rash with mucosal blisters (Stevens-Johnson Syndrome alert)'],
        doctorAdvice: 'Do NOT stop essential medications without consulting your doctor. A drug substitute may be available.',
        labTests: ['De-challenge / Re-challenge clinical evaluation'],
        questionsForDoctor: ['Could my new symptom be a side effect of the pill I started recently?', 'Is there a different class of medication that does not cause this side effect?'],
        medicationWarnings: 'Avoid "Prescribing Cascades" where a 2nd drug is prescribed to treat the side effect of the 1st drug!'
      };
    }
  },
  {
    id: 88,
    categoryId: 'prep',
    categoryName: 'Doctor Consultation Prep',
    title: 'OTC vs Prescription Substitution Guide',
    summary: 'Compares bioequivalent generic active ingredients and cost-saving alternatives.',
    fields: [
      { name: 'brandName', label: 'Brand Name Medication', type: 'text', placeholder: 'e.g. Tylenol / Lipitor / Nexium' }
    ],
    evaluate: (data) => {
      return {
        triage: 'GENERIC & BIOEQUIVALENT ANALYSIS',
        triageClass: 'success',
        impression: `Active pharmaceutical ingredient identified for ${data.brandName || 'Brand Drug'}. Generic versions contain identical active molecule, strength, and therapeutic efficacy at lower cost.`,
        redFlags: ['Switching narrow therapeutic index drugs (Thyroid, Antiepileptics) without doctor oversight'],
        doctorAdvice: 'Ask your pharmacist if an AB-rated FDA generic is available for your brand prescription.',
        labTests: ['Therapeutic bioequivalence check'],
        questionsForDoctor: ['Is a generic bioequivalent pill acceptable for my prescription?'],
        medicationWarnings: 'Inactive binders and dyes may differ between generics, but active drug efficacy is identical.'
      };
    }
  },
  {
    id: 89,
    categoryId: 'prep',
    categoryName: 'Doctor Consultation Prep',
    title: 'Medical Terminology & Jargon Translator',
    summary: 'Translates complex medical chart notes (e.g. Idiopathic, Dyspnea, Pruritus, Benign) into lay terms.',
    fields: [
      { name: 'jargonTerm', label: 'Medical Term from Chart Note', type: 'text', placeholder: 'e.g. Idiopathic / Dyspnea / Edema / Erythema' }
    ],
    evaluate: (data) => {
      const term = (data.jargonTerm || '').toLowerCase();
      let translation = 'Medical term translated for patient empowerment.';
      if (term.includes('idiopathic')) translation = '"Idiopathic" means the condition arises spontaneously with no clear known cause.';
      else if (term.includes('dyspnea')) translation = '"Dyspnea" simply means shortness of breath or difficulty breathing.';
      else if (term.includes('edema')) translation = '"Edema" refers to swelling caused by excess fluid trapped in bodily tissues.';
      else if (term.includes('erythema')) translation = '"Erythema" means redness of the skin caused by increased blood flow.';
      
      return {
        triage: 'MEDICAL TRANSLATION COMPLETE',
        triageClass: 'info',
        impression: translation,
        redFlags: ['Misinterpreting medical chart shorthand'],
        doctorAdvice: 'Never hesitate to ask your doctor: "What does that medical term mean in plain plain terms?"',
        labTests: ['Glossary reference'],
        questionsForDoctor: ['Can you clarify what this diagnosis term means for my daily life?'],
        medicationWarnings: 'Understanding your diagnosis improves medication adherence and health outcomes.'
      };
    }
  },
  {
    id: 90,
    categoryId: 'prep',
    categoryName: 'Doctor Consultation Prep',
    title: 'Second Opinion Preparation Checklist',
    summary: 'Compiles pathology reports, operative notes, & imaging DICOM files for a 2nd opinion.',
    fields: [
      { name: 'diagnosisCategory', label: 'Diagnosis Requiring Second Opinion', type: 'select', options: ['Oncology / Cancer Diagnosis', 'Major Surgical Recommendation', 'Unclear / Rare Chronic Condition'] }
    ],
    evaluate: (data) => {
      return {
        triage: 'SECOND OPINION DOSSIER READY',
        triageClass: 'info',
        impression: 'Checklist created for obtaining an unbiased, independent second clinical opinion.',
        redFlags: ['Withholding medical records from the second opinion doctor'],
        doctorAdvice: 'Good doctors welcome second opinions! Request your complete medical record file including imaging CDs (DICOM) and pathology slides.',
        labTests: ['Independent Histopathology Re-evaluation'],
        questionsForDoctor: ['Do the findings on my imaging and biopsy conclusively confirm this diagnosis?', 'What are the alternative evidence-based treatment pathways available?'],
        medicationWarnings: 'Ensure all previous drug trials and failure dates are documented.'
      };
    }
  },

  // ==========================================
  // DOMAIN 10: SIDE EFFECTS & COMPATIBILITY (91 - 100)
  // ==========================================
  {
    id: 91,
    categoryId: 'side_effects',
    categoryName: 'Side Effects & Compatibility',
    title: 'Dry Cough from ACE-Inhibitors vs URI Check',
    summary: 'Distinguishes Bradykinin-induced Lisinopril cough from respiratory infection.',
    fields: [
      { name: 'aceInhibitor', label: 'Taking Lisinopril, Enalapril, or Ramipril?', type: 'select', options: ['Yes', 'No'] },
      { name: 'coughType', label: 'Cough characteristics', type: 'select', options: ['Dry tickling non-productive cough', 'Wet productive cough with phlegm'] },
      { name: 'fever', label: 'Fever or sore throat present?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isAceCough = data.aceInhibitor === 'Yes' && data.coughType.includes('Dry tickling') && data.fever === 'No';
      return {
        triage: isAceCough ? 'ACE-INHIBITOR BRADYKININ COUGH SUSPECTED' : 'RESPIRATORY INFECTION CHECK',
        triageClass: isAceCough ? 'warning' : 'info',
        impression: isAceCough ? 'Bradykinin and Substance P accumulation causing class-effect ACE-inhibitor dry cough (Occurs in 5-20% of patients).' : 'Infectious or allergic cough.',
        redFlags: ['Lip or tongue swelling (Angioedema emergency!)'],
        doctorAdvice: isAceCough ? 'Cough will NOT respond to cough syrups. Your doctor can easily switch you to an ARB (Losartan/Valsartan) which does not cause cough.' : 'Treat URI supportively.',
        labTests: ['None - Clinical drug switch'],
        questionsForDoctor: ['Can we switch my Lisinopril to an ARB (Losartan) to eliminate my dry cough?'],
        medicationWarnings: 'ACE-inhibitor cough can develop months after starting the drug.'
      };
    }
  },
  {
    id: 92,
    categoryId: 'side_effects',
    categoryName: 'Side Effects & Compatibility',
    title: 'Muscle Pain from Statins (Myalgia vs Rhabdomyolysis)',
    summary: 'Screens Creatine Kinase (CK) elevation and statin-associated muscle symptoms (SAMS).',
    fields: [
      { name: 'statinName', label: 'Statin Medication Taken', type: 'select', options: ['Atorvastatin', 'Rosuvastatin', 'Simvastatin', 'Pravastatin', 'None'] },
      { name: 'musclePain', label: 'Symmetrical aching pain in large muscles (Thighs/Shoulders)?', type: 'select', options: ['Yes', 'No'] },
      { name: 'urineColor', label: 'Dark tea-colored or cola-colored urine?', type: 'select', options: ['Yes (Tea/Cola urine)', 'No (Normal urine)'] }
    ],
    evaluate: (data) => {
      const isRhabdo = data.urineColor.includes('Tea/Cola');
      const isMyalgia = data.musclePain === 'Yes';
      return {
        triage: isRhabdo ? 'EMERGENCY RHABDOMYOLYSIS ALERT' : isMyalgia ? 'STATIN MYALGIA EVALUATION' : 'STABLE STATIN PROFILE',
        triageClass: isRhabdo ? 'danger' : isMyalgia ? 'warning' : 'success',
        impression: isRhabdo ? 'RHABDOMYOLYSIS HAZARD: Severe muscle necrosis releasing myoglobin, risking Acute Tubular Necrosis renal failure.' : isMyalgia ? 'Statin-Associated Muscle Symptoms (SAMS).' : 'Normal muscle baseline.',
        redFlags: ['Dark cola-colored urine', 'Profound muscle weakness'],
        doctorAdvice: isRhabdo ? 'Stop Statin immediately and go to ER for IV hydration.' : 'Temporarily pause statin for 2-4 weeks to see if pain resolves.',
        labTests: ['Serum Creatine Kinase (CK)', 'Serum Creatinine & Myoglobin', 'Serum Vitamin D'],
        questionsForDoctor: ['What is my Serum Creatine Kinase (CK) level?', 'Can I try alternate-day Rosuvastatin or switch to Ezetimibe/PCSK9 inhibitor?'],
        medicationWarnings: 'Low Vitamin D levels predispose patients to statin myalgia.'
      };
    }
  },
  {
    id: 93,
    categoryId: 'side_effects',
    categoryName: 'Side Effects & Compatibility',
    title: 'Weight Gain from Antidepressants / Steroids Check',
    summary: 'Evaluates metabolic appetite stimulation from Mirtazapine, Olanzapine, or Prednisone.',
    fields: [
      { name: 'medClass', label: 'Medication started recently', type: 'select', options: ['Corticosteroids (Prednisone)', 'Atypical Antidepressant (Mirtazapine)', 'Antipsychotic (Olanzapine/Quetiapine)', 'None'] },
      { name: 'weightGained', label: 'Weight gained since starting drug', type: 'select', options: ['> 5 lbs (2.5 kg)', '1-4 lbs', 'No weight change'] }
    ],
    evaluate: (data) => {
      const isWeightGain = data.medClass !== 'None' && data.weightGained.includes('> 5 lbs');
      return {
        triage: isWeightGain ? 'DRUG-INDUCED METABOLIC WEIGHT GAIN' : 'WEIGHT STABLE PROFILE',
        triageClass: isWeightGain ? 'warning' : 'success',
        impression: isWeightGain ? 'Drug-induced H1/5-HT2C receptor antagonism or glucocorticoid fluid retention causing weight gain.' : 'No metabolic drug disruption.',
        redFlags: ['Rapid facial puffiness and abdominal striae (Cushingoid syndrome)'],
        doctorAdvice: 'Monitor waist circumference and fasting blood sugar regularly.',
        labTests: ['Fasting Lipid Panel', 'Fasting Plasma Glucose & HbA1c'],
        questionsForDoctor: ['Is there a weight-neutral alternative medication for my condition (e.g. Bupropion or SSRI)?'],
        medicationWarnings: 'Never stop psychiatric or steroid medications abruptly without medical guidance.'
      };
    }
  },
  {
    id: 94,
    categoryId: 'side_effects',
    categoryName: 'Side Effects & Compatibility',
    title: 'Insomnia from Bronchodilators / Decongestants Check',
    summary: 'Identifies sleep disturbance from sympathomimetic Beta-agonists and Pseudoephedrine.',
    fields: [
      { name: 'stimulantMeds', label: 'Taking Pseudoephedrine, Salbutamol, or Steroid Inhalers near bedtime?', type: 'select', options: ['Yes', 'No'] },
      { name: 'sleepPattern', label: 'Difficulty falling asleep or staying awake late?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isStimulated = data.stimulantMeds === 'Yes' && data.sleepPattern === 'Yes';
      return {
        triage: isStimulated ? 'SYMPATHOMIMETIC INSOMNIA ALERT' : 'NORMAL SLEEP ARCHITECTURE',
        triageClass: isStimulated ? 'warning' : 'success',
        impression: isStimulated ? 'Central nervous system beta-1/alpha-1 adrenergic stimulation disrupting sleep architecture.' : 'Unaffected sleep cycle.',
        redFlags: ['Palpitations and high nighttime blood pressure'],
        doctorAdvice: 'Take morning-only doses of oral decongestants. Avoid taking Salbutamol rescue inhalers right before bed unless acutely breathless.',
        labTests: ['Sleep hygiene assessment'],
        questionsForDoctor: ['Can I switch to a non-sedating intranasal steroid instead of oral decongestants?'],
        medicationWarnings: 'OTC cold remedies often hide caffeine and pseudoephedrine.'
      };
    }
  },
  {
    id: 95,
    categoryId: 'side_effects',
    categoryName: 'Side Effects & Compatibility',
    title: 'Peripheral Edema from Calcium Channel Blockers Check',
    summary: 'Evaluates vasodilation-induced ankle swelling from Amlodipine.',
    fields: [
      { name: 'amlodipineDose', label: 'Taking Amlodipine or Nifedipine?', type: 'select', options: ['Yes (10 mg daily)', 'Yes (5 mg daily)', 'No'] },
      { name: 'ankleSwelling', label: 'Bilateral pitting ankle / lower leg swelling?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isCcbEdema = data.amlodipineDose.includes('Yes') && data.ankleSwelling === 'Yes';
      return {
        triage: isCcbEdema ? 'CALCIUM CHANNEL BLOCKER EDEMA SUSPECTED' : 'NORMAL FLUID BALANCE',
        triageClass: isCcbEdema ? 'warning' : 'success',
        impression: isCcbEdema ? 'Arteriolar precapillary vasodilation without venular dilation causing fluid extravasation into lower limbs.' : 'No peripheral pooling.',
        redFlags: ['Unilateral leg swelling with pain (Rule out DVT)', 'Shortness of breath (Rule out Heart Failure)'],
        doctorAdvice: 'Amlodipine edema is NOT fluid overload and does NOT respond well to loop diuretics. Adding an ACE-inhibitor/ARB dilates post-capillary venules and reduces edema.',
        labTests: ['Serum Creatinine', 'Serum Albumin', 'Urinalysis'],
        questionsForDoctor: ['Should we add an ACE-inhibitor (Lisinopril) or lower my Amlodipine dose to reduce ankle swelling?'],
        medicationWarnings: 'Elevating feet when resting helps gravitational venous return.'
      };
    }
  },
  {
    id: 96,
    categoryId: 'side_effects',
    categoryName: 'Side Effects & Compatibility',
    title: 'Nausea & GI Upset Medication Compatibility',
    summary: 'Strategies to prevent GI mucosal irritation (Metformin, Iron, Antibiotics).',
    fields: [
      { name: 'troubleMed', label: 'Medication causing nausea / stomach upset', type: 'select', options: ['Metformin', 'Oral Iron (Ferrous Sulfate)', 'Antibiotics (Augmentin/Erythromycin)', 'NSAIDs', 'None'] },
      { name: 'takenWithFood', label: 'Do you take this pill with a full meal?', type: 'select', options: ['No (Taken on empty stomach)', 'Yes (Taken midway through meal)'] }
    ],
    evaluate: (data) => {
      const isEmptyStomach = data.takenWithFood.includes('empty stomach') && data.troubleMed !== 'None';
      return {
        triage: isEmptyStomach ? 'DISSOLVABLE MEAL-TIMING REVISION' : 'SAFE GI COMPATIBILITY',
        triageClass: isEmptyStomach ? 'info' : 'success',
        impression: isEmptyStomach ? 'Direct mucosal gastrointestinal irritation aggravated by empty stomach administration.' : 'Appropriate gastric administration.',
        redFlags: ['Severe persistent vomiting preventing oral hydration'],
        doctorAdvice: 'Switching to Metformin Extended-Release (XR) and taking it midway through your evening meal drastically reduces GI side effects.',
        labTests: ['Not applicable - gastric timing'],
        questionsForDoctor: ['Can I switch to Metformin XR (Extended Release)?', 'Should I try Ferrous Gluconate or IV iron instead of Ferrous Sulfate?'],
        medicationWarnings: 'Never crush or chew extended-release (XR/SR/EC) tablets!'
      };
    }
  },
  {
    id: 97,
    categoryId: 'side_effects',
    categoryName: 'Side Effects & Compatibility',
    title: 'Photosensitivity & Sun Exposure Med Warning',
    summary: 'Prevents severe phototoxic skin reactions from Doxycycline, Hydrochlorothiazide, & Amiodarone.',
    fields: [
      { name: 'photoMed', label: 'Taking Doxycycline, HCTZ, Amiodarone, or Naproxen?', type: 'select', options: ['Yes', 'No'] },
      { name: 'sunExposure', label: 'Plan to spend time in direct sunlight or UV tanning?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isPhotosensitive = data.photoMed === 'Yes' && data.sunExposure === 'Yes';
      return {
        triage: isPhotosensitive ? 'PHOTOTOXIC DRUG SUNBURN ALERT' : 'SAFE UV PROFILE',
        triageClass: isPhotosensitive ? 'warning' : 'success',
        impression: isPhotosensitive ? 'Drug absorption of UVA radiation creating singlet oxygen free radicals, causing exaggerated sunburn and blistering.' : 'Standard UV risk.',
        redFlags: ['Severe blistering sunburn after minimal sun exposure'],
        doctorAdvice: 'Apply broad-spectrum SPF 50+ sunscreen, wear wide-brimmed hats, and avoid direct peak sun (10 AM - 4 PM).',
        labTests: ['Dermatological assessment if blistering occurs'],
        questionsForDoctor: ['Is my current antibiotic or blood pressure pill a known photosensitizing agent?'],
        medicationWarnings: 'Phototoxicity can occur through window glass during driving.'
      };
    }
  },
  {
    id: 98,
    categoryId: 'side_effects',
    categoryName: 'Side Effects & Compatibility',
    title: 'Dry Mouth (Xerostomia) Drug Review',
    summary: 'Evaluates dental caries risk from Anticholinergic and Antidepressant dry mouth.',
    fields: [
      { name: 'anticholinergicCount', label: 'Taking Antihistamines, TCAs, Oxybutynin, or Antipsychotics?', type: 'select', options: ['Yes (Multiple dry-mouth pills)', 'Yes (1 pill)', 'No'] }
    ],
    evaluate: (data) => {
      const isXerostomia = data.anticholinergicCount.includes('Yes');
      return {
        triage: isXerostomia ? 'XEROSTOMIA & DENTAL CARIES PREVENTATIVE REVIEW' : 'NORMAL SALIVARY FLOW',
        triageClass: isXerostomia ? 'info' : 'success',
        impression: isXerostomia ? 'Inhibition of salivary muscarinic receptors causing reduced oral buffer capacity and rapid dental decay.' : 'Healthy salivary output.',
        redFlags: ['Rapid dental cavity formation', 'Oral candidiasis (Thrush)'],
        doctorAdvice: 'Sip water frequently, chew xylitol gum to stimulate saliva, and use artificial saliva sprays.',
        labTests: ['Dental examination'],
        questionsForDoctor: ['Can any of my dry-mouth medications be substituted for a non-anticholinergic pill?'],
        medicationWarnings: 'Lack of protective saliva drastically accelerates tooth enamel breakdown.'
      };
    }
  },
  {
    id: 99,
    categoryId: 'side_effects',
    categoryName: 'Side Effects & Compatibility',
    title: 'Hair Loss / Alopecia Med Safety Check',
    summary: 'Identifies Drug-Induced Telogen Effluvium (Valproate, Beta-blockers, Retinoids).',
    fields: [
      { name: 'hairLossOnSet', label: 'Did hair thinning start 2-4 months after starting a new pill?', type: 'select', options: ['Yes', 'No'] },
      { name: 'suspectDrugs', label: 'Taking Valproate, Metoprolol, Heparin, or High Vit A?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isTelogen = data.hairLossOnSet === 'Yes' && data.suspectDrugs === 'Yes';
      return {
        triage: isTelogen ? 'DRUG-INDUCED TELOGEN EFFLUVIUM SUSPECTED' : 'ROUTINE HAIR THINNING WORKUP',
        triageClass: isTelogen ? 'info' : 'success',
        impression: isTelogen ? 'Drug-induced shift of growing anagen hair follicles into premature resting telogen phase.' : 'Androgenetic or nutritional hair loss.',
        redFlags: ['Scalp lesions or scarring alopecia'],
        doctorAdvice: 'Drug-induced hair loss is almost always REVERSIBLE once the offending medication is safely substituted.',
        labTests: ['Serum Ferritin', 'TSH', 'Zinc levels'],
        questionsForDoctor: ['Is my hair loss temporary telogen effluvium from my new prescription?'],
        medicationWarnings: 'Do not discontinue anti-seizure or blood pressure medications without physician approval.'
      };
    }
  },
  {
    id: 100,
    categoryId: 'side_effects',
    categoryName: 'Side Effects & Compatibility',
    title: 'Hypokalemia from Loop Diuretics (Furosemide) Check',
    summary: 'Evaluates electrolyte wasting, muscle cramps, and cardiac ectopy risk.',
    fields: [
      { name: 'diureticName', label: 'Taking Furosemide (Lasix), Torsemide, or Hydrochlorothiazide?', type: 'select', options: ['Yes', 'No'] },
      { name: 'cramps', label: 'Experiencing muscle cramps in legs, weakness, or palpitations?', type: 'select', options: ['Yes', 'No'] },
      { name: 'potassiumSupp', label: 'Taking prescribed Potassium Chloride (K-Dur / Klor-Con)?', type: 'select', options: ['Yes', 'No'] }
    ],
    evaluate: (data) => {
      const isHypokalemia = data.diureticName === 'Yes' && data.cramps === 'Yes' && data.potassiumSupp === 'No';
      return {
        triage: isHypokalemia ? 'URGENT HYPOKALEMIA ELECTROLYTE CHECK' : 'STABLE DIURETIC PROFILE',
        triageClass: isHypokalemia ? 'danger' : 'success',
        impression: isHypokalemia ? 'Renal tubular potassium wasting secondary to loop/thiazide diuretic therapy (Serum K+ < 3.5 mEq/L risk).' : 'Balanced electrolyte status.',
        redFlags: ['Severe cardiac arrhythmia / palpitations', 'Profound muscle paralysis'],
        doctorAdvice: 'Request a serum electrolyte blood test. Potassium supplementation or adding Spironolactone is often required.',
        labTests: ['Serum Electrolytes (Potassium, Sodium, Magnesium)', '12-Lead ECG'],
        questionsForDoctor: ['What is my current serum potassium level?', 'Do I need oral Potassium Chloride or Spironolactone to balance my Furosemide?'],
        medicationWarnings: 'Hypokalemia drastically increases Digoxin toxicity risk!'
      };
    }
  }
];
