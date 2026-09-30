/**
 * Mangalsen Polytechnic Institute (MPI)
 * Multi-Step Online Admission Application & Admit Slip Generator
 */

let currentStep = 1;
const totalSteps = 4;

document.addEventListener('DOMContentLoaded', () => {
  initAdmissionWizard();
});

function initAdmissionWizard() {
  const wizardForm = document.getElementById('onlineAdmissionForm');
  if (!wizardForm) return;

  // Next and Back buttons
  document.getElementById('wizardNextBtn')?.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        goToStep(currentStep + 1);
      } else {
        submitApplication();
      }
    }
  });

  document.getElementById('wizardBackBtn')?.addEventListener('click', () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  });

  // Reset form button
  document.getElementById('btnNewApplication')?.addEventListener('click', () => {
    resetAdmissionForm();
  });
}

function goToStep(step) {
  currentStep = step;

  // Update step indicators
  document.querySelectorAll('.wizard-step-node').forEach((node, idx) => {
    const stepNum = idx + 1;
    node.classList.remove('active', 'completed');
    if (stepNum === currentStep) {
      node.classList.add('active');
    } else if (stepNum < currentStep) {
      node.classList.add('completed');
    }
  });

  // Update step views
  document.querySelectorAll('.wizard-step-panel').forEach((panel, idx) => {
    panel.style.display = (idx + 1 === currentStep) ? 'block' : 'none';
  });

  // Update navigation buttons
  const backBtn = document.getElementById('wizardBackBtn');
  const nextBtn = document.getElementById('wizardNextBtn');

  if (backBtn) backBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
  if (nextBtn) {
    nextBtn.innerHTML = currentStep === totalSteps 
      ? '<i class="fa-solid fa-check"></i> फाराम पेश गर्नुहोस् (Submit Application)' 
      : 'अर्को चरण (Next) <i class="fa-solid fa-arrow-right"></i>';
  }

  // If entering review step (Step 4), populate review summary
  if (currentStep === 4) {
    populateReviewStep();
  }
}

function validateStep(step) {
  if (step === 1) {
    const prog = document.getElementById('admProgram')?.value;
    const quota = document.getElementById('admQuota')?.value;
    if (!prog || !quota) {
      alert('कृपया शैक्षिक कार्यक्रम र छात्रवृत्ति/कोटा छनोट गर्नुहोस्।');
      return false;
    }
  } else if (step === 2) {
    const nameNe = document.getElementById('admFullNameNe')?.value.trim();
    const nameEn = document.getElementById('admFullNameEn')?.value.trim();
    const phone = document.getElementById('admPhone')?.value.trim();
    const district = document.getElementById('admDistrict')?.value.trim();

    if (!nameNe || !nameEn || !phone || !district) {
      alert('कृपया सबै अनिवार्य व्यक्तिगत विवरणहरू (नाम, फोन, ठेगाना) भर्नुहोस्।');
      return false;
    }
  } else if (step === 3) {
    const school = document.getElementById('admSchool')?.value.trim();
    const symbol = document.getElementById('admSymbolNo')?.value.trim();
    const gpa = document.getElementById('admGpa')?.value.trim();

    if (!school || !symbol || !gpa) {
      alert('कृपया शैक्षिक विवरण (विद्यालयको नाम, सिम्बोल नं, GPA) प्रविष्ट गर्नुहोस्।');
      return false;
    }
  }
  return true;
}

function populateReviewStep() {
  const progText = document.getElementById('admProgram')?.options[document.getElementById('admProgram').selectedIndex]?.text;
  const quotaText = document.getElementById('admQuota')?.options[document.getElementById('admQuota').selectedIndex]?.text;
  const nameEn = document.getElementById('admFullNameEn')?.value;
  const nameNe = document.getElementById('admFullNameNe')?.value;
  const phone = document.getElementById('admPhone')?.value;
  const gpa = document.getElementById('admGpa')?.value;
  const school = document.getElementById('admSchool')?.value;
  const district = document.getElementById('admDistrict')?.value;

  const reviewBox = document.getElementById('admissionReviewContent');
  if (reviewBox) {
    reviewBox.innerHTML = `
      <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border);">
        <h4 style="margin-bottom: 1rem; color: var(--primary);"><i class="fa-solid fa-list-check"></i> फारामको सारांश विवरण (Application Summary)</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.92rem;">
          <div><strong>इच्छित कार्यक्रम:</strong> ${progText || '-'}</div>
          <div><strong>कोटा/छात्रवृत्ति:</strong> ${quotaText || '-'}</div>
          <div><strong>उम्मेदवारको नाम (नेपाली):</strong> ${nameNe || '-'}</div>
          <div><strong>Full Name (English):</strong> ${nameEn || '-'}</div>
          <div><strong>सम्पर्क मोबाइल:</strong> ${phone || '-'}</div>
          <div><strong>स्थायी जिल्ला:</strong> ${district || '-'}</div>
          <div><strong>माध्यमिक विद्यालय:</strong> ${school || '-'}</div>
          <div><strong>प्राप्त SEE GPA:</strong> ${gpa || '-'}</div>
        </div>
        <p style="margin-top: 1.25rem; font-size: 0.84rem; color: var(--text-muted); border-top: 1px dashed var(--border); padding-top: 0.75rem;">
          <i class="fa-solid fa-circle-info"></i> पेश गर्नु अघि माथिका सबै विवरणहरू आफ्नो SEE प्रमाणपत्र अनुसार ठिक भए नभएको रुजु गर्नुहोस्।
        </p>
      </div>
    `;
  }
}

