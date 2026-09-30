/**
 * Mangalsen Polytechnic Institute - Admin Dashboard Engine
 * Modular View Switcher & Bilingual (Nepali / English) Engine
 */

let currentAdminLang = localStorage.getItem('mpi_admin_lang') || 'ne';

const adminI18n = {
  ne: {
    brand_sub: "मङ्गलसेन-३, अछाम",
    nav_overview: "ड्यासबोर्ड (Overview)",
    nav_admissions: "अनलाइन भर्ना सूची",
    nav_notices: "सूचना व्यवस्थापन",
    nav_ticker: "ताजा सूचना टिकर",
    nav_staff: "शिक्षक तथा कर्मचारी",
    nav_main_site: "मुख्य वेबसाइट हेर्नुहोस्",
    btn_logout: "लगआउट (Logout)",
    btn_add_notice: "नयाँ सूचना थप्नुहोस्",
    btn_export_excel: "Excel डाउनलोड",
    btn_add_ticker: "टिकर अलर्ट थप्नुहोस्",
    btn_add_staff: "नयाँ कर्मचारी थप्नुहोस्",
    
    // KPI Cards
    kpi_total_apps: "कुल भर्ना आवेदन",
    kpi_ha_apps: "PCL HA आवेदन",
    kpi_pharm_apps: "Pharmacy आवेदन",
    kpi_notices: "सक्रिय सूचनाहरू",

    // Overview Section
    recent_admissions_title: "पछिल्ला भर्ना आवेदनहरू",
    recent_notices_title: "हालैका सूचनाहरू",
    view_all: "सबै हेर्नुहोस् →",

    // Admissions Table
    adm_title: "अनलाइन भर्ना आवेदन व्यवस्थापन",
    adm_sub: "आवेदक विद्यार्थीहरूको विवरण, रुजु र Excel डाउनलोड",
    search_placeholder: "नाम, सिम्बोल वा ID खोज्नुहोस्...",
    all_courses: "सबै कार्यक्रम (All Courses)",
    th_app_id: "Applicant ID",
    th_name: "विद्यार्थीको नाम (Name)",
    th_course: "कार्यक्रम (Course)",
    th_quota: "कोटा (Quota)",
    th_gpa: "SEE GPA",
    th_contact: "सम्पर्क / ठेगाना",
    th_status: "स्थिति",
    th_action: "कार्य (Action)",
    btn_view: "हेर्नुहोस्",

    // Notices Table
    notices_title: "सूचना तथा नतिजा व्यवस्थापन (Notices CMS)",
    notices_sub: "वेबसाइटको आधिकारिक सूचना पाटी सम्पादन",
    th_notice_no: "सूचना नं",
    th_notice_title: "सूचनाको शीर्षक",
    th_category: "श्रेणी",
    th_date: "मिति (BS)",
    th_file: "फाइल",
    btn_delete: "हटाउनुहोस्",

    // Ticker Table
    ticker_title: "ताजा सूचना टिकर व्यवस्थापन",
    ticker_sub: "होमपेजको माथि घुम्ने १-२ लाइनका अलर्टहरू",
    th_sn: "क्र.सं.",
    th_ticker_msg: "टिकर सन्देश",
    th_tag: "ट्याग",

    // Staff Table
    staff_title: "शिक्षक तथा कर्मचारी विवरण (Faculty & Staff)",
    staff_sub: "शिक्षालयका प्राध्यापक, विभागीय प्रमुख तथा कर्मचारीहरूको सूची",
    th_staff_name: "नाम",
    th_role: "पद (Designation)",
    th_dept: "विभाग (Department)",
    th_qual: "योग्यता",

    // Login View
    login_title: "मङ्गलसेन बहुप्राविधिक शिक्षालय",
    login_sub: "प्रशासन तथा भर्ना व्यवस्थापन पोर्टल (Admin Login)",
    login_placeholder: "सुरक्षा पिन वा पासवर्ड प्रविष्ट गर्नुहोस्",
    btn_login: "लगइन गर्नुहोस् (Login)",
    default_pin_hint: "डिफल्ट सुरक्षा पिन (Default PIN):"
  },

  en: {
    brand_sub: "Mangalsen-3, Achham",
    nav_overview: "Dashboard Overview",
    nav_admissions: "Online Admissions",
    nav_notices: "Notices CMS",
    nav_ticker: "Breaking Ticker",
    nav_staff: "Faculty & Staff",
    nav_main_site: "View Main Website",
    btn_logout: "Logout",
    btn_add_notice: "Add New Notice",
    btn_export_excel: "Export to Excel",
    btn_add_ticker: "Add Ticker Alert",
    btn_add_staff: "Add New Staff",

    // KPI Cards
    kpi_total_apps: "Total Applications",
    kpi_ha_apps: "PCL HA Applications",
    kpi_pharm_apps: "Pharmacy Applications",
    kpi_notices: "Active Notices",

    // Overview Section
    recent_admissions_title: "Recent Applications",
    recent_notices_title: "Recent Circulars",
    view_all: "View All →",

    // Admissions Table
    adm_title: "Online Admissions Management",
    adm_sub: "Manage applicant credentials, verify status and export to Excel/CSV",
    search_placeholder: "Search by Name, Symbol, or ID...",
    all_courses: "All Courses",
    th_app_id: "Applicant ID",
    th_name: "Candidate Name",
    th_course: "Course / Program",
    th_quota: "Category Quota",
    th_gpa: "SEE GPA",
    th_contact: "Contact / Address",
    th_status: "Status",
    th_action: "Action",
    btn_view: "View Profile",

    // Notices Table
    notices_title: "Notices & Circulars CMS",
    notices_sub: "Publish, update or remove public CTEVT notices",
    th_notice_no: "Notice ID",
    th_notice_title: "Notice Heading",
    th_category: "Category",
    th_date: "Published Date",
    th_file: "Attachment",
    btn_delete: "Delete",

    // Ticker Table
    ticker_title: "Breaking News Ticker Manager",
    ticker_sub: "Real-time scrolling marquee notifications on header",
    th_sn: "S.N.",
    th_ticker_msg: "Ticker Message",
    th_tag: "Badge Tag",

    // Staff Table
    staff_title: "Faculty & Staff Directory",
    staff_sub: "Manage academic instructors and administrative personnel",
    th_staff_name: "Full Name",
    th_role: "Designation",
    th_dept: "Department",
    th_qual: "Qualifications",

    // Login View
    login_title: "Mangalsen Polytechnic Institute",
    login_sub: "Administration & Admissions Portal (Admin Login)",
    login_placeholder: "Enter security PIN or passcode",
    btn_login: "Login to Dashboard",
    default_pin_hint: "Default Security PIN:"
  }
};

