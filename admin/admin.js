/**
 * Mangalsen Polytechnic Institute - Admin Dashboard Engine
 * Modular View Switcher & Management
 */

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
    title: "CTEVT Diploma in Pharmacy & PCL General Medicine (HA) नयाँ भर्ना आवेदन फाराम खुला!",
    category: "Admission",
    date_bs: "२०८१ आश्विन १२",
    file: "CTEVT_Admission_Form_2081_MPI.pdf"
  },
  {
    id: "N-2081-103",
    title: "वर्गीकृत (निःशुल्क) छात्रवृत्ति प्रवेश परीक्षाको नतिजा तथा भर्ना सम्बन्धी सूचना",
    category: "Scholarship",
    date_bs: "२०८१ आश्विन ०८",
    file: "Classified_Scholarship_Result_2081.pdf"
  },
  {
    id: "N-2081-102",
    title: "डिप्लोमा तथा प्रमाणपत्र तह प्रथम वर्षको नियमित तथा पूरक परीक्षा तालिका (Exam Routine)",
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

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  initLogin();
});

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
      alert('गलत पासवर्ड वा पिन! (Default PIN: 2081)');
    }
  });
}

window.adminLogout = function() {
  localStorage.removeItem('mpi_admin_auth');
  checkAuth();
};

// True View Switcher (SPA Style)
window.switchAdminView = function(viewKey) {
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

  // Update header titles
  const titles = {
    overview: { title: "ड्यासबोर्ड (Overview)", sub: "मङ्गलसेन बहुप्राविधिक शिक्षालय • शैक्षिक सत्र २०८१/०८२" },
    admissions: { title: "अनलाइन भर्ना आवेदन व्यवस्थापन", sub: "आवेदक विद्यार्थीहरूको विवरण, रुजु र Excel डाउनलोड" },
    notices: { title: "सूचना तथा नतिजा व्यवस्थापन (Notices CMS)", sub: "वेबसाइटको आधिकारिक सूचना पाटी सम्पादन" },
    ticker: { title: "ताजा सूचना टिकर व्यवस्थापन", sub: "होमपेजको माथि घुम्ने ब्रेकिङ टिकर सन्देशहरू" },
    staff: { title: "शिक्षक तथा कर्मचारी विवरण व्यवस्थापन", sub: "शिक्षालयका प्राध्यापक तथा प्रशासन टिम" }
  };

  const current = titles[viewKey] || titles.overview;
  const titleEl = document.getElementById('currentViewTitle');
  const subEl = document.getElementById('currentViewSubtitle');
  if (titleEl) titleEl.textContent = current.title;
  if (subEl) subEl.textContent = current.sub;

  // Refresh relevant table
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

  if (tbody) {
    tbody.innerHTML = mockAdmissions.slice(0, 3).map(item => `
      <tr>
        <td><strong>${item.app_id}</strong></td>
        <td>${item.name_ne}</td>
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
        <strong style="display:block; margin-top:4px; color:var(--admin-primary);">${n.title}</strong>
        <span style="font-size:0.75rem; color:#64748B;">मिति: ${n.date_bs}</span>
      </li>
    `).join('');
  }
}

function renderAdmissionsTable(filterCourse = 'all', searchQuery = '') {
  const tbody = document.getElementById('admissionsTableBody');
  if (!tbody) return;

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
      <td><strong>${item.name_ne}</strong><br><small style="color:#64748B;">${item.name_en}</small></td>
      <td><span style="font-weight:600; color:var(--admin-primary);">${item.program}</span></td>
      <td>${item.quota}</td>
      <td><strong>${item.gpa}</strong> (Sci: ${item.grade_sci})</td>
      <td>${item.phone}<br><small style="color:#64748B;">${item.district}</small></td>
      <td><span class="badge-status ${item.status === 'Verified' ? 'status-verified' : 'status-pending'}">${item.status}</span></td>
      <td>
        <button class="btn-admin btn-admin-primary" style="padding:4px 8px; font-size:0.75rem;" onclick="viewApplicantDetail('${item.app_id}')">
          <i class="fa-solid fa-eye"></i> हेर्नुहोस्
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

  tbody.innerHTML = mockNotices.map(n => `
    <tr>
      <td><strong>${n.id}</strong></td>
      <td>${n.title}</td>
      <td><span class="badge-status status-verified">${n.category}</span></td>
      <td>${n.date_bs}</td>
      <td><i class="fa-solid fa-file-pdf" style="color:#EF4444;"></i> ${n.file}</td>
      <td>
        <button class="btn-admin btn-admin-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="deleteNotice('${n.id}')">
          <i class="fa-solid fa-trash"></i> हटाउनुहोस्
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

window.addNewTicker = function() {
  const text = prompt('ताजा टिकर सन्देश प्रविष्ट गर्नुहोस्:');
  if (!text) return;
  const tag = prompt('ट्याग (उदा. भर्ना खुला / परीक्षा):', 'सूचना');

  mockTickers.unshift({
    id: Date.now(),
    text,
    tag: tag || 'ताजा'
  });
  renderTickerTable();
  alert('नयाँ टिकर अलर्ट प्रकाशित भयो!');
};

window.deleteTicker = function(id) {
  if (confirm('के तपाईं यो टिकर हटाउन चाहनुहुन्छ?')) {
    mockTickers = mockTickers.filter(t => t.id !== id);
    renderTickerTable();
  }
};

window.addNewStaff = function() {
  const name = prompt('कर्मचारी / शिक्षकको नाम:');
  if (!name) return;
  const role = prompt('पद (Designation):', 'शिक्षक / Instructor');
  const dept = prompt('विभाग (HA / Pharmacy / Admin):', 'Academic');

  mockStaff.push({
    id: Date.now(),
    name,
    role,
    dept,
    qual: 'Master Degree'
  });
  renderStaffTable();
  alert('नयाँ कर्मचारी विवरण थपियो!');
};

window.deleteStaff = function(id) {
  if (confirm('के तपाईं यो कर्मचारी विवरण हटाउन चाहनुहुन्छ?')) {
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

window.addNewNotice = function() {
  const title = prompt('सूचनाको शीर्षक लेख्नुहोस् (Enter Notice Title):');
  if (!title) return;

  const cat = prompt('श्रेणी (Admission / Exam / Circular):', 'Admission');
  const newId = `N-2081-${Math.floor(100 + Math.random() * 900)}`;

  mockNotices.unshift({
    id: newId,
    title: title,
    category: cat || 'Circular',
    date_bs: "२०८१ आश्विन १४",
    file: "Notice_Uploaded.pdf"
  });

  renderDashboard();
  alert('नयाँ सूचना सफलतापूर्वक प्रकाशित भयो!');
};

window.deleteNotice = function(id) {
  if (confirm(`के तपाईं यो सूचना (${id}) हटाउन चाहनुहुन्छ?`)) {
    mockNotices = mockNotices.filter(n => n.id !== id);
    renderDashboard();
  }
};

window.viewApplicantDetail = function(appId) {
  const app = mockAdmissions.find(a => a.app_id === appId);
  if (!app) return;

  alert(`
=== विद्यार्थी भर्ना विवरण (Applicant Details) ===
दर्ता नम्बर: ${app.app_id}
नाम: ${app.name_ne} (${app.name_en})
कार्यक्रम: ${app.program}
कोटा: ${app.quota}
प्राप्त SEE GPA: ${app.gpa}
सम्पर्क फोन: ${app.phone}
ठेगाना: ${app.district}
विद्यालय: ${app.school}
सिम्बोल नं: ${app.symbol_no}
स्थिति: ${app.status}
  `);
};