function submitApplication() {
  const prog = document.getElementById('admProgram')?.value;
  const progText = document.getElementById('admProgram')?.options[document.getElementById('admProgram').selectedIndex]?.text;
  const quotaText = document.getElementById('admQuota')?.options[document.getElementById('admQuota').selectedIndex]?.text;
  const nameEn = document.getElementById('admFullNameEn')?.value;
  const nameNe = document.getElementById('admFullNameNe')?.value;
  const phone = document.getElementById('admPhone')?.value;
  const gpa = document.getElementById('admGpa')?.value;
  const symbol = document.getElementById('admSymbolNo')?.value;
  const district = document.getElementById('admDistrict')?.value;
  const father = document.getElementById('admFatherName')?.value || 'N/A';

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const progCode = (prog === 'pharmacy') ? 'PHARM' : 'HA';
  const appId = `MPI-2081-${progCode}-${randomNum}`;
  const appliedDate = "२०८१ आश्विन १४ (2026-09-30)";

  // Render Admit Card Slip
  const wizardCard = document.getElementById('admissionWizardBody');
  const resultCard = document.getElementById('admissionSuccessReceipt');

  if (wizardCard && resultCard) {
    wizardCard.style.display = 'none';
    resultCard.style.display = 'block';

    const slipContainer = document.getElementById('printableSlipArea');
    if (slipContainer) {
      slipContainer.innerHTML = `
        <div class="admit-slip-box print-area">
          <div class="admit-slip-header">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #0F3870;">प्राविधिक शिक्षा तथा व्यावसायिक तालिम परिषद् (CTEVT)</div>
              <div style="font-size: 0.8rem; font-weight: 700; color: #C8102E;">प्रवेश आवेदन रसिद (Admit Slip)</div>
            </div>
            <h2 style="font-size: 1.5rem; color: #0F3870; font-weight: 800; margin-bottom: 0.2rem;">मङ्गलसेन बहुप्राविधिक शिक्षालय</h2>
            <div style="font-size: 0.95rem; font-weight: 700; color: #1E293B;">Mangalsen Polytechnic Institute, Achham</div>
            <p style="font-size: 0.82rem; color: #475569;">मङ्गलसेन-३, अछाम, सुदूरपश्चिम प्रदेश • फोन: ०९७-६२०००० / ९८५८४८८०००</p>
          </div>

          <div class="slip-grid">
            <div>
              <table class="slip-details-table">
                <tr>
                  <td class="label-cell">आवेदन दर्ता नं (Applicant ID):</td>
                  <td><strong style="color: #C8102E; font-size: 1.1rem;">${appId}</strong></td>
                </tr>
                <tr>
                  <td class="label-cell">शैक्षिक कार्यक्रम (Applied Program):</td>
                  <td><strong>${progText}</strong></td>
                </tr>
                <tr>
                  <td class="label-cell">कोटा / समूह (Applied Quota):</td>
                  <td>${quotaText}</td>
                </tr>
                <tr>
                  <td class="label-cell">विद्यार्थीको नाम (Candidate's Name):</td>
                  <td><strong>${nameNe}</strong> (${nameEn})</td>
                </tr>
                <tr>
                  <td class="label-cell">अभिभावकको नाम (Father's Name):</td>
                  <td>${father}</td>
                </tr>
                <tr>
                  <td class="label-cell">स्थायी ठेगाना / सम्पर्क:</td>
                  <td>${district} • मो: ${phone}</td>
                </tr>
                <tr>
                  <td class="label-cell">SEE सिम्बोल नं / प्राप्त GPA:</td>
                  <td>${symbol} (GPA: <strong>${gpa}</strong>)</td>
                </tr>
                <tr>
                  <td class="label-cell">आवेदन दर्ता मिति:</td>
                  <td>${appliedDate}</td>
                </tr>
              </table>
            </div>

            <div class="slip-qr-box">
              <div style="background: #F1F5F9; border: 1px dashed #94A3B8; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                <i class="fa-solid fa-qrcode" style="font-size: 4.5rem; color: #0F3870;"></i>
              </div>
              <span style="font-size: 0.72rem; color: #64748B;">Digital Verified</span>
              <span style="font-size: 0.7rem; font-weight: 700; color: #0F3870;">${appId}</span>
            </div>
          </div>

          <div style="margin-top: 1.75rem; border-top: 1px solid #E2E8F0; padding-top: 1rem; display: flex; justify-content: space-between; align-items: flex-end;">
            <div style="font-size: 0.78rem; color: #64748B; max-width: 380px;">
              * यो अनलाइन दर्ता स्लिप प्रवेश परीक्षा तथा भर्ना प्रमाणिकरणको समयमा शिक्षालय प्रशासनमा अनिवार्य रूपमा देखाउनुपर्नेछ।
            </div>
            <div style="text-align: center;">
              <div style="border-bottom: 1px solid #000; width: 140px; margin-bottom: 4px;"></div>
              <span style="font-size: 0.75rem; font-weight: 600;">भर्ना अधिकृतको हस्ताक्षर</span>
            </div>
          </div>
        </div>
      `;
    }

    resultCard.scrollIntoView({ behavior: 'smooth' });
  }
}

window.printAdmitSlip = function() {
  window.print();
};

function resetAdmissionForm() {
  currentStep = 1;
  document.getElementById('onlineAdmissionForm')?.reset();
  const wizardCard = document.getElementById('admissionWizardBody');
  const resultCard = document.getElementById('admissionSuccessReceipt');

  if (wizardCard && resultCard) {
    wizardCard.style.display = 'block';
    resultCard.style.display = 'none';
  }
  goToStep(1);
}