// Data Stores
let mockAdmissions = [
  {
    app_id: "MPI-2081-HA-8842",
    program: "PCL in General Medicine (HA)",
    quota: "Classified Scholarship",
    name_ne: "रमेश बहादुर कुँवर",
    name_en: "RAMESH BAHADUR KUNWAR",
    phone: "9848765432",
    district: "Mangalsen-3, Achham",
    school: "Shree Shodasha Devi Ma.Vi.",
    symbol_no: "07804128K",
    gpa: "3.15",
    grade_sci: "B+",
    status: "Verified",
    date: "2081-06-14"
  },
  {
    app_id: "MPI-2081-PHARM-7219",
    program: "Diploma in Pharmacy",
    quota: "Open Merit",
    name_ne: "सिता कुमारी शाही",
    name_en: "SITA KUMARI SHAHI",
    phone: "9868123456",
    district: "Sanfebagar-2, Achham",
    school: "Shree Tribhuvan Ma.Vi.",
    symbol_no: "07809921B",
    gpa: "3.45",
    grade_sci: "A",
    status: "Verified",
    date: "2081-06-13"
  },
  {
    app_id: "MPI-2081-HA-4310",
    program: "PCL in General Medicine (HA)",
    quota: "Female Quota",
    name_ne: "पुजा अधिकारी",
    name_en: "PUJA ADHIKARI",
    phone: "9812345678",
    district: "Kamalbazar, Achham",
    school: "Kamalbazar Secondary School",
    symbol_no: "07801244M",
    gpa: "2.90",
    grade_sci: "C+",
    status: "Pending",
    date: "2081-06-12"
  }
];

