/**
 * Mangalsen Polytechnic Institute (MPI)
 * Interactive CTEVT GPA & Course Eligibility Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  initEligibilityCalculator();
});

function initEligibilityCalculator() {
  const calcForm = document.getElementById('eligibilityCalcForm');
  const resultContainer = document.getElementById('calcResultDisplay');

  if (!calcForm || !resultContainer) return;

  calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkEligibility();
  });

  // Auto calculate in real-time on every input, keyup, and change
  const inputs = calcForm.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('input', checkEligibility);
    input.addEventListener('keyup', checkEligibility);
    input.addEventListener('change', checkEligibility);
  });

  // Initial calculation check on load
  checkEligibility();
}

function checkEligibility() {
  const program = document.getElementById('calcProgram')?.value || 'ha';
  const gpa = parseFloat(document.getElementById('calcGPA')?.value || 0);
  const gradeScience = document.getElementById('calcSciGrade')?.value || 'C';
  const gradeMath = document.getElementById('calcMathGrade')?.value || 'C';
  const gradeEng = document.getElementById('calcEngGrade')?.value || 'C';

  const resultContainer = document.getElementById('calcResultDisplay');
  if (!resultContainer) return;

  const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');

  // Passing grades per CTEVT rules (C or higher: A+, A, B+, B, C+, C)
  const passingGrades = ['A+', 'A', 'B+', 'B', 'C+', 'C'];
  const isSciOk = passingGrades.includes(gradeScience);
  const isMathOk = passingGrades.includes(gradeMath);
  const isEngOk = passingGrades.includes(gradeEng);
  const isGpaOk = gpa >= 2.0;

  const programName = program === 'ha' 
    ? 'PCL in General Medicine (Health Assistant - HA)' 
    : 'Diploma in Pharmacy';

  const programNameNe = program === 'ha'
    ? 'प्रमाणपत्र तह सामान्य चिकित्सा (HA)'
    : 'डिप्लोमा इन फार्मेसी (Diploma in Pharmacy)';

  if (isNaN(gpa) || gpa <= 0) {
    resultContainer.innerHTML = `
      <div class="result-status-pill status-pending">
        <i class="fa-solid fa-calculator"></i> ${isEn ? 'Enter SEE Scores' : 'प्राप्ताङ्क प्रविष्ट गर्नुहोस्'}
      </div>
      <p style="color: #CBD5E1; font-size: 0.92rem;">
        ${isEn 
          ? 'Please enter your overall SEE GPA and select your grades in Science, Math, and English.' 
          : 'कृपया आफ्नो SEE को Overall GPA र विज्ञान, गणित, अंग्रेजीको ग्रेड छनोट गर्नुहोस्।'}
      </p>
    `;
    return;
  }

  if (isGpaOk && isSciOk && isMathOk && isEngOk) {
    resultContainer.innerHTML = `
      <div class="result-status-pill status-eligible">
        <i class="fa-solid fa-circle-check"></i> ${isEn ? 'Eligible for Admission!' : 'तपाईं योग्य हुनुहुन्छ! (Eligible)'}
      </div>
      <h4 style="color: #FFFFFF; font-size: 1.15rem; margin-bottom: 0.5rem;">
        ${isEn 
          ? `Congratulations! You meet all CTEVT eligibility criteria for ${programName}.`
          : `बधाई छ! तपाईं ${programNameNe} मा भर्ना हुन पूर्ण योग्य हुनुहुन्छ।`}
      </h4>
      <p style="color: #E2E8F0; font-size: 0.88rem; line-height: 1.5; margin-bottom: 1.25rem;">
        ${isEn
          ? `Verified criteria: Overall GPA <strong>${gpa}</strong> (&ge; 2.0) and passing grades in Science (${gradeScience}), Math (${gradeMath}), English (${gradeEng}) verified.`
          : `CTEVT को मापदण्ड अनुसार GPA: <strong>${gpa}</strong> (न्यूनतम २.०) तथा विज्ञान (${gradeScience}), गणित (${gradeMath}), अंग्रेजी (${gradeEng}) सबैमा आवश्यक न्यूनतम C ग्रेड प्राप्त भएको प्रमाणित हुन्छ।`}
      </p>
      <div style="display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap;">
        <a href="#online-admission" class="btn btn-primary btn-sm" onclick="prefillAdmissionProgram('${program}')">
          <i class="fa-solid fa-file-pen"></i> ${isEn ? 'Proceed to Online Application' : 'अनलाइन भर्ना फाराम भर्नुहोस्'}
        </a>
      </div>
    `;
  } else {
    let reasons = [];
    if (!isGpaOk) {
      reasons.push(isEn ? `Overall GPA must be at least 2.0 (Current: ${gpa})` : `न्यूनतम GPA २.० हुनुपर्नेमा ${gpa} रहेको`);
    }
    if (!isSciOk) {
      reasons.push(isEn ? `Science grade must be minimum C (Current: ${gradeScience})` : `विज्ञानमा न्यूनतम C ग्रेड हुनुपर्नेमा ${gradeScience} रहेको`);
    }
    if (!isMathOk) {
      reasons.push(isEn ? `Math grade must be minimum C (Current: ${gradeMath})` : `गणितमा न्यूनतम C ग्रेड हुनुपर्नेमा ${gradeMath} रहेको`);
    }
    if (!isEngOk) {
      reasons.push(isEn ? `English grade must be minimum C (Current: ${gradeEng})` : `अंग्रेजीमा न्यूनतम C ग्रेड हुनुपर्नेमा ${gradeEng} रहेको`);
    }

    resultContainer.innerHTML = `
      <div class="result-status-pill status-ineligible">
        <i class="fa-solid fa-triangle-exclamation"></i> ${isEn ? 'Criteria Not Met (Ineligible)' : 'योग्यता नपुगेको (Ineligible)'}
      </div>
      <h4 style="color: #FFFFFF; font-size: 1.05rem; margin-bottom: 0.5rem;">
        ${isEn 
          ? 'The following CTEVT admission requirements were not satisfied:' 
          : 'CTEVT मापदण्ड अनुसार केही सर्तहरू अपुग देखिएका छन्:'}
      </h4>
      <ul style="text-align: left; color: #FED7AA; font-size: 0.85rem; margin: 0.5rem 0 1rem 1.5rem; line-height: 1.6;">
        ${reasons.map(r => `<li>${r}</li>`).join('')}
      </ul>
      <p style="color: #E2E8F0; font-size: 0.82rem;">
        ${isEn
          ? 'You may take Grade Increment examination or apply for Pre-Diploma / TSLC courses.'
          : 'तपाईंले ग्रेडवृद्धि (Grade Increment) परीक्षा दिएर वा अन्य प्राविधिक पूर्व-डिप्लोमा कार्यक्रममा सहभागिता जनाउन सक्नुहुनेछ।'}
      </p>
    `;
  }
}

window.prefillAdmissionProgram = function(program) {
  const select = document.getElementById('admProgram');
  if (select) {
    select.value = program;
  }
  const admSection = document.getElementById('online-admission');
  if (admSection) {
    admSection.scrollIntoView({ behavior: 'smooth' });
  }
};
