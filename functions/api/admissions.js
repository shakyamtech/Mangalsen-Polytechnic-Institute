/**
 * Cloudflare Pages Function: /api/admissions
 * Handles GET (listing applications) and POST (submitting an application)
 */

export async function onRequestGet({ env }) {
  try {
    if (env && env.DB) {
      const { results } = await env.DB.prepare("SELECT * FROM admissions ORDER BY created_at DESC").all();
      return new Response(JSON.stringify(results), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const programCode = (data.program === 'pharmacy') ? 'PHARM' : 'HA';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const appId = `MPI-2081-${programCode}-${randomNum}`;
    const createdAt = new Date().toISOString();

    const application = {
      app_id: appId,
      ...data,
      status: "Verified",
      created_at: createdAt
    };

    if (env && env.DB) {
      await env.DB.prepare(`
        INSERT INTO admissions (app_id, program, quota, name_ne, name_en, phone, district, school, symbol_no, gpa, grade_sci, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        appId,
        data.program,
        data.quota,
        data.name_ne,
        data.name_en,
        data.phone,
        data.district,
        data.school,
        data.symbol_no,
        data.gpa,
        data.grade_sci || "C+",
        "Verified",
        createdAt
      ).run();
    }

    return new Response(JSON.stringify({ success: true, application }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}