let mockNotices = [
  {
    id: "N-2081-104",
    title_ne: "CTEVT डिप्लोमा इन फार्मेसी तथा PCL सामान्य चिकित्सा (HA) नयाँ भर्ना आवेदन फाराम खुला!",
    title_en: "Admission Application Form Open for CTEVT Diploma in Pharmacy & PCL General Medicine (HA)",
    category: "Admission",
    date_bs: "२०८१ आश्विन १२",
    file: "CTEVT_Admission_Form_2081_MPI.pdf"
  },
  {
    id: "N-2081-103",
    title_ne: "वर्गीकृत (निःशुल्क) छात्रवृत्ति प्रवेश परीक्षाको नतिजा तथा भर्ना सम्बन्धी सूचना",
    title_en: "Result of Classified Free Scholarship Entrance Examination Published",
    category: "Scholarship",
    date_bs: "२०८१ आश्विन ०८",
    file: "Classified_Scholarship_Result_2081.pdf"
  },
  {
    id: "N-2081-102",
    title_ne: "डिप्लोमा तथा प्रमाणपत्र तह प्रथम वर्षको नियमित तथा पूरक परीक्षा तालिका (Exam Routine)",
    title_en: "First Year Regular & Back Examination Schedule Routine Published",
    category: "Exam",
    date_bs: "२०८१ आश्विन ०२",
    file: "CTEVT_Exam_Routine_First_Year_2081.pdf"
  }
];

let mockTickers = [
  { id: 1, text: "CTEVT Diploma in Pharmacy & PCL General Medicine (HA) २०८१/०८२ भर्ना फाराम खुला सम्बन्धी अत्यन्त जरुरी सूचना!", tag: "भर्ना खुला" },
  { id: 2, text: "वर्गीकृत (निःशुल्क) छात्रवृत्ति प्रवेश परीक्षाको नतिजा तथा भर्ना सम्बन्धी सूचना प्रकाशित।", tag: "छात्रवृत्ति" },
  { id: 3, text: "डिप्लोमा तथा प्रमाणपत्र तह प्रथम वर्षको नियमित तथा पूरक परीक्षा तालिका सार्वजनिक।", tag: "परीक्षा" }
];

let mockStaff = [
  { id: 1, name: "डा. राजेश कुमार श्रेष्ठ", role: "शिक्षालय प्रमुख (Campus Chief)", dept: "Leadership", qual: "M.Sc., Ph.D." },
  { id: 2, name: "डा. भुवन प्रसाद जोशी", role: "विभागीय प्रमुख (HA Program)", dept: "Health Sciences", qual: "MBBS, MD" },
  { id: 3, name: "फर्मासिस्ट अन्जना थापा", role: "विभागीय प्रमुख (Pharmacy Program)", dept: "Pharmacy", qual: "M.Pharm" },
  { id: 4, name: "दिनेश राज कुँवर", role: "प्रशासन तथा लेखा अधिकृत", dept: "Administration", qual: "MBS" }
];

let activeView = 'overview';

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  initLogin();
  applyAdminLanguage(currentAdminLang);
});

function toggleAdminLanguage() {
  currentAdminLang = (currentAdminLang === 'ne') ? 'en' : 'ne';
  localStorage.setItem('mpi_admin_lang', currentAdminLang);
  applyAdminLanguage(currentAdminLang);
  switchAdminView(activeView);
}

function applyAdminLanguage(lang) {
  const dict = adminI18n[lang] || adminI18n.ne;

  // Toggle button text
  const toggleBtn = document.getElementById('adminLangToggleBtn');
  if (toggleBtn) {
    toggleBtn.innerHTML = (lang === 'ne')
      ? `<i class="fa-solid fa-globe"></i> English`
      : `<i class="fa-solid fa-globe"></i> नेपाली`;
  }

  // Update all [data-admin-i18n] elements
  document.querySelectorAll('[data-admin-i18n]').forEach(el => {
    const key = el.getAttribute('data-admin-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', dict[key]);
      } else {
        el.textContent = dict[key];
      }
    }
  });
}

