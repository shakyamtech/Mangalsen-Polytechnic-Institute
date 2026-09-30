# 🏛️ Mangalsen Polytechnic Institute (मङ्गलसेन बहुप्राविधिक शिक्षालय)
### Official Frontend Web Portal & Online Admission System
**A Constituent Institution of the Council for Technical Education and Vocational Training (CTEVT)**  
*Location: Mangalsen Municipality-3, Achham, Sudurpashchim Province, Nepal*  
*Estd: 2079 B.S. (2022 A.D.)*

---

## 🌟 Overview

This is the modern, responsive, full-featured web portal for **Mangalsen Polytechnic Institute (MPI)**. It provides prospective students, current trainees, guardians, and faculty members with intuitive access to admissions, academic programs, CTEVT notifications, institutional resources, and citizen services.

---

## 🚀 Key Features

1. **🏛️ Institutional Identity & Accessibility:**
   - Official Government of Nepal Coat of Arms and CTEVT Crest.
   - Dual-language support (**नेपाली & English**) with dynamic full-page translation.
   - **Dark Mode / Light Mode** theme switcher with local storage persistence.
   - **Font Size Accessibility** controls (`A-`, `A`, `A+`) for visual convenience.
   - Dynamic **Bikram Sambat (BS)** date and time counter.

2. **📢 Dynamic Breaking Notice Ticker & Emergency Pop-up:**
   - Real-time animated ticker for admissions, results, and examination routines.
   - High-priority entrance admission pop-up modal on initial page load.

3. **🩺 Academic Programs:**
   - **PCL in General Medicine (Health Assistant - HA)** - 3 Years | 40 Seats
   - **Diploma in Pharmacy** - 3 Years | 40 Seats
   - Detailed curricular highlights, eligibility criteria, and classified government scholarship quotas.

4. **🧮 CTEVT GPA & Eligibility Calculator:**
   - Instant verification of SEE grades (GPA $\ge 2.0$ with compulsory Science, Math, English validation) tailored to CTEVT admission norms.

5. **📝 4-Step Online Admission Portal & Admit Card Slip:**
   - Step 1: Program & Category Quota Selection (Open, Classified Scholarship, Female, Remote District Achham)
   - Step 2: Applicant Personal Details (Bilingual Devanagari/English)
   - Step 3: SEE Academic Records & Symbol Numbers
   - Step 4: Verification & Instant Submission
   - **Printable Official CTEVT Admit Card / Registration Slip** with unique applicant ID (e.g. `MPI-2081-HA-8842`) and QR verification.

6. **📋 Filterable Notices & Announcements Hub:**
   - Categorized by **भर्ना (Admissions)**, **परीक्षा (Examinations)**, **परिपत्र (Circulars)**, and **बोलपत्र (Tenders)**.
   - Instant search and detailed modal viewer with downloadable simulated PDF circulars.

7. **🔬 Campus Facilities & Lightbox Gallery:**
   - Anatomy Lab, Pharmaceutical Science Chemistry Lab, Central Digital E-Library, and Achham District Hospital clinical tie-up showcase.
   - Category-filtered photo gallery with keyboard-navigable lightbox viewer.

8. **📜 Citizen Charter (नागरिक बडापत्र):**
   - Transparent institutional service charter detailing required documents, responsible branches, timelines, and fees.

---

## 📁 Project Structure

```
.
├── index.html                   # Core HTML5 Web Application
├── README.md                    # Project Documentation
├── assets/
│   ├── css/
│   │   ├── style.css            # Design System, Typography & Dark Mode
│   │   ├── components.css       # Sliders, Modals, Cards, Admission Wizard
│   │   └── print.css            # Admit Card & Receipt Print Stylesheet
│   ├── js/
│   │   ├── app.js               # I18n Engine, Theme & Slider Controls
│   │   ├── admission.js         # Multi-step Admission & Admit Slip Generator
│   │   ├── calculator.js        # CTEVT GPA Eligibility Checker
│   │   ├── notices.js           # Notice Board Data, Filters & Modals
│   │   └── gallery.js           # Lightbox Gallery
│   └── images/
│       ├── hero-campus.jpg      # Mangalsen Campus Landscape
│       ├── ha-lab.jpg           # Health Assistant Lab
│       ├── pharmacy-lab.jpg     # Pharmacy Practical Lab
│       ├── principal.jpg        # Campus Chief Portrait
│       ├── community-camp.jpg   # Rural Community Health Camp
│       ├── library.jpg          # Digital Library & Study Hall
│       └── cultural-event.jpg   # Cultural & Sports Celebrations
```

---

## 🛠️ Local Development & Running

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shakyamtech/Mangalsen-Polytechnic-Institute.git
   cd Mangalsen-Polytechnic-Institute
   ```

2. **Open in any modern web browser:**
   - Double click `index.html` to open locally, or
   - Serve using any static server:
     ```bash
     python -m http.server 3000
     # Open http://localhost:3000 in your browser
     ```

---

## 👥 Acknowledgments & Affiliations

- **Council for Technical Education and Vocational Training (CTEVT)**
- **Mangalsen Municipality, Achham, Sudurpashchim Province, Nepal**
- **Official Page:** [facebook.com/mangalsenpi/](https://www.facebook.com/mangalsenpi/)
