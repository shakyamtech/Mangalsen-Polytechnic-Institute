/**
 * Mangalsen Polytechnic Institute - Admin Dashboard Engine
 */

// Sample Seed Admissions Data
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

    // Default PIN: 2081 or admin
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

function renderDashboard() {
  renderKPIs();
  renderAdmissionsTable();
  renderNoticesTable();
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

function renderAdmissionsTable(filterCourse = 'all') {
  const tbody = document.getElementById('admissionsTableBody');
  if (!tbody) return;

  let list = mockAdmissions;
  if (filterCourse !== 'all') {
    list = list.filter(a => a.program.toLowerCase().includes(filterCourse.toLowerCase()));
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

function renderNoticesTable() {
  const tbody = document.getElementById('adminNoticesTableBody');
  if (!tbody) return;

  tbody.innerHTML = mockNotices.map(n => `
    <tr>
      <td><strong>${n.id}</strong></td>
      <td>${n.title}</td>
      <td><span class="badge-status status-verified">${n.category}</span></td>
      <td>${n.date_bs}</td>
      <td>
        <button class="btn-admin btn-admin-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="deleteNotice('${n.id}')">
          <i class="fa-solid fa-trash"></i> हटाउनुहोस्
        </button>
      </td>
    </tr>
  `).join('');
}

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