function checkAuth() {
  const isAuth = localStorage.getItem('mpi_admin_auth');
  const loginView = document.getElementById('adminLoginView');
  const dashboardView = document.getElementById('adminDashboardView');

  if (isAuth === 'true') {
    if (loginView) loginView.style.display = 'none';
    if (dashboardView) dashboardView.style.display = 'grid';
    switchAdminView('overview');
    renderDashboard();
  } else {
    if (loginView) loginView.style.display = 'flex';
    if (dashboardView) dashboardView.style.display = 'none';
  }
}

function initLogin() {
  const form = document.getElementById('adminLoginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const pin = document.getElementById('adminPinInput')?.value.trim();

    if (pin === '2081' || pin === 'admin' || pin === 'admin@mpi') {
      localStorage.setItem('mpi_admin_auth', 'true');
      checkAuth();
    } else {
      alert(currentAdminLang === 'en' ? 'Invalid PIN or Password! (Default PIN: 2081)' : 'गलत पासवर्ड वा पिन! (Default PIN: 2081)');
    }
  });
}

window.adminLogout = function() {
  localStorage.removeItem('mpi_admin_auth');
  checkAuth();
};

// Modular View Switcher
window.switchAdminView = function(viewKey) {
  activeView = viewKey;

  // Hide all view panels
  document.querySelectorAll('.admin-view-panel').forEach(panel => {
    panel.style.display = 'none';
    panel.classList.remove('active');
  });

  // Show selected panel
  const targetPanel = document.getElementById(`view-${viewKey}`);
  if (targetPanel) {
    targetPanel.style.display = 'block';
    targetPanel.classList.add('active');
  }

  // Update sidebar active class
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-view-target') === viewKey) {
      item.classList.add('active');
    }
  });

  const isEn = (currentAdminLang === 'en');
  const titles = {
    overview: { 
      title: isEn ? "Dashboard Overview" : "ड्यासबोर्ड (Overview)", 
      sub: isEn ? "Mangalsen Polytechnic Institute • Session 2081/082" : "मङ्गलसेन बहुप्राविधिक शिक्षालय • शैक्षिक सत्र २०८१/०८२" 
    },
    admissions: { 
      title: isEn ? "Online Admissions Management" : "अनलाइन भर्ना आवेदन व्यवस्थापन", 
      sub: isEn ? "Applicant records, status verification and Excel exports" : "आवेदक विद्यार्थीहरूको विवरण, रुजु र Excel डाउनलोड" 
    },
    notices: { 
      title: isEn ? "Notices & Circulars CMS" : "सूचना तथा नतिजा व्यवस्थापन (Notices CMS)", 
      sub: isEn ? "Publish, edit and manage public institutional notices" : "वेबसाइटको आधिकारिक सूचना पाटी सम्पादन" 
    },
    ticker: { 
      title: isEn ? "Breaking News Ticker Manager" : "ताजा सूचना टिकर व्यवस्थापन", 
      sub: isEn ? "Live top marquee notifications" : "होमपेजको माथि घुम्ने ब्रेकिङ टिकर सन्देशहरू" 
    },
    staff: { 
      title: isEn ? "Faculty & Staff Directory" : "शिक्षक तथा कर्मचारी विवरण व्यवस्थापन", 
      sub: isEn ? "Academic instructors and administrative personnel" : "शिक्षालयका प्राध्यापक तथा प्रशासन टिम" 
    }
  };

  const current = titles[viewKey] || titles.overview;
  const titleEl = document.getElementById('currentViewTitle');
  const subEl = document.getElementById('currentViewSubtitle');
  if (titleEl) titleEl.textContent = current.title;
  if (subEl) subEl.textContent = current.sub;

  // Refresh relevant view table
  if (viewKey === 'overview') renderOverviewRecent();
  if (viewKey === 'admissions') renderAdmissionsTable();
  if (viewKey === 'notices') renderNoticesTable();
  if (viewKey === 'ticker') renderTickerTable();
  if (viewKey === 'staff') renderStaffTable();
};

function renderDashboard() {
  renderKPIs();
  renderOverviewRecent();
  renderAdmissionsTable();
  renderNoticesTable();
  renderTickerTable();
  renderStaffTable();
}

