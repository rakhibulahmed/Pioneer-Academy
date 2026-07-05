/* ============================================================
   PIONEER ACADEMY — SITE SCRIPT
   Renders teacher & staff data, handles filters, modal,
   scroll reveals, sticky header and mobile nav.
   ============================================================ */


/* ---------- Data ---------- */
const AVATAR_PALETTE = [
  ['#E9722E','#C6511C'], // sunrise
  ['#1F6F63','#164F47'], // teal
  ['#F3B23E','#C6511C'], // marigold->sunrise
  ['#223259','#17233F'], // indigo
  ['#B0563C','#7A3A28'], // clay
  ['#3D7A6B','#1F4F44'], // deep teal
];

function initials(name){
  return name.split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
}

const CATEGORIES = {
  english:'English', maths:'Mathematics', science:'Science',
  social:'Social Science', language:'Languages', computer:'Computer',
  primary:'Primary Wing', arts:'Arts & Sports'
};

const TEACHERS = [
  {name:'Mr. Rakhibul Ahmed', subject:'General Science', cat:'science', qual:'B.Sc.', bio:'Introduces science to the middle wing through observation walks around the school campus.', img: 'https://i.ibb.co/7J5975ST/image.png'},
   {name:'Mr. Moidul Islam', subject:'General Science', cat:'science', qual:'B.Sc, L. L. B', bio:'Good Boy', img:'https://ibb.co/572RZFp}, 
     {name:'Mr. Monowarul Sk.', subject:'Mathematics', cat:'maths', qual:'B.Sc. Mathematics', bio:'Prepares Class IX 2013 students for board-level problem solving with a calm, patient style.', img: 'https://i.ibb.co/xqBKBrNV/image.png'},
     {name:'Mr. Waliul Mondol.', subject:'Mathematics', cat:'maths', qual:'B.Sc. Mathematics', bio:'Prepares Class IX 2013 students for board-level problem solving with a calm, patient style.', img: 'https://i.ibb.co/xRykCXd/image.png'}
  /*
   {name:'Ms. Rehana Khatun', subject:'English', cat:'english', qual:'B.A. English, B.Ed.', bio:'Believes storytelling is the fastest way into a new language, and runs the school\u2019s weekly reading circle.'},
  {name:'Mr. Nurul Haque', subject:'English (Junior)', cat:'english', qual:'B.A., D.El.Ed.', bio:'Teaches spoken English to the primary wing through songs, flashcards and classroom games.'},
   {name:'Ms. Farida Yeasmin', subject:'Mathematics', cat:'maths', qual:'B.Sc. Mathematics', bio:'Focuses on foundational arithmetic for Classes III\u2013V, with a special interest in mental maths drills.'},

  {name:'Mr. Ranjit Sarkar', subject:'Physical Science', cat:'science', qual:'M.Sc. Physics, B.Ed.', bio:'Sets up simple physics demonstrations from everyday materials so every concept has something to touch.'},
  {name:'Ms. Sultana Parveen', subject:'Life Science', cat:'science', qual:'M.Sc. Botany, B.Ed.', bio:'Keeps a small kitchen-garden plot behind the school where biology lessons come to life.'},
  {name:'Mr. Abdus Salam', subject:'Chemistry', cat:'science', qual:'B.Sc. Chemistry, B.Ed.', bio:'Known for turning the periodic table into a classroom game students actually look forward to.'},
*/
  ];

const STAFF = [
  {name:'Mr. Sahabuddin Sk.', role:'Uncle', note:'Manages admissions, records and day-to-day school administration.'},
  {name:'Ms. Fulmoti Rani', role:'Aunty', note:'Keeps the school\u2019s accounts, fees and payroll in order.'},
  {name:'Mr. Motiur Rahman', role:'Aunty', note:'The first face students see each morning, keeping the campus running smoothly.'},
];

/* ---------- Render teacher grid ---------- */
const teacherGrid = document.getElementById('teacherGrid');
const filterBar = document.getElementById('filterBar');

function colorFor(index){
  return AVATAR_PALETTE[index % AVATAR_PALETTE.length];
}

TEACHERS.forEach((t,i)=>{
  const [c1,c2] = colorFor(i);
  const card = document.createElement('article');
  card.className = 'teacher-card shown';
  card.dataset.cat = t.cat;
  card.style.animationDelay = (i*35)+'ms';
  card.innerHTML = `
    ${t.img 
  ? `<img class="avatar-photo" src="${t.img}" alt="${t.name}">` 
  : `<div class="avatar" style="background:linear-gradient(135deg, ${c1}, ${c2})">${initials(t.name)}</div>`}
    
    <h3>${t.name}</h3>
    <p class="subject">${t.subject}</p>
    <p class="qual">${t.qual}</p>
    <p class="card-hint">Tap for more \u2192</p>
  `;
  card.addEventListener('click', ()=>openModal(t,i));
  teacherGrid.appendChild(card);
});

/* filter chips */
const usedCats = [...new Set(TEACHERS.map(t=>t.cat))];
usedCats.forEach(cat=>{
  const btn = document.createElement('button');
  btn.className = 'filter-chip';
  btn.dataset.filter = cat;
  btn.textContent = CATEGORIES[cat] || cat;
  filterBar.appendChild(btn);
});

filterBar.addEventListener('click', (e)=>{
  const btn = e.target.closest('.filter-chip');
  if(!btn) return;
  filterBar.querySelectorAll('.filter-chip').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  document.querySelectorAll('.teacher-card').forEach(card=>{
    const match = f === 'all' || card.dataset.cat === f;
    card.style.display = match ? '' : 'none';
  });
});

/* ---------- Render staff grid ---------- */
const staffGrid = document.getElementById('staffGrid');
STAFF.forEach((s,i)=>{
  const [c1,c2] = colorFor(i+3);
  const card = document.createElement('div');
  card.className = 'staff-card';
  card.innerHTML = `
    <div class="avatar" style="background:linear-gradient(135deg, ${c1}, ${c2})">${initials(s.name)}</div>
    <h3>${s.name}</h3>
    <p><strong>${s.role}</strong></p>
    <p>${s.note}</p>
  `;
  staffGrid.appendChild(card);
});

/* ---------- Modal ---------- */
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(t,i){
  const [c1,c2] = colorFor(i);
  modalBody.innerHTML = `
    ${t.img 
      ? `<img class="avatar-photo" src="${t.img}" alt="${t.name}">` 
      : `<div class="avatar" style="background:linear-gradient(135deg, ${c1}, ${c2})">${initials(t.name)}</div>`}
    <h3>${t.name}</h3>
    <p class="subject">${t.subject}</p>
    <p class="qual">${t.qual}</p>
    <p class="bio">${t.bio}</p>
  `;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}





function closeModal(){
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e)=>{ if(e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal-up');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));

/* ---------- Sticky header + back to top ---------- */
const header = document.getElementById('siteHeader');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 20);
  toTop.classList.toggle('show', y > 500);
});
toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

/* ---------- Mobile nav ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', ()=>{
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click', ()=> {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});



/* ---------- Loader ---------- */
window.addEventListener('load', ()=>{
  const loader = document.getElementById('loader');
  setTimeout(()=> loader.classList.add('done'), 400);
});
