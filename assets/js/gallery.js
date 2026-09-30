/**
 * Mangalsen Polytechnic Institute (MPI)
 * Interactive Lightbox Gallery
 */

const galleryItems = [
  {
    id: 1,
    title_ne: "शिक्षालयको मुख्य भवन तथा हराभरा क्याम्पस परिसर (Mangalsen, Achham)",
    title_en: "Main Institute Campus & Green Foothills in Mangalsen, Achham",
    category: "campus",
    categoryName_ne: "क्याम्पस परिसर",
    src: "assets/images/hero-campus.jpg"
  },
  {
    id: 2,
    title_ne: "PCL General Medicine (Health Assistant) विद्यार्थीहरूको प्रयोगात्मक ल्याब अभ्यास",
    title_en: "Health Assistant (HA) Students Practical Anatomical Training Session",
    category: "labs",
    categoryName_ne: "प्रयोगात्मक ल्याब",
    src: "assets/images/ha-lab.jpg"
  },
  {
    id: 3,
    title_ne: "डिप्लोमा इन फार्मेसी (Diploma in Pharmacy) अत्याधुनिक औषधि विज्ञान ल्याब",
    title_en: "Diploma in Pharmacy Modern Pharmaceutical Science & Chemistry Lab",
    category: "labs",
    categoryName_ne: "प्रयोगात्मक ल्याब",
    src: "assets/images/pharmacy-lab.jpg"
  },
  {
    id: 4,
    title_ne: "अछामका दुर्गम गाउँमा विद्यार्थीहरूद्वारा सञ्चालित निःशुल्क सामुदायिक स्वास्थ्य शिविर",
    title_en: "Free Rural Community Health Camp in Achham Hills by HA Students",
    category: "community",
    categoryName_ne: "सामुदायिक सेवा",
    src: "assets/images/community-camp.jpg"
  },
  {
    id: 5,
    title_ne: "समृद्ध पुस्तकालय तथा डिजिटल ई-लर्निङ अध्ययन कक्ष",
    title_en: "Well-equipped Central Academic & Digital E-Library Hall",
    category: "campus",
    categoryName_ne: "क्याम्पस परिसर",
    src: "assets/images/library.jpg"
  },
  {
    id: 6,
    title_ne: "वार्षिक सांस्कृतिक महोत्सव तथा खेलकुद प्रतियोगिता २०८१",
    title_en: "Annual Cultural & Sports Festival 2081 Celebrations",
    category: "events",
    categoryName_ne: "सांस्कृतिक तथा खेलकुद",
    src: "assets/images/cultural-event.jpg"
  }
];

let activeLightboxIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderGallery('all');
  initGalleryFilter();
  initLightboxControls();
});

function renderGallery(cat = 'all') {
  const container = document.getElementById('galleryContainer');
  if (!container) return;

  const filtered = (cat === 'all') 
    ? galleryItems 
    : galleryItems.filter(item => item.category === cat);

  container.innerHTML = filtered.map((item, idx) => `
    <div class="gallery-card" onclick="openLightbox(${item.id})">
      <img src="${item.src}" alt="${item.title_ne}" loading="lazy" />
      <div class="gallery-card-overlay">
        <span class="gallery-overlay-cat">${item.categoryName_ne}</span>
        <h5 class="gallery-overlay-title">${item.title_ne}</h5>
      </div>
    </div>
  `).join('');
}

function initGalleryFilter() {
  const buttons = document.querySelectorAll('.gallery-filter-nav .filter-pill-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-gallery-filter') || 'all';
      renderGallery(cat);
    });
  });
}

window.openLightbox = function(id) {
  const idx = galleryItems.findIndex(i => i.id === id);
  if (idx === -1) return;

  activeLightboxIndex = idx;
  updateLightboxContent();

  const modal = document.getElementById('galleryLightboxModal');
  if (modal) modal.classList.add('is-open');
};

function updateLightboxContent() {
  const item = galleryItems[activeLightboxIndex];
  if (!item) return;

  const imgEl = document.getElementById('lightboxImg');
  const captionEl = document.getElementById('lightboxCaption');

  if (imgEl) imgEl.src = item.src;
  if (captionEl) captionEl.innerHTML = `<strong>${item.title_ne}</strong><br><span style="font-size:0.85rem;color:#CBD5E1;">${item.title_en}</span>`;
}

function initLightboxControls() {
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');

  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    activeLightboxIndex = (activeLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxContent();
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    activeLightboxIndex = (activeLightboxIndex + 1) % galleryItems.length;
    updateLightboxContent();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryLightboxModal');
    if (modal && modal.classList.contains('is-open')) {
      if (e.key === 'ArrowLeft') prevBtn?.click();
      if (e.key === 'ArrowRight') nextBtn?.click();
      if (e.key === 'Escape') closeModal('galleryLightboxModal');
    }
  });
}