function renderKPIs() {
  const totalApps = mockAdmissions.length;
  const haCount = mockAdmissions.filter(a => a.program.includes('HA')).length;
  const pharmCount = mockAdmissions.filter(a => a.program.includes('Pharmacy')).length;
  const noticeCount = mockNotices.length;

  document.getElementById('kpiTotalApps').textContent = totalApps;
  document.getElementById('kpiHaApps').textContent = haCount;
  document.getElementById('kpiPharmApps').textContent = pharmCount;
  document.getElementById('kpiTotalNotices').textContent = noticeCount;
}

function renderOverviewRecent() {
  const tbody = document.getElementById('overviewRecentAdmissions');
  const noticeList = document.getElementById('overviewRecentNotices');
  const isEn = (currentAdminLang === 'en');

  if (tbody) {
    tbody.innerHTML = mockAdmissions.slice(0, 3).map(item => `
      <tr>
        <td><strong>${item.app_id}</strong></td>
        <td>${isEn ? item.name_en : item.name_ne}</td>
        <td><span style="color:var(--admin-primary); font-weight:600;">${item.program}</span></td>
        <td><strong>${item.gpa}</strong></td>
        <td><span class="badge-status ${item.status === 'Verified' ? 'status-verified' : 'status-pending'}">${item.status}</span></td>
      </tr>
    `).join('');
  }

  if (noticeList) {
    noticeList.innerHTML = mockNotices.slice(0, 3).map(n => `
      <li style="background:#F8FAFC; padding:0.75rem 1rem; border-radius:8px; border:1px solid #E2E8F0; font-size:0.85rem;">
        <span class="badge-status status-verified" style="font-size:0.7rem;">${n.category}</span>
        <strong style="display:block; margin-top:4px; color:var(--admin-primary);">${isEn ? n.title_en : n.title_ne}</strong>
        <span style="font-size:0.75rem; color:#64748B;">Date: ${n.date_bs}</span>
      </li>
    `).join('');
  }
}

function renderAdmissionsTable(filterCourse = 'all', searchQuery = '') {
  const tbody = document.getElementById('admissionsTableBody');
  if (!tbody) return;

  const isEn = (currentAdminLang === 'en');
  let list = mockAdmissions;
  if (filterCourse !== 'all') {
    list = list.filter(a => a.program.toLowerCase().includes(filterCourse.toLowerCase()));
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    list = list.filter(a => 
      a.name_ne.toLowerCase().includes(q) || 
      a.name_en.toLowerCase().includes(q) || 
      a.app_id.toLowerCase().includes(q) ||
      a.symbol_no.toLowerCase().includes(q)
    );
  }

  tbody.innerHTML = list.map(item => `
    <tr>
      <td><strong>${item.app_id}</strong></td>
      <td><strong>${isEn ? item.name_en : item.name_ne}</strong><br><small style="color:#64748B;">${isEn ? item.name_ne : item.name_en}</small></td>
      <td><span style="font-weight:600; color:var(--admin-primary);">${item.program}</span></td>
      <td>${item.quota}</td>
      <td><strong>${item.gpa}</strong> (Sci: ${item.grade_sci})</td>
      <td>${item.phone}<br><small style="color:#64748B;">${item.district}</small></td>
      <td><span class="badge-status ${item.status === 'Verified' ? 'status-verified' : 'status-pending'}">${item.status}</span></td>
      <td>
        <button class="btn-admin btn-admin-primary" style="padding:4px 8px; font-size:0.75rem;" onclick="viewApplicantDetail('${item.app_id}')">
          <i class="fa-solid fa-eye"></i> ${isEn ? 'View Profile' : 'हेर्नुहोस्'}
        </button>
      </td>
    </tr>
  `).join('');
}

window.filterAdmissions = function() {
  const course = document.getElementById('admCourseFilter')?.value || 'all';
  const query = document.getElementById('admSearchInput')?.value || '';
  renderAdmissionsTable(course, query);
};

