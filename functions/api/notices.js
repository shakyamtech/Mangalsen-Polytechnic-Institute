/**
 * Cloudflare Pages Function: /api/notices
 * Handles GET, POST, DELETE for Notices & Circulars
 */

const defaultNotices = [
  {
    id: "N-2081-104",
    title_ne: "CTEVT डिप्लोमा इन फार्मेसी तथा PCL सामान्य चिकित्सा (HA) तहमा नयाँ भर्ना आवेदन फाराम भर्ने सम्बन्धी अत्यन्त जरुरी सूचना!",
    title_en: "Urgent Notice regarding Admission Application Form for CTEVT Diploma in Pharmacy & PCL in General Medicine (HA) - Academic Session 2081/2082",
    category: "admission",
    categoryLabel_ne: "भर्ना सूचना",
    categoryLabel_en: "Admission",
    catClass: "cat-admission",
    date_bs: "२०८१ आश्विन १२",
    date_ad: "2026-09-28",
    day: "१२",
    month_ne: "आश्विन",
    month_en: "SEP",
    isNew: true,
    file_name: "CTEVT_Admission_Form_2081_MPI.pdf"
  },
  {
    id: "N-2081-103",
    title_ne: "वर्गीकृत (निःशुल्क) छात्रवृत्ति प्रवेश परीक्षाको नतिजा तथा भर्ना सम्बन्धी सूचना",
    title_en: "Result of Classified Free Scholarship Entrance Examination & Admission Directives",
    category: "admission",
    categoryLabel_ne: "छात्रवृत्ति",
    categoryLabel_en: "Scholarship",
    catClass: "cat-admission",
    date_bs: "२०८१ आश्विन ०८",
    date_ad: "2026-09-24",
    day: "०८",
    month_ne: "आश्विन",
    month_en: "SEP",
    isNew: true,
    file_name: "Classified_Scholarship_Result_2081.pdf"
  },
  {
    id: "N-2081-102",
    title_ne: "डिप्लोमा तथा प्रमाणपत्र तह प्रथम वर्षको नियमित तथा पूरक परीक्षा तालिका (Exam Routine)",
    title_en: "First Year Regular & Back Examination Schedule Published (CTEVT Routine 2081)",
    category: "exam",
    categoryLabel_ne: "परीक्षा तालिका",
    categoryLabel_en: "Examination",
    catClass: "cat-exam",
    date_bs: "२०८१ आश्विन ०२",
    date_ad: "2026-09-18",
    day: "०२",
    month_ne: "आश्विन",
    month_en: "SEP",
    isNew: false,
    file_name: "CTEVT_Exam_Routine_First_Year_2081.pdf"
  }
];

export async function onRequestGet({ env }) {
  try {
    if (env && env.DB) {
      const { results } = await env.DB.prepare("SELECT * FROM notices ORDER BY created_at DESC").all();
      return new Response(JSON.stringify(results.length > 0 ? results : defaultNotices), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
    return new Response(JSON.stringify(defaultNotices), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify(defaultNotices), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const id = `N-2081-${Math.floor(100 + Math.random() * 900)}`;
    const newNotice = { ...data, id, isNew: true };

    if (env && env.DB) {
      await env.DB.prepare(
        "INSERT INTO notices (id, title_ne, title_en, category, date_bs, date_ad, file_name) VALUES (?, ?, ?, ?, ?, ?, ?)"
      ).bind(id, data.title_ne, data.title_en || "", data.category || "circular", data.date_bs, data.date_ad, data.file_name || "").run();
    }

    return new Response(JSON.stringify({ success: true, notice: newNotice }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}