function renderNoticesTable() {
  const tbody = document.getElementById('adminNoticesTableBody');
  if (!tbody) return;

  const isEn = (currentAdminLang === 'en');
  tbody.innerHTML = mockNotices.map(n => `
    <tr>
      <td><strong>${n.id}</strong></td>
      <td>${isEn ? n.title_en : n.title_ne}</td>
      <td><span class="badge-status status-verified">${n.category}</span></td>
      <td>${n.date_bs}</td>
      <td><i class="fa-solid fa-file-pdf" style="color:#EF4444;"></i> ${n.file}</td>
      <td>
        <button class="btn-admin btn-admin-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="deleteNotice('${n.id}')">
          <i class="fa-solid fa-trash"></i> ${isEn ? 'Delete' : 'हटाउनुहोस्'}
        </button>
      </td>
    </tr>
  `).join('');
}

function renderTickerTable() {
  const tbody = document.getElementById('adminTickerTableBody');
  if (!tbody) return;

  tbody.innerHTML = mockTickers.map((t, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${t.text}</strong></td>
      <td><span class="badge-status status-verified">${t.tag}</span></td>
      <td>
        <button class="btn-admin btn-admin-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="deleteTicker(${t.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function renderStaffTable() {
  const tbody = document.getElementById('adminStaffTableBody');
  if (!tbody) return;

  tbody.innerHTML = mockStaff.map(s => `
    <tr>
      <td><strong>${s.name}</strong></td>
      <td>${s.role}</td>
      <td>${s.dept}</td>
      <td>${s.qual}</td>
      <td>
        <button class="btn-admin btn-admin-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="deleteStaff(${s.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// Modal Controller Functions
window.openAdminModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
  }
};

window.closeAdminModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
};

// File Attachment Handler
let selectedNoticeFileObj = null;

window.handleNoticeFileSelect = function(input) {
  const preview = document.getElementById('noticeFilePreviewArea');
  const nameEl = document.getElementById('selectedNoticeFileName');
  
  if (input.files && input.files[0]) {
    const file = input.files[0];
    selectedNoticeFileObj = file;
    if (nameEl) nameEl.textContent = `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
    if (preview) preview.style.display = 'block';
  } else {
    selectedNoticeFileObj = null;
    if (preview) preview.style.display = 'none';
  }
};

// Add New Notice Handler (Opens Modal)
window.addNewNotice = function() {
  const form = document.getElementById('addNoticeForm');
  if (form) form.reset();
  const preview = document.getElementById('noticeFilePreviewArea');
  if (preview) preview.style.display = 'none';
  selectedNoticeFileObj = null;
  openAdminModal('addNoticeModal');
};

// Save Notice Form Submission
window.handleSaveNotice = function(e) {
  e.preventDefault();
  const isEn = (currentAdminLang === 'en');
  const titleNe = document.getElementById('noticeTitleNeInput')?.value.trim();
  const titleEn = document.getElementById('noticeTitleEnInput')?.value.trim() || titleNe;
  const category = document.getElementById('noticeCategoryInput')?.value || 'Admission';
  const dateBs = document.getElementById('noticeDateBsInput')?.value.trim() || '२०८१ आश्विन १४';
  
  const fileName = selectedNoticeFileObj ? selectedNoticeFileObj.name : `Notice_Document_${Date.now().toString().slice(-4)}.pdf`;
  const newId = `N-2081-${Math.floor(100 + Math.random() * 900)}`;

  mockNotices.unshift({
    id: newId,
    title_ne: titleNe,
    title_en: titleEn,
    category: category,
    date_bs: dateBs,
    file: fileName
  });

  renderDashboard();
  closeAdminModal('addNoticeModal');
  alert(isEn ? `Notice "${titleEn}" published successfully with attachment: ${fileName}` : `सूचना "${titleNe}" सफलतापूर्वक संलग्न डकुमेन्ट सहित प्रकाशित भयो!`);
};

window.addNewTicker = function() {
  openAdminModal('addTickerModal');
};

window.handleSaveTicker = function(e) {
  e.preventDefault();
  const isEn = (currentAdminLang === 'en');
  const text = document.getElementById('tickerTextInput')?.value.trim();
  const tag = document.getElementById('tickerTagInput')?.value.trim() || 'Alert';
  if (!text) return;

  mockTickers.unshift({
    id: Date.now(),
    text: text,
    tag: tag
  });

  renderTickerTable();
  closeAdminModal('addTickerModal');
  document.getElementById('tickerTextInput').value = '';
  alert(isEn ? 'Ticker alert published!' : 'नयाँ टिकर अलर्ट प्रकाशित भयो!');
};

window.deleteTicker = function(id) {
  const isEn = (currentAdminLang === 'en');
  if (confirm(isEn ? 'Delete this ticker alert?' : 'के तपाईं यो टिकर हटाउन चाहनुहुन्छ?')) {
    mockTickers = mockTickers.filter(t => t.id !== id);
    renderTickerTable();
  }
};

window.addNewStaff = function() {
  openAdminModal('addStaffModal');
};

window.handleSaveStaff = function(e) {
  e.preventDefault();
  const isEn = (currentAdminLang === 'en');
  const name = document.getElementById('staffNameInput')?.value.trim();
  const role = document.getElementById('staffRoleInput')?.value.trim();
  const dept = document.getElementById('staffDeptInput')?.value || 'Academic';
  const qual = document.getElementById('staffQualInput')?.value.trim() || 'Master Degree';

  if (!name) return;

  mockStaff.push({
    id: Date.now(),
    name: name,
    role: role,
    dept: dept,
    qual: qual
  });

  renderStaffTable();
  closeAdminModal('addStaffModal');
  document.getElementById('staffNameInput').value = '';
  document.getElementById('staffRoleInput').value = '';
  document.getElementById('staffQualInput').value = '';
  alert(isEn ? 'New staff profile added!' : 'नयाँ कर्मचारी विवरण थपियो!');
};

window.deleteStaff = function(id) {
  const isEn = (currentAdminLang === 'en');
  if (confirm(isEn ? 'Delete this staff profile?' : 'के तपाईं यो कर्मचारी विवरण हटाउन चाहनुहुन्छ?')) {
    mockStaff = mockStaff.filter(s => s.id !== id);
    renderStaffTable();
  }
};

window.exportAdmissionsToCSV = function() {
  let csv = "Applicant ID,Full Name (Ne),Full Name (En),Program,Quota,SEE GPA,Science Grade,Phone,District,School,Status\n";
  mockAdmissions.forEach(a => {
    csv += `"${a.app_id}","${a.name_ne}","${a.name_en}","${a.program}","${a.quota}","${a.gpa}","${a.grade_sci}","${a.phone}","${a.district}","${a.school}","${a.status}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `MPI_Admissions_List_2081_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

window.deleteNotice = function(id) {
  const isEn = (currentAdminLang === 'en');
  if (confirm(isEn ? `Delete notice ${id}?` : `के तपाईं यो सूचना (${id}) हटाउन चाहनुहुन्छ?`)) {
    mockNotices = mockNotices.filter(n => n.id !== id);
    renderDashboard();
  }
};

window.viewApplicantDetail = function(appId) {
  const app = mockAdmissions.find(a => a.app_id === appId);
  if (!app) return;

  const isEn = (currentAdminLang === 'en');
  alert(`
=== ${isEn ? "Applicant Profile Details" : "विद्यार्थी भर्ना विवरण"} ===
${isEn ? "Applicant ID:" : "दर्ता नम्बर:"} ${app.app_id}
${isEn ? "Name:" : "नाम:"} ${app.name_ne} (${app.name_en})
${isEn ? "Program:" : "कार्यक्रम:"} ${app.program}
${isEn ? "Quota:" : "कोटा:"} ${app.quota}
${isEn ? "Obtained SEE GPA:" : "प्राप्त SEE GPA:"} ${app.gpa} (Science: ${app.grade_sci})
${isEn ? "Phone Contact:" : "सम्पर्क फोन:"} ${app.phone}
${isEn ? "Address:" : "ठेगाना:"} ${app.district}
${isEn ? "School:" : "विद्यालय:"} ${app.school}
${isEn ? "SEE Symbol No:" : "सिम्बोल नं:"} ${app.symbol_no}
${isEn ? "Verification Status:" : "स्थिति:"} ${app.status}
  `);
};
